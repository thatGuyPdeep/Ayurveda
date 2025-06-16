import * as React from 'react'
import { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { Card } from '@/components/ui/Card'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | AyuraVeda Royale',
  description: 'Get in touch with AyuraVeda Royale for any questions about our premium Ayurvedic products, royal wellness consultations, or luxury wellness services. We\'re here to guide your royal wellness journey.',
  keywords: 'contact ayurveda royale, premium customer support, royal ayurvedic consultation, luxury wellness help center'
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're here to help you on your wellness journey. 
              Reach out with any questions or concerns.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-charcoal mb-6">Send us a Message</h2>
            <p className="text-charcoal/70 mb-8">
              Have a question about our products or need personalized wellness advice? 
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-charcoal mb-6">Get in Touch</h2>
              <p className="text-charcoal/70 mb-8">
                Our dedicated customer support team is available to assist you with 
                product information, order tracking, and wellness guidance.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <Card variant="elevated" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Phone Support</h3>
                    <p className="text-charcoal/70 mb-2">+91 98765 43210</p>
                    <p className="text-sm text-charcoal/60">Monday - Saturday: 9:00 AM - 8:00 PM IST</p>
                  </div>
                </div>
              </Card>

              <Card variant="elevated" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-saffron-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Email Support</h3>
                    <p className="text-charcoal/70 mb-2">support@ayurvedaroyale.com</p>
                    <p className="text-sm text-charcoal/60">24/7 Email Support - Response within 24 hours</p>
                  </div>
                </div>
              </Card>

              <Card variant="elevated" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-maroon-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Visit Our Store</h3>
                    <p className="text-charcoal/70 mb-2">
                      123 Wellness Street<br />
                      Ayurveda District<br />
                      Mumbai, Maharashtra 400001
                    </p>
                    <p className="text-sm text-charcoal/60">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </Card>

              <Card variant="elevated" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Consultation Hours</h3>
                    <p className="text-charcoal/70 mb-2">Book online consultations with our Ayurvedic experts</p>
                    <p className="text-sm text-charcoal/60">Available 7 days a week: 8:00 AM - 10:00 PM IST</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* FAQ Link */}
            <Card variant="wellness" className="p-6 text-center">
              <h3 className="font-semibold text-charcoal mb-2">Frequently Asked Questions</h3>
              <p className="text-charcoal/70 mb-4">
                Find quick answers to common questions about our products, shipping, and services.
              </p>
              <a 
                href="/faq" 
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Visit FAQ Section →
              </a>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card variant="golden" className="p-6 text-center">
            <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="font-semibold text-charcoal mb-2">Free Shipping</h3>
            <p className="text-charcoal/70 text-sm">
              Free delivery on orders above ₹999 across India
            </p>
          </Card>

          <Card variant="wellness" className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold text-charcoal mb-2">Secure Payments</h3>
            <p className="text-charcoal/70 text-sm">
              100% secure payment processing with multiple payment options
            </p>
          </Card>

          <Card variant="premium" className="p-6 text-center">
            <div className="w-16 h-16 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="font-semibold text-charcoal mb-2">Quality Guarantee</h3>
            <p className="text-charcoal/70 text-sm">
              100% authentic products with quality assurance guarantee
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
} 