import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { medicalSpecialties, getFeaturedSpecialties } from '@/lib/data/medical-specialties'
import { 
  Heart, 
  Sparkles, 
  ArrowRight, 
  Users, 
  CheckCircle,
  Star,
  Crown
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Medical Specialties - AyuraVeda Royale',
  description: 'Explore our comprehensive range of Ayurvedic medical specialties covering 17+ health categories.',
}

export default function SpecialtiesPage() {
  const featuredSpecialties = getFeaturedSpecialties()
  const allSpecialties = medicalSpecialties

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-saffron-500 text-white border-0 text-sm px-6 py-3 font-medium">
              <Crown className="w-4 h-4 mr-2" />
              17+ Medical Specialties
            </Badge>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Comprehensive Ayurvedic
              <br />
              <span className="text-saffron-300">Medical Specialties</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              From Classical Ayurveda to specialized treatments, discover authentic medicines 
              for every health condition, backed by 5000 years of wisdom.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Specialties */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Featured Medical Categories
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredSpecialties.map((specialty) => (
              <Card key={specialty.id} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl text-white">
                    {specialty.icon}
                  </div>
                  <CardTitle className="text-xl font-serif text-gray-900 text-center">
                    {specialty.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {specialty.description}
                  </p>
                  
                  <Link href={`/specialties/${specialty.slug}`}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      Explore Products
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 