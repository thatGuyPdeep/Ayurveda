# AyurvedaCart - Theme Implementation Guide

## 🎨 Quick Reference - New Ayurvedic Theme

This guide helps developers implement the new Ayurvedic theme consistently across AyurvedaCart. For complete details, see [THEME.MD](./THEME.MD).

### 🚀 Brand Positioning
**"Ancient Wisdom, Modern Healing"** - Balance 5000-year-old Ayurvedic traditions with contemporary user experience.

## 🎯 Color Usage Guidelines

### Primary Colors - When to Use

#### Deep Emerald Green (#014421)
- **Use for**: Trust elements, secondary CTAs, success states, nature-related content
- **Psychology**: Builds trust, suggests healing and natural wellness
- **Examples**: "Free Consultation" buttons, success messages, wellness indicators

#### Royal Saffron (#F5B000)
- **Use for**: Primary CTAs, dopamine triggers, urgent actions, optimism elements  
- **Psychology**: Stimulates dopamine, encourages action, creates optimism
- **Examples**: "Add to Cart", "Buy Now", "Start Journey" buttons

#### Reddish Maroon (#8B1E3F)  
- **Use for**: Premium elements, trust badges, traditional elements, luxury features
- **Psychology**: Conveys luxury, tradition, credibility, high-value
- **Examples**: Premium membership, exclusive offers, certifications

### Background Colors

#### Ivory (#FAF6F0)
- **Primary background color** - Clean, warm, calming
- **Use everywhere** as the main background

#### Pale Sage (#DDEAD0)
- **Secondary background** - For sections that need differentiation
- **Use for**: Feature sections, card backgrounds, subtle divisions

#### Charcoal (#222222)
- **Text color** - Maximum readability (15.2:1 contrast on ivory)
- **Use for**: All body text, headings, high-contrast elements

## 🔤 Typography Implementation

### Font Loading (Required in globals.css)
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
```

### Usage Rules
- **Playfair Display**: All headings (h1-h6), brand elements, important CTAs
- **Lato**: All body text, descriptions, navigation, form labels

### Implementation Examples
```tsx
// Headings
<h1 className="font-playfair text-4xl font-bold text-charcoal">Ancient Wisdom, Modern Healing</h1>

// Body text
<p className="font-lato text-base text-charcoal">Discover authentic Ayurvedic solutions...</p>

// CTA buttons
<button className="font-lato font-semibold">Start Your Wellness Journey</button>
```

## 🔘 Button Implementation Guide

### Primary CTA (Saffron - Dopamine Trigger)
```tsx
<button className="bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-3 rounded-xl font-lato font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
  Start Your Wellness Journey
</button>
```
**Use for**: Add to Cart, Buy Now, Sign Up, Primary actions

### Secondary CTA (Emerald - Trust & Healing)
```tsx
<button className="bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-lato font-semibold transition-all duration-200">
  Free Ayurvedic Consultation
</button>
```
**Use for**: Consultations, Learn More, Secondary actions

### Premium CTA (Maroon - Luxury)
```tsx
<button className="bg-maroon-800 hover:bg-maroon-700 text-white px-6 py-3 rounded-xl font-lato font-semibold transition-all duration-200">
  Premium Membership
</button>
```
**Use for**: Premium services, exclusive offers, membership

## 📦 Component Examples

### Product Card
```tsx
<div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-sage-light">
  <div className="mb-4">
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl" />
  </div>
  <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">{product.name}</h3>
  <p className="font-lato text-charcoal/70 mb-4">{product.description}</p>
  <div className="flex items-center justify-between mb-4">
    <span className="font-lato text-2xl font-bold text-emerald-800">${product.price}</span>
    <span className="font-lato text-sm px-3 py-1 bg-sage-light text-charcoal rounded-full">
      In Stock
    </span>
  </div>
  <button className="w-full bg-saffron-500 hover:bg-saffron-600 text-white py-3 rounded-xl font-lato font-semibold transition-all duration-200">
    Add to Cart
  </button>
</div>
```

### Hero Section
```tsx
<section className="bg-gradient-to-br from-saffron-50 via-ivory to-sage-100 py-20">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h1 className="font-playfair text-5xl font-bold text-charcoal mb-6">
      Ancient Wisdom, Modern Healing
    </h1>
    <p className="font-lato text-xl text-charcoal/80 mb-8 max-w-3xl mx-auto">
      Discover authentic Ayurvedic wellness solutions, sourced from 5000-year-old 
      traditions and delivered to your modern lifestyle
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-4 rounded-xl font-lato font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
        Start Your Wellness Journey
      </button>
      <button className="bg-emerald-800 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-lato font-semibold text-lg transition-all duration-200">
        Free Ayurvedic Consultation
      </button>
    </div>
  </div>
</section>
```

## 🎨 Gradient Implementation

### Primary Gradients
```css
/* Saffron-Ivory-Sage Gradient (Hero backgrounds) */
.gradient-hero {
  background: linear-gradient(135deg, #FFFBEB 0%, #FAF6F0 50%, #DDEAD0 100%);
}

/* Emerald Gradient (Trust elements) */
.gradient-emerald {
  background: linear-gradient(135deg, #014421 0%, #15803D 100%);
}

/* Saffron Gradient (CTAs) */
.gradient-saffron {
  background: linear-gradient(135deg, #F5B000 0%, #D97706 100%);
}

/* Maroon Gradient (Premium) */
.gradient-maroon {
  background: linear-gradient(135deg, #8B1E3F 0%, #BE185D 100%);
}
```

## ♿ Accessibility Compliance

### Contrast Ratios (WCAG 2.1 AA Compliant)
- **Charcoal on Ivory**: 15.2:1 (Excellent)
- **White on Emerald**: 12.4:1 (Excellent)  
- **White on Saffron**: 4.8:1 (Good)
- **White on Maroon**: 8.1:1 (Excellent)

### Focus States
```css
/* Use saffron for focus indicators */
.focus-visible:focus {
  outline: 2px solid #F5B000;
  outline-offset: 2px;
}
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: '640px',   /* Small tablets */
md: '768px',   /* Tablets */
lg: '1024px',  /* Small laptops */
xl: '1280px',  /* Laptops */
2xl: '1536px'  /* Large screens */
```

### Responsive Typography
```tsx
<h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>

<p className="font-lato text-base lg:text-lg">
  Responsive body text
</p>
```

## 🔍 SEO & Performance

### Image Alt Text Examples
```tsx
<img 
  src="/ayurveda-herbs.jpg" 
  alt="Traditional Ayurvedic herbs and spices arranged on wooden background - AyurvedaCart authentic wellness products"
  className="w-full h-64 object-cover rounded-xl"
/>
```

### Semantic HTML
```tsx
<main className="bg-ivory min-h-screen">
  <header className="bg-ivory border-b border-sage-light">
    <nav aria-label="Main navigation">
      {/* Navigation content */}
    </nav>
  </header>
  
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading" className="font-playfair...">
      Ancient Wisdom, Modern Healing
    </h1>
  </section>
</main>
```

## 🚨 Common Mistakes to Avoid

### ❌ Don't Do
- Use generic colors (blue, red) instead of theme colors
- Mix fonts arbitrarily (stick to Playfair + Lato)  
- Use low contrast combinations
- Ignore hover states and transitions
- Use harsh shadows or borders

### ✅ Do Instead
- Always use theme colors (emerald, saffron, maroon)
- Stick to typography rules (Playfair for headings, Lato for body)
- Test all color combinations for accessibility
- Add smooth transitions (duration-200)
- Use soft, organic styling (rounded-xl, gentle shadows)

## 🛠️ Development Checklist

### Before Publishing Any Component:
- [ ] Uses correct fonts (Playfair + Lato)
- [ ] Uses theme colors only (no custom colors)
- [ ] Has proper contrast ratios
- [ ] Includes hover states and transitions
- [ ] Responsive on all screen sizes
- [ ] Semantic HTML structure
- [ ] Proper alt text for images
- [ ] Focus states for interactive elements

### Theme Consistency Check:
- [ ] Matches THEME.MD specifications
- [ ] Follows "Ancient Wisdom, Modern Healing" positioning
- [ ] Uses dopamine design principles correctly
- [ ] Maintains Ayurvedic authenticity
- [ ] Accessible to all users

## 📞 Support

For questions about theme implementation:
1. Check [THEME.MD](./THEME.MD) for complete specifications
2. Review [COMPONENT_LIBRARY.md](./COMPONENT_LIBRARY.md) for examples
3. Test accessibility with browser dev tools
4. Validate against WCAG 2.1 AA standards

---
*Last Updated: December 2024*  
*Theme Version: 1.0 - Ayurvedic Authentic* 