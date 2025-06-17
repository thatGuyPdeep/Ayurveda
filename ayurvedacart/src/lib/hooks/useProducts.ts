import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { productService, type ProductFilters } from '@/lib/services/product'

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
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