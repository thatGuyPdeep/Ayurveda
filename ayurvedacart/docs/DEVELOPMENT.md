# AyurvedaCart Development Guide

## Project Overview

AyurvedaCart is a premium global e-commerce platform specializing in authentic Ayurvedic medicines and wellness products. We deliver royal-quality healing solutions with luxury service standards, serving customers in 50+ countries with 1-7 day delivery.

### Royal Wellness Philosophy
- **Royal Authenticity**: Premium quality products verified by ancient traditions
- **Luxury Service**: White-glove customer experience worthy of royalty  
- **Global Healing**: Making Ayurvedic wellness accessible worldwide
- **Expert Guidance**: Certified Ayurvedic masters for personalized consultations

## Technology Stack

### Frontend
- **Next.js 14+**: App Router, Server Components, TypeScript
- **React 18+**: Latest features with concurrent rendering
- **Tailwind CSS**: Royal design system with custom color palette
- **Framer Motion**: Smooth animations and micro-interactions
- **Zustand**: Lightweight state management
- **React Query**: Server state management and caching
- **React Hook Form + Zod**: Form handling with validation

### Backend & Database
- **Supabase**: PostgreSQL database with real-time capabilities
- **Row Level Security (RLS)**: Database-level security policies
- **Edge Functions**: Serverless API endpoints
- **Storage**: Secure file uploads for product images

### Deployment & DevOps
- **Vercel**: Edge deployment with CDN
- **Environment Management**: Development, staging, production
- **Analytics**: User behavior and conversion tracking

## Royal Design System

### Color Palette

Our royal, healing color scheme creates luxury while maintaining accessibility and trust:

#### Primary Colors
- **Royal Purple**: `#6B46C1` - Primary brand color (trust, luxury, wisdom)
- **Royal Purple Light**: `#8B5CF6` - Hover states and accents
- **Royal Purple Dark**: `#553C9A` - Active states and emphasis

#### Secondary Colors  
- **Healing Gold**: `#F59E0B` - Premium actions and highlights
- **Healing Gold Light**: `#FCD34D` - Warm backgrounds
- **Healing Gold Dark**: `#D97706` - Active gold elements

#### Accent Colors
- **Emerald Green**: `#10B981` - Success, nature, wellness
- **Soft Lavender**: `#A78BFA` - Calm, serenity, healing
- **Deep Indigo**: `#4338CA` - Authority, trust, premium

#### Wellness Backgrounds
- **Calm**: `#E0E7FF` - Very light purple backgrounds
- **Peace**: `#F3F4F6` - Soft gray sections
- **Warmth**: `#FEF3C7` - Warm cream backgrounds  
- **Trust**: `#DBEAFE` - Light blue for trust elements

#### E-commerce Specific
- **Price**: `#059669` - Deep emerald for pricing
- **Discount**: `#DC2626` - Red for discounts and urgency
- **Rating**: `#F59E0B` - Gold for star ratings
- **In Stock**: `#10B981` - Emerald for availability
- **Add to Cart**: `#6B46C1` - Royal purple for primary CTA
- **Buy Now**: `#F59E0B` - Gold for urgent purchase actions

### Typography

#### Font Stack
- **Display Font**: Merriweather (serif) - For headings and royal branding
- **Body Font**: Inter (sans-serif) - For readable body text
- **Code Font**: JetBrains Mono - For technical content

#### Type Scale
- **Display Large**: 60px - Hero headlines
- **Display Medium**: 48px - Major section headers
- **Display Small**: 36px - Page titles
- **H1-H6**: 40px down to 18px - Content hierarchy
- **Body**: 16px - Default text size
- **Small**: 14px - Secondary information
- **Caption**: 12px - Metadata and labels

### Spacing & Layout

#### Container Widths
- **Max Width**: 1200px - Main content container
- **Breakpoints**: Mobile-first responsive design
- **Padding**: Consistent 16px mobile, 24px tablet, 32px desktop

#### Grid System
- **Columns**: 12-column grid system
- **Gaps**: 16px mobile, 24px tablet, 32px desktop
- **Components**: Flexible card-based layouts

### Components

#### Buttons
- **Primary**: Royal purple gradient with shadow
- **Secondary**: Healing gold gradient  
- **Outline**: Border with hover fill
- **Ghost**: Transparent with subtle hover
- **Healing**: Emerald gradient for wellness actions
- **Sizes**: Small (32px), Default (44px), Large (48px)

#### Cards
- **Product Cards**: White background with soft shadows
- **Category Cards**: Gradient backgrounds with hover animations  
- **Info Cards**: Light purple/cream backgrounds
- **Testimonial Cards**: Royal styling with elegant typography

#### Forms
- **Inputs**: Rounded corners with focus states
- **Labels**: Clear hierarchy and accessibility
- **Validation**: Inline error messaging
- **Success States**: Emerald green feedback

## Database Architecture

### Core Tables

#### Users
```sql
users (
  id: uuid primary key,
  email: varchar unique not null,
  full_name: varchar,
  phone: varchar,
  avatar_url: varchar,
  role: user_role default 'customer',
  created_at: timestamp,
  updated_at: timestamp
)
```

#### Products  
```sql
products (
  id: uuid primary key,
  name: varchar not null,
  description: text,
  price: decimal not null,
  discounted_price: decimal,
  category_id: uuid references categories(id),
  brand_id: uuid references brands(id),
  sku: varchar unique,
  stock_quantity: integer default 0,
  is_active: boolean default true,
  images: text[], -- Array of image URLs
  ingredients: text[],
  benefits: text[],
  usage_instructions: text,
  contraindications: text,
  created_at: timestamp,
  updated_at: timestamp
)
```

#### Categories
```sql
categories (
  id: uuid primary key,
  name: varchar not null,
  slug: varchar unique not null,
  description: text,
  image_url: varchar,
  parent_id: uuid references categories(id),
  specialty: medical_specialty,
  is_active: boolean default true,
  sort_order: integer,
  created_at: timestamp
)
```

#### Orders
```sql
orders (
  id: uuid primary key,
  user_id: uuid references users(id),
  order_number: varchar unique not null,
  status: order_status default 'pending',
  subtotal: decimal not null,
  tax_amount: decimal default 0,
  shipping_amount: decimal default 0,
  total_amount: decimal not null,
  currency: varchar(3) default 'USD',
  shipping_address: jsonb,
  billing_address: jsonb,
  payment_method: payment_method,
  payment_status: payment_status default 'pending',
  notes: text,
  created_at: timestamp,
  updated_at: timestamp
)
```

### Medical Specialties

Our platform serves 17 specialized medical categories:

1. **Cardiology** - Heart and cardiovascular health
2. **Dermatology** - Skin conditions and treatments  
3. **Gynecology** - Women's reproductive health
4. **Classical** - Traditional Ayurvedic formulations
5. **Gastroenterology** - Digestive system health
6. **General Medicine** - Common health conditions
7. **Neurology** - Nervous system and mental health
8. **Orthopedics** - Bone and joint health
9. **Endocrinology** - Hormonal balance
10. **Hepatology** - Liver health and detox
11. **Nephrology** - Kidney and urinary health
12. **Pulmonology** - Respiratory health
13. **Immunology** - Immune system support
14. **Pediatrics** - Children's health
15. **Geriatrics** - Elder care and longevity
16. **Oncology** - Cancer care support
17. **Psychiatry** - Mental wellness and stress

## Business Logic

### Product Management
- **Inventory Tracking**: Real-time stock management
- **Pricing Rules**: Dynamic pricing with discounts
- **Categorization**: Hierarchical categories by specialty
- **Quality Assurance**: Verification workflow for authenticity

### Order Processing
- **Multi-Currency**: Support for global currencies
- **Shipping Calculation**: Zone-based shipping rates
- **Tax Handling**: Location-based tax calculation
- **Order Tracking**: Real-time delivery updates

### Customer Experience
- **Personalization**: AI-powered product recommendations
- **Consultation Booking**: Expert Ayurvedic consultations
- **Loyalty Program**: Points-based rewards system
- **Reviews & Ratings**: Community-driven product feedback

### Global Operations
- **Multi-Language**: Content localization
- **Regional Compliance**: Health regulations by country
- **Currency Support**: Local payment methods
- **Shipping Zones**: Optimized delivery networks

## Development Workflow

### Getting Started
```bash
# Clone repository
git clone <repository-url>
cd ayurvedacart

# Install dependencies  
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Configuration
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Code Standards
- **TypeScript**: Strict typing for all components
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality checks

### Testing Strategy
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API route testing
- **E2E Tests**: Playwright for user journeys
- **Visual Regression**: Chromatic for UI changes

## Performance Optimization

### Frontend Performance
- **Image Optimization**: Next.js Image component with WebP
- **Code Splitting**: Route-based and component-based splitting
- **Caching**: Aggressive caching with revalidation
- **CDN**: Global edge distribution via Vercel

### Database Performance
- **Indexing**: Optimized queries with strategic indexes
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Minimize N+1 queries
- **Caching Layer**: Redis for frequently accessed data

### Core Web Vitals Targets
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)  
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **FCP**: < 1.8s (First Contentful Paint)

## Security Guidelines

### Authentication & Authorization
- **JWT Tokens**: Secure session management
- **Row Level Security**: Database-level access control
- **API Rate Limiting**: Prevent abuse and attacks
- **CSRF Protection**: Cross-site request forgery prevention

### Data Protection
- **Input Validation**: Zod schemas for all inputs
- **SQL Injection**: Parameterized queries only
- **XSS Prevention**: Sanitized user content
- **HTTPS Everywhere**: SSL/TLS for all connections

### Privacy Compliance
- **GDPR**: European data protection compliance
- **CCPA**: California consumer privacy compliance  
- **Data Minimization**: Collect only necessary data
- **Right to Deletion**: User data removal capabilities

## Deployment

### Production Environment
- **Vercel**: Primary hosting platform
- **Environment Variables**: Secure configuration management
- **Custom Domain**: Professional domain setup
- **SSL/TLS**: Automatic certificate management

### CI/CD Pipeline
- **GitHub Actions**: Automated testing and deployment
- **Quality Gates**: Code quality and security checks
- **Preview Deployments**: Feature branch previews
- **Rollback Strategy**: Quick rollback capabilities

### Monitoring & Analytics
- **Error Tracking**: Sentry for error monitoring
- **Performance Monitoring**: Web vitals tracking
- **User Analytics**: Privacy-focused analytics
- **Uptime Monitoring**: 24/7 availability checks

---

This guide provides the foundation for developing AyurvedaCart's royal wellness platform. Focus on creating luxurious user experiences while maintaining the highest standards of quality, security, and performance. 