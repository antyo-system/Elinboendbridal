import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { PRODUCTS_DATA } from '../data/mockData'
import type { Product, ProductType, SilhouetteType, OccasionType } from '../types'

function mapRowToProduct(row: any): Product {
  return {
    id: String(row.id),
    title: row.title || 'Untitled Gown',
    slug: row.slug || String(row.id),
    product_type: (row.product_type || 'wedding_gown') as ProductType,
    silhouette: (row.silhouette || 'Ballgown') as SilhouetteType,
    occasion: (row.occasion || 'Holy Matrimony') as OccasionType,
    color_name: row.color_name || 'Ivory',
    color_hex: row.color_hex || '#F5EDE6',
    fabric: row.fabric || '',
    rental_price: Number(row.rental_price ?? 0),
    original_rental_price:
      row.original_rental_price !== null && row.original_rental_price !== undefined
        ? Number(row.original_rental_price)
        : undefined,
    purchase_price: Number(row.purchase_price ?? 0),
    original_purchase_price:
      row.original_purchase_price !== null && row.original_purchase_price !== undefined
        ? Number(row.original_purchase_price)
        : undefined,
    security_deposit: Number(row.security_deposit ?? 0),
    is_rental_available: row.is_rental_available !== false,
    is_purchase_available: row.is_purchase_available !== false,
    badge_label: row.badge_label || undefined,
    images: Array.isArray(row.images) && row.images.length > 0 ? row.images : [],
    description: row.description || '',
    rating: Number(row.rating ?? 5.0),
    reviews_count: Number(row.reviews_count ?? 0),
    sizes_available: Array.isArray(row.sizes_available) ? row.sizes_available : ['S', 'M', 'L'],
  }
}

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['storefront-products'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) {
        return PRODUCTS_DATA
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_live', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Failed to fetch products from Supabase, falling back to mock data:', error.message)
        return PRODUCTS_DATA
      }

      if (!data || data.length === 0) {
        return PRODUCTS_DATA
      }

      return data.map(mapRowToProduct)
    },
    initialData: PRODUCTS_DATA,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useProduct(idOrSlug: string | undefined) {
  const { data: products = PRODUCTS_DATA, isLoading, error } = useProducts()
  const product = products.find((p) => p.slug === idOrSlug || p.id === idOrSlug)
  return { product, isLoading, error }
}
