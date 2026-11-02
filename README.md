# Elinboend Bridal Atelier

> Luxury Haute Couture & Bridal Boutique Web Application specializing in **Wedding Gowns** and **Party Dresses** (Rental, Custom Tailoring, and Purchase), featuring an editorial marketplace catalog and integrated **Payment Gateway** (Midtrans Snap QRIS & Virtual Accounts).

---

## 🌟 Key Features

1. **Marketplace Discovery & Real-Time Filtering**:
   - Filter wedding gowns and evening dresses by **Dress Silhouette** (*Ballgown, A-Line, Mermaid, Sheath, Modern Kebaya*), **Occasion** (*Holy Matrimony, Reception, Gala, Bridesmaid*), **Price Range**, and **Size**.
   - Dual-tab category switcher (*By Silhouette* vs *By Occasion*).
2. **Flash Trunk Show & Limited Rental Specials**:
   - Live countdown timer with limited-availability slot badges.
3. **Integrated Payment Gateway (Midtrans Snap)**:
   - Supports **Down Payment (DP 50%)** and **Full Settlement**.
   - Channels: **QRIS** (GoPay, ShopeePay, BCA Mobile, Dana), **Virtual Accounts** (BCA, Mandiri, BRI, BNI), and **Credit Cards**.
   - Refundable security deposit (*uang jaminan*) handling.
4. **Private Atelier Fitting Booking**:
   - Schedule 1-on-1 private fitting sessions in the Bintaro showroom with personal bridal stylists.
5. **The Bridal Journal (Articles)**:
   - Editorial guides covering gown silhouettes, rental vs purchase budget allocation, and fitting etiquette.
6. **Atelier Heritage & FAQ**:
   - Showroom location, directions, craftsmanship philosophy, and rental policies.

---

## 📚 Project Documentation

- [AGENTS.md](file:///d:/01_Projects/Elinboendbridal/AGENTS.md) — Project development rules, 5-step algorithm, and UI language policy.
- [docs/prd.md](file:///d:/01_Projects/Elinboendbridal/docs/prd.md) — Product Requirements Document (PRD).
- [docs/ROADMAP.md](file:///d:/01_Projects/Elinboendbridal/docs/ROADMAP.md) — Development milestones and phase tracking.
- [docs/feature_list.md](file:///d:/01_Projects/Elinboendbridal/docs/feature_list.md) — Detailed specifications for every module.
- [docs/tech-stack.md](file:///d:/01_Projects/Elinboendbridal/docs/tech-stack.md) — Architecture, tools, and libraries.
- [docs/schema.sql](file:///d:/01_Projects/Elinboendbridal/docs/schema.sql) — Supabase PostgreSQL database schema with Row Level Security (RLS).
- [docs/payment-gateway.md](file:///d:/01_Projects/Elinboendbridal/docs/payment-gateway.md) — Midtrans Snap payment gateway integration guide.

---

## 💻 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4
- **State Management**: TanStack React Query + Zustand
- **Payment Gateway**: Midtrans Snap SDK (QRIS, VA, Cards)
- **Database / Backend**: Supabase (PostgreSQL, Storage, Edge Functions)
- **Icons & Motion**: Lucide React + Framer Motion
