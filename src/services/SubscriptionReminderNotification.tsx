import React, { useEffect, useState } from 'react';
import { AlertTriangle, Clock, ArrowRight, X } from 'lucide-react';
import { storeService } from '../services/storeService';
import { Order } from '../types';

interface SubscriptionReminderNotificationProps {
  onRenewOrder?: (order: Order) => void;
}

export const SubscriptionReminderNotification: React.FC<SubscriptionReminderNotificationProps> = ({
  onRenewOrder
}) => {
  const [expiringOrders, setExpiringOrders] = useState<{ order: Order; daysLeft: number }[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ambil daftar pesanan dari storeService
    const orders = storeService.getOrders();
    const now = new Date();
    const urgent: { order: Order; daysLeft: number }[] = [];

    orders.forEach((ord) => {
      // Periksa pesanan yang statusnya SUCCESS dan punya tanggal kedaluwarsa (expiresAt)
      if (ord.status === 'SUCCESS' && ord.expiresAt) {
        const expiryDate = new Date(ord.expiresAt);
        const diffTime = expiryDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Jika sisa masa aktif 5 hari atau kurang (dan belum lewat dari 0 hari)
        if (diffDays >= 0 && diffDays <= 5) {
          urgent.push({ order: ord, daysLeft: diffDays });
        }
      }
    });

    setExpiringOrders(urgent);
  }, []);

  if (!isVisible || expiringOrders.length === 0) return null;

  const currentNotice = expiringOrders[0];
  const item = currentNotice.order.items[0];

  return (
    <div className="fixed bottom-20 right-4 z-40 max-w-sm w-full animate-bounce-short">
      <div className="p-4 rounded-2xl bg-[#161B2E] dark:bg-[#161B2E] light:bg-amber-50 border-2 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)] text-white dark:text-white light:text-slate-900 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>

          <div className="flex-1 space-y-1 pr-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Peringatan Masa Aktif!</span>
            </div>

            <p className="text-xs font-semibold">
              Langganan <span className="text-purple-400">{item?.productName || 'Akun Premium'}</span> Anda akan habis dalam{' '}
              <span className="text-amber-300 font-extrabold underline">{currentNotice.daysLeft} hari</span> lagi.
            </p>

            <p className="text-[10px] text-slate-400">
              Perpanjang sekarang agar akun Anda tidak dinonaktifkan sistem.
            </p>

            {onRenewOrder && (
              <button
                onClick={() => onRenewOrder(currentNotice.order)}
                className="mt-2 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
              >
                <span>Perpanjang Langganan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
