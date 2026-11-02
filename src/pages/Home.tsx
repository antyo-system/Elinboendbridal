import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Calendar } from 'lucide-react'
import { HeroBanner } from '../components/home/HeroBanner'
import { CategorySlider } from '../components/home/CategorySlider'
import { CatalogSection } from '../components/home/CatalogSection'
import { ARTICLES_DATA } from '../data/mockData'

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const latestArticles = ARTICLES_DATA.slice(0, 3)

  return (
    <div className="pt-4 sm:pt-6 space-y-12 pb-24">
      {/* 1. Fixed Hero Hook */}
      <HeroBanner />

      {/* 2. Curated Category Selection (Single Recommended Dimension) */}
      <CategorySlider
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 3. Marketplace Catalog & Real-time Filter Sidebar */}
      <CatalogSection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 4. Custom Couture Bespoke Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-charcoal-900 text-white p-8 sm:p-12 lg:p-16 border border-charcoal-800 shadow-2xl">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#dfc4af_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-gold-400">
                <Sparkles className="w-4 h-4" />
                <span>Bespoke Made-to-Measure Atelier</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Dreaming of a One-of-a-Kind Custom Gown?
              </h3>
              <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed font-light">
                Collaborate directly with our master couturiers. From French Chantilly lace selection
                and personalized Swarovski embroidery to architectural corsetry tailored precisely to
                your proportions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a
                href="https://wa.me/6287772636627?text=Hello%20Elinboend%20Bridal%2C%20I%20would%20like%20to%20consult%20about%20a%20bespoke%20custom%20wedding%20gown."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-7 py-3.5 rounded-none font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4 mr-1 text-gold-300" />
                <span>Book Bespoke Consultation</span>
              </a>

              <Link
                to="/about"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-none font-bold text-xs uppercase tracking-wider backdrop-blur-xs transition-all"
              >
                <span>Discover Atelier Story</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bridal Journal / Articles Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-cream-200 pb-3">
          <div className="space-y-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal-900">
              The Bridal Journal & Styling Notes
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500">
              Expert guides on silhouettes, bridal trends, and gown care from our lead designers.
            </p>
          </div>
          <Link
            to="/articles"
            className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center space-x-1"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="group border border-cream-200 bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-primary-400"
            >
              <div className="aspect-[16/10] overflow-hidden bg-cream-50 relative">
                <img
                  src={article.cover_image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-charcoal-900/90 text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5">
                  {article.category}
                </span>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-charcoal-400 font-semibold">
                    {article.date} • {article.read_time}
                  </span>
                  <h4 className="font-display text-base font-bold text-charcoal-900 leading-snug group-hover:text-primary-700 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-charcoal-500 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-xs font-bold text-primary-700">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
