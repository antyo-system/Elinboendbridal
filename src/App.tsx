import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { CartDrawer } from './components/cart/CartDrawer'
import { PaymentModal } from './components/payment/PaymentModal'
import { Home } from './pages/Home'
import { Articles } from './pages/Articles'
import { ArticleDetail } from './pages/ArticleDetail'
import { About } from './pages/About'

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Header */}
      <Header />

      {/* Main Outlet */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Navigate to="/#catalog" replace />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Shopping Bag Slide-over Drawer */}
      <CartDrawer />

      {/* Midtrans Payment Gateway Modal */}
      <PaymentModal />
    </div>
  )
}

export default App
