import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus, Zap } from 'lucide-react';

interface CartItem {
  productId: string;
  productName: string;
  productCategory: string;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  customInputs: any;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckoutCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutCart
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="relative w-full max-w-md bg-[#0B0F19] dark:bg-[#0B0F19] light:bg-white border-l border-slate-800 dark:border-slate-800 light:border-slate-200 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-between bg-[#0E1322] dark:bg-[#0E1322] light:bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-400" />
            <h3 className="font-extrabold text-base text-white dark:text-white light:text-slate-900">
              Keranjang Belanja ({items.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-3xl mb-3">
                🛍️
              </div>
              <p className="font-bold text-white dark:text-white light:text-slate-900">Keranjang Masih Kosong</p>
              <p className="text-xs text-slate-400 mt-1">Pilih produk favorit Anda di katalog dan pesan sekarang.</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#12182B] dark:bg-[#12182B] light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-start gap-3"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-14 h-14 object-cover rounded-xl border border-slate-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-white dark:text-white light:text-slate-900 truncate">
                    {item.productName}
                  </h4>
                  <p className="text-[11px] text-purple-400 truncate">
                    {item.variantName}
                  </p>
                  <p className="text-xs font-black text-white dark:text-white light:text-slate-900 mt-1">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 bg-slate-900 rounded-lg p-0.5 border border-slate-700">
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        className="w-5 h-5 flex items-center justify-center text-xs text-white hover:bg-slate-800 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-xs text-white hover:bg-slate-800 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="text-slate-400 hover:text-rose-400 p-1"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 bg-[#0E1322] dark:bg-[#0E1322] light:bg-slate-50 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-400 uppercase">Subtotal:</span>
              <span className="text-lg font-black text-white dark:text-white light:text-slate-900 font-mono">
                Rp {subtotal.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={onCheckoutCart}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Checkout Sekarang (DANA)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
