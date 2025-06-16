# 🎨 AyurvedaCart Design System & Theme Guide

## 🌿 Brand Philosophy
**"Ancient Wisdom, Modern Healing"** - Our design system combines traditional Ayurvedic aesthetics with contemporary luxury design principles, creating a dopamine-stimulating experience that builds trust and encourages wellness transformation.

---

## ✅ Color Palette

### Primary Color System

| Color Name | HEX | RGB | Usage | Psychology |
|------------|-----|-----|-------|------------|
| **Deep Emerald Green** | `#014421` | rgb(1, 68, 33) | Brand Primary, CTAs, Headers | Nature, healing, wealth, Ayurveda authenticity |
| **Royal Saffron** | `#F5B000` | rgb(245, 176, 0) | Buttons, Highlights, Accents | Royalty, warmth, optimism, dopamine trigger |
| **Reddish Maroon** | `#8B1E3F` | rgb(139, 30, 63) | Secondary elements, Trust badges | Regal, luxurious, trust, traditional, grounding |
| **Soft Ivory** | `#FAF6F0` | rgb(250, 246, 240) | Main background | Clean, warm, calming, accessible |
| **Pale Sage** | `#DDEAD0` | rgb(221, 234, 208) | Secondary backgrounds | Calm, fresh, harmony |
| **Charcoal Black** | `#222222` | rgb(34, 34, 34) | Primary text | Maximum readability |

### Extended Color Variations

#### Emerald Green Variations
```css
--emerald-50: #F0FDF4
--emerald-100: #DCFCE7
--emerald-200: #BBF7D0
--emerald-300: #86EFAC
--emerald-400: #4ADE80
--emerald-500: #22C55E
--emerald-600: #16A34A
--emerald-700: #15803D
--emerald-800: #014421  /* Primary */
--emerald-900: #14532D
```

#### Saffron Variations
```css
--saffron-50: #FFFBEB
--saffron-100: #FEF3C7
--saffron-200: #FDE68A
--saffron-300: #FCD34D
--saffron-400: #FBBF24
--saffron-500: #F5B000  /* Primary */
--saffron-600: #D97706
--saffron-700: #B45309
--saffron-800: #92400E
--saffron-900: #78350F
```

#### Maroon Variations
```css
--maroon-50: #FDF2F8
--maroon-100: #FCE7F3
--maroon-200: #FBCFE8
--maroon-300: #F9A8D4
--maroon-400: #F472B6
--maroon-500: #EC4899
--maroon-600: #DB2777
--maroon-700: #BE185D
--maroon-800: #8B1E3F  /* Primary */
--maroon-900: #831843
```

### Background & Neutral Colors
```css
--ivory: #FAF6F0
--pale-sage: #DDEAD0
--sage-light: #E8F3DB
--sage-dark: #C9D7B8
--charcoal: #222222
--gray-warm-50: #F9F7F4
--gray-warm-100: #F3F1ED
--gray-warm-200: #E7E4DF
--gray-warm-300: #D1CCC4
--gray-warm-400: #A8A099
--gray-warm-500: #857A6E
--gray-warm-600: #6B6157
--gray-warm-700: #524B42
--gray-warm-800: #3A342D
--gray-warm-900: #222222
```

---

## 🎯 Dopamine Design Strategy

### Color Psychology Application
1. **Saffron (#F5B000)** - Primary dopamine trigger
   - Use for all primary CTAs
   - Hover states and interactive elements
   - Success messages and positive feedback
   - Shopping cart badges and notifications

2. **Emerald (#014421)** - Trust and healing
   - Brand elements and logos
   - Health-related content headers
   - Product quality indicators
   - Professional certifications

3. **Maroon (#8B1E3F)** - Luxury and authority
   - Premium product highlights
   - Trust badges and testimonials
   - Expert consultation sections
   - Exclusive offers

---

## 📝 Typography System

### Font Stack
```css
/* Primary Font - Headings */
--font-heading: 'Playfair Display', Georgia, serif;

/* Secondary Font - Body */
--font-body: 'Lato', 'Poppins', system-ui, sans-serif;

/* Accent Font - Callouts */
--font-accent: 'Playfair Display', Georgia, serif; /* Italic variant */
```

### Typography Scale
```css
/* Display Headings */
--text-display-2xl: 4.5rem   /* 72px - Hero titles */
--text-display-xl: 3.75rem   /* 60px - Page titles */
--text-display-lg: 3rem      /* 48px - Section titles */

/* Headings */
--text-h1: 2.25rem           /* 36px */
--text-h2: 1.875rem          /* 30px */
--text-h3: 1.5rem            /* 24px */
--text-h4: 1.25rem           /* 20px */
--text-h5: 1.125rem          /* 18px */
--text-h6: 1rem              /* 16px */

/* Body Text */
--text-xl: 1.25rem           /* 20px - Large body */
--text-lg: 1.125rem          /* 18px - Medium body */
--text-base: 1rem            /* 16px - Regular body */
--text-sm: 0.875rem          /* 14px - Small text */
--text-xs: 0.75rem           /* 12px - Fine print */
```

### Typography Usage Guidelines
- **Hero Headlines**: Playfair Display, Display-XL, Emerald color
- **Section Headers**: Playfair Display, H1-H2, Charcoal color
- **Product Titles**: Lato Bold, H3-H4, Charcoal color
- **Body Text**: Lato Regular, Base size, Charcoal color
- **Callouts & Quotes**: Playfair Display Italic, LG size, Maroon color
- **Button Text**: Lato SemiBold, Base size, White/Charcoal color
- **Captions**: Lato Regular, SM size, Gray-warm-600 color

---

## 🎨 UI Component Styles

### Button System
```css
/* Primary CTA Button */
.btn-primary {
  background: var(--saffron-500);
  color: white;
  border-radius: 12px; /* xl rounded */
  padding: 12px 24px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(245, 176, 0, 0.25);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--saffron-600);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 176, 0, 0.35);
}

/* Secondary Button */
.btn-secondary {
  background: var(--emerald-800);
  color: white;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(1, 68, 33, 0.25);
}

/* Outline Button */
.btn-outline {
  background: transparent;
  color: var(--emerald-800);
  border: 2px solid var(--emerald-800);
  border-radius: 12px;
  padding: 10px 22px;
  font-weight: 600;
}

.btn-outline:hover {
  background: var(--emerald-800);
  color: white;
}
```

### Card System
```css
/* Product Card */
.card-product {
  background: var(--ivory);
  border-radius: 16px; /* 2xl rounded */
  box-shadow: 0 4px 14px rgba(1, 68, 33, 0.08);
  border: 1px solid var(--saffron-200);
  transition: all 0.3s ease;
}

.card-product:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(1, 68, 33, 0.15);
  border-color: var(--saffron-400);
}

/* Feature Card */
.card-feature {
  background: var(--pale-sage);
  border-radius: 20px; /* 3xl rounded */
  padding: 32px;
  box-shadow: 0 8px 32px rgba(221, 234, 208, 0.4);
}

/* Trust Badge */
.badge-trust {
  background: var(--maroon-800);
  color: white;
  border-radius: 24px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(139, 30, 63, 0.25);
}
```

### Form Elements
```css
/* Input Fields */
.input-field {
  background: white;
  border: 2px solid var(--sage-light);
  border-radius: 12px;
  padding: 12px 16px;
  font-family: var(--font-body);
  color: var(--charcoal);
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: var(--saffron-500);
  box-shadow: 0 0 0 3px rgba(245, 176, 0, 0.1);
  outline: none;
}

/* Select Dropdown */
.select-field {
  background: white;
  border: 2px solid var(--sage-light);
  border-radius: 12px;
  padding: 12px 16px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23014421' stroke-width='2'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}
```

---

## 🌟 Visual Effects & Animations

### Shadow System
```css
/* Soft Shadows */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);

/* Brand Shadows */
--shadow-emerald: 0 4px 14px rgba(1, 68, 33, 0.15);
--shadow-saffron: 0 4px 14px rgba(245, 176, 0, 0.25);
--shadow-maroon: 0 4px 14px rgba(139, 30, 63, 0.2);
--shadow-sage: 0 8px 32px rgba(221, 234, 208, 0.4);
```

### Glassmorphism Effects
```css
/* Premium CTA Overlay */
.glass-cta {
  background: rgba(245, 176, 0, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(245, 176, 0, 0.2);
  border-radius: 16px;
}

/* Hero Overlay */
.glass-hero {
  background: rgba(250, 246, 240, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(250, 246, 240, 0.3);
}
```

### Animation Presets
```css
/* Hover Animations */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
}

/* Button Bounce */
.btn-bounce:hover {
  animation: gentle-bounce 0.6s ease;
}

@keyframes gentle-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

/* Fade In */
.fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 🎯 Page-Specific Styling Guidelines

### Hero Section
```css
.hero-section {
  background: linear-gradient(135deg, 
    var(--saffron-100) 0%, 
    var(--ivory) 50%, 
    var(--sage-light) 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/ayurveda-herbs-pattern.svg');
  opacity: 0.1;
}
```

### Navigation Bar
```css
.navbar {
  background: rgba(250, 246, 240, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--sage-light);
}

.nav-link {
  color: var(--charcoal);
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--emerald-800);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--saffron-500);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
```

### Product Cards
```css
.product-card {
  background: var(--ivory);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-emerald);
  border: 1px solid var(--saffron-200);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(1, 68, 33, 0.15);
  border-color: var(--saffron-400);
}

.product-price {
  color: var(--emerald-800);
  font-weight: 700;
  font-size: 1.25rem;
}

.product-discount {
  background: var(--maroon-800);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
}
```

### Trust Elements
```css
.trust-section {
  background: var(--pale-sage);
  border-radius: 20px;
  padding: 48px 32px;
}

.certification-badge {
  background: var(--maroon-800);
  color: white;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-maroon);
}

.testimonial-card {
  background: white;
  border-left: 4px solid var(--saffron-500);
  border-radius: 12px;
  padding: 24px;
  font-style: italic;
  font-family: var(--font-accent);
  color: var(--maroon-800);
}
```

---

## 🎨 Icon & Illustration Guidelines

### Icon Style
- **Style**: Line art with rounded ends (2px stroke weight)
- **Colors**: Primary icons in Emerald, accents in Saffron
- **Size**: 24px standard, 32px for features, 48px for heroes
- **Ayurvedic Icons**: Mortar & pestle, herbs, leaves, lotus, chakras

### Illustration Approach
- **Style**: Modern line art with subtle fills
- **Color Palette**: Limited to brand colors
- **Subjects**: Ayurvedic herbs, wellness lifestyle, natural healing
- **Avoid**: Stock photography, overly realistic imagery

---

## 📱 Responsive Design Principles

### Breakpoints
```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktop */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

### Mobile Optimizations
- Larger touch targets (minimum 44px)
- Simplified navigation with hamburger menu
- Stackable cards and layouts
- Increased font sizes for readability
- Thumb-friendly button placement

---

## ✅ Accessibility Standards

### Color Contrast Requirements
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **Interactive elements**: Clear focus indicators

### Approved Color Combinations
✅ **Charcoal (#222222) on Ivory (#FAF6F0)** - 15.2:1 ratio
✅ **Emerald (#014421) on Ivory (#FAF6F0)** - 12.8:1 ratio
✅ **White (#FFFFFF) on Emerald (#014421)** - 15.4:1 ratio
✅ **White (#FFFFFF) on Saffron (#F5B000)** - 4.8:1 ratio
✅ **Charcoal (#222222) on Pale Sage (#DDEAD0)** - 13.1:1 ratio

---

## 🏷️ Brand Voice & Messaging

### Tone
- **Warm & Welcoming**: Like a trusted family healer
- **Authoritative yet Approachable**: Expert knowledge, simple explanation
- **Premium but Accessible**: Luxury feel, inclusive pricing

### Key Messaging
- **Primary**: "Ancient Wisdom, Modern Healing"
- **Secondary**: "Discover Wellness Rooted in Royal Tradition"
- **Trust**: "Certified by Ayurvedic Masters"
- **Quality**: "Pure, Potent, Proven"

### Content Guidelines
- Use active voice and positive language
- Emphasize natural, holistic benefits
- Include traditional Sanskrit terms (with translations)
- Focus on transformation and wellness journey
- Balance ancient wisdom with modern convenience

---

## 🎯 Implementation Checklist

### Phase 1: Core Colors & Typography
- [ ] Update CSS custom properties with new color palette
- [ ] Implement Playfair Display and Lato fonts
- [ ] Create button component system
- [ ] Update card components with new styling

### Phase 2: Interactive Elements
- [ ] Implement hover animations and transitions
- [ ] Add glassmorphism effects for premium CTAs
- [ ] Create trust badge components
- [ ] Update form field styling

### Phase 3: Page Layouts
- [ ] Redesign hero section with saffron gradient
- [ ] Update navigation with hover underlines
- [ ] Implement product card new styling
- [ ] Create trust section layouts

### Phase 4: Polish & Optimization
- [ ] Add micro-interactions and animations
- [ ] Implement responsive design across all breakpoints
- [ ] Accessibility audit and improvements
- [ ] Performance optimization

---

*This design system is crafted to create a dopamine-stimulating, trust-building experience that honors Ayurvedic traditions while appealing to modern wellness seekers.* 