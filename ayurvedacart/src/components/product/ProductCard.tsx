import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { useCart } from '@/store/cart'
import { formatPriceINR, calculateDiscount, getImageUrl } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  className?: string
  showQuickView?: boolean
  onQuickView?: (product: Product) => void
}

export function ProductCard({ 
  product, 
  className, 
  showQuickView = false,
  onQuickView 
}: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem({
      product_id: product.id,
      quantity: 1,
      product
    })
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product)
  }

  const discountPercentage = product.base_price && product.base_price > product.selling_price
    ? calculateDiscount(product.base_price, product.selling_price)
    : 0

  const isOutOfStock = product.stock_quantity <= 0
  const isLowStock = product.stock_quantity <= product.low_stock_threshold && product.stock_quantity > 0

  return (
    <Link href={`/products/${product.slug}`} className={className}>
      <Card 
        variant="elevated" 
        padding="none"
        className="group overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={getImageUrl(product.images?.[0]?.image_url)}
            alt={product.images?.[0]?.alt_text || product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <Badge variant="error" className="text-white bg-red-500">
                -{discountPercentage}%
              </Badge>
            )}
            
            {product.is_featured && (
              <Badge variant="golden">
                Featured
              </Badge>
            )}
            
            {isOutOfStock && (
              <Badge variant="error">
                Out of Stock
              </Badge>
            )}
            
            {isLowStock && (
              <Badge variant="warning">
                Low Stock
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/90 hover:bg-white shadow-md"
              onClick={handleQuickView}
            >
              <Heart className="h-4 w-4 text-charcoal" />
            </Button>
            
            {showQuickView && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/90 hover:bg-white shadow-md"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4 text-charcoal" />
              </Button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-charcoal/60 font-medium uppercase tracking-wide">
              {product.brand.name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-charcoal line-clamp-2 group-hover:text-emerald-800 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.average_rating && product.average_rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.round(product.average_rating || 0)
                        ? 'fill-saffron-500 text-saffron-500'
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-emerald-800">
                {formatPriceINR(product.selling_price)}
              </span>
              {product.base_price && product.base_price > product.selling_price && (
                <span className="text-sm text-charcoal/50 line-through">
                  {formatPriceINR(product.base_price)}
                </span>
              )}
            </div>
            
            {/* Stock Status */}
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              isOutOfStock 
                ? 'bg-red-100 text-red-800' 
                : isLowStock
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            variant={isOutOfStock ? 'outline' : 'default'}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </Card>
    </Link>
  )
} 