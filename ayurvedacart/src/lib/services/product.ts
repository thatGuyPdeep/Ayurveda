import { supabase, supabaseAdmin, handleSupabaseError } from '@/lib/supabase'
import type { Product, ProductFilters, ProductSearchResult, Brand, Category } from '@/types'

export class ProductService {
  async getProducts(filters: ProductFilters = {}): Promise<ProductSearchResult> {
    try {
      // Build base query
      let query = supabase
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

      if (filters.inStock) {
        query = query.gt('stock_quantity', 0)
      }

      if (filters.featured) {
        query = query.eq('is_featured', true)
      }

      if (filters.type) {
        query = query.eq('type', filters.type)
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
          query = query.order('average_rating', { ascending: false, nullsFirst: false })
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
    } catch (error) {
      console.error('Error fetching products:', error)
      throw new Error(handleSupabaseError(error) || 'Failed to fetch products')
    }
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
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
          variants:product_variants(*),
          reviews:product_reviews(
            *,
            user:users(first_name, last_name)
          )
        `)
        .eq('slug', slug)
        .eq('status', 'active')
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // Product not found
        }
        throw error
      }

      // Log product view for analytics
      await this.logProductView(data.id)

      return data
    } catch (error) {
      console.error('Error fetching product:', error)
      throw new Error(handleSupabaseError(error) || 'Failed to fetch product')
    }
  }

  async getFeaturedProducts(limit = 8): Promise<Product[]> {
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
      console.error('Error fetching featured products:', error)
      throw new Error(handleSupabaseError(error) || 'Failed to fetch featured products')
    }
  }

  async getRecommendations(productId: string, limit = 4): Promise<Product[]> {
    try {
      // First try to get collaborative filtering recommendations
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

      if (error) throw error

      if (recommendations && recommendations.length > 0) {
        return recommendations
          .map((r: any) => r.recommended_product)
          .filter((product: any): product is Product => Boolean(product))
      }

      // Fallback: Get products from same category
      const { data: product } = await supabase
        .from('products')
        .select('categories:product_categories(category_id)')
        .eq('id', productId)
        .single()

      if (product?.categories?.[0]?.category_id) {
        const { data: similarProducts } = await supabase
          .from('products')
          .select(`
            *,
            brand:brands(*),
            images:product_images(*)
          `)
          .eq('product_categories.category_id', product.categories[0].category_id)
          .neq('id', productId)
          .eq('status', 'active')
          .limit(limit)

        return similarProducts || []
      }

      return []
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      return []
    }
  }

  async searchProducts(query: string, filters: ProductFilters = {}): Promise<ProductSearchResult> {
    return this.getProducts({
      ...filters,
      search: query
    })
  }

  async getProductsByCategory(categorySlug: string, filters: ProductFilters = {}): Promise<ProductSearchResult> {
    try {
      // First get the category
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single()

      if (categoryError || !category) {
        throw new Error('Category not found')
      }

      return this.getProducts({
        ...filters,
        categoryId: category.id
      })
    } catch (error) {
      console.error('Error fetching products by category:', error)
      throw new Error(handleSupabaseError(error) || 'Failed to fetch products')
    }
  }

  async getProductsByBrand(brandSlug: string, filters: ProductFilters = {}): Promise<ProductSearchResult> {
    try {
      // First get the brand
      const { data: brand, error: brandError } = await supabase
        .from('brands')
        .select('id')
        .eq('slug', brandSlug)
        .single()

      if (brandError || !brand) {
        throw new Error('Brand not found')
      }

      return this.getProducts({
        ...filters,
        brandIds: [brand.id]
      })
    } catch (error) {
      console.error('Error fetching products by brand:', error)
      throw new Error(handleSupabaseError(error) || 'Failed to fetch products')
    }
  }

  private async getFilterAggregations(filters: ProductFilters) {
    try {
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
    } catch (error) {
      console.error('Error fetching filter aggregations:', error)
      return {
        brands: [],
        categories: [],
        priceRange: { min: 0, max: 10000 }
      }
    }
  }

  private async getBrandAggregations(filters: ProductFilters) {
    try {
      // This would ideally use a stored procedure for better performance
      const { data, error } = await supabase
        .from('brands')
        .select(`
          id,
          name,
          products:products(count)
        `)
        .eq('is_active', true)

      if (error) throw error

      return (data || []).map(brand => ({
        id: brand.id,
        name: brand.name,
        count: brand.products?.[0]?.count || 0
      }))
    } catch (error) {
      console.error('Error fetching brand aggregations:', error)
      return []
    }
  }

  private async getCategoryAggregations(filters: ProductFilters) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          products:product_categories(count)
        `)
        .eq('is_active', true)

      if (error) throw error

      return (data || []).map(category => ({
        id: category.id,
        name: category.name,
        count: category.products?.[0]?.count || 0
      }))
    } catch (error) {
      console.error('Error fetching category aggregations:', error)
      return []
    }
  }

  private async getPriceRangeAggregations(filters: ProductFilters) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('selling_price')
        .eq('status', 'active')

      if (error) throw error

      if (!data || data.length === 0) {
        return { min: 0, max: 10000 }
      }

      const prices = data.map(p => p.selling_price)
      return {
        min: Math.min(...prices),
        max: Math.max(...prices)
      }
    } catch (error) {
      console.error('Error fetching price range:', error)
      return { min: 0, max: 10000 }
    }
  }

  private async logProductView(productId: string) {
    try {
      // Log product view for analytics (fire and forget)
      await supabase
        .from('product_views')
        .insert({
          product_id: productId,
          viewed_at: new Date().toISOString()
        })
    } catch (error) {
      // Don't throw error for analytics logging
      console.warn('Failed to log product view:', error)
    }
  }
}

export const productService = new ProductService() 