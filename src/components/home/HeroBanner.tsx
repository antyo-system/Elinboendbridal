import React from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'

export const HeroBanner: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden bg-charcoal-900 text-white rounded-xl sm:rounded-2xl shadow-xl">
        {/* Background Image with Dark Luxury Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1600&q=80"
            alt="Elinboend Bridal Exclusive Collection"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/85 to-charcoal-900/40" />
          <div className="absolute inset-0 bg-[radial-gradient(#dfc4af_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        </div>

        <div className="relative z-10 max-w-3xl px-5 py-9 sm:px-12 sm:py-20 lg:py-24 space-y-4 sm:space-y-5">
          {/* Fixed Hook Badge */}
          <div className="inline-flex items-center space-x-2 bg-charcoal-800/90 border border-primary-500/30 px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] font-bold tracking-wider sm:tracking-widest uppercase text-primary-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>EXCLUSIVE WEDDING GOWNS & PARTY DRESSES</span>
          </div>

          {/* Fixed Hook Title */}
          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight">
            Exquisite Wedding Gowns & Evening Dresses
          </h1>

          {/* Fixed Hook Subtitle */}
          <p className="text-xs sm:text-base text-cream-200/90 max-w-2xl leading-relaxed font-normal">
            Crafted by master bridal artisans to celebrate your sacred moments. Available for
            bespoke rental, made-to-measure purchase, and private studio fittings in Tangerang
            Selatan.
          </p>

          {/* Single Clean CTA Button (WhatsApp handled by Floating FAB) */}
          <div className="pt-1 sm:pt-2">
            <a
              href="#catalog"
              className="inline-flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg font-bold text-xs tracking-wider uppercase shadow-lg shadow-primary-600/30 active:scale-98 transition-all"
            >
              <span>Explore Gowns</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
