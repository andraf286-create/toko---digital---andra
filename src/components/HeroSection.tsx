
import React from 'react';
import mascotImg from '../assets/images/mascot_bear_tiger_hero_1792993941291.jpg';
import { Sparkles, ArrowRight, ShieldCheck, Zap, MessageSquare } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onOpenAi: () => void;
  whatsappNumber: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onOpenAi,
  whatsappNumber
}) => {
  return (
    <section className="relative overflow-hidden pt-4 pb-6 px-4">
      {/* Background Neon Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 border transition-all duration-300 bg-gradient-to-br from-[#0D1222] via-[#0B0F1A] to-[#0A0D16] border-slate-800/80 dark:from-[#0D1222] dark:via-[#0B0F1A] dark:to-[#0A0D16] dark:border-slate-800/80 light:from-white light:via-slate-50 light:to-blue-50/30 light:border-slate-200 light:shadow-xl shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Content */}
            <div className="md:col-span-7 z-10">
              {/* Top Mini Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Semua Kebutuhan Digitalmu, Satu Tempat!</span>
              </div>

              {/* Main Headline matching screenshot */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 leading-tight">
                Akun Premium <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Harga Terbaik
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-3 text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed max-w-lg">
                Aman, cepat, bergaransi, dan terpercaya hanya di <span className="font-semibold text-purple-400">Yuraa Store id</span>. Streaming Viu Drakor, Netflix 4K, Diamond Game, dan Pulsa otomatis 24 Jam.
              </p>

              {/* Primary Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={onShopClick}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide uppercase shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)] hover:shadow-[0_0_30px_-2px_rgba(59,130,246,0.8)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>BELANJA SEKARANG</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenAi}
                  className="px-5 py-3.5 rounded-2xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 hover:text-white font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Tanya Asisten AI</span>
                </button>
              </div>

              {/* Sub-Card Callout matching Screenshot */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 max-w-md shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-blue-400 uppercase block">
                      BUTUH BANTUAN ATAU REQUEST PRODUK?
                    </span>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=Halo%20Admin%20Yuraa%20Store%20id,%20saya%20ingin%20tanya%20produk%20digital`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-white dark:text-white light:text-slate-800 hover:text-purple-400 transition-colors flex items-center gap-1.5 mt-0.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Hubungi Kami via WA ({whatsappNumber})</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>ONLINE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Mascot Zone (Bear x Tiger in Blue & Purple Hoodie thumbs up!) */}
            <div className="md:col-span-5 flex justify-center items-center relative">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 group">
                {/* Glow ring behind mascot */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/30 via-blue-500/25 to-pink-500/20 blur-2xl -z-10 group-hover:blur-3xl transition-all" />
                
                <img
                  src={mascotImg}
                  alt="Maskot Yuraa Store Beruang x Harimau"
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-300 select-none"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Micro Badge */}
                <div className="absolute -bottom-2 -left-2 sm:bottom-2 sm:left-0 px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-purple-500/40 shadow-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-white dark:text-white light:text-slate-900 leading-none">Garansi 100%</p>
                    <p className="text-[9px] text-slate-400 leading-none mt-0.5">Anti-Hackback / Anti-Hold</p>
                  </div>
                </div>

                <div className="absolute top-2 right-0 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-extrabold shadow-lg flex items-center gap-1">
                  <span>⚡ DANA Siap</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
