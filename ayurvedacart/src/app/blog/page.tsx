import Link from 'next/link'
import Image from 'next/image'
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search, 
  Tag,
  BookOpen,
  Heart,
  Leaf,
  Star
} from 'lucide-react'

// Mock blog data
const featuredArticle = {
  id: '1',
  title: 'The Complete Guide to Ayurvedic Doshas: Understanding Your Body Constitution',
  excerpt: 'Discover how understanding your unique dosha can transform your health and wellness journey. Learn about Vata, Pitta, and Kapha constitutions.',
  content: 'Ayurveda, the ancient science of life, teaches us that each person has a unique constitution...',
  author: 'Dr. Priya Sharma',
  authorImage: '/api/placeholder/100/100',
  publishedAt: '2024-01-15',
  readTime: '8 min read',
  image: '/api/placeholder/800/400',
  category: 'Fundamentals',
  tags: ['Doshas', 'Constitution', 'Wellness', 'Ayurveda Basics'],
  featured: true
}

const blogPosts = [
  {
    id: '2',
    title: 'Ashwagandha: The Ultimate Stress-Busting Adaptogen',
    excerpt: 'Explore the science-backed benefits of Ashwagandha for stress relief, energy, and overall vitality.',
    author: 'Dr. Rajesh Kumar',
    authorImage: '/api/placeholder/100/100',
    publishedAt: '2024-01-12',
    readTime: '6 min read',
    image: '/api/placeholder/400/300',
    category: 'Herbs & Remedies',
    tags: ['Ashwagandha', 'Stress Relief', 'Adaptogens']
  },
  {
    id: '3',
    title: 'Seasonal Ayurvedic Eating: Winter Wellness Foods',
    excerpt: 'Discover warming foods and spices that support your body during the cold winter months.',
    author: 'Chef Meera Patel',
    authorImage: '/api/placeholder/100/100',
    publishedAt: '2024-01-10',
    readTime: '5 min read',
    image: '/api/placeholder/400/300',
    category: 'Nutrition',
    tags: ['Seasonal Eating', 'Winter Foods', 'Nutrition']
  },
  {
    id: '4',
    title: 'Morning Rituals: Starting Your Day the Ayurvedic Way',
    excerpt: 'Transform your mornings with ancient Ayurvedic practices for better health and mindfulness.',
    author: 'Dr. Anita Desai',
    authorImage: '/api/placeholder/100/100',
    publishedAt: '2024-01-08',
    readTime: '7 min read',
    image: '/api/placeholder/400/300',
    category: 'Lifestyle',
    tags: ['Morning Routine', 'Daily Practices', 'Wellness']
  },
  {
    id: '5',
    title: 'Turmeric: The Golden Spice of Healing',
    excerpt: 'Uncover the powerful anti-inflammatory and healing properties of turmeric in Ayurvedic medicine.',
    author: 'Dr. Vikram Singh',
    authorImage: '/api/placeholder/100/100',
    publishedAt: '2024-01-05',
    readTime: '6 min read',
    image: '/api/placeholder/400/300',
    category: 'Herbs & Remedies',
    tags: ['Turmeric', 'Anti-inflammatory', 'Healing']
  },
  {
    id: '6',
    title: 'Meditation and Mindfulness in Ayurveda',
    excerpt: 'Learn how meditation practices complement Ayurvedic healing for mental and emotional balance.',
    author: 'Swami Krishnananda',
    authorImage: '/api/placeholder/100/100',
    publishedAt: '2024-01-03',
    readTime: '9 min read',
    image: '/api/placeholder/400/300',
    category: 'Mental Wellness',
    tags: ['Meditation', 'Mindfulness', 'Mental Health']
  }
]

const categories = [
  { name: 'All Articles', count: 25, active: true },
  { name: 'Fundamentals', count: 8 },
  { name: 'Herbs & Remedies', count: 12 },
  { name: 'Nutrition', count: 6 },
  { name: 'Lifestyle', count: 9 },
  { name: 'Mental Wellness', count: 4 }
]

const popularTags = [
  'Ayurveda Basics', 'Stress Relief', 'Nutrition', 'Herbs', 'Meditation', 
  'Doshas', 'Seasonal Health', 'Daily Practices', 'Natural Healing'
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-display">
                Ayurveda Wisdom
              </h1>
            </div>
            
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Discover ancient wisdom for modern wellness. Expert insights, practical tips, 
              and authentic Ayurvedic knowledge to transform your health journey.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-6 py-4 rounded-2xl text-charcoal placeholder-charcoal/60 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-800 text-white rounded-xl hover:bg-emerald-700 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-saffron-500" />
                <h2 className="text-2xl font-bold text-charcoal font-display">
                  Featured Article
                </h2>
              </div>

              <article className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={featuredArticle.authorImage}
                        alt={featuredArticle.author}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="text-sm text-charcoal/70">{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-charcoal/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredArticle.readTime}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-charcoal mb-4 font-display">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-charcoal/70 mb-6 text-lg leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-sage-light text-charcoal/70 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${featuredArticle.id}`}
                    className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    Read Full Article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </div>

            {/* Recent Articles */}
            <div>
              <h2 className="text-2xl font-bold text-charcoal font-display mb-8">
                Recent Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 text-charcoal px-2 py-1 rounded-lg text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-xs text-charcoal/60">{post.author}</span>
                        <span className="text-xs text-charcoal/40">•</span>
                        <span className="text-xs text-charcoal/60">{post.readTime}</span>
                      </div>

                      <h3 className="font-bold text-charcoal mb-3 line-clamp-2 group-hover:text-emerald-800 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-charcoal/70 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-sage-light text-charcoal/60 px-2 py-1 rounded-lg text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-charcoal/60">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-emerald-800 hover:text-emerald-600 font-medium text-sm flex items-center gap-1"
                        >
                          Read More
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="px-8 py-3 border border-sage-dark text-charcoal rounded-xl hover:bg-sage-light transition-colors font-medium">
                  Load More Articles
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-charcoal text-lg mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-emerald-800" />
                Categories
              </h3>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      category.active
                        ? 'bg-emerald-800 text-white'
                        : 'hover:bg-sage-light text-charcoal/70'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-charcoal text-lg mb-4">
                Popular Tags
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    className="bg-sage-light hover:bg-emerald-100 text-charcoal/70 hover:text-emerald-800 px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="text-center">
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                
                <h3 className="font-bold text-lg mb-2">
                  Weekly Wellness Tips
                </h3>
                
                <p className="text-emerald-100 text-sm mb-4">
                  Get expert Ayurvedic insights delivered to your inbox every week.
                </p>
                
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl text-charcoal placeholder-charcoal/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="w-full bg-white text-emerald-800 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Products */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-charcoal text-lg mb-4 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-emerald-800" />
                Featured Products
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-16 w-16 bg-sage-light rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/api/placeholder/64/64"
                      alt="Ashwagandha Capsules"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-charcoal text-sm line-clamp-1">
                      Ashwagandha Premium
                    </h4>
                    <p className="text-xs text-charcoal/60 mb-1">
                      Stress relief & energy
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800">₹899</span>
                      <Link
                        href="/products/ashwagandha-premium"
                        className="text-xs bg-emerald-800 text-white px-2 py-1 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-16 w-16 bg-sage-light rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/api/placeholder/64/64"
                      alt="Triphala Churna"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-charcoal text-sm line-clamp-1">
                      Triphala Churna Organic
                    </h4>
                    <p className="text-xs text-charcoal/60 mb-1">
                      Digestive health
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800">₹449</span>
                      <Link
                        href="/products/triphala-churna"
                        className="text-xs bg-emerald-800 text-white px-2 py-1 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 