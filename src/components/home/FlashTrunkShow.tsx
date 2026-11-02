import React, { useState, useEffect } from 'react'
import { Zap, ChevronRight, Plus } from 'lucide-react'
import { PRODUCTS_DATA } from '../../data/mockData'
import { formatCurrency } from '../../utils/formatCurrency'
import { useCartStore } from '../../store/useCartStore'
import { Product } from '../../types'

export const FlashTrunkShow: React.FC = () => {
  const flashProducts = PRODUCTS_DATA.filter((p) => p.is_flash_sale)
  const { addItem } = useCartStore()

  // Countdown timer state (HH : MM : SS)
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 48, seconds: 48 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 2, minutes: 0, seconds: 0 } // Reset loop for demo
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDigit = (num: number) => num.toString().padStart(2, '0')

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      product,
      acquisition_type: 'rental',
      size: 'S',
      quantity: 1,
      rental_days: 3,
    })
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      {/* Flash Header & Timer (Matches Screenshot 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-cream-200 pb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-primary-600 font-extrabold tracking-wider text-base sm:text-lg uppercase">
            <Zap className="w-5 h-5 fill-primary-600" />
            <span>FLASH TRUNK SHOW</span>
          </div>

          {/* Countdown Boxes */}
          <div className="flex items-center space-x-1 font-mono text-xs font-bold text-white">
            <span className="bg-charcoal-900 px-2 py-1 rounded-xs">
              {formatDigit(timeLeft.hours)}
            </span>
            <span className="text-charcoal-900 font-bold">:</span>
            <span className="bg-charcoal-900 px-2 py-1 rounded-xs">
              {formatDigit(timeLeft.minutes)}
            </span>
            <span className="text-charcoal-900 font-bold">:</span>
            <span className="bg-charcoal-900 px-2 py-1 rounded-xs">
              {formatDigit(timeLeft.seconds)}
            </span>
          </div>
        </div>

        <a
          href="#catalog"
          className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center space-x-1"
        >
          <span>View All Deals</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Horizontal Flash Cards Carousel */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex space-x-3.5 sm:space-x-4">
          {flashProducts.map((product) => {
            const discountPercent =
              product.flash_sale_discount_percent ||
              Math.round(
                (((product.original_rental_price || product.rental_price) - product.rental_price) /
                  (product.original_rental_price || product.rental_price)) *
                  100
              )

            return (
              <div
                key={product.id}
                className="group relative flex-none w-[180px] sm:w-[210px] border border-cream-200 bg-white p-2.5 transition-all duration-300 hover:shadow-md"
              >
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 z-10 bg-primary-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-none shadow-xs">
                  -{discountPercent}%
                </div>

                {/* Dress Photo */}
                <div className="aspect-[3/4] w-full overflow-hidden bg-cream-50 relative">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Quick Add Overlay */}
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    aria-label="Rent this dress"
                    className="absolute bottom-2 right-2 bg-charcoal-900/90 hover:bg-primary-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Info */}
                <div className="mt-2.5 space-y-1">
                  <h4 className="text-xs font-semibold text-charcoal-900 truncate" title={product.title}>
                    {product.title}
                  </h4>

                  {/* Pricing */}
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-xs font-extrabold text-primary-700">
                      {formatCurrency(product.rental_price)}
                    </span>
                    {product.original_rental_price && (
                      <span className="text-[10px] text-charcoal-400 line-through">
                        {formatCurrency(product.original_rental_price)}
                      </span>
                    )}
                  </div>

                  {/* Stock Pill (Matches Screenshot 2: "SISA 1 KODI!") */}
                  <div className="pt-1">
                    <div className="w-full bg-primary-600 text-white text-[9px] font-bold uppercase tracking-wider text-center py-0.5 rounded-xs">
                      Remaining: {product.flash_sale_stock || 1} Slot!
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
