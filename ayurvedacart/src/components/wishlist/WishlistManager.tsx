'use client'

import { useState, useEffect } from 'react'
import { useWishlist } from '@/contexts/WishlistContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Heart, 
  ShoppingCart, 
  X, 
  Star, 
  TrendingUp,
  Trash2,
  Package
} from 'lucide-react'
import { Product } from '@/types'

export function WishlistManager() {
  const { items: wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const [isVisible, setIsVisible] = useState(false)

  // Show manager when items are added to wishlist
  useEffect(() => {
    if (wishlistItems.length > 0) {
      setIsVisible(true)
    }
  }, [wishlistItems])

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
    toast.success(`${product.name} added to cart!`)
  }

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId)
    toast.success('Removed from wishlist')
  }

  const handleClearWishlist = () => {
    clearWishlist()
    toast.success('Wishlist cleared')
  }

  if (!isVisible || wishlistItems.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-white shadow-2xl border border-gray-200">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-current" />
              <h3 className="font-semibold text-gray-900">Wishlist</h3>
              <Badge className="bg-red-100 text-red-800">
                {wishlistItems.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Wishlist Items */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {wishlistItems.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">
                    {product.name}
                  </h4>
                  <p className="text-emerald-600 font-semibold text-sm">
                    ₹{product.selling_price.toLocaleString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    size="sm"
                    className="h-8 w-8 p-0 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {wishlistItems.length > 3 && (
              <p className="text-center text-sm text-gray-500">
                +{wishlistItems.length - 3} more items
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            <Link href="/wishlist" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                View All
              </Button>
            </Link>
            <Button
              onClick={handleClearWishlist}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 