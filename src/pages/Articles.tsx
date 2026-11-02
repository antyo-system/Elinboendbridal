import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock, User } from 'lucide-react'
import { ARTICLES_DATA } from '../data/mockData'

export const Articles: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', 'Silhouette Guide', 'Bridal Budget', 'Fitting & Care']

  const filteredArticles =
    selectedCategory === 'all'
      ? ARTICLES_DATA
      : ARTICLES_DATA.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-primary-700 font-bold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1 border border-primary-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Bridal Journal</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight">
          Editorial Guidance for Every Bride
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
          Explore expert styling advice, silhouette proportions, wedding gown budget allocation,
          and behind-the-scenes craftsmanship notes from the Elinboend Bridal atelier.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-charcoal-900 text-white shadow-xs'
                  : 'bg-white border border-cream-300 text-charcoal-600 hover:bg-cream-100'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="group border border-cream-200 bg-white flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-primary-400"
          >
            <div className="aspect-[16/10] overflow-hidden bg-cream-50 relative">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-charcoal-900/90 text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5">
                {article.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-[10px] text-charcoal-400 font-semibold">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.read_time}</span>
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <h2 className="font-display text-lg font-bold text-charcoal-900 leading-snug group-hover:text-primary-700 transition-colors">
                  {article.title}
                </h2>

                <p className="text-xs text-charcoal-500 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                <span className="text-[11px] text-charcoal-600 flex items-center space-x-1 font-medium">
                  <User className="w-3 h-3 text-primary-600" />
                  <span className="truncate max-w-[140px]">{article.author}</span>
                </span>

                <Link
                  to={`/articles/${article.slug}`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-primary-700 hover:text-primary-800"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
