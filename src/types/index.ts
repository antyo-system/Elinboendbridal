export type ProductType = 'wedding_gown' | 'party_dress'

export type SilhouetteType =
  | 'Ballgown'
  | 'A-Line'
  | 'Mermaid'
  | 'Sheath / Column'
  | 'Modern Kebaya'

export type OccasionType =
  | 'Holy Matrimony'
  | 'Wedding Reception'
  | 'Evening Gala'
  | 'Bridesmaid'
  | 'Engagement / Sangjit'

export interface Product {
  id: string
  title: string
  slug: string
  product_type: ProductType
  silhouette: SilhouetteType
  occasion: OccasionType
  color_name: string
  color_hex: string
  fabric: string
  rental_price: number
  original_rental_price?: number
  purchase_price: number
  original_purchase_price?: number
  security_deposit: number
  is_rental_available: boolean
  is_purchase_available: boolean
  badge_label?: string
  images: string[]
  description: string
  rating: number
  reviews_count: number
  sizes_available: string[]
}

export interface CategorySlide {
  value: string
  label: string
  description: string
  image: string
}

export interface CartItem {
  id: string
  product: Product
  acquisition_type: 'rental' | 'purchase'
  size: string
  rental_start_date?: string
  rental_end_date?: string
  rental_days?: number
  quantity: number
  custom_measurements?: {
    bust?: number
    waist?: number
    hips?: number
    heels_cm?: number
  }
}

export interface Article {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  cover_image: string
  author: string
  date: string
  read_time: string
}

export type PaymentMethod = 'qris' | 'bca_va' | 'mandiri_va' | 'credit_card'
export type PaymentMode = 'full' | 'dp_50'
