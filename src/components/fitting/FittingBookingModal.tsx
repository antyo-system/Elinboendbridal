import React, { useState, useMemo, useRef } from 'react'
import { X, Clock, Minus, Plus, ChevronRight, ChevronLeft } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { formatCurrency } from '../../utils/formatCurrency'

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

export const FittingBookingModal: React.FC = () => {
  const { isFittingModalOpen, setIsFittingModalOpen } = useCartStore()
  const dateScrollRef = useRef<HTMLDivElement>(null)

  // Step 1 = T&C Popup, Step 2 = Atur Sesi & Detail Booking
  const [step, setStep] = useState<'tnc' | 'booking'>('tnc')
  const [agreedToTnc, setAgreedToTnc] = useState(false)

  // Booking State (Step 2)
  const [customerCount, setCustomerCount] = useState(1)
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [selectedTime, setSelectedTime] = useState('10:00')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('+62')
  const [customerNotes, setCustomerNotes] = useState('')

  // Generate next 14 days for the horizontal date selector
  const upcomingDates = useMemo(() => {
    const list = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      const isMonday = d.getDay() === 1 // Monday closed / full indicator example
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

  if (!isFittingModalOpen) return null

  const handleClose = () => {
    setIsFittingModalOpen(false)
    setStep('tnc')
    setAgreedToTnc(false)
  }

  const scrollDates = (direction: 'left' | 'right') => {
    if (!dateScrollRef.current) return
    const offset = direction === 'right' ? 220 : -220
    dateScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const chosenDate = upcomingDates[selectedDateIndex]
    const totalDeposit = customerCount * 100000

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
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-cream-200 overflow-hidden my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close fitting popup"
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-charcoal-500 hover:text-charcoal-900 hover:bg-cream-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'tnc' ? (
          /* ========================================================= */
          /* STEP 1: FITTING T&C POPUP (Matches Reference Image 3)     */
          /* ========================================================= */
          <div className="p-6 sm:p-8 space-y-5">
            <div className="space-y-1.5 pr-6">
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
                className="mt-0.5 w-4 h-4 accent-primary-600 rounded cursor-pointer"
              />
              <span className="text-xs sm:text-sm font-medium text-charcoal-800 select-none">
                Saya sudah membaca dan menyetujui Elinboend Fitting T&amp;C.
              </span>
            </label>

            {/* Proceed Button */}
            <button
              type="button"
              disabled={!agreedToTnc}
              onClick={() => setStep('booking')}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all ${
                agreedToTnc
                  ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md cursor-pointer'
                  : 'bg-charcoal-200 text-white cursor-not-allowed'
              }`}
            >
              Setuju &amp; lanjut booking
            </button>
          </div>
        ) : (
          /* ========================================================= */
          /* STEP 2: ATUR SESI & DETAIL BOOKING (Matches Image 4)      */
          /* ========================================================= */
          <form
            onSubmit={handleBookingSubmit}
            className="max-h-[85vh] overflow-y-auto divide-y divide-cream-200"
          >
            {/* Top Section: ATUR SESI */}
            <div className="p-6 sm:p-7 space-y-5">
              <div className="space-y-1 pr-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary-700">
                    ATUR SESI
                  </span>
                  <Clock className="w-4 h-4 text-primary-600" />
                </div>
                <h3 className="font-sans text-lg sm:text-xl font-extrabold text-charcoal-900">
                  Berapa customer yang akan fitting?
                </h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">
                  1 customer = 1 sesi fitting = 45 menit. Jika booking untuk lebih dari 1 customer /
                  sesi fitting, maka jadwal akan berurutan.
                </p>
              </div>

              {/* Customer Count Selector Box */}
              <div className="bg-cream-50 border border-cream-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-charcoal-900">
                    {customerCount} customer
                  </p>
                  <p className="text-xs text-charcoal-500">
                    Durasi {customerCount * 45} menit • Deposit{' '}
                    {formatCurrency(customerCount * 100000)}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setCustomerCount((c) => Math.max(1, c - 1))}
                    className="w-9 h-9 rounded-xl bg-white border border-cream-300 flex items-center justify-center text-charcoal-700 hover:border-primary-600 transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-extrabold text-charcoal-900 w-4 text-center">
                    {customerCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCustomerCount((c) => Math.min(5, c + 1))}
                    className="w-9 h-9 rounded-xl bg-white border border-cream-300 flex items-center justify-center text-charcoal-700 hover:border-primary-600 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Date Cards Slider */}
              <div className="relative">
                <div
                  ref={dateScrollRef}
                  className="flex space-x-2.5 overflow-x-auto no-scrollbar py-1 pr-8"
                >
                  {upcomingDates.map((d, idx) => {
                    const isSelected = selectedDateIndex === idx
                    return (
                      <button
                        key={d.fullDate}
                        type="button"
                        disabled={d.isFull}
                        onClick={() => setSelectedDateIndex(idx)}
                        className={`min-w-[78px] py-3 px-2.5 rounded-2xl border text-left transition-all shrink-0 ${
                          d.isFull
                            ? 'bg-cream-100/70 border-cream-200 text-charcoal-300 cursor-not-allowed'
                            : isSelected
                            ? 'bg-primary-700 border-primary-700 text-white shadow-md cursor-pointer'
                            : 'bg-white border-cream-300 text-charcoal-900 hover:border-primary-500 cursor-pointer'
                        }`}
                      >
                        <span
                          className={`block text-[10px] font-bold uppercase ${
                            isSelected
                              ? 'text-cream-100'
                              : d.isFull
                              ? 'text-charcoal-300'
                              : 'text-charcoal-500'
                          }`}
                        >
                          {d.dayName}
                        </span>
                        <span className="block text-sm font-extrabold mt-1">{d.dateLabel}</span>
                        {d.isFull && (
                          <span className="block text-[9px] font-bold uppercase text-charcoal-400 mt-0.5">
                            FULL
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Scroll left/right buttons */}
                {selectedDateIndex > 2 && (
                  <button
                    type="button"
                    onClick={() => scrollDates('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-cream-300 flex items-center justify-center text-charcoal-700 hover:text-primary-600 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => scrollDates('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-cream-300 flex items-center justify-center text-charcoal-700 hover:text-primary-600 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Time Slot Pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTime === slot.time
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2.5 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                        !slot.available
                          ? 'bg-cream-100 border-cream-200 text-charcoal-300 line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-white border-2 border-primary-700 text-charcoal-900 shadow-xs cursor-pointer'
                          : 'bg-white border-cream-300 text-charcoal-700 hover:border-primary-500 cursor-pointer'
                      }`}
                    >
                      {slot.time}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bottom Section: DETAIL BOOKING (Data pemesan) */}
            <div className="p-6 sm:p-7 space-y-4 bg-cream-50/40">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary-700">
                  DETAIL BOOKING
                </p>
                <h3 className="font-sans text-xl font-extrabold text-charcoal-900">
                  Data pemesan
                </h3>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1.5">
                    Nama <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm text-charcoal-900 focus:border-primary-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1.5">
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+6281234567890"
                    className="w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm text-charcoal-900 focus:border-primary-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1.5">
                    Catatan <span className="text-charcoal-400 font-normal">(opsional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Contoh: Ingin mencoba gaun pernikahan A-Line & Ballgown untuk acara Desember"
                    className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-charcoal-900 focus:border-primary-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('tnc')}
                  className="px-4 py-3.5 rounded-xl border border-cream-300 bg-white text-xs font-bold text-charcoal-700 hover:bg-cream-100 transition-colors cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Lanjut Booking via WhatsApp
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
