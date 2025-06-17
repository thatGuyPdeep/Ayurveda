'use client'

import * as React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function Footer() {
  const [email, setEmail] = React.useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <footer className="bg-charcoal text-ivory">
      {/* Newsletter Section */}
      <div className="border-b border-charcoal/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected with Ayurveda</h3>
            <p className="text-ivory/80 mb-6 max-w-2xl mx-auto">
              Get the latest updates on new products, health tips, and exclusive offers 
              delivered straight to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-ivory/10 border-ivory/20 text-ivory placeholder:text-ivory/60"
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl">
                Ayurveda<span className="text-emerald-400">Cart</span>
              </span>
            </div>
            <p className="text-ivory/80 text-sm leading-relaxed">
              Your trusted partner in authentic Ayurvedic wellness. We bring you 
              time-tested remedies and modern formulations for holistic health.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-ivory/60 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-ivory/60 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-ivory/60 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-ivory/60 hover:text-emerald-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  Consultation
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-ivory/80 hover:text-emerald-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-ivory/80">
                  <p>123 Wellness Street</p>
                  <p>Ayurveda District</p>
                  <p>Mumbai, Maharashtra 400001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div className="text-sm text-ivory/80">
                  <p>+91 98765 43210</p>
                  <p className="text-xs text-ivory/60">Mon-Sat 9AM-8PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div className="text-sm text-ivory/80">
                  <p>support@ayurvedaroyale.com</p>
                  <p className="text-xs text-ivory/60">24/7 Email Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-ivory/60">
              © 2025 AyuraVeda Royale. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/terms" className="text-ivory/60 hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-ivory/60 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-ivory/60 hover:text-emerald-400 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-ivory/60 hover:text-emerald-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-charcoal/50 border-t border-charcoal/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-ivory/60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span>AYUSH Ministry Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span>ISO 9001:2015 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span>GMP Certified Manufacturing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span>100% Authentic Products</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 