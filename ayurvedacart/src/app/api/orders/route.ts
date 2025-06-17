import { NextRequest, NextResponse } from 'next/server'
import { OrderService } from '@/lib/services/order'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const orderService = new OrderService()

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    const orderData = await request.json()

    // If user is authenticated, use their ID
    if (session?.user) {
      orderData.user_id = session.user.id
    }

    const result = await orderService.createOrder(orderData)

    return NextResponse.json({
      success: true,
      data: result
    }, { status: 201 })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create order' 
      },
      { status: 500 }
    )
  }
}

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

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const orders = await orderService.getOrdersByUser(session.user.id, { limit, offset })

    return NextResponse.json({
      success: true,
      data: orders
    })
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch orders' 
      },
      { status: 500 }
    )
  }
} 