import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC<{ onBackHome: () => void }> = ({ onBackHome }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-5 p-8 rounded-3xl bg-[#0D1220] dark:bg-[#0D1220] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl">
        {/* Mascot Avatar with error indicator */}
        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-purple-500/40 p-1 shadow-[0_0_25px_-5px_rgba(168,85,247,0.4)]">
          <img
            src="/src/assets/images/mascot_bear_tiger_hero_1792993941291.jpg"
            alt="Mascot 404"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-3xl sm:text-4xl font-black text-purple-400">404</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white dark:text-white light:text-slate-900">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
            Halaman atau produk yang Anda cari tidak tersedia atau alamat URL salah.
          </p>
        </div>

        <button
          onClick={onBackHome}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </div>
  );
};
