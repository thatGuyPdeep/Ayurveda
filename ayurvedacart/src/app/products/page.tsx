import * as React from 'react'
import { Suspense } from 'react'
import { Metadata } from 'next'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'Premium Ayurvedic Products | AyuraVeda Royale',
  description: 'Discover premium Ayurvedic medicines, luxury supplements, and royal wellness products. Shop from our exclusive collection of traditional remedies and luxury formulations.',
  keywords: 'premium ayurvedic products, luxury herbal medicines, royal wellness supplements, ayurveda royale, premium wellness products'
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Suspense fallback={<ProductsPageSkeleton />}>
        <ProductsClient />
      </Suspense>
    </div>
  )
}

function ProductsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-sage-light rounded animate-pulse mb-2" />
        <div className="h-4 w-96 bg-sage-light rounded animate-pulse" />
      </div>

      <div className="flex gap-8">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block w-64 space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-24 bg-sage-light rounded animate-pulse" />
              <div className="space-y-2">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 w-32 bg-sage-light rounded animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid Skeleton */}
        <div className="flex-1">
          {/* Filters Bar Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-10 w-48 bg-sage-light rounded animate-pulse" />
            <div className="h-10 w-32 bg-sage-light rounded animate-pulse" />
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 space-y-4">
                <div className="aspect-square bg-sage-light rounded-xl animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-sage-light rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-sage-light rounded animate-pulse" />
                  <div className="h-6 w-1/3 bg-sage-light rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 