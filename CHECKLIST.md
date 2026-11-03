# Elinboend Bridal — Master Project & Live Production Checklist

Dokumen ini adalah panduan **Step-by-Step** berdasarkan **Milestone & Phase** mulai dari pengembangan aplikasi hingga **Live Production Ready** (Vercel + Hostinger Custom Domain + Supabase + Midtrans Payment Gateway + WhatsApp Concierge).

---

## Ringkasan Status Milestone

| Milestone | Phase | Fokus Utama | Status |
| :--- | :--- | :--- | :--- |
| **Milestone 1** | Phase 1 & 2 | Foundation, Clean Luxury UI/UX, Storefront & Catalog | ✅ Selesai |
| **Milestone 2** | Phase 3 | Product Detail (Editorial UI), Bridal Bag & Checkout Flow | ✅ Selesai |
| **Milestone 3** | Phase 4 | Custom Domain & Hosting (Hostinger DNS → Vercel Live) | ✅ Selesai |
| **Milestone 4** | Phase 5 | Database Live Setup (Supabase PostgreSQL & Storage) | 🔄 Sedang Berjalan |
| **Milestone 5** | Phase 6 | Payment Gateway Live (Midtrans Snap QRIS / VA / Card) | ⏳ Siap Eksekusi |
| **Milestone 6** | Phase 7 | Final QA, SEO & Go-Live Production Verification | ⏳ Tahap Akhir |

---

## Milestone 1: Foundation, Clean UI/UX & Core Storefront
*Tujuan: Membangun fondasi web aplikasi butik gaun pengantin & pesta yang cepat, bersih, dan tidak over-engineered.*

### Phase 1.1 — Project Setup & Architecture
- [x] Inisialisasi proyek **React 19 + TypeScript + Vite + TailwindCSS v4**.
- [x] Pembuatan dokumentasi arsitektur di folder `docs/` (`prd.md`, `ROADMAP.md`, `feature_list.md`, `tech-stack.md`, `schema.sql`, `payment-gateway.md`).
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

## Milestone 2: Product Detail (Editorial UI), Bridal Bag & Concierge
*Tujuan: Menghadirkan pengalaman memilih gaun sekelas marketplace fashion profesional (Zara / Rent the Runway) yang ramah pengguna.*

### Phase 2.1 — Halaman Detail Produk (`/products/:id`)
- [x] **Segmented Pill Toggle (Rental vs Purchase)**: Satu baris pemilih layanan (*3-Day Rental* vs *Buy Custom*) dengan harga yang langsung menyesuaikan secara dinamis.
- [x] **Clean Size Selector**: Tombol ukuran ringkas (`XS`, `S`, `M`, `L`, `XL`, `Custom`) + modal *Size Guide (cm)*.
- [x] **Penghapusan Elemen Redundan**: Menghapus input kalender kasar, menghapus counter jumlah `1`, dan menggabungkan aksi menjadi 2 tombol utama (*Add to Bridal Bag* & *Book & Pay Now*).
- [x] **Collapsible Accordions**: Menyembunyikan detail teknis kain dan kebijakan deposit ke dalam *accordion* yang bisa dibuka-tutup agar layar pertama tetap lega.
- [x] **Related Recommendations**: Menampilkan 4 gaun rekomendasi serupa di bagian bawah halaman.

### Phase 2.2 — Bridal Bag Drawer, Payment Modal & WhatsApp Concierge
- [x] **Zustand Persistent Bridal Bag**: Keranjang belanja tersimpan otomatis di `localStorage` beserta kalkulasi *Security Deposit* (khusus sewa).
- [x] **Payment Gateway Modal (`PaymentModal.tsx`)**:
  - [x] Pilihan **50% Down Payment (DP)** untuk kunci jadwal/produksi atau **100% Full Payment**.
  - [x] Pilihan metode **QRIS**, **Virtual Account (BCA/Mandiri/BNI/BRI)**, dan **Credit Card**.
- [x] **Integrasi Nomor WhatsApp Resmi**: Seluruh tombol konsultasi stylist dan fallback pemesanan terhubung ke **`+62 878-8011-1169`**.

---

## Milestone 3: Hosting & Custom Domain (Hostinger → Vercel)
*Tujuan: Menghubungkan domain resmi yang dibeli di Hostinger ke deployment produksi di Vercel beserta dukungan SSL (HTTPS) dan routing SPA.*

### Phase 3.1 — Konfigurasi Routing & Deployment Vercel
- [x] Hubungkan repositori GitHub `antyo-system/Elinboendbridal` ke Vercel (`elinboendbridal-vree`).
- [x] Tambahkan file `vercel.json` (SPA rewrite ke `/index.html`) agar link langsung seperti `/products/eb-001`, `/articles`, dan `/about` tidak error 404 saat di-refresh.
- [x] Commit & push perubahan UI terbaru + `vercel.json` ke branch `main` GitHub.

### Phase 3.2 — Step-by-Step Sambungkan Domain Hostinger ke Vercel
- [x] **Langkah 1 (Di Vercel)**:
  1. Buka **Vercel Dashboard** → pilih project `elinboendbridal-vree` → menu **Settings** → **Domains**.
  2. Klik tombol **`Add Existing`** di kanan atas.
  3. Ketik nama domain kamu (`elinboendbridal.com`) → klik **Add**.
  4. Pilih opsi **Redirect** → klik **Save**.
  5. Catat nilai **A Record** (`216.198.79.1`) dan **CNAME Record** (`6ae6f387861cfdb0.vercel-dns-017.com.`) yang diminta Vercel.
- [x] **Langkah 2 (Di Hostinger hPanel)**:
  1. Login ke [hpanel.hostinger.com](https://hpanel.hostinger.com) → menu **Domains** → klik `elinboendbridal.com`.
  2. Pilih menu **DNS / Nameservers** di sidebar kiri → pastikan di tab **DNS Records**.
  3. Update **Record 1 (`A Record`)**:
     - **Type**: `A` | **Name**: `@` | **Points to**: `216.198.79.1` | **TTL**: `300`.
  4. Update **Record 2 (`CNAME Record`)**:
     - **Type**: `CNAME` | **Name**: `www` | **Points to**: `6ae6f387861cfdb0.vercel-dns-017.com.` | **TTL**: `300`.
- [x] **Langkah 3 (Verifikasi SSL)**:
  1. Kembali ke halaman **Vercel Domains** → klik tombol **`Refresh`**.
  2. Muncul centang biru **`Valid Configuration`** pada domain (`elinboendbridal.com` & `www.elinboendbridal.com`).
  3. Buka `https://www.elinboendbridal.com` di browser dan pastikan ikon gembok HTTPS aktif.

---

## Milestone 4: Database & Backend Live (Supabase Production)
*Tujuan: Mengaktifkan database PostgreSQL produksi yang ringkas (4 tabel inti) untuk menyimpan katalog gaun, pesanan, jadwal fitting, dan artikel.*

### Phase 4.1 — Pembuatan Project & Eksekusi Schema SQL
- [ ] **Langkah 1**: Login ke [supabase.com](https://supabase.com) → klik **New Project** (pilih region terdekat: *Singapore / ap-southeast-1*).
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

## Milestone 5: Payment Gateway Live (Midtrans Production)
*Tujuan: Menerima pembayaran real-time melalui QRIS, Virtual Account (BCA, Mandiri, BNI, BRI), dan Kartu Kredit secara otomatis.*

### Phase 5.1 — Registrasi & Kredensial Midtrans
- [ ] **Langkah 1**: Login ke [dashboard.midtrans.com](https://dashboard.midtrans.com).
- [ ] **Langkah 2**: Uji coba di mode **Sandbox** terlebih dahulu, lalu beralih ke mode **Production** setelah dokumen verifikasi merchant disetujui.
- [ ] **Langkah 3**: Buka **Settings** → **Access Keys** → salin `Client Key` dan `Server Key`.
- [ ] **Langkah 4**: Tambahkan ke **Vercel Environment Variables**:
  ```env
  VITE_MIDTRANS_CLIENT_KEY=Mid-client-xxxxxx
  VITE_MIDTRANS_IS_PRODUCTION=true
  ```

### Phase 5.2 — Supabase Edge Function & Webhook Notification
- [ ] **Langkah 1**: Simpan `MIDTRANS_SERVER_KEY` di **Supabase Edge Function Secrets** (jangan pernah taruh `Server Key` di frontend).
- [ ] **Langkah 2**: Deploy Edge Function `create-snap-token` dan `midtrans-webhook` (panduan lengkap tersedia di [`docs/payment-gateway.md`](docs/payment-gateway.md)).
- [ ] **Langkah 3**: Masukkan URL Webhook (`https://<project-ref>.supabase.co/functions/v1/midtrans-webhook`) ke dashboard Midtrans di menu **Settings** → **Configuration** → **Payment Notification URL**.

---

## Milestone 6: Pre-Launch QA, SEO & Live Production Ready Checklist
*Tujuan: Memastikan tidak ada bug, tampilan sempurna di HP maupun laptop, dan alur transaksi berjalan mulus sebelum diumumkan ke pelanggan.*

### Phase 6.1 — Functional & Cross-Device QA
- [ ] **Mobile Responsiveness Check**: Buka website di layar HP (iOS Safari & Android Chrome) — pastikan navigasi menu, filter drawer, pemilihan ukuran, dan keranjang belanja tidak terpotong.
- [ ] **Direct URL Refresh Check**: Buka halaman detail produk (misal `/products/eb-001`) lalu tekan **Refresh (F5)** — pastikan halaman tetap tampil normal (berkat `vercel.json`).
- [ ] **Cart & Price Accuracy Check**:
  - [ ] Pilih opsi **3-Day Rental** → pastikan harga sewa + *Refundable Security Deposit* terhitung akurat di Bridal Bag.
  - [ ] Pilih opsi **Buy Custom** → pastikan deposit menjadi `Rp 0` dan harga beli tampil akurat.
- [ ] **WhatsApp Concierge Check**: Klik tombol WhatsApp di Header, Product Detail, Cart Drawer, dan Floating Button — pastikan semuanya membuka chat ke **`+62 878-8011-1169`** dengan teks pesan otomatis yang rapi.

### Phase 6.2 — SEO, Performance & Go-Live
- [ ] **Meta Tags & OpenGraph**: Pastikan judul halaman, deskripsi, dan preview gambar muncul rapi saat link domain dibagikan di WhatsApp atau Instagram Bio.
- [ ] **Image Performance**: Pastikan seluruh foto gaun menggunakan format terkompresi (WebP/AVIF) agar loading di jaringan seluler tetap di bawah 2 detik.
- [ ] **End-to-End Live Order Test**: Lakukan 1x transaksi percobaan penuh (pilih gaun → pilih ukuran → checkout → bayar QRIS / konfirmasi WhatsApp) hingga pesanan tercatat.

