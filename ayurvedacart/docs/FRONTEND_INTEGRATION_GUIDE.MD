# AyurvedaCart - Frontend Integration Guide

## Architecture Overview

This guide outlines the frontend architecture for AyurvedaCart using Next.js 14 with the App Router, React 18, TypeScript, and Tailwind CSS. The architecture follows modern React patterns with server-side rendering, optimal performance, and excellent user experience.

## Technology Stack

### Core Frontend Technologies
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.4+
- **Component Library**: Headless UI + Custom Components
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod
- **Authentication**: Supabase Auth + React Context
- **Icons**: Lucide React + Custom Icons
- **Animations**: Framer Motion
- **Image Optimization**: Next.js Image Component

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library + Playwright
- **Type Checking**: TypeScript
- **Bundle Analyzer**: @next/bundle-analyzer

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route groups
│   │   ├── login/
│   │   └── register/
│   ├── (shop)/
│   │   ├── products/
│   │   ├── categories/
│   │   └── cart/
│   ├── account/
│   ├── admin/
│   ├── api/                      # API routes
│   ├── globals.css
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── forms/                    # Form components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── product/                  # Product-specific components
│   └── cart/                     # Cart-specific components
├── lib/                          # Utility functions and configurations
│   ├── utils.ts                  # General utilities
│   ├── validations.ts            # Zod schemas
│   ├── constants.ts              # App constants
│   └── hooks/                    # Custom hooks
├── store/                        # State management
│   ├── auth.ts                   # Auth store
│   ├── cart.ts                   # Cart store
│   └── index.ts                  # Store configuration
├── styles/                       # Global styles
├── types/                        # TypeScript type definitions
└── __tests__/                    # Test files
```

## Component Architecture

### Base UI Components

#### Button Component
```typescript
// components/ui/Button.tsx
import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
```

#### Input Component
```typescript
// components/ui/Input.tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
```

### Product Components

#### Product Card Component
```typescript
// components/product/ProductCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useCart } from '@/store/cart'
import { useWishlist } from '@/store/wishlist'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      product_id: product.id,
      quantity: 1,
      product
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  const discountPercentage = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  return (
    <Link href={`/products/${product.slug}`}>
      <div className={cn(
        'group relative rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md',
        className
      )}>
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.images?.[0]?.url || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute left-2 top-2 bg-red-500 text-white">
              -{discountPercentage}%
            </Badge>
          )}

          {/* Out of Stock Badge */}
          {product.stock_quantity <= 0 && (
            <Badge className="absolute right-2 top-2 bg-gray-500 text-white">
              Out of Stock
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2 h-8 w-8 bg-white/80 hover:bg-white"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={cn(
                'h-4 w-4',
                isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
              )}
            />
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-muted-foreground mb-1">
              {product.brand.name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary">
            {product.name}
          </h3>

          {/* Rating */}
          {product.average_rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-3 w-3',
                      i < Math.round(product.average_rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.review_count})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.compare_at_price && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.compare_at_price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock_quantity <= 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </Link>
  )
}
```

#### Product Quick View Modal
```typescript
// components/product/ProductQuickView.tsx
import { useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useCart } from '@/store/cart'
import type { Product } from '@/types/product'

interface ProductQuickViewProps {
  product: Product | null
  open: boolean
  onClose: () => void
}

export function ProductQuickView({ product, open, onClose }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()

  if (!product) return null

  const handleAddToCart = () => {
    addItem({
      product_id: product.id,
      quantity,
      product
    })
    onClose()
  }

  const incrementQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(prev => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Product Quick View</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={product.images?.[selectedImage]?.url || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      'relative aspect-square w-16 overflow-hidden rounded border-2',
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    )}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            {product.brand && (
              <Badge variant="secondary">{product.brand.name}</Badge>
            )}

            <h2 className="text-2xl font-bold">{product.name}</h2>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              {product.compare_at_price && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.compare_at_price.toLocaleString()}
                </span>
              )}
            </div>

            {product.short_description && (
              <p className="text-muted-foreground">{product.short_description}</p>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock_quantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {product.stock_quantity} items available
              </p>
            </div>

            {/* Add to Cart */}
            <Button
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
            >
              Add to Cart - ₹{(product.price * quantity).toLocaleString()}
            </Button>

            {/* Key Benefits */}
            {product.key_benefits && (
              <div className="space-y-2">
                <h4 className="font-medium">Key Benefits</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {product.key_benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

## State Management

### Cart Store with Zustand
```typescript
// store/cart.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/product'

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
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  
  // Computed values
  itemCount: number
  subtotal: number
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
            updatedItems[existingItemIndex].quantity += newItem.quantity
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
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.product_id === productId && item.variant_id === variantId
              ? { ...item, quantity }
              : item
          )
        }))
      },
      
      clearCart: () => set({ items: [] }),
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      get itemCount() {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      get subtotal() {
        return get().items.reduce(
          (total, item) => total + (item.product.price * item.quantity),
          0
        )
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)
```

### Auth Store
```typescript
// store/auth.ts
import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthStore {
  user: User | null
  session: Session | null
  loading: boolean
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signOut: () => Promise<void>
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  
  signIn: async (email: string, password: string) => {
    set({ loading: true })
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      set({
        user: data.user,
        session: data.session,
        loading: false
      })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
  
  signUp: async (email: string, password: string, userData: any) => {
    set({ loading: true })
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      
      if (error) throw error
      
      set({
        user: data.user,
        session: data.session,
        loading: false
      })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
  
  signOut: async () => {
    set({ loading: true })
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      set({
        user: null,
        session: null,
        loading: false
      })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
  
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading })
}))
```

## Custom Hooks

### Data Fetching Hooks
```typescript
// lib/hooks/useProducts.ts
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { ProductService } from '@/lib/services/product'

const productService = new ProductService()

export function useProducts(filters: any = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}

export function useInfiniteProducts(filters: any = {}) {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', filters],
    queryFn: ({ pageParam = 0 }) =>
      productService.getProducts({ ...filters, offset: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.products.length < (filters.limit || 20)) {
        return undefined
      }
      return allPages.length * (filters.limit || 20)
    },
    staleTime: 5 * 60 * 1000,
  })
}
```

### Wishlist Hook
```typescript
// lib/hooks/useWishlist.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/product'

interface WishlistStore {
  items: Product[]
  
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          if (!state.items.find(item => item.id === product.id)) {
            return { items: [...state.items, product] }
          }
          return state
        })
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },
      
      toggleWishlist: (product) => {
        const { items } = get()
        if (items.find(item => item.id === product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },
      
      isInWishlist: (productId) => {
        return !!get().items.find(item => item.id === productId)
      },
      
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage'
    }
  )
)
```

## Form Handling

### Login Form Component
```typescript
// components/forms/LoginForm.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/store/auth'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await signIn(data.email, data.password)
      toast.success('Welcome back!')
      router.push('/account')
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      
      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      
      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
        disabled={isLoading}
      >
        Sign In
      </Button>
    </form>
  )
}
```

## Layout Components

### Header Component
```typescript
// components/layout/Header.tsx
import { useState } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingCart, Menu, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/store/auth'
import { useCart } from '@/store/cart'
import { useWishlist } from '@/store/wishlist'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()
  const { itemCount, openCart } = useCart()
  const { items: wishlistItems } = useWishlist()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl">AyurvedaCart</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={openCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <Link href={user ? "/account" : "/login"}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-3">
            <Link href="/categories" className="text-sm font-medium hover:text-primary">
              All Categories
            </Link>
            <Link href="/categories/classical-medicines" className="text-sm font-medium hover:text-primary">
              Classical Medicines
            </Link>
            <Link href="/categories/personal-care" className="text-sm font-medium hover:text-primary">
              Personal Care
            </Link>
            <Link href="/categories/health-supplements" className="text-sm font-medium hover:text-primary">
              Supplements
            </Link>
            <Link href="/consultations" className="text-sm font-medium hover:text-primary text-primary">
              Consultation
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
```

## Performance Optimization

### Image Optimization
```typescript
// components/OptimizedImage.tsx
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!error ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'duration-700 ease-in-out',
            isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0'
          )}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setError(true)
            setIsLoading(false)
          }}
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-100 text-gray-400">
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  )
}
```

### Lazy Loading Components
```typescript
// components/LazyComponents.tsx
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/Skeleton'

// Lazy load heavy components
export const ProductQuickView = dynamic(
  () => import('./product/ProductQuickView').then(mod => ({ default: mod.ProductQuickView })),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false
  }
)

export const ConsultationBooking = dynamic(
  () => import('./consultation/BookingModal').then(mod => ({ default: mod.BookingModal })),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false
  }
)
```

## Error Handling

### Error Boundary Component
```typescript
// components/ErrorBoundary.tsx
'use client'

import { Component, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Send to monitoring service
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            We're sorry, but something unexpected happened.
          </p>
          <Button
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            Try again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
```

## Testing

### Component Testing Example
```typescript
// __tests__/components/ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '@/components/product/ProductCard'
import { mockProduct } from '@/lib/test-utils'

// Mock the cart store
jest.mock('@/store/cart', () => ({
  useCart: () => ({
    addItem: jest.fn()
  })
}))

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
    expect(screen.getByText(`₹${mockProduct.price.toLocaleString()}`)).toBeInTheDocument()
  })

  it('handles add to cart action', () => {
    const { addItem } = require('@/store/cart').useCart()
    render(<ProductCard product={mockProduct} />)
    
    const addToCartButton = screen.getByText('Add to Cart')
    fireEvent.click(addToCartButton)
    
    expect(addItem).toHaveBeenCalledWith({
      product_id: mockProduct.id,
      quantity: 1,
      product: mockProduct
    })
  })
})
```

This comprehensive frontend integration guide provides a solid foundation for building a modern, performant, and maintainable React application with Next.js, ensuring optimal user experience and developer productivity. 