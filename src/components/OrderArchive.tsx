import React, { useState } from 'react';
import { ArchivedOrder, AdminRole } from '../types';
import { 
  ShieldAlert, ShieldCheck, Undo2, Trash2, Search, Filter, Download, 
  ExternalLink, Copy, Check, Lock, ChevronDown, ChevronUp, AlertCircle, 
  Sparkles, Layers, RefreshCw, Key
} from 'lucide-react';

interface OrderArchiveProps {
  userRole: AdminRole;
  archivedOrders: ArchivedOrder[];
  onRestoreOrder: (archiveId: string) => void;
  onPermanentlyDelete: (archiveId: string) => void;
  onClearAllArchives: () => void;
  onElevateToOwner: (pin: string) => boolean;
  onRefresh: () => void;
}

export const OrderArchive: React.FC<OrderArchiveProps> = ({
  userRole,
  archivedOrders,
  onRestoreOrder,
  onPermanentlyDelete,
  onClearAllArchives,
  onElevateToOwner,
  onRefresh
}) => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReason, setSelectedReason] = useState<string>('all');
  const [selectedArchivedBy, setSelectedArchivedBy] = useState<string>('all');
  
  // Elevation PIN input for staff attempting to elevate
  const [elevatePin, setElevatePin] = useState('');
  const [elevateError, setElevateError] = useState('');
  const [isElevating, setIsElevating] = useState(false);

  // Expanded items for viewing raw order details
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // STRICT ROLE-BASED ACCESS CONTROL (RBAC) GUARD
  // If user does not possess the 'owner' role, block access completely!
  if (userRole !== 'owner') {
    return (
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0B0E17] border border-rose-500/30 text-center space-y-6 animate-fade-in my-2">
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-950 to-red-900 border border-rose-500/50 flex items-center justify-center shadow-[0_0_35px_-5px_rgba(244,63,94,0.4)]">
          <ShieldAlert className="w-10 h-10 text-rose-400 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-rose-600 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold">
            !
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold tracking-widest uppercase border border-rose-500/30">
            HTTP 403 • RBAC ACCESS FORBIDDEN
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Akses OrderArchive Ditolak
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Halaman <strong className="text-white">OrderArchive</strong> dilindungi oleh sistem <strong className="text-rose-400">Role-Based Access Control (RBAC)</strong> tingkat tinggi. Hanya akun dengan Role <span className="font-mono text-amber-300 font-bold">'owner'</span> yang memiliki wewenang untuk melihat, memulihkan, atau mengelola arsip transaksi yang dihapus.
          </p>
        </div>

        {/* RBAC Diagnostic Box */}
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-black/60 border border-slate-800 text-left space-y-2.5 text-xs font-mono">
          <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-slate-800">
            <span>Role Anda Saat Ini:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold uppercase">
              {userRole} (Staff CS)
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-slate-800">
            <span>Izin Akses Arsip:</span>
            <span className="text-rose-400 font-bold">DENIED (Tidak Diizinkan)</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Role yang Diwajibkan:</span>
            <span className="text-emerald-400 font-bold">owner (Super Admin)</span>
          </div>
        </div>

        {/* Elevate to Owner Section */}
        <div className="max-w-md mx-auto pt-2">
          {!isElevating ? (
            <button
              onClick={() => setIsElevating(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 mx-auto"
            >
              <Key className="w-4 h-4" />
              <span>Otentikasi sebagai Owner</span>
            </button>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (onElevateToOwner(elevatePin)) {
                  setElevateError('');
                  setIsElevating(false);
                } else {
                  setElevateError('PIN Owner salah. Akses ditolak oleh RBAC.');
                }
              }}
              className="p-4 rounded-2xl bg-[#0E1322] border border-purple-500/40 space-y-3"
            >
              <label className="text-[11px] font-bold text-purple-300 block text-left">
                Masukkan PIN Owner untuk Membuka Hak Akses:
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="PIN Owner (default: yuraa123)"
                  value={elevatePin}
                  onChange={(e) => setElevatePin(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase"
                >
                  Buka
                </button>
              </div>
              {elevateError && (
                <p className="text-[11px] text-rose-400 font-semibold text-left">{elevateError}</p>
              )}
            </form>
          )}
        </div>
      </div>
    );
  }

  // OWNER VERIFIED VIEW
  // Filter logic
  const filteredOrders = archivedOrders.filter(order => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = order.orderId.toLowerCase().includes(q);
      const matchProd = order.productName.toLowerCase().includes(q);
      const matchWa = order.customerWhatsapp.includes(q);
      const matchReason = order.reason.toLowerCase().includes(q);
      if (!matchId && !matchProd && !matchWa && !matchReason) return false;
    }

    // Reason filter
    if (selectedReason !== 'all' && !order.reason.toLowerCase().includes(selectedReason.toLowerCase())) {
      return false;
    }

    // Role filter
    if (selectedArchivedBy !== 'all' && order.archivedByRole !== selectedArchivedBy) {
      return false;
    }

    return true;
  });

  const totalArchivedValue = archivedOrders.reduce((sum, ord) => sum + ord.total, 0);
  const archivedByStaffCount = archivedOrders.filter(o => o.archivedByRole === 'staff').length;
  const archivedByOwnerCount = archivedOrders.filter(o => o.archivedByRole === 'owner').length;

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(archivedOrders, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Yuraa_OrderArchive_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* RBAC Owner Verification Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/40 space-y-2 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center gap-1 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RBAC VERIFIED: OWNER ACCESS</span>
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Akses Penuh Arsip & Audit Log
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Refresh Arsip"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleExportJSON}
              disabled={archivedOrders.length === 0}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Ekspor Arsip ke File JSON"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Ekspor JSON</span>
            </button>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
          <span>OrderArchive (Soft-Delete & Audit Transaksi)</span>
          <span className="text-amber-400">👑</span>
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed">
          Pesanan yang dihapus dari transaksi aktif otomatis dipindahkan ke halaman <strong className="text-white">OrderArchive</strong> ini (Soft Delete). Data tetap aman, tidak hilang permanen, dan dapat dipulihkan (<em className="text-emerald-300">Restore</em>) kapan saja.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Arsip</span>
          <span className="text-xl sm:text-2xl font-black text-white font-mono">
            {archivedOrders.length}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800">
          <span className="text-[10px] text-amber-400 uppercase font-bold block">Nilai Terarsip</span>
          <span className="text-lg sm:text-xl font-black text-amber-300 font-mono">
            Rp {totalArchivedValue.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800">
          <span className="text-[10px] text-purple-400 uppercase font-bold block">Diarsipkan Owner</span>
          <span className="text-xl sm:text-2xl font-black text-purple-300 font-mono">
            {archivedByOwnerCount}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800">
          <span className="text-[10px] text-blue-400 uppercase font-bold block">Diarsipkan Staff</span>
          <span className="text-xl sm:text-2xl font-black text-blue-300 font-mono">
            {archivedByStaffCount}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#0E1322] border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari ID Pesanan, WhatsApp, Produk, atau Alasan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Reason filter */}
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          >
            <option value="all">Semua Alasan</option>
            <option value="dibatalkan">Dibatalkan Pembeli</option>
            <option value="salah">Salah Input / Pilihan</option>
            <option value="double">Double Order</option>
            <option value="refund">Refund / Gagal Bayar</option>
          </select>

          {/* Archived by role filter */}
          <select
            value={selectedArchivedBy}
            onChange={(e) => setSelectedArchivedBy(e.target.value)}
            className="px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          >
            <option value="all">Semua Pembuat Arsip</option>
            <option value="owner">Khusus Owner</option>
            <option value="staff">Khusus Staff</option>
          </select>

          {archivedOrders.length > 0 && (
            <button
              onClick={() => {
                const conf = prompt(
                  'PERINGATAN KRITIS: Anda akan mengosongkan seluruh OrderArchive secara permanen.\nKetik "HAPUS" untuk konfirmasi:',
                  ''
                );
                if (conf === 'HAPUS') {
                  onClearAllArchives();
                }
              }}
              className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-bold transition-colors"
            >
              Kosongkan Arsip
            </button>
          )}
        </div>
      </div>

      {/* Archived Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0E1322] border border-slate-800 text-slate-400 space-y-2">
            <Layers className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-white">Tidak Ada Pesanan di OrderArchive</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery || selectedReason !== 'all' || selectedArchivedBy !== 'all'
                ? 'Tidak ada arsip yang cocok dengan kriteria pencarian & filter Anda.'
                : 'Belum ada pesanan yang dihapus/dipindahkan ke arsip. Semua pesanan aktif tersimpan dengan aman.'}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isExpanded = expandedId === order.id;
            const original = order.originalOrder;
            const item = original?.items?.[0];

            return (
              <div
                key={order.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#0E1322] border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                {/* Card Top: Order ID, Reason, Time, Role */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-purple-400">
                      {order.orderId}
                    </span>
                    <button
                      onClick={() => handleCopyId(order.orderId)}
                      className="text-slate-500 hover:text-white p-0.5"
                      title="Salin ID Pesanan"
                    >
                      {copiedId === order.orderId ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Alasan: {order.reason}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      order.archivedByRole === 'owner'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {order.archivedByName} ({order.archivedByRole})
                    </span>

                    <span>{new Date(order.archivedAt).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Card Main: Product Details & Price */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="font-extrabold text-white text-sm">
                      {order.productName}
                    </p>
                    <p className="text-slate-400">
                      Varian: <span className="text-slate-200 font-medium">{order.variantName}</span>
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                      <span>WA: <strong className="text-slate-200">{order.customerWhatsapp}</strong></span>
                      <a
                        href={`https://wa.me/${order.customerWhatsapp}?text=Halo%20kak,%20konfirmasi%20mengenai%20pesanan%20${order.orderId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                      >
                        <span>Chat Pembeli</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="font-mono font-black text-amber-300 text-base">
                      Rp {order.total.toLocaleString('id-ID')}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Metode: {original?.payment?.methodName || 'DANA (628984436849)'}
                    </p>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 uppercase mt-0.5">
                      Status Saat Dihapus: {original?.status || 'PENDING'}
                    </span>
                  </div>
                </div>

                {/* Collapsible Original Details */}
                {isExpanded && (
                  <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-2 text-xs font-mono text-slate-300 animate-fade-in">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      DATA DETAIL TRANSAKSI ASLI:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500">Waktu Order:</span>{' '}
                        <span>{new Date(original.createdAt).toLocaleString('id-ID')}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Kode Unik:</span>{' '}
                        <span className="text-amber-400">{original.payment.uniqueCode}</span>
                      </div>
                      {item?.customInputs?.userId && (
                        <div>
                          <span className="text-slate-500">User ID:</span>{' '}
                          <span>{item.customInputs.userId} ({item.customInputs.zoneId || 'Server'})</span>
                        </div>
                      )}
                      {item?.customInputs?.phoneNumber && (
                        <div>
                          <span className="text-slate-500">Nomor HP:</span>{' '}
                          <span>{item.customInputs.phoneNumber}</span>
                        </div>
                      )}
                      {order.customerEmail && (
                        <div>
                          <span className="text-slate-500">Email:</span>{' '}
                          <span>{order.customerEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Card Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <span>{isExpanded ? 'Tutup Detail' : 'Lihat Detail Lengkap'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRestoreOrder(order.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                      title="Pulihkan pesanan ini ke daftar transaksi aktif"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                      <span>Pulihkan Pesanan (Restore)</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus permanen arsip pesanan ${order.orderId}? Data tidak dapat dikembalikan lagi.`)) {
                          onPermanentlyDelete(order.id);
                        }
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Hapus permanen dari arsip"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
