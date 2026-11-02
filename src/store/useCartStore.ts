import { create } from 'zustand'
import { CartItem, Product, PaymentMode } from '../types'

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
  isPaymentOpen: boolean
  paymentMode: PaymentMode

  // Actions
  setIsCartOpen: (open: boolean) => void
  setIsPaymentOpen: (open: boolean) => void
  setPaymentMode: (mode: PaymentMode) => void
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  clearCart: () => void

  // Calculations
  getSubtotal: () => number
  getSecurityDepositTotal: () => number
  getTotalAmount: () => number
  getDownPaymentAmount: () => number
  getBalanceAmount: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [
    // Pre-populate with one rental gown for immediate rich experience
    {
      id: 'initial-cart-item-1',
      product: {
        id: 'eb-001',
        title: 'The Aurelia French Lace Ballgown',
        slug: 'the-aurelia-french-lace-ballgown',
        product_type: 'wedding_gown',
        silhouette: 'Ballgown',
        occasion: 'Holy Matrimony',
        color_name: 'Ivory & Warm Champagne',
        color_hex: '#F5EDE6',
        fabric: 'French Chantilly Lace & Silk Organza',
        rental_price: 6500000,
        original_rental_price: 8500000,
        purchase_price: 24000000,
        security_deposit: 1500000,
        is_rental_available: true,
        is_purchase_available: true,
        is_flash_sale: true,
        flash_sale_discount_percent: 24,
        flash_sale_stock: 1,
        images: [
          'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
        ],
        description: 'Handcrafted with delicate French Chantilly lace over sparkling organza.',
        rating: 5.0,
        reviews_count: 18,
        sizes_available: ['XS', 'S', 'M', 'Custom'],
      },
      acquisition_type: 'rental',
      size: 'S',
      rental_start_date: '2026-12-12',
      rental_end_date: '2026-12-15',
      rental_days: 3,
      quantity: 1,
    },
  ],
  isCartOpen: false,
  isPaymentOpen: false,
  paymentMode: 'dp_50',

  setIsCartOpen: (open) => set({ isCartOpen: open }),
  setIsPaymentOpen: (open) => set({ isPaymentOpen: open }),
  setPaymentMode: (mode) => set({ paymentMode: mode }),

  addItem: (newItem) => {
    const id = `cart-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    set((state) => ({
      items: [...state.items, { ...newItem, id }],
      isCartOpen: true,
    }))
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },

  clearCart: () => set({ items: [] }),

  getSubtotal: () => {
    return get().items.reduce((acc, item) => {
      const price =
        item.acquisition_type === 'rental'
          ? item.product.rental_price
          : item.product.purchase_price
      return acc + price * item.quantity
    }, 0)
  },

  getSecurityDepositTotal: () => {
    return get().items.reduce((acc, item) => {
      if (item.acquisition_type === 'rental') {
        return acc + item.product.security_deposit * item.quantity
      }
      return acc
    }, 0)
  },

  getTotalAmount: () => {
    return get().getSubtotal() + get().getSecurityDepositTotal()
  },

  getDownPaymentAmount: () => {
    // 50% of the subtotal + full security deposit
    const subtotal = get().getSubtotal()
    const deposit = get().getSecurityDepositTotal()
    return Math.round(subtotal * 0.5) + deposit
  },

  getBalanceAmount: () => {
    const subtotal = get().getSubtotal()
    return Math.round(subtotal * 0.5)
  },
}))

