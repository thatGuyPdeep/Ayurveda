import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Leaf, 
  Heart, 
  Sparkles, 
  Shield, 
  Droplet,
  Sun,
  Moon,
  Flower,
  Coffee,
  Baby,
  Users,
  ArrowRight,
  Activity,
  Brain,
  Bone,
  Wind,
  Plus,
  Smile,
  Eye,
  Scissors,
  Pill
} from 'lucide-react'
import { medicalCategories } from '@/lib/data/medical-products'

export const metadata: Metadata = {
  title: 'Medical Specialties | AyuraVeda Royale - Ayurvedic Medicine Categories',
  description: 'Explore our comprehensive range of Ayurvedic medicines organized by medical specialties including Andrology, Cardiology, Dermatology, and more.',
  keywords: 'ayurvedic medicine, medical specialties, categories, andrology, cardiology, dermatology, classical medicines'
}

// Icon mapping for medical specialties
const iconMapping: { [key: string]: any } = {
  'Male': Users,
  'Heart': Heart,
  'Droplets': Droplet,
  'Pill': Pill,
  'Users': Users,
  'Bone': Bone,
  'Wind': Wind,
  'Brain': Brain,
  'Activity': Activity,
  'Shield': Shield,
  'Droplet': Droplet,
  'Plus': Plus,
  'Leaf': Leaf,
  'Smile': Smile,
  'Eye': Eye,
  'Baby': Baby,
  'Scissors': Scissors
}

// Color scheme for categories
const colorSchemes = [
  'emerald', 'blue', 'purple', 'orange', 'pink', 'indigo', 'green', 'red', 'yellow',
  'teal', 'cyan', 'amber', 'lime', 'violet', 'rose', 'sky', 'slate'
]

function getColorClasses(color: string) {
  const colorMap: { [key: string]: string } = {
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    pink: 'bg-pink-100 text-pink-700 border-pink-200',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    teal: 'bg-teal-100 text-teal-700 border-teal-200',
    cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
    lime: 'bg-lime-100 text-lime-700 border-lime-200',
    violet: 'bg-violet-100 text-violet-700 border-violet-200',
    rose: 'bg-rose-100 text-rose-700 border-rose-200',
    sky: 'bg-sky-100 text-sky-700 border-sky-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200'
  }
  return colorMap[color] || 'bg-gray-100 text-gray-700 border-gray-200'
}

export default function CategoriesPage() {
  // Split medical categories into featured and specialized
  const featuredCategories = medicalCategories.slice(0, 8) // First 8 as featured
  const specializedCategories = medicalCategories.slice(8) // Rest as specialized

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Leaf className="h-6 w-6" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-display">
                Medical Specialties
              </h1>
            </div>
            
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Discover authentic Ayurvedic medicines organized by medical specialties, 
              each category featuring traditional formulations for specific health conditions.
            </p>

            <div className="flex justify-center items-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{medicalCategories.length}</div>
                <div className="text-emerald-200 text-sm">Specialties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-emerald-200 text-sm">Medicines</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-emerald-200 text-sm">Authentic</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">5000+</div>
                <div className="text-emerald-200 text-sm">Years Heritage</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Specialties */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal font-display mb-4">
              Primary Medical Specialties
            </h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              Our most comprehensive medical specialties with extensive product ranges for complete healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category, index) => {
              const Icon = iconMapping[category.icon] || Leaf
              const colorScheme = colorSchemes[index % colorSchemes.length] || 'emerald'
              
              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Image/Icon Section */}
                    <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-emerald-50">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="h-16 w-16 text-emerald-600" />
                      </div>
                      <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center ${getColorClasses(colorScheme)}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-emerald-800 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-charcoal/70 text-sm mb-4 line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-emerald-800 font-semibold">
                          {category.subcategories.length} Conditions
                        </span>
                        <ArrowRight className="h-4 w-4 text-charcoal/40 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Subcategories Preview */}
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                          <span
                            key={subIndex}
                            className={`text-xs px-2 py-1 rounded-full border ${getColorClasses(colorScheme)}`}
                          >
                            {sub}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                            +{category.subcategories.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Specialized Categories */}
        {specializedCategories.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charcoal font-display mb-4">
                Specialized Medicine Categories
              </h2>
              <p className="text-charcoal/70 max-w-2xl mx-auto">
                Targeted therapeutic solutions for specific health conditions and specialized care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specializedCategories.map((category, index) => {
                const Icon = iconMapping[category.icon] || Leaf
                const colorScheme = colorSchemes[(index + 8) % colorSchemes.length] || 'emerald'
                
                return (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getColorClasses(colorScheme)}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-charcoal mb-2 group-hover:text-emerald-800 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-charcoal/70 text-sm mb-3">
                            {category.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-emerald-800 font-medium">
                              {category.subcategories.length} Treatments
                            </span>
                            <ArrowRight className="h-4 w-4 text-charcoal/40 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Need Expert Consultation?
            </h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Our qualified Ayurvedic doctors can help you choose the right medicines 
              based on your specific health condition and constitution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-white text-emerald-800 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                <Heart className="h-5 w-5" />
                Book Consultation
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                <Coffee className="h-5 w-5" />
                Contact Expert
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 