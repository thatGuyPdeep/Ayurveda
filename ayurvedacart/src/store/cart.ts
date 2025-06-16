import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

interface CartItem {
  product_id: string
  variant_id?: string
  quantity: number
  product: Product
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            item => item.product_id === newItem.product_id && 
                   item.variant_id === newItem.variant_id
          )
          
          if (existingItemIndex >= 0) {
            // Update existing item
            const updatedItems = [...state.items]
            const existingItem = updatedItems[existingItemIndex]
            if (existingItem) {
              existingItem.quantity += newItem.quantity
            }
            return { items: updatedItems }
          } else {
            // Add new item
            return { items: [...state.items, newItem] }
          }
        })
      },
      
      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            item => !(item.product_id === productId && item.variant_id === variantId)
          )
        }))
      },
      
      updateQuantity: (productId, quantity, variantId) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                item => !(item.product_id === productId && item.variant_id === variantId)
              )
            }
          }
          
          return {
            items: state.items.map(item =>
              item.product_id === productId && item.variant_id === variantId
                ? { ...item, quantity }
                : item
            )
          }
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false })
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)

// Custom hooks for computed values
export const useCartItemCount = () => {
  return useCart((state) => 
    state.items.reduce((total, item) => total + item.quantity, 0)
  )
}

export const useCartSubtotal = () => {
  return useCart((state) => 
    state.items.reduce(
      (total, item) => total + (item.product.selling_price * item.quantity),
      0
    )
  )
}

export const useCartTotalItems = () => {
  return useCart((state) => state.items.length)
} 