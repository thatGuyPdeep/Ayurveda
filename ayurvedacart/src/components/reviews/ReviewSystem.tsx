'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Filter,
  ChevronDown,
  Verified,
  Calendar,
  User,
  Flag,
  Heart,
  Share2
} from 'lucide-react'

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  helpful: number
  notHelpful: number
  images?: string[]
  pros: string[]
  cons: string[]
  wouldRecommend: boolean
  usage: {
    duration: string
    condition: string
    dosage: string
  }
}

interface ReviewSystemProps {
  productId: string
  productName: string
  averageRating: number
  totalReviews: number
  reviews: Review[]
  ratingDistribution: { [key: number]: number }
}

const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Priya Sharma',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: 'Excellent results for stress relief',
    content: 'I have been using this Ashwagandha for 3 months now and the results are amazing. My stress levels have significantly reduced and I sleep much better. The quality is top-notch and authentic.',
    date: '2024-01-10',
    verified: true,
    helpful: 24,
    notHelpful: 2,
    images: ['/api/placeholder/200/200'],
    pros: ['Effective for stress', 'Good quality', 'Fast delivery'],
    cons: ['Slightly expensive'],
    wouldRecommend: true,
    usage: {
      duration: '3 months',
      condition: 'Stress and anxiety',
      dosage: '2 capsules daily'
    }
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Rajesh Kumar',
    rating: 4,
    title: 'Good product, noticeable improvement',
    content: 'Started taking this for energy levels and immunity. After 6 weeks, I can feel the difference. Energy levels are more stable throughout the day.',
    date: '2024-01-05',
    verified: true,
    helpful: 18,
    notHelpful: 1,
    pros: ['Improved energy', 'Natural ingredients', 'No side effects'],
    cons: ['Takes time to show results', 'Large capsule size'],
    wouldRecommend: true,
    usage: {
      duration: '6 weeks',
      condition: 'Low energy and immunity',
      dosage: '1 capsule twice daily'
    }
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Meera Patel',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: 'Authentic Ayurvedic medicine',
    content: 'As someone who has been using Ayurvedic medicines for years, I can confirm this is authentic and high quality. The packaging is excellent and the product is fresh.',
    date: '2023-12-28',
    verified: true,
    helpful: 31,
    notHelpful: 0,
    pros: ['Authentic quality', 'Fresh product', 'Proper packaging'],
    cons: [],
    wouldRecommend: true,
    usage: {
      duration: '2 months',
      condition: 'General wellness',
      dosage: '1 capsule daily'
    }
  }
]

export default function ReviewSystem({
  productId,
  productName,
  averageRating,
  totalReviews,
  reviews = mockReviews,
  ratingDistribution = { 5: 65, 4: 20, 3: 10, 2: 3, 1: 2 }
}: ReviewSystemProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'>('newest')
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    content: '',
    pros: [''],
    cons: [''],
    wouldRecommend: true,
    usage: {
      duration: '',
      condition: '',
      dosage: ''
    }
  })

  const filteredReviews = reviews
    .filter(review => filterRating ? review.rating === filterRating : true)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'highest':
          return b.rating - a.rating
        case 'lowest':
          return a.rating - b.rating
        case 'helpful':
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    }

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < Math.floor(rating)
                ? 'text-saffron-500 fill-current'
                : 'text-charcoal/30'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-charcoal mb-6 font-display">
          Customer Reviews & Ratings
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="text-5xl font-bold text-charcoal">
                {averageRating.toFixed(1)}
              </div>
              <div>
                {renderStars(averageRating, 'lg')}
                <p className="text-charcoal/70 mt-1">
                  Based on {totalReviews.toLocaleString()} reviews
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                95% Recommend
              </span>
              <span className="bg-saffron-100 text-saffron-800 px-3 py-1 rounded-full text-sm font-medium">
                Verified Reviews
              </span>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="h-3 w-3 text-saffron-500 fill-current" />
                </div>
                
                <div className="flex-1 bg-sage-light rounded-full h-2">
                  <div
                    className="bg-saffron-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${ratingDistribution[rating] || 0}%` }}
                  />
                </div>
                
                <span className="text-sm text-charcoal/70 w-12 text-right">
                  {ratingDistribution[rating] || 0}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => setShowWriteReview(true)}
            className="flex-1 bg-emerald-800 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Write a Review
          </button>
          <button className="flex-1 border border-sage-dark text-charcoal py-3 px-6 rounded-xl font-semibold hover:bg-sage-light transition-colors flex items-center justify-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Reviews
          </button>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-sage-light border border-sage-dark rounded-xl px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-800"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/60 pointer-events-none" />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterRating(null)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filterRating === null
                    ? 'bg-emerald-800 text-white'
                    : 'bg-sage-light text-charcoal hover:bg-sage-dark'
                }`}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(rating)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1 ${
                    filterRating === rating
                      ? 'bg-emerald-800 text-white'
                      : 'bg-sage-light text-charcoal hover:bg-sage-dark'
                  }`}
                >
                  {rating}
                  <Star className="h-3 w-3 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-charcoal/70">
            Showing {filteredReviews.length} of {totalReviews} reviews
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl shadow-sm p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-sage-light rounded-full overflow-hidden">
                  {review.userAvatar ? (
                    <Image
                      src={review.userAvatar}
                      alt={review.userName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-6 w-6 text-charcoal/60" />
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-charcoal">{review.userName}</h4>
                    {review.verified && (
                      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg text-xs">
                        <Verified className="h-3 w-3" />
                        Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(review.rating, 'sm')}
                    <span className="text-sm text-charcoal/60 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <button className="text-charcoal/60 hover:text-charcoal p-2">
                <Flag className="h-4 w-4" />
              </button>
            </div>

            {/* Review Content */}
            <div className="space-y-4">
              <h5 className="font-semibold text-charcoal text-lg">{review.title}</h5>
              
              <p className="text-charcoal/70 leading-relaxed">{review.content}</p>

              {/* Usage Information */}
              <div className="bg-sage-light/50 rounded-xl p-4">
                <h6 className="font-medium text-charcoal mb-2">Usage Details</h6>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-charcoal/60">Duration:</span>
                    <span className="ml-2 font-medium">{review.usage.duration}</span>
                  </div>
                  <div>
                    <span className="text-charcoal/60">Condition:</span>
                    <span className="ml-2 font-medium">{review.usage.condition}</span>
                  </div>
                  <div>
                    <span className="text-charcoal/60">Dosage:</span>
                    <span className="ml-2 font-medium">{review.usage.dosage}</span>
                  </div>
                </div>
              </div>

              {/* Pros and Cons */}
              {(review.pros.length > 0 || review.cons.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {review.pros.length > 0 && (
                    <div>
                      <h6 className="font-medium text-emerald-800 mb-2 flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        Pros
                      </h6>
                      <ul className="space-y-1">
                        {review.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-charcoal/70 flex items-center gap-2">
                            <div className="w-1 h-1 bg-emerald-600 rounded-full" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {review.cons.length > 0 && (
                    <div>
                      <h6 className="font-medium text-red-600 mb-2 flex items-center gap-1">
                        <ThumbsDown className="h-4 w-4" />
                        Cons
                      </h6>
                      <ul className="space-y-1">
                        {review.cons.map((con, index) => (
                          <li key={index} className="text-sm text-charcoal/70 flex items-center gap-2">
                            <div className="w-1 h-1 bg-red-600 rounded-full" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto">
                  {review.images.map((image, index) => (
                    <div key={index} className="h-20 w-20 bg-sage-light rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={image}
                        alt={`Review image ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Recommendation */}
              {review.wouldRecommend && (
                <div className="flex items-center gap-2 text-emerald-600">
                  <Heart className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">Would recommend this product</span>
                </div>
              )}
            </div>

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-sage-light mt-4">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-charcoal/60 hover:text-emerald-600 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-1 text-charcoal/60 hover:text-red-600 transition-colors">
                  <ThumbsDown className="h-4 w-4" />
                  <span className="text-sm">Not Helpful ({review.notHelpful})</span>
                </button>
              </div>
              
              <button className="text-charcoal/60 hover:text-charcoal transition-colors">
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-8 py-3 border border-sage-dark text-charcoal rounded-xl hover:bg-sage-light transition-colors font-medium">
          Load More Reviews
        </button>
      </div>
    </div>
  )
} 