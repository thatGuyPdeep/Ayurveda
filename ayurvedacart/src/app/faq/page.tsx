'use client'

import { useState } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HelpCircle, 
  Package, 
  CreditCard, 
  Truck, 
  Shield,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react'

// FAQ Data
const faqCategories = [
  {
    id: 'general',
    name: 'General Questions',
    icon: HelpCircle,
    color: 'emerald',
    faqs: [
      {
        question: 'What is Ayurveda and how does it work?',
        answer: 'Ayurveda is a 5,000-year-old system of natural healing that originated in India. It focuses on balancing the three doshas (Vata, Pitta, Kapha) in your body through personalized diet, lifestyle, and herbal remedies. Our products are formulated based on these ancient principles to promote holistic wellness.'
      },
      {
        question: 'Are your products 100% natural and authentic?',
        answer: 'Yes, all our products are made from 100% natural ingredients sourced from certified organic farms. We work directly with traditional Ayurvedic manufacturers who follow ancient formulations and modern quality standards. Each product comes with authenticity certificates.'
      },
      {
        question: 'How do I know which products are right for me?',
        answer: 'We recommend taking our free Dosha Assessment quiz to understand your body constitution. You can also book a consultation with our certified Ayurvedic doctors who will provide personalized recommendations based on your health goals and current condition.'
      },
      {
        question: 'Can I take Ayurvedic medicines with modern medications?',
        answer: 'While Ayurvedic medicines are generally safe, we strongly recommend consulting with both your regular doctor and our Ayurvedic practitioners before combining treatments. Some herbs may interact with modern medications, so professional guidance is essential.'
      }
    ]
  },
  {
    id: 'products',
    name: 'Products & Usage',
    icon: Package,
    color: 'saffron',
    faqs: [
      {
        question: 'How long does it take to see results from Ayurvedic medicines?',
        answer: 'Ayurvedic medicines work gradually to address root causes rather than just symptoms. You may notice initial improvements within 2-4 weeks, with significant benefits typically seen after 2-3 months of consistent use. The timeline varies based on individual constitution and health condition.'
      },
      {
        question: 'What is the shelf life of your products?',
        answer: 'Most of our products have a shelf life of 2-3 years from the manufacturing date when stored properly. Each product label clearly mentions the expiry date. Store in a cool, dry place away from direct sunlight for maximum potency.'
      },
      {
        question: 'Do you offer products for specific health conditions?',
        answer: 'Yes, we have specialized product categories for various health concerns including digestive health, stress management, immunity, skin care, joint health, and more. Each product page includes detailed information about benefits and usage instructions.'
      },
      {
        question: 'Are there any side effects of Ayurvedic medicines?',
        answer: 'When used as directed, Ayurvedic medicines typically have minimal side effects. However, some people may experience mild digestive changes initially as the body adjusts. Always follow dosage instructions and consult our experts if you experience any unusual symptoms.'
      }
    ]
  },
  {
    id: 'orders',
    name: 'Orders & Shipping',
    icon: Truck,
    color: 'maroon',
    faqs: [
      {
        question: 'What are your shipping charges and delivery times?',
        answer: 'We offer free shipping on orders above ₹700. For orders below this amount, shipping charges are ₹50. Delivery typically takes 3-5 business days within India. Express delivery (1-2 days) is available in major cities for an additional charge.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to over 50 countries worldwide. International shipping charges and delivery times vary by destination. Please check our shipping policy page for detailed information about your country.'
      },
      {
        question: 'Can I track my order?',
        answer: 'Absolutely! Once your order is shipped, you\'ll receive a tracking number via email and SMS. You can track your order status in real-time through our website or the courier partner\'s tracking system.'
      },
      {
        question: 'What if my order arrives damaged or incorrect?',
        answer: 'We take great care in packaging, but if you receive a damaged or incorrect item, please contact us within 48 hours of delivery. We\'ll arrange for a replacement or refund immediately. Take photos of the damaged items to expedite the process.'
      }
    ]
  },
  {
    id: 'payments',
    name: 'Payments & Refunds',
    icon: CreditCard,
    color: 'emerald',
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods including UPI, credit/debit cards, net banking, and digital wallets. We also offer Cash on Delivery (COD) for orders within India. All payments are processed through secure, encrypted gateways.'
      },
      {
        question: 'Is it safe to make payments on your website?',
        answer: 'Yes, absolutely. We use industry-standard SSL encryption and partner with trusted payment gateways like Razorpay and Stripe. Your payment information is never stored on our servers and all transactions are fully secure.'
      },
      {
        question: 'What is your refund policy?',
        answer: 'We offer a 30-day money-back guarantee on all products. If you\'re not satisfied with your purchase, you can return unopened items within 30 days for a full refund. Opened products can be returned if they cause adverse reactions (with medical documentation).'
      },
      {
        question: 'How long does it take to process refunds?',
        answer: 'Refunds are processed within 5-7 business days after we receive the returned items. The amount will be credited back to your original payment method. For COD orders, we\'ll process a bank transfer to your provided account details.'
      }
    ]
  },
  {
    id: 'consultation',
    name: 'Consultation Services',
    icon: Shield,
    color: 'saffron',
    faqs: [
      {
        question: 'How does the online consultation work?',
        answer: 'Our online consultations are conducted via secure video calls with certified Ayurvedic doctors. You can book a 30-minute session where the doctor will assess your health, discuss your concerns, and provide personalized recommendations for diet, lifestyle, and herbal remedies.'
      },
      {
        question: 'What are the consultation fees?',
        answer: 'Initial consultations are ₹500 for 30 minutes. Follow-up sessions are ₹300 for 20 minutes. We also offer free 15-minute consultations for customers who purchase products worth ₹2000 or more.'
      },
      {
        question: 'Can I get a prescription during the consultation?',
        answer: 'Yes, our doctors can provide Ayurvedic prescriptions and recommend specific products from our catalog. They can also suggest lifestyle modifications and dietary changes based on your individual needs and health goals.'
      },
      {
        question: 'Do you offer consultations in regional languages?',
        answer: 'Yes, we have doctors who can consult in Hindi, English, Tamil, Telugu, Kannada, Malayalam, and Bengali. You can specify your preferred language when booking the consultation.'
      }
    ]
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFAQs, setOpenFAQs] = useState<string[]>([])

  const toggleFAQ = (categoryId: string, faqIndex: number) => {
    const faqId = `${categoryId}-${faqIndex}`
    setOpenFAQs(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    )
  }

  const filteredCategories = faqCategories.filter(category => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory) return false
    
    if (searchQuery) {
      return category.faqs.some(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return true
  })

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'bg-emerald-100 text-emerald-800',
      saffron: 'bg-saffron-100 text-saffron-800',
      maroon: 'bg-maroon-100 text-maroon-800'
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-emerald-100 text-emerald-800'
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-display">
                Frequently Asked Questions
              </h1>
            </div>
            
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Find answers to common questions about Ayurveda, our products, 
              shipping, and consultation services.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl text-charcoal placeholder-charcoal/60 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal/60" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-charcoal text-lg mb-4">
                Categories
              </h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-800 text-white'
                      : 'hover:bg-sage-light text-charcoal/70'
                  }`}
                >
                  All Categories
                </button>
                
                {faqCategories.map((category) => {
                  const CategoryIcon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        selectedCategory === category.id
                          ? 'bg-emerald-800 text-white'
                          : 'hover:bg-sage-light text-charcoal/70'
                      }`}
                    >
                      <CategoryIcon className="h-4 w-4" />
                      {category.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-charcoal text-lg mb-4">
                Still Need Help?
              </h3>
              
              <div className="space-y-3">
                <a
                  href="tel:+911234567890"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-sage-light transition-colors"
                >
                  <div className="h-8 w-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal text-sm">Call Us</p>
                    <p className="text-xs text-charcoal/60">+91 123 456 7890</p>
                  </div>
                </a>
                
                <a
                  href="mailto:support@ayurvedacart.com"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-sage-light transition-colors"
                >
                  <div className="h-8 w-8 bg-saffron-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-saffron-600" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal text-sm">Email Us</p>
                    <p className="text-xs text-charcoal/60">support@ayurvedacart.com</p>
                  </div>
                </a>
                
                <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-sage-light transition-colors w-full">
                  <div className="h-8 w-8 bg-maroon-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-maroon-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-charcoal text-sm">Live Chat</p>
                    <p className="text-xs text-charcoal/60">Available 9 AM - 9 PM</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - FAQ List */}
          <div className="lg:col-span-3">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-charcoal/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-charcoal mb-2">
                  No FAQs Found
                </h3>
                <p className="text-charcoal/60">
                  Try adjusting your search or browse different categories.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredCategories.map((category) => {
                  const CategoryIcon = category.icon
                  
                  return (
                    <div key={category.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      {/* Category Header */}
                      <div className="p-6 border-b border-sage-light">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${getColorClasses(category.color)}`}>
                            <CategoryIcon className="h-5 w-5" />
                          </div>
                          <h2 className="text-xl font-bold text-charcoal font-display">
                            {category.name}
                          </h2>
                        </div>
                      </div>

                      {/* FAQ Items */}
                      <div className="divide-y divide-sage-light">
                        {category.faqs
                          .filter(faq => 
                            !searchQuery || 
                            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((faq, index) => {
                            const faqId = `${category.id}-${index}`
                            const isOpen = openFAQs.includes(faqId)
                            
                            return (
                              <div key={index} className="p-6">
                                <button
                                  onClick={() => toggleFAQ(category.id, index)}
                                  className="w-full text-left flex items-center justify-between gap-4 group"
                                >
                                  <h3 className="font-semibold text-charcoal group-hover:text-emerald-800 transition-colors">
                                    {faq.question}
                                  </h3>
                                  {isOpen ? (
                                    <ChevronUp className="h-5 w-5 text-charcoal/60 flex-shrink-0" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-charcoal/60 flex-shrink-0" />
                                  )}
                                </button>
                                
                                {isOpen && (
                                  <div className="mt-4 text-charcoal/70 leading-relaxed">
                                    {faq.answer}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4 font-display">
            Couldn't Find What You're Looking For?
          </h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Our Ayurvedic experts are here to help. Get personalized guidance 
            and answers to your specific health questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-800 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
              Book Free Consultation
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 