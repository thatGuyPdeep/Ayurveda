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
  initialize: () => Promise<void>
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  
  signIn: async (email: string, password: string) => {
    set({ loading: true })
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        throw new Error('Supabase not configured. Please set up your environment variables.')
      }

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
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        throw new Error('Supabase not configured. Please set up your environment variables.')
      }

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
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        // Just clear local state if Supabase is not configured
        set({
          user: null,
          session: null,
          loading: false
        })
        return
      }

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
  setLoading: (loading) => set({ loading }),

  initialize: async () => {
    try {
      // Check if Supabase is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        console.warn('Supabase not configured, skipping auth initialization')
        set({ loading: false })
        return
      }

      // Get initial session
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error)
        set({ loading: false })
        return
      }

      set({
        user: session?.user ?? null,
        session: session,
        loading: false
      })

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        set({
          user: session?.user ?? null,
          session: session,
          loading: false
        })
      })
    } catch (error) {
      console.error('Error initializing auth:', error)
      set({ loading: false })
    }
  }
}))

// Helper hooks
export const useUser = () => useAuth((state) => state.user)
export const useSession = () => useAuth((state) => state.session)
export const useAuthLoading = () => useAuth((state) => state.loading) 