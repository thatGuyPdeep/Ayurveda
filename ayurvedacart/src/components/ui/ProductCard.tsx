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
import type { Product } from '@/types'

interface ProductCardProps {
  product: any // Using any since sample data structure differs
  className?: string
  viewMode?: 'grid' | 'list'
}

export function ProductCard({ 
  product, 
  className = '',
  viewMode = 'grid'
}: ProductCardProps) {
  const { addItem } = useCart()
  const router = useRouter()
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  
  const discountPercentage = product.base_price && product.selling_price 
    ? Math.round(((product.base_price - product.selling_price) / product.base_price) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    
    // Simple alert for now - can be replaced with proper toast later
    console.log(`Added ${product.name} to cart`)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Add to cart and redirect to checkout
    addItem(product, 1)
    router.push('/checkout')
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Simple log for now - wishlist functionality to be implemented
    console.log(`Added ${product.name} to wishlist`)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsQuickViewOpen(true)
  }

  if (viewMode === 'list') {
    return (
      <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
        <div className="flex">
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={product.images?.[0]?.image_url || '/placeholder-product.svg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="192px"
            />
            {discountPercentage > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold text-lg hover:text-emerald-800 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                {product.brand && (
                  <p className="text-sm text-charcoal/60 mb-2">by {product.brand.name}</p>
                )}
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold text-emerald-800">
                    ₹{product.selling_price?.toLocaleString()}
                  </span>
                  {product.base_price && product.base_price > product.selling_price && (
                    <span className="text-sm text-charcoal/50 line-through">
                      ₹{product.base_price.toLocaleString()}
                    </span>
                  )}
                </div>
                
                {product.average_rating > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.round(product.average_rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-charcoal/60">
                      ({product.review_count || 0})
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-sm text-charcoal/70 mb-4 line-clamp-2">
              {product.short_description || product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleQuickView}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity <= 0}
                  variant="outline"
                  size="sm"
                  className="border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock_quantity <= 0}
                  size="sm"
                  className="bg-saffron-500 hover:bg-saffron-600 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        {isQuickViewOpen && (
          <QuickViewModal
            product={product}
            isOpen={isQuickViewOpen}
            onClose={() => setIsQuickViewOpen(false)}
          />
        )}
      </Card>
    )
  }

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-white ${className}`}>
      <Link href={`/products/${product.slug}`}>
        <CardHeader className="p-0 relative">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-sage-light/20">
            <Image
              src={product.images?.[0]?.image_url || '/placeholder-product.svg'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.is_featured && (
                <Badge className="bg-emerald-800 text-white">Featured</Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-red-500 text-white">-{discountPercentage}%</Badge>
              )}
              {product.stock_quantity <= 0 && (
                <Badge variant="secondary" className="bg-gray-500 text-white">Out of Stock</Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="outline"
                onClick={handleAddToWishlist}
                className="h-8 w-8 bg-white/90 border-0 hover:bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleQuickView}
                className="h-8 w-8 bg-white/90 border-0 hover:bg-white"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Link>

      <CardContent className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-charcoal/60 mb-1 uppercase tracking-wide">
            {product.brand.name}
          </p>
        )}

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-charcoal hover:text-emerald-800 transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.average_rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.round(product.average_rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-charcoal/60">
              ({product.review_count || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-emerald-800">
            ₹{product.selling_price?.toLocaleString()}
          </span>
          {product.base_price && product.base_price > product.selling_price && (
            <span className="text-sm text-charcoal/50 line-through">
              ₹{product.base_price.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock_quantity <= 0}
            variant="outline"
            size="sm"
            className="border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            disabled={product.stock_quantity <= 0}
            size="sm"
            className="bg-saffron-500 hover:bg-saffron-600 text-white"
          >
            <Zap className="w-4 h-4 mr-1" />
            Buy Now
          </Button>
        </div>
        {product.stock_quantity <= 0 && (
          <p className="text-sm text-red-500 text-center w-full">Out of Stock</p>
        )}
      </CardFooter>

      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </Card>
  )
}

export default ProductCard 