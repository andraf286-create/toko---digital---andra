import React, { useState } from 'react';
import { X, Copy, Check, Share2, QrCode, ExternalLink, Smartphone, Laptop, Globe, MessageCircle } from 'lucide-react';

interface ShareWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
}

export const ShareWebsiteModal: React.FC<ShareWebsiteModalProps> = ({
  isOpen,
  onClose,
  storeName
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  // Determine current website URL
  const publicUrl = window.location.href.split('#')[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = encodeURIComponent(
    `🔥 Yuk belanja produk digital murah & terpercaya di ${storeName}!\n\n` +
    `Tersedia Viu Drakor, Netflix 4K, Diamond MLBB, Robux, dan Pulsa All Operator 24 Jam.\n` +
    `Buka websitenya di link ini:\n${publicUrl}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0B0F19] dark:bg-[#0B0F19] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 bg-[#0E1322] dark:bg-[#0E1322] light:bg-slate-50">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white dark:text-white light:text-slate-900 leading-none">
                Akses & Bagikan Website
              </h3>
              <span className="text-[10px] text-slate-400">Siap dibuka di semua perangkat HP & PC</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Universal Device Compatibility Badge */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-400 leading-none">
                Link Publik Aktif 24 Jam Anti-404
              </h4>
              <p className="text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-600 mt-0.5">
                Mendukung semua perangkat Android, iPhone, Tablet, & Laptop tanpa hambatan rute.
              </p>
            </div>
          </div>

          {/* Website Link Box */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
              Tautan Resmi Toko:
            </label>
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="flex-1 bg-transparent text-xs text-white dark:text-white light:text-slate-900 font-mono px-2 outline-none select-all truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-md"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin'}</span>
              </button>
            </div>
          </div>

          {/* QR Code Quick Scan for Mobile */}
          <div className="p-4 rounded-2xl bg-[#0E1322] dark:bg-[#0E1322] light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-center space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 block">
              Scan untuk Buka di HP Android / iOS
            </span>

            {/* Clean SVG QR Code Representation */}
            <div className="w-32 h-32 mx-auto bg-white p-2 rounded-2xl shadow-md flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(publicUrl)}`}
                alt="QR Code Website"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <p className="text-[10px] text-slate-400">
              Arahkan kamera HP untuk langsung membuka website toko secara otomatis
            </p>
          </div>

          {/* Share to WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Bagikan ke WhatsApp Teman / Grup</span>
          </a>

          {/* Device guide */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-slate-400 text-[10px]">
            <span className="flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-purple-400" />
              <span>Android & iOS Ready</span>
            </span>
            <span className="flex items-center gap-1">
              <Laptop className="w-3 h-3 text-blue-400" />
              <span>Desktop & PC Ready</span>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
