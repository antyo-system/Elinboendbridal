# Feature List - Elinboend Bridal

This document details all functional features implemented in **Elinboend Bridal**.

---

## 1. Navigation & Layout
- **Sticky Editorial Header**:
  - Links: `HOME`, `ARTICLES`, `ABOUT`.
  - Center Brand Identity: **Elinboend Bridal** (*Exclusive Wedding Gowns & Party Dresses*).
  - Right Utilities: Search icon, Private Fitting shortcut, and Shopping Bag icon with real-time counter badge.
- **Luxury Footer**:
  - Collection shortcuts, rental policy links, showroom address, operating hours, and WhatsApp contact (`+62 878-8011-1169`).

---

## 2. Homepage & Discovery (`/`)
- **Fixed Hero Hook**:
  - Single high-impact luxury hook banner with direct *Explore Wedding Gowns* and *Chat Stylist* buttons.
- **Occasion Collection Cards**:
  - 4 curated collection cards: *Holy Matrimony / Akad*, *Wedding Reception*, *Evening Party & Gala*, and *Bridesmaids & Family*.
- **Catalog Search, Filter & Sort**:
  - Real-time search input for gown names, fabrics, and colors.
  - Toggleable filter sidebar with active filter badge:
    - **Service Type**: All Options, 3-Day Rental, Custom Purchase.
    - **Rental Price Range**: Slider up to Rp 25.000.000.
    - **Size Availability**: `All`, `XS`, `S`, `M`, `L`, `XL`, `Custom`.
  - Sort dropdown: *Featured*, *Newest Collection*, *Price: Low to High*, *Price: High to Low*, *Most Popular*.

---

## 3. Product Detail Page (`/products/:id`)
- **Editorial Gallery**: High-resolution 3:4 portrait display with thumbnail switcher.
- **Segmented Service Toggle**: Switch between **3-Day Rental** and **Custom Purchase** with real-time price and security deposit updates.
- **Size Selector & Size Guide**: Quick size pills (`XS`–`Custom`) with expandable Bust/Waist (`cm`) chart.
- **Direct Actions**:
  - **`Add to Bag`**: Adds the selected gown configuration to the Bridal Bag drawer.
  - **`Order via WhatsApp`**: Opens WhatsApp (`+62 878-8011-1169`) with pre-filled gown title, service option, size, and price.
- **Collapsible Accordions**:
  - *Gown Details & Specifications* (Silhouette, Occasion, Fabric, Color Tone).
  - *Complimentary Fitting & Rental Policy*.
- **Related Gowns**: Recommendations based on occasion and style.

---

## 4. Bridal Bag & WhatsApp Concierge Checkout
- **Slide-over Bridal Bag Drawer**:
  - Displays selected gowns, rental/purchase badge, size, price, and security deposit.
  - Automatic calculation of **Gown Rental / Purchase Subtotal**, **Refundable Security Deposit**, and **Total Payment**.
  - Single **`Order via WhatsApp`** checkout button that sends the complete itemized order summary to **`+62 878-8011-1169`**.

---

## 5. Bridal Journal (`/articles`) & About (`/about`)
- **Bridal Journal**: Category filter tabs and full article view with related gown recommendations.
- **About & Private Fitting**: Showroom information, craftsmanship steps, FAQ accordion, and Private Fitting Appointment form connected directly to WhatsApp.
