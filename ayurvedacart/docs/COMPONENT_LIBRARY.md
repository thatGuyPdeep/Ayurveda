# AyurvedaCart Component Library - Ayurvedic Theme

*⚠️ IMPORTANT: This document has been updated to reflect the new Ayurvedic theme. For complete implementation details, see [THEME.MD](./THEME.MD).*

This document outlines the component patterns, design principles, and implementation guidelines for AyurvedaCart's authentic Ayurvedic wellness platform.

## Ayurvedic Design Principles

### 1. Ancient Wisdom, Modern Healing
- **Authentic Aesthetics**: Deep emerald greens, royal saffron, and reddish maroon reflecting traditional Ayurvedic heritage
- **Universal Access**: WCAG 2.1 AA compliance with tested contrast ratios (15.2:1 charcoal on ivory)
- **Intuitive Experience**: Clean, stress-free interfaces using dopamine-stimulating design psychology

### 2. Wellness-Focused Design
- **Calming Colors**: Ivory backgrounds and sage accents that reduce anxiety and promote wellbeing
- **Dopamine Triggers**: Strategic use of warm saffron (#F5B000) for optimism and engagement
- **Natural Harmony**: Earth-toned palette with organic, rounded corners for comfort

### 3. Trust Through Authenticity
- **Cultural Respect**: Authentic Ayurvedic color psychology without appropriation
- **Visual Hierarchy**: Clear information architecture using Playfair Display and Lato fonts
- **Quality Indicators**: Maroon accents for premium trust elements and traditional credibility

### 4. Conversion Optimization
- **Compelling CTAs**: Saffron-colored action buttons that trigger dopamine and encourage action
- **Strategic Psychology**: Color combinations designed to build trust while stimulating engagement
- **Social Proof**: Elegant testimonials with authentic Ayurvedic styling

## Core UI Components

### Buttons (Updated for Ayurvedic Theme)

*🔄 **Status**: Updated to match new theme implementation*

#### Primary CTA Button (Saffron - Dopamine Trigger)
```tsx
<Button className="bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
  <ShoppingCart className="mr-2 h-5 w-5" />
  Start Your Wellness Journey
</Button>
```
- **Use Case**: Primary actions, main CTAs, "Add to Cart", "Buy Now"
- **Color**: Saffron (#F5B000) - Dopamine stimulating, optimism trigger
- **Psychology**: Warm golden yellow encourages action and positivity
- **States**: Default, hover (darker saffron), active (scale 95%), disabled (opacity 50%)

#### Secondary Button (Emerald - Trust & Healing)
```tsx
<Button className="bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200">
  <Heart className="mr-2 h-4 w-4" />
  Free Ayurvedic Consultation
</Button>
```
- **Use Case**: Wellness-focused actions, consultations, secondary CTAs
- **Color**: Deep Emerald (#014421) - Trust, healing, nature
- **Psychology**: Natural green builds trust and suggests healing
- **Context**: Health consultations, wellness programs

#### Premium Button (Maroon - Luxury & Trust)
```tsx
<Button className="bg-maroon-800 hover:bg-maroon-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200">
  <Crown className="mr-2 h-4 w-4" />
  Premium Membership
</Button>
```
- **Use Case**: Premium services, exclusive offers, membership
- **Color**: Reddish Maroon (#8B1E3F) - Luxury, tradition, credibility
- **Psychology**: Deep red-purple suggests premium quality and tradition

#### Outline Button (Charcoal - Information)
```tsx
<Button className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory px-6 py-3 rounded-xl font-medium transition-all duration-200">
  Learn More About Ayurveda
</Button>
```
- **Use Case**: Secondary actions, exploratory navigation, educational content
- **Styling**: Charcoal border with fill-on-hover for clear hierarchy
- **Accessibility**: High contrast (15.2:1) for visibility

#### Ghost Button (Sage - Subtle Actions)
```tsx
<Button className="text-charcoal hover:bg-sage-light px-4 py-2 rounded-lg font-medium transition-all duration-200">
  <User className="h-4 w-4" />
</Button>
```
- **Use Case**: Navigation elements, subtle actions, icon buttons
- **Styling**: Minimal design with sage background on hover
- **Context**: User menu, settings, navigation

### Cards

#### Product Card
```tsx
interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    discountedPrice?: number
    imageUrl: string
    rating: number
    reviewCount: number
    inStock: boolean
  }
}

const ProductCard = ({ product }: ProductCardProps) => (
  <div className="bg-white rounded-2xl shadow-soft hover:shadow-royal transition-all duration-300 overflow-hidden group hover:-translate-y-1">
    <div className="relative">
      <img 
        src={product.imageUrl} 
        alt={product.name}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {product.discountedPrice && (
        <div className="absolute top-3 left-3 bg-discount text-white px-2 py-1 rounded-lg text-xs font-semibold">
          SAVE ${(product.price - product.discountedPrice).toFixed(2)}
        </div>
      )}
    </div>
    
    <div className="p-6">
      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      
      <div className="flex items-center mb-3">
        <div className="flex text-rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < product.rating ? 'fill-current' : 'stroke-current opacity-30'}`} />
          ))}
        </div>
        <span className="text-sm text-muted-foreground ml-2">({product.reviewCount})</span>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {product.discountedPrice ? (
            <>
              <span className="text-lg font-bold text-price">${product.discountedPrice}</span>
              <span className="text-sm text-muted-foreground line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-price">${product.price}</span>
          )}
        </div>
        
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
          product.inStock 
            ? 'bg-availability-in-stock/10 text-availability-in-stock' 
            : 'bg-availability-out-of-stock/10 text-availability-out-of-stock'
        }`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>
      
      <Button 
        className="w-full bg-add-to-cart hover:opacity-90"
        disabled={!product.inStock}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  </div>
)
```

#### Category Card
```tsx
interface CategoryCardProps {
  category: {
    name: string
    slug: string
    productCount: number
    specialty: string
  }
  colorIndex: number
}

const CategoryCard = ({ category, colorIndex }: CategoryCardProps) => {
  const gradients = ['gradient-royal', 'gradient-healing', 'gradient-warm']
  const shadows = ['shadow-royal', 'shadow-healing', 'shadow-warm']
  
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-royal transition-all duration-300 text-center group hover:-translate-y-1"
    >
      <div className={`w-12 h-12 bg-${gradients[colorIndex % 3]} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${shadows[colorIndex % 3]}`}>
        <span className="text-white font-bold text-lg">
          {category.name.charAt(0)}
        </span>
      </div>
      <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors mb-1">
        {category.name}
      </h3>
      <p className="text-xs text-muted-foreground">
        {category.productCount} products
      </p>
    </Link>
  )
}
```

#### Testimonial Card
```tsx
interface TestimonialCardProps {
  testimonial: {
    content: string
    author: string
    location: string
    rating: number
    avatar?: string
  }
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <div className="bg-wellness-calm/30 p-6 rounded-2xl shadow-soft hover:shadow-healing transition-all duration-300">
    <div className="flex text-rating mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : 'stroke-current opacity-30'}`} />
      ))}
    </div>
    
    <blockquote className="text-foreground mb-4 leading-relaxed">
      "{testimonial.content}"
    </blockquote>
    
    <div className="flex items-center">
      {testimonial.avatar ? (
        <img 
          src={testimonial.avatar} 
          alt={testimonial.author}
          className="w-10 h-10 rounded-full mr-3"
        />
      ) : (
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-semibold text-sm">
            {testimonial.author.charAt(0)}
          </span>
        </div>
      )}
      <div>
        <div className="font-semibold text-foreground text-sm">{testimonial.author}</div>
        <div className="text-muted-foreground text-xs">{testimonial.location}</div>
      </div>
    </div>
  </div>
)
```

### Form Components

#### Input Field
```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, icon, className, ...props }, ref) => {
    const id = props.id || props.name
    
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            id={id}
            className={cn(
              "w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
              "transition-all duration-200",
              "placeholder:text-muted-foreground",
              error && "border-destructive focus:ring-destructive focus:border-destructive",
              icon && "pl-10",
              className
            )}
            {...props}
          />
        </div>
        
        {(helperText || error) && (
          <p className={cn(
            "text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
```

### Navigation Components

#### Header Navigation
```tsx
const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-soft">
    <div className="container mx-auto px-4">
      <div className="flex h-16 items-center justify-between">
        {/* Royal Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-royal rounded-xl flex items-center justify-center shadow-royal">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl text-primary">AyurvedaCart</span>
            <span className="text-xs text-muted-foreground font-medium">Royal Wellness</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search authentic medicines & wellness..."
              className="w-full pl-10 pr-4 py-2.5 border border-input rounded-xl bg-wellness-calm/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>
        </div>

        {/* Navigation & Actions */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/products" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/categories" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/consultations" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Consultation
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="hover:bg-wellness-calm">
            <User className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-wellness-calm relative">
            <ShoppingCart className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary text-xs font-bold text-secondary-foreground rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          <Button size="sm" className="bg-gradient-royal hover:opacity-90 shadow-royal">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  </header>
)
```

## Animation & Micro-interactions

### Hover Effects
```css
/* Card hover animations */
.card-hover {
  @apply transition-all duration-300 hover:shadow-royal hover:-translate-y-1;
}

/* Button scaling */
.button-press {
  @apply active:scale-[0.98] transition-transform duration-100;
}

/* Icon hover scaling */
.icon-hover {
  @apply transition-transform duration-200 hover:scale-110;
}
```

### Loading States
```tsx
const LoadingButton = ({ loading, children, ...props }: ButtonProps) => (
  <Button {...props} disabled={loading}>
    {loading ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Processing...
      </>
    ) : (
      children
    )}
  </Button>
)

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-muted rounded-xl h-48 mb-4"></div>
    <div className="bg-muted rounded-lg h-4 mb-2 w-3/4"></div>
    <div className="bg-muted rounded-lg h-4 mb-4 w-1/2"></div>
    <div className="bg-muted rounded-xl h-10"></div>
  </div>
)
```

## Responsive Design Patterns

### Container Queries
```tsx
const ResponsiveGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {children}
  </div>
)
```

### Mobile-First Breakpoints
```css
/* Mobile: 320px - 640px */
.mobile-layout {
  @apply px-4 py-6;
}

/* Tablet: 640px - 1024px */
.tablet-layout {
  @apply sm:px-6 sm:py-8;
}

/* Desktop: 1024px+ */
.desktop-layout {
  @apply lg:px-8 lg:py-12;
}
```

## Accessibility Guidelines

### Color Contrast
- **Primary Text**: 7:1 contrast ratio (AAA)
- **Secondary Text**: 4.5:1 contrast ratio (AA)
- **Interactive Elements**: Clear focus indicators
- **Color Independence**: Information not conveyed by color alone

### Keyboard Navigation
- **Tab Order**: Logical navigation sequence
- **Focus Indicators**: Visible focus rings with royal styling
- **Skip Links**: Allow users to skip to main content
- **Keyboard Shortcuts**: Common shortcuts for power users

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Descriptive labels for complex interactions
- **Live Regions**: Dynamic content announcements
- **Alternative Text**: Meaningful image descriptions

## Performance Optimization

### Image Optimization
```tsx
import Image from 'next/image'

const OptimizedImage = ({ src, alt, ...props }) => (
  <Image
    src={src}
    alt={alt}
    loading="lazy"
    quality={85}
    formats={['webp', 'avif']}
    {...props}
  />
)
```

### Component Lazy Loading
```tsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

const LazyWrapper = () => (
  <Suspense fallback={<LoadingSkeleton />}>
    <HeavyComponent />
  </Suspense>
)
```

### Bundle Optimization
- **Code Splitting**: Route and component-based splitting
- **Tree Shaking**: Eliminate unused code
- **Dynamic Imports**: Load components on demand
- **Image Formats**: WebP and AVIF for modern browsers

## Testing Patterns

### Component Testing
```tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button Component', () => {
  it('renders with royal styling by default', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('bg-gradient-royal')
  })

  it('handles loading state correctly', () => {
    render(<Button loading>Processing</Button>)
    expect(screen.getByText(/processing/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### Visual Regression Testing
```tsx
// Storybook stories for visual testing
export const RoyalButton = () => (
  <div className="p-8 space-y-4">
    <Button variant="default">Royal Primary</Button>
    <Button variant="secondary">Healing Gold</Button>
    <Button variant="healing">Wellness Green</Button>
    <Button variant="outline">Outline Style</Button>
  </div>
)
```

### Accessibility Testing
```tsx
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

it('has no accessibility violations', async () => {
  const { container } = render(<ProductCard product={mockProduct} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

---

This component library forms the foundation of AyurvedaCart's royal wellness experience. Each component is designed to convey luxury, build trust, and guide users toward their wellness goals while maintaining the highest standards of accessibility and performance. 