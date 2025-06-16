// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at'>>
      }
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Category, 'id' | 'created_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Order, 'id' | 'created_at'>>
      }
      cart_items: {
        Row: CartItem
        Insert: Omit<CartItem, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<CartItem, 'id' | 'created_at'>>
      }
    }
  }
}

// User Types
export interface User {
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

export interface UserProfile {
  id: string
  user_id: string
  preferred_language: string
  timezone: string
  communication_preferences: Record<string, any>
  health_profile: Record<string, any>
  marketing_consent: boolean
  newsletter_subscription: boolean
  created_at: string
  updated_at: string
}

export interface UserAddress {
  id: string
  user_id: string
  type: 'home' | 'office' | 'other'
  first_name: string
  last_name: string
  phone?: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

// Product Types
export interface Product {
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
  dimensions?: Record<string, any>
  track_inventory: boolean
  stock_quantity: number
  low_stock_threshold: number
  dosage_form?: string
  pack_size?: string
  ingredients: string[]
  indications: string[]
  contraindications: string[]
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
  
  // Relations
  brand?: Brand
  categories?: Category[]
  images?: ProductImage[]
  variants?: ProductVariant[]
  reviews?: ProductReview[]
}

export interface Brand {
  id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  website_url?: string
  established_year?: number
  country?: string
  certifications: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
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
  
  // Relations
  children?: Category[]
  parent?: Category
  products?: Product[]
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  alt_text?: string
  sort_order: number
  is_primary: boolean
  created_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  sku: string
  name: string
  price: number
  compare_at_price?: number
  stock_quantity: number
  variant_options: Record<string, any>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductReview {
  id: string
  product_id: string
  user_id?: string
  order_item_id?: string
  rating: number
  title?: string
  review_text?: string
  is_verified: boolean
  is_approved: boolean
  moderated_at?: string
  moderated_by?: string
  helpful_count: number
  unhelpful_count: number
  created_at: string
  updated_at: string
  
  // Relations
  user?: Pick<User, 'id' | 'first_name' | 'last_name'>
}

// Order Types
export interface Order {
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
  shipping_address: Record<string, any>
  billing_address?: Record<string, any>
  currency: string
  exchange_rate: number
  shipping_method?: string
  estimated_delivery?: string
  distribution_center_id?: string
  notes?: string
  customer_notes?: string
  ordered_at: string
  confirmed_at?: string
  shipped_at?: string
  delivered_at?: string
  created_at: string
  updated_at: string
  
  // Relations
  order_items?: OrderItem[]
  user?: User
}

export interface OrderItem {
  id: string
  order_id: string
  product_id?: string
  variant_id?: string
  product_name: string
  product_sku: string
  unit_price: number
  quantity: number
  total_price: number
  created_at: string
  
  // Relations
  product?: Product
  variant?: ProductVariant
}

// Cart Types
export interface CartItem {
  id: string
  user_id: string
  product_id: string
  variant_id?: string
  quantity: number
  created_at: string
  updated_at: string
  
  // Relations
  product?: Product
  variant?: ProductVariant
}

// Consultation Types
export interface Doctor {
  id: string
  user_id: string
  license_number: string
  specialization: string
  qualification: string
  experience_years: number
  bio?: string
  languages: string[]
  consultation_fee: number
  availability: Record<string, any>
  is_available: boolean
  total_consultations: number
  average_rating: number
  verification_status: string
  verified_at?: string
  verified_by?: string
  created_at: string
  updated_at: string
  
  // Relations
  user?: User
}

export interface Consultation {
  id: string
  patient_id?: string
  doctor_id?: string
  scheduled_at: string
  duration_minutes: number
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
  fee_amount: number
  payment_status: string
  chief_complaint?: string
  symptoms: string[]
  diagnosis?: string
  prescription: Record<string, any>[]
  follow_up_date?: string
  meeting_url?: string
  meeting_id?: string
  notes?: string
  created_at: string
  updated_at: string
  
  // Relations
  patient?: User
  doctor?: Doctor
}

// Payment Types
export interface Payment {
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

// Coupon Types
export interface Coupon {
  id: string
  code: string
  name: string
  description?: string
  discount_type: 'percentage' | 'fixed_amount'
  discount_value: number
  minimum_order_value: number
  maximum_discount_amount?: number
  usage_limit?: number
  usage_count: number
  usage_limit_per_customer: number
  valid_from: string
  valid_until?: string
  applicable_categories: string[]
  applicable_products: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface ProductFilters {
  categoryId?: string
  brandIds?: string[]
  priceRange?: { min: number; max: number }
  sortBy?: 'name' | 'price_low' | 'price_high' | 'newest' | 'rating'
  search?: string
  limit?: number
  offset?: number
  inStock?: boolean
  featured?: boolean
  type?: string
}

export interface ProductSearchResult {
  products: Product[]
  total: number
  filters: {
    brands: Array<{ id: string; name: string; count: number }>
    categories: Array<{ id: string; name: string; count: number }>
    priceRange: { min: number; max: number }
  }
}

// Form Types
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone?: string
  agreeToTerms: boolean
  subscribeNewsletter?: boolean
}

export interface CheckoutFormData {
  shippingAddress: UserAddress
  billingAddress?: UserAddress
  paymentMethod: 'razorpay' | 'stripe' | 'upi'
  couponCode?: string
  notes?: string
}

// Medical Specialties
export type MedicalSpecialty = 
  | 'cardiology'
  | 'dermatology' 
  | 'gynecology'
  | 'classical'
  | 'gastroenterology'
  | 'general-medicine'
  | 'neurology'
  | 'orthopedics'
  | 'endocrinology'
  | 'hepatology'
  | 'nephrology'
  | 'pulmonology'
  | 'immunology'
  | 'pediatrics'
  | 'geriatrics'
  | 'oncology'
  | 'psychiatry'

// Global Distribution
export interface DistributionCenter {
  id: string
  name: string
  code: string
  address: Record<string, any>
  city: string
  state_province?: string
  country: string
  postal_code?: string
  timezone: string
  phone?: string
  email?: string
  manager_name?: string
  is_active: boolean
  operating_hours: Record<string, any>
  shipping_methods: string[]
  supported_currencies: string[]
  max_capacity?: number
  current_utilization: number
  created_at: string
  updated_at: string
}

export interface Currency {
  code: string
  name: string
  symbol: string
  exchange_rate: number
  is_active: boolean
  last_updated: string
  created_at: string
}

export interface ShippingZone {
  id: string
  name: string
  countries: string[]
  standard_delivery_days: number
  express_delivery_days: number
  overnight_available: boolean
  standard_rate: number
  express_rate?: number
  overnight_rate?: number
  free_shipping_threshold?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Vendor Types
export interface Vendor {
  id: string
  business_name: string
  legal_name: string
  slug: string
  email: string
  phone: string
  website_url?: string
  business_type?: string
  registration_number?: string
  tax_id?: string
  established_year?: number
  countries_served: string[]
  preferred_currency: string
  business_address: Record<string, any>
  status: 'pending' | 'approved' | 'suspended' | 'rejected'
  verification_status: string
  commission_rate: number
  payment_terms: string
  documents: Record<string, any>[]
  certifications: Record<string, any>[]
  created_at: string
  updated_at: string
} 