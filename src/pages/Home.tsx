import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Calendar } from 'lucide-react'
import { HeroBanner } from '../components/home/HeroBanner'
import { CategorySlider } from '../components/home/CategorySlider'
import { CatalogSection } from '../components/home/CatalogSection'
import { useArticles } from '../hooks/useArticles'
import { updatePageSeo } from '../utils/seo'

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const { data: articles = [] } = useArticles()

  useEffect(() => {
    updatePageSeo({
      title: 'Elinboend Bridal — Exclusive Wedding Gowns & Party Dresses',
      description:
        'Discover exquisite wedding gowns, modern kebaya pengantin, and evening party dresses at Elinboend Bridal. Available for gown rental and custom tailoring.',
      canonicalPath: '/',
    })
  }, [])

  const latestArticles = articles.slice(0, 3)

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
        <div className="relative overflow-hidden bg-charcoal-800 text-white p-8 sm:p-12 lg:p-14 rounded-2xl border border-charcoal-700 shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-primary-300">
                <Sparkles className="w-4 h-4" />
                <span>Bespoke Made-to-Measure Service</span>
              </div>
              <h3 className="font-script text-3xl sm:text-5xl font-bold tracking-normal leading-tight text-white">
                Dreaming of a One-of-a-Kind Custom Gown?
              </h3>
              <p className="text-xs sm:text-sm text-cream-100/90 leading-relaxed font-normal">
                Collaborate directly with our master bridal artisans. From French Chantilly lace
                selection and delicate beadwork to custom corsetry tailored precisely to your
                proportions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a
                href="https://wa.me/6287880111169?text=Hello%20Elinboend%20Bridal%2C%20I%20would%20like%20to%20consult%20about%20a%20bespoke%20custom%20wedding%20gown."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-7 py-3.5 rounded-xl font-semibold text-xs sm:text-sm shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4 mr-1 text-cream-100" />
                <span>Book Custom Consultation</span>
              </a>

              <Link
                to="/about"
                className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-cream-100 text-primary-700 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                <span>Our Story &amp; Studio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bridal Journal / Articles Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="font-script text-3xl sm:text-5xl font-bold text-charcoal-900">
            The Bridal Journal &amp; Styling Notes
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-500">
            Expert guides on silhouettes, bridal trends, and gown care from our lead designers.
          </p>
          <div className="pt-1">
            <Link
              to="/articles"
              className="inline-flex items-center space-x-1 text-xs font-bold text-primary-600 hover:text-primary-700"
            >
              <span>Read All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="group rounded-2xl border border-cream-200 bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-primary-300"
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
