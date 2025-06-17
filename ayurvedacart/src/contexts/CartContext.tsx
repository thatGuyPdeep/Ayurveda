'use client'

import { createContext, useContext, ReactNode } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedVariant?: string
  addedAt: Date
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number, variant?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemCount: (productId: string) => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product: Product, quantity = 1, variant?: string) => {
        const existingItemIndex = get().items.findIndex(
          item => item.product.id === product.id && item.selectedVariant === variant
        )
        
        if (existingItemIndex >= 0) {
          // Update existing item quantity
          set(state => ({
            items: state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          }))
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${variant || 'default'}-${Date.now()}`,
            product,
            quantity,
            addedAt: new Date(),
            ...(variant && { selectedVariant: variant })
          }
          set(state => ({ items: [...state.items, newItem] }))
        }
      },
      
      removeItem: (itemId: string) => {
        set(state => ({
          items: state.items.filter(item => item.id !== itemId)
        }))
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }))
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.selling_price * item.quantity),
          0
        )
      },
      
      getItemCount: (productId: string) => {
        return get().items
          .filter(item => item.product.id === productId)
          .reduce((total, item) => total + item.quantity, 0)
      }
    }),
    {
      name: 'ayurveda-cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)

// Context for React components that need cart functionality
const CartContext = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <CartContext.Provider value={null}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useCartStore()
} 