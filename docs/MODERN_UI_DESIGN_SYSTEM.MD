# AyurvedaCart - Modern UI Design System

## Design Philosophy

### Vision
Create a harmonious blend of traditional Ayurvedic aesthetics with modern, accessible, and user-friendly design principles. The design system should evoke trust, authenticity, and wellness while maintaining contemporary usability standards.

### Core Principles

#### 1. Authentic Heritage
- Draw inspiration from traditional Indian art and Ayurvedic symbolism
- Use natural, earth-toned color palettes
- Incorporate subtle traditional patterns and motifs
- Maintain cultural sensitivity and respect

#### 2. Modern Accessibility
- WCAG 2.1 AA compliance for all interactive elements
- High contrast ratios for readability
- Keyboard navigation support
- Screen reader compatibility
- Multi-language support

#### 3. Trust & Credibility
- Clean, professional layouts
- Consistent visual hierarchy
- Clear product information display
- Authentic photography and imagery
- Transparent pricing and policies

#### 4. Wellness-Focused Experience
- Calming, stress-free interface design
- Intuitive navigation patterns
- Reduced cognitive load
- Mindful use of animations and transitions
- Health-conscious content presentation

## Visual Identity

### Brand Colors

#### Primary Palette
```css
/* Primary Green - Health & Nature */
--primary-green: #2E7D32;
--primary-green-light: #4CAF50;
--primary-green-dark: #1B5E20;

/* Secondary Gold - Authenticity & Premium */
--secondary-gold: #FF8F00;
--secondary-gold-light: #FFC107;
--secondary-gold-dark: #E65100;

/* Tertiary Earth - Grounding & Stability */
--tertiary-brown: #5D4037;
--tertiary-brown-light: #8D6E63;
--tertiary-brown-dark: #3E2723;
```

#### Neutral Palette
```css
/* Text Colors */
--text-primary: #212121;
--text-secondary: #757575;
--text-disabled: #BDBDBD;
--text-inverse: #FFFFFF;

/* Background Colors */
--bg-primary: #FFFFFF;
--bg-secondary: #FAFAFA;
--bg-tertiary: #F5F5F5;
--bg-overlay: rgba(0, 0, 0, 0.6);

/* Border Colors */
--border-light: #E0E0E0;
--border-medium: #BDBDBD;
--border-dark: #757575;
```

#### Semantic Colors
```css
/* Status Colors */
--success: #4CAF50;
--warning: #FF9800;
--error: #F44336;
--info: #2196F3;

/* E-commerce Specific */
--price-color: #2E7D32;
--discount-color: #F44336;
--rating-color: #FF8F00;
--availability-in-stock: #4CAF50;
--availability-out-of-stock: #F44336;
```

### Typography

#### Font Selection
- **Primary Font**: 'Inter' - Modern, highly readable sans-serif
- **Secondary Font**: 'Merriweather' - Traditional serif for headings
- **Accent Font**: 'Noto Sans Devanagari' - For Ayurvedic terms and Sanskrit text

#### Type Scale
```css
/* Headings */
--font-size-h1: 2.5rem;   /* 40px */
--font-size-h2: 2rem;     /* 32px */
--font-size-h3: 1.75rem;  /* 28px */
--font-size-h4: 1.5rem;   /* 24px */
--font-size-h5: 1.25rem;  /* 20px */
--font-size-h6: 1.125rem; /* 18px */

/* Body Text */
--font-size-body-large: 1rem;     /* 16px */
--font-size-body: 0.875rem;       /* 14px */
--font-size-body-small: 0.75rem;  /* 12px */

/* Special */
--font-size-caption: 0.6875rem;   /* 11px */
--font-size-overline: 0.625rem;   /* 10px */
```

#### Font Weights
```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### Line Heights
```css
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### Spacing System

#### Base Unit
```css
--spacing-unit: 8px;
```

#### Spacing Scale
```css
--spacing-xs: 4px;    /* 0.5 units */
--spacing-sm: 8px;    /* 1 unit */
--spacing-md: 16px;   /* 2 units */
--spacing-lg: 24px;   /* 3 units */
--spacing-xl: 32px;   /* 4 units */
--spacing-2xl: 48px;  /* 6 units */
--spacing-3xl: 64px;  /* 8 units */
--spacing-4xl: 96px;  /* 12 units */
```

### Grid System

#### Breakpoints
```css
--breakpoint-xs: 320px;
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

#### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

#### Grid Configuration
- **Columns**: 12-column grid system
- **Gutters**: 24px (lg), 16px (md), 8px (sm)
- **Margins**: 24px (lg+), 16px (md), 8px (sm)

## Component Library

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--primary-green);
  color: var(--text-inverse);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-green-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--primary-green);
  border: 2px solid var(--primary-green);
  border-radius: 8px;
  padding: 10px 22px;
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--primary-green);
  color: var(--text-inverse);
}
```

#### Button Sizes
```css
.btn-sm {
  padding: 8px 16px;
  font-size: var(--font-size-body-small);
}

.btn-md {
  padding: 12px 24px;
  font-size: var(--font-size-body);
}

.btn-lg {
  padding: 16px 32px;
  font-size: var(--font-size-body-large);
}
```

### Form Elements

#### Input Fields
```css
.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-light);
  border-radius: 8px;
  font-size: var(--font-size-body);
  transition: border-color 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-green);
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
}

.input-field:invalid {
  border-color: var(--error);
}
```

#### Select Dropdowns
```css
.select-field {
  position: relative;
  width: 100%;
}

.select-field select {
  width: 100%;
  padding: 12px 16px;
  padding-right: 40px;
  border: 2px solid var(--border-light);
  border-radius: 8px;
  background: var(--bg-primary);
  font-size: var(--font-size-body);
  cursor: pointer;
}
```

#### Checkboxes and Radio Buttons
```css
.checkbox-field {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-field input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-right: var(--spacing-sm);
  accent-color: var(--primary-green);
}
```

### Cards

#### Product Card
```css
.product-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: var(--spacing-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid var(--border-light);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.product-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: var(--spacing-md);
}

.product-card-title {
  font-size: var(--font-size-body-large);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.product-card-price {
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-bold);
  color: var(--price-color);
}
```

#### Information Card
```css
.info-card {
  background: var(--bg-secondary);
  border-left: 4px solid var(--primary-green);
  padding: var(--spacing-md);
  border-radius: 0 8px 8px 0;
  margin-bottom: var(--spacing-md);
}

.info-card-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.info-card-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-green);
  margin-right: var(--spacing-sm);
}
```

### Navigation

#### Header Navigation
```css
.header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-item {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: var(--bg-secondary);
  color: var(--primary-green);
}
```

#### Breadcrumbs
```css
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-body-small);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.breadcrumb-item {
  color: var(--text-secondary);
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: var(--primary-green);
}

.breadcrumb-separator {
  color: var(--text-disabled);
}
```

### Modals and Overlays

#### Modal Base
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: var(--spacing-xl);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Loading States

#### Skeleton Loaders
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 25%,
    var(--bg-secondary) 50%,
    var(--bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-text {
  height: 1em;
  border-radius: 4px;
}

.skeleton-image {
  aspect-ratio: 16/9;
  border-radius: 8px;
}
```

#### Spinner
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-light);
  border-top: 4px solid var(--primary-green);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## Specialized Components

### Product Rating
```css
.rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-star {
  width: 16px;
  height: 16px;
  color: var(--rating-color);
}

.rating-text {
  font-size: var(--font-size-body-small);
  color: var(--text-secondary);
}
```

### Price Display
```css
.price-display {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-sm);
}

.price-current {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-bold);
  color: var(--price-color);
}

.price-original {
  font-size: var(--font-size-body);
  color: var(--text-secondary);
  text-decoration: line-through;
}

.price-discount {
  font-size: var(--font-size-body-small);
  color: var(--discount-color);
  font-weight: var(--font-weight-medium);
}
```

### Badge System
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-success {
  background: rgba(76, 175, 80, 0.1);
  color: var(--success);
}

.badge-warning {
  background: rgba(255, 152, 0, 0.1);
  color: var(--warning);
}

.badge-error {
  background: rgba(244, 67, 54, 0.1);
  color: var(--error);
}
```

## Responsive Design

### Mobile-First Approach
```css
/* Mobile Base Styles */
.container {
  padding: 0 var(--spacing-md);
}

/* Tablet Styles */
@media (min-width: 768px) {
  .container {
    padding: 0 var(--spacing-lg);
  }
}

/* Desktop Styles */
@media (min-width: 1024px) {
  .container {
    max-width: var(--container-lg);
    margin: 0 auto;
  }
}
```

### Touch Targets
```css
/* Minimum 44px touch targets for mobile */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Animation Guidelines

### Transition Timing
```css
/* Standard easing functions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* Duration standards */
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
```

### Micro-interactions
```css
.interactive-element {
  transition: all var(--duration-normal) var(--ease-in-out);
}

.interactive-element:hover {
  transform: translateY(-1px);
}

.interactive-element:active {
  transform: translateY(0);
}
```

## Accessibility Features

### Focus Management
```css
.focus-visible {
  outline: 2px solid var(--primary-green);
  outline-offset: 2px;
}

/* Hide focus ring for mouse users */
.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}
```

### Screen Reader Support
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Dark Mode Support

### Color Scheme Variables
```css
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #FFFFFF;
    --text-secondary: #B0B0B0;
    --bg-primary: #121212;
    --bg-secondary: #1E1E1E;
    --bg-tertiary: #2A2A2A;
    --border-light: #404040;
  }
}
```

## Performance Considerations

### CSS Optimization
- Use CSS custom properties for theming
- Implement critical CSS for above-the-fold content
- Minimize reflows and repaints
- Use transform and opacity for animations
- Implement proper font loading strategies

### Image Optimization
- Use responsive images with srcset
- Implement lazy loading for non-critical images
- Provide WebP format with fallbacks
- Use appropriate image sizing and compression

## Implementation Guidelines

### Component Development
1. Follow atomic design principles
2. Ensure all components are keyboard accessible
3. Implement proper ARIA labels and roles
4. Test with screen readers
5. Validate color contrast ratios
6. Provide comprehensive documentation

### Design Tokens
Maintain design tokens in a centralized system:
- Colors
- Typography
- Spacing
- Shadows
- Border radius
- Animation timing

### Testing Strategy
- Visual regression testing
- Accessibility testing
- Cross-browser compatibility
- Mobile device testing
- Performance testing

This design system provides a comprehensive foundation for building a modern, accessible, and culturally appropriate Ayurvedic e-commerce platform while maintaining consistency and scalability across all components and pages. 