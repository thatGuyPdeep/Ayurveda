import { NextRequest, NextResponse } from 'next/server'
import { ProductService } from '@/lib/services/product'

const productService = new ProductService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: any = {
      sortBy: (searchParams.get('sort') as any) || 'name',
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
      featured: searchParams.get('featured') === 'true'
    }

    const category = searchParams.get('category')
    if (category) filters.category = category

    const brands = searchParams.get('brands')
    if (brands) filters.brandIds = brands.split(',').filter(Boolean)

    const search = searchParams.get('q')
    if (search) filters.search = search

    if (searchParams.get('priceMin') && searchParams.get('priceMax')) {
      filters.priceRange = {
        min: parseInt(searchParams.get('priceMin')!),
        max: parseInt(searchParams.get('priceMax')!)
      }
    }

    const result = await productService.getProducts(filters)

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products' 
      },
      { status: 500 }
    )
  }
} 