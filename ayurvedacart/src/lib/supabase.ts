import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types'

// Use placeholder values for development if environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

// Only warn in development, don't throw error
if ((!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) && process.env.NODE_ENV === 'development') {
  console.warn('⚠️  Supabase environment variables not configured. Using placeholder values for development.')
  console.warn('   Please create a .env.local file with your Supabase credentials for full functionality.')
}

// Client for browser/client-side operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Admin client for server-side operations (use with caution)
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  if (!error) return null
  
  console.error('Supabase error:', error)
  
  // Return user-friendly message based on error code
  switch (error.code) {
    case '23505': // Unique violation
      return 'This item already exists'
    case '23503': // Foreign key violation
      return 'Referenced item not found'
    case 'PGRST116': // No rows returned
      return 'Item not found'
    case '42501': // Insufficient privilege
      return 'Access denied'
    default:
      return error.message || 'Something went wrong. Please try again.'
  }
}

// Type-safe query builders
export const productQueries = {
  all: () => ['products'] as const,
  lists: () => [...productQueries.all(), 'list'] as const,
  list: (filters: any) => [...productQueries.lists(), filters] as const,
  details: () => [...productQueries.all(), 'detail'] as const,
  detail: (slug: string) => [...productQueries.details(), slug] as const,
}

export const categoryQueries = {
  all: () => ['categories'] as const,
  lists: () => [...categoryQueries.all(), 'list'] as const,
  detail: (slug: string) => [...categoryQueries.all(), 'detail', slug] as const,
}

export const orderQueries = {
  all: () => ['orders'] as const,
  lists: () => [...orderQueries.all(), 'list'] as const,
  detail: (id: string) => [...orderQueries.all(), 'detail', id] as const,
  user: (userId: string) => [...orderQueries.all(), 'user', userId] as const,
}

// Helper functions for common operations
export const getUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signUpWithEmail = async (email: string, password: string, metadata?: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  return { data, error }
} 