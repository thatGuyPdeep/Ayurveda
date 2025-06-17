import { supabase } from '@/lib/supabase'

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  html_content: string
  text_content: string
  variables: string[]
}

export interface EmailData {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  template_id?: string
  template_data?: Record<string, any>
}

export class EmailService {
  private apiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY
  private apiUrl = process.env.EMAIL_API_URL || 'https://api.resend.com'

  async sendEmail(emailData: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const payload = {
        from: process.env.FROM_EMAIL || 'noreply@ayurvedaroyale.com',
        to: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text
      }

      const response = await fetch(`${this.apiUrl}/emails`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send email')
      }

      // Log email sent to database
      await this.logEmailSent({
        recipient: emailData.to.toString(),
        subject: emailData.subject,
        template_id: emailData.template_id,
        status: 'sent',
        message_id: result.id
      })

      return { success: true, messageId: result.id }
    } catch (error) {
      console.error('Email sending failed:', error)
      
      // Log email failure
      await this.logEmailSent({
        recipient: emailData.to.toString(),
        subject: emailData.subject,
        template_id: emailData.template_id,
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error'
      })

      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async sendWelcomeEmail(userEmail: string, userName: string): Promise<{ success: boolean; error?: string }> {
    const emailData: EmailData = {
      to: userEmail,
      subject: 'Welcome to AyuraVeda Royale - Your Wellness Journey Begins',
      html: this.generateWelcomeEmailHTML(userName),
      text: this.generateWelcomeEmailText(userName),
      template_id: 'welcome'
    }

    const result = await this.sendEmail(emailData)
    return result
  }

  async sendOrderConfirmationEmail(orderData: any): Promise<{ success: boolean; error?: string }> {
    const emailData: EmailData = {
      to: orderData.user_email,
      subject: `Order Confirmation - ${orderData.order_number}`,
      html: this.generateOrderConfirmationHTML(orderData),
      text: this.generateOrderConfirmationText(orderData),
      template_id: 'order_confirmation'
    }

    const result = await this.sendEmail(emailData)
    return result
  }

  async sendOrderStatusUpdateEmail(orderData: any): Promise<{ success: boolean; error?: string }> {
    const statusMessages = {
      confirmed: 'Your order has been confirmed and is being prepared',
      shipped: 'Your order has been shipped and is on its way',
      delivered: 'Your order has been delivered successfully',
      cancelled: 'Your order has been cancelled'
    }

    const emailData: EmailData = {
      to: orderData.user_email,
      subject: `Order Update - ${orderData.order_number} - ${orderData.status.toUpperCase()}`,
      html: this.generateOrderStatusUpdateHTML(orderData, statusMessages[orderData.status as keyof typeof statusMessages]),
      text: this.generateOrderStatusUpdateText(orderData, statusMessages[orderData.status as keyof typeof statusMessages]),
      template_id: 'order_status_update'
    }

    const result = await this.sendEmail(emailData)
    return result
  }

  async sendPasswordResetEmail(userEmail: string, resetToken: string): Promise<{ success: boolean; error?: string }> {
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${resetToken}`
    
    const emailData: EmailData = {
      to: userEmail,
      subject: 'Reset Your AyuraVeda Royale Password',
      html: this.generatePasswordResetHTML(resetUrl),
      text: this.generatePasswordResetText(resetUrl),
      template_id: 'password_reset'
    }

    const result = await this.sendEmail(emailData)
    return result
  }

  async sendNewsletterEmail(subscribers: string[], content: any): Promise<{ success: boolean; error?: string }> {
    const emailData: EmailData = {
      to: subscribers,
      subject: content.subject,
      html: this.generateNewsletterHTML(content),
      text: this.generateNewsletterText(content),
      template_id: 'newsletter'
    }

    const result = await this.sendEmail(emailData)
    return result
  }

  private async logEmailSent(logData: {
    recipient: string
    subject: string
    template_id?: string
    status: 'sent' | 'failed'
    message_id?: string
    error_message?: string
  }) {
    try {
      await supabase.from('email_logs').insert({
        recipient: logData.recipient,
        subject: logData.subject,
        template_id: logData.template_id,
        status: logData.status,
        message_id: logData.message_id,
        error_message: logData.error_message,
        sent_at: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to log email:', error)
    }
  }

  private generateWelcomeEmailHTML(userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to AyuraVeda Royale</title>
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: 'Arial', sans-serif; }
            .header { background: linear-gradient(135deg, #014421, #10B981); color: white; padding: 40px 20px; text-align: center; }
            .content { padding: 40px 20px; background: #FEFEFE; }
            .button { display: inline-block; background: #F5B000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { background: #F8F9FA; padding: 20px; text-align: center; color: #6B7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌿 Welcome to AyuraVeda Royale</h1>
              <p>Your Premium Ayurvedic Wellness Journey Begins Here</p>
            </div>
            <div class="content">
              <h2>Namaste ${userName},</h2>
              <p>Welcome to the royal world of authentic Ayurvedic wellness! We're thrilled to have you join our community of health-conscious individuals seeking natural healing solutions.</p>
              
              <h3>What's Next?</h3>
              <ul>
                <li>🔍 Explore our 17 medical specialties</li>
                <li>💊 Discover 1000+ authentic Ayurvedic medicines</li>
                <li>👨‍⚕️ Book consultations with certified Ayurvedic practitioners</li>
                <li>📚 Access our wellness blog and educational resources</li>
              </ul>
              
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/products" class="button">Start Exploring Products</a>
              
              <p>As a welcome gift, use code <strong>WELCOME10</strong> for 10% off your first order!</p>
              
              <p>With wellness and gratitude,<br>The AyuraVeda Royale Team</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 AyuraVeda Royale. All rights reserved.</p>
              <p>Authentic Ayurveda. Royal Quality. Global Delivery.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generateWelcomeEmailText(userName: string): string {
    return `
      Welcome to AyuraVeda Royale!
      
      Namaste ${userName},
      
      Welcome to the royal world of authentic Ayurvedic wellness! We're thrilled to have you join our community of health-conscious individuals seeking natural healing solutions.
      
      What's Next?
      - Explore our 17 medical specialties
      - Discover 1000+ authentic Ayurvedic medicines
      - Book consultations with certified Ayurvedic practitioners
      - Access our wellness blog and educational resources
      
      As a welcome gift, use code WELCOME10 for 10% off your first order!
      
      Visit us at: ${process.env.NEXT_PUBLIC_SITE_URL}
      
      With wellness and gratitude,
      The AyuraVeda Royale Team
      
      © 2025 AyuraVeda Royale. All rights reserved.
      Authentic Ayurveda. Royal Quality. Global Delivery.
    `
  }

  private generateOrderConfirmationHTML(orderData: any): string {
    const itemsHTML = orderData.items?.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #E5E7EB;">${item.product_name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #E5E7EB; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #E5E7EB; text-align: right;">₹${item.unit_price.toLocaleString()}</td>
        <td style="padding: 10px; border-bottom: 1px solid #E5E7EB; text-align: right;">₹${item.total_price.toLocaleString()}</td>
      </tr>
    `).join('') || ''

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation - ${orderData.order_number}</title>
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: 'Arial', sans-serif; }
            .header { background: linear-gradient(135deg, #014421, #10B981); color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; background: #FEFEFE; }
            .order-summary { background: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .table { width: 100%; border-collapse: collapse; }
            .footer { background: #F8F9FA; padding: 20px; text-align: center; color: #6B7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Order Confirmed</h1>
              <p>Order #${orderData.order_number}</p>
            </div>
            <div class="content">
              <h2>Thank you for your order!</h2>
              <p>Your order has been confirmed and is being prepared for shipment.</p>
              
              <div class="order-summary">
                <h3>Order Details</h3>
                <table class="table">
                  <thead>
                    <tr style="background: #E5E7EB;">
                      <th style="padding: 10px; text-align: left;">Product</th>
                      <th style="padding: 10px; text-align: center;">Qty</th>
                      <th style="padding: 10px; text-align: right;">Price</th>
                      <th style="padding: 10px; text-align: right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHTML}
                  </tbody>
                  <tfoot>
                    <tr style="font-weight: bold; background: #F3F4F6;">
                      <td colspan="3" style="padding: 15px; text-align: right;">Total Amount:</td>
                      <td style="padding: 15px; text-align: right;">₹${orderData.total_amount?.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <p><strong>Estimated Delivery:</strong> 3-7 business days</p>
              <p><strong>Tracking:</strong> You'll receive tracking information once your order ships.</p>
              
              <p>Questions? Contact our support team at support@ayurvedaroyale.com</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 AyuraVeda Royale. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generateOrderConfirmationText(orderData: any): string {
    const itemsList = orderData.items?.map((item: any) => 
      `${item.product_name} - Qty: ${item.quantity} - ₹${item.total_price.toLocaleString()}`
    ).join('\n') || ''

    return `
      Order Confirmation - ${orderData.order_number}
      
      Thank you for your order!
      Your order has been confirmed and is being prepared for shipment.
      
      Order Details:
      ${itemsList}
      
      Total Amount: ₹${orderData.total_amount?.toLocaleString()}
      
      Estimated Delivery: 3-7 business days
      
      You'll receive tracking information once your order ships.
      
      Questions? Contact our support team at support@ayurvedaroyale.com
      
      © 2025 AyuraVeda Royale. All rights reserved.
    `
  }

  private generateOrderStatusUpdateHTML(orderData: any, statusMessage: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Update - ${orderData.order_number}</title>
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: 'Arial', sans-serif; }
            .header { background: linear-gradient(135deg, #014421, #10B981); color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; background: #FEFEFE; }
            .status-badge { display: inline-block; background: #F5B000; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
            .tracking { background: #F0FDF4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981; }
            .button { display: inline-block; background: #014421; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { background: #F8F9FA; padding: 20px; text-align: center; color: #6B7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📦 Order Update</h1>
              <p>Order #${orderData.order_number}</p>
            </div>
            <div class="content">
              <h2>Status: <span class="status-badge">${orderData.status?.toUpperCase()}</span></h2>
              <p>${statusMessage}</p>
              
              ${orderData.tracking_number ? `
                <div class="tracking">
                  <h3>Tracking Information</h3>
                  <p><strong>Tracking Number:</strong> ${orderData.tracking_number}</p>
                  <p><strong>Estimated Delivery:</strong> ${orderData.estimated_delivery_date || '3-7 business days'}</p>
                </div>
              ` : ''}
              
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account/orders/${orderData.id}" class="button">View Order Details</a>
              
              <p>Thank you for choosing AyuraVeda Royale for your wellness journey!</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 AyuraVeda Royale. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generateOrderStatusUpdateText(orderData: any, statusMessage: string): string {
    return `
      Order Update - ${orderData.order_number}
      
      Status: ${orderData.status?.toUpperCase()}
      
      ${statusMessage}
      
      ${orderData.tracking_number ? `
      Tracking Information:
      Tracking Number: ${orderData.tracking_number}
      Estimated Delivery: ${orderData.estimated_delivery_date || '3-7 business days'}
      ` : ''}
      
      View order details: ${process.env.NEXT_PUBLIC_SITE_URL}/account/orders/${orderData.id}
      
      Thank you for choosing AyuraVeda Royale for your wellness journey!
      
      © 2025 AyuraVeda Royale. All rights reserved.
    `
  }

  private generatePasswordResetHTML(resetUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - AyuraVeda Royale</title>
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: 'Arial', sans-serif; }
            .header { background: linear-gradient(135deg, #8B1E3F, #DC2626); color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; background: #FEFEFE; }
            .button { display: inline-block; background: #F5B000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .warning { background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B; }
            .footer { background: #F8F9FA; padding: 20px; text-align: center; color: #6B7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
              <p>AyuraVeda Royale Account Security</p>
            </div>
            <div class="content">
              <h2>Reset Your Password</h2>
              <p>We received a request to reset your password for your AyuraVeda Royale account.</p>
              
              <a href="${resetUrl}" class="button">Reset My Password</a>
              
              <div class="warning">
                <h3>⚠️ Security Notice</h3>
                <ul>
                  <li>This link is valid for 1 hour only</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                  <li>Never share this link with anyone</li>
                </ul>
              </div>
              
              <p>If the button doesn't work, copy and paste this link in your browser:</p>
              <p style="word-break: break-all; color: #6B46C1;">${resetUrl}</p>
              
              <p>For security questions, contact support@ayurvedaroyale.com</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 AyuraVeda Royale. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generatePasswordResetText(resetUrl: string): string {
    return `
      Password Reset Request - AyuraVeda Royale
      
      We received a request to reset your password for your AyuraVeda Royale account.
      
      Reset your password by clicking this link: ${resetUrl}
      
      Security Notice:
      - This link is valid for 1 hour only
      - If you didn't request this reset, please ignore this email
      - Never share this link with anyone
      
      For security questions, contact support@ayurvedaroyale.com
      
      © 2025 AyuraVeda Royale. All rights reserved.
    `
  }

  private generateNewsletterHTML(content: any): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${content.subject}</title>
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: 'Arial', sans-serif; }
            .header { background: linear-gradient(135deg, #014421, #10B981); color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; background: #FEFEFE; }
            .article { margin: 30px 0; padding: 20px; border: 1px solid #E5E7EB; border-radius: 8px; }
            .button { display: inline-block; background: #F5B000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
            .footer { background: #F8F9FA; padding: 20px; text-align: center; color: #6B7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌿 ${content.title || 'AyuraVeda Royale Newsletter'}</h1>
              <p>Your Weekly Dose of Ayurvedic Wisdom</p>
            </div>
            <div class="content">
              ${content.intro ? `<p>${content.intro}</p>` : ''}
              
              ${content.articles?.map((article: any) => `
                <div class="article">
                  <h3>${article.title}</h3>
                  <p>${article.excerpt}</p>
                  <a href="${article.url}" class="button">Read More</a>
                </div>
              `).join('') || ''}
              
              ${content.tip ? `
                <div style="background: #F0FDF4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3>💡 Wellness Tip of the Week</h3>
                  <p>${content.tip}</p>
                </div>
              ` : ''}
              
              <p>Visit our blog for more wellness insights: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog">AyuraVeda Royale Blog</a></p>
            </div>
            <div class="footer">
              <p>&copy; 2025 AyuraVeda Royale. All rights reserved.</p>
              <p>You're receiving this because you subscribed to our newsletter.</p>
              <p><a href="{unsubscribe_url}">Unsubscribe</a> | <a href="${process.env.NEXT_PUBLIC_SITE_URL}/privacy">Privacy Policy</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generateNewsletterText(content: any): string {
    const articlesText = content.articles?.map((article: any) => `
      ${article.title}
      ${article.excerpt}
      Read more: ${article.url}
    `).join('\n') || ''

    return `
      ${content.title || 'AyuraVeda Royale Newsletter'}
      Your Weekly Dose of Ayurvedic Wisdom
      
      ${content.intro || ''}
      
      ${articlesText}
      
      ${content.tip ? `
      Wellness Tip of the Week:
      ${content.tip}
      ` : ''}
      
      Visit our blog for more wellness insights: ${process.env.NEXT_PUBLIC_SITE_URL}/blog
      
      © 2025 AyuraVeda Royale. All rights reserved.
      You're receiving this because you subscribed to our newsletter.
      Unsubscribe: {unsubscribe_url}
    `
  }
}

export const emailService = new EmailService()