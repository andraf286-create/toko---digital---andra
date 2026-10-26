import { Sun, Moon, ShoppingBag, Search, Sparkles, User, ShieldCheck, MessageCircle, Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  onOpenAi: () => void;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenTracking,
  onOpenAdmin,
  onOpenAi,
  onOpenShare
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 bg-[#080B11]/90 border-slate-800/80 dark:bg-[#080B11]/90 dark:border-slate-800/80 light:bg-white/95 light:border-slate-200 light:shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500/60 shadow-md group-hover:border-purple-400 transition-all shrink-0">
              <img
                src="/src/assets/images/mascot_bear_tiger_hero_1792993941291.jpg"
                alt="Yuraa Mascot Beruang x Harimau"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white dark:text-white light:text-slate-900 group-hover:text-purple-400 transition-colors">
                  Yuraa Store
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  id
                </span>
                <span className="text-amber-400 text-sm animate-pulse">⚡</span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 hidden sm:block">
                Digital Store Terpercaya
              </span>
            </div>
          </a>
        </div>

        {/* Search Bar - Quick Trigger */}
        <div className="flex-1 max-w-xs mx-2 hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:border-purple-500/50 hover:text-slate-200 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-purple-400" />
            <span className="truncate">Cari Netflix, MLBB, Pulsa, Robux...</span>
            <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">⌘K</kbd>
          </button>
        </div>

        {/* Right Action Icons matching screenshot */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Mobile Search Icon */}
          <button
            onClick={onOpenSearch}
            aria-label="Pencarian Produk"
            className="md:hidden p-2.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-purple-400"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAi}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-500/40 text-purple-300 hover:text-white hover:border-purple-400 shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)] transition-all text-xs font-semibold"
            title="Buka Asisten AI Yuraa"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="hidden sm:inline">Asisten AI</span>
          </button>

          {/* Dukung Domain */}
          <a
            href="#domain-support-section"
            className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-pink-950/40 border border-pink-500/30 text-pink-300 hover:text-white hover:border-pink-400 transition-all text-xs font-semibold"
            title="Dukung Pembelian Domain yuraastore.id"
          >
            <span className="text-sm">💖</span>
            <span className="hidden md:inline">Target Domain</span>
          </a>

          {/* Lacak Pesanan */}
          <button
            onClick={onOpenTracking}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-blue-500/50 hover:text-blue-400 transition-all text-xs font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Lacak Pesanan</span>
          </button>

          {/* Share Website Button (Anti-404 & Akses Semua Perangkat) */}
          <button
            onClick={onOpenShare}
            aria-label="Bagikan Link Website"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#141926] dark:bg-[#141926] light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-center text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-purple-400 hover:border-purple-500/50 transition-all hover:scale-105 active:scale-95"
            title="Bagikan Link Toko (Anti-404 / QR Code)"
          >
            <Share2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Dark / Light Mode Toggle Button (Matching Screenshot Sun Icon) */}
          <button
            onClick={toggleTheme}
            aria-label="Ganti Tema Gelap / Terang"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#141926] dark:bg-[#141926] light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-center text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-inner"
            title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="Keranjang Belanja"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#141926] dark:bg-[#141926] light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-center text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-blue-400 hover:border-blue-500/50 transition-all"
            title="Keranjang Belanja"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile / Admin Login Button (Matching Screenshot Blue Button) */}
          <button
            onClick={onOpenAdmin}
            aria-label="Dashboard Admin & Akun"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white shadow-[0_0_15px_-2px_rgba(37,99,235,0.5)] transition-all hover:scale-105 active:scale-95"
            title="Portal Admin / Kelola Toko"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
