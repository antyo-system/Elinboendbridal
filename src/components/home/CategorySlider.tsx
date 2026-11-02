import React from 'react'
import { Sparkles } from 'lucide-react'
import { CATEGORY_SLIDES } from '../../data/mockData'
import { CategorySlide } from '../../types'

interface CategorySliderProps {
  categoryTab: 'silhouette' | 'occasion'
  setCategoryTab: (tab: 'silhouette' | 'occasion') => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export const CategorySlider: React.FC<CategorySliderProps> = ({
  categoryTab,
  setCategoryTab,
  selectedCategory,
  setSelectedCategory,
}) => {
  const filteredSlides = CATEGORY_SLIDES.filter((slide) => slide.type === categoryTab)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4" aria-labelledby="category-slider-title">
      {/* Header and Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-cream-300 pb-3">
        <div className="space-y-1">
          <h2 id="category-slider-title" className="font-display text-xl sm:text-2xl font-bold text-charcoal-900">
            Select Dress Collection
          </h2>
          <p className="text-xs sm:text-sm font-medium text-charcoal-500">
            Discover exquisite designs tailored by silhouette architecture or celebration occasion.
          </p>
        </div>

        {/* Clean Tab Switcher (Matches reference) */}
        <div className="flex items-center space-x-1 border border-cream-300 bg-cream-50 p-1 self-start sm:self-auto rounded-none">
          <button
            type="button"
            onClick={() => setCategoryTab('silhouette')}
            className={`px-3 py-1.5 text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
              categoryTab === 'silhouette'
                ? 'bg-charcoal-900 text-white shadow-xs'
                : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            By Silhouette
          </button>
          <button
            type="button"
            onClick={() => setCategoryTab('occasion')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
              categoryTab === 'occasion'
                ? 'bg-charcoal-900 text-white shadow-xs'
                : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>By Occasion</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scroll / Grid of Categories */}
      <div className="overflow-x-auto border border-cream-200 bg-white no-scrollbar">
        <div className="flex snap-x snap-mandatory gap-0 lg:grid lg:grid-cols-4">
          {filteredSlides.map((slide: CategorySlide) => {
            const isSelected = selectedCategory === slide.value

            return (
              <button
                key={slide.value}
                type="button"
                onClick={() => setSelectedCategory(isSelected ? 'all' : slide.value)}
                aria-pressed={isSelected}
                className={`group relative min-w-[220px] sm:min-w-[260px] lg:min-w-0 snap-start overflow-hidden border-r border-cream-200 bg-white text-left transition-colors duration-200 last:border-r-0 cursor-pointer ${
                  isSelected
                    ? 'bg-cream-100 outline outline-2 outline-primary-600 outline-offset-[-2px]'
                    : 'hover:bg-cream-50'
                }`}
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-charcoal-100">
                  <img
                    src={slide.image}
                    alt={slide.label}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info Text */}
                <div className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold text-charcoal-900 group-hover:text-primary-700 transition-colors">
                      {slide.label}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse →
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[11px] leading-relaxed text-charcoal-500 font-normal">
                    {slide.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
