# Project Rules & Guidelines (AGENTS.md) - Elinboend Bridal

## Project Overview
**Elinboend Bridal** is a luxury bridal and evening couture boutique web application specializing in **Wedding Gowns** and **Party Dresses** (rental, custom tailoring, and purchase). The platform features an editorial marketplace-style storefront, category discovery by silhouette/occasion, real-time catalog filtering, flash trunk show promos, bridal journal/articles, atelier profile, fitting appointment bookings, and an integrated **Payment Gateway** (e.g. Midtrans / Snap QRIS & Virtual Accounts) alongside WhatsApp concierge checkout.

---

## Developer Profile & Preferences
- **OS Environment**: Windows. Always assume Windows paths and use PowerShell for terminal commands.
- **Project Isolation**: Maintain a strict boundary for `Elinboendbridal`. Do not leak dependencies or configuration outside this directory.
- **Tech Stack Focus**:
  - **Frontend**: React 19 + TypeScript + Vite + TailwindCSS v4
  - **Backend & Database**: Supabase (PostgreSQL, Supabase Auth, Row Level Security)
  - **Payment Gateway**: Midtrans Snap API (QRIS, Virtual Account, Credit Card) / Supabase Edge Functions
  - **State Management**: TanStack React Query (server state) + Zustand (cart & checkout state)
  - **UI / Icons**: Lucide React + Framer Motion (delightful micro-interactions)
- **Quality Standard**:
  - **Aesthetics**: High-end bridal luxury (clean editorial layout, elegant typography, warm ivory/champagne/rose-gold accents, dark charcoal contrast).
  - **Performance**: Instant client-side catalog filtering, responsive mobile-first navigation, image optimization for heavy bridal photography, zero CLS (Cumulative Layout Shift).
  - **Reliability**: Resilient payment state machine (Pending, Settlement, Expired, Denied) with idempotent webhooks and fallback to WhatsApp bridal concierge.

---

## Development Philosophy (5-Step Algorithm)
1. **Question Every Requirement**:
   - Differentiate clearly between **Rental** (requires security deposit, return date, condition check) and **Custom Purchase** (requires measurement specifications and production lead-time).
   - Only implement features essential to bridal customers and atelier operations.
2. **Delete Parts or Processes**:
   - Avoid bloated multi-step checkout questionnaires; keep payment gateway transactions direct and offer one-click WhatsApp assistance for custom fittings.
   - Strip out unnecessary third-party tracking scripts or redundant libraries.
3. **Simplify and Optimize**:
   - Store cart and rental reservations in local storage with persistent Zustand hydration.
   - Utilize lightweight client-side filtering for silhouettes, price ranges, and occasions to keep database egress low.
4. **Accelerate Cycle Time**:
   - Quick feedback on cart updates, instant drawer slide-ins, and clear payment gateway status modals.
5. **Automate Last**:
   - Payment status verification automated via webhooks. Gown alterations and private fitting schedules confirmed via concierge messaging.

---

## UI Language Policy
- **UI Language**: ALWAYS use **English** for the application's user interface (buttons, navigation, filters, labels, tooltips, placeholders, modal alerts, checkout steps), as strictly mandated by the developer's global rules.
- **Pricing & Currency**: Format prices in Indonesian Rupiah (`Rp 15.000.000`) with clear rental duration labels (e.g., `Rp 4.500.000 / 3 Days Rental` vs `Rp 18.000.000 (Purchase)`).
- **Articles & Editorial Content**: Can include English or bilingual bridal terminology (e.g. *Kebaya Pengantin*, *Ballgown*, *A-Line*, *Veil*, *Sewa Gaun*).

---

## Decision Rules
- **Dependencies**: Ask for explicit confirmation before installing new libraries or expanding dependencies.
- **Architecture**: Ask before making significant structural modifications to database schema or payment gateway flows.
- **Git & Version Control**:
  - Use Conventional Commits format (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
  - Follow Semantic Versioning (`MAJOR.MINOR.PATCH`).
  - Maintain primary work on `main` branch.

