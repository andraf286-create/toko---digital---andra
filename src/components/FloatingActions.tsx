import React from 'react';
import { MessageCircle, Sparkles, ShoppingBag } from 'lucide-react';

interface FloatingActionsProps {
  whatsappNumber: string;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAi: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  whatsappNumber,
  cartCount,
  onOpenCart,
  onOpenAi
}) => {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5">
      {/* Cart Quick Button if items present */}
      {cartCount > 0 && (
        <button
          onClick={onOpenCart}
          className="relative w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          title="Buka Keranjang"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
            {cartCount}
          </span>
        </button>
      )}

      {/* AI Assistant Launcher */}
      <button
        onClick={onOpenAi}
        className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white shadow-[0_0_20px_-3px_rgba(168,85,247,0.6)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
        title="Tanya Asisten AI"
      >
        <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
      </button>

      {/* WhatsApp Official Support Button matching screenshot */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Halo%20Admin%20Yuraa%20Store%20id,%20saya%20ingin%20tanya%20seputar%20produk`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_25px_-5px_rgba(16,185,129,0.7)] flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        title="Chat WhatsApp Admin"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </a>
    </div>
  );
};
