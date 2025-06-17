import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sampleProducts } from '@/lib/data/sample-products'
import ProductDetailClient from './ProductDetailClient'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return sampleProducts.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = sampleProducts.find(p => p.slug === params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found - AyuraVeda Royale',
      description: 'The requested product could not be found.'
    }
  }

  return {
    title: `${product.name} - AyuraVeda Royale`,
    description: product.short_description,
    keywords: [
      product.name,
      typeof product.brand === 'string' ? product.brand : product.brand?.name || '',
      product.type || 'ayurvedic',
      'ayurvedic medicine',
      'natural health',
      ...product.ingredients.slice(0, 3)
    ].filter(Boolean).join(', '),
    openGraph: {
      title: `${product.name} - AyuraVeda Royale`,
      description: product.short_description,
      images: product.images?.map(img => ({
        url: img.image_url,
        alt: img.alt_text
      })) || [],
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = sampleProducts.find(p => p.slug === params.slug)
  
  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
} 