import React, { useState, useEffect } from 'react';
import { Globe, Heart, Sparkles, Send, Check, Volume2, Trophy, MessageSquare, ArrowRight } from 'lucide-react';

interface Donor {
  id: string;
  name: string;
  amount: number;
  message: string;
  date: string;
}

const STORAGE_KEY = 'yuraa_domain_donations_v1';
const TARGET_AMOUNT = 250000; // Target beli domain .id + hosting 1 tahun (Rp 250.000)

export const DomainSupportSection: React.FC<{ danaNumber: string }> = ({ danaNumber }) => {
  const [donors, setDonors] = useState<Donor[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : []; // Starts from zero as requested: "tampilan target dari nol"
    } catch {
      return [];
    }
  });

  const [donorName, setDonorName] = useState('');
  const [customAmount, setCustomAmount] = useState<number>(15000);
  const [donorMessage, setDonorMessage] = useState('');
  const [showThankYouModal, setShowThankYouModal] = useState<Donor | null>(null);

  // Calculate collected amount (starts from 0)
  const collectedAmount = donors.reduce((sum, d) => sum + d.amount, 0);
  const progressPercent = Math.min(100, Math.round((collectedAmount / TARGET_AMOUNT) * 100));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(donors));
  }, [donors]);

  // Play "Terima Kasih Orang Baik" voice + chime
  const playThankYouAudio = (name: string, msg: string) => {
    // 1. Melodic Chime with Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        
        // Arpeggio chords
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          
          gain.gain.setValueAtTime(0.25, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.6);
        });
      }
    } catch (e) {
      console.warn('Audio chime error', e);
    }

    // 2. Browser Voice Speech Synthesis: "Terima kasih orang baik"
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const speechText = `Terima kasih banyak orang baik! Donasi dari ${name || 'Kakak'} sebesar ${customAmount.toLocaleString('id-ID')} rupiah sangat berharga untuk beli domain Yuraa Store id.`;
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = 'id-ID';
        utterance.rate = 1.0;
        utterance.pitch = 1.1;

        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
        if (idVoice) utterance.voice = idVoice;

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech error', err);
      }
    }
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAmount < 1000) {
      alert('Minimal donasi adalah Rp 1.000');
      return;
    }

    const finalName = donorName.trim() || 'Orang Baik (Anonim)';
    const finalMsg = donorMessage.trim() || 'Semoga Yuraa Store id segera memiliki domain .id sendiri!';

    const newDonor: Donor = {
      id: 'DON-' + Date.now().toString().slice(-6),
      name: finalName,
      amount: customAmount,
      message: finalMsg,
      date: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setDonors(prev => [newDonor, ...prev]);
    setShowThankYouModal(newDonor);
    playThankYouAudio(finalName, finalMsg);

    // Reset inputs
    setDonorName('');
    setDonorMessage('');
  };

  const PRESET_AMOUNTS = [5000, 10000, 25000, 50000, 100000];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#121028] via-[#0E1326] to-[#0A0E1A] border-2 border-purple-500/40 shadow-[0_0_35px_-5px_rgba(168,85,247,0.25)] overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Target Progress & Info */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Dukungan Beli Domain Resmi .ID</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bantu Yuraa Store id Punya <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Domain Sendiri (yuraastore.id)
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Agar toko ini semakin profesional, mudah diakses pelanggan, dan memiliki tautan resmi <strong>yuraastore.id</strong>. Setiap dukungan kecil dari Kakak sangat berarti bagi kami! 💖
            </p>

            {/* TARGET DARI NOL PROGRESS BAR */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Terkumpul Saat Ini:</span>
                </span>
                <span className="font-mono font-extrabold text-emerald-400 text-base">
                  Rp {collectedAmount.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Progress bar starting from 0 */}
              <div className="w-full h-3.5 rounded-full bg-slate-900 border border-slate-700/80 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-700 relative shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                  style={{ width: `${Math.max(4, progressPercent)}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>

              <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400 pt-0.5">
                <span>Mulai dari Rp 0 ({donors.length} Donatur)</span>
                <span className="text-purple-300 font-bold">
                  Target: Rp {TARGET_AMOUNT.toLocaleString('id-ID')} ({progressPercent}%)
                </span>
              </div>
            </div>

            {/* Test Voice Trigger Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => playThankYouAudio('Orang Baik', 'Semoga berkah selalu!')}
                className="px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
                title="Dengarkan Suara Terima Kasih"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Tes Suara "Terima Kasih Orang Baik" 🔊</span>
              </button>

              <span className="text-[11px] text-slate-400">
                Transfer DANA: <strong className="text-blue-400 font-mono">{danaNumber}</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Donation Form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleDonate}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3.5 shadow-xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Kirim Dukungan & Donasi</span>
                </h3>
                <span className="text-[10px] text-purple-400 font-bold">via DANA</span>
              </div>

              {/* Preset amounts */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1.5">
                  Pilih Nominal Dukungan:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setCustomAmount(amt)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                        customAmount === amt
                          ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      Rp {amt.toLocaleString('id-ID')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom amount */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Atau Masukkan Nominal Sendiri (Rp):
                </label>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Donor Name */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Nama Anda / Samaran:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso / Orang Baik"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Donor Message */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Pesan Semangat / Doa:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ketik pesan semangat untuk Yuraa Store id..."
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Donasi Rp {customAmount.toLocaleString('id-ID')} (DANA)</span>
              </button>
            </form>
          </div>

        </div>

        {/* RECENT DONORS WALL (Papan Pesan Orang Baik) */}
        {donors.length > 0 && (
          <div className="mt-6 pt-5 border-t border-purple-500/20">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>💖</span>
              <span>Papan Pesan Orang Baik ({donors.length} Dukungan)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
              {donors.map((d) => (
                <div
                  key={d.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-purple-500/20 text-xs space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-purple-300 truncate">{d.name}</span>
                    <span className="font-mono text-emerald-400 font-extrabold">
                      Rp {d.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 italic">
                    "{d.message}"
                  </p>
                  <span className="text-[9px] text-slate-500 block font-mono">
                    {d.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* THANK YOU POPUP CELEBRATION MODAL */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm p-6 rounded-3xl bg-[#0F1426] border-2 border-pink-500/60 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/40 text-3xl flex items-center justify-center mx-auto animate-bounce">
              🎉
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-pink-600/30 text-pink-300 border border-pink-500/40 text-[10px] font-extrabold uppercase tracking-wider">
                SUARA TERIMA KASIH TELAH DIPUTAR 🔊
              </span>
              <h3 className="text-xl font-black text-white mt-2">
                Terima Kasih Orang Baik!
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Terima kasih banyak <strong className="text-purple-400">{showThankYouModal.name}</strong> atas donasi sebesar <strong className="text-emerald-400">Rp {showThankYouModal.amount.toLocaleString('id-ID')}</strong> untuk pembelian domain <strong>yuraastore.id</strong>!
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-slate-700 text-xs text-slate-300 italic">
              "{showThankYouModal.message}"
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={`https://wa.me/${danaNumber}?text=${encodeURIComponent(
                  `Halo Admin Yuraa Store id, saya baru saja memberikan donasi dukungan domain untuk Yuraa Store id:\n\nNama: ${showThankYouModal.name}\nNominal: Rp ${showThankYouModal.amount.toLocaleString('id-ID')}\nPesan: ${showThankYouModal.message}\n\nTerima kasih, semoga lekas kebeli domain .id nya!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Kirim Bukti Donasi DANA ke WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowThankYouModal(null)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Tutup Pesan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
