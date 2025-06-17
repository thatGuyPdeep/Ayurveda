import { BaseService } from './base'
import { EmailService } from './email'
import type { Database } from '@/types/supabase'

interface NotificationTemplate {
  id: string
  name: string
  subject: string
  html_content: string
  text_content: string
  variables: string[]
}

interface NotificationData {
  to: string
  template_id: string
  variables: Record<string, any>
  channel: 'email' | 'sms' | 'push' | 'in_app'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  scheduled_at?: Date
}

interface OrderNotificationData {
  order: Database['public']['Tables']['orders']['Row']
  customer: Database['public']['Tables']['users']['Row']
  items: Array<{
    product_name: string
    quantity: number
    price: number
  }>
}

export class NotificationService extends BaseService {
  private emailService = new EmailService()

  async sendWelcomeNotification(user: Database['public']['Tables']['users']['Row']) {
    return this.withErrorHandling(
      async () => {
        // Send welcome email
        await this.emailService.sendEmail({
          to: user.email,
          subject: 'Welcome to AyuraVeda Royale - Your Wellness Journey Begins!',
          template: 'welcome',
          data: {
            first_name: user.first_name,
            email: user.email,
            login_url: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/login`,
            support_email: 'support@ayurveda-royale.com'
          }
        })

        // Create in-app notification
        await this.createInAppNotification({
          user_id: user.id,
          title: 'Welcome to AyuraVeda Royale!',
          message: 'Thank you for joining our royal wellness community. Explore our authentic Ayurvedic products.',
          type: 'welcome',
          priority: 'normal'
        })
      },
      { service: 'NotificationService', method: 'sendWelcomeNotification', params: { user_id: user.id } }
    )
  }

  async sendOrderConfirmation(orderData: OrderNotificationData) {
    return this.withErrorHandling(
      async () => {
        const { order, customer, items } = orderData

        // Calculate order summary
        const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const deliveryDate = new Date()
        deliveryDate.setDate(deliveryDate.getDate() + 7)

        // Send order confirmation email
        await this.emailService.sendEmail({
          to: customer.email,
          subject: `Order Confirmation - ${order.order_number}`,
          template: 'order_confirmation',
          data: {
            customer_name: customer.first_name,
            order_number: order.order_number,
            order_date: new Date(order.created_at).toLocaleDateString(),
            items: items,
            subtotal: order.subtotal,
            shipping_amount: order.shipping_amount,
            tax_amount: order.tax_amount,
            total_amount: order.total_amount,
            shipping_address: order.shipping_address,
            estimated_delivery: deliveryDate.toLocaleDateString(),
            tracking_url: `${process.env.NEXT_PUBLIC_SITE_URL}/orders/${order.id}/track`,
            support_email: 'support@ayurveda-royale.com'
          }
        })

        // Create in-app notification
        await this.createInAppNotification({
          user_id: customer.id,
          title: 'Order Confirmed!',
          message: `Your order ${order.order_number} has been confirmed and will be delivered within 7 days.`,
          type: 'order_update',
          priority: 'high',
          metadata: {
            order_id: order.id,
            order_number: order.order_number
          }
        })

        // Send SMS notification if phone number available
        if (customer.phone) {
          await this.sendSMSNotification({
            to: customer.phone,
            message: `AyuraVeda Royale: Your order ${order.order_number} is confirmed! Track: ${process.env.NEXT_PUBLIC_SITE_URL}/orders/${order.id}/track`
          })
        }
      },
      { service: 'NotificationService', method: 'sendOrderConfirmation', params: { order_id: orderData.order.id } }
    )
  }

  async sendOrderStatusUpdate(order: Database['public']['Tables']['orders']['Row']) {
    return this.withErrorHandling(
      async () => {
        // Get customer details
        const { data: customer } = await this.supabase
          .from('users')
          .select('*')
          .eq('id', order.user_id)
          .single()

        if (!customer) throw new Error('Customer not found')

        const statusMessages = {
          pending: 'Your order is being processed',
          confirmed: 'Your order has been confirmed',
          processing: 'Your order is being prepared',
          shipped: 'Your order has been shipped',
          delivered: 'Your order has been delivered',
          cancelled: 'Your order has been cancelled'
        }

        const statusMessage = statusMessages[order.status as keyof typeof statusMessages] || 'Order status updated'

        // Send status update email
        await this.emailService.sendEmail({
          to: customer.email,
          subject: `Order Update - ${order.order_number}`,
          template: 'order_status_update',
          data: {
            customer_name: customer.first_name,
            order_number: order.order_number,
            status: order.status,
            status_message: statusMessage,
            tracking_number: order.tracking_number,
            tracking_url: `${process.env.NEXT_PUBLIC_SITE_URL}/orders/${order.id}/track`,
            estimated_delivery: order.estimated_delivery,
            support_email: 'support@ayurveda-royale.com'
          }
        })

        // Create in-app notification
        await this.createInAppNotification({
          user_id: customer.id,
          title: 'Order Status Updated',
          message: `${statusMessage}: ${order.order_number}`,
          type: 'order_update',
          priority: order.status === 'delivered' ? 'high' : 'normal',
          metadata: {
            order_id: order.id,
            order_number: order.order_number,
            status: order.status
          }
        })

        // Send SMS for important status updates
        if (customer.phone && ['shipped', 'delivered'].includes(order.status)) {
          await this.sendSMSNotification({
            to: customer.phone,
            message: `AyuraVeda Royale: ${statusMessage} ${order.order_number}. Track: ${process.env.NEXT_PUBLIC_SITE_URL}/orders/${order.id}/track`
          })
        }
      },
      { service: 'NotificationService', method: 'sendOrderStatusUpdate', params: { order_id: order.id } }
    )
  }

  async sendConsultationReminder(consultation: any) {
    return this.withErrorHandling(
      async () => {
        // Get patient and doctor details
        const [patientResult, doctorResult] = await Promise.all([
          this.supabase.from('users').select('*').eq('id', consultation.patient_id).single(),
          this.supabase.from('doctors').select('*, users(*)').eq('id', consultation.doctor_id).single()
        ])

        if (!patientResult.data || !doctorResult.data) {
          throw new Error('Patient or doctor not found')
        }

        const patient = patientResult.data
        const doctor = doctorResult.data

        const consultationTime = new Date(consultation.scheduled_at)
        
        // Send reminder email to patient
        await this.emailService.sendEmail({
          to: patient.email,
          subject: 'Consultation Reminder - AyuraVeda Royale',
          template: 'consultation_reminder',
          data: {
            patient_name: patient.first_name,
            doctor_name: doctor.users.first_name + ' ' + doctor.users.last_name,
            consultation_date: consultationTime.toLocaleDateString(),
            consultation_time: consultationTime.toLocaleTimeString(),
            meeting_url: consultation.meeting_url,
            duration: consultation.duration_minutes,
            specialization: doctor.specialization,
            support_email: 'support@ayurveda-royale.com'
          }
        })

        // Create in-app notification
        await this.createInAppNotification({
          user_id: patient.id,
          title: 'Consultation Reminder',
          message: `Your consultation with Dr. ${doctor.users.first_name} is scheduled in 1 hour.`,
          type: 'consultation',
          priority: 'high',
          metadata: {
            consultation_id: consultation.id,
            doctor_name: doctor.users.first_name + ' ' + doctor.users.last_name,
            scheduled_at: consultation.scheduled_at
          }
        })

        // Send SMS reminder
        if (patient.phone) {
          await this.sendSMSNotification({
            to: patient.phone,
            message: `AyuraVeda Royale: Consultation reminder with Dr. ${doctor.users.first_name} in 1 hour. Join: ${consultation.meeting_url}`
          })
        }
      },
      { service: 'NotificationService', method: 'sendConsultationReminder', params: { consultation_id: consultation.id } }
    )
  }

  async sendPasswordResetNotification(user: Database['public']['Tables']['users']['Row'], resetToken: string) {
    return this.withErrorHandling(
      async () => {
        const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${resetToken}`
        
        await this.emailService.sendEmail({
          to: user.email,
          subject: 'Reset Your AyuraVeda Royale Password',
          template: 'password_reset',
          data: {
            first_name: user.first_name,
            reset_url: resetUrl,
            expiry_time: '24 hours',
            support_email: 'support@ayurveda-royale.com'
          }
        })

        // Log security event
        await this.logSecurityEvent({
          user_id: user.id,
          event_type: 'password_reset_requested',
          ip_address: null, // Would be passed from request
          user_agent: null // Would be passed from request
        })
      },
      { service: 'NotificationService', method: 'sendPasswordResetNotification', params: { user_id: user.id } }
    )
  }

  async sendLowStockAlert(product: Database['public']['Tables']['products']['Row']) {
    return this.withErrorHandling(
      async () => {
        // Get admin users
        const { data: admins } = await this.supabase
          .from('users')
          .select('*')
          .eq('role', 'admin')

        if (!admins?.length) return

        for (const admin of admins) {
          await this.emailService.sendEmail({
            to: admin.email,
            subject: 'Low Stock Alert - AyuraVeda Royale',
            template: 'low_stock_alert',
            data: {
              admin_name: admin.first_name,
              product_name: product.name,
              product_sku: product.sku,
              current_stock: product.stock_quantity,
              threshold: product.low_stock_threshold,
              product_url: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/products/${product.id}`
            }
          })

          await this.createInAppNotification({
            user_id: admin.id,
            title: 'Low Stock Alert',
            message: `${product.name} is running low on stock (${product.stock_quantity} remaining)`,
            type: 'inventory_alert',
            priority: 'high',
            metadata: {
              product_id: product.id,
              product_name: product.name,
              stock_quantity: product.stock_quantity
            }
          })
        }
      },
      { service: 'NotificationService', method: 'sendLowStockAlert', params: { product_id: product.id } }
    )
  }

  async sendMarketingCampaign(campaign: any) {
    return this.withErrorHandling(
      async () => {
        // Get target audience based on campaign criteria
        let query = this.supabase
          .from('users')
          .select('*')
          .eq('marketing_consent', true)

        // Apply audience filters
        if (campaign.audience_criteria) {
          if (campaign.audience_criteria.last_order_days) {
            const cutoffDate = new Date()
            cutoffDate.setDate(cutoffDate.getDate() - campaign.audience_criteria.last_order_days)
            // Additional filtering logic would go here
          }
        }

        const { data: recipients } = await query

        if (!recipients?.length) return

        // Send campaign emails in batches
        const batchSize = 100
        for (let i = 0; i < recipients.length; i += batchSize) {
          const batch = recipients.slice(i, i + batchSize)
          
          await Promise.all(
            batch.map(recipient =>
              this.emailService.sendEmail({
                to: recipient.email,
                subject: campaign.subject,
                template: 'marketing_campaign',
                data: {
                  first_name: recipient.first_name,
                  campaign_content: campaign.content,
                  unsubscribe_url: `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?token=${recipient.id}`,
                  ...campaign.template_variables
                }
              })
            )
          )

          // Add delay between batches to avoid rate limiting
          if (i + batchSize < recipients.length) {
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }

        // Log campaign stats
        await this.logCampaignStats({
          campaign_id: campaign.id,
          sent_count: recipients.length,
          sent_at: new Date()
        })
      },
      { service: 'NotificationService', method: 'sendMarketingCampaign', params: { campaign_id: campaign.id } }
    )
  }

  private async createInAppNotification(data: {
    user_id: string
    title: string
    message: string
    type: string
    priority: string
    metadata?: any
  }) {
    return this.supabase
      .from('notifications')
      .insert({
        user_id: data.user_id,
        title: data.title,
        message: data.message,
        type: data.type,
        priority: data.priority,
        metadata: data.metadata || {},
        is_read: false,
        created_at: new Date().toISOString()
      })
  }

  private async sendSMSNotification(data: { to: string; message: string }) {
    // Integration with SMS service (Twilio, etc.)
    try {
      // This would be implemented with actual SMS service
      console.log(`SMS to ${data.to}: ${data.message}`)
      
      // Log SMS sent
      await this.supabase
        .from('sms_logs')
        .insert({
          phone_number: data.to,
          message: data.message,
          status: 'sent',
          sent_at: new Date().toISOString()
        })
    } catch (error) {
      console.error('SMS sending failed:', error)
    }
  }

  private async logSecurityEvent(data: {
    user_id: string
    event_type: string
    ip_address: string | null
    user_agent: string | null
  }) {
    return this.supabase
      .from('security_events')
      .insert({
        user_id: data.user_id,
        event_type: data.event_type,
        ip_address: data.ip_address,
        user_agent: data.user_agent,
        created_at: new Date().toISOString()
      })
  }

  private async logCampaignStats(data: {
    campaign_id: string
    sent_count: number
    sent_at: Date
  }) {
    return this.supabase
      .from('campaign_stats')
      .insert({
        campaign_id: data.campaign_id,
        sent_count: data.sent_count,
        sent_at: data.sent_at.toISOString()
      })
  }

  async getNotifications(userId: string, options: { limit?: number; offset?: number } = {}) {
    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('notifications')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .range(options.offset || 0, (options.offset || 0) + (options.limit || 20) - 1)

        if (error) throw error
        return data
      },
      { service: 'NotificationService', method: 'getNotifications', params: { userId, options } }
    )
  }

  async markNotificationAsRead(notificationId: string, userId: string) {
    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('notifications')
          .update({ is_read: true, read_at: new Date().toISOString() })
          .eq('id', notificationId)
          .eq('user_id', userId)
          .select()
          .single()

        if (error) throw error
        return data
      },
      { service: 'NotificationService', method: 'markNotificationAsRead', params: { notificationId, userId } }
    )
  }

  async getUnreadCount(userId: string) {
    return this.withErrorHandling(
      async () => {
        const { count, error } = await this.supabase
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('is_read', false)

        if (error) throw error
        return count || 0
      },
      { service: 'NotificationService', method: 'getUnreadCount', params: { userId } }
    )
  }
} 