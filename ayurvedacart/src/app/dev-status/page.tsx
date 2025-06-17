'use client'

import React from 'react'
import { CheckCircle, Circle, Clock, AlertCircle, Crown, Star, ShoppingCart, Users, Heart, Search, CreditCard, Shield, Truck, MessageCircle, FileText, Settings } from 'lucide-react'

interface FeatureStatus {
  name: string
  description: string
  status: 'completed' | 'in-progress' | 'pending' | 'needs-fix'
  icon: React.ReactNode
  details?: string[]
}

const features: FeatureStatus[] = [
  {
    name: 'Branding & Logo',
    description: 'Crown logo, AyuraVeda Royale branding, favicon',
    status: 'completed',
    icon: <Crown className="h-5 w-5" />,
    details: ['Crown favicon implemented', 'Header updated with crown logo', 'AyuraVeda Royale branding']
  },
  {
    name: 'Product Display',
    description: 'Products showing correctly with sample data',
    status: 'completed',
    icon: <ShoppingCart className="h-5 w-5" />,
    details: ['6+ Ayurvedic products displayed', 'Proper grid/list view', 'Filters working']
  },
  {
    name: 'Shopping Cart',
    description: 'Add to cart functionality, cart management',
    status: 'completed',
    icon: <ShoppingCart className="h-5 w-5" />,
    details: ['Add to cart working', 'Quantity management', 'Cart persistence with Zustand']
  },
  {
    name: 'Authentication',
    description: 'Login, registration, session management',
    status: 'completed',
    icon: <Users className="h-5 w-5" />,
    details: ['Login form with validation', 'Registration with terms', 'Demo authentication']
  },
  {
    name: 'Search & Filters',
    description: 'Product search, category filters, sorting',
    status: 'completed',
    icon: <Search className="h-5 w-5" />,
    details: ['Search by name', 'Category filtering', 'Price range filters', 'Sort by price/rating']
  },
  {
    name: 'Product Details',
    description: 'Individual product pages with full information',
    status: 'completed',
    icon: <FileText className="h-5 w-5" />,
    details: ['Product detail pages', 'Image gallery', 'Ingredients & dosage info', 'Related products']
  },
  {
    name: 'Consultation Booking',
    description: 'Book consultations with doctors',
    status: 'completed',
    icon: <MessageCircle className="h-5 w-5" />,
    details: ['Consultation page functional', 'Booking buttons working', 'Doctor selection']
  },
  {
    name: 'Categories',
    description: 'Product categorization and navigation',
    status: 'completed',
    icon: <FileText className="h-5 w-5" />,
    details: ['9 categories created', 'Category pages functional', 'Ayurvedic categories']
  },
  {
    name: 'Wishlist',
    description: 'Save favorite products',
    status: 'in-progress',
    icon: <Heart className="h-5 w-5" />,
    details: ['Wishlist context created', 'Add to wishlist buttons', 'Wishlist page needed']
  },
  {
    name: 'Checkout Process',
    description: 'Order placement and payment integration',
    status: 'pending',
    icon: <CreditCard className="h-5 w-5" />,
    details: ['Checkout page exists', 'Payment integration needed', 'Order processing']
  },
  {
    name: 'User Account',
    description: 'User profile, order history, account management',
    status: 'in-progress',
    icon: <Users className="h-5 w-5" />,
    details: ['Account dashboard created', 'Profile management needed', 'Order history needed']
  },
  {
    name: 'Reviews & Ratings',
    description: 'Product reviews and rating system',
    status: 'pending',
    icon: <Star className="h-5 w-5" />,
    details: ['Review components exist', 'Rating display implemented', 'Review submission needed']
  },
  {
    name: 'Blog System',
    description: 'Health articles and Ayurvedic content',
    status: 'in-progress',
    icon: <FileText className="h-5 w-5" />,
    details: ['Blog page created', 'Article templates', 'Content management needed']
  },
  {
    name: 'Admin Panel',
    description: 'Product management, order management',
    status: 'pending',
    icon: <Settings className="h-5 w-5" />,
    details: ['Admin routes created', 'Dashboard needed', 'Product management needed']
  },
  {
    name: 'Security & Privacy',
    description: 'Data protection, secure authentication',
    status: 'in-progress',
    icon: <Shield className="h-5 w-5" />,
    details: ['Basic security implemented', 'Privacy policy needed', 'Data encryption needed']
  },
  {
    name: 'Shipping & Delivery',
    description: 'Shipping calculation, delivery tracking',
    status: 'pending',
    icon: <Truck className="h-5 w-5" />,
    details: ['Shipping service created', 'Rate calculation needed', 'Tracking system needed']
  },
  {
    name: 'Placeholder Images',
    description: 'High-quality SVG placeholder images for products',
    status: 'completed',
    icon: <FileText className="h-5 w-5" />,
    details: ['Custom SVG placeholder created', 'Crown logo included', 'Ayurvedic bottle design', 'Used across all product displays']
  }
]

export default function DevStatusPage() {
  const completedCount = features.filter(f => f.status === 'completed').length
  const inProgressCount = features.filter(f => f.status === 'in-progress').length
  const pendingCount = features.filter(f => f.status === 'pending').length
  const needsFixCount = features.filter(f => f.status === 'needs-fix').length
  
  const completionPercentage = Math.round((completedCount / features.length) * 100)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'pending':
        return <Circle className="h-5 w-5 text-gray-400" />
      case 'needs-fix':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'in-progress':
        return 'bg-yellow-50 border-yellow-200'
      case 'pending':
        return 'bg-gray-50 border-gray-200'
      case 'needs-fix':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Crown className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-charcoal font-serif">
              AyuraVeda Royale - Development Status
            </h1>
          </div>
          
          {/* Progress Overview */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-charcoal">Overall Progress</h2>
              <span className="text-2xl font-bold text-emerald-600">{completionPercentage}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-600">{inProgressCount}</div>
                <div className="text-sm text-yellow-700">In Progress</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-gray-600">{pendingCount}</div>
                <div className="text-sm text-gray-700">Pending</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-600">{needsFixCount}</div>
                <div className="text-sm text-red-700">Needs Fix</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="grid gap-4">
          {features.map((feature, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-soft border ${getStatusBg(feature.status)} p-6 transition-all duration-200 hover:shadow-md`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(feature.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {feature.icon}
                    <h3 className="text-lg font-semibold text-charcoal">{feature.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      feature.status === 'completed' ? 'bg-green-100 text-green-800' :
                      feature.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      feature.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {feature.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-charcoal/70 mb-3">{feature.description}</p>
                  
                  {feature.details && (
                    <ul className="space-y-1">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-charcoal/60">
                          <div className="w-1 h-1 bg-charcoal/40 rounded-full" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Updates */}
        <div className="mt-12 bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-charcoal mb-4">Recent Updates</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-charcoal/70">Fixed product display issues - all products now showing correctly</span>
              <span className="text-charcoal/50">Today</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-charcoal/70">Enhanced cart functionality with proper integration</span>
              <span className="text-charcoal/50">Today</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-charcoal/70">Implemented crown logo and AyuraVeda Royale branding</span>
              <span className="text-charcoal/50">Today</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-charcoal/70">Created placeholder images for better visual consistency</span>
              <span className="text-charcoal/50">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 