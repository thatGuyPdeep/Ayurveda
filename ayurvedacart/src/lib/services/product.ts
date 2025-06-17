import { supabase, supabaseAdmin, handleSupabaseError, isSupabaseConfigured } from '@/lib/supabase'
import type { Product, Brand, Category } from '@/types'
import { BaseService } from './base'
import type { Database } from '@/types/supabase'
import { sampleProducts, getFeaturedProducts, searchProducts as searchSampleProducts, getProductBySlug as getSampleProductBySlug } from '@/lib/data/sample-products'
import { medicalProducts, medicalBrands, medicalCategories, getFeaturedProducts as getMedicalFeaturedProducts, searchProducts as searchMedicalProducts, getProductBySlug as getMedicalProductBySlug } from '@/lib/data/medical-products'

type ProductRow = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']

export interface ProductFilters {
  search?: string
  category?: string
  brandIds?: string[]
  priceRange?: { min: number; max: number }
  sortBy?: 'name' | 'price_low' | 'price_high' | 'newest' | 'rating' | 'featured'
  inStock?: boolean
  featured?: boolean
  limit?: number
  offset?: number
}

export interface ProductSearchResult {
  products: Product[]
  total: number
  hasMore: boolean
  filters?: {
    brands: Array<{ id: string; name: string; count: number }>
    categories: Array<{ id: string; name: string; count: number }>
    priceRange: { min: number; max: number }
  }
}

export class ProductService extends BaseService {
  private useSupabase = false // Set to true when Supabase is configured

  constructor() {
    super()
    // Check if Supabase is properly configured
    this.useSupabase = !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL && 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url' &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your-supabase-anon-key'
    )
  }

  async getProducts(filters: ProductFilters = {}): Promise<ProductSearchResult> {
    if (this.useSupabase) {
      return this.getProductsFromSupabase(filters)
    } else {
      return this.getProductsFromSampleData(filters)
    }
  }

  async getProduct(slug: string): Promise<Product | null> {
    if (this.useSupabase) {
      return this.getProductFromSupabase(slug)
    } else {
      return this.getProductFromSampleData(slug)
    }
  }

  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    if (this.useSupabase) {
      return this.getFeaturedProductsFromSupabase(limit)
    } else {
      return this.getFeaturedProductsFromSampleData(limit)
    }
  }

  async searchProducts(query: string, filters: ProductFilters = {}): Promise<ProductSearchResult> {
    if (this.useSupabase) {
      return this.searchProductsInSupabase(query, filters)
    } else {
      return this.searchProductsInSampleData(query, filters)
    }
  }

  async getCategories(): Promise<Category[]> {
    if (this.useSupabase) {
      return this.getCategoriesFromSupabase()
    } else {
      return this.getCategoriesFromSampleData()
    }
  }

  async getBrands(): Promise<Brand[]> {
    if (this.useSupabase) {
      return this.getBrandsFromSupabase()
    } else {
      return this.getBrandsFromSampleData()
    }
  }

  // Supabase methods
  private async getProductsFromSupabase(filters: ProductFilters): Promise<ProductSearchResult> {
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          brand:brands(*),
          categories:product_categories(
            category:categories(*)
          ),
          images:product_images(*),
          reviews:product_reviews(rating)
        `)
        .eq('status', 'active')

      // Apply filters
      if (filters.categoryId) {
        query = query.eq('categories.category.id', filters.categoryId)
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
        query = query.ilike('name', `%${filters.search}%`)
      }

      if (filters.featured) {
        query = query.eq('is_featured', true)
      }

      if (filters.inStock) {
        query = query.gt('stock_quantity', 0)
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

      return {
        products: products || [],
        total: count || 0,
        filters: {
          brands: [],
          categories: [],
          priceRange: { min: 0, max: 1000 }
        }
      }
    } catch (error) {
      console.error('Error fetching products from Supabase:', error)
      return this.getProductsFromSampleData(filters)
    }
  }

  private async getProductFromSupabase(slug: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          brand:brands(*),
          categories:product_categories(
            category:categories(*)
          ),
          images:product_images(*),
          reviews:product_reviews(
            *,
            user:users(first_name, last_name)
          )
        `)
        .eq('slug', slug)
        .eq('status', 'active')
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching product from Supabase:', error)
      return this.getProductFromSampleData(slug)
    }
  }

  private async getFeaturedProductsFromSupabase(limit: number): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          brand:brands(*),
          images:product_images(*)
        `)
        .eq('status', 'active')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching featured products from Supabase:', error)
      return this.getFeaturedProductsFromSampleData(limit)
    }
  }

  private async searchProductsInSupabase(query: string, filters: ProductFilters): Promise<ProductSearchResult> {
    try {
      let searchQuery = supabase
        .from('products')
        .select(`
          *,
          brand:brands(*),
          categories:product_categories(
            category:categories(*)
          ),
          images:product_images(*)
        `)
        .eq('status', 'active')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)

      // Apply additional filters
      if (filters.categoryId) {
        searchQuery = searchQuery.eq('categories.category.id', filters.categoryId)
      }

      if (filters.brandIds?.length) {
        searchQuery = searchQuery.in('brand_id', filters.brandIds)
      }

      const { data: products, error } = await searchQuery

      if (error) throw error

      return {
        products: products || [],
        total: products?.length || 0,
        filters: {
          brands: [],
          categories: [],
          priceRange: { min: 0, max: 1000 }
        }
      }
    } catch (error) {
      console.error('Error searching products in Supabase:', error)
      return this.searchProductsInSampleData(query, filters)
    }
  }

  private async getCategoriesFromSupabase(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching categories from Supabase:', error)
      return this.getCategoriesFromSampleData()
    }
  }

  private async getBrandsFromSupabase(): Promise<Brand[]> {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching brands from Supabase:', error)
      return this.getBrandsFromSampleData()
    }
  }

  // Sample data methods
  private async getProductsFromSampleData(filters: ProductFilters): Promise<ProductSearchResult> {
    let products = [...medicalProducts]

    // Apply filters
    if (filters.search) {
      products = searchMedicalProducts(filters.search)
    }

    // Filter by category/specialty
    if (filters.category) {
      products = products.filter(p => {
        // Match against medical category slugs
        return medicalCategories.some(cat => 
          cat.slug === filters.category && (
            p.type?.toLowerCase().includes(cat.name.toLowerCase()) ||
            p.name.toLowerCase().includes(cat.name.toLowerCase()) ||
            p.indications?.some(indication => 
              cat.subcategories.some(subcat => 
                indication.toLowerCase().includes(subcat.toLowerCase()) ||
                subcat.toLowerCase().includes(indication.toLowerCase())
              )
            )
          )
        )
      })
    }

    if (filters.featured) {
      products = products.filter(p => p.is_featured)
    }

    if (filters.inStock) {
      products = products.filter(p => p.stock_quantity > 0)
    }

    if (filters.priceRange) {
      products = products.filter(p => 
        p.selling_price >= filters.priceRange!.min && 
        p.selling_price <= filters.priceRange!.max
      )
    }

    if (filters.brandIds?.length) {
      products = products.filter(p => 
        filters.brandIds!.includes(p.brand_id || '')
      )
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_low':
        products.sort((a, b) => a.selling_price - b.selling_price)
        break
      case 'price_high':
        products.sort((a, b) => b.selling_price - a.selling_price)
        break
      case 'newest':
        products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'rating':
        products.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
        break
      default:
        products.sort((a, b) => a.name.localeCompare(b.name))
    }

    // Apply pagination
    const limit = filters.limit || 20
    const offset = filters.offset || 0
    const paginatedProducts = products.slice(offset, offset + limit)

    // Calculate price range
    const prices = products.map(p => p.selling_price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    // Get unique brands
    const uniqueBrands = [...new Set(products.map(p => p.brand_id).filter(Boolean))]
    const brands = uniqueBrands.map(brandId => {
      const brand = medicalBrands.find(b => b.id === brandId)
      const count = products.filter(p => p.brand_id === brandId).length
      return {
        id: brandId!,
        name: brand?.name || brandId!,
        count
      }
    })

    return {
      products: paginatedProducts,
      total: products.length,
      hasMore: offset + limit < products.length,
      filters: {
        brands,
        categories: medicalCategories.map(cat => ({
          id: cat.id,
          name: cat.name,
          count: products.filter(p => 
            p.type?.toLowerCase().includes(cat.name.toLowerCase()) ||
            p.name.toLowerCase().includes(cat.name.toLowerCase()) ||
            p.indications?.some(indication => 
              cat.subcategories.some(subcat => 
                indication.toLowerCase().includes(subcat.toLowerCase()) ||
                subcat.toLowerCase().includes(indication.toLowerCase())
              )
            )
          ).length
        })),
        priceRange: { min: minPrice, max: maxPrice }
      }
    }
  }

  private async getProductFromSampleData(slug: string): Promise<Product | null> {
    return getMedicalProductBySlug(slug) || null
  }

  private async getFeaturedProductsFromSampleData(limit: number): Promise<Product[]> {
    return getMedicalFeaturedProducts().slice(0, limit)
  }

  private async searchProductsInSampleData(query: string, filters: ProductFilters): Promise<ProductSearchResult> {
    const searchResults = searchMedicalProducts(query)
    
    return {
      products: searchResults,
      total: searchResults.length,
      filters: {
        brands: [],
        categories: [],
        priceRange: { min: 0, max: 1000 }
      }
    }
  }

  private async getCategoriesFromSampleData(): Promise<Category[]> {
    return medicalCategories.map((cat, index) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      parent_id: undefined,
      image_url: undefined,
      meta_title: cat.name,
      meta_description: cat.description,
      sort_order: index,
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }))
  }

  private async getBrandsFromSampleData(): Promise<Brand[]> {
    return medicalBrands
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    // Check if Supabase is configured, if not, use sample data immediately
    if (!this.useSupabase) {
      console.log('Supabase not configured, using sample data for slug:', slug)
      return sampleProducts.find(p => p.slug === slug) || null
    }

    try {
      // Try Supabase first
      const { data: product, error } = await supabase
        .from('products')
        .select(`
          *,
          brand:brands(*),
          categories:product_categories(
            category:categories(*)
          ),
          images:product_images(*),
          reviews:product_reviews(
            *,
            user:users(first_name, last_name)
          )
        `)
        .eq('slug', slug)
        .eq('status', 'active')
        .single()

      if (!error && product) {
        return product as Product
      }
    } catch (error) {
      console.log('Supabase error, falling back to sample data:', error)
    }

    // Fallback to sample data
    return sampleProducts.find(p => p.slug === slug) || null
  }

  async getProductById(id: string): Promise<any | null> {
    // Use sample data if Supabase is not configured
    if (!this.useSupabase) {
      return sampleProducts.find(product => product.id === id) || null
    }

    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('products')
          .select(`
            *,
            brand:brands(*),
            images:product_images(*),
            categories:product_categories(
              category:categories(*)
            )
          `)
          .eq('id', id)
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            return null
          }
          throw error
        }

        return data
      },
      { service: 'ProductService', method: 'getProductById', params: { id } }
    )
  }

  async getRecommendations(productId: string, limit = 4): Promise<Product[]> {
    try {
      // Try Supabase first
      const { data: recommendations, error } = await supabase
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

      if (!error && recommendations && Array.isArray(recommendations)) {
        return recommendations.map((r: any) => r.recommended_product).filter(Boolean) as Product[]
      }
    } catch (error) {
      console.log('Supabase not available, using sample data')
    }

    // Fallback to random sample products
    return sampleProducts
      .filter(p => p.id !== productId)
      .slice(0, limit)
  }

  async createProduct(productData: ProductInsert): Promise<ProductRow> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured')
    }

    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabaseAdmin
          .from('products')
          .insert(productData)
          .select()
          .single()

        if (error) {
          console.error('Error creating product:', error)
          throw new Error('Failed to create product')
        }

        return data
      },
      { service: 'ProductService', method: 'createProduct', params: productData }
    )
  }

  async updateProduct(id: string, productData: ProductUpdate): Promise<ProductRow> {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured')
    }

    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabaseAdmin
          .from('products')
          .update({ ...productData, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single()

        if (error) {
          console.error('Error updating product:', error)
          throw new Error('Failed to update product')
        }

        return data
      },
      { service: 'ProductService', method: 'updateProduct', params: { id, productData } }
    )
  }

  async updateStock(productId: string, quantity: number): Promise<void> {
    if (!this.useSupabase) {
      console.warn('Supabase not configured, skipping stock update')
      return
    }

    return this.withErrorHandling(
      async () => {
        const { error } = await this.supabaseAdmin
          .from('products')
          .update({
            stock_quantity: quantity,
            updated_at: new Date().toISOString()
          })
          .eq('id', productId)

        if (error) {
          console.error('Error updating stock:', error)
          throw new Error('Failed to update stock')
        }
      },
      { service: 'ProductService', method: 'updateStock', params: { productId, quantity } }
    )
  }

  async checkStock(productId: string): Promise<number> {
    if (!this.useSupabase) {
      const product = sampleProducts.find(p => p.id === productId)
      return product?.stock_quantity || 0
    }

    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', productId)
          .single()

        if (error) {
          console.error('Error checking stock:', error)
          return 0
        }

        return data?.stock_quantity || 0
      },
      { service: 'ProductService', method: 'checkStock', params: { productId } }
    )
  }

  async searchProducts(query: string, limit = 20): Promise<any[]> {
    // Use sample data if Supabase is not configured
    if (!this.useSupabase) {
      return searchSampleProducts(query).slice(0, limit)
    }

    return this.withErrorHandling(
      async () => {
        const { data, error } = await this.supabase
          .from('products')
          .select(`
            *,
            brand:brands(*),
            images:product_images(*)
          `)
          .or(`name.ilike.%${query}%,description.ilike.%${query}%,search_keywords.ilike.%${query}%`)
          .eq('status', 'active')
          .order('average_rating', { ascending: false, nullsFirst: false })
          .limit(limit)

        if (error) {
          console.error('Error searching products:', error)
          throw new Error('Failed to search products')
        }

        return data || []
      },
      { service: 'ProductService', method: 'searchProducts', params: { query, limit } }
    )
  }

  private async getFilterAggregations(filters: ProductFilters) {
    if (!this.useSupabase) {
      return {
        brands: [],
        categories: [],
        priceRange: { min: 0, max: 2000 }
      }
    }

    try {
      const [brands, categories, priceRange] = await Promise.all([
        this.getBrandAggregations(filters),
        this.getCategoryAggregations(filters),
        this.getPriceRangeAggregations(filters)
      ])

      return {
        brands,
        categories,
        priceRange
      }
    } catch (error) {
      console.error('Error fetching filter aggregations:', error)
      return {
        brands: [],
        categories: [],
        priceRange: { min: 0, max: 2000 }
      }
    }
  }

  private async getBrandAggregations(filters: ProductFilters) {
    if (!this.useSupabase) return []

    const { data, error } = await this.supabase
      .from('products')
      .select(`
        brand_id,
        brand:brands(id, name)
      `)
      .eq('status', 'active')

    if (error) return []

    // Group by brand and count
    const brandCounts = data.reduce((acc: Record<string, { id: string; name: string; count: number }>, product: any) => {
      if (product.brand) {
        const brandId = product.brand.id
        const brandName = product.brand.name
        if (!acc[brandId]) {
          acc[brandId] = { id: brandId, name: brandName, count: 0 }
        }
        acc[brandId].count++
      }
      return acc
    }, {})

    return Object.values(brandCounts)
  }

  private async getCategoryAggregations(filters: ProductFilters) {
    if (!this.useSupabase) return []

    const { data, error } = await this.supabase
      .from('product_categories')
      .select(`
        category_id,
        category:categories(id, name),
        product:products!inner(status)
      `)

    if (error) return []

    // Group by category and count
    const categoryCounts = data.reduce((acc: Record<string, { id: string; name: string; count: number }>, item: any) => {
      if (item.category && item.product?.status === 'active') {
        const categoryId = item.category.id
        const categoryName = item.category.name
        if (!acc[categoryId]) {
          acc[categoryId] = { id: categoryId, name: categoryName, count: 0 }
        }
        acc[categoryId].count++
      }
      return acc
    }, {})

    return Object.values(categoryCounts)
  }

  private async getPriceRangeAggregations(filters: ProductFilters) {
    if (!this.useSupabase) return { min: 0, max: 2000 }

    const { data, error } = await this.supabase
      .from('products')
      .select('selling_price')
      .eq('status', 'active')

    if (error || !data?.length) {
      return { min: 0, max: 2000 }
    }

    const prices = data.map(p => p.selling_price).filter(Boolean)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }

  private async logProductView(productId: string) {
    if (!this.useSupabase) return

    try {
      await this.supabase
        .from('product_views')
        .insert({
          product_id: productId,
          viewed_at: new Date().toISOString(),
          ip_address: '127.0.0.1' // This would be replaced with actual IP in production
        })
    } catch (error) {
      // Silently fail for analytics
      console.warn('Failed to log product view:', error)
    }
  }
}

export const productService = new ProductService() 