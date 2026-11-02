import React from 'react'
import { CATEGORY_SLIDES } from '../../data/mockData'
import { CategorySlide } from '../../types'

interface CategorySliderProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export const CategorySlider: React.FC<CategorySliderProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4" aria-labelledby="category-slider-title">
      {/* Clean Header Without Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-cream-200 pb-3">
        <div className="space-y-1">
          <h2 id="category-slider-title" className="font-display text-xl sm:text-2xl font-bold text-charcoal-900">
            Curated Dress Collections
          </h2>
          <p className="text-xs sm:text-sm font-medium text-charcoal-500">
            Explore handcrafted gowns tailored for holy matrimony ceremonies, grand receptions, and evening galas.
          </p>
        </div>

        {selectedCategory !== 'all' && (
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className="text-xs font-bold text-primary-700 hover:text-primary-800 transition-colors self-start sm:self-auto cursor-pointer"
          >
            Clear Category Filter ×
          </button>
        )}
      </div>

      {/* Clean 4-Card Collection Grid */}
      <div className="overflow-x-auto border border-cream-200 bg-white no-scrollbar">
        <div className="flex snap-x snap-mandatory gap-0 lg:grid lg:grid-cols-4">
          {CATEGORY_SLIDES.map((slide: CategorySlide) => {
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
                <div className="aspect-[4/3] w-full overflow-hidden bg-cream-50">
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
