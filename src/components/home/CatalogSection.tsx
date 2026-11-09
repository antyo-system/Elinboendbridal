import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  SlidersHorizontal,
  Plus,
  Check,
  ChevronDown,
  Search,
  RotateCcw,
  X,
} from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import { formatCurrency } from '../../utils/formatCurrency'
import { useCartStore } from '../../store/useCartStore'
import { Product, OccasionType } from '../../types'

interface CatalogSectionProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { addItem } = useCartStore()
  const { data: products = [] } = useProducts()

  // Search & Filter & Sort States (Closed by default on mobile for clean UX)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  )
  const [sortBy, setSortBy] = useState<string>('newest')

  // Detailed Filter States
  const [maxPrice, setMaxPrice] = useState<number>(30000000)
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all')
  const [acquisitionType, setAcquisitionType] = useState<'all' | 'rental' | 'purchase'>('all')
  const [selectedSize, setSelectedSize] = useState<string>('all')
  const [addedProductId, setAddedProductId] = useState<string | null>(null)

  // Accordion collapse toggle
  const [isOccasionOpen, setIsOccasionOpen] = useState(true)

  const occasions: { label: string; value: OccasionType }[] = [
    { label: 'Holy Matrimony / Akad', value: 'Holy Matrimony' },
    { label: 'Wedding Reception', value: 'Wedding Reception' },
    { label: 'Evening Gala & Party', value: 'Evening Gala' },
    { label: 'Bridesmaid & Family', value: 'Bridesmaid' },
    { label: 'Engagement / Sangjit', value: 'Engagement / Sangjit' },
  ]

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'Custom']

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (searchQuery.trim() !== '') count++
    if (selectedCategory !== 'all') count++
    if (maxPrice < 30000000) count++
    if (selectedOccasion !== 'all') count++
    if (acquisitionType !== 'all') count++
    if (selectedSize !== 'all') count++
    return count
  }, [
    products,
    searchQuery,
    selectedCategory,
    maxPrice,
    selectedOccasion,
    acquisitionType,
    selectedSize,
  ])

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    const list = products.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim()
        const searchable = `${product.title} ${product.silhouette} ${product.occasion} ${product.fabric} ${product.color_name} ${product.description}`.toLowerCase()
        if (!searchable.includes(query)) return false
      }

      // 2. Category Filter from top cards
      if (selectedCategory !== 'all') {
        const cat = selectedCategory.toLowerCase()
        const matchesSilhouette = product.silhouette.toLowerCase().includes(cat)
        const matchesOccasion = product.occasion.toLowerCase().replace(/\s+/g, '-').includes(cat)
        if (!matchesSilhouette && !matchesOccasion) return false
      }

      // 3. Max Price Filter (checks rental price)
      if (product.rental_price > maxPrice) return false

      // 4. Occasion Filter
      if (selectedOccasion !== 'all' && product.occasion !== selectedOccasion) return false

      // 5. Acquisition Filter
      if (acquisitionType === 'rental' && !product.is_rental_available) return false
      if (acquisitionType === 'purchase' && !product.is_purchase_available) return false

      // 6. Size Filter
      if (selectedSize !== 'all' && !product.sizes_available.includes(selectedSize)) return false

      return true
    })

    // Sort items
    return list.sort((a, b) => {
      if (sortBy === 'price-asc') return a.rental_price - b.rental_price
      if (sortBy === 'price-desc') return b.rental_price - a.rental_price
      // Default: newest
      return b.id.localeCompare(a.id)
    })
  }, [
    products,
    searchQuery,
    selectedCategory,
    maxPrice,
    selectedOccasion,
    acquisitionType,
    selectedSize,
    sortBy,
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
    setSearchQuery('')
    setMaxPrice(30000000)
    setSelectedOccasion('all')
    setAcquisitionType('all')
    setSelectedSize('all')
    setSelectedCategory('all')
    setSortBy('newest')
  }

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
      {/* ==================================================================== */}
      {/* SEARCH, FILTER TOGGLE & SORT BAR (Matches Reference Project Exactly) */}
      {/* ==================================================================== */}
      <div className="grid gap-3 border border-cream-200 bg-white p-3 sm:p-4 lg:grid-cols-[minmax(240px,1fr)_auto] lg:items-center shadow-xs">
        {/* Search Input on the Left */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            id="search-products-input"
            aria-label="Search wedding gowns or party dresses"
            placeholder="Search wedding gowns, evening dresses, lace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full border border-cream-200 bg-cream-50 pl-10 pr-4 text-xs font-semibold text-charcoal-900 transition-colors placeholder:text-charcoal-400 focus:border-charcoal-900 focus:bg-white focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Controls on the Right */}
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {/* Toggle Filter Button */}
          <button
            type="button"
            onClick={() => setIsFilterVisible((prev) => !prev)}
            aria-controls="product-filters"
            aria-expanded={isFilterVisible}
            className={`inline-flex h-10 items-center justify-center gap-2 border px-3.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeFilterCount > 0
                ? 'border-primary-600 bg-primary-600 text-white shadow-xs'
                : isFilterVisible
                ? 'border-charcoal-900 bg-charcoal-900 text-white'
                : 'border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>FILTER {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>

          {/* Quick Reset Button (shows when filters active) */}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex h-10 items-center justify-center border border-cream-300 px-3 text-xs font-bold uppercase tracking-wider text-charcoal-600 transition-colors hover:border-charcoal-900 hover:text-charcoal-900 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              <span>Reset</span>
            </button>
          )}

          {/* Sort By Dropdown */}
          <div className="flex h-10 items-center space-x-2 border border-cream-200 bg-cream-50 px-3">
            <label
              htmlFor="sort-by-select"
              className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 cursor-pointer"
            >
              SORT BY:
            </label>
            <select
              id="sort-by-select"
              aria-label="Sort product options"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent pr-2 text-xs font-bold uppercase text-charcoal-800 focus:outline-none cursor-pointer"
            >
              <option value="newest">NEWEST</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MAIN LAYOUT: CONDITIONAL SIDEBAR FILTER + RESPONSIVE PRODUCT GRID   */}
      {/* ==================================================================== */}
      <div
        className={`grid grid-cols-1 items-start gap-8 transition-all duration-300 ${
          isFilterVisible ? 'lg:grid-cols-[280px_minmax(0,1fr)]' : 'lg:grid-cols-1'
        }`}
      >
        {/* ========================================================= */}
        {/* LEFT SIDEBAR: FILTER CATALOG (Toggleable)                 */}
        {/* ========================================================= */}
        {isFilterVisible && (
          <aside
            id="product-filters"
            className="bg-cream-50/70 border border-cream-200 p-5 space-y-6 shadow-xs lg:sticky lg:top-28"
          >
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

            {/* 2. Service Acquisition Mode */}
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

            {/* 4. Size Filter */}
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
        )}

        {/* ========================================================= */}
        {/* RIGHT CATALOG: PRODUCT CARDS GRID                        */}
        {/* ========================================================= */}
        <main className="space-y-4">
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
                No gowns found matching your search and filter criteria.
              </p>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Try loosening your search keywords or resetting specific filters to explore more
                atelier designs.
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
            <div
              className={`grid grid-cols-2 gap-3.5 sm:gap-4 ${
                isFilterVisible
                  ? 'sm:grid-cols-2 lg:grid-cols-3'
                  : 'sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'
              }`}
            >
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
                    className="group relative bg-white rounded-xl overflow-hidden border border-cream-200 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-primary-300"
                  >
                    {/* Top-Right Discount Badge Only (Clean Like Kembang Seladang) */}
                    {discount && (
                      <div className="absolute top-0 right-0 z-10 bg-primary-600 text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-bl-lg shadow-xs">
                        -{discount}%
                      </div>
                    )}

                    {/* Dress Image with Clickable Link */}
                    <Link
                      to={`/products/${product.slug || product.id}`}
                      className="aspect-square sm:aspect-[4/5] w-full overflow-hidden bg-cream-50 relative block cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Content Details (Kembang Seladang Structure) */}
                    <div className="p-3 sm:p-3.5 flex flex-col flex-grow justify-between">
                      {/* 1. Product Name & Value Tags */}
                      <div className="space-y-2">
                        <Link
                          to={`/products/${product.slug || product.id}`}
                          className="block cursor-pointer"
                        >
                          <h4
                            className="font-sans text-xs sm:text-sm font-bold text-charcoal-900 leading-snug group-hover:text-primary-700 transition-colors line-clamp-2"
                            title={product.title}
                          >
                            {product.title}
                          </h4>
                        </Link>

                        {/* Value Tags (Like Garansi Segar / Free Card) */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="inline-block bg-primary-50 text-primary-700 border border-primary-200/80 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                            Free Fitting
                          </span>
                          <span className="inline-block bg-cream-100 text-charcoal-700 border border-cream-300 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                            3-Day Rent
                          </span>
                        </div>
                      </div>

                      {/* 2. Dashed Divider + Stacked Price & Plus Button */}
                      <div className="mt-3 pt-2.5 border-t border-dashed border-cream-200 flex items-end justify-between gap-2">
                        <div className="min-w-0">
                          {discount && (
                            <span className="inline-block bg-primary-50 text-primary-700 text-[9px] font-extrabold uppercase tracking-wide px-1.5 py-0.5 rounded mb-1">
                              SAVE {discount}%
                            </span>
                          )}
                          <div className="text-sm sm:text-base font-extrabold text-primary-700 leading-tight truncate">
                            {formatCurrency(product.rental_price)}
                          </div>
                          {product.original_rental_price && (
                            <div className="text-[11px] text-charcoal-400 line-through leading-tight mt-0.5 truncate">
                              {formatCurrency(product.original_rental_price)}
                            </div>
                          )}
                        </div>

                        {/* Round Add Button (Shrink-0 so it never overflows) */}
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product, 'rental')}
                          aria-label={`Add ${product.title} to bag`}
                          className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                            isJustAdded
                              ? 'bg-primary-600 border-primary-600 text-white scale-105'
                              : 'border-primary-400 text-primary-600 hover:bg-primary-600 hover:text-white'
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
