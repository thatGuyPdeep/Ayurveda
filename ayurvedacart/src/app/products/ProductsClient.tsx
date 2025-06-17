'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, Grid, List, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProductCard } from '@/components/ui/ProductCard'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { useProducts } from '@/lib/hooks/useProducts'
import type { ProductFilters } from '@/lib/services/product'

interface LocalFilters {
  search: string
  category: string
  minPrice: string
  maxPrice: string
  sortBy: string
  inStock: boolean
  featured: boolean
}

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const [localFilters, setLocalFilters] = useState<LocalFilters>({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name',
    inStock: false,
    featured: false
  })

  // Handle URL parameters for specialty filtering
  useEffect(() => {
    const specialty = searchParams.get('specialty')
    if (specialty) {
      setLocalFilters(prev => ({
        ...prev,
        category: specialty
      }))
    }
  }, [searchParams])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Convert local filters to API filters
  const apiFilters = useMemo<ProductFilters>(() => {
    const filters: ProductFilters = {
      sortBy: localFilters.sortBy as any,
      inStock: localFilters.inStock,
      featured: localFilters.featured,
      limit: 20
    }

    if (localFilters.search.trim()) {
      filters.search = localFilters.search.trim()
    }

    if (localFilters.category) {
      filters.category = localFilters.category
    }

    if (localFilters.minPrice || localFilters.maxPrice) {
      filters.priceRange = {
        min: localFilters.minPrice ? parseInt(localFilters.minPrice) : 0,
        max: localFilters.maxPrice ? parseInt(localFilters.maxPrice) : 10000
      }
    }

    return filters
  }, [localFilters])

  // Use React Query to fetch products
  const { data: productData, isLoading, error } = useProducts(apiFilters)
  const products = productData?.products || []

  const handleFilterChange = (key: keyof LocalFilters, value: string | boolean) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setLocalFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      inStock: false,
      featured: false
    })
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-charcoal mb-2">Error loading products</h3>
          <p className="text-charcoal/70 mb-4">
            There was an issue loading the products. Please try again.
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-charcoal mb-2 font-display">
            AyuraVeda Royale Products
          </h1>
          <p className="text-charcoal/70">
            {isLoading ? 'Loading products...' : `${products.length} authentic Ayurvedic products`}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-sage-light shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products, ingredients, conditions..."
                value={localFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={localFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-3 py-2 border border-sage-dark rounded-md text-sm bg-white text-charcoal"
            >
              <option value="">All Specialties</option>
              <option value="andrology">Andrology</option>
              <option value="cardiology">Cardiology</option>
              <option value="classical">Classical Ayurveda</option>
              <option value="dental">Dental Care</option>
              <option value="dermatology">Dermatology</option>
              <option value="endocrinology">Endocrinology</option>
              <option value="gastroenterology">Gastroenterology</option>
              <option value="general-medicine">General Medicine</option>
              <option value="gynecology">Gynecology</option>
              <option value="hepatology">Hepatology</option>
              <option value="nephrology">Nephrology</option>
              <option value="neurology">Neurology</option>
              <option value="ophthalmology">Ophthalmology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="pulmonology">Pulmonology</option>
              <option value="trichology">Trichology</option>
            </select>

            <select
              value={localFilters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-3 py-2 border border-sage-dark rounded-md text-sm bg-white text-charcoal"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
              <option value="featured">Featured</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {(localFilters.search || localFilters.category || localFilters.minPrice || localFilters.maxPrice || localFilters.inStock || localFilters.featured) && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-emerald-800"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-sage-light">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-charcoal">Price Range</label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min ₹"
                    value={localFilters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max ₹"
                    value={localFilters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-charcoal">Availability</label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="mr-2 h-4 w-4 text-emerald-800 focus:ring-emerald-800 border-sage-dark rounded"
                  />
                  <span className="text-sm text-charcoal">In Stock Only</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-charcoal">Special</label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.featured}
                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                    className="mr-2 h-4 w-4 text-emerald-800 focus:ring-emerald-800 border-sage-dark rounded"
                  />
                  <span className="text-sm text-charcoal">Featured Products</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Display */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <LoadingSkeleton key={i} className="h-96" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-charcoal/40" />
          </div>
          <h3 className="text-xl font-semibold text-charcoal mb-2">No products found</h3>
          <p className="text-charcoal/70 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={clearFilters} variant="outline">
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Load More Button */}
      {!isLoading && products.length > 0 && productData?.hasMore && (
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            <Loader2 className="h-4 w-4 mr-2" />
            Load More Products
          </Button>
        </div>
      )}
    </div>
  )
} 