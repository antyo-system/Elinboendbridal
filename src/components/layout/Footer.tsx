import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ShieldCheck, Sparkles } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-900 text-cream-100 pt-16 pb-12 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Atelier Mission */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              Elinboend Bridal
            </h3>
            <p className="text-xs text-charcoal-400 leading-relaxed">
              Exquisite wedding gowns and evening couture tailored to perfection. Experience the art of private bespoke fittings, luxury rentals, and custom craftsmanship in Tangerang Selatan.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gold-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Complimentary Fitting & Alterations Included</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary-300">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Wedding Gowns (Ballgown & A-Line)
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Mermaid & Sheath Couture
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Evening Party Dresses & Galas
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Modern Heritage Kebaya Pengantin
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Bridesmaid Color Coordination
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary-300">
              Boutique Services
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-400">
              <li>
                <Link to="/about#fitting" className="hover:text-white transition-colors">
                  Book a Private Atelier Fitting
                </Link>
              </li>
              <li>
                <Link to="/about#rental-policy" className="hover:text-white transition-colors">
                  Gown Rental & Return Guidelines
                </Link>
              </li>
              <li>
                <Link to="/about#security-deposit" className="hover:text-white transition-colors">
                  Refundable Security Deposit Policy
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-white transition-colors">
                  Bridal Journal & Silhouette Guides
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Atelier Story & Craftsmanship
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary-300">
              Atelier Location
            </h4>
            <div className="space-y-2.5 text-xs text-charcoal-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                <span>Bintaro Sektor 7, Tangerang Selatan, Banten, Indonesia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <span>+62 878-8011-1169 (WhatsApp Concierge)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <span>concierge@elinboendbridal.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary-400 shrink-0" />
                <span>Tuesday – Sunday: 10:00 – 18:00 WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row justify-between items-center text-xs text-charcoal-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Elinboend Bridal Atelier. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Midtrans Payment Gateway Secured</span>
            <span>•</span>
            <span>QRIS & Virtual Accounts Supported</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

