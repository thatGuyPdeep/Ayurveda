# AyurvedaCart - Backend Integration Guide

## Architecture Overview

This guide outlines the backend architecture and integration patterns for AyurvedaCart, built on a modern serverless stack with Supabase as the primary backend service, complemented by Next.js API routes and serverless functions for complex business logic.

## Technology Stack

### Core Backend Technologies
- **Database**: PostgreSQL (Supabase)
- **Backend-as-a-Service**: Supabase
- **API Framework**: Next.js 14 API Routes (App Router)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Real-time
- **Serverless Functions**: Supabase Edge Functions (Deno)
- **Caching**: Redis (Upstash)
- **Queue Management**: Inngest
- **Monitoring**: Sentry + Supabase Analytics

### External Services Integration
- **Payment Gateway**: Razorpay (India) + Stripe (International)
- **SMS Service**: Twilio
- **Email Service**: Resend
- **Video Consultation**: Agora.io
- **Shipping**: Shiprocket API
- **Search**: Algolia (for advanced search)

## API Architecture

### REST API Structure
```
/api/
├── auth/
│   ├── login/route.ts
│   ├── register/route.ts
│   ├── logout/route.ts
│   ├── verify-otp/route.ts
│   └── reset-password/route.ts
├── products/
│   ├── route.ts                    # GET /api/products
│   ├── [slug]/route.ts            # GET /api/products/[slug]
│   ├── search/route.ts            # POST /api/products/search
│   ├── categories/
│   │   └── [slug]/route.ts        # GET /api/products/categories/[slug]
│   └── recommendations/
│       └── [productId]/route.ts   # GET /api/products/recommendations/[productId]
├── cart/
│   ├── route.ts                   # GET, POST /api/cart
│   ├── items/
│   │   └── [itemId]/route.ts      # PUT, DELETE /api/cart/items/[itemId]
│   └── sync/route.ts              # POST /api/cart/sync
├── orders/
│   ├── route.ts                   # GET, POST /api/orders
│   ├── [orderId]/
│   │   ├── route.ts               # GET /api/orders/[orderId]
│   │   ├── cancel/route.ts        # POST /api/orders/[orderId]/cancel
│   │   └── track/route.ts         # GET /api/orders/[orderId]/track
│   └── payment/
│       ├── initiate/route.ts      # POST /api/orders/payment/initiate
│       ├── verify/route.ts        # POST /api/orders/payment/verify
│       └── webhook/route.ts       # POST /api/orders/payment/webhook
├── users/
│   ├── profile/route.ts           # GET, PUT /api/users/profile
│   ├── addresses/route.ts         # GET, POST /api/users/addresses
│   ├── addresses/[id]/route.ts    # PUT, DELETE /api/users/addresses/[id]
│   └── preferences/route.ts       # GET, PUT /api/users/preferences
├── consultations/
│   ├── route.ts                   # GET, POST /api/consultations
│   ├── [id]/route.ts              # GET /api/consultations/[id]
│   ├── doctors/route.ts           # GET /api/consultations/doctors
│   └── availability/route.ts      # GET /api/consultations/availability
├── reviews/
│   ├── route.ts                   # POST /api/reviews
│   ├── [id]/route.ts              # PUT, DELETE /api/reviews/[id]
│   └── helpful/route.ts           # POST /api/reviews/helpful
└── admin/
    ├── products/route.ts          # Admin product management
    ├── orders/route.ts            # Admin order management
    ├── users/route.ts             # Admin user management
    └── analytics/route.ts         # Admin analytics
```

## Service Layer Architecture

### Base Service Pattern
```typescript
// lib/services/base.ts
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { MonitoringService } from '@/lib/monitoring'
import { CacheService } from '@/lib/cache'

export abstract class BaseService {
  protected supabase = supabase
  protected supabaseAdmin = supabaseAdmin
  protected cache = CacheService
  protected monitoring = MonitoringService

  protected async withErrorHandling<T>(
    operation: () => Promise<T>,
    context: { service: string; method: string; params?: any }
  ): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      this.monitoring.captureException(error as Error, {
        tags: { service: context.service, method: context.method },
        extra: context.params
      })
      throw error
    }
  }

  protected async withCache<T>(
    key: string,
    operation: () => Promise<T>,
    ttl = 3600
  ): Promise<T> {
    const cached = await this.cache.get<T>(key)
    if (cached !== null) {
      return cached
    }

    const result = await operation()
    await this.cache.set(key, result, ttl)
    return result
  }
}
```

### Product Service
```typescript
// lib/services/product.ts
import { BaseService } from './base'
import { ProductRepository } from '@/lib/repositories/products'
import type { Database } from '@/types/supabase'

interface ProductFilters {
  categoryId?: string
  brandIds?: string[]
  priceRange?: { min: number; max: number }
  sortBy?: 'name' | 'price_low' | 'price_high' | 'newest' | 'rating'
  search?: string
  limit?: number
  offset?: number
}

interface ProductSearchResult {
  products: Array<Database['public']['Tables']['products']['Row']>
  total: number
  filters: {
    brands: Array<{ id: string; name: string; count: number }>
    categories: Array<{ id: string; name: string; count: number }>
    priceRange: { min: number; max: number }
  }
}

export class ProductService extends BaseService {
  private repository = new ProductRepository()

  async getProducts(filters: ProductFilters = {}): Promise<ProductSearchResult> {
    return this.withErrorHandling(
      async () => {
        const cacheKey = `products:${JSON.stringify(filters)}`
        
        return this.withCache(
          cacheKey,
          async () => {
            // Build base query
            let query = this.supabase
              .from('products')
              .select(`
                *,
                brand:brands(*),
                categories:product_categories(
                  category:categories(*)
                ),
                images:product_images(*),
                reviews_aggregate:product_reviews(rating)
              `)
              .eq('status', 'active')

            // Apply filters
            if (filters.categoryId) {
              query = query.eq('product_categories.category_id', filters.categoryId)
            }

            if (filters.brandIds?.length) {
              query = query.in('brand_id', filters.brandIds)
            }

            if (filters.priceRange) {
              query = query
                .gte('selling_price', filters.priceRange.min)
                .lte('selling_price', filters.priceRange.max)
            }

            if (filters.search) {
              query = query.textSearch('search_vector', filters.search)
            }

            // Apply sorting
            switch (filters.sortBy) {
              case 'price_low':
                query = query.order('selling_price', { ascending: true })
                break
              case 'price_high':
                query = query.order('selling_price', { ascending: false })
                break
              case 'newest':
                query = query.order('created_at', { ascending: false })
                break
              case 'rating':
                query = query.order('average_rating', { ascending: false, nullsLast: true })
                break
              default:
                query = query.order('name', { ascending: true })
            }

            // Apply pagination
            const limit = filters.limit || 20
            const offset = filters.offset || 0
            query = query.range(offset, offset + limit - 1)

            const { data: products, error, count } = await query

            if (error) throw error

            // Get filter aggregations
            const filterData = await this.getFilterAggregations(filters)

            return {
              products: products || [],
              total: count || 0,
              filters: filterData
            }
          },
          600 // 10 minutes cache
        )
      },
      { service: 'ProductService', method: 'getProducts', params: filters }
    )
  }

  async getProductBySlug(slug: string) {
    return this.withErrorHandling(
      async () => {
        const cacheKey = `product:${slug}`
        
        return this.withCache(
          cacheKey,
          async () => {
            const { data, error } = await this.supabase
              .from('products')
              .select(`
                *,
                brand:brands(*),
                categories:product_categories(
                  category:categories(*)
                ),
                images:product_images(*),
                variants:product_variants(*),
                reviews:product_reviews(
                  *,
                  user:users(first_name, last_name)
                )
              `)
              .eq('slug', slug)
              .eq('status', 'active')
              .single()

            if (error) throw error

            // Log product view
            await this.logProductView(data.id)

            return data
          },
          1800 // 30 minutes cache
        )
      },
      { service: 'ProductService', method: 'getProductBySlug', params: { slug } }
    )
  }

  async getRecommendations(productId: string, limit = 4) {
    return this.withErrorHandling(
      async () => {
        const cacheKey = `recommendations:${productId}:${limit}`
        
        return this.withCache(
          cacheKey,
          async () => {
            // Get collaborative filtering recommendations
            const { data: recommendations, error } = await this.supabase
              .from('product_recommendations')
              .select(`
                recommended_product:products(
                  *,
                  brand:brands(*),
                  images:product_images(*)
                )
              `)
              .eq('source_product_id', productId)
              .order('score', { ascending: false })
              .limit(limit)

            if (error) throw error

            return recommendations?.map(r => r.recommended_product) || []
          },
          3600 // 1 hour cache
        )
      },
      { service: 'ProductService', method: 'getRecommendations', params: { productId, limit } }
    )
  }

  private async getFilterAggregations(filters: ProductFilters) {
    // Implementation for getting filter counts and ranges
    const [brandsData, categoriesData, priceData] = await Promise.all([
      this.getBrandAggregations(filters),
      this.getCategoryAggregations(filters),
      this.getPriceRangeAggregations(filters)
    ])

    return {
      brands: brandsData,
      categories: categoriesData,
      priceRange: priceData
    }
  }

  private async getBrandAggregations(filters: ProductFilters) {
    const { data, error } = await this.supabaseAdmin.rpc('get_brand_aggregations', {
      category_filter: filters.categoryId,
      search_filter: filters.search
    })

    return data || []
  }

  private async getCategoryAggregations(filters: ProductFilters) {
    const { data, error } = await this.supabaseAdmin.rpc('get_category_aggregations', {
      brand_filters: filters.brandIds,
      search_filter: filters.search
    })

    return data || []
  }

  private async getPriceRangeAggregations(filters: ProductFilters) {
    const { data, error } = await this.supabaseAdmin.rpc('get_price_range', {
      category_filter: filters.categoryId,
      brand_filters: filters.brandIds,
      search_filter: filters.search
    })

    return data || { min: 0, max: 10000 }
  }

  private async logProductView(productId: string) {
    // Log product view for analytics
    await this.supabase
      .from('product_views')
      .insert({
        product_id: productId,
        viewed_at: new Date().toISOString()
      })
  }
}
```

### Order Service
```typescript
// lib/services/order.ts
import { BaseService } from './base'
import { PaymentService } from './payment'
import { InventoryService } from './inventory'
import { NotificationService } from './notification'

interface CreateOrderData {
  user_id: string
  items: Array<{
    product_id: string
    variant_id?: string
    quantity: number
  }>
  shipping_address: any
  billing_address?: any
  coupon_code?: string
  payment_method: string
}

export class OrderService extends BaseService {
  private paymentService = new PaymentService()
  private inventoryService = new InventoryService()
  private notificationService = new NotificationService()

  async createOrder(orderData: CreateOrderData) {
    return this.withErrorHandling(
      async () => {
        // Start transaction
        const { data: session, error: sessionError } = await this.supabaseAdmin.rpc(
          'begin_transaction'
        )

        try {
          // 1. Validate inventory
          await this.inventoryService.validateAvailability(orderData.items)

          // 2. Calculate pricing
          const pricing = await this.calculateOrderPricing(orderData)

          // 3. Apply coupon if provided
          if (orderData.coupon_code) {
            const discount = await this.applyCoupon(orderData.coupon_code, pricing.subtotal)
            pricing.discount_amount = discount.amount
            pricing.total_amount -= discount.amount
          }

          // 4. Create order record
          const order = await this.createOrderRecord({
            ...orderData,
            ...pricing
          })

          // 5. Reserve inventory
          await this.inventoryService.reserveItems(orderData.items, order.id)

          // 6. Initiate payment
          const paymentResult = await this.paymentService.initiatePayment({
            order_id: order.id,
            amount: pricing.total_amount,
            payment_method: orderData.payment_method
          })

          // 7. Send confirmation email
          await this.notificationService.sendOrderConfirmation(order)

          await this.supabaseAdmin.rpc('commit_transaction')

          return {
            order,
            payment: paymentResult
          }

        } catch (error) {
          await this.supabaseAdmin.rpc('rollback_transaction')
          throw error
        }
      },
      { service: 'OrderService', method: 'createOrder', params: orderData }
    )
  }

  async getOrdersByUser(userId: string, options: { limit?: number; offset?: number } = {}) {
    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('orders')
          .select(`
            *,
            order_items(
              *,
              product:products(
                name,
                images:product_images(*)
              )
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .range(options.offset || 0, (options.offset || 0) + (options.limit || 10) - 1)

        if (error) throw error
        return data
      },
      { service: 'OrderService', method: 'getOrdersByUser', params: { userId, options } }
    )
  }

  async updateOrderStatus(orderId: string, status: string, metadata?: any) {
    return this.withErrorHandling(
      async () => {
        const updateData: any = {
          status,
          updated_at: new Date().toISOString()
        }

        // Add timestamp for specific statuses
        switch (status) {
          case 'confirmed':
            updateData.confirmed_at = new Date().toISOString()
            break
          case 'shipped':
            updateData.shipped_at = new Date().toISOString()
            if (metadata?.tracking_number) {
              updateData.tracking_number = metadata.tracking_number
            }
            break
          case 'delivered':
            updateData.delivered_at = new Date().toISOString()
            break
        }

        const { data, error } = await this.supabaseAdmin
          .from('orders')
          .update(updateData)
          .eq('id', orderId)
          .select()
          .single()

        if (error) throw error

        // Send status update notification
        await this.notificationService.sendOrderStatusUpdate(data)

        // Invalidate cache
        await this.cache.invalidatePattern(`order:${orderId}*`)

        return data
      },
      { service: 'OrderService', method: 'updateOrderStatus', params: { orderId, status, metadata } }
    )
  }

  private async calculateOrderPricing(orderData: CreateOrderData) {
    let subtotal = 0
    const orderItems = []

    for (const item of orderData.items) {
      const { data: product, error } = await this.supabase
        .from('products')
        .select('id, name, sku, selling_price')
        .eq('id', item.product_id)
        .single()

      if (error || !product) {
        throw new Error(`Product not found: ${item.product_id}`)
      }

      const itemTotal = product.selling_price * item.quantity
      subtotal += itemTotal

      orderItems.push({
        product_id: item.product_id,
        variant_id: item.variant_id,
        product_name: product.name,
        product_sku: product.sku,
        quantity: item.quantity,
        unit_price: product.selling_price,
        total_price: itemTotal
      })
    }

    // Calculate tax (18% GST for India)
    const tax_amount = subtotal * 0.18

    // Calculate shipping
    const shipping_amount = subtotal >= 700 ? 0 : 50

    const total_amount = subtotal + tax_amount + shipping_amount

    return {
      subtotal,
      tax_amount,
      shipping_amount,
      discount_amount: 0,
      total_amount,
      order_items: orderItems
    }
  }

  private async createOrderRecord(orderData: any) {
    const { data, error } = await this.supabaseAdmin
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        order_number: this.generateOrderNumber(),
        subtotal: orderData.subtotal,
        tax_amount: orderData.tax_amount,
        shipping_amount: orderData.shipping_amount,
        discount_amount: orderData.discount_amount,
        total_amount: orderData.total_amount,
        shipping_address: orderData.shipping_address,
        billing_address: orderData.billing_address,
        status: 'pending',
        payment_status: 'pending'
      })
      .select()
      .single()

    if (error) throw error

    // Insert order items
    const orderItems = orderData.order_items.map((item: any) => ({
      ...item,
      order_id: data.id
    }))

    const { error: itemsError } = await this.supabaseAdmin
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return data
  }

  private async applyCoupon(couponCode: string, subtotal: number) {
    const { data: coupon, error } = await this.supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode)
      .eq('is_active', true)
      .gte('valid_until', new Date().toISOString())
      .lte('valid_from', new Date().toISOString())
      .single()

    if (error || !coupon) {
      throw new Error('Invalid or expired coupon code')
    }

    if (subtotal < coupon.minimum_order_value) {
      throw new Error(`Minimum order value of ₹${coupon.minimum_order_value} required`)
    }

    let discountAmount = 0
    if (coupon.discount_type === 'percentage') {
      discountAmount = (subtotal * coupon.discount_value) / 100
      if (coupon.maximum_discount_amount) {
        discountAmount = Math.min(discountAmount, coupon.maximum_discount_amount)
      }
    } else {
      discountAmount = coupon.discount_value
    }

    return {
      amount: discountAmount,
      coupon
    }
  }

  private generateOrderNumber(): string {
    return `AYU-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  }
}
```

### Payment Service Integration
```typescript
// lib/services/payment.ts
import { BaseService } from './base'
import Razorpay from 'razorpay'
import Stripe from 'stripe'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
})

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

interface PaymentInitiationData {
  order_id: string
  amount: number
  payment_method: 'razorpay' | 'stripe' | 'upi' | 'netbanking'
  customer_details?: {
    name: string
    email: string
    phone: string
  }
}

export class PaymentService extends BaseService {
  async initiatePayment(data: PaymentInitiationData) {
    return this.withErrorHandling(
      async () => {
        switch (data.payment_method) {
          case 'razorpay':
            return this.initiateRazorpayPayment(data)
          case 'stripe':
            return this.initiateStripePayment(data)
          case 'upi':
            return this.initiateUPIPayment(data)
          default:
            throw new Error(`Unsupported payment method: ${data.payment_method}`)
        }
      },
      { service: 'PaymentService', method: 'initiatePayment', params: data }
    )
  }

  async verifyPayment(paymentId: string, paymentMethod: string, signature?: string) {
    return this.withErrorHandling(
      async () => {
        switch (paymentMethod) {
          case 'razorpay':
            return this.verifyRazorpayPayment(paymentId, signature!)
          case 'stripe':
            return this.verifyStripePayment(paymentId)
          default:
            throw new Error(`Unsupported payment method: ${paymentMethod}`)
        }
      },
      { service: 'PaymentService', method: 'verifyPayment', params: { paymentId, paymentMethod } }
    )
  }

  private async initiateRazorpayPayment(data: PaymentInitiationData) {
    const options = {
      amount: Math.round(data.amount * 100), // Convert to paise
      currency: 'INR',
      receipt: data.order_id,
      notes: {
        order_id: data.order_id
      }
    }

    const razorpayOrder = await razorpay.orders.create(options)

    // Store payment record
    const { data: payment, error } = await this.supabaseAdmin
      .from('payments')
      .insert({
        order_id: data.order_id,
        payment_gateway: 'razorpay',
        gateway_order_id: razorpayOrder.id,
        amount: data.amount,
        currency: 'INR',
        status: 'pending'
      })
      .select()
      .single()

    if (error) throw error

    return {
      payment_id: payment.id,
      gateway_order_id: razorpayOrder.id,
      amount: data.amount,
      currency: 'INR',
      payment_method: 'razorpay'
    }
  }

  private async initiateStripePayment(data: PaymentInitiationData) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        order_id: data.order_id
      }
    })

    // Store payment record
    const { data: payment, error } = await this.supabaseAdmin
      .from('payments')
      .insert({
        order_id: data.order_id,
        payment_gateway: 'stripe',
        gateway_payment_id: paymentIntent.id,
        amount: data.amount,
        currency: 'USD',
        status: 'pending'
      })
      .select()
      .single()

    if (error) throw error

    return {
      payment_id: payment.id,
      client_secret: paymentIntent.client_secret,
      amount: data.amount,
      currency: 'USD',
      payment_method: 'stripe'
    }
  }

  private async verifyRazorpayPayment(paymentId: string, signature: string) {
    // Verify Razorpay signature
    const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils')
    
    const { data: payment } = await this.supabase
      .from('payments')
      .select('gateway_order_id')
      .eq('id', paymentId)
      .single()

    const isValid = validatePaymentVerification(
      {
        order_id: payment.gateway_order_id,
        payment_id: paymentId
      },
      signature,
      process.env.RAZORPAY_KEY_SECRET!
    )

    if (isValid) {
      await this.updatePaymentStatus(paymentId, 'completed')
      return { verified: true }
    } else {
      await this.updatePaymentStatus(paymentId, 'failed')
      return { verified: false }
    }
  }

  private async verifyStripePayment(paymentIntentId: string) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    
    const verified = paymentIntent.status === 'succeeded'
    const status = verified ? 'completed' : 'failed'

    await this.updatePaymentStatus(paymentIntentId, status)
    
    return { verified }
  }

  private async updatePaymentStatus(paymentId: string, status: string) {
    await this.supabaseAdmin
      .from('payments')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentId)
  }
}
```

## API Route Implementation

### Product API Routes
```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { ProductService } from '@/lib/services/product'

const productService = new ProductService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters = {
      categoryId: searchParams.get('category'),
      brandIds: searchParams.get('brands')?.split(','),
      priceRange: searchParams.get('priceMin') && searchParams.get('priceMax') ? {
        min: parseInt(searchParams.get('priceMin')!),
        max: parseInt(searchParams.get('priceMax')!)
      } : undefined,
      sortBy: searchParams.get('sort') as any,
      search: searchParams.get('q'),
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0')
    }

    const result = await productService.getProducts(filters)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
```

### Order API Routes
```typescript
// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { OrderService } from '@/lib/services/order'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const orderService = new OrderService()

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const orderData = await request.json()
    orderData.user_id = session.user.id

    const result = await orderService.createOrder(orderData)

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const orders = await orderService.getOrdersByUser(session.user.id, { limit, offset })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
```

## Middleware and Authentication

### API Authentication Middleware
```typescript
// lib/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function authMiddleware(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  return handler(request, session.user)
}

export async function adminMiddleware(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
) {
  return authMiddleware(request, async (req, user) => {
    const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() })
    
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (userRole?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    return handler(req, user)
  })
}
```

### Rate Limiting Middleware
```typescript
// lib/middleware/rateLimit.ts
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

interface RateLimitOptions {
  windowMs: number
  maxRequests: number
  keyGenerator?: (request: NextRequest) => string
}

export function rateLimit(options: RateLimitOptions) {
  return async function rateLimitMiddleware(
    request: NextRequest,
    handler: (request: NextRequest) => Promise<NextResponse>
  ) {
    const key = options.keyGenerator 
      ? options.keyGenerator(request)
      : request.ip || 'anonymous'

    const rateLimitKey = `rate_limit:${key}`
    
    const current = await redis.get(rateLimitKey)
    
    if (current && parseInt(current) >= options.maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    await redis.multi()
      .incr(rateLimitKey)
      .expire(rateLimitKey, Math.ceil(options.windowMs / 1000))
      .exec()

    return handler(request)
  }
}

// Usage example
export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  keyGenerator: (req) => req.ip || 'anonymous'
})
```

## Background Jobs and Queue Management

### Job Queue Setup
```typescript
// lib/jobs/index.ts
import { Inngest } from 'inngest'

export const inngest = new Inngest({
  id: 'ayurvedacart',
  name: 'AyurvedaCart Jobs'
})

// Email jobs
export const sendWelcomeEmail = inngest.createFunction(
  { id: 'send-welcome-email' },
  { event: 'user.registered' },
  async ({ event, step }) => {
    const { user } = event.data

    await step.run('send-email', async () => {
      // Send welcome email
      await sendEmail({
        to: user.email,
        template: 'welcome',
        data: { name: user.first_name }
      })
    })
  }
)

// Order processing jobs
export const processOrder = inngest.createFunction(
  { id: 'process-order' },
  { event: 'order.created' },
  async ({ event, step }) => {
    const { order } = event.data

    // Step 1: Update inventory
    await step.run('update-inventory', async () => {
      await updateInventoryForOrder(order)
    })

    // Step 2: Send confirmation email
    await step.run('send-confirmation', async () => {
      await sendOrderConfirmationEmail(order)
    })

    // Step 3: Notify vendors
    await step.run('notify-vendors', async () => {
      await notifyVendorsOfNewOrder(order)
    })
  }
)

// Inventory management
export const updateInventory = inngest.createFunction(
  { id: 'update-inventory' },
  { event: 'inventory.update' },
  async ({ event, step }) => {
    const { product_id, quantity_change } = event.data

    await step.run('update-stock', async () => {
      await updateProductStock(product_id, quantity_change)
    })

    await step.run('check-low-stock', async () => {
      await checkLowStockAlert(product_id)
    })
  }
)
```

## Caching Strategy

### Multi-layer Caching
```typescript
// lib/cache/index.ts
import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

export class CacheManager {
  // Level 1: Memory cache (for very frequent data)
  private memoryCache = new Map<string, { data: any; expires: number }>()

  // Level 2: Redis cache (for shared data across instances)
  private redis = redis

  async get<T>(key: string): Promise<T | null> {
    // Check memory cache first
    const memCached = this.memoryCache.get(key)
    if (memCached && memCached.expires > Date.now()) {
      return memCached.data
    }

    // Check Redis cache
    const redisCached = await this.redis.get(key)
    if (redisCached) {
      const data = JSON.parse(redisCached)
      
      // Store in memory cache for faster access
      this.memoryCache.set(key, {
        data,
        expires: Date.now() + 60000 // 1 minute in memory
      })
      
      return data
    }

    return null
  }

  async set(key: string, value: any, ttl = 3600): Promise<void> {
    // Store in Redis
    await this.redis.setex(key, ttl, JSON.stringify(value))
    
    // Store in memory cache
    this.memoryCache.set(key, {
      data: value,
      expires: Date.now() + Math.min(ttl * 1000, 300000) // Max 5 minutes in memory
    })
  }

  async invalidate(pattern: string): Promise<void> {
    // Clear memory cache
    for (const key of this.memoryCache.keys()) {
      if (key.includes(pattern)) {
        this.memoryCache.delete(key)
      }
    }

    // Clear Redis cache
    const keys = await this.redis.keys(pattern)
    if (keys.length > 0) {
      await this.redis.del(...keys)
    }
  }

  async invalidateTag(tag: string): Promise<void> {
    // Implement tag-based invalidation
    const tagKey = `tag:${tag}`
    const keys = await this.redis.smembers(tagKey)
    
    if (keys.length > 0) {
      await this.redis.del(...keys)
      await this.redis.del(tagKey)
    }
  }
}

export const cache = new CacheManager()
```

## Error Handling and Monitoring

### Global Error Handler
```typescript
// lib/errors/handler.ts
import * as Sentry from '@sentry/nextjs'

export class APIError extends Error {
  public statusCode: number
  public code: string

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.name = 'APIError'
  }
}

export function handleAPIError(error: any) {
  console.error('API Error:', error)

  // Send to Sentry
  Sentry.captureException(error)

  if (error instanceof APIError) {
    return {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode
    }
  }

  // Database errors
  if (error.code?.startsWith('23')) {
    return {
      error: 'Database constraint violation',
      code: 'DATABASE_ERROR',
      statusCode: 400
    }
  }

  // Default error
  return {
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    statusCode: 500
  }
}
```

This comprehensive backend integration guide provides a solid foundation for building a scalable, maintainable, and secure backend architecture for the AyurvedaCart e-commerce platform using modern serverless technologies and best practices. 