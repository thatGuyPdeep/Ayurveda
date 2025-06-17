import { Metadata } from 'next'
import Link from 'next/link'
import { Package, Truck, CheckCircle, Clock, ArrowLeft, Eye, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Order History | AyuraVeda Royale - Track Your Wellness Journey',
  description: 'View and track your Ayurvedic product orders. Monitor delivery status, download invoices, and reorder your favorite wellness products.',
}

// Mock order data - in real app, this would come from API
const mockOrders = [
  {
    id: 'AYU-2024-001',
    orderNumber: 'AYU-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 3499,
    items: [
      {
        id: '1',
        name: 'Chyawanprash Premium Immunity Booster',
        quantity: 2,
        price: 1499,
        image: '/products/chyawanprash.jpg'
      },
      {
        id: '2',
        name: 'Ashwagandha Premium Capsules',
        quantity: 1,
        price: 1999,
        image: '/products/ashwagandha.jpg'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Wellness Street, Health City, HC 12345'
    },
    tracking: {
      number: 'TRK123456789',
      url: 'https://tracking.example.com/TRK123456789'
    }
  },
  {
    id: 'AYU-2024-002',
    orderNumber: 'AYU-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 2299,
    items: [
      {
        id: '3',
        name: 'Arjunarishta Heart Health Tonic',
        quantity: 1,
        price: 899,
        image: '/products/arjunarishta.jpg'
      },
      {
        id: '4',
        name: 'Kumkumadi Tailam Radiant Skin Oil',
        quantity: 1,
        price: 1400,
        image: '/products/kumkumadi.jpg'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Wellness Street, Health City, HC 12345'
    },
    tracking: {
      number: 'TRK987654321',
      url: 'https://tracking.example.com/TRK987654321'
    }
  },
  {
    id: 'AYU-2024-003',
    orderNumber: 'AYU-2024-003',
    date: '2024-01-25',
    status: 'processing',
    total: 1599,
    items: [
      {
        id: '5',
        name: 'Hingwashtak Churna Digestive Powder',
        quantity: 1,
        price: 599,
        image: '/products/hingwashtak.jpg'
      },
      {
        id: '6',
        name: 'Brahmi Ghrita Mental Clarity',
        quantity: 1,
        price: 1000,
        image: '/products/brahmi-ghrita.jpg'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Wellness Street, Health City, HC 12345'
    }
  }
]

const statusConfig = {
  processing: {
    label: 'Processing',
    color: 'bg-saffron-100 text-saffron-800',
    icon: Clock
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-blue-100 text-blue-800',
    icon: Truck
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-emerald-100 text-emerald-800',
    icon: CheckCircle
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: Package
  }
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/account"
              className="flex items-center gap-2 text-emerald-800 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Account
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-lg flex items-center justify-center">
              <Package className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-charcoal font-display">
              Order History
            </h1>
          </div>
          
          <p className="text-charcoal/70">
            Track your wellness journey and manage your orders
          </p>
        </div>

        {/* Order Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-emerald-800" />
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal">12</p>
                <p className="text-sm text-charcoal/60">Total Orders</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-saffron-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-saffron-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal">2</p>
                <p className="text-sm text-charcoal/60">Processing</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal">1</p>
                <p className="text-sm text-charcoal/60">Shipped</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal">9</p>
                <p className="text-sm text-charcoal/60">Delivered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 border border-sage-dark text-charcoal rounded-xl hover:bg-sage-light transition-colors font-medium">
            Load More Orders
          </button>
        </div>
      </div>
    </div>
  )
}

function OrderCard({ order }: { order: any }) {
  const status = statusConfig[order.status as keyof typeof statusConfig]
  const StatusIcon = status.icon

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Order Header */}
      <div className="p-6 border-b border-sage-light">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="font-bold text-charcoal text-lg">
                Order #{order.orderNumber}
              </h3>
              <p className="text-sm text-charcoal/60">
                Placed on {new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
              <StatusIcon className="h-4 w-4" />
              {status.label}
            </div>
            
            <div className="text-right">
              <p className="font-bold text-charcoal text-lg">
                ₹{order.total.toLocaleString()}
              </p>
              <p className="text-sm text-charcoal/60">
                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6">
        <div className="space-y-4">
          {order.items.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="h-16 w-16 bg-sage-light rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-charcoal line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-sm text-charcoal/60">
                  Quantity: {item.quantity}
                </p>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-charcoal">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Actions */}
      <div className="px-6 py-4 bg-sage-light/30 border-t border-sage-light">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div className="text-sm text-charcoal/70">
            <p>Shipping to: {order.shippingAddress.name}</p>
            <p>{order.shippingAddress.address}</p>
          </div>
          
          <div className="flex gap-3">
            {order.tracking && (
              <Link
                href={order.tracking.url}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-800 border border-emerald-800 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <Truck className="h-4 w-4" />
                Track Order
              </Link>
            )}
            
            <Link
              href={`/account/orders/${order.id}`}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-charcoal border border-sage-dark rounded-lg hover:bg-sage-light transition-colors"
            >
              <Eye className="h-4 w-4" />
              View Details
            </Link>
            
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-charcoal border border-sage-dark rounded-lg hover:bg-sage-light transition-colors">
              <Download className="h-4 w-4" />
              Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 