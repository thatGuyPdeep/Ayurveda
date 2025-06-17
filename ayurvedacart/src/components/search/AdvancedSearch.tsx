'use client'

import React, { useState, useEffect } from 'react'
import { Search, Filter, X, ChevronDown, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { medicalCategories, medicalBrands } from '@/lib/data/medical-products'
import type { ProductFilters } from '@/types'

interface AdvancedSearchProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  onSearch: () => void
  isOpen: boolean
  onToggle: () => void
}

export function AdvancedSearch({ 
  filters, 
  onFiltersChange, 
  onSearch, 
  isOpen, 
  onToggle 
}: AdvancedSearchProps) {
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const updateFilter = (key: keyof ProductFilters, value: any) => {
    const updated = { ...localFilters, [key]: value }
    setLocalFilters(updated)
  }

  const applyFilters = () => {
    onFiltersChange(localFilters)
    onSearch()
  }

  const clearFilters = () => {
    const cleared: ProductFilters = {}
    if (localFilters.search) {
      cleared.search = localFilters.search
    }
    setLocalFilters(cleared)
    onFiltersChange(cleared)
    onSearch()
  }

  const activeFiltersCount = Object.keys(localFilters).filter(key => {
    const value = localFilters[key as keyof ProductFilters]
    if (key === 'search') return false // Don't count search term
    return value !== undefined && value !== null && value !== '' && 
           (Array.isArray(value) ? value.length > 0 : true)
  }).length

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search medicines by name, condition, or ingredient..."
          value={localFilters.search || ''}
          onChange={(e) => updateFilter('search', e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
          className="pl-10 pr-20 h-12 text-base"
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
          <Button
            onClick={onToggle}
            variant={isOpen ? 'secondary' : 'ghost'}
            size="sm"
            className="relative"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-emerald-600 text-white text-xs min-w-[18px] h-5">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          <Button onClick={applyFilters} size="sm">
            Search
          </Button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {isOpen && (
        <Card className="mt-4 p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Specialty
              </label>
              <select
                value={localFilters.category || ''}
                onChange={(e) => updateFilter('category', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">All Specialties</option>
                {medicalCategories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <select
                value={localFilters.brandIds?.[0] || ''}
                onChange={(e) => updateFilter('brandIds', e.target.value ? [e.target.value] : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">All Brands</option>
                {medicalBrands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={localFilters.priceRange?.min || ''}
                  onChange={(e) => updateFilter('priceRange', {
                    ...localFilters.priceRange,
                    min: parseInt(e.target.value) || 0
                  })}
                  className="w-20"
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={localFilters.priceRange?.max || ''}
                  onChange={(e) => updateFilter('priceRange', {
                    ...localFilters.priceRange,
                    max: parseInt(e.target.value) || 10000
                  })}
                  className="w-20"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={localFilters.sortBy || 'name'}
                onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="name">Name A-Z</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => updateFilter('rating', rating === localFilters.rating ? undefined : rating)}
                    className={`p-1 rounded ${
                      (localFilters.rating || 0) >= rating
                        ? 'text-yellow-500'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </button>
                ))}
                {localFilters.rating && (
                  <Button
                    onClick={() => updateFilter('rating', undefined)}
                    variant="ghost"
                    size="sm"
                    className="ml-2 p-1 h-6 w-6"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Constitution Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ayurvedic Constitution
              </label>
              <div className="flex flex-wrap gap-2">
                {['vata', 'pitta', 'kapha'].map((constitution) => (
                  <Button
                    key={constitution}
                    onClick={() => {
                      const current = localFilters.constitution || []
                      const updated = current.includes(constitution as any)
                        ? current.filter(c => c !== constitution)
                        : [...current, constitution as any]
                      updateFilter('constitution', updated.length > 0 ? updated : undefined)
                    }}
                    variant={localFilters.constitution?.includes(constitution as any) ? 'secondary' : 'outline'}
                    size="sm"
                    className="capitalize"
                  >
                    {constitution}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Filters
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => updateFilter('featured', !localFilters.featured)}
                variant={localFilters.featured ? 'secondary' : 'outline'}
                size="sm"
              >
                Featured Products
              </Button>
              <Button
                onClick={() => updateFilter('inStock', !localFilters.inStock)}
                variant={localFilters.inStock ? 'secondary' : 'outline'}
                size="sm"
              >
                In Stock Only
              </Button>
              <Button
                onClick={() => updateFilter('prescriptionRequired', false)}
                variant={localFilters.prescriptionRequired === false ? 'secondary' : 'outline'}
                size="sm"
              >
                No Prescription Required
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              onClick={clearFilters}
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All Filters
            </Button>
            <div className="flex items-center space-x-3">
              <Button onClick={onToggle} variant="outline" size="sm">
                Close
              </Button>
              <Button onClick={applyFilters} size="sm">
                Apply Filters ({activeFiltersCount})
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default AdvancedSearch 