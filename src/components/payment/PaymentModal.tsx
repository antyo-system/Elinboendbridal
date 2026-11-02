import React, { useState } from 'react'
import {
  X,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Building2,
  CreditCard,
  Copy,
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { PaymentMethod } from '../../types'

export const PaymentModal: React.FC = () => {
  const {
    isPaymentOpen,
    setIsPaymentOpen,
    items,
    paymentMode,
    getSubtotal,
    getSecurityDepositTotal,
    getTotalAmount,
    getDownPaymentAmount,
    clearCart,
  } = useCartStore()

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details')
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('qris')
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Elena Kusuma',
    phone: '081234567890',
    email: 'elena.kusuma@example.com',
    eventDate: '2026-12-12',
    notes: 'Require 2cm bust alteration if possible',
  })
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isPaymentOpen) return null

  const subtotal = getSubtotal()
  const deposit = getSecurityDepositTotal()
  const total = getTotalAmount()
  const downPayment = getDownPaymentAmount()
  const payableAmount = paymentMode === 'dp_50' ? downPayment : total
  const orderNumber = `EB-20261102-${Math.floor(1000 + Math.random() * 9000)}`

  const handleProceedToGateway = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Check if Midtrans Snap is initialized on window
    const win = window as any
    if (win.snap && typeof win.snap.pay === 'function') {
      // In production/sandbox, we would request a real snap_token from server
      // win.snap.pay(token, { onSuccess, onPending, onError, onClose })
    }

    // Advance to interactive payment step
    setTimeout(() => {
      setIsProcessing(false)
      setStep('payment')
    }, 600)
  }

  const handleSimulateSuccessfulPayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep('success')
      clearCart()
    }, 1200)
  }

  const handleCopyVA = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsPaymentOpen(false)}
      />

      <div className="relative bg-white w-full max-w-lg shadow-2xl border border-cream-200 z-10 overflow-hidden">
        {/* Top Header */}
        <div className="bg-charcoal-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-gold-400" />
            <h3 className="font-display text-base font-bold tracking-wider uppercase">
              Midtrans Payment Gateway
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsPaymentOpen(false)}
            className="text-charcoal-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* STEP 1: CUSTOMER & RESERVATION DETAILS */}
        {/* ======================================================== */}
        {step === 'details' && (
          <form onSubmit={handleProceedToGateway} className="p-6 space-y-4">
            <div className="bg-cream-50 border border-cream-200 p-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-charcoal-600">Order Type:</span>
                <span className="font-bold text-charcoal-900">
                  {paymentMode === 'dp_50' ? '50% Down Payment' : 'Full Payment'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-charcoal-600">Total Due Today:</span>
                <span className="font-extrabold text-primary-700 text-sm">
                  {formatCurrency(payableAmount)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1">
                  Full Name / Bride Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full text-xs p-2.5 border border-cream-300 focus:outline-primary-600 bg-white"
                  placeholder="e.g. Elena Kusuma"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-cream-300 focus:outline-primary-600 bg-white"
                    placeholder="e.g. 081234567890"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1">
                    Event / Wedding Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={customerInfo.eventDate}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, eventDate: e.target.value })
                    }
                    className="w-full text-xs p-2.5 border border-cream-300 focus:outline-primary-600 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1">
                  Email Address (For E-Receipt)
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full text-xs p-2.5 border border-cream-300 focus:outline-primary-600 bg-white"
                  placeholder="e.g. elena@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1">
                  Special Notes / Alteration Requests
                </label>
                <textarea
                  rows={2}
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                  className="w-full text-xs p-2.5 border border-cream-300 focus:outline-primary-600 bg-white"
                  placeholder="e.g. Bust size 86cm, heels 10cm, need fitting next Saturday"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full mt-4 bg-charcoal-900 hover:bg-primary-700 text-white py-3.5 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
            >
              <span>{isProcessing ? 'Connecting Gateway...' : 'Choose Payment Method'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </form>
        )}

        {/* ======================================================== */}
        {/* STEP 2: PAYMENT METHOD SELECTION & MIDTRANS SIMULATION */}
        {/* ======================================================== */}
        {step === 'payment' && (
          <div className="p-6 space-y-5">
            {/* Payment Summary */}
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase tracking-wider font-semibold">
                  Invoice No.
                </span>
                <p className="text-xs font-mono font-bold text-charcoal-800">{orderNumber}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-charcoal-400 uppercase tracking-wider font-semibold">
                  Amount Due
                </span>
                <p className="text-base font-extrabold text-primary-700">
                  {formatCurrency(payableAmount)}
                </p>
              </div>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
              <button
                type="button"
                onClick={() => setSelectedMethod('qris')}
                className={`p-2 border transition-all cursor-pointer ${
                  selectedMethod === 'qris'
                    ? 'border-primary-600 bg-primary-50 font-bold text-primary-900'
                    : 'border-cream-300 bg-white text-charcoal-600'
                }`}
              >
                <QrCode className="w-4 h-4 mx-auto mb-1 text-primary-700" />
                <span className="text-[10px] uppercase font-bold">QRIS</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('bca_va')}
                className={`p-2 border transition-all cursor-pointer ${
                  selectedMethod === 'bca_va'
                    ? 'border-primary-600 bg-primary-50 font-bold text-primary-900'
                    : 'border-cream-300 bg-white text-charcoal-600'
                }`}
              >
                <Building2 className="w-4 h-4 mx-auto mb-1 text-primary-700" />
                <span className="text-[10px] uppercase font-bold">BCA VA</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('mandiri_va')}
                className={`p-2 border transition-all cursor-pointer ${
                  selectedMethod === 'mandiri_va'
                    ? 'border-primary-600 bg-primary-50 font-bold text-primary-900'
                    : 'border-cream-300 bg-white text-charcoal-600'
                }`}
              >
                <Building2 className="w-4 h-4 mx-auto mb-1 text-primary-700" />
                <span className="text-[10px] uppercase font-bold">Mandiri</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('credit_card')}
                className={`p-2 border transition-all cursor-pointer ${
                  selectedMethod === 'credit_card'
                    ? 'border-primary-600 bg-primary-50 font-bold text-primary-900'
                    : 'border-cream-300 bg-white text-charcoal-600'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1 text-primary-700" />
                <span className="text-[10px] uppercase font-bold">Card</span>
              </button>
            </div>

            {/* Method Details Pane */}
            <div className="bg-cream-50 border border-cream-200 p-4 space-y-3">
              {selectedMethod === 'qris' && (
                <div className="text-center space-y-2">
                  <p className="text-xs font-semibold text-charcoal-700">
                    Scan dynamic QRIS using GoPay, ShopeePay, BCA Mobile, or Dana:
                  </p>
                  <div className="w-40 h-40 mx-auto bg-white border border-charcoal-300 p-2 flex flex-col items-center justify-center shadow-xs">
                    {/* Simulated QR Pattern */}
                    <div className="w-32 h-32 bg-charcoal-900 p-1 flex items-center justify-center">
                      <div className="w-full h-full bg-white flex items-center justify-center p-2">
                        <QrCode className="w-24 h-24 text-charcoal-900" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-[11px] text-charcoal-500">
                    <Clock className="w-3.5 h-3.5 text-primary-600" />
                    <span>Expires in 14:59 minutes</span>
                  </div>
                </div>
              )}

              {selectedMethod === 'bca_va' && (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-600">BCA Virtual Account Number:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyVA('8800081234567890')}
                      className="text-primary-700 hover:text-primary-800 font-bold flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Copied!' : 'Copy VA'}</span>
                    </button>
                  </div>
                  <div className="bg-white p-3 border border-cream-300 font-mono text-base font-extrabold text-charcoal-900 tracking-wider">
                    8800 0812 3456 7890
                  </div>
                  <p className="text-[11px] text-charcoal-500 leading-relaxed">
                    Automatic confirmation within 10 seconds of m-BCA / KlikBCA transfer.
                  </p>
                </div>
              )}

              {selectedMethod === 'mandiri_va' && (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-600">Mandiri Bill Number:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyVA('8900081234567890')}
                      className="text-primary-700 hover:text-primary-800 font-bold flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-white p-3 border border-cream-300 font-mono text-base font-extrabold text-charcoal-900 tracking-wider">
                    8900 0812 3456 7890
                  </div>
                  <p className="text-[11px] text-charcoal-500 leading-relaxed">
                    Company Code: <strong>70012</strong> (Elinboend Bridal Atelier).
                  </p>
                </div>
              )}

              {selectedMethod === 'credit_card' && (
                <div className="space-y-2 text-xs">
                  <p className="text-charcoal-600">
                    Visa, Mastercard, & JCB accepted with 3D-Secure OTP verification.
                  </p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Card Number (4000 1234 5678 9010)"
                      className="w-full text-xs p-2 border border-cream-300 bg-white"
                      defaultValue="4000 1234 5678 9010"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="text-xs p-2 border border-cream-300 bg-white"
                        defaultValue="12/28"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="text-xs p-2 border border-cream-300 bg-white"
                        defaultValue="888"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Test Simulation Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleSimulateSuccessfulPayment}
                disabled={isProcessing}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg"
              >
                <ShieldCheck className="w-4 h-4 text-gold-300" />
                <span>
                  {isProcessing ? 'Verifying Transaction...' : 'Simulate Payment Settlement'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-full text-xs text-charcoal-500 hover:text-charcoal-900 py-1 cursor-pointer"
              >
                ← Back to Customer Details
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: PAYMENT CONFIRMED / SUCCESS RECEIPT */}
        {/* ======================================================== */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-2xl font-bold text-charcoal-900">
                Payment Received & Reservation Confirmed!
              </h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-charcoal-900">{customerInfo.name}</strong>. Your
                order <span className="font-mono font-bold text-primary-700">{orderNumber}</span>{' '}
                has been recorded and secured via Midtrans.
              </p>
            </div>

            <div className="bg-cream-50 border border-cream-200 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Amount Settled:</span>
                <span className="font-extrabold text-charcoal-900">
                  {formatCurrency(payableAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Payment Status:</span>
                <span className="font-bold text-green-700 uppercase">Settlement (Paid)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Event / Rental Date:</span>
                <span className="font-semibold text-charcoal-900">{customerInfo.eventDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Atelier Fitting:</span>
                <span className="font-semibold text-primary-700">VIP Fitting Suite Reserved</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/6287772636627?text=Hello%20Elinboend%20Bridal!%20My%20payment%20for%20order%20${orderNumber}%20has%20been%20settled%20via%20Midtrans%20for%20${customerInfo.name}.%20Please%20schedule%20my%20fitting%20session.`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-white py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Notify Stylist on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 text-gold-400" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsPaymentOpen(false)
                  setStep('details')
                }}
                className="w-full text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 py-1.5 cursor-pointer"
              >
                Close & Return to Boutique
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
