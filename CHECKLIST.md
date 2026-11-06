# Elinboend Bridal — Master Project & Live Production Checklist

Dokumen ini adalah panduan **Step-by-Step** berdasarkan **Milestone & Phase** mulai dari pengembangan aplikasi hingga **Live Production Ready** (Vercel + Hostinger Custom Domain + Supabase + WhatsApp Concierge Checkout).

---

## Ringkasan Status Milestone

| Milestone | Phase | Fokus Utama | Status |
| :--- | :--- | :--- | :--- |
| **Milestone 1** | Phase 1 & 2 | Foundation, Clean Luxury UI/UX, Storefront & Catalog | ✅ Selesai |
| **Milestone 2** | Phase 3 | Product Detail (Editorial UI), Bridal Bag & WhatsApp Checkout | ✅ Selesai |
| **Milestone 3** | Phase 4 | Custom Domain & Hosting (Hostinger DNS → Vercel Live) | ✅ Selesai |
| **Milestone 4** | Phase 5 | Database Live Setup (Supabase PostgreSQL & Storage) | 🔄 Sedang Berjalan |
| **Milestone 5** | Phase 6 | Final QA, SEO & Go-Live Production Verification | ⏳ Tahap Akhir |

---

## Milestone 1: Foundation, Clean UI/UX & Core Storefront
*Tujuan: Membangun fondasi web aplikasi butik gaun pengantin & pesta yang cepat, bersih, dan tidak over-engineered.*

### Phase 1.1 — Project Setup & Architecture
- [x] Inisialisasi proyek **React 19 + TypeScript + Vite + TailwindCSS v4**.
- [x] Pembuatan dokumentasi arsitektur di folder `docs/` (`prd.md`, `ROADMAP.md`, `feature_list.md`, `tech-stack.md`, `schema.sql`).
- [x] Konfigurasi tipografi editorial (`Cormorant Garamond` untuk heading + `Plus Jakarta Sans` untuk UI/body) & palet warna luxury (`ivory`, `champagne`, `gold`, `charcoal`).
- [x] Setup repositori Git & push ke GitHub (`antyo-system/Elinboendbridal`).

### Phase 1.2 — Penyederhanaan UI/UX (Anti-Clutter & Clean Layout)
- [x] **Header Clean**: Menghapus announcement bar atas (*Private Fitting...*) agar navigasi atas langsung bersih dan fokus.
- [x] **Fixed Hero Hook**: Mengganti carousel slider yang kompleks menjadi satu **General Luxury Hero Hook** yang kuat dan elegan.
- [x] **Hapus Fitur Flash Sale**: Menghapus seksi *Flash Trunk Show* agar citra brand tetap eksklusif dan halaman tidak penuh.
- [x] **Curated Category by Occasion**: Menyederhanakan pilihan kategori menjadi 4 koleksi utama berdasarkan momen acara (*Holy Matrimony / Akad*, *Wedding Reception*, *Evening Party & Gala*, *Bridesmaids & Family*).
- [x] **Catalog Search, Filter & Sort Bar**:
  - [x] Kolom pencarian gaun instan (*Search by gown name, fabric, color*).
  - [x] Tombol toggle `FILTER` dengan indikator badge jumlah filter aktif.
  - [x] Dropdown `SORT BY` (*Featured, Newest, Price Low-High, Price High-Low, Popular*).
  - [x] Menghapus filter *Dress Silhouette* di sidebar agar filter tetap ringkas (*Service Type*, *Price Range*, *Size*).

---

## Milestone 2: Product Detail (Editorial UI), Bridal Bag & WhatsApp Checkout
*Tujuan: Menghadirkan pengalaman memilih gaun sekelas marketplace fashion profesional yang langsung terhubung ke WhatsApp Concierge tanpa kerumitan payment gateway.*

### Phase 2.1 — Halaman Detail Produk (`/products/:id`)
- [x] **Segmented Pill Toggle (Rental vs Purchase)**: Satu baris pemilih layanan (*3-Day Rental* vs *Custom Purchase*) dengan harga yang langsung menyesuaikan secara dinamis.
- [x] **Clean Size Selector**: Tombol ukuran ringkas (`XS`, `S`, `M`, `L`, `XL`, `Custom`) + panduan *Size Guide (cm)*.
- [x] **2 Tombol Utama yang Bersih**:
  - [x] **Add to Bag**: Memasukkan gaun ke keranjang belanja.
  - [x] **Order via WhatsApp**: Langsung mengirim detail gaun, tipe layanan, ukuran, dan harga ke WhatsApp Stylist.
- [x] **Collapsible Accordions**: Menyembunyikan detail teknis kain dan kebijakan deposit ke dalam *accordion* yang bisa dibuka-tutup agar layar pertama tetap lega.

### Phase 2.2 — Bridal Bag Drawer & Direct WhatsApp Concierge Checkout
- [x] **Zustand Bridal Bag**: Keranjang belanja menghitung subtotal, *Security Deposit* (khusus sewa), dan **Total Full Payment** secara otomatis.
- [x] **100% Direct WhatsApp Checkout**: Seluruh pemesanan dan konfirmasi pembayaran langsung terhubung ke **WhatsApp Concierge (`+62 878-8011-1169`)**.

---

## Milestone 3: Hosting & Custom Domain (Hostinger → Vercel)
*Tujuan: Menghubungkan domain resmi `elinboendbridal.com` yang dibeli di Hostinger ke deployment produksi di Vercel beserta dukungan SSL (HTTPS) dan routing SPA.*

### Phase 3.1 — Konfigurasi Routing & Deployment Vercel
- [x] Hubungkan repositori GitHub `antyo-system/Elinboendbridal` ke Vercel (`elinboendbridal-vree`).
- [x] Tambahkan file `vercel.json` (SPA rewrite ke `/index.html`) agar link langsung seperti `/products/eb-001`, `/articles`, dan `/about` tidak error 404 saat di-refresh.
- [x] Commit & push perubahan UI terbaru + `vercel.json` ke branch `main` GitHub.

### Phase 3.2 — Step-by-Step Sambungkan Domain Hostinger ke Vercel
- [x] **Langkah 1 (Di Vercel)**: Daftarkan `elinboendbridal.com` & `www.elinboendbridal.com`.
- [x] **Langkah 2 (Di Hostinger hPanel)**:
  - Update **Record 1 (`A Record`)**: `@` → `216.198.79.1` (TTL `300`).
  - Update **Record 2 (`CNAME Record`)**: `www` → `6ae6f387861cfdb0.vercel-dns-017.com.` (TTL `300`).
- [x] **Langkah 3 (Verifikasi SSL)**: Centang biru **`Valid Configuration`** aktif di Vercel & HTTPS berjalan normal.

---

## Milestone 4: Database & Backend Live (Supabase Production)
*Tujuan: Mengaktifkan database PostgreSQL produksi yang ringkas (4 tabel inti) untuk menyimpan katalog gaun, pesanan, jadwal fitting, dan artikel.*

### Phase 4.1 — Pembuatan Project & Eksekusi Schema SQL
- [ ] **Langkah 1**: Login ke [supabase.com](https://supabase.com) → klik **New Project** (pilih region terdekat: *Southeast Asia / Singapore*).
- [ ] **Langkah 2**: Masuk ke menu **SQL Editor** → klik **New Query**.
- [ ] **Langkah 3**: Copy seluruh isi file [`docs/schema.sql`](docs/schema.sql) (4 tabel inti: `products`, `orders`, `fitting_appointments`, `articles` + kebijakan RLS) → klik **Run**.
- [ ] **Langkah 4**: Masuk ke menu **Storage** → buat public bucket bernama `bridal-media` untuk menyimpan foto gaun beresolusi tinggi.

### Phase 4.2 — Hubungkan Environment Variables ke Vercel
- [ ] **Langkah 1**: Di Supabase Dashboard, buka **Project Settings** → **API** → salin `Project URL` dan `anon public key`.
- [ ] **Langkah 2**: Buka **Vercel Dashboard** → **Settings** → **Environment Variables**, lalu tambahkan:
  ```env
  VITE_SUPABASE_URL=https://xxxx.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
  ```
- [ ] **Langkah 3**: Redeploy project di Vercel agar variabel environment terbaca di build produksi.

---

## Milestone 5: Pre-Launch QA, SEO & Live Production Ready Checklist
*Tujuan: Memastikan tidak ada bug, tampilan sempurna di HP maupun laptop, dan alur pemesanan WhatsApp berjalan mulus.*

### Phase 5.1 — Functional & Cross-Device QA
- [ ] **Mobile Responsiveness Check**: Buka `https://www.elinboendbridal.com` di layar HP (iOS Safari & Android Chrome) — pastikan navigasi menu, filter drawer, pemilihan ukuran, dan keranjang belanja tampil rapi.
- [ ] **Direct URL Refresh Check**: Buka halaman detail produk (misal `/products/eb-001`) lalu tekan **Refresh (F5)** — pastikan halaman tetap tampil normal.
- [ ] **Cart & Price Accuracy Check**:
  - [ ] Pilih opsi **3-Day Rental** → pastikan harga sewa + *Refundable Security Deposit* terhitung akurat di Bridal Bag.
  - [ ] Pilih opsi **Custom Purchase** → pastikan deposit menjadi `Rp 0` dan harga beli tampil akurat.
- [ ] **WhatsApp Concierge Check**: Klik tombol **Order via WhatsApp** di Product Detail, Cart Drawer, dan Private Fitting Form — pastikan semuanya membuka chat ke **`+62 878-8011-1169`** dengan rincian pesanan otomatis yang rapi.

### Phase 5.2 — SEO, Performance & Go-Live
- [ ] **Meta Tags & OpenGraph**: Pastikan judul halaman dan deskripsi muncul rapi saat link `elinboendbridal.com` dibagikan di WhatsApp atau Instagram Bio.
- [ ] **Image Performance**: Pastikan seluruh foto gaun menggunakan format terkompresi (WebP) agar loading di jaringan seluler tetap cepat.
- [ ] **End-to-End Live Order Test**: Lakukan 1x percobaan pilih gaun → pilih ukuran → klik **Order & Confirm via WhatsApp**.
