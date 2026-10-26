import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Bagaimana cara bayar menggunakan DANA?',
    a: 'Cukup transfer saldo DANA ke nomor 628984436849 a/n Yuraa Store id sesuai total pembayaran invoice. Setelah itu, klik tombol "Kirim Bukti Pembayaran ke WhatsApp" untuk konfirmasi langsung ke admin.'
  },
  {
    q: 'Apakah akun Viu Drakor dan Netflix di Yuraa Store bergaransi?',
    a: 'Ya, 100% Full Garansi dari toko selama masa aktif berlangganan! Jika terjadi kendala seperti on-hold atau logout, admin akan membantu ganti akun atau perbaiki dengan cepat tanpa biaya tambahan.'
  },
  {
    q: 'Berapa lama proses top up diamond game dan pulsa?',
    a: 'Untuk Diamond Mobile Legends, Free Fire, Robux, dan Pulsa/Data, proses pengiriman rata-rata 30 detik hingga 3 menit secara otomatis langsung masuk ke akun Anda.'
  },
  {
    q: 'Apakah aman membeli akun game di sini?',
    a: 'Sangat aman! Seluruh akun game (MLBB, FF, Roblox, eFootball) berstatus All Unbind dan diserahkan full akses beserta email pemulihan. Kami memberikan jaminan anti-hackback.'
  },
  {
    q: 'Apakah toko tetap melayani di jam malam?',
    a: 'Sistem order dan verifikasi digital kami aktif 24 jam nonstop. Admin customer service WhatsApp siap membantu kendala Anda setiap hari.'
  }
];

export const FaqSection: React.FC<{ whatsappNumber: string }> = ({ whatsappNumber }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">
            BANTUAN & PANDUAN
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight mt-0.5">
            Pertanyaan Yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <a
          href={`https://wa.me/${whatsappNumber}?text=Halo%20Admin%20Yuraa%20Store%20id,%20saya%20butuh%20bantuan`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 transition-colors w-fit"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat WhatsApp ({whatsappNumber})</span>
        </a>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="rounded-2xl border transition-all bg-[#0D1220] dark:bg-[#0D1220] light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white dark:text-white light:text-slate-900"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
