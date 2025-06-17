import { supabase } from '@/lib/supabase'

export interface AnalyticsEvent {
  event_type: string
  user_id?: string | undefined
  session_id?: string | undefined
  product_id?: string | undefined
  category_id?: string | undefined
  search_query?: string | undefined
  page_url?: string | undefined
  referrer_url?: string | undefined
  properties?: Record<string, any> | undefined
  timestamp?: string | undefined
}

export interface ProductAnalytics {
  product_id: string
  views: number
  cart_adds: number
  purchases: number
  conversion_rate: number
  revenue: number
  average_rating: number
  review_count: number
}

export interface UserBehaviorMetrics {
  page_views: number
  session_duration: number
  bounce_rate: number
  conversion_rate: number
  top_pages: Array<{ page: string; views: number }>
  top_products: Array<{ product_id: string; views: number }>
  search_queries: Array<{ query: string; count: number }>
}

export interface BusinessMetrics {
  total_revenue: number
  total_orders: number
  average_order_value: number
  customer_acquisition_cost: number
  customer_lifetime_value: number
  monthly_growth_rate: number
  top_selling_products: Array<{
    product_id: string
    name: string
    quantity_sold: number
    revenue: number
  }>
  top_categories: Array<{
    category_id: string
    name: string
    revenue: number
    order_count: number
  }>
}

export class AnalyticsService {
  // Event Tracking
  async trackEvent(event: AnalyticsEvent): Promise<void> {
    try {
      const eventData = {
        ...event,
        timestamp: event.timestamp || new Date().toISOString(),
        session_id: event.session_id || this.generateSessionId(),
        created_at: new Date().toISOString()
      }

      await supabase.from('analytics_events').insert(eventData)
    } catch (error) {
      console.error('Failed to track analytics event:', error)
    }
  }

  // Page View Tracking
  async trackPageView(data: {
    page_url: string
    page_title?: string
    user_id?: string
    referrer_url?: string
    session_duration?: number
  }): Promise<void> {
    const event: AnalyticsEvent = {
      event_type: 'page_view',
      page_url: data.page_url,
      properties: {
        page_title: data.page_title,
        session_duration: data.session_duration
      }
    }
    
    if (data.user_id) {
      event.user_id = data.user_id
    }
    
    if (data.referrer_url) {
      event.referrer_url = data.referrer_url
    }
    
    await this.trackEvent(event)
  }

  // Product Interaction Tracking
  async trackProductView(productId: string, userId?: string): Promise<void> {
    await this.trackEvent({
      event_type: 'product_view',
      user_id: userId,
      product_id: productId
    })
  }

  async trackAddToCart(productId: string, quantity: number, userId?: string): Promise<void> {
    await this.trackEvent({
      event_type: 'add_to_cart',
      user_id: userId,
      product_id: productId,
      properties: { quantity }
    })
  }

  async trackRemoveFromCart(productId: string, userId?: string): Promise<void> {
    await this.trackEvent({
      event_type: 'remove_from_cart',
      user_id: userId,
      product_id: productId
    })
  }

  async trackPurchase(orderId: string, userId: string, orderData: any): Promise<void> {
    await this.trackEvent({
      event_type: 'purchase',
      user_id: userId,
      properties: {
        order_id: orderId,
        total_amount: orderData.total_amount,
        item_count: orderData.items?.length || 0,
        payment_method: orderData.payment_method
      }
    })

    // Track individual product purchases
    if (orderData.items) {
      for (const item of orderData.items) {
        await this.trackEvent({
          event_type: 'product_purchase',
          user_id: userId,
          product_id: item.product_id,
          properties: {
            order_id: orderId,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total_price: item.total_price
          }
        })
      }
    }
  }

  // Search Tracking
  async trackSearch(query: string, resultsCount: number, userId?: string): Promise<void> {
    await this.trackEvent({
      event_type: 'search',
      user_id: userId,
      search_query: query,
      properties: {
        results_count: resultsCount
      }
    })
  }

  async trackSearchClick(query: string, productId: string, position: number, userId?: string): Promise<void> {
    await this.trackEvent({
      event_type: 'search_click',
      user_id: userId,
      product_id: productId,
      search_query: query,
      properties: {
        click_position: position
      }
    })
  }

  // User Journey Tracking
  async trackUserRegistration(userId: string, registrationMethod: string): Promise<void> {
    await this.trackEvent({
      event_type: 'user_registration',
      user_id: userId,
      properties: {
        registration_method: registrationMethod
      }
    })
  }

  async trackUserLogin(userId: string, loginMethod: string): Promise<void> {
    await this.trackEvent({
      event_type: 'user_login',
      user_id: userId,
      properties: {
        login_method: loginMethod
      }
    })
  }

  async trackCheckoutStart(userId: string, cartData: any): Promise<void> {
    await this.trackEvent({
      event_type: 'checkout_start',
      user_id: userId,
      properties: {
        cart_value: cartData.total,
        item_count: cartData.items?.length || 0
      }
    })
  }

  async trackCheckoutComplete(userId: string, orderId: string): Promise<void> {
    await this.trackEvent({
      event_type: 'checkout_complete',
      user_id: userId,
      properties: {
        order_id: orderId
      }
    })
  }

  // Analytics Retrieval
  async getProductAnalytics(productId: string, dateRange?: { start: string; end: string }): Promise<ProductAnalytics> {
    try {
      const whereClause = dateRange 
        ? `product_id = '${productId}' AND created_at >= '${dateRange.start}' AND created_at <= '${dateRange.end}'`
        : `product_id = '${productId}'`

      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('event_type, properties')
        .eq('product_id', productId)

      if (error) throw error

      const views = events?.filter(e => e.event_type === 'product_view').length || 0
      const cartAdds = events?.filter(e => e.event_type === 'add_to_cart').length || 0
      const purchases = events?.filter(e => e.event_type === 'product_purchase').length || 0

      const revenue = events
        ?.filter(e => e.event_type === 'product_purchase')
        .reduce((sum, e) => sum + (e.properties?.total_price || 0), 0) || 0

      const conversionRate = views > 0 ? (purchases / views) * 100 : 0

      // Get product rating data
      const { data: productData } = await supabase
        .from('products')
        .select('average_rating, review_count')
        .eq('id', productId)
        .single()

      return {
        product_id: productId,
        views,
        cart_adds,
        purchases,
        conversion_rate: conversionRate,
        revenue,
        average_rating: productData?.average_rating || 0,
        review_count: productData?.review_count || 0
      }
    } catch (error) {
      console.error('Failed to get product analytics:', error)
      throw error
    }
  }

  async getUserBehaviorMetrics(dateRange?: { start: string; end: string }): Promise<UserBehaviorMetrics> {
    try {
      let query = supabase.from('analytics_events').select('*')

      if (dateRange) {
        query = query.gte('created_at', dateRange.start).lte('created_at', dateRange.end)
      }

      const { data: events, error } = await query

      if (error) throw error

      const pageViews = events?.filter(e => e.event_type === 'page_view').length || 0
      
      // Calculate session duration (simplified)
      const sessionDurations = events
        ?.filter(e => e.event_type === 'page_view' && e.properties?.session_duration)
        .map(e => e.properties.session_duration)

      const averageSessionDuration = sessionDurations?.length > 0
        ? sessionDurations.reduce((sum, duration) => sum + duration, 0) / sessionDurations.length
        : 0

      // Calculate bounce rate (sessions with only one page view)
      const sessions = new Map()
      events?.forEach(event => {
        if (event.session_id) {
          if (!sessions.has(event.session_id)) {
            sessions.set(event.session_id, [])
          }
          sessions.get(event.session_id).push(event)
        }
      })

      const singlePageSessions = Array.from(sessions.values()).filter(session => session.length === 1).length
      const bounceRate = sessions.size > 0 ? (singlePageSessions / sessions.size) * 100 : 0

      // Top pages
      const pageViewCounts = new Map()
      events?.filter(e => e.event_type === 'page_view').forEach(event => {
        const page = event.page_url
        pageViewCounts.set(page, (pageViewCounts.get(page) || 0) + 1)
      })

      const topPages = Array.from(pageViewCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([page, views]) => ({ page, views }))

      // Top products
      const productViewCounts = new Map()
      events?.filter(e => e.event_type === 'product_view' && e.product_id).forEach(event => {
        const productId = event.product_id!
        productViewCounts.set(productId, (productViewCounts.get(productId) || 0) + 1)
      })

      const topProducts = Array.from(productViewCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([product_id, views]) => ({ product_id, views }))

      // Search queries
      const searchCounts = new Map()
      events?.filter(e => e.event_type === 'search' && e.search_query).forEach(event => {
        const query = event.search_query!
        searchCounts.set(query, (searchCounts.get(query) || 0) + 1)
      })

      const searchQueries = Array.from(searchCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([query, count]) => ({ query, count }))

      return {
        page_views: pageViews,
        session_duration: averageSessionDuration,
        bounce_rate: bounceRate,
        conversion_rate: 0, // Calculate separately
        top_pages: topPages,
        top_products: topProducts,
        search_queries: searchQueries
      }
    } catch (error) {
      console.error('Failed to get user behavior metrics:', error)
      throw error
    }
  }

  async getBusinessMetrics(dateRange?: { start: string; end: string }): Promise<BusinessMetrics> {
    try {
      // Get order data
      let orderQuery = supabase
        .from('orders')
        .select(`
          *,
          order_items(
            *,
            products(name, categories(*))
          )
        `)

      if (dateRange) {
        orderQuery = orderQuery.gte('created_at', dateRange.start).lte('created_at', dateRange.end)
      }

      const { data: orders, error } = await orderQuery

      if (error) throw error

      const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0
      const totalOrders = orders?.length || 0
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

      // Calculate top selling products
      const productSales = new Map()
      orders?.forEach(order => {
        order.order_items?.forEach((item: any) => {
          const productId = item.product_id
          if (!productSales.has(productId)) {
            productSales.set(productId, {
              product_id: productId,
              name: item.products?.name || 'Unknown',
              quantity_sold: 0,
              revenue: 0
            })
          }
          const product = productSales.get(productId)
          product.quantity_sold += item.quantity
          product.revenue += item.total_price
        })
      })

      const topSellingProducts = Array.from(productSales.values())
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10)

      // Calculate top categories
      const categorySales = new Map()
      orders?.forEach(order => {
        order.order_items?.forEach((item: any) => {
          const categories = item.products?.categories || []
          categories.forEach((category: any) => {
            const categoryId = category.id
            if (!categorySales.has(categoryId)) {
              categorySales.set(categoryId, {
                category_id: categoryId,
                name: category.name || 'Unknown',
                revenue: 0,
                order_count: 0
              })
            }
            const cat = categorySales.get(categoryId)
            cat.revenue += item.total_price
            cat.order_count += 1
          })
        })
      })

      const topCategories = Array.from(categorySales.values())
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10)

      return {
        total_revenue: totalRevenue,
        total_orders: totalOrders,
        average_order_value: averageOrderValue,
        customer_acquisition_cost: 0, // Calculate based on marketing spend
        customer_lifetime_value: 0, // Calculate based on historical data
        monthly_growth_rate: 0, // Calculate month-over-month growth
        top_selling_products: topSellingProducts,
        top_categories: topCategories
      }
    } catch (error) {
      console.error('Failed to get business metrics:', error)
      throw error
    }
  }

  // Real-time Metrics
  async getRealTimeMetrics(): Promise<{
    active_users: number
    current_page_views: number
    recent_orders: number
    conversion_rate: number
  }> {
    try {
      const now = new Date()
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

      // Active users in last hour
      const { data: activeUsers } = await supabase
        .from('analytics_events')
        .select('user_id')
        .gte('created_at', oneHourAgo.toISOString())
        .not('user_id', 'is', null)

      const uniqueActiveUsers = new Set(activeUsers?.map(u => u.user_id)).size

      // Page views in last hour
      const { data: pageViews } = await supabase
        .from('analytics_events')
        .select('id')
        .eq('event_type', 'page_view')
        .gte('created_at', oneHourAgo.toISOString())

      // Recent orders (last 24 hours)
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      const { data: recentOrders } = await supabase
        .from('orders')
        .select('id')
        .gte('created_at', twentyFourHoursAgo.toISOString())

      return {
        active_users: uniqueActiveUsers,
        current_page_views: pageViews?.length || 0,
        recent_orders: recentOrders?.length || 0,
        conversion_rate: 0 // Calculate based on visitors vs purchases
      }
    } catch (error) {
      console.error('Failed to get real-time metrics:', error)
      return {
        active_users: 0,
        current_page_views: 0,
        recent_orders: 0,
        conversion_rate: 0
      }
    }
  }

  // Cohort Analysis
  async getCohortAnalysis(startDate: string, endDate: string): Promise<any> {
    // Implementation for cohort analysis
    // Track user retention over time
    try {
      const { data: users } = await supabase
        .from('users')
        .select('id, created_at')
        .gte('created_at', startDate)
        .lte('created_at', endDate)

      // Group users by signup month and track their activity
      // This would be a more complex analysis
      return {
        cohorts: [],
        retention_rates: []
      }
    } catch (error) {
      console.error('Failed to get cohort analysis:', error)
      throw error
    }
  }

  // Funnel Analysis
  async getFunnelAnalysis(funnelSteps: string[], dateRange?: { start: string; end: string }): Promise<{
    steps: Array<{ step: string; users: number; conversion_rate: number }>
  }> {
    try {
      const stepData = []

      for (let i = 0; i < funnelSteps.length; i++) {
        const step = funnelSteps[i]
        let query = supabase
          .from('analytics_events')
          .select('user_id')
          .eq('event_type', step)

        if (dateRange) {
          query = query.gte('created_at', dateRange.start).lte('created_at', dateRange.end)
        }

        const { data: stepUsers } = await query
        const uniqueUsers = new Set(stepUsers?.map(u => u.user_id)).size

        const conversionRate = i === 0 ? 100 : (uniqueUsers / stepData[0].users) * 100

        stepData.push({
          step,
          users: uniqueUsers,
          conversion_rate: conversionRate
        })
      }

      return { steps: stepData }
    } catch (error) {
      console.error('Failed to get funnel analysis:', error)
      throw error
    }
  }

  // Utility Methods
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
  }

  // A/B Testing Support
  async trackExperiment(experimentId: string, variant: string, userId?: string): Promise<void> {
    await this.trackEvent({
      event_type: 'experiment_view',
      user_id: userId,
      properties: {
        experiment_id: experimentId,
        variant: variant
      }
    })
  }

  async getExperimentResults(experimentId: string): Promise<{
    variants: Array<{
      variant: string
      users: number
      conversions: number
      conversion_rate: number
    }>
  }> {
    try {
      const { data: experimentData } = await supabase
        .from('analytics_events')
        .select('properties, user_id')
        .eq('event_type', 'experiment_view')
        .eq('properties->experiment_id', experimentId)

      // Group by variant and calculate conversion rates
      const variantStats = new Map()

      experimentData?.forEach(event => {
        const variant = event.properties?.variant
        if (!variantStats.has(variant)) {
          variantStats.set(variant, {
            variant,
            users: new Set(),
            conversions: 0
          })
        }
        variantStats.get(variant).users.add(event.user_id)
      })

      const results = Array.from(variantStats.values()).map(stat => ({
        variant: stat.variant,
        users: stat.users.size,
        conversions: stat.conversions,
        conversion_rate: stat.users.size > 0 ? (stat.conversions / stat.users.size) * 100 : 0
      }))

      return { variants: results }
    } catch (error) {
      console.error('Failed to get experiment results:', error)
      throw error
    }
  }
}

export const analyticsService = new AnalyticsService()