import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types';
import { X, Check, ShieldCheck, Zap, Sparkles, Tag, ShoppingCart, ArrowRight, HelpCircle, Phone, Mail, User, Minus, Plus } from 'lucide-react';
import { storeService } from '../services/storeService';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: any) => void;
  onDirectCheckout: (orderData: any) => void;
  danaNumber: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectCheckout,
  danaNumber
}) => {
  if (!product) return null;

  // Selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { id: 'default', name: 'Standard', price: 10000, stock: 10 }
  );

  // Quantity stepper matching screenshot
  const [quantity, setQuantity] = useState<number>(1);

  // Dynamic input fields
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  
  // Payment method selection (DANA first and prioritized)
  const [paymentMethod, setPaymentMethod] = useState<'dana' | 'qris' | 'bca_va'>('dana');
  
  // Promo code
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState('');

  // Auto telco operator detection for pulsa
  const [detectedOperator, setDetectedOperator] = useState<string>('');

  // Loading transition screen for Netflix and other products ("memuat gitu loading di tampilan masuk")
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Smooth cinematic load delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 650);
    return () => clearTimeout(timer);
  }, [product?.id]);

  useEffect(() => {
    if (product.category === 'pulsa_data' && phoneNumber.length >= 4) {
      const prefix = phoneNumber.slice(0, 4);
      if (['0811', '0812', '0813', '0821', '0822', '0823', '0851', '0852', '0853'].includes(prefix)) {
        setDetectedOperator('Telkomsel');
      } else if (['0814', '0815', '0816', '0855', '0856', '0857', '0858'].includes(prefix)) {
        setDetectedOperator('Indosat Ooredoo');
      } else if (['0817', '0818', '0819', '0859', '0877', '0878'].includes(prefix)) {
        setDetectedOperator('XL Axiata');
      } else if (['0831', '0832', '0833', '0838'].includes(prefix)) {
        setDetectedOperator('AXIS');
      } else if (['0895', '0896', '0897', '0898', '0899'].includes(prefix)) {
        setDetectedOperator('Tri (3)');
      } else if (['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'].includes(prefix)) {
        setDetectedOperator('Smartfren');
      } else {
        setDetectedOperator('');
      }
    }
  }, [phoneNumber, product.category]);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const subtotal = selectedVariant.price * quantity;
    const res = storeService.validateCoupon(couponCode, subtotal);
    if (res.valid) {
      setAppliedCoupon(res);
      setCouponError('');
    } else {
      setAppliedCoupon(null);
      setCouponError(res.message);
    }
  };

  const getSubtotal = () => selectedVariant.price * quantity;

  const calculateTotal = () => {
    const subtotal = getSubtotal();
    const discount = appliedCoupon ? appliedCoupon.discount : 0;
    return Math.max(0, subtotal - discount);
  };

  const handleBuyNow = () => {
    if (product.requiredFields.includes('userId') && !userId.trim()) {
      alert('Silakan masukkan User ID game Anda.');
      return;
    }
    if (product.requiredFields.includes('phoneNumber') && !phoneNumber.trim()) {
      alert('Silakan masukkan nomor telepon tujuan.');
      return;
    }
    if (product.requiredFields.includes('email') && !email.trim()) {
      alert('Silakan masukkan alamat email yang valid.');
      return;
    }
    if (!whatsappNumber.trim()) {
      alert('Silakan masukkan nomor WhatsApp Anda untuk konfirmasi pesanan.');
      return;
    }

    const orderData = {
      items: [
        {
          productId: product.id,
          productName: product.name,
          productCategory: product.category,
          variantId: selectedVariant.id,
          variantName: selectedVariant.name,
          price: selectedVariant.price,
          quantity: quantity,
          customInputs: {
            userId: userId.trim(),
            zoneId: zoneId.trim(),
            phoneNumber: phoneNumber.trim(),
            operator: detectedOperator,
            email: email.trim(),
            whatsappNumber: whatsappNumber.trim()
          }
        }
      ],
      subtotal: getSubtotal(),
      adminFee: 0,
      discount: appliedCoupon ? appliedCoupon.discount : 0,
      total: calculateTotal(),
      promoCode: appliedCoupon ? appliedCoupon.coupon?.code : undefined,
      customerWhatsapp: whatsappNumber.trim(),
      customerEmail: email.trim() || undefined,
      payment: {
        method: paymentMethod,
        methodName: paymentMethod === 'dana' ? `DANA (${danaNumber})` : paymentMethod.toUpperCase(),
        uniqueCode: Math.floor(100 + Math.random() * 899),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      }
    };

    onDirectCheckout(orderData);
  };

  const handleAddCart = () => {
    if (!whatsappNumber.trim()) {
      alert('Silakan masukkan nomor WhatsApp Anda sebelum menambahkan ke keranjang.');
      return;
    }

    onAddToCart({
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
      customInputs: {
        userId: userId.trim(),
        zoneId: zoneId.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        whatsappNumber: whatsappNumber.trim()
      }
    });

    onClose();
  };

  // Helper for duration badge
  const getDurationBadge = (name: string) => {
    if (name.includes('3 Bulan') || name.includes('3m') || name.includes('3 Bulan')) return '90';
    if (name.includes('6 Bulan')) return '180';
    if (name.includes('1 Tahun')) return '365';
    if (name.includes('1 Bulan') || name.includes('1m') || name.includes('30 Hari')) return '30';
    return '⚡';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090D16] dark:bg-[#090D16] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden my-6">
        
        {/* CINEMATIC LOADING ENTRANCE SCREEN (Memuat di tampilan masuk Netflix & produk lain) */}
        {isLoading ? (
          <div className={`p-8 sm:p-12 min-h-[380px] sm:min-h-[440px] flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 ${
            product.name.toLowerCase().includes('netflix')
              ? 'bg-gradient-to-b from-[#180003] via-[#0A0D16] to-[#05070B]'
              : 'bg-gradient-to-b from-[#120F24] via-[#0A0D16] to-[#05070B]'
          }`}>
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Backdrop Ring */}
            <div className={`absolute w-64 h-64 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none ${
              product.name.toLowerCase().includes('netflix')
                ? 'bg-red-600'
                : 'bg-purple-600'
            }`} />

            {/* Center Icon/Logo with Pulse Effect */}
            <div className="relative mb-6">
              <div className={`w-20 h-20 rounded-3xl p-1 flex items-center justify-center shadow-2xl relative ${
                product.name.toLowerCase().includes('netflix')
                  ? 'bg-gradient-to-tr from-red-700 to-rose-500 shadow-red-900/50'
                  : 'bg-gradient-to-tr from-purple-600 to-blue-500 shadow-purple-900/50'
              }`}>
                {product.name.toLowerCase().includes('netflix') ? (
                  <div className="w-full h-full rounded-[22px] bg-black flex items-center justify-center">
                    <span className="text-3xl font-black text-red-600 tracking-tighter drop-shadow-[0_0_12px_rgba(229,9,20,0.8)]">
                      N
                    </span>
                  </div>
                ) : (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-[22px]"
                    referrerPolicy="no-referrer"
                  />
                )}
                {/* Spinning border ring */}
                <div className={`absolute -inset-1.5 rounded-[26px] border-2 border-dashed animate-spin ${
                  product.name.toLowerCase().includes('netflix')
                    ? 'border-red-500/60'
                    : 'border-purple-400/60'
                }`} style={{ animationDuration: '6s' }} />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-bold text-amber-400 flex items-center gap-1 shadow-lg">
                <Sparkles className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '3s' }} />
                <span>Memuat Data...</span>
              </div>
            </div>

            {/* Text Title & Subtitle */}
            <div className="space-y-2 max-w-sm z-10">
              <h3 className={`text-lg sm:text-xl font-black tracking-tight ${
                product.name.toLowerCase().includes('netflix')
                  ? 'text-white drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                  : 'text-white'
              }`}>
                {product.name.toLowerCase().includes('netflix')
                  ? 'Memuat Netflix Premium UHD 4K'
                  : `Memuat ${product.name}`}
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed">
                {product.name.toLowerCase().includes('netflix')
                  ? 'Menyiapkan server profil privat, anti-limit screen, & sistem garansi Yuraa Store id...'
                  : 'Menghubungkan katalog varian resmi & sistem garansi digital Yuraa Store id...'}
              </p>
            </div>

            {/* Animated Loading Bar */}
            <div className="w-48 sm:w-60 h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden relative">
              <div className={`h-full rounded-full animate-pulse transition-all duration-500 ${
                product.name.toLowerCase().includes('netflix')
                  ? 'bg-gradient-to-r from-red-600 via-rose-500 to-red-400 w-3/4'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-400 w-3/4'
              }`} />
            </div>

            {/* Skip Button */}
            <button
              onClick={() => setIsLoading(false)}
              className="mt-6 text-[11px] text-slate-400 hover:text-white font-semibold underline decoration-slate-600 hover:decoration-white transition-all z-10"
            >
              Lewati memuat →
            </button>
          </div>
        ) : (
          <>
            {/* Top Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 bg-[#090D16]/95 dark:bg-[#090D16]/95 light:bg-white/95 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <div>
                  <h2 className="font-extrabold text-sm sm:text-base uppercase tracking-tight text-white dark:text-white light:text-slate-900 leading-none">
                    {product.name}
                  </h2>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                    Yuraa Store id • Proses Instan
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* SECTION 1: DESKRIPSI PRODUK (MATCHING SCREENSHOT 3) */}
          <div className="rounded-2xl p-4 sm:p-5 bg-[#0F1423] dark:bg-[#0F1423] light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-700 space-y-3.5 shadow-inner">
            <div className="flex items-center gap-2">
              <span className="text-lg">📘</span>
              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white dark:text-white light:text-slate-900">
                DESKRIPSI
              </h3>
            </div>

            <div>
              <p className="font-bold text-xs sm:text-sm text-white dark:text-white light:text-slate-900 flex items-center gap-1.5">
                <span>{product.category === 'premium_subs' ? '🎬' : product.category === 'games_account' ? '🎮' : product.category === 'topup_game' ? '💎' : '📱'}</span>
                <span>{product.name}</span>
              </p>
              <p className="text-[11px] text-purple-400 font-medium">
                Store: Yuraa Store id
              </p>
            </div>

            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
              Halo Kak, untuk paket <span className="font-bold text-white dark:text-white light:text-slate-900">{product.name}</span>, berikut benefit order melalui Yuraa Store id:
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Full garansi dari toko</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Harga terjangkau & termurah</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Bisa diakses di semua jenis device</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Legal, aman, & tanpa VPN</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>{product.category === 'premium_subs' ? 'Kualitas gambar Ultra HD 4K & jernih' : 'Proses masuk otomatis 1-3 menit'}</span>
              </div>
            </div>

            {/* Differentiated text based on category */}
            {product.category === 'premium_subs' ? (
              <div className="pt-2 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2 text-xs">
                <p className="font-bold text-blue-400">📌 Perbedaan Sharing Profile & Private Profile</p>
                <div className="pl-2 space-y-0.5">
                  <p className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">👥 Sharing Profile:</p>
                  <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">* 1 profile berisi 2 pengguna</p>
                  <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">* Ada kemungkinan terjadi limit screen jika digunakan bersamaan</p>
                </div>
                <div className="pl-2 space-y-0.5">
                  <p className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">👤 Private Profile:</p>
                  <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">* 1 profile hanya untuk 1 pengguna</p>
                  <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">* Lebih nyaman & jarang mengalami limit screen</p>
                </div>
              </div>
            ) : product.category === 'games_account' ? (
              <div className="pt-2 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2 text-xs">
                <p className="font-bold text-amber-400">📌 Spesifikasi & Keamanan Akun Game</p>
                <div className="pl-2 space-y-0.5 text-slate-300 dark:text-slate-300 light:text-slate-600">
                  <p className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">🛡️ Status Akun & Jaminan:</p>
                  <p>* Akun All Unbind (Moonton/VK/Google Play/Konami bersih)</p>
                  <p>* Data login email pemulihan diserahkan full access</p>
                  <p>* Anti-Hackback & garansi toko penuh</p>
                </div>
              </div>
            ) : product.category === 'topup_game' ? (
              <div className="pt-2 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1 text-xs text-slate-300">
                <p className="font-bold text-cyan-400">📌 Ketentuan Top Up Resmi:</p>
                <p>* 100% Legal & Aman, tanpa minus diamond</p>
                <p>* Cukup masukkan User ID & Server ID, tidak butuh password</p>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1 text-xs text-slate-300">
                <p className="font-bold text-emerald-400">📌 Ketentuan Pulsa & Kuota:</p>
                <p>* SN (Serial Number) resmi langsung terbit 30 detik</p>
                <p>* Kuota 24 jam nonstop menambah masa aktif nomor</p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
              <p className="text-xs font-bold text-amber-400">🔥 Ready sekarang & langsung diproses</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Stok terbatas ya Kak. Silakan langsung diorder, karena yang lebih cepat akan lebih dulu diproses 😊
              </p>
            </div>
          </div>

          {/* SECTION 2: PILIH VARIASI PRODUK * (MATCHING SCREENSHOT 130048) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base">📦</span>
              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white dark:text-white light:text-slate-900">
                PILIH VARIASI PRODUK *
              </h3>
            </div>

            <div className="space-y-2.5">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant.id === variant.id;
                const durBadge = getDurationBadge(variant.name);

                return (
                  <div
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariant(variant);
                      if (appliedCoupon) {
                        const check = storeService.validateCoupon(appliedCoupon.coupon.code, variant.price * quantity);
                        if (check.valid) setAppliedCoupon(check);
                        else setAppliedCoupon(null);
                      }
                    }}
                    className={`relative rounded-2xl p-4 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#12182B] border-blue-500 shadow-[0_0_20px_-3px_rgba(59,130,246,0.4)]'
                        : 'bg-[#0E1322] hover:bg-[#12182B]/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Active Checkmark in Corner Ribbon matching screenshot */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-8 h-8 rounded-tr-2xl rounded-bl-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}

                    <div className="flex items-start justify-between pr-8">
                      <div>
                        {/* Title matching screenshot in bold uppercase */}
                        <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-tight text-white dark:text-white light:text-slate-900">
                          {variant.name}
                        </h4>

                        {/* Price matching screenshot in bold blue/purple font */}
                        <p className="mt-1 text-sm sm:text-base font-extrabold text-blue-400">
                          Rp {variant.price.toLocaleString('id-ID')}
                        </p>

                        {/* Stock / Process Pill matching screenshot */}
                        <div className="mt-2 flex items-center gap-2">
                          {variant.stock > 10 ? (
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-extrabold text-[10px] flex items-center gap-1">
                              <span>✅</span>
                              <span>STOK: {variant.stock}</span>
                            </span>
                          ) : variant.stock > 0 ? (
                            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 font-extrabold text-[10px] flex items-center gap-1">
                              <span>⚠️</span>
                              <span>SISA {variant.stock}</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-400 font-extrabold text-[10px]">
                              HABIS
                            </span>
                          )}

                          {variant.originalPrice && variant.originalPrice > variant.price && (
                            <span className="text-[10px] text-slate-400 line-through">
                              Rp {variant.originalPrice.toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Duration Badge matching screenshot */}
                      <div className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs">
                        {durBadge}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* JUMLAH PEMBELIAN * WITH QUANTITY STEPPER (MATCHING SCREENSHOT 130048) */}
            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-tight text-white dark:text-white light:text-slate-900 block">
                  JUMLAH PEMBELIAN *
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-400 font-extrabold text-[10px] tracking-wider uppercase border border-rose-500/30">
                  STOK TERSISA: {selectedVariant.stock}
                </span>

                <div className="flex items-center gap-2 bg-[#0E1322] border border-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 flex items-center justify-center text-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => Math.min(selectedVariant.stock, q + 1))}
                    disabled={quantity >= selectedVariant.stock}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 flex items-center justify-center text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: MASUKKAN DATA PESANAN */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base">📝</span>
              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white dark:text-white light:text-slate-900">
                MASUKKAN DATA TUJUAN & KONTAK *
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F1423] border border-slate-800 space-y-3">
              {/* Game User ID & Zone ID */}
              {product.requiredFields.includes('userId') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      User ID / ID Game:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 12345678"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {product.requiredFields.includes('zoneId') && (
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Zone ID / Server ID:
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: (1234)"
                        value={zoneId}
                        onChange={(e) => setZoneId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Phone number for pulsa/data */}
              {product.requiredFields.includes('phoneNumber') && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-300">
                      Nomor HP Tujuan:
                    </label>
                    {detectedOperator && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {detectedOperator}
                      </span>
                    )}
                  </div>
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Email */}
              {product.requiredFields.includes('email') && (
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Alamat Email (Untuk Pengiriman Akun):
                  </label>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Customer WhatsApp */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Nomor WhatsApp Anda (Wajib untuk Notifikasi & Struk):
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 08984436849"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: METODE PEMBAYARAN (DANA UTAMA) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">💳</span>
                <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white">
                  METODE PEMBAYARAN *
                </h3>
              </div>
              <span className="text-[10px] text-blue-400 font-bold">DANA Rekomendasi ⚡</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* DANA OTOMATIS */}
              <div
                onClick={() => setPaymentMethod('dana')}
                className={`relative rounded-2xl p-4 transition-all cursor-pointer border ${
                  paymentMethod === 'dana'
                    ? 'bg-blue-950/40 border-blue-500 shadow-[0_0_20px_-3px_rgba(59,130,246,0.4)]'
                    : 'bg-[#0E1322] border-slate-800'
                }`}
              >
                {paymentMethod === 'dana' && (
                  <div className="absolute top-0 right-0 w-7 h-7 rounded-tr-2xl rounded-bl-xl bg-blue-600 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-extrabold text-[10px]">DANA</span>
                  <span className="font-extrabold text-xs text-white uppercase">DANA (OTOMATIS)</span>
                </div>
                <p className="text-[11px] text-blue-300 font-mono mt-1">No: {danaNumber}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">Kirim bukti pembayaran ke WhatsApp</p>
              </div>

              {/* QRIS OTOMATIS */}
              <div
                onClick={() => setPaymentMethod('qris')}
                className={`relative rounded-2xl p-4 transition-all cursor-pointer border ${
                  paymentMethod === 'qris'
                    ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_20px_-3px_rgba(168,85,247,0.4)]'
                    : 'bg-[#0E1322] border-slate-800'
                }`}
              >
                {paymentMethod === 'qris' && (
                  <div className="absolute top-0 right-0 w-7 h-7 rounded-tr-2xl rounded-bl-xl bg-purple-600 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px]">QRIS</span>
                  <span className="font-extrabold text-xs text-white uppercase">QRIS (OTOMATIS)</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">BCA, Mandiri, BRI, OVO, ShopeePay</p>
                <p className="text-[9px] text-slate-400 mt-0.5">Scan kode QR instan</p>
              </div>
            </div>
          </div>

          {/* SECTION 5: KODE PROMO */}
          <div className="p-3.5 rounded-2xl bg-[#0F1423] border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-bold text-white">Punya Kode Promo?</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Contoh: YURAAHEMAT"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white uppercase focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
              >
                Gunakan
              </button>
            </div>
            {appliedCoupon && (
              <p className="text-[11px] text-emerald-400 mt-2 font-semibold">
                ✓ {appliedCoupon.message}
              </p>
            )}
            {couponError && (
              <p className="text-[11px] text-rose-400 mt-2">
                ✗ {couponError}
              </p>
            )}
          </div>

          {/* SECTION 6: RINGKASAN PESANAN (MATCHING SCREENSHOT 130051) */}
          <div className="rounded-2xl p-5 bg-[#0F1423] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <span className="text-base">📋</span>
              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white">
                RINGKASAN PESANAN
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-400 uppercase">PRODUK:</span>
                <span className="font-extrabold text-white text-right max-w-[65%] uppercase">
                  {product.name}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-400 uppercase">VARIASI:</span>
                <span className="font-extrabold text-blue-400 text-right max-w-[65%] uppercase">
                  {selectedVariant.name}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-400 uppercase">HARGA SATUAN:</span>
                <span className="font-extrabold text-white font-mono">
                  Rp {selectedVariant.price.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-400 uppercase">JUMLAH:</span>
                <span className="font-extrabold text-white font-mono">
                  x{quantity}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="font-bold text-slate-400 uppercase">SUBTOTAL:</span>
                <span className="font-extrabold text-white font-mono">
                  Rp {getSubtotal().toLocaleString('id-ID')}
                </span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between items-center text-emerald-400">
                  <span className="font-bold uppercase">DISKON PROMO:</span>
                  <span className="font-extrabold font-mono">
                    - Rp {appliedCoupon.discount.toLocaleString('id-ID')}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-black text-sm sm:text-base text-white uppercase">
                  TOTAL BAYAR:
                </span>
                <span className="font-black text-xl sm:text-2xl text-blue-400 font-mono tracking-tight">
                  Rp {calculateTotal().toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 7: PRIMARY BUY BUTTON (MATCHING SCREENSHOT 130051) */}
          <div className="space-y-3">
            <button
              onClick={handleBuyNow}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm sm:text-base uppercase tracking-widest shadow-[0_0_30px_-5px_rgba(59,130,246,0.7)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>BELI SEKARANG</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>

            {/* Sub-card matching screenshot */}
            <div className="p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span>💬</span>
                <span>MAU BUAT WEBSITE SEPERTI INI?</span>
              </span>
              <a
                href={`https://wa.me/${danaNumber}?text=Halo%20Admin%20Yuraa%20Store%20id,%20saya%20tertarik%20buat%20website%20seperti%20ini`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-purple-400 hover:text-purple-300"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </>
    )}

      </div>
    </div>
  );
};
