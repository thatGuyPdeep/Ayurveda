# AyuraVeda Royale - Website Test Cases

## Table of Contents
1. [User Interface & Navigation Tests](#user-interface--navigation-tests)
2. [Authentication & User Management Tests](#authentication--user-management-tests)
3. [Product Catalog & Search Tests](#product-catalog--search-tests)
4. [Shopping Cart & Checkout Tests](#shopping-cart--checkout-tests)
5. [User Account & Profile Tests](#user-account--profile-tests)
6. [Responsive Design Tests](#responsive-design-tests)
7. [Performance & Accessibility Tests](#performance--accessibility-tests)
8. [API & Backend Tests](#api--backend-tests)
9. [Security Tests](#security-tests)
10. [Browser Compatibility Tests](#browser-compatibility-tests)

---

## User Interface & Navigation Tests

### TC-UI-001: Header Navigation
- **Test Case**: Verify header navigation functionality
- **Steps**:
  1. Load homepage
  2. Verify AyuraVeda Royale logo with crown icon is displayed
  3. Click on each navigation item (Home, Products, Specialties, Categories, Consultation, About, Contact)
  4. Verify each page loads correctly
- **Expected Result**: All navigation links work and crown logo is visible
- **Priority**: High

### TC-UI-002: Footer Links
- **Test Case**: Verify footer contains proper links and information
- **Steps**:
  1. Scroll to footer on any page
  2. Verify company information, contact details, and legal links
  3. Test all footer links
- **Expected Result**: All footer links navigate to correct pages
- **Priority**: Medium

### TC-UI-003: Mobile Menu
- **Test Case**: Test mobile hamburger menu functionality
- **Steps**:
  1. Resize browser to mobile width (< 768px)
  2. Click hamburger menu icon
  3. Verify menu opens with all navigation items
  4. Click on navigation items
  5. Verify menu closes after selection
- **Expected Result**: Mobile menu works correctly
- **Priority**: High

### TC-UI-004: Crown Logo Consistency
- **Test Case**: Verify crown logo appears consistently across all pages
- **Steps**:
  1. Visit header, login page, register page, homepage hero
  2. Verify crown icon is used instead of "A" letter
  3. Check favicon in browser tab
- **Expected Result**: Crown logo appears everywhere consistently
- **Priority**: High

---

## Authentication & User Management Tests

### TC-AUTH-001: User Registration
- **Test Case**: Test user registration process
- **Steps**:
  1. Navigate to `/auth/register`
  2. Fill out registration form with valid data
  3. Submit form
  4. Verify success message or redirect
- **Expected Result**: User can successfully register
- **Priority**: High

### TC-AUTH-002: User Login
- **Test Case**: Test user login functionality
- **Steps**:
  1. Navigate to `/auth/login`
  2. Enter valid credentials
  3. Submit login form
  4. Verify successful login and redirect
- **Expected Result**: User can login successfully
- **Priority**: High

### TC-AUTH-003: Invalid Login
- **Test Case**: Test login with invalid credentials
- **Steps**:
  1. Navigate to `/auth/login`
  2. Enter invalid email/password
  3. Submit form
  4. Verify error message is displayed
- **Expected Result**: Appropriate error message shown
- **Priority**: High

### TC-AUTH-004: Password Visibility Toggle
- **Test Case**: Test password show/hide functionality
- **Steps**:
  1. On login/register page, enter password
  2. Click eye icon to show password
  3. Click eye icon to hide password
- **Expected Result**: Password visibility toggles correctly
- **Priority**: Medium

### TC-AUTH-005: Form Validation
- **Test Case**: Test form validation on auth pages
- **Steps**:
  1. Try submitting empty forms
  2. Enter invalid email formats
  3. Try mismatched passwords on register
- **Expected Result**: Validation errors displayed correctly
- **Priority**: High

---

## Product Catalog & Search Tests

### TC-PROD-001: Product Listing
- **Test Case**: Verify products page displays correctly
- **Steps**:
  1. Navigate to `/products`
  2. Verify products are displayed in grid
  3. Check product cards show image, name, price, rating
  4. Verify pagination if applicable
- **Expected Result**: Products display correctly with all information
- **Priority**: High

### TC-PROD-002: Product Search
- **Test Case**: Test product search functionality
- **Steps**:
  1. Use search bar in header
  2. Enter product name or keyword
  3. Submit search
  4. Verify search results page
- **Expected Result**: Relevant products shown in search results
- **Priority**: High

### TC-PROD-003: Product Filtering
- **Test Case**: Test product category filtering
- **Steps**:
  1. Navigate to products page
  2. Apply category filters
  3. Apply price filters
  4. Verify filtered results
- **Expected Result**: Products filtered correctly
- **Priority**: High

### TC-PROD-004: Product Sorting
- **Test Case**: Test product sorting options
- **Steps**:
  1. On products page, select different sort options
  2. Test sort by price (low to high, high to low)
  3. Test sort by name, rating, newest
- **Expected Result**: Products sorted correctly
- **Priority**: Medium

### TC-PROD-005: Product Detail Page
- **Test Case**: Test individual product pages
- **Steps**:
  1. Click on a product from listing
  2. Verify product detail page loads
  3. Check product images, description, price, reviews
  4. Test add to cart functionality
- **Expected Result**: Product details displayed correctly
- **Priority**: High

### TC-PROD-006: Categories Page
- **Test Case**: Test categories page functionality
- **Steps**:
  1. Navigate to `/categories`
  2. Verify all product categories are displayed
  3. Click on category cards
  4. Verify navigation to filtered products
- **Expected Result**: Categories page works correctly
- **Priority**: High

---

## Shopping Cart & Checkout Tests

### TC-CART-001: Add to Cart
- **Test Case**: Test adding products to cart
- **Steps**:
  1. Navigate to product page
  2. Click "Add to Cart" button
  3. Verify cart icon shows item count
  4. Open cart sidebar
  5. Verify product appears in cart
- **Expected Result**: Product added to cart successfully
- **Priority**: High

### TC-CART-002: Cart Management
- **Test Case**: Test cart modification functionality
- **Steps**:
  1. Add multiple products to cart
  2. Change quantities
  3. Remove items
  4. Verify total price updates
- **Expected Result**: Cart updates correctly
- **Priority**: High

### TC-CART-003: Cart Persistence
- **Test Case**: Test cart data persistence
- **Steps**:
  1. Add items to cart
  2. Refresh page
  3. Navigate to different pages
  4. Verify cart items persist
- **Expected Result**: Cart data persists across sessions
- **Priority**: Medium

### TC-CART-004: Checkout Process
- **Test Case**: Test checkout flow
- **Steps**:
  1. Add items to cart
  2. Navigate to checkout
  3. Fill shipping information
  4. Select payment method
  5. Complete order
- **Expected Result**: Checkout process completes successfully
- **Priority**: High

### TC-CART-005: Empty Cart State
- **Test Case**: Test empty cart display
- **Steps**:
  1. Ensure cart is empty
  2. Open cart sidebar
  3. Navigate to cart page
- **Expected Result**: Empty cart message displayed correctly
- **Priority**: Low

---

## User Account & Profile Tests

### TC-ACCOUNT-001: Account Dashboard
- **Test Case**: Test user account page
- **Steps**:
  1. Login as user
  2. Navigate to `/account`
  3. Verify dashboard displays user info
  4. Check recent orders, wishlist, profile completion
- **Expected Result**: Account dashboard displays correctly
- **Priority**: High

### TC-ACCOUNT-002: Order History
- **Test Case**: Test order history functionality
- **Steps**:
  1. Navigate to `/account/orders`
  2. Verify past orders are displayed
  3. Click on order details
  4. Test order tracking
- **Expected Result**: Order history works correctly
- **Priority**: High

### TC-ACCOUNT-003: Wishlist Management
- **Test Case**: Test wishlist functionality
- **Steps**:
  1. Add products to wishlist
  2. Navigate to `/wishlist`
  3. Verify wishlist items display
  4. Remove items from wishlist
  5. Move items to cart
- **Expected Result**: Wishlist management works correctly
- **Priority**: Medium

### TC-ACCOUNT-004: Profile Management
- **Test Case**: Test profile edit functionality
- **Steps**:
  1. Navigate to account settings
  2. Update profile information
  3. Change password
  4. Update preferences
- **Expected Result**: Profile updates successfully
- **Priority**: Medium

---

## Responsive Design Tests

### TC-RESP-001: Mobile Layout
- **Test Case**: Test mobile responsiveness (320px - 768px)
- **Steps**:
  1. Resize browser to mobile widths
  2. Test all major pages
  3. Verify touch-friendly buttons
  4. Check text readability
- **Expected Result**: All pages work correctly on mobile
- **Priority**: High

### TC-RESP-002: Tablet Layout
- **Test Case**: Test tablet responsiveness (768px - 1024px)
- **Steps**:
  1. Resize browser to tablet widths
  2. Test navigation and layout
  3. Verify product grids
  4. Check form layouts
- **Expected Result**: All pages work correctly on tablet
- **Priority**: High

### TC-RESP-003: Desktop Layout
- **Test Case**: Test desktop responsiveness (>1024px)
- **Steps**:
  1. Test on various desktop sizes
  2. Verify multi-column layouts
  3. Check hover effects
  4. Test desktop-specific features
- **Expected Result**: Optimal desktop experience
- **Priority**: Medium

### TC-RESP-004: Cross-Device Testing
- **Test Case**: Test on actual devices
- **Steps**:
  1. Test on iOS Safari
  2. Test on Android Chrome
  3. Test on various screen sizes
  4. Verify touch interactions
- **Expected Result**: Consistent experience across devices
- **Priority**: High

---

## Performance & Accessibility Tests

### TC-PERF-001: Page Load Speed
- **Test Case**: Test page loading performance
- **Steps**:
  1. Use Google PageSpeed Insights
  2. Test homepage load time
  3. Test product page load time
  4. Measure Core Web Vitals
- **Expected Result**: Pages load within 3 seconds
- **Priority**: High

### TC-PERF-002: Image Optimization
- **Test Case**: Test image loading and optimization
- **Steps**:
  1. Check image file sizes
  2. Verify lazy loading implementation
  3. Test image quality on different devices
- **Expected Result**: Images optimized and load efficiently
- **Priority**: Medium

### TC-ACCESS-001: Keyboard Navigation
- **Test Case**: Test keyboard-only navigation
- **Steps**:
  1. Navigate site using only Tab, Enter, Space keys
  2. Verify all interactive elements accessible
  3. Check focus indicators
- **Expected Result**: Site fully navigable with keyboard
- **Priority**: High

### TC-ACCESS-002: Screen Reader Compatibility
- **Test Case**: Test with screen readers
- **Steps**:
  1. Use NVDA or JAWS screen reader
  2. Navigate through pages
  3. Verify alt text on images
  4. Check heading structure
- **Expected Result**: Site accessible to screen readers
- **Priority**: High

### TC-ACCESS-003: Color Contrast
- **Test Case**: Test color contrast ratios
- **Steps**:
  1. Use color contrast analyzer
  2. Check text readability
  3. Verify WCAG compliance
- **Expected Result**: Meets WCAG AA standards
- **Priority**: Medium

---

## API & Backend Tests

### TC-API-001: Products API
- **Test Case**: Test products API endpoint
- **Steps**:
  1. Send GET request to `/api/products`
  2. Verify response format
  3. Test with query parameters
  4. Check error handling
- **Expected Result**: API returns correct product data
- **Priority**: High

### TC-API-002: Search API
- **Test Case**: Test search API functionality
- **Steps**:
  1. Send search requests to API
  2. Test various search terms
  3. Verify search results accuracy
  4. Test pagination
- **Expected Result**: Search API returns relevant results
- **Priority**: High

### TC-API-003: Error Handling
- **Test Case**: Test API error responses
- **Steps**:
  1. Send invalid requests
  2. Test server error scenarios
  3. Verify error messages
  4. Check fallback behavior
- **Expected Result**: Graceful error handling
- **Priority**: Medium

### TC-API-004: Data Fallback
- **Test Case**: Test sample data fallback
- **Steps**:
  1. Disable Supabase connection
  2. Verify site still functions
  3. Check sample data loading
- **Expected Result**: Site works with sample data
- **Priority**: High

---

## Security Tests

### TC-SEC-001: Input Validation
- **Test Case**: Test form input security
- **Steps**:
  1. Try SQL injection in forms
  2. Test XSS attempts
  3. Verify input sanitization
- **Expected Result**: Malicious input blocked
- **Priority**: High

### TC-SEC-002: Authentication Security
- **Test Case**: Test auth security measures
- **Steps**:
  1. Test session management
  2. Verify password requirements
  3. Check logout functionality
- **Expected Result**: Secure authentication
- **Priority**: High

### TC-SEC-003: Data Protection
- **Test Case**: Test data privacy measures
- **Steps**:
  1. Verify HTTPS implementation
  2. Check data encryption
  3. Test privacy controls
- **Expected Result**: User data protected
- **Priority**: High

---

## Browser Compatibility Tests

### TC-BROWSER-001: Chrome Testing
- **Test Case**: Test on Google Chrome
- **Steps**:
  1. Test latest Chrome version
  2. Verify all features work
  3. Check developer console for errors
- **Expected Result**: Full functionality in Chrome
- **Priority**: High

### TC-BROWSER-002: Firefox Testing
- **Test Case**: Test on Mozilla Firefox
- **Steps**:
  1. Test latest Firefox version
  2. Verify layout consistency
  3. Test interactive features
- **Expected Result**: Full functionality in Firefox
- **Priority**: High

### TC-BROWSER-003: Safari Testing
- **Test Case**: Test on Safari (iOS/macOS)
- **Steps**:
  1. Test on Safari browser
  2. Verify mobile Safari functionality
  3. Check touch interactions
- **Expected Result**: Works correctly on Safari
- **Priority**: High

### TC-BROWSER-004: Edge Testing
- **Test Case**: Test on Microsoft Edge
- **Steps**:
  1. Test latest Edge version
  2. Verify compatibility
  3. Check for Edge-specific issues
- **Expected Result**: Full functionality in Edge
- **Priority**: Medium

---

## Test Environment Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Various devices for responsive testing
- Screen reader software (for accessibility testing)
- Performance testing tools (PageSpeed Insights, Lighthouse)

### Test Data
- Valid user credentials
- Sample product data
- Test credit card information (for checkout testing)
- Various search terms and queries

### Reporting
- Document all bugs found with steps to reproduce
- Include screenshots for UI issues
- Prioritize bugs: Critical, High, Medium, Low
- Track test completion status

---

## Automation Opportunities

### High Priority for Automation
1. User registration and login flows
2. Product search and filtering
3. Cart functionality
4. API endpoint testing
5. Cross-browser compatibility checks

### Manual Testing Required
1. User experience evaluation
2. Visual design verification
3. Accessibility testing with actual assistive technology
4. Real device testing
5. Performance under load

---

## Test Schedule

### Phase 1: Core Functionality (Week 1)
- Authentication tests
- Product catalog tests
- Basic navigation tests

### Phase 2: Advanced Features (Week 2)
- Cart and checkout tests
- User account tests
- API tests

### Phase 3: Quality Assurance (Week 3)
- Performance tests
- Accessibility tests
- Cross-browser tests
- Security tests

### Phase 4: User Acceptance (Week 4)
- End-to-end user scenarios
- Mobile device testing
- Final bug fixes and retesting

---

*This test plan should be reviewed and updated regularly as new features are added to the AyuraVeda Royale platform.* 