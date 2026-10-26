import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const SAMPLE_PURCHASES = [
  { name: 'C******r', item: 'Sharing Profile 1 Bulan', time: 'BARU SAJA' },
  { name: 'A******d', item: 'Viu Premium VIP Drakor 3 Bulan', time: '2 MENIT YANG LALU' },
  { name: 'R******y', item: 'Mobile Legends 86 Diamonds', time: '5 MENIT YANG LALU' },
  { name: 'D******n', item: 'Netflix Private 1 Bulan UHD 4K', time: '8 MENIT YANG LALU' },
  { name: 'F******i', item: 'Roblox 400 Robux Fast', time: '11 MENIT YANG LALU' },
  { name: 'B******o', item: 'Telkomsel InternetMAX 14 GB', time: '14 MENIT YANG LALU' },
  { name: 'S******a', item: 'Canva Pro 1 Tahun Garansi', time: '18 MENIT YANG LALU' }
];

export const LiveSalesNotification: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SAMPLE_PURCHASES.length);
        setIsVisible(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = SAMPLE_PURCHASES[currentIndex];

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative rounded-2xl p-3.5 bg-white/95 dark:bg-[#121829]/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl flex items-start gap-3">
        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition-colors"
          title="Tutup Notifikasi"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Icon & Party popper */}
        <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-xl shrink-0">
          🎉
        </div>

        {/* Text Details matching screenshot */}
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-black text-[9px] tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <span>LIVE</span>
            </span>
            <span className="text-xs font-extrabold text-slate-900 dark:text-white">
              {current.name}
            </span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
            Baru saja membeli{' '}
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {current.item}
            </span>
          </p>

          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mt-1">
            {current.time}
          </span>
        </div>
      </div>
    </div>
  );
};
