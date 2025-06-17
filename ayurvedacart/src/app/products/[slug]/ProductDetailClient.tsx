'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star, Heart, ShoppingCart, Truck, Shield, Award, ChevronLeft, ChevronRight, Plus, Minus, CreditCard } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { sampleProducts } from '@/lib/data/sample-products'
import type { Product } from '@/types'
import Link from 'next/link'

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews' | 'dosage'>('description')
  const [isLoading, setIsLoading] = useState(false)
  
  const { addItem } = useCart()
  const router = useRouter()
  
  const discountPercentage = product.discount_percentage || 0
  const isInStock = product.stock_quantity > 0
  const relatedProducts = sampleProducts.filter(p => p.type === (product.type || 'general') && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    if (isInStock) {
      addItem(product, quantity)
    }
  }

  const handleBuyNow = async () => {
    if (!isInStock) return
    
    setIsLoading(true)
    try {
      // Add to cart first
      addItem(product, quantity)
      // Redirect to checkout
      router.push('/checkout')
    } catch (error) {
      console.error('Error during buy now:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-sage-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-charcoal/70">
            <Link href="/" className="hover:text-saffron-500">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-saffron-500">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-sage-light/20 shadow-soft">
              <img
                src={product.images?.[selectedImageIndex]?.image_url || '/placeholder-product.svg'}
                alt={product.images?.[selectedImageIndex]?.alt_text || product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images - Show multiple placeholders for demo */}
            <div className="flex gap-2 overflow-x-auto">
              {[...Array(4)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index ? 'border-saffron-500 shadow-md' : 'border-sage-light hover:border-sage-500'
                  }`}
                >
                  <img
                    src="/placeholder-product.svg"
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Brand */}
            {product.brand && (
              <div className="text-sm text-charcoal/70">
                <span className="font-medium">
                  {typeof product.brand === 'string' ? product.brand : product.brand.name}
                </span>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-charcoal font-serif">{product.name}</h1>

            {/* Rating */}
            {product.average_rating && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.round(product.average_rating!) ? 'fill-saffron-500 text-saffron-500' : 'text-sage-light'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-charcoal/70">
                  {product.average_rating} ({product.review_count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-emerald-800">₹{product.selling_price.toLocaleString()}</span>
                {discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-charcoal/50 line-through">₹{product.base_price.toLocaleString()}</span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-charcoal/70">Inclusive of all taxes • Free shipping on orders above ₹999</p>
            </div>

            {/* Short Description */}
            <p className="text-charcoal/80 text-lg">{product.short_description}</p>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-medium ${isInStock ? 'text-green-700' : 'text-red-700'}`}>
                {isInStock ? `In Stock (${product.stock_quantity} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            {isInStock && (
              <div className="flex items-center gap-4">
                <span className="font-medium text-charcoal">Quantity:</span>
                <div className="flex items-center border border-sage-light rounded-xl">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-sage-light/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock_quantity}
                    className="p-3 hover:bg-sage-light/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-3">
              {/* Buy Now Button - Primary */}
              <button
                onClick={handleBuyNow}
                disabled={!isInStock || isLoading}
                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  isInStock 
                    ? 'bg-emerald-800 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
                    : 'bg-sage-light text-charcoal/50 cursor-not-allowed'
                } ${isLoading ? 'opacity-75' : ''}`}
              >
                <CreditCard className="h-5 w-5" />
                {isLoading ? 'Processing...' : isInStock ? `Buy Now - ₹${(product.selling_price * quantity).toLocaleString()}` : 'Out of Stock'}
              </button>

              {/* Add to Cart & Wishlist Row */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-colors ${
                    isInStock 
                      ? 'bg-saffron-500 text-white hover:bg-saffron-600' 
                      : 'bg-sage-light text-charcoal/50 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {isInStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-xl border transition-colors ${
                    isWishlisted 
                      ? 'border-red-500 bg-red-50 text-red-500' 
                      : 'border-sage-light hover:bg-sage-light/50 text-charcoal/70'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-sage-light/30 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto text-emerald-600 mb-2" />
                  <p className="text-sm font-medium text-charcoal">Free Shipping</p>
                  <p className="text-xs text-charcoal/70">On orders above ₹999</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto text-emerald-600 mb-2" />
                  <p className="text-sm font-medium text-charcoal">Authentic</p>
                  <p className="text-xs text-charcoal/70">100% genuine products</p>
                </div>
                <div className="text-center">
                  <Award className="h-6 w-6 mx-auto text-emerald-600 mb-2" />
                  <p className="text-sm font-medium text-charcoal">Certified</p>
                  <p className="text-xs text-charcoal/70">AYUSH approved</p>
                </div>
              </div>
            </div>

            {/* Product Highlights */}
            {product.indications && product.indications.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-sage-light">
                <h3 className="text-lg font-semibold text-charcoal mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.indications.slice(0, 4).map((indication, index) => (
                    <li key={index} className="flex items-center gap-2 text-charcoal/80">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                      {indication}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-sage-light">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'ingredients', label: 'Ingredients' },
                { id: 'dosage', label: 'Dosage & Usage' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-saffron-500 text-saffron-500'
                      : 'border-transparent text-charcoal/70 hover:text-charcoal hover:border-sage-light'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none">
                <p className="text-charcoal/80 leading-relaxed text-lg">{product.description}</p>
                
                {product.indications.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-charcoal mb-4">Therapeutic Indications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.indications.map((indication, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                          <span className="text-charcoal/80">{indication}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Product Information */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-sage-light">
                    <h4 className="font-semibold text-charcoal mb-3">Product Details</h4>
                    <ul className="space-y-2 text-sm text-charcoal/70">
                      <li><span className="font-medium">Form:</span> {product.form}</li>
                      <li><span className="font-medium">Type:</span> {product.type || 'General'}</li>
                      <li><span className="font-medium">Pack Size:</span> {product.pack_size || 'As specified'}</li>
                      <li><span className="font-medium">SKU:</span> {product.sku}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-sage-light">
                    <h4 className="font-semibold text-charcoal mb-3">Storage Instructions</h4>
                    <ul className="space-y-2 text-sm text-charcoal/70">
                      <li>• Store in a cool, dry place</li>
                      <li>• Keep away from direct sunlight</li>
                      <li>• Keep out of reach of children</li>
                      <li>• Check expiry date before use</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-xl font-semibold text-charcoal mb-6">Active Ingredients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-sage-light hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-charcoal">{ingredient}</h4>
                      <p className="text-sm text-charcoal/60 mt-1">Traditional Ayurvedic herb</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h4 className="font-semibold text-amber-800 mb-2">Important Note</h4>
                  <p className="text-amber-700 text-sm">This product contains natural Ayurvedic ingredients. Consult with an Ayurvedic practitioner for personalized dosage recommendations.</p>
                </div>
              </div>
            )}

            {activeTab === 'dosage' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-4">Dosage Instructions</h3>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                    <p className="text-emerald-800 text-lg leading-relaxed">{product.dosage_instructions}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-4">Usage Guidelines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-sage-light">
                      <h4 className="font-semibold text-charcoal mb-3">Best Time to Take</h4>
                      <ul className="space-y-2 text-charcoal/70">
                        <li>• As directed by physician</li>
                        <li>• Preferably with warm water</li>
                        <li>• After meals for better absorption</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-sage-light">
                      <h4 className="font-semibold text-charcoal mb-3">Duration</h4>
                      <ul className="space-y-2 text-charcoal/70">
                        <li>• Minimum 2-3 months for best results</li>
                        <li>• Continue as advised by practitioner</li>
                        <li>• Regular use recommended</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {product.contraindications.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-4">Contraindications & Precautions</h3>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <ul className="space-y-2">
                        {product.contraindications.map((contraindication, index) => (
                          <li key={index} className="flex items-center gap-2 text-red-700">
                            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                            {contraindication}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-charcoal">Customer Reviews</h3>
                  <button className="bg-saffron-500 text-white px-6 py-2 rounded-xl hover:bg-saffron-600 transition-colors">
                    Write a Review
                  </button>
                </div>
                
                <div className="text-center py-12">
                  <Star className="h-12 w-12 mx-auto text-charcoal/30 mb-4" />
                  <h3 className="text-lg font-semibold text-charcoal mb-2">No reviews yet</h3>
                  <p className="text-charcoal/70">Be the first to review this product and help others make informed decisions</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal font-serif mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.slug}`}>
                  <div className="bg-white rounded-2xl shadow-soft hover:shadow-royal transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedProduct.images?.[0]?.image_url || '/placeholder-product.svg'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-charcoal mb-2 group-hover:text-saffron-500 transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-emerald-800">₹{relatedProduct.selling_price.toLocaleString()}</span>
                        {relatedProduct.discount_percentage && relatedProduct.discount_percentage > 0 && (
                          <span className="text-sm text-charcoal/50 line-through">₹{relatedProduct.base_price.toLocaleString()}</span>
                        )}
                      </div>
                      <button className="w-full bg-saffron-500 text-white py-2 rounded-lg hover:bg-saffron-600 transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to get emoji for product type
function getProductEmoji(type: string): string {
  const emojiMap: Record<string, string> = {
    classical: '🏛️',
    cardiology: '❤️',
    dermatology: '🌿',
    gynecology: '🌸',
    gastroenterology: '🫁',
    'general-medicine': '⚕️',
    neurology: '🧠',
    orthopedics: '🦴',
    endocrinology: '⚖️',
    hepatology: '🫀',
    nephrology: '🫘',
    pulmonology: '🫁',
    immunology: '🛡️',
    pediatrics: '👶',
    geriatrics: '👴',
    oncology: '🎗️',
    psychiatry: '🧘'
  }
  return emojiMap[type] || '💊'
} 