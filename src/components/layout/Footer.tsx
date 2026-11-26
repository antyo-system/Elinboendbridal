import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-800 text-cream-100 pt-14 pb-10 border-t border-charcoal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Highlight Card (Matches Omah Poetrie Inner Taupe Card in Footer) */}
        <div className="bg-charcoal-700/90 rounded-2xl p-6 sm:p-8 text-center max-w-4xl mx-auto space-y-3 shadow-md">
          <h3 className="font-sans text-lg sm:text-xl font-bold text-white">
            Book Your Private Fitting Consultation
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-200 max-w-xl mx-auto">
            Get personalized styling recommendations, check gown availability for your wedding
            date, and schedule a private studio try-on session.
          </p>
          <div className="pt-1">
            <a
              href="https://wa.me/6287880111169?text=Hello%20Elinboend%20Bridal!%20I%20would%20like%20to%20schedule%20a%20private%20fitting%20consultation."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Chat via WhatsApp
            </a>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-2">
          {/* Brand & Mission */}
          <div className="space-y-3">
            <h3 className="font-script text-3xl font-bold text-white tracking-normal">
              Elinboend Bridal
            </h3>
            <p className="text-xs text-charcoal-200 leading-relaxed max-w-sm">
              Exclusive wedding gowns and party dresses tailored to perfection.
            </p>
            <div className="flex items-center space-x-2 text-xs text-primary-300 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Complimentary Fitting &amp; Alterations Included</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-primary-400">Quick Links</h4>
            <ul className="space-y-2 text-xs text-charcoal-100">
              <li>
                <Link to="/" className="hover:text-primary-300 transition-colors">
                  Home &amp; Gown Catalog
                </Link>
              </li>
              <li>
                <Link to="/about#fitting" className="hover:text-primary-300 transition-colors">
                  Book a Private Fitting
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-primary-300 transition-colors">
                  Bridal Journal &amp; Styling Guides
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-300 transition-colors">
                  About Us &amp; FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-primary-400">Contact</h4>
            <div className="space-y-2.5 text-xs text-charcoal-100">
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a
                  href="https://wa.me/6287880111169"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-300 hover:text-primary-200 font-semibold transition-colors"
                >
                  +62 878-8011-1169
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <span>concierge@elinboendbridal.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-primary-400 shrink-0" />
                <span>By Appointment Only</span>
              </div>
              <div className="pt-1">
                <a
                  href="https://www.instagram.com/elinboend.bridal/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-300 hover:text-primary-200 font-semibold transition-colors"
                >
                  Instagram: @elinboend.bridal
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-charcoal-700 text-center text-xs text-charcoal-300">
          <p>© {new Date().getFullYear()} Elinboend Bridal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
