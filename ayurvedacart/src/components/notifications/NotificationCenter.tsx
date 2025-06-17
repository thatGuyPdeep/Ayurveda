'use client'

import { useState } from 'react'
import { 
  Bell, 
  X, 
  Check, 
  Package, 
  Heart, 
  Tag, 
  User, 
  Clock,
  Filter,
  MoreVertical,
  Trash2
} from 'lucide-react'

interface Notification {
  id: string
  type: 'order' | 'wishlist' | 'promotion' | 'account' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  actionText?: string
  priority: 'low' | 'medium' | 'high'
  metadata?: {
    orderId?: string
    productId?: string
    discountAmount?: number
  }
}

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead: (notificationId: string) => void
  onMarkAllAsRead: () => void
  onDeleteNotification: (notificationId: string) => void
  onClearAll: () => void
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #AYU-2024-001234 has been shipped and is on its way to you.',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    actionUrl: '/account/orders/AYU-2024-001234',
    actionText: 'Track Order',
    priority: 'high',
    metadata: { orderId: 'AYU-2024-001234' }
  },
  {
    id: '2',
    type: 'wishlist',
    title: 'Price Drop Alert',
    message: 'Ashwagandha Premium Capsules in your wishlist is now 30% off!',
    timestamp: '2024-01-15T09:15:00Z',
    read: false,
    actionUrl: '/products/ashwagandha-premium',
    actionText: 'View Product',
    priority: 'medium',
    metadata: { productId: 'ashwagandha-premium', discountAmount: 30 }
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 25% off on all Digestive Health products. Limited time offer!',
    timestamp: '2024-01-15T08:00:00Z',
    read: true,
    actionUrl: '/specialties/gastroenterology',
    actionText: 'Shop Now',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'account',
    title: 'Profile Updated',
    message: 'Your profile information has been successfully updated.',
    timestamp: '2024-01-14T16:45:00Z',
    read: true,
    priority: 'low'
  },
  {
    id: '5',
    type: 'system',
    title: 'Maintenance Notice',
    message: 'Scheduled maintenance on Jan 20, 2024 from 2:00 AM to 4:00 AM IST.',
    timestamp: '2024-01-14T12:00:00Z',
    read: false,
    priority: 'low'
  }
]

export default function NotificationCenter({
  notifications = mockNotifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'order' | 'wishlist' | 'promotion'>('all')
  const [isOpen, setIsOpen] = useState(false)

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    return notification.type === filter
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-5 w-5 text-emerald-600" />
      case 'wishlist':
        return <Heart className="h-5 w-5 text-red-500" />
      case 'promotion':
        return <Tag className="h-5 w-5 text-saffron-600" />
      case 'account':
        return <User className="h-5 w-5 text-blue-600" />
      case 'system':
        return <Bell className="h-5 w-5 text-charcoal/60" />
      default:
        return <Bell className="h-5 w-5 text-charcoal/60" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500'
      case 'medium':
        return 'border-l-saffron-500'
      case 'low':
        return 'border-l-emerald-500'
      default:
        return 'border-l-charcoal/30'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-charcoal/70 hover:text-charcoal transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-sage-light z-50 max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-sage-light">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-charcoal">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-charcoal/60 hover:text-charcoal transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1 bg-sage-light rounded-xl p-1">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'unread', label: 'Unread' },
                  { key: 'order', label: 'Orders' },
                  { key: 'wishlist', label: 'Wishlist' },
                  { key: 'promotion', label: 'Offers' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as any)}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                      filter === tab.key
                        ? 'bg-white text-emerald-800 shadow-sm'
                        : 'text-charcoal/60 hover:text-charcoal'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Actions */}
              {notifications.length > 0 && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={onMarkAllAsRead}
                    className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    <Check className="h-3 w-3" />
                    Mark all read
                  </button>
                  <button
                    onClick={onClearAll}
                    className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="h-12 w-12 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bell className="h-6 w-6 text-charcoal/60" />
                  </div>
                  <h4 className="font-medium text-charcoal mb-1">No notifications</h4>
                  <p className="text-sm text-charcoal/60">
                    {filter === 'all' ? "You're all caught up!" : `No ${filter} notifications`}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-sage-light">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-sage-light/50 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                        !notification.read ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`font-medium text-sm ${
                              !notification.read ? 'text-charcoal' : 'text-charcoal/80'
                            }`}>
                              {notification.title}
                            </h4>
                            
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                              )}
                              <button className="p-1 text-charcoal/40 hover:text-charcoal/60 transition-colors">
                                <MoreVertical className="h-3 w-3" />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-charcoal/60 mt-1 line-clamp-2">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 text-xs text-charcoal/50">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(notification.timestamp)}
                            </div>

                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <button
                                  onClick={() => onMarkAsRead(notification.id)}
                                  className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                                >
                                  Mark read
                                </button>
                              )}
                              
                              {notification.actionUrl && (
                                <button className="text-xs bg-emerald-800 text-white px-2 py-1 rounded-lg hover:bg-emerald-700 transition-colors">
                                  {notification.actionText || 'View'}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredNotifications.length > 0 && (
              <div className="p-4 border-t border-sage-light bg-sage-light/30">
                <button className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
} 