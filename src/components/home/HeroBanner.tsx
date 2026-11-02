import React, { useState } from 'react'
import { Sparkles, Calendar, ArrowRight } from 'lucide-react'

export const HeroBanner: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = [
    {
      badge: 'ELINBOEND SIGNATURE HAUTE COUTURE',
      title: 'Exquisite Wedding Gowns & Evening Dresses',
      description:
        'Crafted by master bridal artisans to celebrate your sacred moments. Available for bespoke rental, made-to-measure purchase, and private atelier fittings.',
      ctaText: 'Explore Wedding Gowns',
      ctaLink: '#catalog',
      image:
        'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1400&q=80',
    },
    {
      badge: '2026 BRIDAL CAPSULE',
      title: 'The Royal Ethereal Ballgown Collection',
      description:
        'French Chantilly lace, crystal beading, and dramatic cathedral-length trains designed to leave a lasting impression down the aisle.',
      ctaText: 'Book a Private Fitting',
      ctaLink: '/about#fitting',
      image:
        'https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&w=1400&q=80',
    },
    {
      badge: 'EVENING & BRIDESMAID GLAMOUR',
      title: 'Midnight Velvet & Silk Party Dresses',
      description:
        'Sculptural mermaid silhouettes, sensual high slits, and draped liquid satin tailored for unforgettable galas and celebrations.',
      ctaText: 'Browse Party Dresses',
      ctaLink: '#catalog',
      image:
        'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1400&q=80',
    },
  ]

  const current = slides[activeSlide]

  return (
    <section className="relative overflow-hidden bg-charcoal-900 text-white rounded-none sm:rounded-2xl mx-0 sm:mx-4 lg:mx-8 shadow-2xl">
      {/* Background Image with Dark Vignette & Rose Hue */}
      <div className="absolute inset-0 z-0">
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(#dfc4af_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-4xl px-6 py-16 sm:px-12 sm:py-20 lg:py-24 space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-charcoal-800/90 border border-primary-500/30 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-primary-300">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>{current.badge}</span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {current.title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-cream-200/90 max-w-2xl leading-relaxed font-light">
          {current.description}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href={current.ctaLink}
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-7 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase shadow-lg shadow-primary-600/30 active:scale-98 transition-all"
          >
            <span>{current.ctaText}</span>
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

        {/* Carousel Indicators */}
        <div className="pt-6 flex items-center space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === idx ? 'w-8 bg-primary-400' : 'w-2 bg-charcoal-700 hover:bg-charcoal-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
