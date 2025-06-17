import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not properly configured')
}

// Client for browser/public operations
export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)

// Admin client for server-side operations (use carefully)
export const supabaseAdmin = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseServiceKey || 'placeholder-key', 
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Helper function to check if Supabase is properly configured
export function isSupabaseConfigured() {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://placeholder.supabase.co')
}

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
  if (!isSupabaseConfigured()) {
    return { user: null, error: new Error('Supabase not configured') }
  }
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const signOut = async () => {
  if (!isSupabaseConfigured()) {
    return { error: null }
  }
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const signInWithEmail = async (email: string, password: string) => {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase not configured') }
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signUpWithEmail = async (email: string, password: string, metadata?: any) => {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase not configured') }
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  return { data, error }
} 