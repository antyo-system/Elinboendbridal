import React from 'react'
import { Phone } from 'lucide-react'

export const WhatsAppFab: React.FC = () => {
  return (
    <a
      href="https://wa.me/6287880111169?text=Hello%20Elinboend%20Bridal!%20I%20would%20like%20to%20consult%20about%20wedding%20gowns%20and%20party%20dresses."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#12B76A] hover:bg-[#0E9F5A] text-white shadow-lg shadow-[#12B76A]/30 flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <Phone className="w-6 h-6 fill-current" />
    </a>
  )
}

