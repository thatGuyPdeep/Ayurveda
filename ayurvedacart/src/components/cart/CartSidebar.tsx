'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    getTotalItems 
  } = useCart()

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-charcoal">
                          Shopping Cart ({totalItems})
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-charcoal/50 hover:text-charcoal"
                            onClick={toggleCart}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Cart Items */}
                      <div className="mt-8">
                        <div className="flow-root">
                          {items.length === 0 ? (
                            <div className="text-center py-12">
                              <ShoppingBag className="mx-auto h-12 w-12 text-charcoal/30" />
                              <h3 className="mt-2 text-sm font-medium text-charcoal">Your cart is empty</h3>
                              <p className="mt-1 text-sm text-charcoal/50">
                                Start adding some products to your cart.
                              </p>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-sage-light">
                              {items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  {/* Product Image */}
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-sage-light/30">
                                    <div className="h-full w-full flex items-center justify-center text-2xl">
                                      {getProductEmoji(item.product.type || 'general')}
                                    </div>
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-charcoal">
                                        <h3 className="line-clamp-2">{item.product.name}</h3>
                                        <p className="ml-4">₹{(item.product.selling_price * item.quantity).toLocaleString()}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-charcoal/70">
                                        {typeof item.product.brand === 'string' ? item.product.brand : item.product.brand?.name}
                                      </p>
                                      {item.selectedVariant && (
                                        <p className="mt-1 text-sm text-charcoal/70">Variant: {item.selectedVariant}</p>
                                      )}
                                    </div>
                                    
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      {/* Quantity Controls */}
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                          className="p-1 rounded-lg hover:bg-sage-light/50 text-charcoal/70 hover:text-charcoal"
                                        >
                                          <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="px-3 py-1 bg-sage-light/30 rounded-lg text-charcoal font-medium min-w-[3rem] text-center">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                          className="p-1 rounded-lg hover:bg-sage-light/50 text-charcoal/70 hover:text-charcoal"
                                        >
                                          <Plus className="h-4 w-4" />
                                        </button>
                                      </div>

                                      {/* Remove Button */}
                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => removeItem(item.id)}
                                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t border-sage-light px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-charcoal">
                          <p>Subtotal</p>
                          <p>₹{totalPrice.toLocaleString()}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-charcoal/70">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                          <button
                            className="flex w-full items-center justify-center border text-base font-medium text-white shadow-sm transition-colors"
                            style={{
                              backgroundColor: 'green',
                              borderColor: 'green',
                              borderWidth: '1px',
                              borderRadius: '5px',
                              padding: '10px',
                              margin: '10px'
                            }}
                            onClick={() => {
                              // Handle checkout
                              console.log('Proceeding to checkout...')
                            }}
                          >
                            Proceed to Checkout
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-charcoal/70">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              className="font-medium text-saffron-500 hover:text-saffron-600"
                              onClick={toggleCart}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
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