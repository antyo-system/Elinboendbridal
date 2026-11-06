import React from 'react'
import { X, Trash2, ShoppingBag, ShieldCheck } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { formatCurrency } from '../../utils/formatCurrency'

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    getSubtotal,
    getSecurityDepositTotal,
    getTotalAmount,
  } = useCartStore()

  if (!isCartOpen) return null

  const subtotal = getSubtotal()
  const deposit = getSecurityDepositTotal()
  const total = getTotalAmount()

  const handleWhatsAppCheckout = () => {
    const itemsList = items
      .map(
        (it) =>
          `- ${it.product.title} (${it.acquisition_type === 'rental' ? '3-Day Rental' : 'Custom Purchase'}, Size: ${it.size}) = ${formatCurrency(
            it.acquisition_type === 'rental' ? it.product.rental_price : it.product.purchase_price
          )}`
      )
      .join('%0A')

    const depositLine =
      deposit > 0 ? `%0ARefundable Security Deposit: ${formatCurrency(deposit)}` : ''

    const message = `Hello Elinboend Bridal!%0A%0AI would like to order the following gown(s):%0A${itemsList}%0A%0ASubtotal: ${formatCurrency(
      subtotal
    )}${depositLine}%0ATotal Full Payment: ${formatCurrency(
      total
    )}%0A%0APlease confirm availability and payment details.`

    window.open(`https://wa.me/6287880111169?text=${message}`, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header (Matches Kembang Seladang Clean Style) */}
          <div className="px-5 py-4 border-b border-cream-200 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-primary-600" />
              <h3 className="font-sans text-base sm:text-lg font-bold text-charcoal-900">
                Shopping Bag
              </h3>
              <span className="bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close shopping bag"
              className="text-charcoal-500 hover:text-charcoal-900 p-1.5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item Cards List */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3 bg-cream-50/50">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <p className="font-display text-lg font-bold text-charcoal-800">
                  Your shopping bag is empty.
                </p>
                <p className="text-xs text-charcoal-500 max-w-xs mx-auto">
                  Explore our exclusive wedding gowns and party dresses to begin your journey.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 border border-cream-200 shadow-xs flex space-x-3.5"
                >
                  {/* Rounded Thumbnail */}
                  <div className="w-16 h-20 rounded-xl bg-cream-50 overflow-hidden shrink-0 border border-cream-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-charcoal-900 leading-snug line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.product.title}`}
                          className="text-charcoal-400 hover:text-red-600 transition-colors p-0.5 shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-charcoal-500">
                        {item.acquisition_type === 'rental' ? '3-Day Rental' : 'Custom Purchase'} •{' '}
                        Size {item.size}
                      </p>
                    </div>

                    <div className="flex items-baseline justify-between pt-2">
                      {item.acquisition_type === 'rental' ? (
                        <span className="text-[11px] text-charcoal-400">
                          + Deposit: {formatCurrency(item.product.security_deposit)}
                        </span>
                      ) : (
                        <span className="text-[11px] text-charcoal-400">Made-to-measure</span>
                      )}

                      <span className="text-sm font-extrabold text-primary-700">
                        {formatCurrency(
                          item.acquisition_type === 'rental'
                            ? item.product.rental_price
                            : item.product.purchase_price
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Clean Direct WhatsApp Checkout Footer */}
          {items.length > 0 && (
            <div className="border-t border-cream-200 p-5 bg-white space-y-3.5">
              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-charcoal-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal-900">{formatCurrency(subtotal)}</span>
                </div>
                {deposit > 0 && (
                  <div className="flex justify-between text-charcoal-600">
                    <span className="flex items-center space-x-1">
                      <span>Refundable Security Deposit</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
                    </span>
                    <span className="font-semibold text-charcoal-900">{formatCurrency(deposit)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline text-sm font-bold text-charcoal-900 pt-2 border-t border-cream-100">
                  <span>Total Payment</span>
                  <span className="text-lg font-extrabold text-primary-700">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-charcoal-400 leading-relaxed">
                *Excludes shipping. Your gown reservation and fitting schedule will be confirmed
                directly by our stylist via WhatsApp.
              </p>

              {/* Single Rounded WhatsApp Checkout Button */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center shadow-md transition-all cursor-pointer"
              >
                Order via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
