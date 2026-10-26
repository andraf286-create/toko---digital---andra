import React, { useState, useEffect } from 'react';
import { SubscriptionReminderNotification } from './components/SubscriptionReminderNotification';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter, FilterCategory } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { InvoiceModal } from './components/InvoiceModal';
import { LiveSalesNotification } from './components/LiveSalesNotification';
import { AiAssistantModal } from './components/AiAssistantModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { SearchModal } from './components/SearchModal';
import { HowToOrderSection } from './components/HowToOrderSection';
import { FaqSection } from './components/FaqSection';
import { DomainSupportSection } from './components/DomainSupportSection';
import { PromoBanner } from './components/PromoBanner';
import { CustomerTestimonialsSection } from './components/CustomerTestimonialsSection';
import { ShareWebsiteModal } from './components/ShareWebsiteModal';
import { Footer } from './components/Footer';
import { NotFoundPage } from './components/NotFoundPage';
import { FloatingActions } from './components/FloatingActions';
import { storeService } from './services/storeService';
import { Product, Order, StoreSettings } from './types';

export default function App() {
  const [products, setProducts] = useState<Product[]>(storeService.getProducts());
  const [settings, setSettings] = useState<StoreSettings>(storeService.getSettings());
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeInvoice, setActiveInvoice] = useState<Order | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('yuraa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('yuraa_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync data on changes
  useEffect(() => {
    const handleUpdate = () => {
      setProducts(storeService.getProducts());
      setSettings(storeService.getSettings());
    };
    window.addEventListener('yuraa_data_updated', handleUpdate);
    return () => window.removeEventListener('yuraa_data_updated', handleUpdate);
  }, []);

  // Filter products strictly based on categories requested
  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  // Cart handlers
  const handleAddToCart = (item: any) => {
    setCartItems(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (index: number, newQty: number) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckoutCart = () => {
    if (cartItems.length === 0) return;
    
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderData = {
      items: cartItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        productCategory: item.productCategory,
        variantId: item.variantId,
        variantName: item.variantName,
        price: item.price,
        quantity: item.quantity,
        customInputs: item.customInputs
      })),
      subtotal,
      adminFee: 0,
      discount: 0,
      total: subtotal,
      customerWhatsapp: cartItems[0]?.customInputs?.whatsappNumber || settings.adminWhatsapp,
      payment: {
        method: 'dana' as const,
        methodName: `DANA (${settings.danaNumber})`,
        uniqueCode: Math.floor(100 + Math.random() * 899),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      }
    };

    const newOrder = storeService.createOrder(orderData);
    setCartItems([]);
    setIsCartOpen(false);
    setActiveInvoice(newOrder);
  };

  // Direct checkout handler from ProductDetailModal
  const handleDirectCheckout = (orderData: any) => {
    const newOrder = storeService.createOrder(orderData);
    setSelectedProduct(null);
    setActiveInvoice(newOrder);
  };

  const handleShopNowScroll = () => {
    const el = document.getElementById('catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-200">
        
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white text-[11px] font-semibold py-1.5 px-4 text-center border-b border-purple-800/40">
          <p className="max-w-6xl mx-auto truncate">
            {settings.announcementText}
          </p>
        </div>

        {/* Header */}
        <Header
          cartCount={cartItems.reduce((sum, itm) => sum + itm.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenTracking={() => setIsTrackingOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenAi={() => setIsAiOpen(true)}
          onOpenShare={() => setIsShareOpen(true)}
        />

        {/* Main Content */}
        {showNotFound ? (
          <NotFoundPage onBackHome={() => setShowNotFound(false)} />
        ) : (
          <main className="flex-1">
            {/* Hero Section */}
            <HeroSection
              onShopClick={handleShopNowScroll}
              onOpenAi={() => setIsAiOpen(true)}
              whatsappNumber={settings.adminWhatsapp}
            />

            {/* PromoBanner (Top Position) */}
            <PromoBanner
              currentPosition="top"
              onActionClick={handleShopNowScroll}
            />

            {/* Catalog Section */}
            <div id="catalog-section" className="pt-2">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                totalProducts={filteredProducts.length}
              />

              {/* Product Grid */}
              <div className="max-w-6xl mx-auto px-4">
                {filteredProducts.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 bg-[#0E1322] rounded-3xl border border-slate-800 my-6">
                    <p className="text-sm font-bold text-white">Tidak ada produk dalam kategori ini.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* PromoBanner (Middle Position) */}
            <PromoBanner
              currentPosition="middle"
              onActionClick={handleShopNowScroll}
            />

            {/* How To Order Section */}
            <HowToOrderSection />

            {/* Testimoni Pelanggan Setia */}
            <CustomerTestimonialsSection />

            {/* Dukungan Beli Domain Sendiri */}
            <div id="domain-support-section">
              <DomainSupportSection danaNumber={settings.danaNumber} />
            </div>

            {/* FAQ Section */}
            <FaqSection whatsappNumber={settings.adminWhatsapp} />
          </main>
        )}

        {/* Footer */}
        <Footer
          storeName={settings.storeName}
          whatsappNumber={settings.adminWhatsapp}
          danaNumber={settings.danaNumber}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenTracking={() => setIsTrackingOpen(true)}
        />

        {/* Live Sales Toast Notification */}
        <LiveSalesNotification />

        {/* Floating Action Buttons */}
        <FloatingActions
          whatsappNumber={settings.adminWhatsapp}
          cartCount={cartItems.reduce((sum, itm) => sum + itm.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAi={() => setIsAiOpen(true)}
        />

        {/* MODALS */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
            danaNumber={settings.danaNumber}
          />
        )}

        {activeInvoice && (
          <InvoiceModal
            order={activeInvoice}
            onClose={() => setActiveInvoice(null)}
            danaNumber={settings.danaNumber}
          />
        )}

        <AiAssistantModal
          isOpen={isAiOpen}
          onClose={() => setIsAiOpen(false)}
          danaNumber={settings.danaNumber}
        />

        <OrderTrackingModal
          isOpen={isTrackingOpen}
          onClose={() => setIsTrackingOpen(false)}
          onSelectOrder={(ord) => {
            setActiveInvoice(ord);
          }}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQty}
          onRemoveItem={handleRemoveCartItem}
          onCheckoutCart={handleCheckoutCart}
        />

        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onRefreshData={() => {
            setProducts(storeService.getProducts());
            setSettings(storeService.getSettings());
          }}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        <ShareWebsiteModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          storeName={settings.storeName}
        />

        <SubscriptionReminderNotification
          onRenewOrder={(ord) => {
            setActiveInvoice(ord);
          }}
        />

      </div>
    </ThemeProvider>
  );
}
```eof

