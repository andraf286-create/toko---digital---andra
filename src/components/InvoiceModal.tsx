import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { storeService } from '../services/storeService';
import { X, Copy, Check, QrCode, Clock, Send, ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink, RefreshCw, Upload, Sparkles } from 'lucide-react';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
  danaNumber: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose, danaNumber }) => {
  if (!order) return null;

  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [uploadedReceipt, setUploadedReceipt] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    setCurrentOrder(order);
  }, [order]);

  // Listen for order status updates
  useEffect(() => {
    const handleStatusChange = (e: any) => {
      if (e.detail?.orderId === order.id) {
        const fresh = storeService.getOrderById(order.id);
        if (fresh) setCurrentOrder(fresh);
      }
    };
    window.addEventListener('yuraa_order_status_change', handleStatusChange);
    return () => window.removeEventListener('yuraa_order_status_change', handleStatusChange);
  }, [order.id]);

  // Countdown timer
  useEffect(() => {
    if (currentOrder.status !== 'PENDING') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentOrder.status]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulateWebhook = async () => {
    setIsSimulating(true);
    await storeService.simulatePaymentWebhook(currentOrder.id);
    const fresh = storeService.getOrderById(currentOrder.id);
    if (fresh) setCurrentOrder(fresh);
    setIsSimulating(false);
  };

  const handleCheckStatus = () => {
    const fresh = storeService.getOrderById(currentOrder.id);
    if (fresh) {
      setCurrentOrder(fresh);
      alert(`Status Pesanan saat ini: ${getStatusLabel(fresh.status)}`);
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedReceipt(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>MENUNGGU PEMBAYARAN</span>
          </span>
        );
      case 'PAID':
        return (
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>PEMBAYARAN DITERIMA</span>
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>SEDANG DIPROSES PROVIDER</span>
          </span>
        );
      case 'SUCCESS':
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>TRANSAKSI BERHASIL</span>
          </span>
        );
      case 'FAILED':
        return (
          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>TRANSAKSI GAGAL</span>
          </span>
        );
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return 'Menunggu Pembayaran';
      case 'PAID': return 'Pembayaran Diterima';
      case 'PROCESSING': return 'Sedang Diproses';
      case 'SUCCESS': return 'Berhasil';
      case 'FAILED': return 'Gagal';
    }
  };

  const item = currentOrder.items[0];

  // WhatsApp message for proof confirmation
  const waMessage = encodeURIComponent(
    `Halo Admin Yuraa Store id, saya sudah bayar via DANA untuk pesanan:\n\n` +
    `📌 *No. Pesanan:* ${currentOrder.id}\n` +
    `📦 *Produk:* ${item?.productName || 'Produk Digital'} (${item?.variantName || ''})\n` +
    `💰 *Total Bayar:* Rp ${currentOrder.total.toLocaleString('id-ID')}\n` +
    `📱 *WhatsApp Pembeli:* ${currentOrder.customerWhatsapp}\n` +
    `🏦 *Tujuan DANA:* ${danaNumber} (Yuraa Store id)\n\n` +
    `Berikut saya lampirkan bukti transfer DANA saya. Tolong segera diproses ya Kak! Terima kasih.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0B0F19] dark:bg-[#0B0F19] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 bg-[#0B0F19]/95 dark:bg-[#0B0F19]/95 light:bg-white/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧾</span>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-white dark:text-white light:text-slate-900 leading-none">
                INVOICE PEMBAYARAN
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-mono text-purple-400 font-bold">{currentOrder.id}</span>
                <button
                  onClick={() => handleCopy(currentOrder.id, 'orderId')}
                  className="text-slate-400 hover:text-white"
                  title="Salin Nomor Pesanan"
                >
                  {copiedField === 'orderId' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Status Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#101626] dark:bg-[#101626] light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Status Pesanan:</span>
              <div className="mt-1">{getStatusBadge(currentOrder.status)}</div>
            </div>
            {currentOrder.status === 'PENDING' && (
              <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700">
                <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-xs text-slate-300">Batas Waktu:</span>
                <span className="text-xs font-mono font-bold text-amber-400">{formatTimer(timeLeft)}</span>
              </div>
            )}
          </div>

          {/* FULFILLMENT BOX (If status is SUCCESS, show credentials/SN immediately!) */}
          {currentOrder.status === 'SUCCESS' && currentOrder.fulfillment && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border-2 border-emerald-500/60 shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)] space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>PESANAN SUKSES DIKIRIMKAN!</span>
              </div>

              {currentOrder.fulfillment.credentials && (
                <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/40">
                  <span className="text-[10px] font-bold text-emerald-300 block mb-1 uppercase tracking-wider">
                    Kredensial Akun (Email & Password):
                  </span>
                  <pre className="text-xs font-mono text-white whitespace-pre-wrap select-all font-semibold">
                    {currentOrder.fulfillment.credentials}
                  </pre>
                  <button
                    onClick={() => handleCopy(currentOrder.fulfillment?.credentials || '', 'cred')}
                    className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    {copiedField === 'cred' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'cred' ? 'Berhasil Disalin!' : 'Salin Kredensial Akun'}</span>
                  </button>
                </div>
              )}

              {currentOrder.fulfillment.serialNumber && (
                <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/40">
                  <span className="text-[10px] font-bold text-emerald-300 block mb-1 uppercase tracking-wider">
                    Nomor Serial Transaksi (SN Resmi):
                  </span>
                  <p className="text-xs font-mono text-emerald-400 font-bold select-all">
                    {currentOrder.fulfillment.serialNumber}
                  </p>
                </div>
              )}

              {currentOrder.fulfillment.voucherCode && (
                <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/40">
                  <span className="text-[10px] font-bold text-emerald-300 block mb-1 uppercase tracking-wider">
                    Kode Voucher PIN Digital:
                  </span>
                  <p className="text-sm font-mono text-amber-300 font-extrabold tracking-widest select-all">
                    {currentOrder.fulfillment.voucherCode}
                  </p>
                </div>
              )}

              {currentOrder.fulfillment.adminNotes && (
                <p className="text-xs text-slate-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40">
                  💬 {currentOrder.fulfillment.adminNotes}
                </p>
              )}
            </div>
          )}

          {/* DANA INSTRUCTION BOX (Sesuai request: "transaksi nya dana dulu aja dan kirim bukti pembayaran nya langsung ke dana nomor nya 628984436849") */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 to-slate-900/90 border-2 border-blue-500/50 shadow-[0_0_20px_-3px_rgba(59,130,246,0.3)] space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-black text-xs">
                  DANA
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white dark:text-white light:text-slate-900">
                  Pembayaran Utama via DANA
                </span>
              </div>
              <span className="text-[10px] text-blue-300 font-bold bg-blue-900/40 px-2 py-0.5 rounded-full border border-blue-700/50">
                Resmi & Otomatis
              </span>
            </div>

            {/* DANA Number & Account */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-3">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Nomor DANA Tujuan:</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-lg sm:text-xl font-mono font-black text-blue-400 tracking-wider">
                    {danaNumber}
                  </span>
                  <button
                    onClick={() => handleCopy(danaNumber, 'danaNumber')}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedField === 'danaNumber' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'danaNumber' ? 'Tersalin' : 'Salin Nomor DANA'}</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Atas Nama:</span>
                  <span className="text-xs font-bold text-white">Yuraa Store id</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block text-right">Total Pas:</span>
                  <span className="text-base font-black text-emerald-400">
                    Rp {currentOrder.total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            {/* Send Proof to WhatsApp Button */}
            <div>
              <a
                href={`https://wa.me/${danaNumber}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_-3px_rgba(16,185,129,0.5)] transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Bukti Pembayaran ke WhatsApp ({danaNumber})</span>
              </a>
              <p className="text-[10px] text-center text-slate-400 mt-1.5">
                Kirimkan screenshot struk transfer DANA Anda ke nomor di atas untuk verifikasi instant!
              </p>
            </div>

            {/* In-page Receipt Upload Preview */}
            <div className="pt-2 border-t border-slate-800/80">
              <label className="text-[11px] font-bold text-slate-300 block mb-1.5 flex items-center gap-1">
                <Upload className="w-3 h-3 text-purple-400" />
                <span>Upload Bukti Struk Transfer DANA (Opsional):</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleReceiptUpload}
                className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
              />
              {uploadedReceipt && (
                <div className="mt-2 p-2 rounded-xl bg-black/40 border border-slate-700 flex items-center gap-3">
                  <img src={uploadedReceipt} alt="Bukti Transfer DANA" className="w-12 h-12 object-cover rounded-lg" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-emerald-400">✓ Bukti Transfer Terlampir</p>
                    <p className="text-[10px] text-slate-400">Siap divalidasi oleh sistem/admin</p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* ITEM SUMMARY */}
          <div className="p-4 rounded-2xl bg-[#101626] dark:bg-[#101626] light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Detail Produk Yang Dipesan:
            </span>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs sm:text-sm font-bold text-white dark:text-white light:text-slate-900">
                  {item?.productName}
                </p>
                <p className="text-xs text-purple-400 font-medium">
                  {item?.variantName}
                </p>
                {item?.customInputs?.userId && (
                  <p className="text-[11px] text-slate-300 mt-1">
                    ID Akun: <span className="font-mono font-bold text-white">{item.customInputs.userId}</span> {item.customInputs.zoneId ? `(${item.customInputs.zoneId})` : ''}
                  </p>
                )}
                {item?.customInputs?.phoneNumber && (
                  <p className="text-[11px] text-slate-300 mt-1">
                    No. Tujuan: <span className="font-mono font-bold text-white">{item.customInputs.phoneNumber}</span>
                  </p>
                )}
              </div>
              <span className="text-xs font-extrabold text-white">
                Rp {currentOrder.subtotal.toLocaleString('id-ID')}
              </span>
            </div>

            {currentOrder.discount > 0 && (
              <div className="flex justify-between text-xs text-emerald-400 pt-2 border-t border-slate-800">
                <span>Diskon Kupon ({currentOrder.promoCode}):</span>
                <span>- Rp {currentOrder.discount.toLocaleString('id-ID')}</span>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS: SIMULASI / REFRESH */}
          <div className="space-y-2 pt-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleCheckStatus}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                <span>Cek Status Pembayaran</span>
              </button>

              {currentOrder.status !== 'SUCCESS' && (
                <button
                  onClick={handleSimulateWebhook}
                  disabled={isSimulating}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md disabled:opacity-50"
                  title="Simulasi proses pembayaran otomatis (Testing/Sandbox)"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>{isSimulating ? 'Sedang Memproses...' : 'Simulasi Pembayaran Otomatis'}</span>
                </button>
              )}
            </div>
            
            <p className="text-[10px] text-center text-slate-400">
              Sistem Yuraa Store id memproses pesanan 24 jam nonstop setelah verifikasi transfer DANA.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
