-- ====================================================================
-- PostgreSQL & Supabase Database Schema for Elinboend Bridal
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories Table (Dual dimension: Silhouette & Occasion)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    category_type VARCHAR(50) NOT NULL CHECK (category_type IN ('silhouette', 'occasion', 'accessory')),
    description TEXT,
    image_url TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Products Table (Wedding Gowns & Party Dresses)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) NOT NULL UNIQUE,
    product_type VARCHAR(50) NOT NULL CHECK (product_type IN ('wedding_gown', 'party_dress', 'accessory')),
    silhouette VARCHAR(80), -- e.g. Ballgown, A-Line, Mermaid, Sheath, Column, Modern Kebaya
    occasion VARCHAR(80),   -- e.g. Holy Matrimony, Reception, Evening Gala, Bridesmaid, Engagement
    color_name VARCHAR(60), -- e.g. Ivory, Pure White, Champagne, Blush, Emerald, Navy
    color_hex VARCHAR(20),  -- e.g. #FAF8F5, #C5A880
    fabric_details TEXT,    -- e.g. French Chantilly Lace, Silk Mikado, Sparkling Tulle
    description TEXT,
    
    -- Rental Pricing (Standard 3-day duration)
    rental_price NUMERIC(14, 2) NOT NULL DEFAULT 0,
    original_rental_price NUMERIC(14, 2), -- For strikethrough discount
    security_deposit NUMERIC(14, 2) NOT NULL DEFAULT 0, -- Refundable after gown return
    is_rental_available BOOLEAN DEFAULT TRUE,
    
    -- Purchase Pricing (Made-to-order or Ready-to-wear)
    purchase_price NUMERIC(14, 2) NOT NULL DEFAULT 0,
    original_purchase_price NUMERIC(14, 2),
    is_purchase_available BOOLEAN DEFAULT TRUE,
    
    -- Flash Sale & Trunk Show Promotion
    is_flash_sale BOOLEAN DEFAULT FALSE,
    flash_sale_discount_percent INT DEFAULT 0,
    flash_sale_end_at TIMESTAMP WITH TIME ZONE,
    
    -- Status & Highlights
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    badge_label VARCHAR(60), -- e.g. 'Best Seller', 'New Arrival', 'Exclusive Haute Couture'
    
    -- Media (Array of image URLs)
    images JSONB NOT NULL DEFAULT '[]'::jsonb, -- Primary image at images[0]
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Product Sizing & Variants Table
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size_label VARCHAR(20) NOT NULL, -- e.g. XS, S, M, L, XL, Custom
    bust_cm NUMERIC(5, 2),
    waist_cm NUMERIC(5, 2),
    hips_cm NUMERIC(5, 2),
    length_cm NUMERIC(5, 2),
    stock_quantity INT DEFAULT 1,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Customer Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL UNIQUE, -- e.g. EB-20261102-001
    
    -- Customer Contact Info
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(150),
    delivery_address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(20),
    
    -- Order Financial Breakdown (in IDR)
    order_type VARCHAR(50) NOT NULL CHECK (order_type IN ('rental', 'purchase', 'mixed')),
    subtotal NUMERIC(14, 2) NOT NULL DEFAULT 0,
    security_deposit_total NUMERIC(14, 2) NOT NULL DEFAULT 0,
    alteration_fee NUMERIC(14, 2) NOT NULL DEFAULT 0,
    delivery_fee NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    
    -- Payment Terms & Gateway State
    payment_mode VARCHAR(50) NOT NULL DEFAULT 'full' CHECK (payment_mode IN ('full', 'dp_50', 'dp_30')),
    down_payment_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    balance_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending' 
        CHECK (payment_status IN ('pending', 'partial_dp_paid', 'paid', 'refunded', 'expired', 'failed')),
    
    -- Operational Status
    order_status VARCHAR(50) NOT NULL DEFAULT 'new'
        CHECK (order_status IN ('new', 'confirmed', 'fitting_scheduled', 'in_alteration', 'shipped', 'active_rental', 'returned_inspected', 'completed', 'cancelled')),
    
    -- Midtrans Gateway References
    midtrans_snap_token TEXT,
    midtrans_transaction_id VARCHAR(100),
    
    customer_notes TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Order Line Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('rental', 'purchase')),
    
    -- Rental Schedule
    rental_start_date DATE,
    rental_end_date DATE,
    rental_days INT DEFAULT 3,
    
    -- Custom Sizing (for custom purchase or alteration)
    custom_measurements JSONB, -- { "bust": 86, "waist": 68, "hips": 94, "heels_cm": 10 }
    
    unit_price NUMERIC(14, 2) NOT NULL DEFAULT 0,
    security_deposit NUMERIC(14, 2) NOT NULL DEFAULT 0,
    quantity INT NOT NULL DEFAULT 1,
    subtotal NUMERIC(14, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Payment Transactions & Gateway Log Table
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    gateway VARCHAR(50) NOT NULL DEFAULT 'midtrans',
    gateway_transaction_id VARCHAR(120),
    payment_type VARCHAR(50), -- e.g. qris, bank_transfer, credit_card, gopay, shopeepay
    gross_amount NUMERIC(14, 2) NOT NULL,
    transaction_status VARCHAR(50) NOT NULL, -- pending, settlement, capture, expire, cancel, deny
    fraud_status VARCHAR(50),
    status_message TEXT,
    raw_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Private Fitting Appointments Table
CREATE TABLE IF NOT EXISTS fitting_appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(150),
    appointment_date DATE NOT NULL,
    appointment_time_slot VARCHAR(30) NOT NULL, -- e.g. '10:00 - 11:00', '13:30 - 14:30'
    occasion VARCHAR(80),                       -- e.g. Wedding Ceremony, Evening Gala
    selected_gowns JSONB DEFAULT '[]'::jsonb,   -- Array of product IDs requested to try on
    special_requests TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled'
        CHECK (status IN ('scheduled', 'confirmed', 'completed', 'rescheduled', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Articles & Bridal Journal Table
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    category VARCHAR(80) NOT NULL, -- e.g. 'Bridal Trends', 'Silhouette Guide', 'Fabric & Care'
    cover_image TEXT NOT NULL,
    author_name VARCHAR(100) DEFAULT 'Elinboend Bridal Atelier',
    reading_time_minutes INT DEFAULT 4,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Customer Testimonials & Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_title VARCHAR(150),
    review_text TEXT NOT NULL,
    wedding_date DATE,
    photos JSONB DEFAULT '[]'::jsonb,
    is_verified_bride BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE fitting_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can view active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view available variants" ON product_variants FOR SELECT USING (is_available = true);
CREATE POLICY "Public can view published articles" ON articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);

-- Customer Booking & Checkout Insert Policies
CREATE POLICY "Public can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view their own order by order_number" ON orders FOR SELECT USING (true);
CREATE POLICY "Public can create order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create fitting appointments" ON fitting_appointments FOR INSERT WITH CHECK (true);
