import React from 'react'
import { X, Trash2, Calendar, ShieldCheck, ArrowRight, CreditCard } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { formatCurrency } from '../../utils/formatCurrency'

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    setIsPaymentOpen,
    paymentMode,
    setPaymentMode,
    removeItem,
    getSubtotal,
    getSecurityDepositTotal,
    getTotalAmount,
    getDownPaymentAmount,
    getBalanceAmount,
  } = useCartStore()

  if (!isCartOpen) return null

  const subtotal = getSubtotal()
  const deposit = getSecurityDepositTotal()
  const total = getTotalAmount()
  const downPayment = getDownPaymentAmount()
  const balance = getBalanceAmount()

  const handleProceedToPayment = () => {
    setIsCartOpen(false)
    setIsPaymentOpen(true)
  }

  const handleWhatsAppCheckout = () => {
    const itemsList = items
      .map(
        (it) =>
          `- ${it.product.title} (${it.acquisition_type.toUpperCase()}, Size: ${it.size}) = ${formatCurrency(
            it.acquisition_type === 'rental' ? it.product.rental_price : it.product.purchase_price
          )}`
      )
      .join('%0A')

    const message = `Hello Elinboend Bridal Stylist!%0A%0AI would like to reserve the following order:%0A${itemsList}%0A%0ASubtotal: ${formatCurrency(
      subtotal
    )}%0ASecurity Deposit: ${formatCurrency(deposit)}%0APayment Mode: ${
      paymentMode === 'dp_50' ? '50% Down Payment' : 'Full Payment'
    }%0AAmount Due: ${formatCurrency(
      paymentMode === 'dp_50' ? downPayment : total
    )}%0A%0APlease confirm fitting schedule and availability.`

    window.open(`https://wa.me/6287880111169?text=${message}`, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-cream-200 flex items-center justify-between bg-cream-50">
            <div>
              <h3 className="font-display text-lg font-bold text-charcoal-900">
                Your Bridal Selection
              </h3>
              <p className="text-xs text-charcoal-500 font-medium">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your bag
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="text-charcoal-500 hover:text-charcoal-900 p-1.5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-cream-100">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="font-display text-lg font-bold text-charcoal-800">
                  Your bridal bag is empty.
                </p>
                <p className="text-xs text-charcoal-500">
                  Explore our luxury gowns and evening dresses to begin your bridal journey.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex space-x-4">
                  {/* Image */}
                  <div className="w-20 h-24 bg-cream-50 overflow-hidden shrink-0 border border-cream-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-charcoal-900 leading-tight">
                          {item.product.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-charcoal-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 text-[10px] text-charcoal-500">
                        <span className="uppercase font-semibold bg-cream-100 px-1.5 py-0.5 border border-cream-300">
                          {item.acquisition_type}
                        </span>
                        <span>Size: {item.size}</span>
                      </div>

                      {item.rental_start_date && (
                        <div className="flex items-center space-x-1 text-[10px] text-primary-700 font-medium">
                          <Calendar className="w-3 h-3" />
                          <span>Rental: {item.rental_start_date} ({item.rental_days} Days)</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-baseline pt-1">
                      <span className="text-xs font-extrabold text-charcoal-900">
                        {formatCurrency(
                          item.acquisition_type === 'rental'
                            ? item.product.rental_price
                            : item.product.purchase_price
                        )}
                      </span>
                      {item.acquisition_type === 'rental' && (
                        <span className="text-[10px] text-charcoal-400">
                          + Dep: {formatCurrency(item.product.security_deposit)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment Terms & Checkout Footer */}
          {items.length > 0 && (
            <div className="border-t border-cream-200 p-6 space-y-4 bg-cream-50/50">
              {/* Payment Mode Toggle (50% DP vs Full) */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 block">
                  Select Payment Option:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('dp_50')}
                    className={`py-2 px-3 text-left border transition-all cursor-pointer ${
                      paymentMode === 'dp_50'
                        ? 'border-primary-600 bg-primary-50/80 font-bold text-primary-900'
                        : 'border-cream-300 bg-white text-charcoal-600 hover:bg-cream-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>50% Down Payment</span>
                      <span className="text-[10px] font-extrabold text-primary-600">POPULAR</span>
                    </div>
                    <p className="text-[10px] text-charcoal-500 font-normal mt-0.5">
                      Reserve gown; balance on fitting
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('full')}
                    className={`py-2 px-3 text-left border transition-all cursor-pointer ${
                      paymentMode === 'full'
                        ? 'border-primary-600 bg-primary-50/80 font-bold text-primary-900'
                        : 'border-cream-300 bg-white text-charcoal-600 hover:bg-cream-100'
                    }`}
                  >
                    <div>Full Settlement</div>
                    <p className="text-[10px] text-charcoal-500 font-normal mt-0.5">
                      100% complete payment
                    </p>
                  </button>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-charcoal-600 border-t border-cream-200 pt-3">
                <div className="flex justify-between">
                  <span>Gown Rental / Purchase Subtotal</span>
                  <span className="font-semibold text-charcoal-900">{formatCurrency(subtotal)}</span>
                </div>
                {deposit > 0 && (
                  <div className="flex justify-between text-charcoal-600">
                    <span className="flex items-center space-x-1">
                      <span>Refundable Security Deposit</span>
                      <ShieldCheck className="w-3 h-3 text-primary-600" />
                    </span>
                    <span className="font-semibold text-charcoal-900">{formatCurrency(deposit)}</span>
                  </div>
                )}
                {paymentMode === 'dp_50' && (
                  <div className="flex justify-between text-charcoal-500 text-[11px]">
                    <span>Remaining Balance Due at Final Fitting</span>
                    <span>{formatCurrency(balance)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-charcoal-900 pt-2 border-t border-cream-200">
                  <span>Due Today:</span>
                  <span className="text-primary-700 text-base">
                    {formatCurrency(paymentMode === 'dp_50' ? downPayment : total)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                {/* 1. Payment Gateway Button (Requested Feature) */}
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="w-full bg-charcoal-900 hover:bg-primary-700 text-white py-3.5 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-gold-400" />
                  <span>Pay with Midtrans Gateway (QRIS / VA)</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                {/* 2. WhatsApp Concierge Alternative */}
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-white hover:bg-cream-100 text-charcoal-800 border border-cream-300 py-2.5 px-4 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Confirm via WhatsApp Concierge
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

