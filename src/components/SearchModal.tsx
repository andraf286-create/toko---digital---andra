import React, { useState } from 'react';
import { Product } from '../types';
import { X, Search, ArrowRight, Zap } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');

  const filtered = products.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.variants.some(v => v.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-16 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0B0F19] dark:bg-[#0B0F19] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center gap-3 bg-[#0E1322] dark:bg-[#0E1322] light:bg-slate-50">
          <Search className="w-5 h-5 text-purple-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Ketik nama produk (Netflix, Viu, MLBB, Telkomsel, Robux)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white dark:text-white light:text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Tidak ada produk yang cocok dengan pencarian "{searchQuery}".
            </div>
          ) : (
            filtered.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-[#12182B] dark:bg-[#12182B] light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-purple-500/50 cursor-pointer transition-all flex items-center gap-3 group"
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-12 h-12 object-cover rounded-xl shrink-0 border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-white dark:text-white light:text-slate-900 truncate group-hover:text-purple-400 transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">
                    {prod.category.replace('_', ' ')}
                  </p>
                  <p className="text-xs font-black text-blue-400 font-mono mt-0.5">
                    Mulai Rp {prod.variants[0]?.price.toLocaleString('id-ID')}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
