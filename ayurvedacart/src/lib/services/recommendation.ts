import { BaseService } from './base'
import type { Database } from '@/types/supabase'

interface RecommendationOptions {
  user_id?: string
  product_id?: string
  category_id?: string
  limit?: number
  algorithm?: 'collaborative' | 'content_based' | 'hybrid' | 'trending'
  exclude_purchased?: boolean
}

interface ProductRecommendation {
  product: Database['public']['Tables']['products']['Row']
  score: number
  reason: string
  algorithm_used: string
}

interface UserProfile {
  user_id: string
  preferences: {
    categories: string[]
    brands: string[]
    price_range: { min: number; max: number }
    health_conditions: string[]
    ayurvedic_doshas: string[]
  }
  purchase_history: Array<{
    product_id: string
    category_id: string
    brand_id: string
    price: number
    purchased_at: string
  }>
  behavior_data: {
    viewed_products: string[]
    wishlist_products: string[]
    cart_additions: string[]
    search_queries: string[]
  }
}

export class RecommendationService extends BaseService {

  async getPersonalizedRecommendations(userId: string, options: RecommendationOptions = {}): Promise<ProductRecommendation[]> {
    return this.withErrorHandling(
      async () => {
        const limit = options.limit || 10
        
        // Build user profile
        const userProfile = await this.buildUserProfile(userId)
        
        // Get recommendations using hybrid approach
        const [collaborativeRecs, contentBasedRecs, trendingRecs] = await Promise.all([
          this.getCollaborativeRecommendations(userProfile, { limit: Math.ceil(limit * 0.4) }),
          this.getContentBasedRecommendations(userProfile, { limit: Math.ceil(limit * 0.4) }),
          this.getTrendingRecommendations({ limit: Math.ceil(limit * 0.2) })
        ])

        // Combine and score recommendations
        const allRecs = [
          ...collaborativeRecs.map(rec => ({ ...rec, algorithm_used: 'collaborative' })),
          ...contentBasedRecs.map(rec => ({ ...rec, algorithm_used: 'content_based' })),
          ...trendingRecs.map(rec => ({ ...rec, algorithm_used: 'trending' }))
        ]

        // Remove duplicates and products user already purchased
        const uniqueRecs = this.deduplicateRecommendations(allRecs, userProfile)
        
        // Sort by score and limit results
        return uniqueRecs
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
      },
      { service: 'RecommendationService', method: 'getPersonalizedRecommendations', params: { userId, options } }
    )
  }

  async getProductRecommendations(productId: string, options: RecommendationOptions = {}): Promise<ProductRecommendation[]> {
    return this.withErrorHandling(
      async () => {
        const limit = options.limit || 8
        
        // Get base product details
        const { data: product } = await this.supabase
          .from('products')
          .select(`
            *,
            brand:brands(*),
            categories:product_categories(category:categories(*))
          `)
          .eq('id', productId)
          .single()

        if (!product) throw new Error('Product not found')

        // Get similar products by multiple criteria
        const [similarProducts, frequentlyBoughtTogether, categoryProducts] = await Promise.all([
          this.getSimilarProducts(product, { limit: Math.ceil(limit * 0.4) }),
          this.getFrequentlyBoughtTogether(productId, { limit: Math.ceil(limit * 0.3) }),
          this.getCategoryBasedRecommendations(product, { limit: Math.ceil(limit * 0.3) })
        ])

        const allRecs = [
          ...similarProducts,
          ...frequentlyBoughtTogether,
          ...categoryProducts
        ]

        // Remove the original product and duplicates
        const uniqueRecs = allRecs
          .filter(rec => rec.product.id !== productId)
          .reduce((acc, current) => {
            const existing = acc.find(item => item.product.id === current.product.id)
            if (!existing || current.score > existing.score) {
              return [...acc.filter(item => item.product.id !== current.product.id), current]
            }
            return acc
          }, [] as ProductRecommendation[])

        return uniqueRecs
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
      },
      { service: 'RecommendationService', method: 'getProductRecommendations', params: { productId, options } }
    )
  }

  async getCategoryRecommendations(categoryId: string, options: RecommendationOptions = {}): Promise<ProductRecommendation[]> {
    return this.withErrorHandling(
      async () => {
        const limit = options.limit || 12
        
        // Get popular products in category
        const { data: products } = await this.supabase
          .from('products')
          .select(`
            *,
            brand:brands(*),
            product_categories!inner(category_id),
            avg_rating:reviews(rating)
          `)
          .eq('product_categories.category_id', categoryId)
          .eq('status', 'active')
          .gte('stock_quantity', 1)
          .order('average_rating', { ascending: false })
          .order('total_sales', { ascending: false })
          .limit(limit * 2) // Get more to allow for filtering

        if (!products?.length) return []

        // Score products based on multiple factors
        const recommendations: ProductRecommendation[] = products.map(product => {
          let score = 0
          let reason = ''

          // Rating score (40% weight)
          if (product.average_rating) {
            score += (product.average_rating / 5) * 40
            reason += `Highly rated (${product.average_rating}/5). `
          }

          // Sales score (30% weight)
          if (product.total_sales) {
            const salesScore = Math.min(product.total_sales / 100, 1) // Normalize to 0-1
            score += salesScore * 30
            reason += `Popular choice. `
          }

          // Stock availability score (20% weight)
          if (product.stock_quantity > 10) {
            score += 20
            reason += `In stock. `
          } else if (product.stock_quantity > 0) {
            score += 10
            reason += `Limited stock. `
          }

          // Featured product bonus (10% weight)
          if (product.is_featured) {
            score += 10
            reason += `Featured product. `
          }

          return {
            product,
            score,
            reason: reason.trim(),
            algorithm_used: 'category_based'
          }
        })

        return recommendations
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
      },
      { service: 'RecommendationService', method: 'getCategoryRecommendations', params: { categoryId, options } }
    )
  }

  async getHealthConditionRecommendations(healthConditions: string[], options: RecommendationOptions = {}): Promise<ProductRecommendation[]> {
    return this.withErrorHandling(
      async () => {
        const limit = options.limit || 10
        
        // Get products that help with specified health conditions
        const { data: products } = await this.supabase
          .from('products')
          .select(`
            *,
            brand:brands(*)
          `)
          .overlaps('health_conditions', healthConditions)
          .eq('status', 'active')
          .gte('stock_quantity', 1)
          .order('average_rating', { ascending: false })
          .limit(limit * 2)

        if (!products?.length) return []

        const recommendations: ProductRecommendation[] = products.map(product => {
          let score = 0
          let reason = ''

          // Condition match score (50% weight)
          const matchingConditions = (product.health_conditions as string[])?.filter((condition: string) => 
            healthConditions.includes(condition)
          ) || []
          
          const conditionMatchRatio = matchingConditions.length / healthConditions.length
          score += conditionMatchRatio * 50
          
          if (matchingConditions.length > 0) {
            reason += `Helps with ${matchingConditions.join(', ')}. `
          }

          // Rating score (30% weight)
          if (product.average_rating) {
            score += (product.average_rating / 5) * 30
            reason += `Rated ${product.average_rating}/5. `
          }

          // Ayurvedic authenticity score (20% weight)
          if (product.is_ayurvedic_certified) {
            score += 20
            reason += `Ayurvedic certified. `
          }

          return {
            product,
            score,
            reason: reason.trim(),
            algorithm_used: 'health_condition_based'
          }
        })

        return recommendations
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
      },
      { service: 'RecommendationService', method: 'getHealthConditionRecommendations', params: { healthConditions, options } }
    )
  }

  async getTrendingRecommendations(options: RecommendationOptions = {}): Promise<ProductRecommendation[]> {
    return this.withErrorHandling(
      async () => {
        const limit = options.limit || 8
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - 30) // Last 30 days

        // Get trending products based on recent activity
        const { data: trendingData } = await this.supabaseAdmin
          .rpc('get_trending_products', {
            cutoff_date: cutoffDate.toISOString(),
            limit_count: limit * 2
          })

        if (!trendingData?.length) return []

        const recommendations: ProductRecommendation[] = trendingData.map((item: any) => ({
          product: item.product,
          score: item.trending_score,
          reason: `Trending now with ${item.recent_views} views and ${item.recent_sales} sales this month`,
          algorithm_used: 'trending'
        }))

        return recommendations.slice(0, limit)
      },
      { service: 'RecommendationService', method: 'getTrendingRecommendations', params: options }
    )
  }

  async getSeasonalRecommendations(season: string, options: RecommendationOptions = {}): Promise<ProductRecommendation[]> {
    return this.withErrorHandling(
      async () => {
        const limit = options.limit || 10
        
        // Seasonal product mapping
        const seasonalCategories = {
          spring: ['detox', 'immunity', 'allergies'],
          summer: ['cooling', 'hydration', 'skin_care'],
          monsoon: ['immunity', 'digestion', 'respiratory'],
          winter: ['warming', 'joint_care', 'immunity']
        }

        const relevantCategories = seasonalCategories[season as keyof typeof seasonalCategories] || []
        
        if (!relevantCategories.length) return []

        const { data: products } = await this.supabase
          .from('products')
          .select(`
            *,
            brand:brands(*)
          `)
          .overlaps('seasonal_tags', relevantCategories)
          .eq('status', 'active')
          .gte('stock_quantity', 1)
          .order('average_rating', { ascending: false })
          .limit(limit)

        if (!products?.length) return []

        const recommendations: ProductRecommendation[] = products.map(product => ({
          product,
          score: 75 + (product.average_rating || 0) * 5, // Base seasonal relevance + rating bonus
          reason: `Perfect for ${season} season`,
          algorithm_used: 'seasonal'
        }))

        return recommendations
      },
      { service: 'RecommendationService', method: 'getSeasonalRecommendations', params: { season, options } }
    )
  }

  private async buildUserProfile(userId: string): Promise<UserProfile> {
    // Get user's purchase history
    const { data: orders } = await this.supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          product:products(*, brand:brands(*), categories:product_categories(category:categories(*)))
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'delivered')

    // Get user's behavior data
    const [viewsData, wishlistData, cartData, searchData] = await Promise.all([
      this.getUserProductViews(userId),
      this.getUserWishlist(userId),
      this.getUserCartHistory(userId),
      this.getUserSearchHistory(userId)
    ])

    // Build preferences from historical data
    const preferences = this.extractUserPreferences(orders || [], viewsData, wishlistData)

    return {
      user_id: userId,
      preferences,
      purchase_history: this.extractPurchaseHistory(orders || []),
      behavior_data: {
        viewed_products: viewsData.map(v => v.product_id),
        wishlist_products: wishlistData.map(w => w.product_id),
        cart_additions: cartData.map(c => c.product_id),
        search_queries: searchData.map(s => s.query)
      }
    }
  }

  private async getCollaborativeRecommendations(userProfile: UserProfile, options: any): Promise<ProductRecommendation[]> {
    // Find similar users based on purchase history
    const { data: similarUsers } = await this.supabaseAdmin
      .rpc('find_similar_users', {
        target_user_id: userProfile.user_id,
        limit_count: 50
      })

    if (!similarUsers?.length) return []

    // Get products purchased by similar users but not by target user
    const purchasedProductIds = userProfile.purchase_history.map(p => p.product_id)
    
    const { data: recommendations } = await this.supabaseAdmin
      .rpc('get_collaborative_recommendations', {
        similar_user_ids: similarUsers.map((u: any) => u.user_id),
        exclude_product_ids: purchasedProductIds,
        limit_count: options.limit || 10
      })

    return recommendations?.map((item: any) => ({
      product: item.product,
      score: item.recommendation_score,
      reason: `Users with similar preferences also bought this`,
      algorithm_used: 'collaborative'
    })) || []
  }

  private async getContentBasedRecommendations(userProfile: UserProfile, options: any): Promise<ProductRecommendation[]> {
    const preferences = userProfile.preferences
    let query = this.supabase
      .from('products')
      .select(`
        *,
        brand:brands(*)
      `)
      .eq('status', 'active')
      .gte('stock_quantity', 1)

    // Filter by preferred categories
    if (preferences.categories.length > 0) {
      query = query.in('category_id', preferences.categories)
    }

    // Filter by preferred brands
    if (preferences.brands.length > 0) {
      query = query.in('brand_id', preferences.brands)
    }

    // Filter by price range
    query = query
      .gte('selling_price', preferences.price_range.min)
      .lte('selling_price', preferences.price_range.max)

    const { data: products } = await query.limit(options.limit * 2)

    if (!products?.length) return []

    // Score based on preference alignment
    const recommendations: ProductRecommendation[] = products.map(product => {
      let score = 50 // Base score
      let reason = 'Based on your preferences: '

      // Category preference score
      if (preferences.categories.includes(product.category_id)) {
        score += 20
        reason += 'category match, '
      }

      // Brand preference score
      if (preferences.brands.includes(product.brand_id)) {
        score += 15
        reason += 'brand preference, '
      }

      // Price preference score
      const priceInRange = product.selling_price >= preferences.price_range.min && 
                          product.selling_price <= preferences.price_range.max
      if (priceInRange) {
        score += 10
        reason += 'price range, '
      }

      // Rating bonus
      if (product.average_rating) {
        score += (product.average_rating / 5) * 5
      }

      return {
        product,
        score,
        reason: reason.slice(0, -2), // Remove trailing comma
        algorithm_used: 'content_based'
      }
    })

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, options.limit)
  }

  private async getSimilarProducts(product: any, options: any): Promise<ProductRecommendation[]> {
    // Get products with similar attributes
    const { data: similarProducts } = await this.supabase
      .from('products')
      .select(`
        *,
        brand:brands(*)
      `)
      .eq('category_id', product.category_id)
      .eq('status', 'active')
      .gte('stock_quantity', 1)
      .neq('id', product.id)
      .limit(options.limit * 2)

    if (!similarProducts?.length) return []

    const recommendations: ProductRecommendation[] = similarProducts.map(similarProduct => {
      let score = 60 // Base similarity score
      let reason = 'Similar to viewed product: '

      // Same category
      score += 20
      reason += 'same category, '

      // Same brand
      if (similarProduct.brand_id === product.brand_id) {
        score += 15
        reason += 'same brand, '
      }

      // Similar price range (within 20%)
      const priceDiff = Math.abs(similarProduct.selling_price - product.selling_price) / product.selling_price
      if (priceDiff <= 0.2) {
        score += 10
        reason += 'similar price, '
      }

      // Rating bonus
      if (similarProduct.average_rating) {
        score += (similarProduct.average_rating / 5) * 5
      }

      return {
        product: similarProduct,
        score,
        reason: reason.slice(0, -2),
        algorithm_used: 'content_based'
      }
    })

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, options.limit)
  }

  private async getFrequentlyBoughtTogether(productId: string, options: any): Promise<ProductRecommendation[]> {
    // Get products frequently bought together
    const { data: frequentlyBought } = await this.supabaseAdmin
      .rpc('get_frequently_bought_together', {
        product_id: productId,
        limit_count: options.limit
      })

    return frequentlyBought?.map((item: any) => ({
      product: item.product,
      score: item.frequency_score,
      reason: `Frequently bought together`,
      algorithm_used: 'collaborative'
    })) || []
  }

  private async getCategoryBasedRecommendations(product: any, options: any): Promise<ProductRecommendation[]> {
    // Get top-rated products from same category
    const { data: categoryProducts } = await this.supabase
      .from('products')
      .select(`
        *,
        brand:brands(*)
      `)
      .eq('category_id', product.category_id)
      .eq('status', 'active')
      .gte('stock_quantity', 1)
      .neq('id', product.id)
      .order('average_rating', { ascending: false })
      .limit(options.limit)

    return categoryProducts?.map(categoryProduct => ({
      product: categoryProduct,
      score: 50 + (categoryProduct.average_rating || 0) * 10,
      reason: `Popular in ${product.categories?.[0]?.category?.name || 'this category'}`,
      algorithm_used: 'category_based'
    })) || []
  }

  private deduplicateRecommendations(recommendations: ProductRecommendation[], userProfile: UserProfile): ProductRecommendation[] {
    const purchasedIds = new Set(userProfile.purchase_history.map(p => p.product_id))
    const seen = new Set<string>()
    
    return recommendations.filter(rec => {
      if (purchasedIds.has(rec.product.id) || seen.has(rec.product.id)) {
        return false
      }
      seen.add(rec.product.id)
      return true
    })
  }

  private extractUserPreferences(orders: any[], views: any[], wishlist: any[]): UserProfile['preferences'] {
    const categories = new Set<string>()
    const brands = new Set<string>()
    const prices: number[] = []
    
    // Extract from purchase history
    orders.forEach(order => {
      order.order_items?.forEach((item: any) => {
        if (item.product?.category_id) categories.add(item.product.category_id)
        if (item.product?.brand_id) brands.add(item.product.brand_id)
        if (item.product?.selling_price) prices.push(item.product.selling_price)
      })
    })

    // Extract from views and wishlist
    const behaviorItems = [...views, ...wishlist]
    behaviorItems.forEach(item => {
      if (item.product?.category_id) categories.add(item.product.category_id)
      if (item.product?.brand_id) brands.add(item.product.brand_id)
      if (item.product?.selling_price) prices.push(item.product.selling_price)
    })

    const priceRange = prices.length > 0 
      ? { min: Math.min(...prices) * 0.8, max: Math.max(...prices) * 1.2 }
      : { min: 0, max: 10000 }

    return {
      categories: Array.from(categories),
      brands: Array.from(brands),
      price_range: priceRange,
      health_conditions: [], // Would be extracted from user profile
      ayurvedic_doshas: [] // Would be extracted from user profile
    }
  }

  private extractPurchaseHistory(orders: any[]): UserProfile['purchase_history'] {
    const history: UserProfile['purchase_history'] = []
    
    orders.forEach(order => {
      order.order_items?.forEach((item: any) => {
        if (item.product) {
          history.push({
            product_id: item.product.id,
            category_id: item.product.category_id,
            brand_id: item.product.brand_id,
            price: item.product.selling_price,
            purchased_at: order.created_at
          })
        }
      })
    })

    return history
  }

  private async getUserProductViews(userId: string) {
    const { data } = await this.supabase
      .from('product_views')
      .select('product_id, product:products(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    return data || []
  }

  private async getUserWishlist(userId: string) {
    const { data } = await this.supabase
      .from('wishlist_items')
      .select('product_id, product:products(*)')
      .eq('user_id', userId)

    return data || []
  }

  private async getUserCartHistory(userId: string) {
    const { data } = await this.supabase
      .from('cart_history')
      .select('product_id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100)

    return data || []
  }

  private async getUserSearchHistory(userId: string) {
    const { data } = await this.supabase
      .from('search_logs')
      .select('query')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    return data || []
  }

  async logRecommendationClick(userId: string, productId: string, algorithm: string, position: number) {
    return this.withErrorHandling(
      async () => {
        await this.supabase
          .from('recommendation_clicks')
          .insert({
            user_id: userId,
            product_id: productId,
            algorithm_used: algorithm,
            position_in_list: position,
            clicked_at: new Date().toISOString()
          })
      },
      { service: 'RecommendationService', method: 'logRecommendationClick', params: { userId, productId, algorithm, position } }
    )
  }
} 