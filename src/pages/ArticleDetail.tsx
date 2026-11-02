import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles } from 'lucide-react'
import { ARTICLES_DATA } from '../data/mockData'

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const article = ARTICLES_DATA.find((a) => a.slug === slug)

  if (!article) {
    return <Navigate to="/articles" replace />
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <Link
        to="/articles"
        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-charcoal-600 hover:text-primary-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Bridal Journal</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="inline-block bg-primary-50 text-primary-800 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 border border-primary-200">
          {article.category}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-500 pt-2 border-b border-cream-200 pb-4">
          <span className="flex items-center space-x-1.5 font-medium text-charcoal-800">
            <User className="w-3.5 h-3.5 text-primary-600" />
            <span>{article.author}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.date}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.read_time}</span>
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-[16/9] w-full overflow-hidden bg-cream-50 border border-cream-200 shadow-sm">
        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body Content */}
      <div className="prose prose-neutral max-w-none text-charcoal-800 text-sm sm:text-base leading-relaxed space-y-4">
        {article.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h2
                key={idx}
                className="font-display text-2xl font-bold text-charcoal-900 mt-6 mb-2"
              >
                {paragraph.replace('### ', '')}
              </h2>
            )
          }
          if (paragraph.startsWith('#### ')) {
            return (
              <h3
                key={idx}
                className="font-display text-xl font-bold text-charcoal-800 mt-4 mb-2 text-primary-800"
              >
                {paragraph.replace('#### ', '')}
              </h3>
            )
          }
          return (
            <p key={idx} className="leading-relaxed text-charcoal-700">
              {paragraph}
            </p>
          )
        })}
      </div>

      {/* Atelier Consultation Callout */}
      <div className="bg-cream-50 border border-cream-300 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 my-10">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-widest text-primary-700">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Experience It In Person</span>
          </div>
          <h4 className="font-display text-xl font-bold text-charcoal-900">
            Ready to Try On Your Dream Silhouette?
          </h4>
          <p className="text-xs text-charcoal-600 max-w-md">
            Reserve a 1-on-1 private fitting in our Bintaro atelier. Our lead stylists will have 3
            hand-selected gowns prepped in your VIP suite.
          </p>
        </div>
        <Link
          to="/about#fitting"
          className="bg-charcoal-900 hover:bg-primary-700 text-white px-6 py-3 font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
        >
          Book Fitting Session
        </Link>
      </div>
    </article>
  )
}

