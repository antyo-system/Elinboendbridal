# Project Rules & Guidelines (AGENTS.md) - Elinboend Bridal

## Project Overview
**Elinboend Bridal** is an exclusive bridal and evening boutique web application specializing in **Exclusive Wedding Gowns & Party Dresses** (rental, custom tailoring, and purchase). The platform features an editorial marketplace-style storefront, category discovery by occasion, real-time catalog filtering, bridal journal/articles, boutique profile, fitting appointment bookings, and direct **WhatsApp Concierge Checkout** (`+62 878-8011-1169`).

---

## Developer Profile & Preferences
- **OS Environment**: Windows. Always assume Windows paths and use PowerShell for terminal commands.
- **Project Isolation**: Maintain a strict boundary for `Elinboendbridal`. Do not leak dependencies or configuration outside this directory.
- **Tech Stack Focus**:
  - **Frontend**: React 19 + TypeScript + Vite + TailwindCSS v4
  - **Backend & Database**: Supabase (PostgreSQL, Supabase Auth, Row Level Security)
  - **Checkout & Concierge**: Direct WhatsApp Concierge (`+62 878-8011-1169`)
  - **State Management**: TanStack React Query (server state) + Zustand (cart state)
  - **UI / Icons**: Lucide React
- **Quality Standard**:
  - **Aesthetics**: High-end bridal luxury (clean editorial layout, elegant typography, warm ivory/champagne/rose-gold accents, dark charcoal contrast).
  - **Performance**: Instant client-side catalog filtering, responsive mobile-first navigation, image optimization for bridal photography, zero CLS (Cumulative Layout Shift).

---

## Development Philosophy (5-Step Algorithm)
1. **Question Every Requirement**:
   - Differentiate clearly between **Rental** (requires refundable security deposit and 3-day duration) and **Custom Purchase** (made-to-measure).
   - Only implement features essential to bridal customers and boutique operations.
2. **Delete Parts or Processes**:
   - Avoid bloated multi-step checkout questionnaires or third-party payment gateway friction; keep all orders and fitting bookings direct via one-click WhatsApp Concierge.
   - Strip out unnecessary third-party tracking scripts or redundant libraries.
3. **Simplify and Optimize**:
   - Store bridal bag selections in Zustand state.
   - Utilize lightweight client-side filtering for occasions, price ranges, and sizes to keep database egress low.
4. **Accelerate Cycle Time**:
   - Quick feedback on cart updates, instant drawer slide-ins, and pre-formatted WhatsApp order summaries.
5. **Automate Last**:
   - Gown alterations, order confirmations, and private fitting schedules confirmed via WhatsApp concierge messaging.

---

## UI Language Policy
- **UI Language**: ALWAYS use **English** for the application's user interface (buttons, navigation, filters, labels, tooltips, placeholders, alerts), as strictly mandated by the developer's global rules.
- **Pricing & Currency**: Format prices in Indonesian Rupiah (`Rp 15.000.000`) with clear rental duration labels (e.g., `Rp 4.500.000 / 3 days rental` vs `Rp 18.000.000 (custom made)`).
- **Articles & Editorial Content**: Can include English or bilingual bridal terminology (e.g. *Kebaya Pengantin*, *Ballgown*, *A-Line*, *Veil*, *Sewa Gaun*).

---

## Decision Rules
- **Dependencies**: Ask for explicit confirmation before installing new libraries or expanding dependencies.
- **Architecture**: Ask before making significant structural modifications to database schema or core flows.
- **Git & Version Control**:
  - Use Conventional Commits format (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
  - Follow Semantic Versioning (`MAJOR.MINOR.PATCH`).
  - Maintain primary work on `main` branch.
