'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, Star, ArrowLeft } from 'lucide-react'
import { sampleProducts } from '@/lib/data/sample-products'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/components/ui/Toast'
import { useState } from 'react'

// Mock wishlist data - in real app, this would come from user's saved items
const wishlistItems = sampleProducts.slice(0, 4)

export default function WishlistPage() {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const [wishlist, setWishlist] = useState(wishlistItems)

  const handleAddAllToCart = () => {
    let addedCount = 0
    wishlist.forEach(product => {
      if (product.stock_quantity > 0) {
        addItem(product, 1)
        addedCount++
      }
    })
    
    if (addedCount > 0) {
      addToast({
        type: 'success',
        title: 'Added to Cart!',
        message: `${addedCount} items added to your cart`,
        duration: 3000
      })
    }
  }

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
    addToast({
      type: 'info',
      title: 'Removed from Wishlist',
      message: 'Item removed from your wishlist',
      duration: 2000
    })
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/products"
              className="flex items-center gap-2 text-emerald-800 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-gradient-to-br from-maroon-800 to-maroon-600 rounded-lg flex items-center justify-center">
              <Heart className="h-4 w-4 text-white fill-current" />
            </div>
            <h1 className="text-3xl font-bold text-charcoal font-display">
              My Wishlist
            </h1>
          </div>
          
          <p className="text-charcoal/70">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length > 0 ? (
          <div className="space-y-6">
            {/* Wishlist Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-emerald-800 text-white rounded-xl hover:bg-emerald-700 transition-colors text-sm font-medium">
                  Add All to Cart
                </button>
                <button className="px-4 py-2 border border-sage-dark text-charcoal rounded-xl hover:bg-sage-light transition-colors text-sm font-medium">
                  Share Wishlist
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-charcoal/60">
                <span>Sort by:</span>
                <select className="border border-sage-dark rounded-lg px-3 py-1 bg-white text-charcoal">
                  <option>Recently Added</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <WishlistCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyWishlist />
        )}

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-charcoal font-display mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.slice(4, 8).map((product) => (
              <RecommendationCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function WishlistCard({ product }: { product: any }) {
  const handleRemoveFromWishlist = () => {
    // TODO: Implement remove from wishlist
    console.log('Remove from wishlist:', product.id)
  }

  const handleAddToCart = () => {
    // TODO: Implement add to cart
    console.log('Add to cart:', product.id)
  }

  const discountPercentage = product.base_price > product.selling_price 
    ? Math.round(((product.base_price - product.selling_price) / product.base_price) * 100)
    : 0

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images?.[0]?.image_url || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-maroon-800 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            -{discountPercentage}%
          </div>
        )}

        {/* Remove Button */}
        <button
          onClick={handleRemoveFromWishlist}
          className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Trash2 className="h-4 w-4 text-maroon-800" />
        </button>

        {/* Stock Status */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.stock_quantity > 0
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-charcoal/60 mb-1">
            {product.brand.name}
          </p>
        )}

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-charcoal mb-2 line-clamp-2 hover:text-emerald-800 transition-colors">
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
                  className={`h-3 w-3 ${
                    i < Math.round(product.average_rating)
                      ? 'fill-saffron-500 text-saffron-500'
                      : 'text-sage-dark'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-charcoal/60">
              ({product.review_count})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-emerald-800">
            ₹{product.selling_price.toLocaleString()}
          </span>
          {product.base_price > product.selling_price && (
            <span className="text-sm text-charcoal/50 line-through">
              ₹{product.base_price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock_quantity <= 0}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-saffron-500 hover:bg-saffron-600 disabled:bg-sage-light disabled:text-charcoal/50 text-white rounded-xl font-medium transition-colors duration-200"
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

function RecommendationCard({ product }: { product: any }) {
  const handleAddToWishlist = () => {
    // TODO: Implement add to wishlist
    console.log('Add to wishlist:', product.id)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images?.[0]?.image_url || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <button
          onClick={handleAddToWishlist}
          className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Heart className="h-4 w-4 text-charcoal/60 hover:text-maroon-800" />
        </button>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-charcoal mb-2 line-clamp-2 hover:text-emerald-800 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-emerald-800">
            ₹{product.selling_price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

function EmptyWishlist() {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="h-24 w-24 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="h-12 w-12 text-charcoal/40" />
        </div>
        
        <h2 className="text-2xl font-bold text-charcoal font-display mb-4">
          Your Wishlist is Empty
        </h2>
        
        <p className="text-charcoal/70 mb-8">
          Start adding products you love to your wishlist. They'll appear here for easy access later.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
          >
            <ShoppingCart className="h-4 w-4" />
            Explore Products
          </Link>
          
          <div className="text-sm text-charcoal/60">
            or{' '}
            <Link href="/specialties" className="text-emerald-800 hover:text-emerald-700 font-medium">
              browse by specialty
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 