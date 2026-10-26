import React from 'react';
import { ProductCategory } from '../types';

export type FilterCategory = 'all' | ProductCategory;

interface CategoryFilterProps {
  selectedCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
  totalProducts: number;
}

const CATEGORIES: { id: FilterCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Semua', icon: '✨' },
  { id: 'premium_subs', label: 'Akun Premium', icon: '👑' },
  { id: 'games_account', label: 'Game & Akun', icon: '🎮' },
  { id: 'topup_game', label: 'Top Up Game', icon: '💎' },
  { id: 'pulsa_data', label: 'Pulsa & Data', icon: '📱' },
  { id: 'gift_card', label: 'Gift Card', icon: '🎁' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  totalProducts
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-2 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white dark:text-white light:text-slate-900 flex items-center gap-2">
          <span>KATEGORI POPULER</span>
        </h2>
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-wider">
          {totalProducts} PRODUK
        </span>
      </div>

      {/* Horizontal Scrollable Pills matching screenshot */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white shadow-[0_0_20px_-3px_rgba(244,63,94,0.5)] scale-[1.02]'
                  : 'bg-[#121724] dark:bg-[#121724] light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
