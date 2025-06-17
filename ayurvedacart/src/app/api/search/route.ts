import { NextRequest, NextResponse } from 'next/server'
import { ProductService } from '@/lib/services/product'

const productService = new ProductService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Search query is required'
      }, { status: 400 })
    }

    const products = await productService.searchProducts(query.trim(), limit)

    return NextResponse.json({
      success: true,
      data: {
        query: query.trim(),
        products,
        total: products.length
      }
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Search failed' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, filters } = await request.json()

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Search query is required'
      }, { status: 400 })
    }

    const searchFilters = {
      ...filters,
      search: query.trim()
    }

    const result = await productService.getProducts(searchFilters)

    return NextResponse.json({
      success: true,
      data: {
        query: query.trim(),
        ...result
      }
    })
  } catch (error) {
    console.error('Advanced search API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Search failed' 
      },
      { status: 500 }
    )
  }
} 