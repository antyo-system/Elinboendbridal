# Tech Stack & Architecture - Elinboend Bridal

## 1. Frontend Core
- **React 19**: Component-based UI with concurrent rendering and hooks.
- **TypeScript 5+**: End-to-end type safety for gown catalog, cart items, and fitting appointments.
- **Vite 6**: Lightning-fast HMR and optimized production builds.
- **React Router DOM v7**: Client-side routing (`/`, `/products/:id`, `/articles`, `/articles/:slug`, `/about`).

---

## 2. Styling & UI System
- **TailwindCSS v4**: Utility-first styling with custom luxury bridal color tokens:
  - `cream` (`#FAF7F2`, `#F5EFE6`): Warm ivory editorial background.
  - `primary` (`#A67C68`, `#8C624F`): Champagne rose-gold accent.
  - `charcoal` (`#181615`, `#2D2926`): Deep luxury contrast for typography and primary CTAs.
  - `gold` (`#D4AF37`): Subtle metallic highlights.
- **Typography**:
  - **Display / Headings**: `Cormorant Garamond` (Google Fonts) for editorial elegance.
  - **Body / Controls**: `Plus Jakarta Sans` for crisp marketplace readability.
- **Icons**: `lucide-react` for clean, lightweight iconography.

---

## 3. State Management
- **Zustand (`useCartStore`)**:
  - Manages Bridal Bag items (`rental` vs `purchase`), size selections, subtotal, refundable security deposit, and total full payment calculation.
- **TanStack React Query**:
  - Server-state caching and synchronization with Supabase.

---

## 4. Backend, Database & Checkout
- **Supabase (PostgreSQL)**:
  - Streamlined 4-table schema (`products`, `orders`, `fitting_appointments`, `articles`) with Row Level Security (RLS).
  - Automatic fallback to curated local bridal data (`src/data/mockData.ts`) when environment variables are not yet configured.
- **Direct WhatsApp Concierge Checkout**:
  - Zero third-party payment gateway bloat; all orders, bag checkouts, and private fitting reservations route directly to **`+62 878-8011-1169`** with pre-formatted summaries.

---

## 5. Hosting & Deployment
- **Vercel**: Continuous deployment from GitHub (`main` branch) with SPA routing configured in `vercel.json`.
- **Custom Domain**: `elinboendbridal.com` / `www.elinboendbridal.com` (DNS managed via Hostinger `A` and `CNAME` records).
