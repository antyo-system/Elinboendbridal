import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Calendar, Menu, X } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

export const Header: React.FC = () => {
  const location = useLocation()
  const { items, setIsCartOpen } = useCartStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Close mobile menu automatically on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname, location.hash])

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'ARTICLES', path: '/articles' },
    { label: 'ABOUT', path: '/about' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Mobile Hamburger Button (Visible on Mobile, Hidden on Desktop) */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            className="p-2 -ml-2 text-charcoal-800 hover:text-primary-600 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Left: Desktop Navigation Links (Hidden on Mobile, Visible on Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
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

        {/* Center: Brand Logo (Clean & Never Cropped on Mobile) */}
        <div className="text-center flex-1 md:flex-none px-2">
          <Link to="/" className="inline-block group">
            <h1 className="font-display text-xl sm:text-3xl font-bold tracking-tight text-charcoal-900 group-hover:text-primary-700 transition-colors whitespace-nowrap">
              Elinboend Bridal
            </h1>
            <p className="hidden sm:block text-[10px] tracking-[0.18em] text-primary-600 font-semibold uppercase -mt-1">
              Exclusive Wedding Gowns & Party Dresses
            </p>
          </Link>
        </div>

        {/* Right Actions: Fitting (Desktop) + Cart Icon with Badge */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <Link
            to="/about#fitting"
            aria-label="Book a private fitting"
            className="hidden sm:flex text-charcoal-700 hover:text-primary-600 transition-colors items-center space-x-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-600">
              Fitting
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Bag"
            className="relative text-charcoal-800 hover:text-primary-600 transition-colors p-1.5 -mr-1 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 sm:w-5 sm:h-5" />
            {totalItemCount > 0 && (
              <span className="absolute -top-0.5 -right-1 bg-charcoal-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Matches Kembang Seladang Clean Style) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-cream-200 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-2 divide-y divide-cream-100">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path)

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3.5 text-xs font-bold tracking-widest uppercase transition-colors ${
                    isActive ? 'text-primary-600' : 'text-charcoal-800 hover:text-primary-600'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              to="/about#fitting"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3.5 text-xs font-bold tracking-widest uppercase text-charcoal-800 hover:text-primary-600 transition-colors"
            >
              PRIVATE FITTING
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
