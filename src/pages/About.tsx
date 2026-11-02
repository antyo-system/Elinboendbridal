import React, { useState } from 'react'
import {
  Sparkles,
  Scissors,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Phone,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react'

export const About: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    date: '',
    slot: '10:00 - 11:30',
    type: 'Wedding Gown Consultation',
  })

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSuccess(true)
  }

  const faqs = [
    {
      q: 'How does the gown rental process work?',
      a: 'All rental bookings are based on a standard 3-day duration (e.g. Friday collection, Saturday wedding, Monday return). Extended rentals (7 days for destination weddings) are also available upon request. Professional dry cleaning and pre-event alterations are included with every rental.',
    },
    {
      q: 'How is the security deposit (uang jaminan) handled?',
      a: 'A refundable security deposit is held during the rental period. Upon the safe return and post-event inspection of the gown (checking for lace integrity, absence of fabric tears), your deposit is 100% refunded to your bank account within 24 to 48 hours.',
    },
    {
      q: 'Can I request alterations for a rental gown?',
      a: 'Yes! We provide complimentary customized alterations for bust, waist, and hemline length. Our internal corset structure allows dynamic adjustment without permanently modifying the gown structure.',
    },
    {
      q: 'What should I bring to my private fitting session?',
      a: 'Please bring the exact wedding day heels (or shoes with the target heel height) so our seamstresses can set the exact hemline. We also recommend wearing seamless nude undergarments.',
    },
    {
      q: 'How do I pay with the Midtrans Payment Gateway?',
      a: 'You can complete your reservation online using QRIS (GoPay, ShopeePay, BCA Mobile), Virtual Accounts (BCA, Mandiri, BRI, BNI), or Credit Cards. You have the choice to pay a 50% Down Payment to secure your date, with the balance settled during your final fitting.',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Atelier Hero Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center space-x-2 text-primary-700 font-bold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1 border border-primary-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Atelier Heritage</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight leading-tight">
            The Art of Bridal Architecture & Haute Couture
          </h1>

          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Founded with a passion for architectural corsetry and exquisite European fabrics,{' '}
            <strong>Elinboend Bridal</strong> is dedicated to creating moments of pure magic for
            brides in Tangerang Selatan and beyond.
          </p>

          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            We believe every woman deserves to experience the confidence of a gown designed to
            celebrate her unique silhouette. Whether you choose our curated luxury rental
            collection or commission a bespoke made-to-measure creation, our master tailors invest
            hundreds of hours of meticulous hand-beading, draping, and fitting into every garment.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cream-200">
            <div>
              <p className="font-display text-2xl font-bold text-charcoal-900">500+</p>
              <p className="text-[11px] text-charcoal-500 uppercase tracking-wider font-medium">
                Brides Styled
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-charcoal-900">100%</p>
              <p className="text-[11px] text-charcoal-500 uppercase tracking-wider font-medium">
                Handcrafted Fitting
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-charcoal-900">10+ Yrs</p>
              <p className="text-[11px] text-charcoal-500 uppercase tracking-wider font-medium">
                Atelier Excellence
              </p>
            </div>
          </div>
        </div>

        {/* Story Photo Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-[3/4] overflow-hidden bg-cream-50 border border-cream-200 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=700&q=80"
              alt="Elinboend Bridal Atelier Craft"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden bg-cream-50 border border-cream-200 shadow-md translate-y-6">
            <img
              src="https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&w=700&q=80"
              alt="Bridal Fitting Experience"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Craftsmanship Steps */}
      <section className="bg-cream-50 border border-cream-200 p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-primary-700">
            <Scissors className="w-4 h-4 text-primary-600" />
            <span>The Bespoke Journey</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900">
            How We Craft Your Dream Fit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Silhouette Consultation',
              desc: 'Explore cuts, lace types, and necklines tailored to your wedding venue and mood.',
            },
            {
              step: '02',
              title: 'Custom Alterations',
              desc: 'Precise measurements to tailor the internal corset and hemline to your heel height.',
            },
            {
              step: '03',
              title: 'VIP Studio Fitting',
              desc: 'Private 1-on-1 session in our luxury fitting suite with your trusted loved ones.',
            },
            {
              step: '04',
              title: 'Final Delivery & Steaming',
              desc: 'Delivered in a breathable garment bag, pristine and ready for your sacred day.',
            },
          ].map((item) => (
            <div key={item.step} className="bg-white p-5 border border-cream-300 space-y-2">
              <span className="font-display text-3xl font-bold text-primary-300 block">
                {item.step}
              </span>
              <h3 className="font-display text-sm font-bold text-charcoal-900">{item.title}</h3>
              <p className="text-xs text-charcoal-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Private Fitting Booking Form Anchor */}
      <section id="fitting" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-4">
          <div className="inline-flex items-center space-x-2 text-primary-700 font-bold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1 border border-primary-200">
            <Calendar className="w-3.5 h-3.5" />
            <span>VIP Appointment</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900">
            Reserve Your Private Fitting Session
          </h2>

          <p className="text-xs text-charcoal-600 leading-relaxed">
            Experience our gowns in a dedicated VIP suite with your own personal stylist. Each
            appointment includes 90 minutes of dedicated styling, veil pairing, and refreshments.
          </p>

          <div className="space-y-2 text-xs text-charcoal-700 pt-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary-600 shrink-0" />
              <span>90 Minutes Private Suite Duration</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-primary-600 shrink-0" />
              <span>Complimentary Try-on for up to 3 Gowns</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-primary-600 shrink-0" />
              <span>Instant WhatsApp Confirmation</span>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-2 bg-white border border-cream-300 p-6 sm:p-8 shadow-sm">
          {bookingSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-charcoal-900">
                Fitting Appointment Requested!
              </h3>
              <p className="text-xs text-charcoal-500 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{bookingData.name}</strong>. Our bridal concierge will contact
                you on WhatsApp at <strong>{bookingData.phone}</strong> to confirm your slot on{' '}
                <strong>{bookingData.date}</strong> ({bookingData.slot}).
              </p>
              <button
                type="button"
                onClick={() => setBookingSuccess(false)}
                className="mt-2 text-xs font-bold text-primary-700 underline cursor-pointer"
              >
                Book Another Fitting Session
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full text-xs p-2.5 border border-cream-300 focus:outline-primary-600"
                    placeholder="e.g. Elena Kusuma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-cream-300 focus:outline-primary-600"
                    placeholder="e.g. 081234567890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full text-xs p-2.5 border border-cream-300 focus:outline-primary-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1">
                    Time Slot *
                  </label>
                  <select
                    value={bookingData.slot}
                    onChange={(e) => setBookingData({ ...bookingData, slot: e.target.value })}
                    className="w-full text-xs p-2.5 border border-cream-300 focus:outline-primary-600 bg-white"
                  >
                    <option value="10:00 - 11:30">Morning (10:00 - 11:30 WIB)</option>
                    <option value="13:00 - 14:30">Afternoon (13:00 - 14:30 WIB)</option>
                    <option value="15:30 - 17:00">Sunset (15:30 - 17:00 WIB)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1">
                  Occasion Type *
                </label>
                <select
                  value={bookingData.type}
                  onChange={(e) => setBookingData({ ...bookingData, type: e.target.value })}
                  className="w-full text-xs p-2.5 border border-cream-300 focus:outline-primary-600 bg-white"
                >
                  <option value="Wedding Gown Consultation">Wedding Gown (Holy Matrimony / Reception)</option>
                  <option value="Party & Evening Gown">Evening Party Dress / Gala</option>
                  <option value="Modern Kebaya Consultation">Modern Kebaya Pengantin</option>
                  <option value="Bridesmaids Group Fitting">Bridesmaid Group Styling</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-charcoal-900 hover:bg-primary-700 text-white py-3.5 px-4 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Confirm Private Fitting Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 4. Showroom & Atelier Location */}
      <section className="border-t border-cream-200 pt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 text-primary-700 font-bold text-xs uppercase tracking-widest">
            <MapPin className="w-4 h-4" />
            <span>Visit Our Atelier</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900">
            Elinboend Bridal Atelier Bintaro
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Conveniently located in Bintaro Sektor 7, Tangerang Selatan. Accessible via Tol Pondok
            Aren and KRL Jurang Mangu station. Private parking available on premises.
          </p>
          <div className="space-y-2 text-xs text-charcoal-700">
            <p>
              <strong>Address:</strong> Ruko Bintaro Arcade 1, Sektor 7, Bintaro Jaya, Tangerang
              Selatan 15224
            </p>
            <p>
              <strong>Opening Hours:</strong> Tuesday – Sunday, 10:00 – 18:00 WIB (Closed on
              Mondays)
            </p>
            <p>
              <strong>WhatsApp Concierge:</strong> +62 877-7263-6627
            </p>
          </div>
        </div>

        {/* Map Placeholder Card */}
        <div className="bg-cream-100 border border-cream-300 p-8 text-center space-y-3">
          <MapPin className="w-10 h-10 text-primary-600 mx-auto" />
          <h3 className="font-display text-lg font-bold text-charcoal-900">
            Interactive Map & Directions
          </h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
            Click below to open direct GPS navigation via Google Maps or Waze to our atelier showroom.
          </p>
          <a
            href="https://maps.google.com/?q=Bintaro+Sektor+7+Tangerang+Selatan"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-colors"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="border-t border-cream-200 pt-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-charcoal-500">
            Everything you need to know about gown rentals, deposit returns, and atelier fittings.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-cream-200 border border-cream-200 bg-white">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-charcoal-900 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-primary-600 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <p className="mt-3 text-xs text-charcoal-600 leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
