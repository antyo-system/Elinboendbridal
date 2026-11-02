# Tech Stack - Elinboend Bridal

Comprehensive technical stack specification for the **Elinboend Bridal** web application.

---

## 1. Core Framework & Build Tooling
- **Vite 6+**: High-speed frontend build tool providing rapid Hot Module Replacement (HMR) and optimized rollup production bundles.
- **React 19**: Modern UI library utilizing React compiler readiness, improved hooks, and concurrent rendering capabilities.
- **TypeScript 5+**: End-to-end type safety covering product attributes, rental duration states, customer payloads, and payment gateway responses.
- **Node.js (LTS)**: Package execution environment on Windows with PowerShell terminal tooling.

---

## 2. Styling & Design System
- **Tailwind CSS v4**: Latest atomic CSS engine providing lightning-fast builds with `@tailwindcss/vite` integration.
- **Luxury Bridal Theme Tokens**:
  - `primary`: Elegant warm champagne / rose-gold (`#C5A880`, `#DFCCAF`, `#947854`).
  - `charcoal`: Editorial dark luxury tones (`#1A1A1A`, `#2D2D2D`, `#4A4A4A`).
  - `cream / ivory`: Soft boutique backdrop tones (`#FAF8F5`, `#F4EFEA`, `#EFE8DE`).
  - `blush`: Subtle feminine accents (`#FCEEE9`, `#F7D6CD`).
  - `gold`: Premium badges and highlights (`#D4AF37`, `#AA820A`).
- **Typography**:
  - Headings: High-contrast editorial Serif (e.g. `Cormorant Garamond`, `Playfair Display`, or system serif fallback).
  - Body & UI: Clean, geometric Sans-Serif (e.g. `Plus Jakarta Sans`, `Inter`).

---

## 3. Client State & Data Management
- **TanStack React Query v5**:
  - Handles server-state caching for gowns, party dresses, categories, reviews, and articles.
  - Configured with 5-minute stale time and background refetching on window focus.
- **Zustand v5**:
  - Lightweight, un-opinionated state store for:
    - Shopping Bag items (`useCartStore`) with `localStorage` persistence.
    - Active marketplace filter criteria (`useFilterStore`).
    - Fitting booking appointment draft state (`useBookingStore`).

---

## 4. Payment Gateway Architecture
- **Midtrans Snap SDK**:
  - Client-side modal library (`https://app.sandbox.midtrans.com/snap/snap.js` for development; `https://app.midtrans.com/snap/snap.js` for production).
  - Zero-redirect checkout experience directly within the web application.
- **Payment Methods Supported**:
  - **QRIS**: Instant settlement via GoPay, ShopeePay, Dana, LinkAja, and Mobile Banking.
  - **Virtual Accounts**: Automatic payment verification for BCA, Mandiri, BRI, BNI, Permata.
  - **Credit / Debit Cards**: 3D Secure authentication with Visa, Mastercard, and JCB.
- **Backend / Edge Function Token Dispatcher**:
  - Securely signs transactions with `SERVER_KEY` to generate the unique `snap_token`.
  - Implements webhook receiver for payment state transitions (`capture`, `settlement`, `pending`, `deny`, `expire`, `cancel`).

---

## 5. Database & Backend Services
- **Supabase (PostgreSQL 15+)**:
  - Relational database storing product catalogs, dress variants, rental schedules, orders, payments, fitting appointments, and editorial articles.
  - **Row Level Security (RLS)**: Public read-only access for published catalog; authenticated role required for administrative updates.
  - **Supabase Storage**: CDN-backed image buckets for high-resolution gown photography.
  - **Supabase Edge Functions**: TypeScript serverless functions handling Snap token generation and Midtrans webhook verification.

---

## 6. Icons & Micro-Interactions
- **Lucide React**: Clean, lightweight icon suite for e-commerce iconography (Shopping Bag, Search, Heart, Sparkles, Calendar, Filter, Chevron, ShieldCheck).
- **Framer Motion**: Smooth drawer transitions, modal popovers, category slider momentum, and micro-interactions.

---

## 7. Performance & SEO Tooling
- **Dynamic SEO Injector**: Utilities for OpenGraph, Twitter Cards, canonical URL tags, and structured JSON-LD schemas:
  - `schema.org/ClothingStore` / `BridalShop`
  - `schema.org/Product` with rental and purchase price offers.
  - `schema.org/Article` for bridal journal content.
  - `schema.org/FAQPage` for fitting and rental inquiries.
- **Image Optimization**: Local lazy loading, responsive srcset generation, and blur-up placeholder patterns.
