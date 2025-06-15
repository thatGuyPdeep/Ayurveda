# AyurvedaCart - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Development Guidelines](#development-guidelines)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Deployment](#deployment)
8. [Testing Strategy](#testing-strategy)
9. [Performance](#performance)
10. [Security](#security)
11. [Monitoring](#monitoring)
12. [Contributing](#contributing)

## Project Overview

AyurvedaCart is a comprehensive e-commerce platform specifically designed for Ayurvedic medicines and wellness products. The platform bridges traditional Ayurvedic wisdom with modern e-commerce technology, providing a seamless shopping experience for customers seeking authentic Ayurvedic products.

### Key Features
- **Product Catalog**: Comprehensive catalog of Ayurvedic medicines, supplements, and wellness products
- **Search & Discovery**: Advanced search with filters by condition, brand, and ingredients
- **User Management**: User registration, authentication, and profile management
- **Shopping Cart**: Persistent cart with real-time inventory checking
- **Order Management**: Complete order lifecycle management
- **Payment Processing**: Multiple payment options including Razorpay and Stripe
- **Consultation Platform**: Video consultations with qualified Ayurvedic doctors
- **Reviews & Ratings**: Customer feedback and product reviews
- **Admin Dashboard**: Comprehensive admin panel for business management
- **Mobile Application**: Native mobile apps for iOS and Android

### Business Model
- Commission-based sales from vendor partners
- Consultation fees from telemedicine services
- Premium subscription services
- Advertisement revenue from sponsored products

## Architecture

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│                 │    │                 │    │                 │
│ • Next.js 14    │◄──►│ • Supabase      │◄──►│ • PostgreSQL    │
│ • React 18      │    │ • Edge Functions│    │ • Redis Cache   │
│ • TypeScript    │    │ • Real-time     │    │                 │
│ • Tailwind CSS  │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         │              │   External      │              │
         └──────────────►│   Services      │◄─────────────┘
                        │                 │
                        │ • Razorpay      │
                        │ • Stripe        │
                        │ • Twilio        │
                        │ • SendGrid      │
                        │ • Cloudinary    │
                        └─────────────────┘
```

### Component Architecture
```
src/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication routes
│   ├── (shop)/             # Shopping routes
│   ├── account/            # User account routes
│   ├── admin/              # Admin routes
│   └── api/                # API routes
├── components/             # React components
│   ├── ui/                 # Base UI components
│   ├── forms/              # Form components
│   ├── layout/             # Layout components
│   └── features/           # Feature-specific components
├── lib/                    # Utilities and configurations
│   ├── services/           # Business logic services
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── validations/        # Schema validations
└── store/                  # State management
```

## Technology Stack

### Frontend Technologies
| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Framework | Next.js | 14.x | React framework with SSR/SSG |
| Language | TypeScript | 5.x | Type-safe JavaScript |
| Styling | Tailwind CSS | 3.4+ | Utility-first CSS framework |
| UI Components | Headless UI | 1.7+ | Accessible UI primitives |
| State Management | Zustand | 4.x | Lightweight state management |
| Data Fetching | TanStack Query | 5.x | Data fetching and caching |
| Forms | React Hook Form | 7.x | Performant forms with validation |
| Validation | Zod | 3.x | TypeScript-first schema validation |
| Icons | Lucide React | 0.x | Icon library |
| Animations | Framer Motion | 10.x | Animation library |

### Backend Technologies
| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| BaaS | Supabase | Latest | Backend as a Service |
| Database | PostgreSQL | 15+ | Primary database |
| Authentication | Supabase Auth | Latest | User authentication |
| Storage | Supabase Storage | Latest | File storage |
| Real-time | Supabase Real-time | Latest | WebSocket connections |
| Edge Functions | Deno | Latest | Serverless functions |
| Caching | Redis | 7.x | In-memory caching |
| Queue | Inngest | Latest | Background job processing |

### External Services
| Service | Purpose | Integration |
|---------|---------|-------------|
| Razorpay | Payment processing (India) | SDK + Webhooks |
| Stripe | International payments | SDK + Webhooks |
| Twilio | SMS notifications | REST API |
| Resend | Email delivery | REST API |
| Agora.io | Video consultations | SDK |
| Shiprocket | Shipping management | REST API |
| Sentry | Error monitoring | SDK |

## Development Guidelines

### Code Standards

#### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "error",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always"
      }
    ]
  }
}
```

#### Prettier Configuration
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### Naming Conventions

#### Files and Folders
- Use PascalCase for React components: `ProductCard.tsx`
- Use camelCase for utilities and hooks: `useProductSearch.ts`
- Use kebab-case for pages and API routes: `product-detail/page.tsx`
- Use UPPERCASE for constants: `API_ENDPOINTS.ts`

#### Variables and Functions
- Use camelCase for variables and functions: `const userName = 'john'`
- Use PascalCase for React components: `const ProductCard = () => {}`
- Use UPPER_SNAKE_CASE for environment variables: `DATABASE_URL`

#### Database
- Use snake_case for table and column names: `user_profiles`, `created_at`
- Use plural names for tables: `users`, `products`, `orders`
- Use descriptive names for indexes: `idx_products_category_status`

### Component Development

#### Component Structure
```typescript
// components/ProductCard.tsx
import React from 'react'
import { cn } from '@/lib/utils'

// Types
interface ProductCardProps {
  product: Product
  className?: string
  onAddToCart?: (product: Product) => void
}

// Component
export function ProductCard({ 
  product, 
  className, 
  onAddToCart 
}: ProductCardProps) {
  // Hooks
  const [isLoading, setIsLoading] = useState(false)
  
  // Handlers
  const handleAddToCart = () => {
    setIsLoading(true)
    onAddToCart?.(product)
    setIsLoading(false)
  }
  
  // Render
  return (
    <div className={cn('product-card', className)}>
      {/* Component content */}
    </div>
  )
}
```

#### Hook Development
```typescript
// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query'
import { ProductService } from '@/lib/services/product'

interface UseProductsOptions {
  category?: string
  search?: string
  limit?: number
}

export function useProducts(options: UseProductsOptions = {}) {
  return useQuery({
    queryKey: ['products', options],
    queryFn: () => ProductService.getProducts(options),
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

### API Development

#### API Route Structure
```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { ProductService } from '@/lib/services/product'
import { withAuth } from '@/lib/middleware/auth'
import { withRateLimit } from '@/lib/middleware/rateLimit'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = Object.fromEntries(searchParams.entries())
    
    const products = await ProductService.getProducts(filters)
    
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export const POST = withAuth(withRateLimit(async (request: NextRequest) => {
  // Protected route logic
}))
```

#### Service Layer Pattern
```typescript
// lib/services/product.ts
export class ProductService {
  static async getProducts(filters: ProductFilters): Promise<ProductResponse> {
    // Implementation
  }
  
  static async getProduct(id: string): Promise<Product> {
    // Implementation
  }
  
  static async createProduct(data: CreateProductData): Promise<Product> {
    // Implementation
  }
}
```

## API Documentation

### Authentication APIs

#### POST /api/auth/login
**Description**: Authenticate user with email and password

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "expires_at": "2024-01-01T00:00:00Z"
  }
}
```

#### POST /api/auth/register
**Description**: Register new user account

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+919876543210"
}
```

### Product APIs

#### GET /api/products
**Description**: Get paginated list of products

**Query Parameters**:
- `category` (string): Filter by category slug
- `brand` (string): Filter by brand IDs (comma-separated)
- `search` (string): Search query
- `sort` (string): Sort order (name, price_low, price_high, newest)
- `limit` (number): Number of items per page (default: 20)
- `offset` (number): Number of items to skip (default: 0)

**Response**:
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Product Name",
      "slug": "product-name",
      "price": 299.99,
      "compare_at_price": 399.99,
      "images": [
        {
          "url": "https://example.com/image.jpg",
          "alt": "Product image"
        }
      ],
      "brand": {
        "id": "uuid",
        "name": "Brand Name"
      }
    }
  ],
  "total": 150,
  "has_more": true
}
```

#### GET /api/products/[slug]
**Description**: Get detailed product information

**Response**:
```json
{
  "id": "uuid",
  "name": "Product Name",
  "description": "Detailed product description",
  "price": 299.99,
  "stock_quantity": 50,
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "Product image"
    }
  ],
  "variants": [
    {
      "id": "uuid",
      "name": "100ml",
      "price": 299.99,
      "stock_quantity": 25
    }
  ],
  "ingredients": [
    {
      "name": "Ashwagandha",
      "quantity": "500mg",
      "benefits": ["Stress relief", "Energy boost"]
    }
  ],
  "reviews": {
    "average_rating": 4.5,
    "total_count": 127,
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "title": "Excellent product",
        "comment": "Really helped with my stress levels",
        "user_name": "John D.",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### Order APIs

#### POST /api/orders
**Description**: Create new order

**Request Body**:
```json
{
  "items": [
    {
      "product_id": "uuid",
      "variant_id": "uuid",
      "quantity": 2
    }
  ],
  "shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "address_line_1": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postal_code": "400001",
    "country": "India",
    "phone": "+919876543210"
  },
  "payment_method": "razorpay",
  "coupon_code": "WELCOME10"
}
```

**Response**:
```json
{
  "order": {
    "id": "uuid",
    "order_number": "AYU-1234567890",
    "status": "pending",
    "subtotal": 599.98,
    "tax_amount": 107.99,
    "shipping_amount": 0,
    "discount_amount": 59.99,
    "total_amount": 647.98,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "payment": {
    "id": "uuid",
    "gateway": "razorpay",
    "gateway_order_id": "order_razorpay_id",
    "amount": 647.98,
    "currency": "INR"
  }
}
```

## Database Schema

### Core Tables

#### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### products
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    brand_id UUID REFERENCES brands(id),
    price DECIMAL(10,2) NOT NULL,
    compare_at_price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',
    is_featured BOOLEAN DEFAULT FALSE,
    average_rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### orders
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending',
    payment_status VARCHAR(20) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes
```sql
-- Performance indexes
CREATE INDEX idx_products_status ON products(status) WHERE status = 'active';
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Full-text search
CREATE INDEX idx_products_search ON products USING GIN (
    to_tsvector('english', name || ' ' || COALESCE(description, ''))
);
```

## Deployment

### Environment Configuration

#### Production Environment Variables
```bash
# Database
DATABASE_URL="postgresql://..."
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# External Services
RAZORPAY_KEY_ID="rzp_live_..."
RAZORPAY_KEY_SECRET="..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."

# Caching
REDIS_URL="redis://..."

# Monitoring
SENTRY_DSN="https://..."
NEXT_PUBLIC_ANALYTICS_ID="G-..."

# Email
RESEND_API_KEY="re_..."

# SMS
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
```

#### Deployment Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Build application
        run: pnpm build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Performance Monitoring

#### Core Web Vitals Targets
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

#### Performance Budget
```javascript
// next.config.js
module.exports = {
  experimental: {
    webpackBuildWorker: true,
    optimizeCss: true,
  },
  images: {
    domains: ['supabase.com', 'cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
}
```

## Testing Strategy

### Unit Testing
```javascript
// __tests__/components/ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '@/components/ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 299.99,
    images: [{ url: '/test.jpg', alt: 'Test' }]
  }

  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('₹299.99')).toBeInTheDocument()
  })

  it('handles add to cart click', () => {
    const onAddToCart = jest.fn()
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />)
    
    fireEvent.click(screen.getByText('Add to Cart'))
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct)
  })
})
```

### Integration Testing
```javascript
// __tests__/api/products.test.ts
import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/products/route'

describe('/api/products', () => {
  it('returns products list', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { limit: '10' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data).toHaveProperty('products')
    expect(Array.isArray(data.products)).toBe(true)
  })
})
```

### E2E Testing
```javascript
// e2e/shopping-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Shopping Flow', () => {
  test('complete purchase flow', async ({ page }) => {
    // Navigate to product
    await page.goto('/products/ashwagandha-capsules')
    
    // Add to cart
    await page.click('[data-testid="add-to-cart"]')
    
    // Verify cart
    await page.click('[data-testid="cart-button"]')
    await expect(page.locator('[data-testid="cart-item"]')).toBeVisible()
    
    // Checkout
    await page.click('[data-testid="checkout-button"]')
    await page.fill('[data-testid="email"]', 'test@example.com')
    await page.fill('[data-testid="address"]', '123 Test St')
    
    // Complete order
    await page.click('[data-testid="place-order"]')
    await expect(page.locator('[data-testid="order-confirmation"]')).toBeVisible()
  })
})
```

## Security

### Security Headers
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

### Input Validation
```typescript
// lib/validations/product.ts
import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1).max(500),
  description: z.string().optional(),
  price: z.number().min(0),
  stock_quantity: z.number().int().min(0),
  brand_id: z.string().uuid(),
  category_ids: z.array(z.string().uuid()).min(1)
})

export type CreateProductInput = z.infer<typeof createProductSchema>
```

## Contributing

### Development Setup
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy environment variables: `cp .env.example .env.local`
4. Run database migrations: `pnpm db:migrate`
5. Start development server: `pnpm dev`

### Commit Guidelines
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new product filtering feature
fix: resolve cart calculation bug
docs: update API documentation
style: format code with prettier
refactor: extract payment service
test: add unit tests for product service
chore: update dependencies
```

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes with proper tests
3. Ensure all tests pass: `pnpm test`
4. Update documentation if needed
5. Submit a pull request with clear description

This documentation provides a comprehensive guide for developing, deploying, and maintaining the AyurvedaCart platform. Regular updates to this documentation ensure it remains current with the evolving codebase and requirements. 