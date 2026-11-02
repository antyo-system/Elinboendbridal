# Product Requirements Document (PRD) - Elinboend Bridal

## 1. Project Overview
**Elinboend Bridal** is a modern, luxury web application and digital atelier for a premier bridal boutique specializing in **Wedding Gowns** and **Party Dresses**. Inspired by the high-converting, marketplace-style UI/UX of `kembangseladangweb`, this platform delivers an editorial e-commerce experience that bridges digital discovery with physical boutique services (gown rental, custom couture purchase, and private atelier fittings).

Unlike pure WhatsApp-based flower ordering, Elinboend Bridal introduces an integrated **Payment Gateway** (Midtrans / Snap QRIS & Virtual Accounts) to allow customers to pay rental booking fees, down payments (DP), security deposits, and accessories purchases directly and securely.

---

## 2. Core Objectives
1. **Editorial Luxury Marketplace**: Present wedding gowns and evening dresses in an intuitive e-commerce catalog featuring real-time filters (Silhouette, Occasion, Rental vs. Buy, Size, and Price Range).
2. **Dual Commerce Model (Rental & Purchase)**: Support both gown rental (with duration & deposit specifications) and custom made-to-measure purchases.
3. **Automated Payment Gateway**: Facilitate instant payments via Midtrans (QRIS, VA Bank Transfer, Credit Card) with automated payment confirmation callbacks and status tracking.
4. **Private Fitting Concierge**: Enable brides and party guests to book in-person styling consultations and fitting appointments at the atelier.
5. **Content & SEO Authority**: Provide a Bridal Journal/Articles section covering bridal guides, silhouette guides, color palettes, and dress care to attract organic brides-to-be.
6. **Mobile-First Luxury Experience**: Ensure fluid performance, responsive drawers, and high-fidelity visual presentation optimized for modern smartphones.

---

## 3. User Personas
- **The Bride-to-Be (Elena, 26-32)**: Looking for her dream wedding gown (ballgown, A-line, or modern minimalist). Cares about silhouette, fabric details, rental vs. buy options, and wants to lock in a private fitting appointment and secure her booking slot online.
- **The Wedding Guest / Bridesmaid (Siti, 22-29)**: Seeking elegant evening party dresses or bridesmaid coordination. Prefers fast filtering by color, size, and price, with instant online checkout.
- **The Mother of Bride/Groom (Dewi, 48-60)**: Wants refined, sophisticated gowns with custom alterations and WhatsApp personal styling assistance.
- **Atelier Admin / Stylist (Elin & Team)**: Manages product availability, fitting schedules, incoming payments, deposit refunds, and customer order records.

---

## 4. Feature Specifications

### 4.1 Home & Marketplace Page (`/` and `/products`)
Follows the proven high-converting layout from the reference project:
- **Top Navigation Bar**:
  - Clean minimalist header: `HOME`, `ARTICLES`, `ABOUT`.
  - Centered brand logo: **Elinboend Bridal**.
  - Action icons: Search modal, Account/Fitting lookup, Shopping Bag with real-time count badge.
- **Fixed Hero Hook Section**:
  - High-impact editorial photography highlighting "The Haute Bridal Collection".
  - Clear, direct Call-to-Action: *"Explore Wedding Gowns"* & *"Chat Stylist"*.
  - Clean, static luxury hook without slider overengineering.
- **Curated Collection Discovery**:
  - Clean, single-dimension category cards focusing on primary celebration events: **Holy Matrimony & Ceremony**, **Wedding Reception**, **Evening Party & Gala**, and **Bridesmaids & Family**.
  - Streamlined horizontal scrollable cards with high-res thumbnails that directly filter the marketplace catalog without tab toggle friction.
- **Marketplace Catalog Section**:
  - **Left Sidebar Filter**:
    - Price Range Slider (Min - Max IDR).
    - Mode: All, Rental Only, Purchase Only.
    - Silhouette / Cut: Ballgown, A-Line, Mermaid, Fit & Flare, Sheath.
    - Occasion / Event: Wedding Ceremony, Reception, Evening Gala, Bridesmaid, Engagement.
    - Color Palette: Ivory, Pure White, Champagne, Blush, Navy, Emerald, Burgundy, Gold.
    - Size: XS, S, M, L, XL, Custom Size.
  - **Right Product Grid**:
    - Product count and active category indicator.
    - Responsive grid (2 columns on mobile, 3-4 columns on desktop).
    - Luxury Product Cards:
      - High-resolution dress image with hover secondary angle.
      - Badges: `Rental Available`, `Custom Made`, `Best Seller`, `Exclusive`.
      - Dress title, collection tag.
      - Pricing: Rental price per 3-day period and purchase price.
      - Quick Add to Bag / Rent button.

### 4.2 Product Detail Page (`/products/:id`)
- Image Gallery: Multi-angle photos (front, back, train, fabric close-up) with zoom capability.
- Rental vs Purchase Selector:
  - Option A: **Rent (3-7 Days)** - Select rental date range, security deposit policy notice.
  - Option B: **Buy Custom Made** - Custom size measurement input (Bust, Waist, Hips, Height with Heels).
- Gown Specifications: Fabric type (French Lace, Mikado Silk, Tulle), train length, neckline, corset type.
- Complementary Accessories: Recommended matching veil, hairpiece, or bridal robe.
- Direct Actions: "Book for This Date", "Add to Bag", and "Chat Stylist on WhatsApp".

### 4.3 Shopping Bag & Payment Gateway Integration
- **Slide-Over Cart Drawer**:
  - Item listing with selected rental dates or custom size notes.
  - Transparent price breakdown: Subtotal, Security Deposit (refundable for rentals), Alteration Fee (optional), Total.
- **Integrated Payment Gateway Checkout**:
  - Integration with **Midtrans Snap** (supporting QRIS, BCA/Mandiri/BRI/BNI Virtual Accounts, Credit Cards, GoPay, ShopeePay).
  - Payment Options:
    - **Down Payment (DP 30% / 50%)**: Lock in gown reservation for wedding date.
    - **Full Payment**: Immediate settlement for accessories or ready-to-wear party dresses.
  - Client-side Snap Modal: Opens seamless popup on web/mobile without redirect friction.
  - Backend Webhook: Handles transaction updates (`pending`, `settlement`, `expire`, `cancel`) and updates order records.
  - Fallback Concierge: Option to finalize order via WhatsApp with pre-filled cart summary.

### 4.4 Private Fitting Appointment Booking (`/fitting`)
- Interactive date & time slot picker for in-store boutique consultation (1 hour private session).
- Gown pre-selection (select up to 3 gowns to prepare in fitting suite).
- Automated confirmation with atelier location details and calendar reminder.

### 4.5 Bridal Journal / Articles (`/articles` & `/articles/:slug`)
- Editorial blog focusing on wedding advice, gown trends, fabric care, and real bride spotlights.
- Categories: *Bridal Trends*, *Silhouette Guides*, *Wedding Planning*, *Fabric & Care*.
- Featured article cards with reading time, publication date, author, and related gown recommendations.

### 4.6 About Us Page (`/about`)
- The story of **Elinboend Bridal**: Craftsmanship, dedication to fit, and personalized service.
- Atelier showroom virtual tour, address in Tangerang Selatan / Jabodetabek, opening hours, Google Maps embed.
- FAQ accordion: How rental works, deposit refund policy, fitting etiquette, alteration policies.

---

## 5. Non-Functional Requirements
- **Performance**: Lighthouse score > 90 on Desktop and > 85 on Mobile. Image assets lazy-loaded with WebP/AVIF format.
- **SEO & Social Sharing**: Complete OpenGraph, Twitter Card tags, and Schema.org structured data (`BridalShop`, `Product`, `Article`, `BreadcrumbList`).
- **Security**: Strict Supabase Row Level Security (RLS), sanitized payment webhooks with SHA-512 signature verification, environment secret protection.
- **Accessibility & UX**: Compliant with WCAG 2.1 AA contrast standards, keyboard accessible drawer, screen-reader friendly filter controls.

