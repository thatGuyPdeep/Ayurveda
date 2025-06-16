# AyurvedaCart - Database Setup Guide

## Overview

This guide provides comprehensive instructions for setting up the PostgreSQL database for AyurvedaCart using Supabase. The database schema is designed to handle complex e-commerce requirements while maintaining optimal performance and data integrity.

## Database Architecture

### Technology Stack
- **Database**: PostgreSQL 15+ (via Supabase)
- **Hosting**: Supabase Cloud Platform
- **Backup Strategy**: Automated daily backups with point-in-time recovery
- **Security**: Row Level Security (RLS) enabled
- **Scalability**: Auto-scaling with read replicas for high availability

### Database Design Principles
1. **Normalization**: Third Normal Form (3NF) compliance
2. **Performance**: Strategic indexing and query optimization
3. **Security**: Role-based access control and data encryption
4. **Scalability**: Partitioning for large tables
5. **Audit Trail**: Comprehensive logging for all data changes

## Core Database Schema

### 1. User Management Tables

#### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    profile_picture_url TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_created_at ON users(created_at);
```

#### user_profiles
```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    preferred_language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
    communication_preferences JSONB DEFAULT '{}',
    health_profile JSONB DEFAULT '{}',
    marketing_consent BOOLEAN DEFAULT FALSE,
    newsletter_subscription BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
```

#### user_addresses
```sql
CREATE TABLE user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) DEFAULT 'home' CHECK (type IN ('home', 'office', 'other')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_default ON user_addresses(user_id, is_default) WHERE is_default = TRUE;
```

### 2. Product Management Tables

#### categories
```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    image_url TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_active ON categories(is_active) WHERE is_active = TRUE;
```

#### brands
```sql
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    website_url TEXT,
    established_year INTEGER,
    country VARCHAR(100),
    certifications JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_active ON brands(is_active) WHERE is_active = TRUE;
```

#### products
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    short_description TEXT,
    description TEXT,
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL, -- 'medicine', 'supplement', 'oil', etc.
    form VARCHAR(50), -- 'tablet', 'liquid', 'powder', etc.
    
    -- Pricing
    base_price DECIMAL(10,2) NOT NULL,
    selling_price DECIMAL(10,2) NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    
    -- Physical attributes
    weight DECIMAL(8,3), -- in grams
    dimensions JSONB, -- {length, width, height}
    
    -- Inventory
    track_inventory BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    
    -- Ayurvedic specific
    dosage_form VARCHAR(100),
    pack_size VARCHAR(100),
    ingredients JSONB DEFAULT '[]',
    indications JSONB DEFAULT '[]',
    contraindications JSONB DEFAULT '[]',
    dosage_instructions TEXT,
    
    -- SEO and metadata
    meta_title VARCHAR(255),
    meta_description TEXT,
    search_keywords TEXT,
    
    -- Status and visibility
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive', 'discontinued')),
    is_featured BOOLEAN DEFAULT FALSE,
    is_prescription_required BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_search ON products USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '')));
```

#### product_categories
```sql
CREATE TABLE product_categories (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (product_id, category_id)
);

-- Indexes
CREATE INDEX idx_product_categories_product_id ON product_categories(product_id);
CREATE INDEX idx_product_categories_category_id ON product_categories(category_id);
```

#### product_images
```sql
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
```

#### product_variants
```sql
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    compare_at_price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    variant_options JSONB DEFAULT '{}', -- {size: '100ml', flavor: 'mint'}
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_product_variants_sku ON product_variants(sku);
```

### 3. Order Management Tables

#### orders
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Order status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'partially_refunded')),
    
    -- Pricing
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Shipping address
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    
    -- International shipping
    currency VARCHAR(3) DEFAULT 'USD',
    exchange_rate DECIMAL(10,4) DEFAULT 1.0000,
    shipping_method VARCHAR(50),
    estimated_delivery DATE,
    distribution_center_id UUID REFERENCES distribution_centers(id),
    
    -- Additional info
    notes TEXT,
    customer_notes TEXT,
    
    -- Timestamps
    ordered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmed_at TIMESTAMP WITH TIME ZONE,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

#### order_items
```sql
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    
    -- Product snapshot at time of order
    product_name VARCHAR(500) NOT NULL,
    product_sku VARCHAR(100) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

### 4. Shopping Cart Tables

#### cart_items
```sql
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id, variant_id)
);

-- Indexes
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
```

### 5. Review and Rating Tables

#### product_reviews
```sql
CREATE TABLE product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    order_item_id UUID REFERENCES order_items(id) ON DELETE SET NULL,
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    review_text TEXT,
    
    -- Moderation
    is_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    moderated_at TIMESTAMP WITH TIME ZONE,
    moderated_by UUID REFERENCES users(id),
    
    -- Helpfulness
    helpful_count INTEGER DEFAULT 0,
    unhelpful_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX idx_product_reviews_user_id ON product_reviews(user_id);
CREATE INDEX idx_product_reviews_rating ON product_reviews(rating);
CREATE INDEX idx_product_reviews_approved ON product_reviews(is_approved) WHERE is_approved = TRUE;
```

### 6. Global Distribution Centers

#### distribution_centers
```sql
CREATE TABLE distribution_centers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    
    -- Location
    address JSONB NOT NULL,
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100),
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    timezone VARCHAR(50) NOT NULL,
    
    -- Contact
    phone VARCHAR(20),
    email VARCHAR(255),
    manager_name VARCHAR(255),
    
    -- Operational details
    is_active BOOLEAN DEFAULT TRUE,
    operating_hours JSONB, -- {"monday": {"open": "09:00", "close": "18:00"}}
    shipping_methods JSONB, -- ["standard", "express", "overnight"]
    supported_currencies JSONB DEFAULT '["USD"]', -- ["USD", "EUR", "INR"]
    
    -- Capacity
    max_capacity INTEGER,
    current_utilization DECIMAL(5,2) DEFAULT 0.00,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_distribution_centers_country ON distribution_centers(country);
CREATE INDEX idx_distribution_centers_active ON distribution_centers(is_active) WHERE is_active = TRUE;
```

#### distribution_center_inventory
```sql
CREATE TABLE distribution_center_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    distribution_center_id UUID REFERENCES distribution_centers(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    reserved_quantity INTEGER DEFAULT 0,
    min_stock_level INTEGER DEFAULT 0,
    max_stock_level INTEGER,
    
    -- Pricing per distribution center
    local_price DECIMAL(10,2),
    local_currency VARCHAR(3) DEFAULT 'USD',
    
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(distribution_center_id, product_id, variant_id)
);

-- Indexes
CREATE INDEX idx_dc_inventory_center_id ON distribution_center_inventory(distribution_center_id);
CREATE INDEX idx_dc_inventory_product_id ON distribution_center_inventory(product_id);
CREATE INDEX idx_dc_inventory_stock ON distribution_center_inventory(stock_quantity);
```

### 7. International Support Tables

#### currencies
```sql
CREATE TABLE currencies (
    code VARCHAR(3) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    exchange_rate DECIMAL(10,4) NOT NULL DEFAULT 1.0000,
    is_active BOOLEAN DEFAULT TRUE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default currencies
INSERT INTO currencies (code, name, symbol, exchange_rate) VALUES 
('USD', 'US Dollar', '$', 1.0000),
('EUR', 'Euro', '€', 0.8500),
('GBP', 'British Pound', '£', 0.7500),
('INR', 'Indian Rupee', '₹', 83.0000),
('AUD', 'Australian Dollar', 'A$', 1.5000),
('CAD', 'Canadian Dollar', 'C$', 1.3500);
```

#### shipping_zones
```sql
CREATE TABLE shipping_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    countries JSONB NOT NULL, -- ["US", "CA", "MX"]
    
    -- Shipping configuration
    standard_delivery_days INTEGER DEFAULT 7,
    express_delivery_days INTEGER DEFAULT 3,
    overnight_available BOOLEAN DEFAULT FALSE,
    
    -- Pricing
    standard_rate DECIMAL(10,2) NOT NULL,
    express_rate DECIMAL(10,2),
    overnight_rate DECIMAL(10,2),
    free_shipping_threshold DECIMAL(10,2),
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_shipping_zones_active ON shipping_zones(is_active) WHERE is_active = TRUE;
```

### 8. Vendor Management Tables

#### vendors
```sql
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    
    -- Contact information
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    website_url TEXT,
    
    -- Business details
    business_type VARCHAR(50), -- 'manufacturer', 'distributor', 'retailer'
    registration_number VARCHAR(100),
    tax_id VARCHAR(100),
    established_year INTEGER,
    
    -- Global presence
    countries_served JSONB DEFAULT '[]', -- ["US", "CA", "IN"]
    preferred_currency VARCHAR(3) DEFAULT 'USD',
    
    -- Address
    business_address JSONB NOT NULL,
    
    -- Platform status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended', 'rejected')),
    verification_status VARCHAR(20) DEFAULT 'unverified',
    
    -- Commission and financial
    commission_rate DECIMAL(5,2) DEFAULT 15.00,
    payment_terms VARCHAR(50) DEFAULT 'net_30',
    
    -- Documents and certifications
    documents JSONB DEFAULT '[]',
    certifications JSONB DEFAULT '[]',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_vendors_slug ON vendors(slug);
CREATE INDEX idx_vendors_email ON vendors(email);
CREATE INDEX idx_vendors_status ON vendors(status);
```

#### vendor_products
```sql
CREATE TABLE vendor_products (
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    vendor_sku VARCHAR(100),
    vendor_price DECIMAL(10,2),
    is_primary_vendor BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (vendor_id, product_id)
);

-- Indexes
CREATE INDEX idx_vendor_products_vendor_id ON vendor_products(vendor_id);
CREATE INDEX idx_vendor_products_product_id ON vendor_products(product_id);
```

### 7. Consultation Tables

#### doctors
```sql
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Professional information
    license_number VARCHAR(100) UNIQUE NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    qualification VARCHAR(500) NOT NULL,
    experience_years INTEGER NOT NULL,
    
    -- Profile
    bio TEXT,
    languages JSONB DEFAULT '["en"]',
    consultation_fee DECIMAL(8,2) NOT NULL,
    
    -- Availability
    availability JSONB DEFAULT '{}', -- Weekly schedule
    is_available BOOLEAN DEFAULT TRUE,
    
    -- Statistics
    total_consultations INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    
    -- Verification
    verification_status VARCHAR(20) DEFAULT 'pending',
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES users(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_doctors_user_id ON doctors(user_id);
CREATE INDEX idx_doctors_license ON doctors(license_number);
CREATE INDEX idx_doctors_specialization ON doctors(specialization);
```

#### consultations
```sql
CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES users(id) ON DELETE SET NULL,
    doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
    
    -- Scheduling
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    
    -- Status
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show')),
    
    -- Financial
    fee_amount DECIMAL(8,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending',
    
    -- Consultation details
    chief_complaint TEXT,
    symptoms JSONB DEFAULT '[]',
    diagnosis TEXT,
    prescription JSONB DEFAULT '[]',
    follow_up_date DATE,
    
    -- Communication
    meeting_url TEXT,
    meeting_id VARCHAR(100),
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_consultations_patient_id ON consultations(patient_id);
CREATE INDEX idx_consultations_doctor_id ON consultations(doctor_id);
CREATE INDEX idx_consultations_scheduled_at ON consultations(scheduled_at);
CREATE INDEX idx_consultations_status ON consultations(status);
```

## Advanced Features

### 8. Search and Recommendations

#### search_logs
```sql
CREATE TABLE search_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    query TEXT NOT NULL,
    results_count INTEGER,
    clicked_product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_search_logs_query ON search_logs(query);
CREATE INDEX idx_search_logs_user_id ON search_logs(user_id);
CREATE INDEX idx_search_logs_created_at ON search_logs(created_at);
```

#### product_recommendations
```sql
CREATE TABLE product_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    recommended_product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    recommendation_type VARCHAR(50), -- 'frequently_bought_together', 'similar', 'related'
    score DECIMAL(5,4) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(source_product_id, recommended_product_id, recommendation_type)
);
```

### 9. Marketing and Promotions

#### coupons
```sql
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Discount details
    discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed_amount')),
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_order_value DECIMAL(10,2) DEFAULT 0,
    maximum_discount_amount DECIMAL(10,2),
    
    -- Usage limits
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    usage_limit_per_customer INTEGER DEFAULT 1,
    
    -- Validity
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    
    -- Conditions
    applicable_categories JSONB DEFAULT '[]',
    applicable_products JSONB DEFAULT '[]',
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_valid_period ON coupons(valid_from, valid_until);
```

#### coupon_usage
```sql
CREATE TABLE coupon_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    discount_amount DECIMAL(10,2) NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_coupon_usage_coupon_id ON coupon_usage(coupon_id);
CREATE INDEX idx_coupon_usage_user_id ON coupon_usage(user_id);
```

### 10. Analytics and Reporting

#### page_views
```sql
CREATE TABLE page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    page_url TEXT NOT NULL,
    page_title VARCHAR(255),
    referrer_url TEXT,
    ip_address INET,
    user_agent TEXT,
    device_type VARCHAR(20),
    browser VARCHAR(50),
    os VARCHAR(50),
    country VARCHAR(100),
    city VARCHAR(100),
    duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_page_views_user_id ON page_views(user_id);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_page_views_page_url ON page_views(page_url);
```

## Database Functions and Triggers

### Audit Trail Functions
```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ... (apply to all relevant tables)
```

### Product Rating Calculation
```sql
-- Function to update product average rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET average_rating = (
        SELECT AVG(rating)::DECIMAL(3,2)
        FROM product_reviews
        WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
        AND is_approved = TRUE
    ),
    review_count = (
        SELECT COUNT(*)
        FROM product_reviews
        WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
        AND is_approved = TRUE
    )
    WHERE id = COALESCE(NEW.product_id, OLD.product_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON product_reviews
    FOR EACH ROW EXECUTE FUNCTION update_product_rating();
```

### Inventory Management
```sql
-- Function to update product stock
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Decrease stock when order is placed
        UPDATE products
        SET stock_quantity = stock_quantity - NEW.quantity
        WHERE id = NEW.product_id;
    ELSIF TG_OP = 'DELETE' THEN
        -- Increase stock when order is cancelled
        UPDATE products
        SET stock_quantity = stock_quantity + OLD.quantity
        WHERE id = OLD.product_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

CREATE TRIGGER update_stock_trigger
    AFTER INSERT OR DELETE ON order_items
    FOR EACH ROW EXECUTE FUNCTION update_product_stock();
```

## Row Level Security (RLS) Policies

### User Data Protection
```sql
-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY user_own_data ON users
    FOR ALL USING (id = auth.uid());

CREATE POLICY user_profile_own_data ON user_profiles
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY user_address_own_data ON user_addresses
    FOR ALL USING (user_id = auth.uid());
```

### Order Protection
```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Users can only access their own orders
CREATE POLICY user_own_orders ON orders
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY user_own_order_items ON order_items
    FOR SELECT USING (
        order_id IN (
            SELECT id FROM orders WHERE user_id = auth.uid()
        )
    );
```

## Performance Optimization

### Indexing Strategy
```sql
-- Composite indexes for common queries
CREATE INDEX idx_products_brand_status ON products(brand_id, status) WHERE status = 'active';
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_product_reviews_product_approved ON product_reviews(product_id, is_approved) WHERE is_approved = TRUE;

-- Full-text search indexes
CREATE INDEX idx_products_search_vector ON products USING GIN (
    to_tsvector('english', name || ' ' || COALESCE(description, '') || ' ' || COALESCE(search_keywords, ''))
);
```

### Partitioning for Large Tables
```sql
-- Partition page_views by month
CREATE TABLE page_views_y2024m01 PARTITION OF page_views
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE page_views_y2024m02 PARTITION OF page_views
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
-- ... continue for each month
```

## Backup and Recovery

### Automated Backup Strategy
```sql
-- Create backup user with limited privileges
CREATE ROLE backup_user WITH LOGIN PASSWORD 'secure_backup_password';
GRANT CONNECT ON DATABASE ayurvedacart TO backup_user;
GRANT USAGE ON SCHEMA public TO backup_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO backup_user;

-- Backup script (to be run via cron)
-- pg_dump -h localhost -U backup_user -d ayurvedacart --clean --create > backup_$(date +%Y%m%d).sql
```

### Point-in-Time Recovery Setup
- Enable WAL archiving in Supabase
- Configure automated backups every 6 hours
- Maintain 30 days of backup history
- Test recovery procedures monthly

## Migration Scripts

### Initial Setup Migration
```sql
-- Run this after creating all tables
-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Classical Medicines', 'classical-medicines', 'Traditional Ayurvedic formulations'),
('Personal Care', 'personal-care', 'Ayurvedic personal care products'),
('Health Supplements', 'health-supplements', 'Natural health supplements'),
('Oils & Ghee', 'oils-ghee', 'Medicated oils and ghee preparations');

-- Insert sample brands
INSERT INTO brands (name, slug, description, country) VALUES
('Kottakkal Arya Vaidya Sala', 'kottakkal', 'Authentic Ayurvedic medicines since 1902', 'India'),
('Vaidyaratnam', 'vaidyaratnam', 'Traditional Ayurvedic preparations', 'India'),
('Kerala Ayurveda', 'kerala-ayurveda', 'Premium Ayurvedic products', 'India');
```

## Monitoring and Maintenance

### Database Health Checks
```sql
-- Query to check table sizes
SELECT schemaname, tablename, 
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Index usage statistics
SELECT schemaname, tablename, attname, n_distinct, correlation
FROM pg_stats
WHERE schemaname = 'public'
ORDER BY n_distinct DESC;
```

### Performance Monitoring Queries
```sql
-- Slow query identification
SELECT query, mean_time, calls, total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Index usage monitoring
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

This comprehensive database setup provides a robust foundation for the AyurvedaCart e-commerce platform with proper normalization, security, performance optimization, and scalability considerations. 