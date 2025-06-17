'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  Gift, 
  Truck,
  Shield,
  CreditCard,
  ArrowRight,
  Tag,
  Heart
} from 'lucide-react'

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    name: 'Ashwagandha Premium Capsules',
    brand: 'Kottakkal Arya Vaidya Sala',
    price: 899,
    originalPrice: 1299,
    quantity: 2,
    image: '/placeholder-product.svg',
    inStock: true,
    maxQuantity: 10,
    benefits: ['Stress Relief', 'Energy Boost', 'Immunity'],
    prescription: false
  },
  {
    id: '2',
    name: 'Triphala Churna Organic',
    brand: 'Kerala Ayurveda',
    price: 449,
    originalPrice: 599,
    quantity: 1,
    image: '/placeholder-product.svg',
    inStock: true,
    maxQuantity: 5,
    benefits: ['Digestive Health', 'Detox', 'Weight Management'],
    prescription: false
  },
  {
    id: '3',
    name: 'Brahmi Ghrita Classical',
    brand: 'Vaidyaratnam',
    price: 1299,
    originalPrice: 1599,
    quantity: 1,
    image: '/placeholder-product.svg',
    inStock: true,
    maxQuantity: 3,
    benefits: ['Memory Enhancement', 'Mental Clarity', 'Stress Relief'],
    prescription: true
  }
]

const mockRecommendations = [
  {
    id: '4',
    name: 'Chyawanprash Special',
    brand: 'Dabur',
    price: 299,
    originalPrice: 399,
    image: '/placeholder-product.svg',
    rating: 4.5,
    reviews: 1250
  },
  {
    id: '5',
    name: 'Tulsi Drops Pure',
    brand: 'Himalaya',
    price: 149,
    originalPrice: 199,
    image: '/placeholder-product.svg',
    rating: 4.3,
    reviews: 890
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
  const shipping = subtotal >= 700 ? 0 : 50
  const couponDiscount = appliedCoupon ? Math.min(subtotal * 0.1, 200) : 0
  const total = subtotal + shipping - couponDiscount

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome10') {
      setAppliedCoupon(couponCode)
      setCouponCode('')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-32 w-32 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="h-16 w-16 text-charcoal/40" />
            </div>
            
            <h1 className="text-3xl font-bold text-charcoal font-display mb-4">
              Your Cart is Empty
            </h1>
            
            <p className="text-charcoal/70 mb-8 text-lg">
              Discover our premium Ayurvedic products and start your wellness journey
            </p>
            
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ShoppingCart className="h-5 w-5" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-charcoal/70 hover:text-charcoal transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-charcoal font-display">
              Shopping Cart
            </h1>
          </div>
          
          <p className="text-charcoal/70">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="h-24 w-24 bg-sage-light rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-charcoal text-lg line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-charcoal/60 mb-1">
                            by {item.brand}
                          </p>
                          {item.prescription && (
                            <div className="flex items-center gap-1 text-xs text-maroon-800 bg-maroon-100 px-2 py-1 rounded-full w-fit">
                              <Shield className="h-3 w-3" />
                              Prescription Required
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-charcoal/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Benefits */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.benefits.slice(0, 3).map((benefit) => (
                          <span
                            key={benefit}
                            className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-charcoal">
                            ₹{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-charcoal/50 line-through">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 border border-sage-dark rounded-lg hover:bg-sage-light transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 border border-sage-dark rounded-lg hover:bg-sage-light transition-colors"
                            disabled={item.quantity >= item.maxQuantity}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="mt-2">
                        {item.inStock ? (
                          <p className="text-xs text-emerald-600">
                            ✓ In Stock ({item.maxQuantity - item.quantity} more available)
                          </p>
                        ) : (
                          <p className="text-xs text-red-600">
                            ✗ Out of Stock
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-charcoal text-lg mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-saffron-500" />
                You might also like
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockRecommendations.map((product) => (
                  <div key={product.id} className="border border-sage-light rounded-xl p-4 hover:shadow-sm transition-shadow">
                    <div className="flex gap-3">
                      <div className="h-16 w-16 bg-sage-light rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-charcoal text-sm line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-xs text-charcoal/60 mb-1">
                          {product.brand}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-charcoal">
                              ₹{product.price}
                            </span>
                            <span className="text-xs text-charcoal/50 line-through">
                              ₹{product.originalPrice}
                            </span>
                          </div>
                          <button className="text-xs bg-saffron-500 text-white px-2 py-1 rounded-lg hover:bg-saffron-600 transition-colors">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-charcoal text-lg mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-saffron-500" />
                Coupon Code
              </h3>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div>
                    <p className="font-medium text-emerald-800">
                      {appliedCoupon.toUpperCase()} Applied
                    </p>
                    <p className="text-sm text-emerald-600">
                      You saved ₹{couponDiscount}
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-600 hover:text-emerald-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-sage-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-saffron-500 text-white rounded-lg hover:bg-saffron-600 transition-colors font-medium"
                  >
                    Apply
                  </button>
                </div>
              )}
              
              <p className="text-xs text-charcoal/60 mt-2">
                Try: WELCOME10 for 10% off (up to ₹200)
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-charcoal text-lg mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>You Save</span>
                    <span className="font-semibold">-₹{savings.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-₹{couponDiscount}</span>
                  </div>
                )}
                
                <div className="border-t border-sage-light pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-charcoal">Total</span>
                    <span className="font-bold text-charcoal">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              {shipping > 0 && (
                <div className="mt-4 p-3 bg-saffron-50 border border-saffron-200 rounded-lg">
                  <div className="flex items-center gap-2 text-saffron-800">
                    <Truck className="h-4 w-4" />
                    <span className="text-sm">
                      Add ₹{(700 - subtotal).toLocaleString()} more for FREE shipping
                    </span>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-4 m-2 border border-emerald-600 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'green',
                  borderColor: 'green',
                  borderWidth: '1px',
                  borderRadius: '5px',
                  padding: '10px',
                  margin: '10px'
                }}
              >
                <CreditCard className="h-5 w-5" />
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-charcoal/60">
                <Shield className="h-4 w-4" />
                Secure & Encrypted Checkout
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-charcoal text-lg mb-4">
                Why Choose Us?
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Truck className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal text-sm">Free Shipping</p>
                    <p className="text-xs text-charcoal/60">On orders above ₹700</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-saffron-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-saffron-600" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal text-sm">Authentic Products</p>
                    <p className="text-xs text-charcoal/60">100% genuine Ayurvedic medicines</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-maroon-100 rounded-lg flex items-center justify-center">
                    <Gift className="h-4 w-4 text-maroon-600" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal text-sm">Expert Consultation</p>
                    <p className="text-xs text-charcoal/60">Free Ayurvedic doctor consultation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 