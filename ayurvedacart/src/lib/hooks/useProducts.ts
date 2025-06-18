import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { productService, type ProductFilters } from '@/lib/services/product'
import type { ProductSearchResult } from '@/types'
import { sampleProducts, searchProducts as searchSampleProducts } from '@/lib/data/sample-products'

// Simulate API delay for realistic UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async (): Promise<ProductSearchResult> => {
      await delay(300) // Simulate API call
      
      let filteredProducts = [...sampleProducts]
      
      // Apply search filter
      if (filters.search) {
        filteredProducts = searchSampleProducts(filters.search)
      }
      
      // Apply category/specialty filter
      if (filters.category) {
        filteredProducts = filteredProducts.filter(product => 
          product.type === filters.category
        )
      }
      
      // Apply brand filter
      if (filters.brandIds && filters.brandIds.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
          const brandId = typeof product.brand === 'string' ? product.brand : product.brand?.id
          return brandId && filters.brandIds!.includes(brandId)
        })
      }
      
      // Apply price range filter
      if (filters.priceRange) {
        const { min, max } = filters.priceRange
        filteredProducts = filteredProducts.filter(product => 
          product.selling_price >= min && product.selling_price <= max
        )
      }
      
      // Apply stock filter
      if (filters.inStock) {
        filteredProducts = filteredProducts.filter(product => 
          product.stock_quantity > 0
        )
      }
      
      // Apply featured filter
      if (filters.featured) {
        filteredProducts = filteredProducts.filter(product => 
          product.is_featured
        )
      }
      
      // Apply constitution filter
      if (filters.constitution && filters.constitution.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
          product.constitution && 
          filters.constitution!.some(constitutionType => product.constitution!.includes(constitutionType))
        )
      }
      
      // Apply prescription filter
      if (filters.prescriptionRequired !== undefined) {
        filteredProducts = filteredProducts.filter(product => 
          product.is_prescription_required === filters.prescriptionRequired
        )
      }
      
      // Apply rating filter
      if (filters.rating) {
        filteredProducts = filteredProducts.filter(product => 
          product.average_rating && product.average_rating >= filters.rating!
        )
      }
      
      // Apply sorting
      if (filters.sortBy) {
        filteredProducts.sort((a, b) => {
          switch (filters.sortBy) {
            case 'name':
              return a.name.localeCompare(b.name)
            case 'price_low':
              return a.selling_price - b.selling_price
            case 'price_high':
              return b.selling_price - a.selling_price
            case 'rating':
              return (b.average_rating || 0) - (a.average_rating || 0)
            case 'newest':
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            case 'featured':
              return b.is_featured ? 1 : -1
            default:
              return 0
          }
        })
      }
      
      // Apply pagination
      const limit = filters.limit || 20
      const offset = filters.offset || 0
      const paginatedProducts = filteredProducts.slice(offset, offset + limit)
      
      // Generate filter options for UI
      const brands = [...new Set(sampleProducts.map(p => 
        typeof p.brand === 'string' ? p.brand : p.brand?.name
      ).filter(Boolean))].map(name => ({
        id: name!,
        name: name!,
        count: sampleProducts.filter(p => 
          (typeof p.brand === 'string' ? p.brand : p.brand?.name) === name
        ).length
      }))
      
      const categories = [...new Set(sampleProducts.map(p => p.type).filter(Boolean))].map(type => ({
        id: type!,
        name: type!.charAt(0).toUpperCase() + type!.slice(1),
        count: sampleProducts.filter(p => p.type === type).length
      }))
      
      const prices = sampleProducts.map(p => p.selling_price)
      const priceRange = { min: Math.min(...prices), max: Math.max(...prices) }
      
      return {
        products: paginatedProducts,
        total: filteredProducts.length,
        hasMore: (offset + limit) < filteredProducts.length,
        filters: {
          brands,
          categories,
          priceRange
        }
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useProductRecommendations(productId: string, limit = 4) {
  return useQuery({
    queryKey: ['product-recommendations', productId, limit],
    queryFn: () => productService.getRecommendations(productId, limit),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  })
}

export function useInfiniteProducts(filters: ProductFilters = {}) {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', filters],
    queryFn: ({ pageParam = 0 }) =>
      productService.getProducts({ ...filters, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) {
        return undefined
      }
      return allPages.length * (filters.limit || 20)
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
} 