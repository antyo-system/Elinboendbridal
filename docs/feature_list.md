# Feature List - Elinboend Bridal

Comprehensive specification of all features and interface modules for the Elinboend Bridal digital storefront.

---

## 1. Global Navigation & Layout

### 1.1 Header Navigation
- **Navigation Links**:
  - `HOME`: Main marketplace catalog, hero carousel, and curated collections.
  - `ARTICLES`: Bridal Journal, styling tips, silhouette guides, and fabric care.
  - `ABOUT`: Atelier heritage, bespoke tailoring process, showroom location, and FAQ.
- **Brand Identity**:
  - Centered luxury logotype: **Elinboend Bridal** (or Atelier Elin Boend).
  - Subtitle: *Haute Couture & Bridal Boutique*.
- **Quick Action Icons**:
  - **Search**: Modal search drawer to find gowns by title, fabric, or designer collection.
  - **Fitting / Bookings**: Quick lookup for fitting reservations.
  - **Shopping Bag**: Floating indicator showing item count with badge and slide-over toggle.
- **Announcement Bar**:
  - Top micro-bar displaying atelier notices (e.g. *"✨ Book a private fitting this week and get free veil styling • Free nationwide delivery for purchase orders"*).

### 1.2 Footer
- Atelier information, opening hours (Tue - Sun: 10:00 - 18:00 WIB), private appointment contact.
- Direct links: Terms of Rental, Security Deposit Policy, Alterations Guide, Privacy Policy.
- Social links: Instagram, TikTok, WhatsApp Concierge, Pinterest.
- Copyright and legal credits.

---

## 2. Home & Marketplace Storefront (`/`)

### 2.1 Hero Banner Carousel
- High-resolution editorial slider showcasing bridal and party dress collections.
- Slide contents:
  1. *The Royal Ethereal Collection* - Luxury French lace ballgowns for wedding ceremonies.
  2. *Midnight Glamour Evening Gowns* - Draped satin and velvet party dresses.
  3. *Bespoke Made-to-Measure* - Custom tailored bridal gowns crafted to your exact proportions.
- Dynamic CTA buttons: *"Explore Wedding Gowns"* & *"Book a Private Fitting"*.
- Dot indicators with auto-play pause on hover.

### 2.2 Category Switcher (Dual Dimension)
- Toggle tabs:
  - **By Dress Silhouette**:
    - *Ballgown*: Dramatic flared skirt, fitted corset bodice.
    - *A-Line Princess*: Flattering, universally elegant for ceremonies.
    - *Mermaid & Trumpet*: Form-fitting couture highlighting curves.
    - *Modern Sheath / Column*: Minimalist, lightweight, ideal for intimate weddings.
  - **By Occasion**:
    - *Holy Matrimony / Akad*: Pure white, elegant sleeves, cathedral train options.
    - *Wedding Reception*: Dazzling sparkle, crystal beading, grand entrance style.
    - *Evening Party / Gala*: Vibrant jewel tones, sophisticated slits, luxury satin.
    - *Bridesmaid & Family*: Harmonious pastel palettes, comfortable premium chiffon.
- Horizontal scrollable card carousel with thumbnail imagery and instant category filtering.

### 2.3 Flash Trunk Show / Limited Rental Specials
- Countdown Timer: Displays hours, minutes, and seconds remaining (`01 : 48 : 48`).
- Horizontal scrolling cards featuring:
  - Discount badge (e.g. `-25%`, `-30%`).
  - Dress photo with quick view.
  - Dress title and collection tag.
  - Special rental price (`Rp 3.500.000` was `Rp 4.700.000`).
  - Availability pill: `ONLY 1 SLOT LEFT FOR THIS DATE`.

### 2.4 Marketplace Filter & Product Grid
- **Left Sidebar ("Filter Catalog")**:
  - **Price Range Slider**: Maximum price filter (from Rp 1.000.000 up to Rp 50.000.000+).
  - **Acquisition Type**: All, Available for Rent, Available for Purchase.
  - **Occasion Accordion**: Holy Matrimony, Reception, Evening Gala, Engagement/Sangjit, Bridesmaid.
  - **Silhouette Accordion**: Ballgown, A-Line, Mermaid, Sheath, Kebaya Modern.
  - **Color Palette Filter**: Visual color swatch picker (Ivory, Champagne, Pure White, Blush, Navy Blue, Emerald Green, Wine Red, Black).
  - **Size Filter**: XS (Bust 80-82cm), S (84-86cm), M (88-90cm), L (92-94cm), XL (96-100cm), Custom Size.
  - Reset / Clear Filters button.
- **Right Product Grid**:
  - Active filter chips with one-click remove.
  - Product count indicator (e.g. `Showing 24 Gowns`).
  - Sorting dropdown: *Featured*, *Price: Low to High*, *Price: High to Low*, *Newest Arrivals*.
  - **Gown Product Card**:
    - High-fidelity image with secondary angle on hover.
    - Badges: `Available for Rent`, `Custom Made`, `Best Seller`.
    - Gown Title & Silhouette tag.
    - Features pill: `Free Fitting & Alteration Included`.
    - Pricing display: Rental rate (`Rp 4.500.000 / 3 Days`) and Purchase rate (`Rp 16.000.000`).
    - Quick "Add to Bag" / "Rent Now" circle button.

---

## 3. Product Detail Experience (`/products/:id`)

- Multi-photo gallery with thumbnail picker and full-screen lightbox.
- Mode Selector:
  - **Rent Option**: Choose rental start and end date (3-day or 7-day extended), shows refundable security deposit fee.
  - **Purchase Option**: Choose standard sizing or enter custom body measurements (Bust, Waist, Hips, Shoulder, Hollow-to-Hem).
- Fabric & Atelier Details: Detailed bullet points on fabric composition, lining, corset structure, and embellishments.
- Included Services:
  - Complimentary 1-on-1 alteration session.
  - Dry cleaning & steaming included upon return.
  - Luxury garment bag and wooden hanger provided.
- Action Buttons:
  - `Book Fitting for This Dress` (reserves a boutique slot).
  - `Proceed to Checkout` (adds to bag and opens payment options).
  - `WhatsApp Concierge Consultation` (direct link with pre-filled dress info).

---

## 4. Shopping Bag & Payment Gateway Integration

### 4.1 Slide-over Cart Drawer
- Smooth entrance animation from right edge.
- Item list with:
  - Thumbnail, title, selected size or custom measurement flag.
  - Rental dates or purchase type.
  - Price breakdown: Base rental/purchase price + Refundable security deposit.
  - Quantity controls & remove button.
- Summary calculation:
  - Subtotal.
  - Security Deposit (highlighted as 100% refundable after return inspection).
  - Estimated Alteration / Delivery fee.
  - Total Payable.

### 4.2 Integrated Midtrans Payment Gateway
- **Checkout Modal**:
  - Customer contact details: Full Name, WhatsApp Number, Email, Delivery / Fitting Address.
  - Payment Type Selection:
    - **Down Payment (DP 50%)**: Lock in gown reservation; balance paid upon final fitting/handover.
    - **Full Payment (100%)**: Instant settlement including refundable deposit.
  - Payment Method Options via Midtrans Snap:
    - **QRIS**: Instant scan via GoPay, ShopeePay, BCA Mobile, Livin' by Mandiri, Dana, OVO.
    - **Virtual Accounts**: BCA, Mandiri, BRI, BNI, Permata (auto-check payment).
    - **Credit / Debit Cards**: Visa, Mastercard, JCB with 3D Secure OTP.
- **Payment Lifecycle & Webhooks**:
  - `pending`: Transaction token generated, awaiting customer transfer.
  - `settlement` / `capture`: Payment confirmed, inventory reserved, order receipt issued.
  - `expire` / `cancel`: Released reservation back to catalog pool.
- **WhatsApp Concierge Alternative**:
  - One-click checkout button: *"Complete via WhatsApp Concierge"*, generating a formatted order message sent directly to Elinboend Bridal's stylist.

---

## 5. Private Fitting Appointment (`/fitting`)

- Dedicated booking interface for brides and clients visiting the boutique.
- Steps:
  1. **Select Occasion**: Wedding Gown Fitting, Evening Dress Fitting, Custom Measurement Session.
  2. **Select Date & Available Time Slot**: 10:00, 11:30, 14:00, 15:30, 17:00 (1 hour private consultation per bride).
  3. **Choose Up to 3 Wishlist Gowns**: Atelier stylists prepare these dresses in the VIP fitting room prior to arrival.
  4. **Confirmation**: Instant calendar invite and WhatsApp reminder sent to client.

---

## 6. Articles & Bridal Journal (`/articles` & `/articles/:slug`)

- Curated editorial articles to educate brides and drive organic SEO traffic.
- Categories:
  - *Bridal Trends*: Latest bridal fashion week highlights, runway inspirations.
  - *Silhouette & Styling Guide*: How to choose the perfect cut for your body type.
  - *Rental vs. Buy*: Budget allocation, preservation tips, and cost-benefit breakdowns.
  - *Real Elinboend Brides*: Wedding gallery features and styling spotlights.
- Article detail view includes reading progress bar, table of contents, featured products showcase, and author credentials.

---

## 7. About Us & Atelier Heritage (`/about`)

- Narrative on Elinboend Bridal: Craftsmanship philosophy, attention to corsetry and silhouette architecture.
- Atelier showroom photographs (fitting rooms, lace library, private suites).
- Practical visiting details:
  - Location address, landmarks, and parking instructions.
  - Operating hours and appointment requirements.
  - Interactive Google Maps integration.
- FAQ section addressing fitting etiquette, rental return process, dry-cleaning policies, and deposit refund turnaround.
