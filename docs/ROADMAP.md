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

Milestone 2: Product Detail (Editorial UI), Bridal Bag & WhatsApp Checkout (COMPLETED)
   ├── Modern Fashion Editorial Product Detail Page (/products/:id)
   ├── Segmented Pill Toggle (3-Day Rental vs Custom Purchase) & Clean Size Pills
   ├── Zustand Bridal Bag Drawer & Security Deposit Calculator
   └── Direct WhatsApp Concierge Checkout (+62 878-8011-1169)

Milestone 3: Custom Domain & Hosting (COMPLETED)
   ├── Vercel SPA Routing (vercel.json) & GitHub Auto-Deploy
   ├── Hostinger DNS (A Record @ & CNAME www) Binding to Vercel
   └── Automated SSL / HTTPS Provisioning (elinboendbridal.com)

Milestone 4: Database & Backend Live (IN PROGRESS)
   ├── Supabase Production Project & 4-Table Schema Execution (docs/schema.sql)
   ├── Public Storage Bucket (bridal-media) for High-Res Gown Photography
   └── Vercel Environment Variables Binding

Milestone 5: Pre-Launch QA, SEO & Go-Live Verification
   ├── Cross-Device Mobile & Desktop UX Verification
   ├── OpenGraph & Social Sharing Preview Check
   └── End-to-End WhatsApp Order Flow Test
```

---

## 📅 Detailed Phases & Status

### Phase 1: Foundation & Design System
- [x] Repository initialization & remote setup (`antyo-system/Elinboendbridal`).
- [x] Core guidelines definition (`AGENTS.md`).
- [x] Architecture documentation (`prd.md`, `ROADMAP.md`, `feature_list.md`, `tech-stack.md`, `schema.sql`).
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
  - Redesigned with **Modern Fashion Editorial** hierarchy: segmented service pill toggle, dynamic price block, clean `XS`–`Custom` size buttons, size guide, collapsible accordions, and direct `Add to Bag` + `Order via WhatsApp` buttons.
- [x] **Articles / Bridal Journal (`/articles` & `/articles/:slug`)**:
  - Category filtering and full editorial article reader with related gown recommendations.
- [x] **About Us (`/about`)**:
  - Atelier story, craftsmanship pillars, showroom location, and private fitting booking form integrated with WhatsApp.

### Phase 3: Bridal Bag & Direct WhatsApp Concierge
- [x] Shopping Bag slide-over drawer with item breakdown (Rental period, Security Deposit, and Total Full Payment calculation).
- [x] Direct **WhatsApp Concierge Checkout** (`+62 878-8011-1169`).

### Phase 4–5: Live Production Readiness
- See [`CHECKLIST.md`](../CHECKLIST.md) for the complete step-by-step live deployment checklist (Supabase Production & Final QA).
