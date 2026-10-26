import React, { useState } from 'react';
import { X, Search, ShieldCheck, CheckCircle2, Clock, AlertTriangle, RefreshCw, Copy, Check, ArrowRight, PackageCheck, CreditCard, Loader2 } from 'lucide-react';
import { storeService } from '../services/storeService';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrder: (order: Order) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  onSelectOrder
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearched(true);
    const q = query.trim().toUpperCase();

    // Search by ID first
    const byId = storeService.getOrderById(q);
    if (byId) {
      setResults([byId]);
      return;
    }

    // Otherwise search by Phone
    const byPhone = storeService.getOrdersByPhone(query.trim());
    setResults(byPhone);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">MENUNGGU PEMBAYARAN</span>;
      case 'PAID':
        return <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold">DIBAYAR</span>;
      case 'PROCESSING':
        return <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold">DIPROSES</span>;
      case 'SUCCESS':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">BERHASIL</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold">GAGAL</span>;
    }
  };

  // Komponen Visual Progress Bar Status Pesanan
  const renderProgressBar = (status: string) => {
    const steps = [
      { key: 'PENDING', label: 'Menunggu', icon: Clock },
      { key: 'PAID', label: 'Dibayar', icon: CreditCard },
      { key: 'PROCESSING', label: 'Diproses', icon: Loader2 },
      { key: 'SUCCESS', label: 'Selesai', icon: PackageCheck }
    ];

    // Tentukan urutan index status aktif
    const getStepIndex = (st: string) => {
      switch (st) {
        case 'PENDING': return 0;
        case 'PAID': return 1;
        case 'PROCESSING': return 2;
        case 'SUCCESS': return 3;
        default: return 0;
      }
    };

    const currentIndex = getStepIndex(status);

    return (
      <div className="mt-3 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between relative">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            const StepIcon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center relative z-10 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCurrent 
                    ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)] ring-4 ring-blue-500/20 animate-pulse' 
                    : isCompleted 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}>
                  <StepIcon className={`w-3.5 h-3.5 ${isCurrent && step.key === 'PROCESSING' ? 'animate-spin' : ''}`} />
                </div>
                <span className={`text-[10px] mt-1.5 font-medium ${isCurrent ? 'text-blue-400 font-bold' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0B0F19] dark:bg-[#0B0F19] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 bg-[#0E1322] dark:bg-[#0E1322] light:bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <h3 className="font-extrabold text-sm sm:text-base text-white dark:text-white light:text-slate-900">
              Lacak Pesanan Anda
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Form */}
        <div className="p-5 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Masukkan No. Pesanan (YUR-...) atau No. WhatsApp"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-700 text-xs sm:text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Cari</span>
            </button>
          </form>

          {/* Results List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {searched && results.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                Tidak ada pesanan ditemukan dengan kata kunci "{query}". Pastikan nomor pesanan atau nomor WhatsApp sudah benar.
              </div>
            ) : (
              results.map((ord) => {
                const item = ord.items[0];
                return (
                  <div
                    key={ord.id}
                    onClick={() => {
                      onSelectOrder(ord);
                      onClose();
                    }}
                    className="p-4 rounded-2xl bg-[#12182B] dark:bg-[#12182B] light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-blue-500/50 cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-purple-400">
                        {ord.id}
                      </span>
                      {getStatusBadge(ord.status)}
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white dark:text-white light:text-slate-900">
                          {item?.productName}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item?.variantName}
                        </p>
                      </div>
                      <span className="text-xs font-black text-white dark:text-white light:text-slate-900 font-mono">
                        Rp {ord.total.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Visual Progress Bar Status */}
                    {renderProgressBar(ord.status)}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                      <span>{new Date(ord.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      <span className="text-blue-400 group-hover:underline flex items-center gap-1 font-bold">
                        <span>Lihat Invoice</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
