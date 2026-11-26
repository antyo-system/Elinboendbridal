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
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5"
      aria-labelledby="category-slider-title"
    >
      {/* Centered Script Heading + Clean Subtitle (Matches 'Hunian Nyaman untuk Anda' & 'Galeri Kami') */}
      <div className="text-center space-y-2">
        <h2
          id="category-slider-title"
          className="font-script text-3xl sm:text-4xl text-charcoal-800 py-1"
        >
          Curated Dress Collections
        </h2>
        <p className="text-xs sm:text-sm font-normal text-charcoal-500">
          Explore handcrafted gowns tailored for holy matrimony ceremonies, grand receptions, and
          evening galas.
        </p>

        {selectedCategory !== 'all' && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
            >
              Clear Category Filter ×
            </button>
          </div>
        )}
      </div>

      {/* Clean 4-Card Collection Grid */}
      <div className="overflow-x-auto no-scrollbar pb-1">
        <div className="flex snap-x snap-mandatory gap-3.5 sm:gap-4 lg:grid lg:grid-cols-4">
          {CATEGORY_SLIDES.map((slide: CategorySlide) => {
            const isSelected = selectedCategory === slide.value

            return (
              <button
                key={slide.value}
                type="button"
                onClick={() => setSelectedCategory(isSelected ? 'all' : slide.value)}
                aria-pressed={isSelected}
                className={`group relative min-w-[220px] sm:min-w-[250px] lg:min-w-0 snap-start overflow-hidden rounded-2xl bg-white text-left transition-all duration-200 border cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-2 border-primary-600 ring-2 ring-primary-200'
                    : 'border-cream-200 hover:border-primary-400 hover:shadow-md'
                }`}
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-cream-100">
                  <img
                    src={slide.image}
                    alt={slide.label}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info Text */}
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans text-sm font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors">
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
