import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Calendar, Menu, X } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

export const Header: React.FC = () => {
  const location = useLocation()
  const { items, setIsCartOpen, setIsFittingModalOpen } = useCartStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Close mobile menu automatically on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname, location.hash])

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Articles', path: '/articles' },
    { label: 'About', path: '/about' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-cream-200">
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

        {/* Left: Desktop Navigation Links */}
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
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-primary-600 font-semibold border-b-2 border-primary-600 pb-1'
                    : 'text-charcoal-700 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Center: Signature Script Brand Logo (Matches Omah Poetrie Logo Style) */}
        <div className="text-center flex-1 md:flex-none px-2">
          <Link to="/" className="inline-block group py-1">
            <h1 className="font-script text-2xl sm:text-3xl text-primary-600 group-hover:text-primary-700 transition-colors whitespace-nowrap">
              Elinboend Bridal
            </h1>
          </Link>
        </div>

        {/* Right Actions: Fitting Popup Trigger (Desktop) + Cart Icon with Badge */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <button
            type="button"
            onClick={() => setIsFittingModalOpen(true)}
            aria-label="Book a private fitting"
            className="hidden sm:flex text-charcoal-700 hover:text-primary-600 transition-colors items-center space-x-1.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-charcoal-700 hover:text-primary-600">
              Fitting Appointment
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Bag"
            className="relative text-charcoal-800 hover:text-primary-600 transition-colors p-1.5 -mr-1 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemCount > 0 && (
              <span className="absolute -top-0.5 -right-1 bg-primary-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cream-50 border-b border-cream-200 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-2 divide-y divide-cream-200/70">
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
                  className={`block py-3.5 text-sm font-semibold transition-colors ${
                    isActive ? 'text-primary-600' : 'text-charcoal-800 hover:text-primary-600'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                setIsFittingModalOpen(true)
              }}
              className="w-full text-left block py-3.5 text-sm font-semibold text-charcoal-800 hover:text-primary-600 transition-colors cursor-pointer"
            >
              Fitting Appointment
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
