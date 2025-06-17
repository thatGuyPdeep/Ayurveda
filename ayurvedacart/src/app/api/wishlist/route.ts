import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Authentication required' 
        },
        { status: 401 }
      )
    }

    const { data: wishlist, error } = await supabase
      .from('wishlist_items')
      .select(`
        *,
        products (
          id,
          name,
          slug,
          selling_price,
          base_price,
          discount_percentage,
          stock_quantity,
          images:product_images(image_url, alt_text, is_primary),
          brand:brands(name)
        )
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Wishlist fetch error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to fetch wishlist' 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: wishlist || []
    })
  } catch (error) {
    console.error('Wishlist API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch wishlist' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Authentication required' 
        },
        { status: 401 }
      )
    }

    const { product_id } = await request.json()

    if (!product_id) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Product ID is required' 
        },
        { status: 400 }
      )
    }

    // Check if item already exists in wishlist
    const { data: existing } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('product_id', product_id)
      .single()

    if (existing) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Product already in wishlist' 
        },
        { status: 409 }
      )
    }

    const { data, error } = await supabase
      .from('wishlist_items')
      .insert({
        user_id: session.user.id,
        product_id
      })
      .select()
      .single()

    if (error) {
      console.error('Wishlist add error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to add to wishlist' 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    }, { status: 201 })
  } catch (error) {
    console.error('Wishlist add API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add to wishlist' 
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Authentication required' 
        },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const product_id = searchParams.get('product_id')

    if (!product_id) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Product ID is required' 
        },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', session.user.id)
      .eq('product_id', product_id)

    if (error) {
      console.error('Wishlist remove error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to remove from wishlist' 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Product removed from wishlist'
    })
  } catch (error) {
    console.error('Wishlist remove API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to remove from wishlist' 
      },
      { status: 500 }
    )
  }
} 