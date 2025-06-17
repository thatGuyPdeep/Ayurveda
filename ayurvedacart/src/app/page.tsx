import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getFeaturedSpecialties } from '@/lib/data/medical-specialties'
import { 
  CheckCircle, 
  Clock, 
  MessageCircle, 
  Shield,
  Award,
  Heart,
  Sparkles,
  Crown,
  Star,
  Truck,
  Users,
  Globe,
  Leaf,
  Phone,
  Mail,
  ArrowRight,
  Play
} from 'lucide-react'

export default function HomePage() {
  const featuredSpecialties = getFeaturedSpecialties()
  
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 border border-white/20 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-secondary-500 text-white border-0 text-sm px-6 py-3 font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Trusted by 10,000+ families worldwide
            </Badge>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Ancient Wisdom,
              <br />
              <span className="text-secondary-400 bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
                Modern Healing
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover authentic Ayurvedic wellness solutions, sourced from 5000-year-old traditions 
              and delivered to your modern lifestyle with scientific precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white text-lg px-10 py-4 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Heart className="w-5 h-5 mr-2" />
                Start Your Wellness Journey
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-4 h-auto font-semibold border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-300">
                <Play className="w-5 h-5 mr-2" />
                Free Ayurvedic Consultation
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary-300 mb-2">1000+</div>
                <div className="text-white/80 text-sm">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary-300 mb-2">50+</div>
                <div className="text-white/80 text-sm">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary-300 mb-2">24/7</div>
                <div className="text-white/80 text-sm">Expert Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary-300 mb-2">98%</div>
                <div className="text-white/80 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">
              Trusted by Leading Healthcare Institutions
            </h3>
            <p className="text-gray-600">Certified and recommended by Ayurvedic practitioners worldwide</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Placeholder for partner logos */}
            <div className="bg-gray-100 px-8 py-4 rounded-lg">
              <div className="text-gray-400 font-semibold">AYUSH Ministry</div>
            </div>
            <div className="bg-gray-100 px-8 py-4 rounded-lg">
              <div className="text-gray-400 font-semibold">WHO Certified</div>
            </div>
            <div className="bg-gray-100 px-8 py-4 rounded-lg">
              <div className="text-gray-400 font-semibold">ISO 9001</div>
            </div>
            <div className="bg-gray-100 px-8 py-4 rounded-lg">
              <div className="text-gray-400 font-semibold">GMP Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary-100 text-primary-700 border-0">
              <Crown className="w-4 h-4 mr-2" />
              Why Choose AyuraVeda Royale
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience the Perfect Blend of
              <br />
              <span className="text-primary-600">Ancient Wisdom & Modern Science</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our commitment to authenticity, quality, and your wellness journey sets us apart 
              in the world of Ayurvedic healthcare.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-serif text-gray-900">Authentic Purity</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Every product is sourced directly from certified Ayurvedic practitioners and 
                  undergoes rigorous quality testing to ensure 100% authenticity and purity.
                </p>
                <div className="flex items-center justify-center text-primary-600 font-semibold">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Lab Tested & Certified
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-serif text-gray-900">Global Delivery</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Fast and secure shipping to 50+ countries with real-time tracking. Get your wellness 
                  products delivered safely to your doorstep in 1-7 days.
                </p>
                <div className="flex items-center justify-center text-secondary-600 font-semibold">
                  <Truck className="w-5 h-5 mr-2" />
                  Express Worldwide Shipping
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-serif text-gray-900">Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Get personalized recommendations from certified Ayurvedic doctors and 
                  wellness experts available 24/7 for consultations and support.
                </p>
                <div className="flex items-center justify-center text-primary-600 font-semibold">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  24/7 Expert Consultation
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Medical Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-secondary-100 text-secondary-700 border-0">
              <Leaf className="w-4 h-4 mr-2" />
              Medical Specialties
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Shop by Medical Specialty
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find authentic Ayurvedic solutions tailored to your specific health needs, 
              backed by thousands of years of traditional wisdom.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
            {featuredSpecialties.map((specialty, index) => (
              <Link key={specialty.id} href={`/specialties/${specialty.slug}`}>
                <Card className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {specialty.icon}
                    </div>
                    <h3 className="font-serif font-semibold text-gray-900 mb-2 text-lg group-hover:text-primary-600 transition-colors">
                      {specialty.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{specialty.productCount}+ products</p>
                    <div className="flex items-center justify-center text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium mr-1">Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/specialties">
              <Button size="lg" variant="outline" className="px-10 py-4 text-lg font-semibold border-2 hover:bg-primary-50">
                <Leaf className="w-5 h-5 mr-2" />
                View All Specialties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary-100 text-primary-700 border-0">
              <Star className="w-4 h-4 mr-2" />
              Customer Stories
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transforming Lives Through
              <br />
              <span className="text-primary-600">Authentic Ayurveda</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from our customers who have experienced the healing power of traditional Ayurvedic medicine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                location: "New York, USA",
                rating: 5,
                text: "After struggling with digestive issues for years, AyuraVeda Royale's personalized treatment plan completely transformed my health. The consultation was thorough and the products are genuinely effective.",
                condition: "Digestive Health"
              },
              {
                name: "Dr. Rajesh Patel",
                location: "London, UK",
                rating: 5,
                text: "As a medical professional, I was skeptical initially. But the quality and authenticity of their Ayurvedic formulations impressed me. I now recommend them to my patients regularly.",
                condition: "Professional Endorsement"
              },
              {
                name: "Maria Rodriguez",
                location: "Barcelona, Spain",
                rating: 5,
                text: "The skin care products from their dermatology range worked wonders for my chronic eczema. Fast shipping to Europe and excellent customer support made the experience seamless.",
                condition: "Skin Health"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white p-8 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    <Badge className="mt-2 bg-primary-100 text-primary-700 text-xs">
                      {testimonial.condition}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary-100 text-primary-700 border-0">
              <MessageCircle className="w-4 h-4 mr-2" />
              Common Questions
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get answers to common questions about Ayurvedic medicine, our products, and services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {[
                {
                  question: "Are your Ayurvedic products authentic and safe?",
                  answer: "Yes, all our products are sourced directly from certified Ayurvedic practitioners and manufacturers. Each product undergoes rigorous quality testing and is certified by relevant authorities including AYUSH ministry approval."
                },
                {
                  question: "How do I know which products are right for my condition?",
                  answer: "Our qualified Ayurvedic doctors provide free consultations to assess your constitution (Prakriti) and current health status (Vikriti). They recommend personalized treatment plans based on traditional Ayurvedic principles."
                },
                {
                  question: "Do you ship internationally?",
                  answer: "Yes, we ship to 50+ countries worldwide. Shipping times vary by location (1-7 days typically) and we provide real-time tracking for all orders. Express shipping options are available."
                },
                {
                  question: "Are there any side effects to Ayurvedic medicines?",
                  answer: "When taken as prescribed, authentic Ayurvedic medicines have minimal side effects. However, we always recommend consulting with our doctors before starting any new treatment, especially if you have existing medical conditions or take other medications."
                },
                {
                  question: "What is your return and refund policy?",
                  answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return unopened products for a full refund. For opened products, we offer exchanges or store credit."
                }
              ].map((faq, index) => (
                <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/faq">
                <Button size="lg" variant="outline" className="px-10 py-4 text-lg font-semibold border-2 hover:bg-primary-50">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  View All FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white/20 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-secondary-500 text-white border-0 text-sm px-6 py-3">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Your Transformation Today
            </Badge>
            
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8">
              Ready to Start Your
              <br />
              <span className="text-secondary-400">Wellness Journey?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who have transformed their health with our 
              authentic Ayurvedic products and expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white text-lg px-10 py-4 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Heart className="w-5 h-5 mr-2" />
                Shop Premium Products
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-4 h-auto font-semibold border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-300">
                <Phone className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Button>
            </div>

            {/* Trust Elements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto pt-16 border-t border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">100% Authentic</h3>
                <p className="text-white/80 leading-relaxed">Certified by Ayurvedic practitioners and quality tested in our labs</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">Global Shipping</h3>
                <p className="text-white/80 leading-relaxed">Fast and secure delivery to 50+ countries with tracking</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">Expert Support</h3>
                <p className="text-white/80 leading-relaxed">24/7 Ayurvedic consultation and personalized guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
