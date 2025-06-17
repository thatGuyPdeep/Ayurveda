'use client'

import React, { useState } from 'react'
import { X, Star, Plus, Minus, ShoppingCart, Heart, Shield, Truck, Award } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/components/ui/Toast'
import Image from 'next/image'

interface QuickViewModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { addToast } = useToast()

  if (!isOpen || !product) return null

  const discountPercentage = product.base_price && product.selling_price 
    ? Math.round(((product.base_price - product.selling_price) / product.base_price) * 100)
    : 0

  const handleAddToCart = () => {
    addItem(product, quantity)
    addToast({
      type: 'success',
      title: 'Added to Cart!',
      message: `${quantity}x ${product.name} added to your cart`,
      duration: 3000
    })
    onClose()
  }

  const handleAddToWishlist = () => {
    addToast({
      type: 'info',
      title: 'Added to Wishlist!',
      message: `${product.name} has been saved to your wishlist`,
      duration: 3000
    })
  }

  const updateQuantity = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product.stock_quantity || 10)) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-sage-light/20 rounded-xl overflow-hidden">
              <Image
                src={product.images?.[0]?.image_url || '/placeholder-product.svg'}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Brand */}
            {product.brand && (
              <p className="text-sm text-charcoal/70 font-medium">
                {product.brand.name}
              </p>
            )}

            {/* Product Name */}
            <h2 className="text-2xl font-bold text-charcoal font-serif">
              {product.name}
            </h2>

            {/* Rating */}
            {product.average_rating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(product.average_rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-charcoal/70">
                  {product.average_rating} ({product.review_count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-emerald-800">
                  ₹{product.selling_price?.toLocaleString()}
                </span>
                {discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-charcoal/50 line-through">
                      ₹{product.base_price?.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-charcoal/70">Inclusive of all taxes</p>
            </div>

            {/* Short Description */}
            <p className="text-charcoal/80">
              {product.short_description || product.description?.substring(0, 150) + '...'}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                product.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className={`text-sm font-medium ${
                product.stock_quantity > 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                {product.stock_quantity > 0 
                  ? `In Stock (${product.stock_quantity} available)`
                  : 'Out of Stock'
                }
              </span>
            </div>

            {/* Quantity Selector */}
            {product.stock_quantity > 0 && (
              <div className="flex items-center gap-4">
                <span className="font-medium text-charcoal">Quantity:</span>
                <div className="flex items-center border border-sage-light rounded-lg">
                  <button
                    onClick={() => updateQuantity(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-sage-light/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(1)}
                    disabled={quantity >= product.stock_quantity}
                    className="p-2 hover:bg-sage-light/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity <= 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-colors ${
                  product.stock_quantity > 0
                    ? 'bg-emerald-800 text-white hover:bg-emerald-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button
                onClick={handleAddToWishlist}
                className="p-3 rounded-xl border border-sage-light hover:bg-sage-light/50 text-charcoal/70 transition-colors"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-sage-light">
              <div className="text-center">
                <Truck className="h-5 w-5 mx-auto text-emerald-600 mb-1" />
                <p className="text-xs font-medium text-charcoal">Free Shipping</p>
                <p className="text-xs text-charcoal/70">On orders above ₹999</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto text-emerald-600 mb-1" />
                <p className="text-xs font-medium text-charcoal">Authentic</p>
                <p className="text-xs text-charcoal/70">100% genuine</p>
              </div>
              <div className="text-center">
                <Award className="h-5 w-5 mx-auto text-emerald-600 mb-1" />
                <p className="text-xs font-medium text-charcoal">Certified</p>
                <p className="text-xs text-charcoal/70">AYUSH approved</p>
              </div>
            </div>

            {/* View Full Details Link */}
            <div className="pt-4">
              <a
                href={`/products/${product.slug}`}
                className="text-emerald-800 hover:text-emerald-600 font-medium text-sm underline"
                onClick={onClose}
              >
                View Full Details →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 