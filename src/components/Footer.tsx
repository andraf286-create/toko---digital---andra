import React from 'react';
import { ShieldCheck, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
  storeName: string;
  whatsappNumber: string;
  danaNumber: string;
  onOpenAdmin: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  storeName,
  whatsappNumber,
  danaNumber,
  onOpenAdmin,
  onOpenTracking
}) => {
  return (
    <footer className="mt-12 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 bg-[#070A10] dark:bg-[#070A10] light:bg-slate-100 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-500/50 shrink-0">
                <img
                  src="/src/assets/images/mascot_bear_tiger_hero_1792993941291.jpg"
                  alt="Yuraa Store Mascot"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-black text-lg text-white dark:text-white light:text-slate-900 tracking-tight">
                {storeName} <span className="text-amber-400">⚡</span>
              </span>
            </div>

            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed text-xs">
              Pusat penyedia akun premium streaming (Viu Drama, Netflix 4K, Spotify), top up game resmi, akun game terpercaya, serta pulsa dan paket data semua operator di Indonesia dengan proses kilat 24 jam.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Legal & Bergaransi Toko Penuh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-extrabold text-white dark:text-white light:text-slate-900 text-xs uppercase tracking-wider">
              Layanan Pelanggan
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onOpenTracking} className="hover:text-purple-400 transition-colors">
                  Lacak Status Pesanan
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Halo%20Admin%20Yuraa%20Store%20id,%20saya%20ingin%20klaim%20garansi`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors flex items-center gap-1"
                >
                  <span>Klaim Garansi & Bantuan</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-purple-400 transition-colors">
                  Portal Admin & Pengaturan
                </button>
              </li>
            </ul>
          </div>

          {/* Payment & Contact Info */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="font-extrabold text-white dark:text-white light:text-slate-900 text-xs uppercase tracking-wider">
              Pembayaran & Kontak Resmi
            </h4>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
              Transfer Saldo DANA Resmi: <br />
              <strong className="text-blue-400 font-mono text-sm">{danaNumber}</strong> <br />
              <span className="text-[11px] text-slate-500">Atas Nama: Yuraa Store id</span>
            </p>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">
              Customer Support WhatsApp: <br />
              <strong className="text-emerald-400 font-mono">{whatsappNumber}</strong>
            </p>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 {storeName}. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="text-slate-400 text-center sm:text-right">
            Semua produk berlisensi legal. Kami tidak pernah meminta kata sandi akun pribadi pelanggan.
          </p>
        </div>
      </div>
    </footer>
  );
};
