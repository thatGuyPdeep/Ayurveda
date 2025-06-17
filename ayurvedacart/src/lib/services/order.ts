import { BaseService } from './base'
import type { Database } from '@/types/supabase'

type OrderRow = Database['public']['Tables']['orders']['Row']
type OrderInsert = Database['public']['Tables']['orders']['Insert']
type OrderUpdate = Database['public']['Tables']['orders']['Update']
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']

export interface CreateOrderData {
  user_id?: string
  items: Array<{
    product_id: string
    quantity: number
    product_name?: string
    product_sku?: string
    unit_price?: number
  }>
  shipping_address: {
    first_name: string
    last_name: string
    email: string
    phone: string
    address_line_1: string
    address_line_2?: string
    city: string
    state: string
    postal_code: string
    country: string
    landmark?: string
  }
  billing_address?: any
  coupon_code?: string
  payment_method: string
  notes?: string
}

export interface OrderPricing {
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  total_amount: number
  order_items: Array<{
    product_id: string
    product_name: string
    product_sku: string
    quantity: number
    unit_price: number
    total_price: number
  }>
}

export class OrderService extends BaseService {
  async createOrder(orderData: CreateOrderData): Promise<{
    order: OrderRow
    pricing: OrderPricing
  }> {
    return this.withErrorHandling(
      async () => {
        this.validateRequired(orderData, ['items', 'shipping_address', 'payment_method'])
        
        if (!orderData.items?.length) {
          throw new Error('Order must contain at least one item')
        }

        // Calculate pricing
        const pricing = await this.calculateOrderPricing(orderData)

        // Create order record
        const orderNumber = this.generateOrderNumber()
        
        const orderInsert: OrderInsert = {
          order_number: orderNumber,
          user_id: orderData.user_id,
          subtotal: pricing.subtotal,
          tax_amount: pricing.tax_amount,
          shipping_amount: pricing.shipping_amount,
          discount_amount: pricing.discount_amount,
          total_amount: pricing.total_amount,
          shipping_address: orderData.shipping_address,
          billing_address: orderData.billing_address || orderData.shipping_address,
          currency: 'USD',
          exchange_rate: 1.0,
          status: 'pending',
          payment_status: 'pending',
          notes: orderData.notes,
          ordered_at: new Date().toISOString()
        }

        const { data: order, error: orderError } = await this.supabaseAdmin
          .from('orders')
          .insert(orderInsert)
          .select()
          .single()

        if (orderError) {
          console.error('Order creation error:', orderError)
          throw new Error('Failed to create order')
        }

        // Create order items
        const orderItems: OrderItemInsert[] = pricing.order_items.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          product_name: item.product_name,
          product_sku: item.product_sku,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price
        }))

        const { error: itemsError } = await this.supabaseAdmin
          .from('order_items')
          .insert(orderItems)

        if (itemsError) {
          console.error('Order items creation error:', itemsError)
          throw new Error('Failed to create order items')
        }

        return {
          order,
          pricing
        }
      },
      { service: 'OrderService', method: 'createOrder', params: orderData }
    )
  }

  async getOrdersByUser(userId: string, options: { limit?: number; offset?: number } = {}): Promise<OrderRow[]> {
    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('orders')
          .select(`
            *,
            order_items(
              *
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .range(options.offset || 0, (options.offset || 0) + (options.limit || 10) - 1)

        if (error) {
          console.error('Error fetching user orders:', error)
          throw new Error('Failed to fetch orders')
        }

        return data || []
      },
      { service: 'OrderService', method: 'getOrdersByUser', params: { userId, options } }
    )
  }

  async getOrderById(orderId: string): Promise<OrderRow | null> {
    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('orders')
          .select(`
            *,
            order_items(
              *
            )
          `)
          .eq('id', orderId)
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            return null
          }
          throw error
        }

        return data
      },
      { service: 'OrderService', method: 'getOrderById', params: { orderId } }
    )
  }

  async updateOrderStatus(
    orderId: string, 
    status: OrderRow['status'], 
    metadata?: { tracking_number?: string }
  ): Promise<OrderRow> {
    return this.withErrorHandling(
      async () => {
        const updateData: OrderUpdate = {
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

        if (error) {
          console.error('Order status update error:', error)
          throw new Error('Failed to update order status')
        }

        return data
      },
      { service: 'OrderService', method: 'updateOrderStatus', params: { orderId, status, metadata } }
    )
  }

  async cancelOrder(orderId: string, reason?: string): Promise<OrderRow> {
    return this.withErrorHandling(
      async () => {
        const order = await this.getOrderById(orderId)
        if (!order) {
          throw new Error('Order not found')
        }

        if (!['pending', 'confirmed'].includes(order.status)) {
          throw new Error('Order cannot be cancelled in current status')
        }

        const { data, error } = await this.supabaseAdmin
          .from('orders')
          .update({
            status: 'cancelled',
            notes: reason ? `Cancelled: ${reason}` : 'Order cancelled',
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId)
          .select()
          .single()

        if (error) {
          console.error('Order cancellation error:', error)
          throw new Error('Failed to cancel order')
        }

        return data
      },
      { service: 'OrderService', method: 'cancelOrder', params: { orderId, reason } }
    )
  }

  private async calculateOrderPricing(orderData: CreateOrderData): Promise<OrderPricing> {
    let subtotal = 0
    const orderItems: OrderPricing['order_items'] = []

    for (const item of orderData.items) {
      let productData = null
      let unitPrice = item.unit_price || 0
      let productName = item.product_name || ''
      let productSku = item.product_sku || ''

      // If price/name/sku not provided, fetch from database
      if (!unitPrice || !productName || !productSku) {
        const { data: product, error } = await this.supabase
          .from('products')
          .select('id, name, sku, selling_price, stock_quantity')
          .eq('id', item.product_id)
          .single()

        if (error || !product) {
          throw new Error(`Product not found: ${item.product_id}`)
        }

        if (product.stock_quantity < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`)
        }

        productData = product
        unitPrice = product.selling_price
        productName = product.name
        productSku = product.sku
      }

      const itemTotal = unitPrice * item.quantity
      subtotal += itemTotal

      orderItems.push({
        product_id: item.product_id,
        product_name: productName,
        product_sku: productSku,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: itemTotal
      })
    }

    // Calculate tax (18% GST for now)
    const tax_amount = Math.round(subtotal * 0.18 * 100) / 100

    // Calculate shipping (free shipping over $70)
    const shipping_amount = subtotal >= 70 ? 0 : 5

    // Apply coupon discount if provided
    let discount_amount = 0
    if (orderData.coupon_code) {
      discount_amount = await this.calculateCouponDiscount(orderData.coupon_code, subtotal)
    }

    const total_amount = subtotal + tax_amount + shipping_amount - discount_amount

    return {
      subtotal,
      tax_amount,
      shipping_amount,
      discount_amount,
      total_amount,
      order_items: orderItems
    }
  }

  private async calculateCouponDiscount(couponCode: string, subtotal: number): Promise<number> {
    // For now, implement basic discount logic
    // In production, this would check against a coupons table
    const discountMap: Record<string, number> = {
      'WELCOME10': 0.10,
      'SAVE20': 0.20,
      'FLAT50': 5
    }

    if (couponCode in discountMap) {
      const discount = discountMap[couponCode]
      if (discount < 1) {
        // Percentage discount
        return Math.round(subtotal * discount * 100) / 100
      } else {
        // Flat discount
        return Math.min(discount, subtotal)
      }
    }

    return 0
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `AYU-${timestamp}-${random}`
  }
} 