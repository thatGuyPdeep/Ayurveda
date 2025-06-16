# AyurvedaCart API Reference

## Supabase Integration

### Client Configuration
```typescript
// src/lib/supabase.ts
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey)
```

### Authentication APIs

#### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securePassword',
  options: {
    data: {
      first_name: 'John',
      last_name: 'Doe'
    }
  }
})
```

#### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securePassword'
})
```

#### Get Current User
```typescript
const { data: { user }, error } = await supabase.auth.getUser()
```

## Database Operations

### Products API

#### Fetch Products
```typescript
// Get all published products
const { data: products, error } = await supabase
  .from('products')
  .select(`
    *,
    brands(name, slug),
    categories(name, slug),
    product_images(image_url, alt_text)
  `)
  .eq('status', 'published')
  .order('created_at', { ascending: false })

// Get products by category
const { data: products, error } = await supabase
  .from('products')
  .select('*')
  .eq('category_id', categoryId)
  .eq('status', 'published')

// Search products
const { data: products, error } = await supabase
  .from('products')
  .select('*')
  .textSearch('name', searchQuery)
  .eq('status', 'published')
```

#### Product Details
```typescript
const { data: product, error } = await supabase
  .from('products')
  .select(`
    *,
    brands(*),
    categories(*),
    product_images(*),
    reviews(
      id,
      rating,
      comment,
      users(first_name, last_name)
    )
  `)
  .eq('slug', productSlug)
  .single()
```

### Categories API

#### Fetch Categories
```typescript
// Get all active categories
const { data: categories, error } = await supabase
  .from('categories')
  .select('*')
  .eq('is_active', true)
  .order('display_order')

// Get category hierarchy
const { data: categories, error } = await supabase
  .from('categories')
  .select(`
    *,
    children:categories(*)
  `)
  .is('parent_id', null)
  .eq('is_active', true)
```

### Orders API

#### Create Order
```typescript
const { data: order, error } = await supabase
  .from('orders')
  .insert({
    user_id: userId,
    order_number: generateOrderNumber(),
    total_amount: totalAmount,
    shipping_amount: shippingCost,
    tax_amount: taxAmount,
    shipping_address: shippingAddress,
    billing_address: billingAddress,
    status: 'pending'
  })
  .select()
  .single()
```

#### Get User Orders
```typescript
const { data: orders, error } = await supabase
  .from('orders')
  .select(`
    *,
    order_items(
      *,
      products(name, image_url)
    )
  `)
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
```

### Reviews API

#### Create Review
```typescript
const { data: review, error } = await supabase
  .from('reviews')
  .insert({
    product_id: productId,
    user_id: userId,
    rating: rating,
    comment: comment
  })
```

#### Get Product Reviews
```typescript
const { data: reviews, error } = await supabase
  .from('reviews')
  .select(`
    *,
    users(first_name, last_name)
  `)
  .eq('product_id', productId)
  .order('created_at', { ascending: false })
```

## Custom Hooks

### useProducts Hook
```typescript
export function useProducts(options?: {
  category?: string
  search?: string
  limit?: number
}) {
  return useQuery({
    queryKey: ['products', options],
    queryFn: () => fetchProducts(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

### useProduct Hook
```typescript
export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProduct(slug),
    enabled: !!slug,
  })
}
```

### useAuth Hook
```typescript
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

## API Utilities

### Error Handling
```typescript
export function handleSupabaseError(error: PostgrestError | null) {
  if (!error) return null
  
  // Log error for debugging
  console.error('Supabase error:', error)
  
  // Return user-friendly message
  switch (error.code) {
    case '23505': // Unique violation
      return 'This item already exists'
    case '23503': // Foreign key violation
      return 'Referenced item not found'
    default:
      return 'Something went wrong. Please try again.'
  }
}
```

### Query Builders
```typescript
export const productQueries = {
  all: () => ['products'] as const,
  lists: () => [...productQueries.all(), 'list'] as const,
  list: (filters: ProductFilters) => [...productQueries.lists(), filters] as const,
  details: () => [...productQueries.all(), 'detail'] as const,
  detail: (slug: string) => [...productQueries.details(), slug] as const,
}
```

## Real-time Subscriptions

### Product Stock Updates
```typescript
const channel = supabase
  .channel('product-stock-changes')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'products',
      filter: `id=eq.${productId}`
    },
    (payload) => {
      // Update product stock in UI
      updateProductStock(payload.new)
    }
  )
  .subscribe()
```

### Order Status Updates
```typescript
const channel = supabase
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
      // Update order status in UI
      updateOrderStatus(payload.new.status)
    }
  )
  .subscribe()
```

## File Upload

### Product Images
```typescript
export async function uploadProductImage(file: File, productId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${productId}-${Date.now()}.${fileExt}`
  const filePath = `products/${fileName}`

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file)

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return publicUrl
}
```

## Middleware & Security

### Row Level Security (RLS)
```sql
-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Only authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### API Rate Limiting
```typescript
// Implement rate limiting for API routes
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
})
```

## Data Validation

### Zod Schemas
```typescript
export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  stock_quantity: z.number().min(0, 'Stock must be non-negative'),
  category_id: z.string().uuid('Invalid category'),
  brand_id: z.string().uuid('Invalid brand').optional(),
})

export const createOrderSchema = z.object({
  items: z.array(z.object({
    product_id: z.string().uuid(),
    quantity: z.number().min(1),
    price: z.number().min(0),
  })).min(1, 'At least one item required'),
  shipping_address: addressSchema,
  billing_address: addressSchema,
})
``` 