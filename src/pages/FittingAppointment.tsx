import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  Minus,
  Plus,
  ChevronRight,
  ChevronLeft,
  FileText,
  CalendarCheck,
} from 'lucide-react'
import { formatCurrency } from '../utils/formatCurrency'
import { updatePageSeo } from '../utils/seo'

const DAY_NAMES = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
]

const TIME_SLOTS = [
  { time: '10:00', available: true },
  { time: '11:00', available: true },
  { time: '13:00', available: true },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
  { time: '17:00', available: false },
]

export const FittingAppointment: React.FC = () => {
  const dateScrollRef = useRef<HTMLDivElement>(null)

  // T&C Agreement Gate (Shows T&C popup before filling out full-screen booking page)
  const [showTncModal, setShowTncModal] = useState(true)
  const [agreedToTnc, setAgreedToTnc] = useState(false)

  // Full-Page Booking Form State
  const [customerCount, setCustomerCount] = useState(1)
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [selectedTime, setSelectedTime] = useState('10:00')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('+62')
  const [customerNotes, setCustomerNotes] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    updatePageSeo({
      title: 'Booking Jadwal Fitting — Elinboend Bridal',
      description:
        'Atur sesi fitting gaun pengantin dan pesta di studio Elinboend Bridal Tangerang Selatan. Pilih jumlah customer, tanggal, dan jam sesi fitting Anda.',
      canonicalPath: '/fitting',
    })
  }, [])

  // Generate next 14 days for the horizontal date selector
  const upcomingDates = useMemo(() => {
    const list = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      const isMonday = d.getDay() === 1 // Monday closed / full indicator
      list.push({
        dateObj: d,
        dayName: DAY_NAMES[d.getDay()],
        dateLabel: `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`,
        fullDate: d.toISOString().split('T')[0],
        isFull: isMonday,
      })
    }
    return list
  }, [])

  const scrollDates = (direction: 'left' | 'right') => {
    if (!dateScrollRef.current) return
    const offset = direction === 'right' ? 240 : -240
    dateScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const chosenDate = upcomingDates[selectedDateIndex]
  const totalDeposit = customerCount * 100000

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const msg =
      `Halo Elinboend Bridal!%0A%0A` +
      `Saya sudah membaca & menyetujui *Elinboend Fitting T&C* dan ingin booking jadwal fitting:%0A` +
      `- *Nama*: ${customerName}%0A` +
      `- *No. WhatsApp*: ${customerPhone}%0A` +
      `- *Jumlah Customer*: ${customerCount} orang (Durasi ${customerCount * 45} menit)%0A` +
      `- *Tanggal Fitting*: ${chosenDate.dayName}, ${chosenDate.dateLabel} (${chosenDate.fullDate})%0A` +
      `- *Jam Sesi*: ${selectedTime} WIB%0A` +
      `- *Deposit Fitting*: ${formatCurrency(totalDeposit)} (Rp 100.000/orang)%0A` +
      (customerNotes.trim() ? `- *Catatan*: ${customerNotes.trim()}%0A` : '') +
      `%0AMohon konfirmasi ketersediaan slot dan info rekening untuk deposit fitting. Terima kasih!`

    window.open(`https://wa.me/6287880111169?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-cream-50 pb-20">
      {/* Top Hero Header Strip */}
      <div className="bg-charcoal-800 text-white py-8 sm:py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-cream-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowTncModal(true)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#dcb494] hover:text-white transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Baca Fitting T&amp;C</span>
            </button>
          </div>

          <div className="pt-1">
            <h1 className="font-script text-4xl sm:text-5xl text-white py-1">
              Elinboend Bridal
            </h1>
            <p className="text-sm sm:text-base font-bold text-[#dcb494]">
              Private Fitting Appointment — Studio Tangerang Selatan
            </p>
          </div>
        </div>
      </div>

      {/* Main Full-Page Booking Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-4 space-y-6">
        <form onSubmit={handleBookingSubmit} className="space-y-6">
          {/* ========================================================= */}
          {/* CARD 1: ATUR SESI (Full Width, Comfortable Spacing)       */}
          {/* ========================================================= */}
          <section className="bg-white rounded-3xl border border-cream-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-700">
                  ATUR SESI
                </span>
                <Clock className="w-4 h-4 text-primary-600" />
              </div>
              <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-charcoal-900">
                Berapa customer yang akan fitting?
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                1 customer = 1 sesi fitting = 45 menit. Jika booking untuk lebih dari 1 customer /
                sesi fitting, maka jadwal akan berurutan.
              </p>
            </div>

            {/* Customer Counter Box */}
            <div className="bg-cream-50 border border-cream-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
              <div>
                <p className="text-base font-bold text-charcoal-900">
                  {customerCount} customer
                </p>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
                  Durasi {customerCount * 45} menit • Deposit{' '}
                  <strong className="text-primary-700">{formatCurrency(totalDeposit)}</strong>
                </p>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => setCustomerCount((c) => Math.max(1, c - 1))}
                  className="w-10 h-10 rounded-xl bg-white border border-cream-300 flex items-center justify-center text-charcoal-700 hover:border-primary-600 transition-colors shadow-2xs cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-extrabold text-charcoal-900 w-5 text-center">
                  {customerCount}
                </span>
                <button
                  type="button"
                  onClick={() => setCustomerCount((c) => Math.min(5, c + 1))}
                  className="w-10 h-10 rounded-xl bg-white border border-cream-300 flex items-center justify-center text-charcoal-700 hover:border-primary-600 transition-colors shadow-2xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Date Selector Slider */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600">
                Pilih Tanggal Fitting
              </label>

              <div className="relative">
                <div
                  ref={dateScrollRef}
                  className="flex space-x-3 overflow-x-auto no-scrollbar py-1 pr-10"
                >
                  {upcomingDates.map((d, idx) => {
                    const isSelected = selectedDateIndex === idx
                    return (
                      <button
                        key={d.fullDate}
                        type="button"
                        disabled={d.isFull}
                        onClick={() => setSelectedDateIndex(idx)}
                        className={`min-w-[88px] sm:min-w-[96px] py-3.5 px-3.5 rounded-2xl border text-left transition-all shrink-0 ${
                          d.isFull
                            ? 'bg-cream-100/70 border-cream-200 text-charcoal-300 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#b4835b] border-[#b4835b] text-white shadow-md cursor-pointer'
                            : 'bg-white border-cream-300 text-charcoal-900 hover:border-primary-500 cursor-pointer'
                        }`}
                      >
                        <span
                          className={`block text-[11px] font-bold uppercase ${
                            isSelected
                              ? 'text-cream-100'
                              : d.isFull
                              ? 'text-charcoal-300'
                              : 'text-charcoal-500'
                          }`}
                        >
                          {d.dayName}
                        </span>
                        <span className="block text-base font-extrabold mt-1">{d.dateLabel}</span>
                        {d.isFull && (
                          <span className="block text-[10px] font-bold uppercase text-charcoal-400 mt-0.5">
                            FULL
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => scrollDates('left')}
                  aria-label="Scroll dates left"
                  className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-cream-300 items-center justify-center text-charcoal-700 hover:text-primary-600 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollDates('right')}
                  aria-label="Scroll dates right"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-cream-300 flex items-center justify-center text-charcoal-700 hover:text-primary-600 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600">
                Pilih Jam Sesi (WIB)
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTime === slot.time
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-3 px-4 rounded-xl text-sm font-extrabold border transition-all ${
                        !slot.available
                          ? 'bg-cream-100 border-cream-200 text-charcoal-300 line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-white border-2 border-[#b4835b] text-charcoal-900 shadow-xs cursor-pointer'
                          : 'bg-white border-cream-300 text-charcoal-700 hover:border-primary-500 cursor-pointer'
                      }`}
                    >
                      {slot.time}
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* CARD 2: DETAIL BOOKING — DATA PEMESAN                     */}
          {/* ========================================================= */}
          <section className="bg-white rounded-3xl border border-cream-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-700">
                DETAIL BOOKING
              </p>
              <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-charcoal-900">
                Data pemesan
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-charcoal-900 mb-1.5">
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full rounded-xl border border-cream-300 bg-white px-4 py-3.5 text-sm text-charcoal-900 focus:border-primary-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-charcoal-900 mb-1.5">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+6281234567890"
                  className="w-full rounded-xl border border-cream-300 bg-white px-4 py-3.5 text-sm text-charcoal-900 focus:border-primary-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-charcoal-900 mb-1.5">
                  Catatan <span className="text-charcoal-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  rows={3}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Contoh: Ingin mencoba dress pernikahan atau party dress warna champagne / maroon"
                  className="w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm text-charcoal-900 focus:border-primary-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Summary Box Before Submit */}
            <div className="bg-cream-50 border border-cream-200 rounded-2xl p-4 sm:p-5 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center space-x-2 font-bold text-charcoal-900">
                <CalendarCheck className="w-4 h-4 text-primary-600" />
                <span>Ringkasan Sesi Fitting Anda:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-charcoal-600">
                <div>
                  Tanggal:{' '}
                  <strong className="text-charcoal-900">
                    {chosenDate.dayName}, {chosenDate.dateLabel}
                  </strong>
                </div>
                <div>
                  Jam: <strong className="text-charcoal-900">{selectedTime} WIB</strong>
                </div>
                <div>
                  Sesi:{' '}
                  <strong className="text-charcoal-900">
                    {customerCount} Customer ({customerCount * 45} mnt)
                  </strong>
                </div>
                <div>
                  Deposit:{' '}
                  <strong className="text-primary-700">{formatCurrency(totalDeposit)}</strong>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#b4835b] hover:bg-[#9a6d48] text-white py-4 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer"
            >
              Konfirmasi &amp; Booking Jadwal via WhatsApp
            </button>
          </section>
        </form>
      </div>

      {/* ========================================================= */}
      {/* INITIAL T&C POPUP MODAL (Matches Screenshot 3 Reference)  */}
      {/* ========================================================= */}
      {showTncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-xs" />

          <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-cream-200 p-6 sm:p-8 space-y-5 my-8">
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-primary-700">
                SEBELUM BOOKING
              </p>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-charcoal-900">
                Elinboend Fitting T&amp;C
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                Mohon baca dan setujui T&amp;C fitting sebelum memilih jadwal fitting dan melakukan
                pembayaran deposit fitting.
              </p>
            </div>

            {/* Scrollable T&C List Box */}
            <div className="bg-cream-50 border border-cream-200 rounded-2xl p-4 sm:p-5 max-h-64 overflow-y-auto text-xs sm:text-sm text-charcoal-800 space-y-3 leading-relaxed">
              <ul className="list-disc pl-4 space-y-2.5">
                <li>
                  <strong>By Appointment Only</strong> — tidak menerima walk-in.
                </li>
                <li>
                  <strong>First Pay, First Book</strong> — untuk sewa &amp; jadwal fitting.
                </li>
                <li>
                  Dress yang dicoba saat fitting <strong>bukan berarti otomatis tersedia</strong>{' '}
                  untuk tanggal sewa. Mohon segera melakukan{' '}
                  <strong>konfirmasi dan pelunasan</strong> setelah fitting untuk memastikan dress
                  masih available. First Pay, First Book berlaku.
                </li>
                <li>
                  Deposit fitting <strong>Rp 100.000/orang</strong>.
                </li>
                <li>
                  <strong>MAKSIMAL mencoba 5 dress</strong> per customer saat fitting. Tidak
                  diperkenankan mencoba lebih dari 5 dress.
                </li>
                <li>
                  Jika dress yang dipilih ternyata sudah disewa customer lain pada hari fitting,
                  mohon memilih dress lain yang masih tersedia.
                </li>
                <li>
                  Deposit fitting menjadi deposit sewa apabila customer jadi menyewa dan melakukan
                  pelunasan maksimal 3 hari setelah fitting. Di luar batas waktu tersebut atau tidak
                  jadi menyewa, maka deposit fitting hangus.
                </li>
                <li>
                  Maksimal 3 orang hadir di studio dalam 1 sesi fitting (1 customer + maksimal 2
                  pendamping) dengan durasi 45 menit.
                </li>
                <li>
                  Jumlah minimal dress yang disewa harus sesuai dengan jumlah slot fitting yang
                  dibooking. Contoh: 1 slot fitting = minimal booking 1 dress. 2 slot fitting =
                  minimal booking 2 dress, dst.
                </li>
              </ul>
            </div>

            {/* Agreement Checkbox Box */}
            <label className="flex items-start space-x-3 p-3.5 sm:p-4 rounded-xl border border-cream-300 bg-white cursor-pointer hover:border-primary-500 transition-colors">
              <input
                type="checkbox"
                checked={agreedToTnc}
                onChange={(e) => setAgreedToTnc(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#b4835b] rounded cursor-pointer"
              />
              <span className="text-xs sm:text-sm font-medium text-charcoal-800 select-none">
                Saya sudah membaca dan menyetujui Elinboend Fitting T&amp;C.
              </span>
            </label>

            {/* Proceed Button */}
            <button
              type="button"
              disabled={!agreedToTnc}
              onClick={() => setShowTncModal(false)}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all ${
                agreedToTnc
                  ? 'bg-[#b4835b] hover:bg-[#9a6d48] text-white shadow-md cursor-pointer'
                  : 'bg-charcoal-200 text-white cursor-not-allowed'
              }`}
            >
              Setuju &amp; lanjut booking
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
