import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Calendar, Sparkles } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

export const Header: React.FC = () => {
  const location = useLocation()
  const { items, setIsCartOpen } = useCartStore()
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'ARTICLES', path: '/articles' },
    { label: 'ABOUT', path: '/about' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200">
      {/* Announcement Bar */}
      <div className="bg-charcoal-900 text-cream-100 py-1.5 px-4 text-center text-xs tracking-wider uppercase font-medium flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
        <span>Private Fitting Consultations Now Open for 2026/2027 Brides • Complimentary Veil Styling</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Links */}
        <nav className="flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path)

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-bold tracking-widest transition-colors duration-200 uppercase ${
                  isActive
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                    : 'text-charcoal-700 hover:text-charcoal-900'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Center Logo */}
        <div className="text-center">
          <Link to="/" className="inline-block group">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-charcoal-900 group-hover:text-primary-700 transition-colors">
              Elinboend Bridal
            </h1>
            <p className="text-[10px] tracking-[0.25em] text-primary-600 font-semibold uppercase -mt-1">
              Haute Couture & Atelier
            </p>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-5">
          <button
            type="button"
            aria-label="Search gowns"
            className="text-charcoal-700 hover:text-primary-600 transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            to="/about#fitting"
            aria-label="Book a private fitting"
            className="text-charcoal-700 hover:text-primary-600 transition-colors flex items-center space-x-1"
          >
            <Calendar className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-charcoal-600">
              Fitting
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Bag"
            className="relative text-charcoal-800 hover:text-primary-600 transition-colors p-1 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-primary-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
