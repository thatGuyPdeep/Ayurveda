import { NextRequest, NextResponse } from 'next/server'
import { ProductService } from '@/lib/services/product'
import { OrderService } from '@/lib/services/order'

const productService = new ProductService()
const orderService = new OrderService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const demo = searchParams.get('demo') || 'overview'

    switch (demo) {
      case 'products':
        return await demoProducts()
      case 'search':
        return await demoSearch()
      case 'orders':
        return await demoOrders()
      case 'overview':
      default:
        return await demoOverview()
    }
  } catch (error) {
    console.error('Demo API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Demo failed' 
      },
      { status: 500 }
    )
  }
}

async function demoOverview() {
  return NextResponse.json({
    success: true,
    data: {
      title: 'AyuraVeda Royale API Integration Demo',
      version: '1.0.0',
      status: 'Production Ready',
      features: {
        'Product Management': {
          endpoints: ['/api/products', '/api/products/[slug]'],
          features: ['Filtering', 'Sorting', 'Search', 'Pagination'],
          status: '✅ Complete'
        },
        'Order Management': {
          endpoints: ['/api/orders'],
          features: ['Create Orders', 'Order History', 'Status Updates'],
          status: '✅ Complete'
        },
        'Search System': {
          endpoints: ['/api/search'],
          features: ['Full-text Search', 'Advanced Filtering', 'Debounced Search'],
          status: '✅ Complete'
        },
        'User Management': {
          endpoints: ['/api/user/profile', '/api/auth/callback'],
          features: ['Profile Management', 'Authentication', 'Session Handling'],
          status: '✅ Complete'
        },
        'Wishlist Management': {
          endpoints: ['/api/wishlist'],
          features: ['Add to Wishlist', 'Remove from Wishlist', 'View Wishlist'],
          status: '✅ Complete'
        }
      },
      database: {
        provider: 'Supabase PostgreSQL',
        tables: '15+ Tables',
        relationships: 'Fully Normalized',
        types: 'TypeScript Generated',
        status: '✅ Production Ready'
      },
      integration: {
        frontend: 'React 19 + Next.js 14',
        backend: 'Supabase + TypeScript',
        state: 'Zustand',
        ui: 'Tailwind CSS + Headless UI',
        status: '✅ Fully Integrated'
      },
      demos: {
        products: '/api/demo?demo=products',
        search: '/api/demo?demo=search',
        orders: '/api/demo?demo=orders'
      }
    }
  })
}

async function demoProducts() {
  const filters = {
    limit: 5,
    featured: true,
    status: 'active' as const
  }

  const result = await productService.getProducts(filters)

  return NextResponse.json({
    success: true,
    data: {
      title: 'Product Management Demo',
      filters_applied: filters,
      total_products: result.total,
      sample_products: result.products,
      available_filters: {
        categoryId: 'Filter by category ID',
        brandIds: 'Array of brand IDs',
        priceRange: 'Min/max price range',
        sortBy: ['name', 'price_low', 'price_high', 'newest', 'rating', 'featured'],
        search: 'Text search query',
        status: ['active', 'inactive', 'draft'],
        featured: 'Boolean for featured products'
      },
      example_calls: {
        all_products: '/api/products',
        filtered: '/api/products?category=supplements&sort=price_low&limit=10',
        search: '/api/products?q=ashwagandha&featured=true'
      }
    }
  })
}

async function demoSearch() {
  const searchQueries = ['ashwagandha', 'digestive', 'stress relief']
  const results = []

  for (const query of searchQueries) {
    const products = await productService.searchProducts(query, 3)
    results.push({
      query,
      count: products.length,
      products: products.slice(0, 2) // Show first 2 for demo
    })
  }

  return NextResponse.json({
    success: true,
    data: {
      title: 'Search System Demo',
      search_results: results,
      features: {
        full_text_search: 'Search across product names, descriptions, and ingredients',
        debounced_search: 'Frontend debouncing to prevent excessive API calls',
        advanced_filtering: 'Combine search with filters for precise results',
        pagination: 'Efficient pagination for large result sets'
      },
      example_calls: {
        simple_search: '/api/search?q=turmeric',
        advanced_search: 'POST /api/search with filters object'
      }
    }
  })
}

async function demoOrders() {
  // Simulate order creation for demo
  const sampleOrderData = {
    items: [
      {
        product_id: 'sample-product-1',
        quantity: 2,
        product_name: 'Ashwagandha Premium Capsules',
        product_sku: 'AYU-001',
        unit_price: 1999
      }
    ],
    shipping_address: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      address_line_1: '123 Wellness Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      postal_code: '400001',
      country: 'India'
    },
    payment_method: 'razorpay'
  }

  return NextResponse.json({
    success: true,
    data: {
      title: 'Order Management Demo',
      sample_order_data: sampleOrderData,
      order_process: {
        step_1: 'Validate order items and check stock',
        step_2: 'Calculate pricing (subtotal, tax, shipping, discounts)',
        step_3: 'Generate unique order number',
        step_4: 'Create order record in database',
        step_5: 'Create order items records',
        step_6: 'Return order confirmation'
      },
      pricing_calculation: {
        subtotal: 3998,
        tax_amount: 719.64, // 18% GST
        shipping_amount: 0, // Free shipping over ₹70
        discount_amount: 0,
        total_amount: 4717.64
      },
      features: {
        stock_validation: 'Real-time stock checking before order creation',
        pricing_engine: 'Automatic calculation of taxes, shipping, and discounts',
        order_tracking: 'Complete order lifecycle tracking',
        coupon_support: 'Discount codes and promotional pricing'
      },
      example_calls: {
        create_order: 'POST /api/orders',
        get_orders: 'GET /api/orders',
        order_status: 'PATCH /api/orders/[id]'
      }
    }
  })
} 