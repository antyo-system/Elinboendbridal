import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Ruler,
  Check,
  CreditCard,
  ChevronRight,
  ChevronDown,
  MessageCircle,
} from 'lucide-react'
import { PRODUCTS_DATA } from '../data/mockData'
import { useCartStore } from '../store/useCartStore'
import { formatCurrency } from '../utils/formatCurrency'

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const product = PRODUCTS_DATA.find((p) => p.slug === id || p.id === id)
  const { addItem, setIsCartOpen, setIsPaymentOpen } = useCartStore()

  // Core Selection State
  const [acquisitionType, setAcquisitionType] = useState<'rental' | 'purchase'>('rental')
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes_available.includes('S') ? 'S' : product?.sizes_available[0] || 'S'
  )
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [isAdded, setIsAdded] = useState<boolean>(false)
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false)

  // Clean Collapsible Accordions for Details
  const [openSection, setOpenSection] = useState<'details' | 'policy' | null>('details')

  if (!product) {
    return (
      <div className="pt-20 pb-24 text-center space-y-4 max-w-md mx-auto px-4">
        <h2 className="font-display text-2xl font-bold text-charcoal-900">Gown Not Found</h2>
        <p className="text-xs text-charcoal-500">
          The bridal gown or evening dress you are looking for is currently unavailable.
        </p>
        <Link
          to="/"
          className="inline-block bg-charcoal-900 hover:bg-primary-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 transition-colors"
        >
          Return to Catalog
        </Link>
      </div>
    )
  }

  const activePrice =
    acquisitionType === 'rental' ? product.rental_price : product.purchase_price
  const activeOriginalPrice =
    acquisitionType === 'rental'
      ? product.original_rental_price
      : product.original_purchase_price

  const handleAddToCart = () => {
    addItem({
      product,
      acquisition_type: acquisitionType,
      size: selectedSize,
      rental_days: acquisitionType === 'rental' ? 3 : undefined,
      quantity: 1,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleDirectCheckout = () => {
    addItem({
      product,
      acquisition_type: acquisitionType,
      size: selectedSize,
      rental_days: acquisitionType === 'rental' ? 3 : undefined,
      quantity: 1,
    })
    setIsCartOpen(false)
    setIsPaymentOpen(true)
  }

  const handleWhatsAppConsultation = () => {
    const text = `Hello Elinboend Bridal Stylist!%0A%0AI am interested in *${product.title}*:%0A- Option: ${
      acquisitionType === 'rental' ? '3-Day Rental' : 'Custom Purchase'
    }%0A- Size: ${selectedSize}%0A- Price: ${formatCurrency(
      activePrice
    )}%0A%0ACould I check fitting availability for this dress?`
    window.open(`https://wa.me/6287880111169?text=${text}`, '_blank')
  }

  return (
    <div className="pt-6 sm:pt-10 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <nav className="hidden sm:flex items-center space-x-1.5 text-xs text-charcoal-400">
          <Link to="/" className="hover:text-charcoal-700 transition-colors">
            Catalog
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-charcoal-500">{product.occasion}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-medium text-charcoal-800 truncate max-w-[220px]">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN (7 cols): CLEAN EDITORIAL GALLERY             */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative bg-cream-50 aspect-[3/4] overflow-hidden">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-top transition-all duration-500"
            />

            {product.badge_label && (
              <span className="absolute top-4 left-4 bg-charcoal-900/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                {product.badge_label}
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex space-x-2.5">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-charcoal-900 opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN (5 cols): STREAMLINED MARKETPLACE CONTROLS   */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          {/* 1. Title & Dynamic Price Header */}
          <div className="space-y-2 border-b border-cream-200 pb-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary-700">
              {product.product_type === 'wedding_gown' ? 'Bridal Couture' : 'Evening Couture'} •{' '}
              {product.silhouette}
            </p>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-900 leading-snug">
              {product.title}
            </h1>

            <div className="pt-1 flex items-baseline space-x-2.5">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900">
                {formatCurrency(activePrice)}
              </span>
              {activeOriginalPrice && (
                <span className="text-sm text-charcoal-400 line-through">
                  {formatCurrency(activeOriginalPrice)}
                </span>
              )}
              <span className="text-xs font-medium text-charcoal-500">
                {acquisitionType === 'rental' ? '/ 3 days rental' : '(custom made)'}
              </span>
            </div>
          </div>

          {/* 2. Clean Segmented Option Toggle (Rent vs Buy) */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700">
              Service Option
            </label>
            <div className="grid grid-cols-2 p-1 bg-cream-100 border border-cream-200">
              <button
                type="button"
                onClick={() => setAcquisitionType('rental')}
                className={`py-2.5 px-3 text-xs font-bold transition-all cursor-pointer ${
                  acquisitionType === 'rental'
                    ? 'bg-white text-charcoal-900 shadow-xs'
                    : 'text-charcoal-500 hover:text-charcoal-900'
                }`}
              >
                3-Day Rental
              </button>
              <button
                type="button"
                onClick={() => setAcquisitionType('purchase')}
                className={`py-2.5 px-3 text-xs font-bold transition-all cursor-pointer ${
                  acquisitionType === 'purchase'
                    ? 'bg-white text-charcoal-900 shadow-xs'
                    : 'text-charcoal-500 hover:text-charcoal-900'
                }`}
              >
                Custom Purchase
              </button>
            </div>
            <p className="text-[11px] text-charcoal-500 flex items-center space-x-1.5 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-600 shrink-0" />
              <span>
                {acquisitionType === 'rental'
                  ? `Includes free fitting & refundable deposit (${formatCurrency(product.security_deposit)})`
                  : 'Tailored made-to-measure to your exact body measurements'}
              </span>
            </p>
          </div>

          {/* 3. Minimalist Size Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-700">
                Size: <span className="text-charcoal-900 font-extrabold">{selectedSize}</span>
              </label>
              <button
                type="button"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="inline-flex items-center space-x-1 text-[11px] text-primary-700 hover:text-primary-800 font-semibold underline cursor-pointer"
              >
                <Ruler className="w-3 h-3" />
                <span>{showSizeGuide ? 'Hide Size Chart' : 'Size Guide'}</span>
              </button>
            </div>

            {showSizeGuide && (
              <div className="bg-cream-50 border border-cream-200 p-3 text-[11px] text-charcoal-600 space-y-1">
                <div className="grid grid-cols-4 gap-2 font-medium">
                  <div><strong className="text-charcoal-900">XS:</strong> 80 / 62</div>
                  <div><strong className="text-charcoal-900">S:</strong> 84 / 66</div>
                  <div><strong className="text-charcoal-900">M:</strong> 88 / 70</div>
                  <div><strong className="text-charcoal-900">L:</strong> 92 / 74</div>
                </div>
                <p className="text-[10px] text-charcoal-400">
                  Bust / Waist in cm. Complimentary waist & length alteration included.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {product.sizes_available.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`min-w-[44px] h-10 px-3 text-xs font-bold transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-charcoal-900 text-white'
                      : 'bg-white border border-cream-300 text-charcoal-700 hover:border-charcoal-900'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Primary & Secondary CTAs */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`h-12 flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-green-700 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDirectCheckout}
                className="h-12 bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-gold-400" />
                <span>Book & Pay</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppConsultation}
              className="w-full h-10 border border-cream-300 bg-white hover:bg-cream-50 text-charcoal-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-primary-600" />
              <span>Ask Stylist or Book Fitting via WhatsApp</span>
            </button>
          </div>

          {/* 5. Clean Collapsible Accordions (Replaces Cluttered Boxes) */}
          <div className="border-t border-cream-200 divide-y divide-cream-200 pt-2">
            {/* Accordion 1: Product Details & Specifications */}
            <div className="py-3.5">
              <button
                type="button"
                onClick={() =>
                  setOpenSection(openSection === 'details' ? null : 'details')
                }
                className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-charcoal-900 cursor-pointer"
              >
                <span>Gown Details & Specifications</span>
                <ChevronDown
                  className={`w-4 h-4 text-charcoal-500 transition-transform ${
                    openSection === 'details' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openSection === 'details' && (
                <div className="mt-3 space-y-3 text-xs text-charcoal-600 leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="space-y-1.5 pt-1 text-charcoal-700">
                    <li>
                      <span className="text-charcoal-400 inline-block w-24">Silhouette:</span>{' '}
                      <strong className="font-semibold text-charcoal-900">{product.silhouette}</strong>
                    </li>
                    <li>
                      <span className="text-charcoal-400 inline-block w-24">Occasion:</span>{' '}
                      <strong className="font-semibold text-charcoal-900">{product.occasion}</strong>
                    </li>
                    <li>
                      <span className="text-charcoal-400 inline-block w-24">Fabric:</span>{' '}
                      <strong className="font-semibold text-charcoal-900">{product.fabric}</strong>
                    </li>
                    <li>
                      <span className="text-charcoal-400 inline-block w-24">Color Tone:</span>{' '}
                      <strong className="font-semibold text-charcoal-900">{product.color_name}</strong>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 2: Rental & Atelier Inclusions */}
            <div className="py-3.5">
              <button
                type="button"
                onClick={() =>
                  setOpenSection(openSection === 'policy' ? null : 'policy')
                }
                className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-charcoal-900 cursor-pointer"
              >
                <span>Complimentary Fitting & Rental Policy</span>
                <ChevronDown
                  className={`w-4 h-4 text-charcoal-500 transition-transform ${
                    openSection === 'policy' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openSection === 'policy' && (
                <ul className="mt-3 space-y-2 text-xs text-charcoal-600">
                  <li className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-primary-600 shrink-0 mt-0.5" />
                    <span>1-on-1 private VIP fitting & custom alteration included.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-primary-600 shrink-0 mt-0.5" />
                    <span>Standard 3-day rental (pickup D-1, event day, return D+1).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-primary-600 shrink-0 mt-0.5" />
                    <span>100% refundable security deposit returned within 24–48h.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-primary-600 shrink-0 mt-0.5" />
                    <span>Professional dry-cleaning, steaming, and garment bag included.</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
