# AyurvedaCart - Supabase Integration Plan

## Overview

This document outlines the comprehensive integration plan for using Supabase as the backend-as-a-service platform for AyurvedaCart. Supabase provides PostgreSQL database, authentication, real-time subscriptions, storage, and serverless functions - all essential components for a modern e-commerce platform.

## Supabase Architecture Overview

### Core Services Utilized
1. **Database**: PostgreSQL with Row Level Security (RLS)
2. **Authentication**: Built-in auth with multiple providers
3. **Real-time**: WebSocket connections for live updates
4. **Storage**: File storage for images and documents
5. **Edge Functions**: Serverless Deno functions for business logic
6. **API**: Auto-generated REST and GraphQL APIs

### Project Structure
```
AyurvedaCart Supabase Project
├── Database Schema (PostgreSQL)
├── Authentication Configuration
├── Storage Buckets
├── Edge Functions
├── Real-time Subscriptions
└── API Endpoints
```

## Database Integration

### Connection Configuration
```typescript
// supabase/config.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Server-side Supabase client (with service role)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
```

### Database Types Generation
```bash
# Generate TypeScript types from Supabase schema
npx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > types/supabase.ts
```

### Type Definitions
```typescript
// types/database.ts
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          sku: string
          name: string
          slug: string
          description: string
          base_price: number
          selling_price: number
          stock_quantity: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          name: string
          slug: string
          description?: string
          base_price: number
          selling_price: number
          stock_quantity?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          name?: string
          slug?: string
          description?: string
          base_price?: number
          selling_price?: number
          stock_quantity?: number
          status?: string
          updated_at?: string
        }
      }
      // ... other table types
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
```

## Authentication Integration

### Authentication Configuration
```sql
-- Enable additional auth providers in Supabase Dashboard
-- Google OAuth
-- Facebook OAuth
-- Phone/SMS authentication
-- Magic link authentication
```

### Auth Helper Functions
```typescript
// lib/auth.ts
import { supabase } from '@/supabase/config'
import type { User, Session } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export class AuthService {
  // Email/Password registration
  static async signUp(email: string, password: string, userData: {
    first_name: string
    last_name: string
    phone?: string
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    if (error) throw error
    return data
  }

  // Email/Password sign in
  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  }

  // Social authentication
  static async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) throw error
    return data
  }

  // Phone authentication
  static async signInWithPhone(phone: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        channel: 'sms'
      }
    })
    
    if (error) throw error
    return data
  }

  // Verify OTP
  static async verifyOtp(phone: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    })
    
    if (error) throw error
    return data
  }

  // Sign out
  static async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  // Reset password
  static async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    
    if (error) throw error
    return data
  }

  // Update password
  static async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password
    })
    
    if (error) throw error
    return data
  }

  // Get current session
  static async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  }

  // Get current user
  static async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  }
}
```

### Auth Context Provider
```typescript
// contexts/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/supabase/config'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await AuthService.signIn(email, password)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true)
    try {
      await AuthService.signUp(email, password, userData)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await AuthService.signOut()
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

## Data Access Layer

### Base Repository Pattern
```typescript
// lib/repositories/base.ts
import { supabase } from '@/supabase/config'
import type { Database } from '@/types/supabase'

export abstract class BaseRepository<T extends keyof Database['public']['Tables']> {
  protected tableName: T

  constructor(tableName: T) {
    this.tableName = tableName
  }

  async findById(id: string) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async findMany(options?: {
    limit?: number
    offset?: number
    orderBy?: { column: string; ascending?: boolean }
    filters?: Record<string, any>
  }) {
    let query = supabase.from(this.tableName).select('*')

    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }

    if (options?.orderBy) {
      query = query.order(options.orderBy.column, { 
        ascending: options.orderBy.ascending ?? true 
      })
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, (options.offset + (options.limit || 10)) - 1)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  }

  async create(data: Database['public']['Tables'][T]['Insert']) {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result
  }

  async update(id: string, data: Database['public']['Tables'][T]['Update']) {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return result
  }

  async delete(id: string) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
```

### Product Repository
```typescript
// lib/repositories/products.ts
import { BaseRepository } from './base'
import { supabase } from '@/supabase/config'

export class ProductRepository extends BaseRepository<'products'> {
  constructor() {
    super('products')
  }

  async findBySlug(slug: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        categories:product_categories(
          category:categories(*)
        ),
        images:product_images(*),
        variants:product_variants(*)
      `)
      .eq('slug', slug)
      .eq('status', 'active')
      .single()

    if (error) throw error
    return data
  }

  async findByCategory(categorySlug: string, options?: {
    limit?: number
    offset?: number
    sortBy?: string
    priceRange?: { min: number; max: number }
    brandIds?: string[]
  }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        categories:product_categories(
          category:categories(slug)
        ),
        images:product_images(*)
      `)
      .eq('status', 'active')

    // Filter by category
    query = query.eq('product_categories.categories.slug', categorySlug)

    // Price range filter
    if (options?.priceRange) {
      query = query
        .gte('selling_price', options.priceRange.min)
        .lte('selling_price', options.priceRange.max)
    }

    // Brand filter
    if (options?.brandIds?.length) {
      query = query.in('brand_id', options.brandIds)
    }

    // Sorting
    switch (options?.sortBy) {
      case 'price_low_to_high':
        query = query.order('selling_price', { ascending: true })
        break
      case 'price_high_to_low':
        query = query.order('selling_price', { ascending: false })
        break
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      default:
        query = query.order('name', { ascending: true })
    }

    // Pagination
    if (options?.limit) {
      query = query.limit(options.limit)
    }
    if (options?.offset) {
      query = query.range(options.offset, (options.offset + (options.limit || 20)) - 1)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  }

  async search(searchTerm: string, options?: {
    limit?: number
    offset?: number
    categoryId?: string
  }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        images:product_images(*)
      `)
      .eq('status', 'active')
      .textSearch('search_vector', searchTerm)

    if (options?.categoryId) {
      query = query.eq('product_categories.category_id', options.categoryId)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, (options.offset + (options.limit || 20)) - 1)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  }

  async getFeatured(limit = 10) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        images:product_images(*)
      `)
      .eq('status', 'active')
      .eq('is_featured', true)
      .limit(limit)

    if (error) throw error
    return data
  }
}
```

### Order Repository
```typescript
// lib/repositories/orders.ts
import { BaseRepository } from './base'
import { supabase } from '@/supabase/config'

export class OrderRepository extends BaseRepository<'orders'> {
  constructor() {
    super('orders')
  }

  async createOrder(orderData: {
    user_id: string
    items: Array<{
      product_id: string
      variant_id?: string
      quantity: number
      unit_price: number
    }>
    shipping_address: any
    billing_address?: any
    subtotal: number
    tax_amount: number
    shipping_amount: number
    total_amount: number
  }) {
    // Start transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        order_number: this.generateOrderNumber(),
        subtotal: orderData.subtotal,
        tax_amount: orderData.tax_amount,
        shipping_amount: orderData.shipping_amount,
        total_amount: orderData.total_amount,
        shipping_address: orderData.shipping_address,
        billing_address: orderData.billing_address,
        status: 'pending'
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Insert order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.quantity * item.unit_price,
      product_name: '', // Will be populated by trigger
      product_sku: ''   // Will be populated by trigger
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return order
  }

  async findByUser(userId: string, options?: { limit?: number; offset?: number }) {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          product:products(name, images:product_images(*))
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, (options.offset + (options.limit || 10)) - 1)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  }

  async updateStatus(orderId: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status,
        ...(status === 'confirmed' && { confirmed_at: new Date().toISOString() }),
        ...(status === 'shipped' && { shipped_at: new Date().toISOString() }),
        ...(status === 'delivered' && { delivered_at: new Date().toISOString() })
      })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  private generateOrderNumber(): string {
    return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  }
}
```

## Real-time Features

### Real-time Order Tracking
```typescript
// hooks/useOrderTracking.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/supabase/config'
import type { Tables } from '@/types/supabase'

export const useOrderTracking = (orderId: string) => {
  const [order, setOrder] = useState<Tables<'orders'> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(
            *,
            product:products(name, images:product_images(*))
          )
        `)
        .eq('id', orderId)
        .single()

      if (!error) {
        setOrder(data)
      }
      setLoading(false)
    }

    fetchOrder()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`
        },
        (payload) => {
          setOrder(payload.new as Tables<'orders'>)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [orderId])

  return { order, loading }
}
```

### Real-time Inventory Updates
```typescript
// hooks/useInventoryTracking.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/supabase/config'

export const useInventoryTracking = (productIds: string[]) => {
  const [inventory, setInventory] = useState<Record<string, number>>({})

  useEffect(() => {
    // Initial fetch
    const fetchInventory = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, stock_quantity')
        .in('id', productIds)

      if (!error) {
        const inventoryMap = data.reduce((acc, product) => {
          acc[product.id] = product.stock_quantity
          return acc
        }, {} as Record<string, number>)
        setInventory(inventoryMap)
      }
    }

    if (productIds.length > 0) {
      fetchInventory()

      // Subscribe to inventory changes
      const subscription = supabase
        .channel('inventory-updates')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'products',
            filter: `id=in.(${productIds.join(',')})`
          },
          (payload) => {
            const updatedProduct = payload.new as Tables<'products'>
            setInventory(prev => ({
              ...prev,
              [updatedProduct.id]: updatedProduct.stock_quantity
            }))
          }
        )
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [productIds])

  return inventory
}
```

## Storage Integration

### File Upload Service
```typescript
// lib/storage.ts
import { supabase } from '@/supabase/config'

export class StorageService {
  static async uploadProductImage(file: File, productId: string): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${productId}/${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    return publicUrl
  }

  static async uploadUserAvatar(file: File, userId: string): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `avatars/${userId}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('user-content')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('user-content')
      .getPublicUrl(fileName)

    return publicUrl
  }

  static async uploadDocument(file: File, folder: string): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${file.name}`
    
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(fileName, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName)

    return publicUrl
  }

  static async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) throw error
  }
}
```

### Storage Bucket Configuration
```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
('product-images', 'product-images', true),
('user-content', 'user-content', true),
('documents', 'documents', false);

-- Storage policies
CREATE POLICY "Public product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Upload product images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'product-images' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can upload own content" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'user-content' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## Edge Functions

### Payment Processing Function
```typescript
// supabase/functions/process-payment/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { orderId, paymentMethod } = await req.json()

    // Verify order exists and is pending
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('status', 'pending')
      .single()

    if (orderError || !order) {
      throw new Error('Order not found or already processed')
    }

    // Process payment with Razorpay/Stripe
    const paymentResult = await processPaymentWithGateway(order, paymentMethod)

    // Update order status
    await supabaseClient
      .from('orders')
      .update({
        status: 'confirmed',
        payment_status: 'paid',
        confirmed_at: new Date().toISOString()
      })
      .eq('id', orderId)

    return new Response(
      JSON.stringify({ success: true, paymentResult }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function processPaymentWithGateway(order: any, paymentMethod: string) {
  // Implement payment gateway integration
  // This is a placeholder for actual payment processing
  return {
    transactionId: `txn_${Date.now()}`,
    status: 'completed'
  }
}
```

### Email Notification Function
```typescript
// supabase/functions/send-email/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { to, subject, template, data } = await req.json()

  // Send email using your preferred service (SendGrid, Resend, etc.)
  const emailResult = await sendEmail({
    to,
    subject,
    html: renderTemplate(template, data)
  })

  return new Response(
    JSON.stringify({ success: true, emailResult }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})

function renderTemplate(template: string, data: any): string {
  // Template rendering logic
  return template.replace(/{{(\w+)}}/g, (match, key) => data[key] || match)
}

async function sendEmail(params: { to: string; subject: string; html: string }) {
  // Email service integration
  return { messageId: 'msg_123' }
}
```

## API Integration Patterns

### Custom Hooks for Data Fetching
```typescript
// hooks/useProducts.ts
import { useState, useEffect } from 'react'
import { ProductRepository } from '@/lib/repositories/products'

export const useProducts = (categorySlug?: string, options?: any) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const productRepo = new ProductRepository()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = categorySlug 
          ? await productRepo.findByCategory(categorySlug, options)
          : await productRepo.getFeatured()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categorySlug, JSON.stringify(options)])

  return { products, loading, error }
}
```

### React Query Integration
```typescript
// lib/queries/products.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductRepository } from '@/lib/repositories/products'

const productRepo = new ProductRepository()

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productRepo.findBySlug(slug),
    enabled: !!slug
  })
}

export const useProductsByCategory = (categorySlug: string, options?: any) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug, options],
    queryFn: () => productRepo.findByCategory(categorySlug, options),
    enabled: !!categorySlug
  })
}

export const useSearchProducts = (searchTerm: string) => {
  return useQuery({
    queryKey: ['products', 'search', searchTerm],
    queryFn: () => productRepo.search(searchTerm),
    enabled: !!searchTerm && searchTerm.length > 2
  })
}
```

## Security Implementation

### Row Level Security Policies
```sql
-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- Orders security
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Cart security
CREATE POLICY "Users can manage own cart" ON cart_items
  FOR ALL USING (user_id = auth.uid());

-- Public read access for products
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (status = 'active');

-- Admin policies
CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```

### API Security Middleware
```typescript
// middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Check admin role
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single()

    if (userRole?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Protect user routes
  if (req.nextUrl.pathname.startsWith('/account')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*']
}
```

## Performance Optimization

### Database Optimization
```sql
-- Create indexes for better query performance
CREATE INDEX CONCURRENTLY idx_products_search_gin 
ON products USING GIN (to_tsvector('english', name || ' ' || description));

CREATE INDEX CONCURRENTLY idx_orders_user_status 
ON orders(user_id, status) WHERE status != 'cancelled';

CREATE INDEX CONCURRENTLY idx_product_categories_lookup 
ON product_categories(category_id, product_id);

-- Materialized views for complex queries
CREATE MATERIALIZED VIEW product_stats AS
SELECT 
  p.id,
  p.name,
  COALESCE(AVG(pr.rating), 0) as average_rating,
  COUNT(pr.id) as review_count,
  p.stock_quantity,
  p.selling_price
FROM products p
LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_approved = true
GROUP BY p.id, p.name, p.stock_quantity, p.selling_price;

-- Refresh materialized view
CREATE OR REPLACE FUNCTION refresh_product_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY product_stats;
END;
$$ LANGUAGE plpgsql;
```

### Caching Strategy
```typescript
// lib/cache.ts
import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

export class CacheService {
  static async get<T>(key: string): Promise<T | null> {
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  static async set(key: string, value: any, ttl = 3600): Promise<void> {
    await redis.setex(key, ttl, JSON.stringify(value))
  }

  static async del(key: string): Promise<void> {
    await redis.del(key)
  }

  static async invalidatePattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  }
}

// Usage in repositories
export class CachedProductRepository extends ProductRepository {
  async findBySlug(slug: string) {
    const cacheKey = `product:${slug}`
    const cached = await CacheService.get(cacheKey)
    
    if (cached) {
      return cached
    }

    const product = await super.findBySlug(slug)
    await CacheService.set(cacheKey, product, 1800) // 30 minutes
    
    return product
  }
}
```

## Monitoring and Analytics

### Database Monitoring
```sql
-- Performance monitoring queries
SELECT 
  schemaname,
  tablename,
  seq_scan,
  seq_tup_read,
  idx_scan,
  idx_tup_fetch
FROM pg_stat_user_tables
ORDER BY seq_scan DESC;

-- Slow query identification (enable pg_stat_statements)
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  rows
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

### Error Tracking
```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs'

export class MonitoringService {
  static captureException(error: Error, context?: any) {
    Sentry.captureException(error, {
      tags: context?.tags,
      extra: context?.extra,
      user: context?.user
    })
  }

  static captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    Sentry.captureMessage(message, level)
  }

  static setUser(user: { id: string; email?: string }) {
    Sentry.setUser(user)
  }
}

// Usage in repositories
export class MonitoredRepository<T extends keyof Database['public']['Tables']> extends BaseRepository<T> {
  async findById(id: string) {
    try {
      return await super.findById(id)
    } catch (error) {
      MonitoringService.captureException(error as Error, {
        tags: { operation: 'findById', table: this.tableName },
        extra: { id }
      })
      throw error
    }
  }
}
```

This comprehensive Supabase integration plan provides a solid foundation for building a scalable, secure, and feature-rich e-commerce platform with real-time capabilities, robust authentication, and optimized performance. 