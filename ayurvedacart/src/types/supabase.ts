export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          phone?: string
          first_name: string
          last_name: string
          date_of_birth?: string
          gender?: 'male' | 'female' | 'other'
          profile_picture_url?: string
          email_verified: boolean
          phone_verified: boolean
          is_active: boolean
          last_login_at?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          phone?: string
          first_name: string
          last_name: string
          date_of_birth?: string
          gender?: 'male' | 'female' | 'other'
          profile_picture_url?: string
          email_verified?: boolean
          phone_verified?: boolean
          is_active?: boolean
          last_login_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string
          gender?: 'male' | 'female' | 'other'
          profile_picture_url?: string
          email_verified?: boolean
          phone_verified?: boolean
          is_active?: boolean
          last_login_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          sku: string
          name: string
          slug: string
          short_description?: string
          description?: string
          brand_id?: string
          type: string
          form?: string
          base_price: number
          selling_price: number
          discount_percentage: number
          tax_rate: number
          weight?: number
          dimensions?: any
          track_inventory: boolean
          stock_quantity: number
          low_stock_threshold: number
          dosage_form?: string
          pack_size?: string
          ingredients?: any[]
          indications?: any[]
          contraindications?: any[]
          dosage_instructions?: string
          meta_title?: string
          meta_description?: string
          search_keywords?: string
          status: 'draft' | 'active' | 'inactive' | 'discontinued'
          is_featured: boolean
          is_prescription_required: boolean
          average_rating?: number
          review_count?: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          name: string
          slug: string
          short_description?: string
          description?: string
          brand_id?: string
          type: string
          form?: string
          base_price: number
          selling_price: number
          discount_percentage?: number
          tax_rate?: number
          weight?: number
          dimensions?: any
          track_inventory?: boolean
          stock_quantity?: number
          low_stock_threshold?: number
          dosage_form?: string
          pack_size?: string
          ingredients?: any[]
          indications?: any[]
          contraindications?: any[]
          dosage_instructions?: string
          meta_title?: string
          meta_description?: string
          search_keywords?: string
          status?: 'draft' | 'active' | 'inactive' | 'discontinued'
          is_featured?: boolean
          is_prescription_required?: boolean
          average_rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          name?: string
          slug?: string
          short_description?: string
          description?: string
          brand_id?: string
          type?: string
          form?: string
          base_price?: number
          selling_price?: number
          discount_percentage?: number
          tax_rate?: number
          weight?: number
          dimensions?: any
          track_inventory?: boolean
          stock_quantity?: number
          low_stock_threshold?: number
          dosage_form?: string
          pack_size?: string
          ingredients?: any[]
          indications?: any[]
          contraindications?: any[]
          dosage_instructions?: string
          meta_title?: string
          meta_description?: string
          search_keywords?: string
          status?: 'draft' | 'active' | 'inactive' | 'discontinued'
          is_featured?: boolean
          is_prescription_required?: boolean
          average_rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description?: string
          parent_id?: string
          image_url?: string
          meta_title?: string
          meta_description?: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string
          parent_id?: string
          image_url?: string
          meta_title?: string
          meta_description?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          parent_id?: string
          image_url?: string
          meta_title?: string
          meta_description?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          slug: string
          description?: string
          logo_url?: string
          website_url?: string
          established_year?: number
          country?: string
          certifications?: any[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string
          logo_url?: string
          website_url?: string
          established_year?: number
          country?: string
          certifications?: any[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          logo_url?: string
          website_url?: string
          established_year?: number
          country?: string
          certifications?: any[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          alt_text?: string
          sort_order: number
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          alt_text?: string
          sort_order?: number
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          alt_text?: string
          sort_order?: number
          is_primary?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id?: string
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
          subtotal: number
          tax_amount: number
          shipping_amount: number
          discount_amount: number
          total_amount: number
          shipping_address: any
          billing_address?: any
          currency: string
          exchange_rate: number
          shipping_method?: string
          estimated_delivery?: string
          notes?: string
          customer_notes?: string
          ordered_at: string
          confirmed_at?: string
          shipped_at?: string
          delivered_at?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          user_id?: string
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
          subtotal: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount: number
          shipping_address: any
          billing_address?: any
          currency?: string
          exchange_rate?: number
          shipping_method?: string
          estimated_delivery?: string
          notes?: string
          customer_notes?: string
          ordered_at?: string
          confirmed_at?: string
          shipped_at?: string
          delivered_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount?: number
          shipping_address?: any
          billing_address?: any
          currency?: string
          exchange_rate?: number
          shipping_method?: string
          estimated_delivery?: string
          notes?: string
          customer_notes?: string
          ordered_at?: string
          confirmed_at?: string
          shipped_at?: string
          delivered_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id?: string
          product_name: string
          product_sku: string
          unit_price: number
          quantity: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string
          product_name: string
          product_sku: string
          unit_price: number
          quantity: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          product_name?: string
          product_sku?: string
          unit_price?: number
          quantity?: number
          total_price?: number
          created_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          payment_gateway: 'razorpay' | 'stripe' | 'upi'
          gateway_order_id?: string
          gateway_payment_id?: string
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          payment_gateway: 'razorpay' | 'stripe' | 'upi'
          gateway_order_id?: string
          gateway_payment_id?: string
          amount: number
          currency: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          payment_gateway?: 'razorpay' | 'stripe' | 'upi'
          gateway_order_id?: string
          gateway_payment_id?: string
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 