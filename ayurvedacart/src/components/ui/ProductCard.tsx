'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import { QuickViewModal } from '@/components/ui/QuickViewModal'
import { Heart, ShoppingCart, Star, Eye, Zap } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { toast } from 'react-hot-toast'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { addItem } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const router = useRouter()
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  
  const discountPercentage = product.discount_percentage || 0
  const isInStock = product.stock_quantity > 0
  const brandName = typeof product.brand === 'string' ? product.brand : product.brand?.name || 'Unknown'
  const imageUrl = product.images?.[0]?.image_url || '/placeholder-product.svg'
  const isWishlistItem = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInStock) {
      addItem(product, 1)
      toast.success(`${product.name} added to cart!`)
    }
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Add to cart and redirect to checkout
    addItem(product, 1)
    router.push('/checkout')
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isWishlistItem) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist!')
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsQuickViewOpen(true)
  }

  if (viewMode === 'list') {
    return (
      <Link href={`/products/${product.slug}`} className="group">
        <div className="bg-white rounded-xl border border-sage-light hover:shadow-lg transition-all duration-200 p-6">
          <div className="flex gap-6">
            {/* Product Image - Fixed Size */}
            <div className="w-32 h-32 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-sage-light/20">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs text-charcoal/60 mb-1">{brandName}</p>
                  <h3 className="font-semibold text-charcoal group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>
                
                {discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-xs font-semibold">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>

              <p className="text-sm text-charcoal/70 mb-3 line-clamp-2">
                {product.short_description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-emerald-800">₹{product.selling_price.toLocaleString()}</span>
                  {discountPercentage > 0 && (
                    <span className="text-sm text-charcoal/50 line-through">₹{product.base_price.toLocaleString()}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleWishlist}
                    className="p-2 rounded-lg hover:bg-sage-light transition-colors"
                  >
                    <Heart className={`h-4 w-4 ${isWishlistItem ? 'fill-red-500 text-red-500' : 'text-charcoal/60 hover:text-red-500'}`} />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isInStock
                        ? 'bg-emerald-800 text-white hover:bg-emerald-700'
                        : 'bg-sage-light text-charcoal/50 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid View - Consistent Fixed Dimensions
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-xl border border-sage-light hover:shadow-lg transition-all duration-200 overflow-hidden h-[420px] flex flex-col">
        {/* Product Image - Fixed Height */}
        <div className="relative h-48 bg-white overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`h-4 w-4 ${isWishlistItem ? 'fill-red-500 text-red-500' : 'text-charcoal/60 hover:text-red-500'}`} />
          </button>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Stock Status */}
          {!isInStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-charcoal px-3 py-1 rounded-md font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info - Fixed Layout */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Brand */}
          <p className="text-xs text-charcoal/60 mb-1">{brandName}</p>
          
          {/* Product Name - Fixed Height with Ellipsis */}
          <h3 className="font-semibold text-charcoal group-hover:text-emerald-800 transition-colors mb-2 line-clamp-2 h-12 leading-6">
            {product.name}
          </h3>

          {/* Description - Fixed Height */}
          <p className="text-sm text-charcoal/70 mb-3 line-clamp-3 h-16 leading-5">
            {product.short_description}
          </p>

          {/* Rating */}
          {product.average_rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < Math.round(product.average_rating!) ? 'fill-saffron-500 text-saffron-500' : 'text-sage-light'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-charcoal/60">({product.review_count})</span>
            </div>
          )}

          {/* Price Section - Bottom Aligned */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-emerald-800">₹{product.selling_price.toLocaleString()}</span>
                {discountPercentage > 0 && (
                  <span className="text-sm text-charcoal/50 line-through">₹{product.base_price.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isInStock
                  ? 'bg-emerald-800 text-white hover:bg-emerald-700 hover:shadow-md'
                  : 'bg-sage-light text-charcoal/50 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {isInStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard 