# Product Roadmap - Elinboend Bridal

This roadmap outlines the development milestones for **Elinboend Bridal**, progressing from foundation architecture to full-scale digital atelier and payment gateway integration.

---

## 🗺️ Milestone Overview

```
Phase 1: Foundation & Setup
   ├── Vite + React 19 + TypeScript + TailwindCSS v4 Setup
   ├── Architecture & Design System (Luxury Editorial Theme)
   └── Mock Bridal Data & Supabase Client Setup

Phase 2: Core Storefront & Catalog Experience
   ├── Top Navigation Header & Responsive Mobile Menu
   ├── Hero Banner Carousel & Silhouette/Occasion Switcher
   ├── Flash Trunk Show Section with Countdown Timer
   ├── Marketplace Catalog with Real-time Filtering
   └── Articles (Bridal Journal) & About Atelier Pages

Phase 3: Shopping Bag & Payment Gateway Integration
   ├── Zustand Shopping Bag Store & Slide-over Drawer
   ├── Rental vs Purchase Selection & Security Deposit Calculator
   ├── Midtrans Snap Gateway Client Modal Integration
   ├── Supabase Edge Function for Snap Token Generation
   └── Webhook Callback Listener & Payment State Synchronization

Phase 4: Atelier Fitting Appointment & Availability Engine
   ├── Private Fitting Slot Scheduler (`/fitting`)
   ├── Gown Date-picker Availability Verification
   └── WhatsApp Concierge Booking Fallback & Notification

Phase 5: Performance, SEO & Launch
   ├── Schema.org JSON-LD (BridalShop, Product, Article)
   ├── Image Optimization & Lazy Loading
   ├── PWA Manifest & Service Worker Cache
   └── Vercel Deployment & Domain Binding
```

---

## 📅 Detailed Phases & Tasks

### Phase 1: Foundation & Design System (Current)
- [x] Repository initialization & remote setup.
- [x] Core guidelines definition (`AGENTS.md`).
- [x] Architecture documentation (`prd.md`, `ROADMAP.md`, `feature_list.md`, `tech-stack.md`, `schema.sql`, `payment-gateway.md`).
- [ ] Scaffolding: Vite + React 19 + TypeScript + Tailwind CSS.
- [ ] Theme Configuration: Custom luxury palette (`ivory`, `champagne`, `gold`, `charcoal`, `blush`).
- [ ] Typography setup: Elegant serif display fonts for bridal headings + crisp sans-serif for body/filters.

### Phase 2: Core Pages & Marketplace (Priority Next)
- [ ] **Home Page (`/`)**:
  - Hero Carousel with high-res bridal imagery and direct CTAs.
  - "Discover by Silhouette" (Ballgown, A-Line, Mermaid, Column) and "Discover by Occasion" (Ceremony, Reception, Evening, Bridesmaid).
  - Flash Trunk Show with real-time countdown timer.
  - Marketplace layout with left sidebar filters (Price slider, Occasion, Silhouette, Size, Rental vs Buy).
  - Luxury Product Cards with hover effects, badges, price comparison, and quick-rent buttons.
- [ ] **Articles / Bridal Journal (`/articles`)**:
  - Article list with category tabs (Trends, Tips, Guides).
  - Editorial layout for single article (`/articles/:slug`).
- [ ] **About Us (`/about`)**:
  - Atelier story, craftsmanship, designer profile, customer reviews.
  - Showroom address, opening hours, interactive map link, and fitting etiquette FAQ.

### Phase 3: Payment Gateway & Shopping Bag
- [ ] Shopping Bag slide-over drawer with item breakdown (Rental period, Deposit, Custom sizing notes).
- [ ] Midtrans Snap client library integration (`snap.js`).
- [ ] Payment gateway handler for:
  - Down Payment (30% / 50% reservation fee).
  - Full Payment (immediate purchase or rental fee + deposit).
  - Virtual Accounts (BCA, Mandiri, BRI, BNI), QRIS, Credit Cards.
- [ ] Payment success, pending, and failure callback modal.
- [ ] Order confirmation receipt and WhatsApp notification copy.

### Phase 4: Fitting Booking System
- [ ] Interactive booking calendar with available time slots (e.g. 10:00, 13:00, 15:30).
- [ ] Selection of up to 3 preferred gowns to prepare in advance.
- [ ] Automated confirmation message sent to customer's WhatsApp.

### Phase 5: Production Optimization & SEO
- [ ] Automated sitemap generation (`scripts/generate_sitemap.mjs`).
- [ ] Structured Data JSON-LD (`BridalShop`, `LocalBusiness`, `Product`, `FAQPage`).
- [ ] Asset compression with WebP formats for gown photo galleries.
- [ ] Lighthouse audit targeting >90 scores.
