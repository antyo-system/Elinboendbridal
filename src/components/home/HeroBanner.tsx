import React from 'react'
import { Sparkles, Calendar, ArrowRight } from 'lucide-react'

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-charcoal-900 text-white rounded-none sm:rounded-2xl mx-0 sm:mx-4 lg:mx-8 shadow-2xl">
      {/* Background Image with Dark Luxury Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1600&q=80"
          alt="Elinboend Bridal Haute Couture Collection"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/85 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(#dfc4af_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-4xl px-6 py-16 sm:px-12 sm:py-20 lg:py-24 space-y-6">
        {/* Fixed Hook Badge */}
        <div className="inline-flex items-center space-x-2 bg-charcoal-800/90 border border-primary-500/30 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-primary-300">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>ELINBOEND SIGNATURE HAUTE COUTURE</span>
        </div>

        {/* Fixed Hook Title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Exquisite Wedding Gowns & Evening Dresses
        </h1>

        {/* Fixed Hook Subtitle */}
        <p className="text-sm sm:text-base text-cream-200/90 max-w-2xl leading-relaxed font-light">
          Crafted by master bridal artisans to celebrate your sacred moments. Available for bespoke
          rental, made-to-measure purchase, and private atelier fittings in Tangerang Selatan.
        </p>

        {/* Direct Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href="#catalog"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-7 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase shadow-lg shadow-primary-600/30 active:scale-98 transition-all"
          >
            <span>Explore Wedding Gowns</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <a
            href="https://wa.me/6287772636627?text=Hello%20Elinboend%20Bridal%2C%20I%20would%20like%20to%20consult%20about%20a%20wedding%20gown%20fitting."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase backdrop-blur-xs transition-all"
          >
            <Calendar className="w-4 h-4 mr-1 text-gold-400" />
            <span>Chat Stylist</span>
          </a>
        </div>
      </div>
    </section>
  )
}
