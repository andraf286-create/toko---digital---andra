import React from 'react';
import { ShoppingBag, Smartphone, CreditCard, CheckCircle2 } from 'lucide-react';

export const HowToOrderSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <ShoppingBag className="w-5 h-5 text-blue-400" />,
      title: 'Pilih Produk & Varian',
      desc: 'Pilih layanan yang Anda butuhkan (Viu Drakor, Netflix 4K, Diamond MLBB, Robux, atau Pulsa).'
    },
    {
      num: '02',
      icon: <Smartphone className="w-5 h-5 text-purple-400" />,
      title: 'Isi Data Tujuan & Kontak',
      desc: 'Masukkan User ID Game, nomor HP Pulsa, atau Email & nomor WhatsApp Anda.'
    },
    {
      num: '03',
      icon: <CreditCard className="w-5 h-5 text-amber-400" />,
      title: 'Transfer Saldo DANA',
      desc: 'Kirim pembayaran ke nomor DANA 628984436849 (Yuraa Store id) atau scan QRIS.'
    },
    {
      num: '04',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      title: 'Kirim Bukti & Selesai',
      desc: 'Kirim bukti transfer ke WhatsApp admin, pesanan diproses otomatis dan bergaransi penuh.'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
          MUDAH & AMAN
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight mt-0.5">
          Cara Bertransaksi di Yuraa Store id
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((st, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[#0D1220] dark:bg-[#0D1220] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 relative group hover:border-purple-500/50 transition-all shadow-sm"
          >
            <span className="absolute top-4 right-4 text-2xl font-black text-slate-800 dark:text-slate-800 light:text-slate-200 group-hover:text-purple-500/20 transition-colors font-mono">
              {st.num}
            </span>
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 flex items-center justify-center mb-3">
              {st.icon}
            </div>
            <h3 className="font-bold text-sm text-white dark:text-white light:text-slate-900 mb-1">
              {st.title}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
              {st.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
