'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  Shield, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
  Gift,
  Tag,
  Clock,
  Package,
  Home,
  Building2
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

const paymentMethods = [
  {
    id: 'razorpay',
    name: 'UPI / Cards / Net Banking',
    description: 'Pay securely with Razorpay',
    icon: CreditCard,
    popular: true
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive',
    icon: Truck,
    popular: false
  }
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    addressType: 'home'
  })
  const [selectedPayment, setSelectedPayment] = useState('razorpay')
  const [isProcessing, setIsProcessing] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  // Redirect to cart if empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-charcoal mb-2">Your cart is empty</h2>
          <p className="text-charcoal/70 mb-6">Add some items to your cart to proceed with checkout.</p>
          <Link href="/products">
            <Button className="bg-emerald-800 hover:bg-emerald-700 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Calculate totals
  const subtotal = getTotalPrice()
  const shipping = subtotal >= 999 ? 0 : 99
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const finalTotal = subtotal + shipping + tax - discount

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
    // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart and redirect to success page
      clearCart()
      setCurrentStep(3)
      
      // Redirect to order success page after a delay
    setTimeout(() => {
        router.push('/account/orders')
      }, 3000)
    } catch (error) {
      console.error('Payment failed:', error)
      setIsProcessing(false)
    }
  }

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'ayurveda10') {
      setDiscount(Math.round(subtotal * 0.1)) // 10% discount
    } else if (couponCode.toLowerCase() === 'welcome') {
      setDiscount(100) // ₹100 discount
    } else {
      alert('Invalid coupon code')
    }
  }

  const handleAddressChange = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }))
  }

  const steps = [
    { id: 1, name: 'Shipping', icon: Truck },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Confirmation', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-ivory">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-charcoal/70 hover:text-charcoal transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-charcoal font-display">
              Secure Checkout
            </h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-emerald-800 border-emerald-800 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step.id ? 'text-emerald-800' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-emerald-800' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">First Name</label>
                        <Input
                          type="text"
                          required
                          value={shippingAddress.firstName}
                          onChange={(e) => handleAddressChange('firstName', e.target.value)}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Last Name</label>
                        <Input
                          type="text"
                          required
                          value={shippingAddress.lastName}
                          onChange={(e) => handleAddressChange('lastName', e.target.value)}
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                        <Input
                          type="email"
                          required
                          value={shippingAddress.email}
                          onChange={(e) => handleAddressChange('email', e.target.value)}
                          placeholder="Enter email address"
                          icon={<Mail className="h-4 w-4" />}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                        <Input
                          type="tel"
                          required
                          value={shippingAddress.phone}
                          onChange={(e) => handleAddressChange('phone', e.target.value)}
                          placeholder="Enter phone number"
                          icon={<Phone className="h-4 w-4" />}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Full Address</label>
                      <textarea
                        required
                        value={shippingAddress.address}
                        onChange={(e) => handleAddressChange('address', e.target.value)}
                        placeholder="Enter complete address"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">City</label>
                        <Input
                          type="text"
                          required
                          value={shippingAddress.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">State</label>
                        <Input
                          type="text"
                          required
                          value={shippingAddress.state}
                          onChange={(e) => handleAddressChange('state', e.target.value)}
                          placeholder="Enter state"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">PIN Code</label>
                        <Input
                          type="text"
                          required
                          value={shippingAddress.pincode}
                          onChange={(e) => handleAddressChange('pincode', e.target.value)}
                          placeholder="Enter PIN code"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Landmark (Optional)</label>
                      <Input
                        type="text"
                        value={shippingAddress.landmark}
                        onChange={(e) => handleAddressChange('landmark', e.target.value)}
                        placeholder="Enter landmark"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Address Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => handleAddressChange('addressType', 'home')}
                          className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                            shippingAddress.addressType === 'home' 
                              ? 'border-emerald-800 bg-emerald-50 text-emerald-800' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Home className="h-4 w-4" />
                          Home
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddressChange('addressType', 'office')}
                          className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                            shippingAddress.addressType === 'office' 
                              ? 'border-emerald-800 bg-emerald-50 text-emerald-800' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Building2 className="h-4 w-4" />
                          Office
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-emerald-800 hover:bg-emerald-700 text-white">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
          </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`relative border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedPayment === method.id
                              ? 'border-emerald-800 bg-emerald-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={selectedPayment === method.id}
                              onChange={() => setSelectedPayment(method.id)}
                              className="text-emerald-800 focus:ring-emerald-800"
                            />
                            <method.icon className="h-6 w-6 text-gray-600" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-charcoal">{method.name}</h3>
                                {method.popular && (
                                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-charcoal/70">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-amber-800">
                        <Shield className="h-4 w-4" />
                        <span className="font-medium">Secure Payment</span>
                      </div>
                      <p className="text-sm text-amber-700 mt-1">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Back to Shipping
                      </Button>
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 bg-emerald-800 hover:bg-emerald-700 text-white"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Processing...
                          </div>
                        ) : (
                          `Place Order - ₹${finalTotal.toLocaleString()}`
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal mb-2">Order Placed Successfully!</h2>
                  <p className="text-charcoal/70 mb-6">
                    Thank you for your order. You will receive a confirmation email shortly.
                  </p>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                    <p className="text-emerald-800 font-medium">Order Number: AYU-{Date.now()}</p>
                    <p className="text-emerald-700 text-sm mt-1">
                      Estimated delivery: 3-5 business days
                    </p>
                  </div>
                  <Button
                    onClick={() => router.push('/account/orders')}
                    className="bg-emerald-800 hover:bg-emerald-700 text-white"
                  >
                    View My Orders
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <h3 className="text-lg font-semibold text-charcoal">Order Summary</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-charcoal text-sm">{item.product.name}</h4>
                        <p className="text-charcoal/70 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-charcoal">
                        ₹{(item.product.selling_price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-200" />

                {/* Coupon Code */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={applyCoupon}
                      className="px-4"
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-charcoal/60">
                    Try: "AYURVEDA10" for 10% off or "WELCOME" for ₹100 off
                  </p>
                </div>

                <hr className="border-gray-200" />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-charcoal/70">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>Tax (GST 18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between font-bold text-lg text-charcoal">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Free Shipping Message */}
                {subtotal < 999 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-800 text-sm">
                      Add ₹{(999 - subtotal).toLocaleString()} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Security Badge */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Lock className="h-4 w-4" />
                    <span className="text-sm font-medium">100% Secure Checkout</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 