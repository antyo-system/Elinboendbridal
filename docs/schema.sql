-- ====================================================================
-- Lean & Practical Database Schema for Elinboend Bridal (Supabase)
-- Focus: Simplicity, high cycle time, zero overengineering.
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Products Table (Wedding Gowns & Party Dresses)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) NOT NULL UNIQUE,
    product_type VARCHAR(50) NOT NULL DEFAULT 'wedding_gown', -- 'wedding_gown' | 'party_dress'
    silhouette VARCHAR(80), -- e.g. Ballgown, A-Line, Mermaid, Sheath, Modern Kebaya
    occasion VARCHAR(80),   -- e.g. Holy Matrimony, Reception, Evening Gala, Bridesmaid
    fabric VARCHAR(150),
    description TEXT,
    
    -- Pricing & Rental Details (in IDR)
    rental_price NUMERIC(14, 2) NOT NULL DEFAULT 0,
    original_rental_price NUMERIC(14, 2), -- For strikethrough promo
    purchase_price NUMERIC(14, 2) NOT NULL DEFAULT 0,
    security_deposit NUMERIC(14, 2) NOT NULL DEFAULT 0, -- Refundable deposit
    
    -- Flash Trunk Show
    is_flash_sale BOOLEAN DEFAULT FALSE,
    flash_sale_discount_percent INT DEFAULT 0,
    flash_sale_stock INT DEFAULT 1,
    badge_label VARCHAR(60), -- e.g. 'Best Seller', 'Haute Couture'
    
    -- Flexible Sizing & Photos
    sizes_available JSONB DEFAULT '["XS", "S", "M", "L", "Custom"]'::jsonb,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Orders Table (With Integrated Midtrans State & JSONB Line Items)
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL UNIQUE, -- e.g. EB-20261102-0042
    
    -- Customer Info
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(150),
    
    -- Line Items (Direct JSONB: avoid overengineered join tables)
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    -- Financials & Payment Mode
    subtotal NUMERIC(14, 2) NOT NULL DEFAULT 0,
    security_deposit_total NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    payment_mode VARCHAR(50) NOT NULL DEFAULT 'dp_50', -- 'dp_50' | 'full'
    
    -- Payment Gateway State
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending' | 'paid' | 'failed' | 'expired'
    payment_method VARCHAR(50), -- 'qris' | 'bca_va' | 'mandiri_va' | 'credit_card'
    midtrans_snap_token TEXT,
    midtrans_transaction_id VARCHAR(100),
    
    -- Operational Status
    order_status VARCHAR(50) NOT NULL DEFAULT 'new', -- 'new' | 'confirmed' | 'fitting_scheduled' | 'completed' | 'cancelled'
    event_date DATE,
    customer_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Private Fitting Appointments Table
CREATE TABLE IF NOT EXISTS fitting_appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time_slot VARCHAR(50) NOT NULL, -- e.g. '10:00 - 11:30'
    occasion VARCHAR(80),
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled', -- 'scheduled' | 'confirmed' | 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Articles & Bridal Journal Table
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) NOT NULL UNIQUE,
    category VARCHAR(80) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    author_name VARCHAR(100) DEFAULT 'Elinboend Bridal Atelier',
    read_time VARCHAR(30) DEFAULT '4 min read',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE fitting_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public can view active products and published articles
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (is_published = true);

-- Public can insert new orders and fitting appointments
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read their own order" ON orders FOR SELECT USING (true);
CREATE POLICY "Public insert fitting appointments" ON fitting_appointments FOR INSERT WITH CHECK (true);
