'use client'

import * as React from 'react'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types'

// Mock data - replace with actual API calls
const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'AYU-001',
    name: 'Ashwagandha Premium Capsules',
    slug: 'ashwagandha-premium-capsules',
    short_description: 'Natural stress relief and energy booster',
    description: 'Premium quality Ashwagandha capsules for stress management and vitality enhancement.',
    type: 'supplement',
    form: 'capsule',
    base_price: 2499,
    selling_price: 1999,
    tax_rate: 8,
    track_inventory: true,
    stock_quantity: 150,
    low_stock_threshold: 20,
    ingredients: ['Ashwagandha Root Extract', 'Organic Turmeric', 'Black Pepper Extract'],
    indications: ['Stress Management', 'Energy Enhancement', 'Immune Support'],
    contraindications: ['Pregnancy', 'Nursing', 'Autoimmune Conditions'],
    dosage_instructions: 'Take 1-2 capsules daily with meals',
    constitution: ['vata', 'pitta'],
    status: 'active',
    is_featured: true,
    is_prescription_required: false,
    images: [{
      id: '1',
      product_id: '1',
      image_url: '/products/ashwagandha-capsules.jpg',
      alt_text: 'Ashwagandha Premium Capsules',
      sort_order: 1,
      is_primary: true,
      created_at: '2024-01-01T00:00:00Z'
    }],
    average_rating: 4.5,
    review_count: 128,
    brand: {
      id: 'brand-1',
      name: 'AyurVeda Premium',
      slug: 'ayurveda-premium',
      logo_url: '/brands/ayurveda-premium.jpg',
      description: 'Premium Ayurvedic products',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    sku: 'AYU-002',
    name: 'Triphala Digestive Support',
    slug: 'triphala-digestive-support',
    short_description: 'Traditional digestive wellness formula',
    description: 'Ancient Ayurvedic blend of three fruits for digestive health and detoxification.',
    type: 'medicine',
    form: 'powder',
    base_price: 1599,
    selling_price: 1599,
    tax_rate: 8,
    track_inventory: true,
    stock_quantity: 89,
    low_stock_threshold: 15,
    ingredients: ['Amalaki', 'Bibhitaki', 'Haritaki'],
    indications: ['Digestive Health', 'Detoxification', 'Bowel Regularity'],
    contraindications: ['Severe Diarrhea', 'Pregnancy'],
    dosage_instructions: 'Mix 1 tsp with warm water before bedtime',
    constitution: ['pitta', 'kapha'],
    status: 'active',
    is_featured: false,
    is_prescription_required: false,
    images: [{
      id: '2',
      product_id: '2',
      image_url: '/products/triphala-powder.jpg',
      alt_text: 'Triphala Digestive Support Powder',
      sort_order: 1,
      is_primary: true,
      created_at: '2024-01-01T00:00:00Z'
    }],
    average_rating: 4.2,
    review_count: 67,
    brand: {
      id: 'brand-2',
      name: 'Traditional Herbs',
      slug: 'traditional-herbs',
      logo_url: '/brands/traditional-herbs.jpg',
      description: 'Traditional herbal medicines',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  }
]

const categories = [
  { id: 'supplements', name: 'Health Supplements', count: 45 },
  { id: 'medicines', name: 'Classical Medicines', count: 67 },
  { id: 'oils', name: 'Herbal Oils', count: 23 },
  { id: 'powders', name: 'Herbal Powders', count: 34 },
  { id: 'teas', name: 'Herbal Teas', count: 18 }
]

const constitutions = [
  { value: 'vata', label: 'Vata', count: 120 },
  { value: 'pitta', label: 'Pitta', count: 98 },
  { value: 'kapha', label: 'Kapha', count: 87 }
]

const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 1000, count: 45 },
  { label: '₹1,000 - ₹2,500', min: 1000, max: 2500, count: 78 },
  { label: '₹2,500 - ₹5,000', min: 2500, max: 5000, count: 34 },
  { label: 'Over ₹5,000', min: 5000, max: 100000, count: 23 }
]

export function ProductsClient() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedConstitution, setSelectedConstitution] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'price_low' | 'price_high' | 'newest' | 'rating'>('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Category filter
      if (selectedCategory && product.type !== selectedCategory) {
        return false
      }

      // Constitution filter
      if (selectedConstitution && !product.constitution?.includes(selectedConstitution as any)) {
        return false
      }

      // Price range filter
      if (selectedPriceRange) {
        if (product.selling_price < selectedPriceRange.min || product.selling_price > selectedPriceRange.max) {
          return false
        }
      }

      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.selling_price - b.selling_price
        case 'price_high':
          return b.selling_price - a.selling_price
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'rating':
          return (b.average_rating || 0) - (a.average_rating || 0)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedConstitution, selectedPriceRange, sortBy])

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedConstitution('')
    setSelectedPriceRange(null)
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ayurvedic Products
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover our comprehensive collection of authentic Ayurvedic medicines, 
              supplements, and wellness products.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Filters</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Products</label>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Categories</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === '' 
                          ? 'bg-emerald-800 text-white' 
                          : 'hover:bg-sage-light'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between ${
                          selectedCategory === category.id 
                            ? 'bg-emerald-800 text-white' 
                            : 'hover:bg-sage-light'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-xs opacity-70">({category.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Constitution */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Ayurvedic Constitution</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedConstitution('')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedConstitution === '' 
                          ? 'bg-emerald-800 text-white' 
                          : 'hover:bg-sage-light'
                      }`}
                    >
                      All Constitutions
                    </button>
                    {constitutions.map((constitution) => (
                      <button
                        key={constitution.value}
                        onClick={() => setSelectedConstitution(constitution.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between ${
                          selectedConstitution === constitution.value 
                            ? 'bg-emerald-800 text-white' 
                            : 'hover:bg-sage-light'
                        }`}
                      >
                        <span>{constitution.label}</span>
                        <span className="text-xs opacity-70">({constitution.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Price Range</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedPriceRange(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedPriceRange === null 
                          ? 'bg-emerald-800 text-white' 
                          : 'hover:bg-sage-light'
                      }`}
                    >
                      All Prices
                    </button>
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => setSelectedPriceRange({ min: range.min, max: range.max })}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between ${
                          selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max
                            ? 'bg-emerald-800 text-white' 
                            : 'hover:bg-sage-light'
                        }`}
                      >
                        <span>{range.label}</span>
                        <span className="text-xs opacity-70">({range.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <p className="text-charcoal/60">
                  Showing {filteredProducts.length} of {mockProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-sage-light rounded-lg bg-ivory text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-sage-light rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(searchQuery || selectedCategory || selectedConstitution || selectedPriceRange) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {categories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('')}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedConstitution && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Constitution: {constitutions.find(c => c.value === selectedConstitution)?.label}
                    <button onClick={() => setSelectedConstitution('')}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedPriceRange && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Price: {priceRanges.find(r => r.min === selectedPriceRange.min && r.max === selectedPriceRange.max)?.label}
                    <button onClick={() => setSelectedPriceRange(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showQuickView={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2 text-charcoal">No products found</h3>
                <p className="text-charcoal/60 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
} 