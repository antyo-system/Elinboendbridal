import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  ShieldCheck,
  Sparkles,
  Calendar,
  Ruler,
  Check,
  CreditCard,
  ChevronRight,
  Share2,
} from 'lucide-react'
import { PRODUCTS_DATA } from '../data/mockData'
import { useCartStore } from '../store/useCartStore'
import { formatCurrency } from '../utils/formatCurrency'
import { getWhatsAppUrl } from '../utils/whatsapp'

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Find product by slug or ID
  const product = PRODUCTS_DATA.find((p) => p.slug === id || p.id === id)

  const { addItem, setIsCartOpen, setIsPaymentOpen } = useCartStore()

  // Sizing & Service State
  const [selectedSize, setSelectedSize] = useState<string>('S')
  const [acquisitionType, setAcquisitionType] = useState<'rental' | 'purchase'>('rental')
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [rentalDate, setRentalDate] = useState<string>('2026-12-12')
  const [isAdded, setIsAdded] = useState<boolean>(false)
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false)

  if (!product) {
    return (
      <div className="pt-20 pb-24 text-center space-y-4 max-w-md mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-charcoal-900">
          Gown Not Found
        </h2>
        <p className="text-xs text-charcoal-500">
          The bridal gown or evening dress you are looking for is currently unavailable or has been archived.
        </p>
        <Link
          to="/"
          className="inline-block bg-charcoal-900 hover:bg-primary-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 transition-colors cursor-pointer"
        >
          Return to Boutique Catalog
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      product,
      acquisition_type: acquisitionType,
      size: selectedSize,
      rental_start_date: acquisitionType === 'rental' ? rentalDate : undefined,
      rental_days: acquisitionType === 'rental' ? 3 : undefined,
      quantity,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleDirectCheckout = () => {
    addItem({
      product,
      acquisition_type: acquisitionType,
      size: selectedSize,
      rental_start_date: acquisitionType === 'rental' ? rentalDate : undefined,
      rental_days: acquisitionType === 'rental' ? 3 : undefined,
      quantity,
    })
    setIsCartOpen(false)
    setIsPaymentOpen(true)
  }

  const handleWhatsAppConsultation = () => {
    const text = `Hello Elinboend Bridal Stylist!%0A%0AI am interested in *${product.title}*:%0A- Service: ${acquisitionType === 'rental' ? '3-Day Rental' : 'Custom Purchase'}%0A- Preferred Size: ${selectedSize}%0A- Target Event Date: ${rentalDate}%0A- Price: ${formatCurrency(
      acquisitionType === 'rental' ? product.rental_price : product.purchase_price
    )}%0A%0ACould I arrange a private fitting appointment to try on this gown?`
    window.open(`https://wa.me/6287880111169?text=${text}`, '_blank')
  }

  return (
    <div className="pt-6 sm:pt-10 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Breadcrumb & Back Link */}
      <div className="flex items-center justify-between border-b border-cream-200 pb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-charcoal-600 hover:text-charcoal-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>

        <nav className="hidden sm:flex items-center space-x-2 text-xs text-charcoal-400">
          <Link to="/" className="hover:text-charcoal-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/#catalog" className="hover:text-charcoal-700 transition-colors">
            {product.product_type === 'wedding_gown' ? 'Wedding Gowns' : 'Party Dresses'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-charcoal-800 truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main Split Grid (Image Gallery on Left, Details & Sizing on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: GOWN PHOTOGRAPHY & THUMBNAILS               */}
        {/* ========================================================= */}
        <div className="space-y-4">
          {/* Main Visual Frame */}
          <div className="relative bg-white border border-cream-200 aspect-[3/4] overflow-hidden shadow-sm">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-top transition-all duration-500"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
              {product.badge_label && (
                <span className="bg-charcoal-900/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-sm">
                  {product.badge_label}
                </span>
              )}
              <span className="bg-white/95 text-primary-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 border border-cream-300 shadow-xs">
                {product.silhouette}
              </span>
            </div>
          </div>

          {/* Thumbnail Gallery (if multiple photos) */}
          {product.images.length > 1 && (
            <div className="flex space-x-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 border overflow-hidden cursor-pointer transition-all ${
                    activeImageIndex === idx
                      ? 'border-charcoal-900 ring-2 ring-charcoal-900/20'
                      : 'border-cream-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: GOWN ATTRIBUTES, SIZING & COMMERCE OPTIONS  */}
        {/* ========================================================= */}
        <div className="space-y-7">
          {/* Headline & Pricing */}
          <div className="space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary-700">
              {product.product_type === 'wedding_gown' ? 'Bridal Couture' : 'Evening Couture'} •{' '}
              {product.occasion}
            </span>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal-900 leading-tight">
              {product.title}
            </h1>

            {/* Dual Pricing Selector Box */}
            <div className="bg-cream-50 border border-cream-200 p-4 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
                Select Service Option:
              </span>
              <div className="grid grid-cols-2 gap-3">
                {/* 1. Rental Option */}
                <button
                  type="button"
                  onClick={() => setAcquisitionType('rental')}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    acquisitionType === 'rental'
                      ? 'border-primary-600 bg-white shadow-sm ring-1 ring-primary-600'
                      : 'border-cream-300 bg-cream-50 text-charcoal-600 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                      3-Day Rental
                    </span>
                    {acquisitionType === 'rental' && (
                      <Check className="w-3.5 h-3.5 text-primary-600" />
                    )}
                  </div>
                  <p className="font-display text-lg font-extrabold text-primary-700 mt-1">
                    {formatCurrency(product.rental_price)}
                  </p>
                  <p className="text-[10px] text-charcoal-500 mt-0.5">
                    + Deposit: {formatCurrency(product.security_deposit)} (Refundable)
                  </p>
                </button>

                {/* 2. Custom Purchase Option */}
                <button
                  type="button"
                  onClick={() => setAcquisitionType('purchase')}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    acquisitionType === 'purchase'
                      ? 'border-primary-600 bg-white shadow-sm ring-1 ring-primary-600'
                      : 'border-cream-300 bg-cream-50 text-charcoal-600 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                      Custom Purchase
                    </span>
                    {acquisitionType === 'purchase' && (
                      <Check className="w-3.5 h-3.5 text-primary-600" />
                    )}
                  </div>
                  <p className="font-display text-lg font-extrabold text-charcoal-900 mt-1">
                    {formatCurrency(product.purchase_price)}
                  </p>
                  <p className="text-[10px] text-charcoal-500 mt-0.5">
                    Made-to-measure custom piece
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 border-t border-cream-200 pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
              Couture Description & Silhouette Details
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Apparel Specifications Grid (2x2) */}
          <div className="grid grid-cols-2 gap-3 bg-white p-4 border border-cream-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">
                Dress Silhouette
              </span>
              <span className="font-bold text-charcoal-800">{product.silhouette}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">
                Primary Occasion
              </span>
              <span className="font-bold text-charcoal-800">{product.occasion}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">
                Lace & Fabric
              </span>
              <span className="font-bold text-charcoal-800">{product.fabric}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">
                Color Palette
              </span>
              <span className="font-bold text-charcoal-800">{product.color_name}</span>
            </div>
          </div>

          {/* Apparel Sizing Selector (Wise & User-Friendly) */}
          <div className="space-y-2.5 border-t border-cream-200 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800">
                Select Sizing (Standard or Custom):
              </span>
              <button
                type="button"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="inline-flex items-center space-x-1 text-xs text-primary-700 hover:text-primary-800 font-semibold cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>{showSizeGuide ? 'Hide Measurements' : 'Size Guide (cm)'}</span>
              </button>
            </div>

            {/* Size Guide Accordion */}
            {showSizeGuide && (
              <div className="bg-cream-50 border border-cream-300 p-3 text-[11px] text-charcoal-700 space-y-1.5 transition-all">
                <p className="font-bold text-charcoal-900">Standard Body Proportions (Atelier Fit):</p>
                <div className="grid grid-cols-4 gap-2 border-t border-cream-200 pt-1 text-charcoal-600">
                  <div><strong>XS:</strong> Bust 80 • Waist 62 • Hips 88</div>
                  <div><strong>S:</strong> Bust 84 • Waist 66 • Hips 92</div>
                  <div><strong>M:</strong> Bust 88 • Waist 70 • Hips 96</div>
                  <div><strong>L:</strong> Bust 92 • Waist 74 • Hips 100</div>
                </div>
                <p className="text-[10px] text-charcoal-500 italic pt-1">
                  * Complimentary alteration adjustments are included for every booking.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {product.sizes_available.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2 px-4 text-xs font-bold uppercase transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-charcoal-900 text-white shadow-xs'
                      : 'bg-white border border-cream-300 text-charcoal-700 hover:bg-cream-100'
                  }`}
                >
                  Size {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Rental Date Picker (if rental is selected) */}
          {acquisitionType === 'rental' && (
            <div className="space-y-1.5 border-t border-cream-200 pt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800">
                Target Wedding / Event Date:
              </label>
              <div className="relative max-w-xs">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="date"
                  value={rentalDate}
                  onChange={(e) => setRentalDate(e.target.value)}
                  className="w-full text-xs p-2.5 pl-10 border border-cream-300 focus:outline-primary-600 bg-white font-medium"
                />
              </div>
              <p className="text-[10px] text-charcoal-500">
                Standard reservation covers 3 days (collection D-1, event day, and return D+1).
              </p>
            </div>
          )}

          {/* Atelier Trust & Security Guarantee Box */}
          <div className="bg-cream-50 border border-cream-300 p-4 space-y-2 relative overflow-hidden">
            <div className="flex items-center space-x-2 text-primary-700 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span>Atelier Complimentary Inclusions</span>
            </div>
            <ul className="text-xs text-charcoal-600 space-y-1 pl-1">
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                <span>1-on-1 private VIP fitting & alteration session included.</span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                <span>100% refundable security deposit returned within 24-48h.</span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                <span>Delivered with breathable gown garment bag and wooden hanger.</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons: Quantity, Add to Bag, Direct Checkout & WhatsApp */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-cream-300 bg-white h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="px-3 text-charcoal-500 hover:text-charcoal-900 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-charcoal-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 text-charcoal-500 hover:text-charcoal-900 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 h-12 flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                  isAdded
                    ? 'bg-green-700 text-white'
                    : 'bg-primary-600 hover:bg-primary-500 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bridal Bag</span>
                  </>
                )}
              </button>

              {/* Instant Checkout via Payment Gateway */}
              <button
                type="button"
                onClick={handleDirectCheckout}
                className="h-12 px-5 bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-md"
              >
                <CreditCard className="w-4 h-4 text-gold-400" />
                <span>Book & Pay</span>
              </button>
            </div>

            {/* Chat Stylist via WhatsApp Alternative */}
            <button
              type="button"
              onClick={handleWhatsAppConsultation}
              className="w-full h-11 border border-cream-300 bg-white hover:bg-cream-100 text-charcoal-800 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <span>Consult Stylist on WhatsApp (+62 878-8011-1169)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
