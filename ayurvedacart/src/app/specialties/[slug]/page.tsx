import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { getSpecialtyBySlug, medicalSpecialties } from '@/lib/data/medical-specialties'
import { sampleProducts } from '@/lib/data/sample-products'
import { medicalProducts, getMedicalProductsBySpecialty } from '@/lib/data/medical-products'
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart,
  CheckCircle,
  Users,
  Award,
  Leaf
} from 'lucide-react'

interface SpecialtyPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return medicalSpecialties.map((specialty) => ({
    slug: specialty.slug,
  }))
}

export async function generateMetadata({ params }: SpecialtyPageProps): Promise<Metadata> {
  const specialty = getSpecialtyBySlug(params.slug)
  
  if (!specialty) {
    return {
      title: 'Specialty Not Found - AyuraVeda Royale',
    }
  }

  return {
    title: `${specialty.name} - Ayurvedic Medicines | AyuraVeda Royale`,
    description: `${specialty.description} - Browse our authentic ${specialty.name.toLowerCase()} products with ${specialty.productCount}+ medicines available.`,
  }
}

export default function SpecialtyPage({ params }: SpecialtyPageProps) {
  const specialty = getSpecialtyBySlug(params.slug)
  
  if (!specialty) {
    notFound()
  }

  // Get medical products for this specialty, fallback to sample products
  const medicalSpecialtyProducts = getMedicalProductsBySpecialty(specialty.slug)
  const products = medicalSpecialtyProducts.length > 0 
    ? medicalSpecialtyProducts.slice(0, 6)
    : sampleProducts.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-emerald-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/specialties" className="text-gray-500 hover:text-emerald-600">Specialties</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{specialty.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/specialties" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Specialties
            </Link>
            
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-3xl backdrop-blur-sm">
                {specialty.icon}
              </div>
              
              <div className="flex-1">
                <Badge className="mb-4 bg-saffron-500 text-white border-0">
                  {specialty.productCount}+ Products Available
                </Badge>
                
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                  {specialty.name}
                </h1>
                
                <p className="text-xl text-white/90 mb-6 leading-relaxed">
                  {specialty.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <Link href={`/products?specialty=${specialty.slug}`}>
                    <Button className="bg-saffron-500 hover:bg-saffron-600 text-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Shop Now
                    </Button>
                  </Link>
                  <Link href="/consultation">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                      <Users className="w-4 h-4 mr-2" />
                      Consult Doctor
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Key Benefits & Conditions Treated
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                  Health Benefits
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {specialty.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <Leaf className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 text-saffron-500 mr-2" />
                  Conditions Treated
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {specialty.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-saffron-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Featured Products
                </h2>
                <p className="text-gray-600">
                  Authentic Ayurvedic medicines for {specialty.name.toLowerCase()}
                </p>
              </div>
              
              <Link href={`/products?specialty=${specialty.slug}`}>
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                  View All Products
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <div className="text-4xl">🌿</div>
                    </div>
                    
                    {(product.discount_percentage || 0) > 0 && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        -{product.discount_percentage}%
                      </Badge>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {typeof product.brand === 'string' ? product.brand : product.brand?.name}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.short_description}
                    </p>
                    
                    {product.average_rating && (
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.round(product.average_rating!)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.review_count})
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-bold text-emerald-600 text-lg">
                        ₹{product.selling_price.toLocaleString()}
                      </span>
                      {product.base_price > product.selling_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.base_price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Link href={`/products/${product.slug}`}>
                        <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Need Expert Guidance for {specialty.name}?
            </h2>
            <p className="text-white/90 mb-8">
              Our certified Ayurvedic doctors specialize in {specialty.name.toLowerCase()} and can provide 
              personalized treatment recommendations based on your unique constitution and health needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-saffron-500 hover:bg-saffron-600 text-white">
                <Users className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Take Health Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 