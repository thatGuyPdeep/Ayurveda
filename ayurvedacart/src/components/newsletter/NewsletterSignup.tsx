'use client'

import { useState } from 'react'
import { Mail, CheckCircle, Crown } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'hero'
  className?: string
}

export default function NewsletterSignup({ variant = 'default', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement actual newsletter subscription API call
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
      
      setIsSubscribed(true)
      setEmail('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-emerald-800">Welcome to the Royal Family!</p>
            <p className="text-sm text-emerald-600">You'll receive exclusive wellness insights soon.</p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className={`bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 rounded-3xl p-8 text-white ${className}`}>
        <div className="max-w-md mx-auto text-center">
          <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Crown className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold font-display mb-3">
            Join the Royal Wellness Circle
          </h3>
          
          <p className="text-emerald-100 mb-6">
            Get exclusive access to ancient wisdom, premium product launches, and personalized wellness guidance from our Ayurvedic masters.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white/60" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your royal email address"
                className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <p className="text-red-200 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-white text-emerald-800 rounded-xl font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-800 mr-2"></div>
                  Joining the Circle...
                </div>
              ) : (
                'Join the Royal Circle'
              )}
            </button>
          </form>

          <p className="text-xs text-emerald-200 mt-4">
            By subscribing, you agree to receive wellness insights and exclusive offers. Unsubscribe anytime.
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-2xl p-6 shadow-sm border border-sage-light ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Mail className="h-4 w-4 text-emerald-600" />
          </div>
          <h4 className="font-semibold text-charcoal">Stay Updated</h4>
        </div>
        
        <p className="text-sm text-charcoal/70 mb-4">
          Get the latest wellness tips and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-3 border border-sage-dark rounded-xl bg-white text-charcoal placeholder-charcoal/50 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 transition-all duration-200"
            disabled={isLoading}
          />
          
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-emerald-800 text-white rounded-xl font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`bg-gradient-to-r from-sage-light to-pale-sage rounded-2xl p-8 ${className}`}>
      <div className="max-w-lg mx-auto text-center">
        <div className="h-12 w-12 bg-emerald-800 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-charcoal font-display mb-2">
          Ancient Wisdom, Modern Delivery
        </h3>
        
        <p className="text-charcoal/70 mb-6">
          Subscribe to receive exclusive wellness insights, Ayurvedic tips, and special offers on premium products.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-charcoal/40" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 border border-sage-dark rounded-xl bg-white/80 backdrop-blur-sm text-charcoal placeholder-charcoal/50 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 transition-all duration-200"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-emerald-800 text-white rounded-xl font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Subscribing...
              </div>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-3">{error}</p>
        )}

        <p className="text-xs text-charcoal/60 mt-4">
          Join 10,000+ wellness enthusiasts. No spam, unsubscribe anytime.
        </p>
      </div>
    </div>
  )
} 