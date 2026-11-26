import React from 'react'
import { MessageCircle, FolderOpen, Clock } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

export const HeroBanner: React.FC = () => {
  const { setIsFittingModalOpen } = useCartStore()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden bg-charcoal-800 text-white rounded-2xl shadow-xl">
        {/* Background Image with Soft Dark Overlay (Matches Omah Poetrie Hero Contrast) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1600&q=80"
            alt="Elinboend Bridal Exclusive Collection"
            className="w-full h-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center px-5 py-12 sm:px-10 sm:py-16 space-y-6">
          {/* Brand Title in Authentic Brittany Signature Font + Omah Poetrie Subtitle Colors */}
          <div className="space-y-3">
            <h1 className="font-script text-4xl sm:text-6xl lg:text-7xl text-white drop-shadow-lg py-2">
              Welcome to Elinboend Bridal
            </h1>
            <p className="font-sans text-lg sm:text-2xl font-bold text-[#dcb494] tracking-tight">
              Exclusive Wedding Gowns &amp; Party Dresses
            </p>
          </div>

          {/* Chava-Style Vertical Action Buttons Stack with Omah Poetrie #b4835b Caramel */}
          <div className="max-w-md mx-auto space-y-3 pt-1">
            {/* 1. Info & Sewa Dress (WhatsApp) */}
            <a
              href="https://wa.me/6287880111169?text=Halo%20Elinboend%20Bridal!%20Saya%20ingin%20bertanya%20info%20%26%20sewa%20dress."
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#b4835b] hover:bg-[#9a6d48] text-white py-3.5 px-5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2.5 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Info &amp; Sewa Dress</span>
            </a>

            {/* 2. Check Catalog (Google Drive Link) */}
            <a
              href="https://drive.google.com/drive/folders/1Aq_lgtDqJwkDSfDw_v431r18b4grU4o4"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#b4835b] hover:bg-[#9a6d48] text-white py-3.5 px-5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2.5 shadow-md transition-all"
            >
              <FolderOpen className="w-4 h-4 shrink-0" />
              <span>Check Catalog</span>
            </a>

            {/* 3. Fitting Appointment (Opens T&C + Session Booking Popup) */}
            <button
              type="button"
              onClick={() => setIsFittingModalOpen(true)}
              className="w-full bg-[#b4835b] hover:bg-[#9a6d48] text-white py-3.5 px-5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2.5 shadow-md transition-all cursor-pointer"
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>Fitting Appointment</span>
            </button>

            {/* 4. Instagram (@elinboend.bridal) */}
            <a
              href="https://www.instagram.com/elinboend.bridal/"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#b4835b] hover:bg-[#9a6d48] text-white py-3.5 px-5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2.5 shadow-md transition-all"
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
