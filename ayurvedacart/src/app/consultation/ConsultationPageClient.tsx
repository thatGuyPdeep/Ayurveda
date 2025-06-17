'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  Calendar, 
  Clock, 
  Star, 
  Users, 
  Award,
  Heart,
  CheckCircle,
  Video,
  Phone,
  MessageCircle,
  Shield,
  Globe,
  Crown
} from 'lucide-react'

const doctors = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    qualification: 'BAMS, MD (Ayurveda)',
    specialization: 'Classical Ayurveda & Women\'s Health',
    experience: 15,
    rating: 4.9,
    consultations: 2500,
    languages: ['English', 'Hindi', 'Sanskrit'],
    fee: 1500,
    image: '/doctors/dr-priya-sharma.jpg',
    availability: 'Available Today',
    expertise: ['Gynecology', 'Classical Ayurveda', 'Panchakarma', 'Fertility'],
    bio: 'Dr. Priya Sharma is a renowned Ayurvedic physician with over 15 years of experience in classical Ayurveda and women\'s health. She specializes in treating hormonal imbalances, fertility issues, and reproductive health using traditional Ayurvedic methods.'
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    qualification: 'BAMS, PhD (Ayurveda)',
    specialization: 'Cardiology & Metabolic Disorders',
    experience: 20,
    rating: 4.8,
    consultations: 3200,
    languages: ['English', 'Hindi', 'Tamil'],
    fee: 2000,
    image: '/doctors/dr-rajesh-kumar.jpg',
    availability: 'Available Tomorrow',
    expertise: ['Cardiology', 'Diabetes', 'Hypertension', 'Obesity'],
    bio: 'Dr. Rajesh Kumar is a senior Ayurvedic cardiologist with 20 years of experience. He has successfully treated thousands of patients with heart conditions, diabetes, and metabolic disorders using authentic Ayurvedic protocols.'
  },
  {
    id: '3',
    name: 'Dr. Meera Nair',
    qualification: 'BAMS, MD (Kayachikitsa)',
    specialization: 'Dermatology & Skin Wellness',
    experience: 12,
    rating: 4.9,
    consultations: 1800,
    languages: ['English', 'Malayalam', 'Hindi'],
    fee: 1200,
    image: '/doctors/dr-meera-nair.jpg',
    availability: 'Available Today',
    expertise: ['Dermatology', 'Skin Care', 'Hair Care', 'Anti-aging'],
    bio: 'Dr. Meera Nair is a specialist in Ayurvedic dermatology with expertise in treating various skin conditions, hair problems, and anti-aging treatments using natural Ayurvedic remedies.'
  }
]

const consultationTypes = [
  {
    type: 'Video Consultation',
    icon: Video,
    duration: '30-45 minutes',
    description: 'Face-to-face consultation via secure video call',
    features: ['Detailed health assessment', 'Personalized treatment plan', 'Prescription & diet chart', 'Follow-up support'],
    popular: true
  },
  {
    type: 'Phone Consultation',
    icon: Phone,
    duration: '20-30 minutes',
    description: 'Voice consultation for quick health queries',
    features: ['Health guidance', 'Medicine recommendations', 'Lifestyle advice', 'Quick solutions']
  },
  {
    type: 'Chat Consultation',
    icon: MessageCircle,
    duration: '24 hours',
    description: 'Text-based consultation with detailed responses',
    features: ['Written health plan', 'Detailed explanations', 'Reference materials', 'Flexible timing']
  }
]

export function ConsultationPageClient() {
  const handleBookConsultation = (type?: string) => {
    alert(`Booking ${type || 'consultation'}... This feature will redirect to booking form.`)
  }

  const handleBookWithDoctor = (doctorName: string) => {
    alert(`Booking consultation with ${doctorName}... This feature will redirect to booking form.`)
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-saffron-500 text-white border-0 text-sm px-6 py-3 font-medium">
              <Crown className="w-4 h-4 mr-2" />
              Expert Ayurvedic Consultation
            </Badge>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Personalized Ayurvedic
              <br />
              <span className="text-saffron-300">Health Guidance</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with certified Ayurvedic doctors for personalized treatment plans, 
              lifestyle guidance, and authentic healing solutions tailored to your unique constitution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="bg-saffron-500 hover:bg-saffron-600 text-white text-lg px-10 py-4 h-auto font-semibold">
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-4 h-auto font-semibold border-2 border-white text-white hover:bg-white hover:text-emerald-600">
                <Users className="w-5 h-5 mr-2" />
                View Our Doctors
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-saffron-300 mb-2">50+</div>
                <div className="text-white/80 text-sm">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-saffron-300 mb-2">25K+</div>
                <div className="text-white/80 text-sm">Consultations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-saffron-300 mb-2">4.9</div>
                <div className="text-white/80 text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-saffron-300 mb-2">24/7</div>
                <div className="text-white/80 text-sm">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Choose Your Consultation Type
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible consultation options designed to fit your schedule and preferences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {consultationTypes.map((consultation, index) => (
              <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${consultation.popular ? 'ring-2 ring-saffron-500' : ''}`}>
                {consultation.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-saffron-500 text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <consultation.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl font-serif text-gray-900">
                    {consultation.type}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{consultation.duration}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6 text-center">
                    {consultation.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {consultation.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className={`w-full ${consultation.popular ? 'bg-saffron-500 hover:bg-saffron-600' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`} onClick={() => handleBookConsultation(consultation.type)}>
                    Choose This Option
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Expert Doctors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Certified Ayurvedic physicians with years of experience in traditional healing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-gray-400" />
                    </div>
                    
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-emerald-600 font-medium text-sm mb-2">
                      {doctor.qualification}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      {doctor.specialization}
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                      <span>{doctor.experience} years exp.</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{doctor.rating}</span>
                      </div>
                    </div>
                    
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs mb-4">
                      {doctor.availability}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Consultations:</span>
                      <span className="font-medium">{doctor.consultations.toLocaleString()}+</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Languages:</span>
                      <span className="font-medium">{doctor.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Consultation Fee:</span>
                      <span className="font-bold text-emerald-600">₹{doctor.fee}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-1">
                      {doctor.expertise.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm" onClick={() => handleBookWithDoctor(doctor.name)}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
              View All Doctors
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our Consultation?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Certified Experts
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All our doctors are certified Ayurvedic physicians with years of clinical experience and proven track records.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-saffron-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-saffron-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Personalized Care
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get customized treatment plans based on your unique constitution, lifestyle, and health goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Global Access
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with our doctors from anywhere in the world with secure, convenient online consultations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Healing Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Book your consultation today and take the first step towards optimal health with authentic Ayurvedic guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-saffron-500 hover:bg-saffron-600 text-white">
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat with Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 