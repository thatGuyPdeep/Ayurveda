interface LoadingSkeletonProps {
  className?: string
  variant?: 'product' | 'card' | 'list' | 'text' | 'avatar' | 'button'
  count?: number
}

export function LoadingSkeleton({ 
  className = '', 
  variant = 'product',
  count = 1 
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <SkeletonItem key={i} variant={variant} className={className} />
  ))
  
  return count > 1 ? <>{skeletons}</> : skeletons[0]
}

function SkeletonItem({ variant, className }: { variant: string; className: string }) {
  const baseClasses = "animate-pulse bg-gradient-to-r from-sage-light/30 via-sage-light/50 to-sage-light/30 bg-[length:200%_100%] animate-shimmer"
  
  switch (variant) {
    case 'product':
      return (
        <div className={`bg-white rounded-2xl shadow-soft overflow-hidden ${className}`}>
          <div className={`${baseClasses} h-48 w-full`} />
          <div className="p-4 space-y-3">
            <div className={`${baseClasses} h-4 w-3/4 rounded`} />
            <div className={`${baseClasses} h-3 w-1/2 rounded`} />
            <div className="flex items-center gap-2">
              <div className={`${baseClasses} h-6 w-20 rounded`} />
              <div className={`${baseClasses} h-4 w-16 rounded`} />
            </div>
            <div className={`${baseClasses} h-10 w-full rounded-xl`} />
          </div>
        </div>
      )
    
    case 'card':
      return (
        <div className={`bg-white rounded-xl shadow-soft p-6 ${className}`}>
          <div className={`${baseClasses} h-32 w-full rounded-lg mb-4`} />
          <div className={`${baseClasses} h-6 w-3/4 rounded mb-2`} />
          <div className={`${baseClasses} h-4 w-full rounded mb-2`} />
          <div className={`${baseClasses} h-4 w-2/3 rounded`} />
        </div>
      )
    
    case 'list':
      return (
        <div className={`flex items-center gap-4 p-4 bg-white rounded-xl ${className}`}>
          <div className={`${baseClasses} h-16 w-16 rounded-xl flex-shrink-0`} />
          <div className="flex-1 space-y-2">
            <div className={`${baseClasses} h-5 w-3/4 rounded`} />
            <div className={`${baseClasses} h-4 w-1/2 rounded`} />
            <div className={`${baseClasses} h-6 w-20 rounded`} />
          </div>
        </div>
      )
    
    case 'text':
      return (
        <div className={`space-y-2 ${className}`}>
          <div className={`${baseClasses} h-4 w-full rounded`} />
          <div className={`${baseClasses} h-4 w-5/6 rounded`} />
          <div className={`${baseClasses} h-4 w-3/4 rounded`} />
        </div>
      )
    
    case 'avatar':
      return <div className={`${baseClasses} h-10 w-10 rounded-full ${className}`} />
    
    case 'button':
      return <div className={`${baseClasses} h-10 w-24 rounded-xl ${className}`} />
    
    default:
      return (
        <div className={`${baseClasses} ${className}`}>
          <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      )
  }
}

// Specific loading components for common use cases
export function ProductCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <LoadingSkeleton key={i} variant="product" />
      ))}
    </div>
  )
}

export function ProductListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <LoadingSkeleton key={i} variant="list" />
      ))}
    </div>
  )
} 