import React, { useState, useMemo } from 'react'
import {
  SlidersHorizontal,
  Plus,
  Check,
  ChevronDown,
  Sparkles,
  Heart,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react'
import { PRODUCTS_DATA } from '../../data/mockData'
import { formatCurrency } from '../../utils/formatCurrency'
import { useCartStore } from '../../store/useCartStore'
import { Product, OccasionType, SilhouetteType } from '../../types'

interface CatalogSectionProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { addItem } = useCartStore()

  // Filter States
  const [maxPrice, setMaxPrice] = useState<number>(25000000)
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all')
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>('all')
  const [acquisitionType, setAcquisitionType] = useState<'all' | 'rental' | 'purchase'>('all')
  const [selectedSize, setSelectedSize] = useState<string>('all')
  const [addedProductId, setAddedProductId] = useState<string | null>(null)

  // Accordion collapse toggles
  const [isOccasionOpen, setIsOccasionOpen] = useState(true)
  const [isSilhouetteOpen, setIsSilhouetteOpen] = useState(true)

  const occasions: { label: string; value: OccasionType }[] = [
    { label: 'Holy Matrimony / Akad', value: 'Holy Matrimony' },
    { label: 'Wedding Reception', value: 'Wedding Reception' },
    { label: 'Evening Gala & Party', value: 'Evening Gala' },
    { label: 'Bridesmaid & Family', value: 'Bridesmaid' },
    { label: 'Engagement / Sangjit', value: 'Engagement / Sangjit' },
  ]

  const silhouettes: { label: string; value: SilhouetteType }[] = [
    { label: 'Grand Ballgown', value: 'Ballgown' },
    { label: 'A-Line Princess', value: 'A-Line' },
    { label: 'Mermaid Couture', value: 'Mermaid' },
    { label: 'Modern Sheath / Column', value: 'Sheath / Column' },
    { label: 'Modern Kebaya Pengantin', value: 'Modern Kebaya' },
  ]

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'Custom']

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // Category slide filter from top
      if (selectedCategory !== 'all') {
        const cat = selectedCategory.toLowerCase()
        const matchesSilhouette = product.silhouette.toLowerCase().includes(cat)
        const matchesOccasion = product.occasion.toLowerCase().replace(/\s+/g, '-').includes(cat)
        if (!matchesSilhouette && !matchesOccasion) return false
      }

      // Max price filter (checks rental price)
      if (product.rental_price > maxPrice) return false

      // Occasion filter
      if (selectedOccasion !== 'all' && product.occasion !== selectedOccasion) return false

      // Silhouette filter
      if (selectedSilhouette !== 'all' && product.silhouette !== selectedSilhouette) return false

      // Acquisition filter
      if (acquisitionType === 'rental' && !product.is_rental_available) return false
      if (acquisitionType === 'purchase' && !product.is_purchase_available) return false

      // Size filter
      if (selectedSize !== 'all' && !product.sizes_available.includes(selectedSize)) return false

      return true
    })
  }, [
    selectedCategory,
    maxPrice,
    selectedOccasion,
    selectedSilhouette,
    acquisitionType,
    selectedSize,
  ])

  const handleAddToCart = (product: Product, type: 'rental' | 'purchase') => {
    addItem({
      product,
      acquisition_type: type,
      size: 'S',
      quantity: 1,
      rental_days: 3,
    })
    setAddedProductId(product.id)
    setTimeout(() => setAddedProductId(null), 1800)
  }

  const handleResetFilters = () => {
    setMaxPrice(25000000)
    setSelectedOccasion('all')
    setSelectedSilhouette('all')
    setAcquisitionType('all')
    setSelectedSize('all')
    setSelectedCategory('all')
  }

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* ========================================================= */}
        {/* LEFT SIDEBAR: FILTER CATALOG (Matches Screenshot 2 layout) */}
        {/* ========================================================= */}
        <aside className="lg:col-span-1 bg-cream-50/70 border border-cream-200 p-5 space-y-6">
          <div className="flex items-center justify-between border-b border-cream-300 pb-3">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-charcoal-700" />
              <h3 className="font-display text-sm font-bold tracking-wider uppercase text-charcoal-900">
                FILTER CATALOG
              </h3>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset all filters"
              className="text-xs text-primary-600 hover:text-primary-800 flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* 1. Price Filter (Maximum IDR) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-charcoal-800">
              <span>MAXIMUM PRICE</span>
              <span className="text-primary-700 font-extrabold">{formatCurrency(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={2000000}
              max={30000000}
              step={500000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-400 font-semibold">
              <span>Rp 2M</span>
              <span>Rp 15M</span>
              <span>Rp 30M+</span>
            </div>
          </div>

          {/* 2. Acquisition Mode (Rental vs Purchase) */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 block">
              SERVICE TYPE
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
              {(['all', 'rental', 'purchase'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAcquisitionType(type)}
                  className={`py-1.5 px-2 text-center capitalize transition-all cursor-pointer ${
                    acquisitionType === type
                      ? 'bg-charcoal-900 text-white font-bold'
                      : 'bg-white border border-cream-300 text-charcoal-600 hover:bg-cream-100'
                  }`}
                >
                  {type === 'all' ? 'All' : type}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Occasion Accordion */}
          <div className="space-y-2 border-t border-cream-200 pt-4">
            <button
              type="button"
              onClick={() => setIsOccasionOpen(!isOccasionOpen)}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-charcoal-800 cursor-pointer"
            >
              <span>OCCASION / EVENT</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOccasionOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOccasionOpen && (
              <div className="space-y-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedOccasion('all')}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-none transition-colors cursor-pointer ${
                    selectedOccasion === 'all'
                      ? 'bg-charcoal-900 text-white font-bold'
                      : 'text-charcoal-600 hover:bg-white'
                  }`}
                >
                  All Occasions
                </button>
                {occasions.map((occ) => (
                  <button
                    key={occ.value}
                    type="button"
                    onClick={() => setSelectedOccasion(occ.value)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded-none transition-colors cursor-pointer ${
                      selectedOccasion === occ.value
                        ? 'bg-charcoal-900 text-white font-bold'
                        : 'text-charcoal-600 hover:bg-white'
                    }`}
                  >
                    {occ.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Silhouette Accordion */}
          <div className="space-y-2 border-t border-cream-200 pt-4">
            <button
              type="button"
              onClick={() => setIsSilhouetteOpen(!isSilhouetteOpen)}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-charcoal-800 cursor-pointer"
            >
              <span>DRESS SILHOUETTE</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isSilhouetteOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isSilhouetteOpen && (
              <div className="space-y-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedSilhouette('all')}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-none transition-colors cursor-pointer ${
                    selectedSilhouette === 'all'
                      ? 'bg-charcoal-900 text-white font-bold'
                      : 'text-charcoal-600 hover:bg-white'
                  }`}
                >
                  All Silhouettes
                </button>
                {silhouettes.map((sil) => (
                  <button
                    key={sil.value}
                    type="button"
                    onClick={() => setSelectedSilhouette(sil.value)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded-none transition-colors cursor-pointer ${
                      selectedSilhouette === sil.value
                        ? 'bg-charcoal-900 text-white font-bold'
                        : 'text-charcoal-600 hover:bg-white'
                    }`}
                  >
                    {sil.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Size Filter */}
          <div className="space-y-2 border-t border-cream-200 pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 block">
              SIZE AVAILABILITY
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedSize('all')}
                className={`py-1 px-2.5 text-xs font-semibold cursor-pointer ${
                  selectedSize === 'all'
                    ? 'bg-charcoal-900 text-white'
                    : 'bg-white border border-cream-300 text-charcoal-700 hover:bg-cream-100'
                }`}
              >
                All
              </button>
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`py-1 px-2.5 text-xs font-semibold cursor-pointer ${
                    selectedSize === s
                      ? 'bg-charcoal-900 text-white'
                      : 'bg-white border border-cream-300 text-charcoal-700 hover:bg-cream-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* RIGHT CATALOG: PRODUCT CARDS GRID (Matches Screenshot 2) */}
        {/* ========================================================= */}
        <main className="lg:col-span-3 space-y-4">
          {/* Header Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-cream-200 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                Category:
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-charcoal-900 bg-cream-100 px-2 py-0.5 border border-cream-300">
                {selectedCategory === 'all' ? 'ALL GOWNS & DRESSES' : selectedCategory}
              </span>
            </div>
            <div className="text-xs font-medium text-charcoal-500">
              Showing <span className="font-bold text-charcoal-900">{filteredProducts.length}</span>{' '}
              designs
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-cream-50/50 border border-cream-200 space-y-3">
              <p className="font-display text-lg font-bold text-charcoal-800">
                No gowns found matching your filters.
              </p>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Try loosening your price range or clearing specific silhouette filters to explore
                more atelier options.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center space-x-1.5 bg-charcoal-900 text-white text-xs font-bold px-4 py-2 mt-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {filteredProducts.map((product) => {
                const discount =
                  product.original_rental_price &&
                  Math.round(
                    ((product.original_rental_price - product.rental_price) /
                      product.original_rental_price) *
                      100
                  )
                const isJustAdded = addedProductId === product.id

                return (
                  <div
                    key={product.id}
                    className="group relative bg-white border border-cream-200 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-primary-400"
                  >
                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                      {product.badge_label && (
                        <span className="bg-charcoal-900/90 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                          {product.badge_label}
                        </span>
                      )}
                    </div>
                    {discount && (
                      <div className="absolute top-2.5 right-2.5 z-10 bg-primary-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 shadow-xs">
                        -{discount}%
                      </div>
                    )}

                    {/* Dress Image with Hover Secondary */}
                    <div className="aspect-[3/4] w-full overflow-hidden bg-cream-50 relative">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Content Details */}
                    <div className="p-3.5 flex flex-col flex-grow justify-between space-y-3">
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-primary-700 tracking-wider">
                          {product.silhouette} • {product.occasion}
                        </span>
                        <h4
                          className="font-display text-sm font-bold text-charcoal-900 leading-snug group-hover:text-primary-700 transition-colors line-clamp-2"
                          title={product.title}
                        >
                          {product.title}
                        </h4>
                      </div>

                      {/* Service Badges (Matches screenshot 2: Garansi Segar, Free Card) */}
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center text-[9px] font-semibold text-primary-700 bg-primary-50 px-1.5 py-0.5 border border-primary-200">
                          <ShieldCheck className="w-2.5 h-2.5 mr-0.5" />
                          Free Fitting & Alteration
                        </span>
                        <span className="inline-flex items-center text-[9px] font-semibold text-charcoal-600 bg-cream-100 px-1.5 py-0.5 border border-cream-200">
                          Refundable Deposit
                        </span>
                      </div>

                      {/* Pricing & Add to Cart Action (Matches screenshot 2 layout) */}
                      <div className="pt-2 border-t border-cream-200 flex items-center justify-between">
                        <div className="space-y-0.5">
                          {discount && (
                            <span className="text-[9px] font-bold text-primary-600 uppercase tracking-wider block">
                              SAVE {discount}%
                            </span>
                          )}
                          <div className="flex items-baseline space-x-1.5">
                            <span className="text-xs sm:text-sm font-extrabold text-charcoal-900">
                              {formatCurrency(product.rental_price)}
                            </span>
                            {product.original_rental_price && (
                              <span className="text-[10px] text-charcoal-400 line-through">
                                {formatCurrency(product.original_rental_price)}
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] text-charcoal-500 font-medium">
                            / 3 Days Rental
                          </span>
                        </div>

                        {/* Round Add Button (Matches pink '+' circle from screenshot 2) */}
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product, 'rental')}
                          aria-label={`Rent ${product.title}`}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                            isJustAdded
                              ? 'bg-primary-600 border-primary-600 text-white scale-110'
                              : 'border-primary-500 text-primary-600 hover:bg-primary-600 hover:text-white'
                          }`}
                        >
                          {isJustAdded ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </section>
  )
}
