# Product Roadmap - Elinboend Bridal

This roadmap outlines the development milestones for **Elinboend Bridal**, progressing from foundation architecture to full-scale digital atelier and live production deployment. For the actionable step-by-step live deployment checklist, see [`../CHECKLIST.md`](../CHECKLIST.md).

---

## 🗺️ Milestone Overview

```
Milestone 1: Foundation, Clean UI/UX & Core Storefront (COMPLETED)
   ├── Vite + React 19 + TypeScript + TailwindCSS v4 Setup
   ├── Clean Editorial Theme & Simplified 4-Table Database Schema
   ├── Fixed Hero Hook Banner & 4 Occasion Collection Cards
   └── Marketplace Catalog with Instant Search, Filter Badge & Sort

Milestone 2: Product Detail (Editorial UI), Bridal Bag & Checkout (COMPLETED)
   ├── Modern Fashion Editorial Product Detail Page (/products/:id)
   ├── Segmented Pill Toggle (3-Day Rental vs Buy Custom) & Clean Size Pills
   ├── Zustand Persistent Bridal Bag Drawer & Security Deposit Calculator
   └── Midtrans Payment Modal (50% DP / Full Payment) + WhatsApp (+62 878-8011-1169)

Milestone 3: Custom Domain & Hosting (IN PROGRESS)
   ├── Vercel SPA Routing (vercel.json) & GitHub Auto-Deploy
   ├── Hostinger DNS (A Record @ & CNAME www) Binding to Vercel
   └── Automated SSL / HTTPS Provisioning

Milestone 4: Database & Backend Live (READY FOR EXECUTION)
   ├── Supabase Production Project & 4-Table Schema Execution (docs/schema.sql)
   ├── Public Storage Bucket (bridal-media) for High-Res Gown Photography
   └── Vercel Environment Variables Binding

Milestone 5: Payment Gateway Live (READY FOR EXECUTION)
   ├── Midtrans Production Access Keys (QRIS, Virtual Account, Credit Card)
   ├── Supabase Edge Functions (create-snap-token & midtrans-webhook)
   └── Real-time Payment Notification Webhook Synchronization

Milestone 6: Pre-Launch QA, SEO & Go-Live Verification
   ├── Cross-Device Mobile & Desktop UX Verification
   ├── OpenGraph & Social Sharing Preview Check
   └── End-to-End Live Transaction Test
```

---

## 📅 Detailed Phases & Status

### Phase 1: Foundation & Design System
- [x] Repository initialization & remote setup (`antyo-system/Elinboendbridal`).
- [x] Core guidelines definition (`AGENTS.md`).
- [x] Architecture documentation (`prd.md`, `ROADMAP.md`, `feature_list.md`, `tech-stack.md`, `schema.sql`, `payment-gateway.md`).
- [x] Scaffolding: Vite + React 19 + TypeScript + TailwindCSS v4.
- [x] Theme Configuration: Custom luxury palette (`ivory`, `champagne`, `gold`, `charcoal`, `blush`).
- [x] Typography setup: `Cormorant Garamond` serif display headings + `Plus Jakarta Sans` crisp sans-serif body.

### Phase 2: Core Pages & Marketplace
- [x] **Home Page (`/`)**:
  - Clean Header (removed top announcement bar for clutter-free navigation).
  - Fixed Hero Hook with high-impact editorial imagery and direct CTAs.
  - 4 Curated Collection Cards by Occasion (*Holy Matrimony / Akad*, *Wedding Reception*, *Evening Party & Gala*, *Bridesmaids & Family*).
  - Marketplace layout with search bar, filter button with active count badge, sort dropdown, and streamlined sidebar filters.
- [x] **Product Detail Page (`/products/:id`)**:
  - Redesigned with **Modern Fashion Editorial (9.5/10)** hierarchy: segmented service pill toggle, dynamic price block, clean `XS`–`Custom` size buttons, size guide modal, collapsible accordions, and related gowns grid.
- [x] **Articles / Bridal Journal (`/articles` & `/articles/:slug`)**:
  - Category filtering and full editorial article reader with related gown recommendations.
- [x] **About Us (`/about`)**:
  - Atelier story, craftsmanship pillars, showroom location, and private fitting booking form.

### Phase 3: Payment Gateway & Shopping Bag
- [x] Shopping Bag slide-over drawer with item breakdown (Rental period, Deposit, Custom sizing notes).
- [x] Payment Modal handler for:
  - Down Payment (50% reservation fee) vs Full Payment (100%).
  - QRIS, Virtual Accounts (BCA, Mandiri, BRI, BNI), and Credit Card.
- [x] WhatsApp Concierge integration across all touchpoints (`+62 878-8011-1169`).

### Phase 4–6: Live Production Readiness
- See [`CHECKLIST.md`](../CHECKLIST.md) for the complete step-by-step live deployment checklist (Hostinger → Vercel, Supabase Production, Midtrans Live, and Final QA).
