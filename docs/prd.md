# Product Requirements Document (PRD) - Elinboend Bridal

## 1. Executive Summary
**Elinboend Bridal** is a luxury digital storefront specializing in **Exclusive Wedding Gowns & Party Dresses**. The platform allows brides-to-be and evening event attendees to browse curated bridal collections, filter by occasion/size/price, book private fitting sessions, and reserve gowns for **3-Day Rental** or **Custom Purchase** directly through **WhatsApp Concierge (`+62 878-8011-1169`)**.

---

## 2. Core Objectives
1. **Luxury Visual Identity**: Deliver a refined, editorial browsing experience with warm champagne/ivory tones, serif display typography, and high-resolution gown imagery.
2. **Dual Acquisition Model**: Support both **Gown Rental** (3-day period + refundable security deposit) and **Made-to-Measure Purchase**.
3. **Frictionless WhatsApp Concierge Checkout**: Enable customers to add multiple gowns to their Bridal Bag or order directly from any product page with a pre-formatted WhatsApp order message (`+62 878-8011-1169`).
4. **Private Fitting Scheduling**: Allow brides to book private studio fitting appointments directly via WhatsApp.

---

## 3. Target Audience
- **Brides-to-Be (Ages 22–35)**: Seeking wedding gowns (Ballgown, A-Line, Mermaid, Sheath, Modern Kebaya) for Holy Matrimony (*Akad / Pemberkatan*) and Wedding Receptions.
- **Bridesmaids, Mothers of the Bride & Gala Guests**: Seeking elegant evening dresses and party gowns for formal receptions, galas, and *Sangjit* ceremonies.

---

## 4. Key Functional Modules
### 4.1 Home & Discovery Storefront (`/`)
- **Clean Top Navigation Bar**: Brand logo (`Elinboend Bridal — Exclusive Wedding Gowns & Party Dresses`), navigation links (`HOME`, `ARTICLES`, `ABOUT`), Fitting shortcut, and Shopping Bag drawer trigger with live item badge.
- **Fixed Hero Hook Banner**: High-impact editorial banner with direct CTA to explore the catalog or chat with a bridal stylist.
- **Curated Collection Cards (By Occasion)**:
  - *Holy Matrimony / Akad*, *Wedding Reception*, *Evening Party & Gala*, *Bridesmaids & Family*.
- **Marketplace Catalog Section**:
  - Instant search bar, toggleable filter sidebar (**Service Type**, **Price Range**, **Size**), and sort dropdown.

### 4.2 Product Detail Page (`/products/:id`)
- Clean 2-column fashion editorial layout.
- Segmented toggle for **3-Day Rental** vs **Custom Purchase** with dynamic pricing and refundable security deposit info.
- Size selector (`XS` to `Custom`) with inline Size Guide (`cm`).
- Collapsible accordions for Gown Specifications and Rental Policy.
- Direct **`Add to Bag`** and **`Order via WhatsApp`** buttons.

### 4.3 Bridal Bag & WhatsApp Checkout
- **Bridal Bag Drawer**: Slide-over cart displaying selected gowns, acquisition type (`Rental` vs `Purchase`), selected size, subtotal, refundable security deposit, and **Total Payment**.
- **Direct WhatsApp Checkout**: Sends the complete itemized summary and total full payment directly to WhatsApp (`+62 878-8011-1169`).

### 4.4 Editorial Bridal Journal (`/articles` & `/articles/:slug`)
- Curated articles on wedding dress silhouettes, bridal fabric care, and styling guides.

### 4.5 About & Fitting Appointment (`/about`)
- Brand story, craftsmanship process, showroom location, FAQ accordion, and private fitting session booking form connected to WhatsApp.
