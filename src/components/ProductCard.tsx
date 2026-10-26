import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Flame, Zap, Rocket } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  // Lowest price among variants
  const minPrice = product.variants.length > 0 
    ? Math.min(...product.variants.map(v => v.price))
    : 10000;
  
  const minOriginalPrice = product.variants.length > 0 && product.variants[0].originalPrice
    ? product.variants[0].originalPrice
    : Math.round(minPrice * 1.35);

  const sold = product.soldCount || 1250;
  const stock = product.stockLeft || 25;
  const totalSlots = sold + stock;
  const progressPercent = Math.min(95, Math.max(15, Math.round((sold / totalSlots) * 100)));

  // Category label formatter
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'premium_subs': return 'AKUN PREMIUM';
      case 'games_account': return 'GAME & AKUN';
      case 'topup_game': return 'TOP UP GAME';
      case 'pulsa_data': return 'PULSA & DATA';
      case 'gift_card': return 'GIFT CARD';
      default: return 'DIGITAL PRODUCT';
    }
  };

  return (
    <div 
      onClick={() => onSelect(product)}
      className="group relative flex flex-col justify-between rounded-2xl p-3 sm:p-4 transition-all duration-200 cursor-pointer bg-[#0D1220] dark:bg-[#0D1220] light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-purple-500/60 light:hover:border-purple-400 hover:shadow-[0_4px_25px_-5px_rgba(139,92,246,0.25)]"
    >
      {/* Top Image Container matching screenshot */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#141A2B] dark:bg-[#141A2B] light:bg-slate-100 flex items-center justify-center p-2 mb-3">
        {/* Top Badge (e.g. ⭐ TRENDING or 🚀 PROSES ±30 MENIT) */}
        {product.badge && (
          <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-amber-500/90 text-slate-950 font-extrabold text-[9px] sm:text-[10px] tracking-wide shadow-md flex items-center gap-1">
            <span>{product.badge}</span>
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // graceful fallback container
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Sub-badge at bottom of image matching screenshot (e.g. 🚀 BAYAR LANGSUNG KIRIM) */}
        <div className="absolute bottom-2 inset-x-2 z-10 flex justify-center">
          <span className="px-2 py-0.5 rounded-full bg-blue-600/90 text-white font-bold text-[8px] sm:text-[9px] tracking-wider uppercase backdrop-blur-sm shadow-md flex items-center gap-1">
            {product.subBadge?.includes('BAYAR') ? (
              <Rocket className="w-2.5 h-2.5" />
            ) : (
              <Zap className="w-2.5 h-2.5 text-amber-300" />
            )}
            <span>{product.subBadge || '🚀 PROSES INSTAN'}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Category kicker */}
        <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase">
          {getCategoryLabel(product.category)}
        </span>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-bold text-white dark:text-white light:text-slate-900 line-clamp-2 mt-0.5 group-hover:text-purple-400 transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Pricing matching screenshot */}
        <div className="mt-2">
          {minOriginalPrice > minPrice && (
            <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 light:text-slate-400 line-through block font-medium">
              Rp {minOriginalPrice.toLocaleString('id-ID')}
            </span>
          )}
          <span className="text-sm sm:text-base font-extrabold text-white dark:text-white light:text-slate-900 block tracking-tight">
            Rp {minPrice.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Sales & Stock Bar matching screenshot */}
        <div className="mt-2.5">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 font-semibold mb-1">
            <span className="flex items-center gap-1 text-slate-300 dark:text-slate-300 light:text-slate-600">
              <ShoppingCart className="w-2.5 h-2.5 text-blue-400" />
              <span>{sold.toLocaleString('id-ID')} TERJUAL</span>
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Flame className="w-2.5 h-2.5 text-amber-400" />
              <span>SISA {stock}</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 dark:bg-slate-800 light:bg-slate-200 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Button at bottom matching screenshot */}
      <div className="mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className="w-full py-2 px-2 rounded-xl text-center font-bold text-[10px] sm:text-xs tracking-wider uppercase transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md group-hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.6)] flex items-center justify-center gap-1.5"
        >
          <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
          <span>{product.subBadge || 'BELI SEKARANG'}</span>
        </button>
      </div>
    </div>
  );
};
