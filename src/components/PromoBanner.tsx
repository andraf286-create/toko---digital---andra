import React, { useState } from 'react';
import { PromoBannerConfig } from '../types';
import { Tag, Sparkles, Copy, Check, ArrowRight, X, Clock, Flame, Zap } from 'lucide-react';

interface PromoBannerProps {
  config?: PromoBannerConfig;
  currentPosition: 'top' | 'middle';
  onActionClick: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  config,
  currentPosition,
  onActionClick
}) => {
  if (!config || !config.isActive) return null;

  // Check if banner is configured to show in this position
  if (config.position !== 'both' && config.position !== currentPosition) {
    return null;
  }

  const [isCopied, setIsCopied] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!config.couponCode) return;
    navigator.clipboard.writeText(config.couponCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Theme styling
  const getThemeStyles = () => {
    switch (config.theme) {
      case 'blue_electric':
        return {
          gradient: 'from-blue-950/80 via-slate-900 to-indigo-950/80',
          border: 'border-blue-500/40',
          glow: 'shadow-[0_0_25px_-5px_rgba(59,130,246,0.3)]',
          badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          btnBg: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500',
          accentText: 'text-blue-400'
        };
      case 'fire_amber':
        return {
          gradient: 'from-amber-950/80 via-slate-900 to-red-950/80',
          border: 'border-amber-500/40',
          glow: 'shadow-[0_0_25px_-5px_rgba(245,158,11,0.3)]',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          btnBg: 'bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500',
          accentText: 'text-amber-400'
        };
      case 'emerald_pro':
        return {
          gradient: 'from-emerald-950/80 via-slate-900 to-teal-950/80',
          border: 'border-emerald-500/40',
          glow: 'shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)]',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
          accentText: 'text-emerald-400'
        };
      case 'purple_neon':
      default:
        return {
          gradient: 'from-purple-950/80 via-slate-900 to-indigo-950/80',
          border: 'border-purple-500/40',
          glow: 'shadow-[0_0_25px_-5px_rgba(168,85,247,0.3)]',
          badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          btnBg: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500',
          accentText: 'text-purple-400'
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className="max-w-6xl mx-auto px-4 my-4 animate-fade-in">
      <div className={`relative rounded-3xl p-4 sm:p-5 bg-gradient-to-r ${theme.gradient} border ${theme.border} ${theme.glow} transition-all`}>
        
        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 p-1 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          title="Tutup Banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pr-6 sm:pr-8">
          
          {/* Left Info */}
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border flex items-center gap-1 ${theme.badgeBg}`}>
                <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                <span>{config.badgeText || 'PENAWARAN SPESIAL'}</span>
              </span>

              {config.validUntil && (
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{config.validUntil}</span>
                </span>
              )}
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
              {config.title}
            </h3>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Right Action & Coupon Box */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {config.couponCode && (
              <div 
                onClick={handleCopyCode}
                className="cursor-pointer group flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/60 border border-slate-700 hover:border-purple-400 transition-all shadow-inner"
                title="Klik untuk menyalin kode kupon"
              >
                <div className="text-left">
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase leading-none">
                    Kode Promo:
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-black text-amber-300 tracking-wider">
                    {config.couponCode}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-xl bg-slate-800 group-hover:bg-purple-600 text-white flex items-center justify-center transition-colors">
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </div>
              </div>
            )}

            <button
              onClick={onActionClick}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl ${theme.btnBg} text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>{config.actionText || 'Klaim Diskon'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Copy Feedback notification */}
        {isCopied && (
          <div className="mt-2 text-[11px] text-emerald-400 font-bold flex items-center gap-1 animate-fade-in">
            <Check className="w-3 h-3" />
            <span>Kode kupon "{config.couponCode}" berhasil disalin! Silakan gunakan di keranjang atau formulir pembelian.</span>
          </div>
        )}

      </div>
    </div>
  );
};
