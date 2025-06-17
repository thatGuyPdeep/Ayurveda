import * as React from 'react'
import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'About Us | AyuraVeda Royale',
  description: 'Discover AyuraVeda Royale\'s royal mission to bring premium Ayurvedic wellness solutions to modern life. Learn about our commitment to luxury, tradition, and royal holistic health.',
  keywords: 'about ayurveda royale, premium ayurvedic company, royal wellness, luxury holistic health, authentic premium ayurveda'
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About AyuraVeda Royale
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Bridging ancient Ayurvedic wisdom with royal wellness luxury, 
              we're your premium partner in holistic health and royal well-being.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Card variant="wellness" className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-charcoal mb-4">Our Mission</h2>
              <p className="text-charcoal/80 leading-relaxed">
                To make premium Ayurvedic wellness accessible to discerning individuals by providing 
                luxury, traditional remedies backed by royal heritage and modern science, delivered 
                with royal care to your doorstep.
              </p>
            </div>
          </Card>

          <Card variant="golden" className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">👁️</span>
              </div>
              <h2 className="text-2xl font-bold text-charcoal mb-4">Our Vision</h2>
              <p className="text-charcoal/80 leading-relaxed">
                To become the world's most prestigious platform for royal Ayurvedic wellness, 
                where ancient wisdom meets luxury convenience, empowering discerning individuals 
                to live healthier, more balanced, and royal lives.
              </p>
            </div>
          </Card>
        </div>

        {/* Our Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-charcoal mb-12">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-charcoal/80">
              <p className="text-lg leading-relaxed mb-6">
                AyuraVeda Royale was born from a simple yet profound realization: in our fast-paced modern world, 
                we've lost touch with the timeless wisdom of royal Ayurveda. Founded by a team of wellness connoisseurs 
                and master Ayurvedic practitioners, we set out to bridge this gap with luxury and authenticity.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our journey began when our founder, struggling with modern lifestyle ailments, discovered the 
                transformative power of premium Ayurvedic remedies. However, finding genuine, luxury-quality 
                products was a challenge. This experience sparked the idea for AyuraVeda Royale.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we work directly with certified Ayurvedic manufacturers, traditional practitioners, 
                and organic farmers to source the finest ingredients and formulations. Every product in our 
                catalog is carefully vetted for authenticity, quality, and efficacy.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-charcoal mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated" className="p-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">Authenticity</h3>
              <p className="text-charcoal/70">
                We source only genuine, traditional formulations from certified manufacturers 
                who follow ancient Ayurvedic principles.
              </p>
            </Card>

            <Card variant="elevated" className="p-6 text-center">
              <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">Quality</h3>
              <p className="text-charcoal/70">
                Every product undergoes rigorous quality testing and meets international 
                standards for purity and potency.
              </p>
            </Card>

            <Card variant="elevated" className="p-6 text-center">
              <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">Trust</h3>
              <p className="text-charcoal/70">
                We build lasting relationships with our customers through transparency, 
                expert guidance, and exceptional service.
              </p>
            </Card>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-20">
          <div className="bg-sage-light/30 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-charcoal mb-8">
              Certifications & Compliance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Badge variant="emerald" className="mb-2 text-sm px-3 py-1">
                  AYUSH Ministry
                </Badge>
                <p className="text-sm text-charcoal/70">Certified by Ministry of AYUSH, Government of India</p>
              </div>
              <div className="text-center">
                <Badge variant="golden" className="mb-2 text-sm px-3 py-1">
                  ISO 9001:2015
                </Badge>
                <p className="text-sm text-charcoal/70">Quality Management System Certified</p>
              </div>
              <div className="text-center">
                <Badge variant="maroon" className="mb-2 text-sm px-3 py-1">
                  GMP Certified
                </Badge>
                <p className="text-sm text-charcoal/70">Good Manufacturing Practices Compliant</p>
              </div>
              <div className="text-center">
                <Badge variant="success" className="mb-2 text-sm px-3 py-1">
                  WHO Standards
                </Badge>
                <p className="text-sm text-charcoal/70">World Health Organization Guidelines</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-charcoal mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card variant="elevated" className="p-8 text-center">
              <div className="w-24 h-24 bg-emerald-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-emerald-800">R</span>
              </div>
              <h3 className="text-2xl font-semibold text-charcoal mb-2">Raj</h3>
              <p className="text-saffron-600 font-medium mb-4">Co-Founder, CEO</p>
              <p className="text-charcoal/70 leading-relaxed">
                Passionate entrepreneur with deep expertise in Ayurvedic wellness and business strategy. 
                Raj leads the vision to make authentic Ayurveda accessible globally while maintaining 
                traditional standards and quality.
              </p>
            </Card>

            <Card variant="elevated" className="p-8 text-center">
              <div className="w-24 h-24 bg-saffron-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-saffron-800">PD</span>
              </div>
              <h3 className="text-2xl font-semibold text-charcoal mb-2">Prabhakar Deep</h3>
              <p className="text-saffron-600 font-medium mb-4">Co-Founder, CTO</p>
              <p className="text-charcoal/70 leading-relaxed">
                Technology visionary combining software engineering expertise with passion for traditional wellness. 
                Prabhakar leads technical innovation, ensuring seamless user experiences and robust platform architecture.
              </p>
            </Card>
          </div>
        </section>

        {/* Additional Team Section */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-center text-charcoal mb-8">
            Our Expert Advisory Team
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="elevated" className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold text-emerald-800">DR</span>
              </div>
              <h4 className="text-lg font-semibold text-charcoal mb-2">Dr. Priya Sharma</h4>
              <p className="text-saffron-600 font-medium mb-3">Chief Ayurvedic Officer</p>
              <p className="text-charcoal/70 text-sm">
                Pharmaceutical expert ensuring every product meets the highest standards 
                of quality and safety.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
} 