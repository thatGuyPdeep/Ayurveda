import { NextRequest, NextResponse } from 'next/server'
import { ProductService } from '@/lib/services/product'

const productService = new ProductService()

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await productService.getProductBySlug(params.slug)

    if (!product) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Product not found' 
        },
        { status: 404 }
      )
    }

    // Get recommendations for this product
    const recommendations = await productService.getRecommendations(product.id, 4)

    return NextResponse.json({
      success: true,
      data: {
        product,
        recommendations
      }
    })
  } catch (error) {
    console.error('Product detail API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product' 
      },
      { status: 500 }
    )
  }
} 