import React, { useState } from 'react';
import { 
  Product, Order, StoreSettings, Coupon, OrderStatus, 
  AccountCredential, DeletedOrderLog, ArchivedOrder, AdminRole, AdminSession 
} from '../types';
import { storeService } from '../services/storeService';
import { OrderArchive } from './OrderArchive';
import { 
  X, Lock, ShieldCheck, BarChart3, Package, ShoppingCart, Tag, Settings, 
  Trash2, Edit, Plus, Check, Search, RefreshCw, Key, Send, AlertTriangle, ExternalLink,
  History, Undo2, Copy, Sparkles, Eye, EyeOff, Layers, CheckCircle2, UserCheck,
  ArchiveRestore, ShieldAlert
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onRefreshData
}) => {
  if (!isOpen) return null;

  const [isLoggedIn, setIsLoggedIn] = useState(storeService.isAdminLoggedIn());
  const [adminRole, setAdminRole] = useState<AdminRole>(storeService.getAdminRole() || 'owner');
  const [adminSession, setAdminSession] = useState<AdminSession | null>(storeService.getAdminSession());
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Tab: expanded with archive (OrderArchive with strict RBAC)
  const [activeTab, setActiveTab] = useState<'stats' | 'orders' | 'archive' | 'restock' | 'deleted_logs' | 'products' | 'coupons' | 'banner' | 'settings'>('stats');

  // State
  const [products, setProducts] = useState<Product[]>(storeService.getProducts());
  const [orders, setOrders] = useState<Order[]>(storeService.getOrders());
  const [coupons, setCoupons] = useState<Coupon[]>(storeService.getCoupons());
  const [settings, setSettings] = useState<StoreSettings>(storeService.getSettings());
  const [credentials, setCredentials] = useState<AccountCredential[]>(storeService.getCredentials());
  const [archivedOrders, setArchivedOrders] = useState<ArchivedOrder[]>(storeService.getArchivedOrders());

  // Restock Form State
  const [restockProductId, setRestockProductId] = useState<string>(products[0]?.id || '');
  const [restockVariantId, setRestockVariantId] = useState<string>('');
  const [restockEmail, setRestockEmail] = useState('');
  const [restockPassword, setRestockPassword] = useState('');
  const [restockPin, setRestockPin] = useState('');
  const [restockNotes, setRestockNotes] = useState('');
  const [isBulkRestock, setIsBulkRestock] = useState(false);
  const [bulkInputText, setBulkInputText] = useState('');
  const [credFilterProduct, setCredFilterProduct] = useState('all');
  const [credFilterStatus, setCredFilterStatus] = useState<'all' | 'ready' | 'used'>('all');
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});
  const [copiedCredId, setCopiedCredId] = useState<string | null>(null);

  // Product Edit/Create State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // Order status update state
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newOrderStatus, setNewOrderStatus] = useState<OrderStatus>('PENDING');
  const [fulfillmentText, setFulfillmentText] = useState('');
  const [serialNumberText, setSerialNumberText] = useState('');

  const refreshAll = () => {
    setProducts(storeService.getProducts());
    setOrders(storeService.getOrders());
    setCoupons(storeService.getCoupons());
    setSettings(storeService.getSettings());
    setCredentials(storeService.getCredentials());
    setArchivedOrders(storeService.getArchivedOrders());
    setAdminRole(storeService.getAdminRole() || 'owner');
    setAdminSession(storeService.getAdminSession());
    onRefreshData();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = storeService.adminLogin(pinInput);
    if (res.success && res.role) {
      setIsLoggedIn(true);
      setAdminRole(res.role);
      setAdminSession(storeService.getAdminSession());
      setPinError('');
      refreshAll();
    } else {
      setPinError(res.error || 'PIN Admin salah. Default Owner: "yuraa123" | Staff: "staff123"');
    }
  };

  const handleLogout = () => {
    storeService.adminLogout();
    setIsLoggedIn(false);
  };

  // Product Operations
  const handleSaveProduct = (prod: Product) => {
    if (editingProduct) {
      storeService.updateProduct(prod);
    } else {
      storeService.addProduct(prod);
    }
    setEditingProduct(null);
    setIsCreatingProduct(false);
    refreshAll();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini dari katalog?')) {
      storeService.deleteProduct(id);
      refreshAll();
    }
  };

  // Order Operations
  const handleUpdateOrder = () => {
    if (!editingOrder) return;
    storeService.updateOrderStatus(editingOrder.id, newOrderStatus, {
      credentials: fulfillmentText.trim() || undefined,
      serialNumber: serialNumberText.trim() || undefined,
      voucherCode: fulfillmentText.trim() || undefined,
      adminNotes: `Diupdate oleh Admin (${adminRole}) pada ${new Date().toLocaleTimeString('id-ID')}`
    });
    setEditingOrder(null);
    refreshAll();
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminRole !== 'owner') {
      alert('Akses Ditolak (RBAC Violation): Hanya akun Role "owner" yang dapat mengubah konfigurasi toko dan nomor DANA.');
      return;
    }
    storeService.saveSettings(settings);
    alert('Pengaturan toko berhasil disimpan!');
    refreshAll();
  };

  // Stats Calculations
  const totalRevenue = orders
    .filter(o => o.status === 'SUCCESS' || o.status === 'PAID')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'PENDING').length;
  const successOrdersCount = orders.filter(o => o.status === 'SUCCESS').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl h-[90vh] rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl flex flex-col overflow-hidden my-4">
        
        {/* Top Header with RBAC Indicator */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#0E1322]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base text-white">
                  Dashboard Admin
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono">
                  {settings.storeName}
                </span>
                {isLoggedIn && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                    adminRole === 'owner'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  }`}>
                    <span>{adminRole === 'owner' ? '👑 OWNER (SUPER ADMIN)' : '👤 STAFF CS (OPERATOR)'}</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {isLoggedIn && adminRole === 'owner'
                  ? 'Akses Penuh: OrderArchive, Restock Akun, DANA 628984436849, & Manajemen Toko'
                  : 'Akses Terbatas: Kelola Pesanan Aktif & Katalog Produk (OrderArchive Terproteksi)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && adminRole === 'staff' && (
              <button
                onClick={() => {
                  const pin = prompt('Masukkan PIN Owner untuk meningkatkan wewenang (default: yuraa123):', '');
                  if (pin) {
                    const res = storeService.elevateToOwner(pin);
                    if (res.success) {
                      setAdminRole('owner');
                      refreshAll();
                      alert('Hak akses berhasil ditingkatkan ke Role: Owner!');
                    } else {
                      alert(res.error || 'PIN Owner salah.');
                    }
                  }
                }}
                className="px-2.5 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-[11px] text-purple-200 font-bold border border-purple-500/40 flex items-center gap-1"
                title="Tingkatkan wewenang ke Owner"
              >
                <Key className="w-3 h-3 text-purple-300" />
                <span>Jadi Owner</span>
              </button>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-rose-400 font-semibold"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isLoggedIn ? (
          // LOGIN FORM WITH RBAC AWARENESS
          <div className="flex-1 flex items-center justify-center p-6">
            <form onSubmit={handleLogin} className="w-full max-w-sm p-6 sm:p-7 rounded-3xl bg-[#0E1322] border border-slate-800 space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 border border-purple-400/40 text-white flex items-center justify-center mx-auto text-2xl shadow-lg">
                <Lock className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-extrabold text-lg text-white">Login Admin & RBAC</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Masukkan PIN untuk autentikasi Role Admin Yuraa Store id
                </p>
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Masukkan PIN Admin"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-center text-white focus:outline-none focus:border-purple-500 font-mono tracking-widest"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-400 mt-2 font-medium">{pinError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                Masuk ke Dashboard
              </button>

              {/* RBAC Role Guide Box */}
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800/80 text-left text-[11px] space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-purple-300">
                  <span>👑 PIN Owner:</span>
                  <button
                    type="button"
                    onClick={() => setPinInput('yuraa123')}
                    className="font-bold underline hover:text-white"
                  >
                    yuraa123 (Full Access)
                  </button>
                </div>
                <div className="flex items-center justify-between text-blue-300">
                  <span>👤 PIN Staff:</span>
                  <button
                    type="button"
                    onClick={() => setPinInput('staff123')}
                    className="font-bold underline hover:text-white"
                  >
                    staff123 (No Archive)
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          // DASHBOARD TABS & CONTENT
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-800 bg-[#0A0E18] p-3 flex md:flex-col gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'stats' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Statistik Penjualan</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'orders' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Kelola Pesanan ({orders.length})</span>
              </button>

              {/* OrderArchive Tab with Strict RBAC indication */}
              <button
                onClick={() => setActiveTab('archive')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'archive' || activeTab === 'deleted_logs'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {adminRole === 'owner' ? (
                  <ArchiveRestore className="w-4 h-4 text-rose-300" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-400" />
                )}
                <div className="flex items-center gap-1.5">
                  <span>OrderArchive</span>
                  {adminRole === 'owner' ? (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/30 text-rose-200">
                      {archivedOrders.length}
                    </span>
                  ) : (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                      Owner Only
                    </span>
                  )}
                </div>
              </button>

              <button
                onClick={() => setActiveTab('restock')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'restock' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Key className="w-4 h-4 text-purple-400" />
                <div className="flex items-center gap-1.5">
                  <span>Restock Akun & Email</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/30 text-purple-200">
                    {credentials.filter(c => !c.isUsed).length} Ready
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'products' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Katalog Produk ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('coupons')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'coupons' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Kupon Promo ({coupons.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('banner')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'banner' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>PromoBanner Beranda</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Pengaturan Toko & DANA</span>
              </button>
            </div>

            {/* Main Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              
              {/* TAB 1: STATS */}
              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 rounded-2xl bg-[#0E1322] border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Total Omset</span>
                      <p className="text-lg sm:text-xl font-black text-emerald-400 mt-1 font-mono">
                        Rp {totalRevenue.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0E1322] border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Total Transaksi</span>
                      <p className="text-lg sm:text-xl font-black text-white mt-1 font-mono">
                        {orders.length}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0E1322] border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Pesanan Sukses</span>
                      <p className="text-lg sm:text-xl font-black text-blue-400 mt-1 font-mono">
                        {successOrdersCount}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0E1322] border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Menunggu Bayar</span>
                      <p className="text-lg sm:text-xl font-black text-amber-400 mt-1 font-mono">
                        {pendingOrdersCount}
                      </p>
                    </div>
                  </div>

                  {/* Quick Summary of Recent Orders */}
                  <div className="rounded-2xl p-4 bg-[#0E1322] border border-slate-800 space-y-3">
                    <h3 className="font-extrabold text-sm text-white uppercase">Transaksi Terbaru</h3>
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                        <div>
                          <span className="font-mono font-bold text-purple-400">{o.id}</span>
                          <p className="text-white font-medium">{o.items[0]?.productName} ({o.items[0]?.variantName})</p>
                          <p className="text-[10px] text-slate-400">Customer WA: {o.customerWhatsapp}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-white font-mono">Rp {o.total.toLocaleString('id-ID')}</span>
                          <p className="text-[10px] text-blue-400 uppercase font-bold">{o.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: ORDERS MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-sm sm:text-base text-white uppercase">Daftar Transaksi Pesanan</h3>
                    <button
                      onClick={refreshAll}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orders.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-8">Belum ada pesanan masuk.</p>
                    ) : (
                      orders.map(order => {
                        const itm = order.items[0];
                        return (
                          <div key={order.id} className="p-4 rounded-2xl bg-[#0E1322] border border-slate-800 space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-purple-400 text-xs">{order.id}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                  order.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' :
                                  order.status === 'PAID' ? 'bg-blue-500/20 text-blue-400' :
                                  order.status === 'PROCESSING' ? 'bg-purple-500/20 text-purple-400' :
                                  order.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400' :
                                  'bg-rose-500/20 text-rose-400'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <span className="text-xs font-mono font-black text-white">
                                Rp {order.total.toLocaleString('id-ID')}
                              </span>
                            </div>

                            <div className="text-xs text-slate-300">
                              <p><strong className="text-white">{itm?.productName}</strong> - {itm?.variantName}</p>
                              {itm?.customInputs?.userId && (
                                <p className="text-[11px] text-slate-400">ID Game: {itm.customInputs.userId} ({itm.customInputs.zoneId})</p>
                              )}
                              {itm?.customInputs?.phoneNumber && (
                                <p className="text-[11px] text-slate-400">No HP: {itm.customInputs.phoneNumber}</p>
                              )}
                              <p className="text-[11px] text-slate-400">WA: {order.customerWhatsapp} | Metode: {order.payment.methodName}</p>
                            </div>

                            {/* Action update status */}
                            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                              <button
                                onClick={() => {
                                  setEditingOrder(order);
                                  setNewOrderStatus(order.status);
                                  setFulfillmentText(order.fulfillment?.credentials || order.fulfillment?.voucherCode || '');
                                  setSerialNumberText(order.fulfillment?.serialNumber || '');
                                }}
                                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                              >
                                Ubah Status & Kirim Akun/SN
                              </button>

                              <button
                                onClick={() => {
                                  const reason = prompt(
                                    `Pindahkan pesanan ${order.id} ke OrderArchive?\n\nCatatan Keamanan (RBAC): Pesanan tidak dihapus permanen melainkan dipindahkan ke halaman OrderArchive (Soft Delete). Hanya Role "owner" yang dapat melihat dan memulihkan pesanan ini.\n\nMasukkan alasan pemindahan:`,
                                    'Dibatalkan oleh pembeli / Salah input data'
                                  );
                                  if (reason !== null) {
                                    storeService.archiveOrder(order.id, reason, adminRole, adminSession?.user?.name);
                                    refreshAll();
                                    alert(`Pesanan ${order.id} berhasil dipindahkan ke OrderArchive!`);
                                  }
                                }}
                                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                                title="Pindahkan pesanan ke OrderArchive"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* TAB: RESTOCK KREDENSIAL AKUN (OWNER ONLY) */}
              {activeTab === 'restock' && (
                <div className="space-y-6">
                  {/* Header & Stats */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-purple-500/20 text-purple-400 font-bold text-xs">
                          <Key className="w-4 h-4 inline mr-1" />
                          PANEL RESTOCK
                        </span>
                        <h3 className="font-extrabold text-base text-white uppercase">
                          Restock Kredensial Akun Mandiri
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Input akun (Email, Password, PIN/Profil). Sistem otomatis mengalokasikan akun ke pembeli saat status pesanan sukses!
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => setIsBulkRestock(!isBulkRestock)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isBulkRestock
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>{isBulkRestock ? 'Mode Form Satuan' : 'Mode Import Massal'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Stock Counters */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800">
                      <span className="text-[10px] text-emerald-400 uppercase font-bold block">Akun Siap Jual (Ready)</span>
                      <span className="text-xl sm:text-2xl font-black text-white font-mono">
                        {credentials.filter(c => !c.isUsed).length}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Akun Terpakai (Sold)</span>
                      <span className="text-xl sm:text-2xl font-black text-slate-300 font-mono">
                        {credentials.filter(c => c.isUsed).length}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800">
                      <span className="text-[10px] text-purple-400 uppercase font-bold block">Total Database Stok</span>
                      <span className="text-xl sm:text-2xl font-black text-purple-300 font-mono">
                        {credentials.length}
                      </span>
                    </div>
                  </div>

                  {/* Form Restock (Single or Bulk) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1322] border border-purple-900/40 space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      <span>{isBulkRestock ? 'Input Akun Massal (Bulk Restock)' : 'Tambah Akun Baru ke Stok'}</span>
                    </h4>

                    {/* Target Product & Variant Selectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">Pilih Produk:</label>
                        <select
                          value={restockProductId}
                          onChange={(e) => {
                            setRestockProductId(e.target.value);
                            const p = products.find(prod => prod.id === e.target.value);
                            setRestockVariantId(p?.variants[0]?.id || '');
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.category})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">Pilih Varian (Opsional):</label>
                        <select
                          value={restockVariantId}
                          onChange={(e) => setRestockVariantId(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                        >
                          <option value="">Semua Varian / Umum</option>
                          {products.find(p => p.id === restockProductId)?.variants.map(v => (
                            <option key={v.id} value={v.id}>
                              {v.name} (Rp {v.price.toLocaleString('id-ID')})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {!isBulkRestock ? (
                      // Single Form
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-slate-300 block mb-1">
                              Email / Akun Login: <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="misal: netflix.yuraa01@premiumyuraa.id"
                              value={restockEmail}
                              onChange={(e) => setRestockEmail(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-300 block mb-1">
                              Password Akun: <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="misal: YuraaSecure#2026"
                              value={restockPassword}
                              onChange={(e) => setRestockPassword(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-slate-300 block mb-1">
                              Profil / PIN Akun (Opsional):
                            </label>
                            <input
                              type="text"
                              placeholder="misal: Profil 2 / PIN: 8821 atau All Unbind"
                              value={restockPin}
                              onChange={(e) => setRestockPin(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-300 block mb-1">
                              Catatan Garansi / Instruksi:
                            </label>
                            <input
                              type="text"
                              placeholder="misal: Garansi 30 hari. Dilarang ubah pass utama"
                              value={restockNotes}
                              onChange={(e) => setRestockNotes(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (!restockEmail.trim() || !restockPassword.trim()) {
                              alert('Email dan Password akun wajib diisi!');
                              return;
                            }
                            const p = products.find(prod => prod.id === restockProductId);
                            const v = p?.variants.find(vr => vr.id === restockVariantId);
                            storeService.addCredential({
                              productId: restockProductId,
                              productName: p?.name || 'Produk Akun',
                              variantId: restockVariantId || undefined,
                              variantName: v?.name || undefined,
                              email: restockEmail.trim(),
                              password: restockPassword.trim(),
                              profilePin: restockPin.trim() || undefined,
                              extraNotes: restockNotes.trim() || undefined
                            });
                            setRestockEmail('');
                            setRestockPassword('');
                            setRestockPin('');
                            setRestockNotes('');
                            refreshAll();
                            alert('Akun berhasil di-restock ke sistem!');
                          }}
                          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Simpan & Tambah ke Stok Akun</span>
                        </button>
                      </div>
                    ) : (
                      // Bulk Mode
                      <div className="space-y-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-300 block mb-1">
                            Paste Daftar Akun (Format: email:pass:pin:catatan atau email|pass):
                          </label>
                          <textarea
                            rows={4}
                            placeholder={`netflix01@gmail.com|pass123|Profil 1 PIN 1111|Garansi 30 Hari\nnetflix02@gmail.com|pass456|Profil 2 PIN 2222\nviu.user01@mail.id|vipdrakor88`}
                            value={bulkInputText}
                            onChange={(e) => setBulkInputText(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                          />
                        </div>

                        <button
                          onClick={() => {
                            if (!bulkInputText.trim()) {
                              alert('Silakan masukkan daftar akun terlebih dahulu.');
                              return;
                            }
                            const p = products.find(prod => prod.id === restockProductId);
                            const v = p?.variants.find(vr => vr.id === restockVariantId);
                            const added = storeService.bulkAddCredentials(
                              bulkInputText,
                              restockProductId,
                              p?.name || 'Produk Akun',
                              restockVariantId || undefined,
                              v?.name || undefined
                            );
                            setBulkInputText('');
                            setIsBulkRestock(false);
                            refreshAll();
                            alert(`Berhasil restock ${added.length} akun secara massal ke stok!`);
                          }}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                        >
                          <Layers className="w-4 h-4" />
                          <span>Import Semua Akun ke Stok</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Filter & Database Akun */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">
                        Daftar Kredensial Tersimpan
                      </h4>

                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={credFilterProduct}
                          onChange={(e) => setCredFilterProduct(e.target.value)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-white"
                        >
                          <option value="all">Semua Produk</option>
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>

                        <select
                          value={credFilterStatus}
                          onChange={(e) => setCredFilterStatus(e.target.value as any)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-white"
                        >
                          <option value="all">Semua Status</option>
                          <option value="ready">Hanya Siap Jual</option>
                          <option value="used">Sudah Terpakai</option>
                        </select>
                      </div>
                    </div>

                    {/* Credentials List */}
                    <div className="space-y-2.5">
                      {credentials.filter(c => {
                        if (credFilterProduct !== 'all' && c.productId !== credFilterProduct) return false;
                        if (credFilterStatus === 'ready' && c.isUsed) return false;
                        if (credFilterStatus === 'used' && !c.isUsed) return false;
                        return true;
                      }).length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-8 bg-[#0E1322] rounded-2xl border border-slate-800">
                          Tidak ada data akun yang cocok dengan filter.
                        </p>
                      ) : (
                        credentials.filter(c => {
                          if (credFilterProduct !== 'all' && c.productId !== credFilterProduct) return false;
                          if (credFilterStatus === 'ready' && c.isUsed) return false;
                          if (credFilterStatus === 'used' && !c.isUsed) return false;
                          return true;
                        }).map(cred => {
                          const isShowingPass = showPasswordMap[cred.id] || false;
                          return (
                            <div
                              key={cred.id}
                              className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                                cred.isUsed
                                  ? 'bg-slate-900/60 border-slate-800 opacity-75'
                                  : 'bg-[#0E1322] border-slate-800 hover:border-purple-500/40'
                              }`}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-xs text-white">
                                    {cred.productName}
                                  </span>
                                  {cred.variantName && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                                      {cred.variantName}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                    cred.isUsed
                                      ? 'bg-slate-800 text-slate-400 border border-slate-700'
                                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  }`}>
                                    {cred.isUsed ? `TERPAKAI (${cred.usedByOrderId || 'Order'})` : 'SIAP JUAL'}
                                  </span>

                                  <button
                                    onClick={() => {
                                      if (confirm(`Hapus akun ${cred.email} dari stok?`)) {
                                        storeService.deleteCredential(cred.id);
                                        refreshAll();
                                      }
                                    }}
                                    className="text-slate-400 hover:text-rose-400 p-1"
                                    title="Hapus Kredensial"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-black/40 p-2.5 rounded-xl border border-slate-800/80">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-400 text-[11px]">Email:</span>
                                  <span className="text-white truncate font-medium">{cred.email}</span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-400 text-[11px]">Password:</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-purple-300">
                                      {isShowingPass ? cred.password : '••••••••••••'}
                                    </span>
                                    <button
                                      onClick={() => setShowPasswordMap(prev => ({ ...prev, [cred.id]: !isShowingPass }))}
                                      className="text-slate-400 hover:text-white p-0.5"
                                    >
                                      {isShowingPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    </button>
                                  </div>
                                </div>

                                {cred.profilePin && (
                                  <div className="col-span-1 sm:col-span-2 flex items-center justify-between gap-2 pt-1 border-t border-slate-800/50">
                                    <span className="text-slate-400 text-[11px]">Profil/PIN:</span>
                                    <span className="text-amber-300 text-[11px] font-sans font-medium">{cred.profilePin}</span>
                                  </div>
                                )}

                                {cred.extraNotes && (
                                  <div className="col-span-1 sm:col-span-2 flex items-center justify-between gap-2">
                                    <span className="text-slate-400 text-[11px]">Catatan:</span>
                                    <span className="text-slate-300 text-[11px] font-sans truncate">{cred.extraNotes}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                                <span>Ditambahkan: {new Date(cred.addedAt).toLocaleDateString('id-ID')}</span>
                                <button
                                  onClick={() => {
                                    const text = `Email: ${cred.email}\nPassword: ${cred.password}${cred.profilePin ? `\nProfil: ${cred.profilePin}` : ''}${cred.extraNotes ? `\nCatatan: ${cred.extraNotes}` : ''}`;
                                    navigator.clipboard.writeText(text);
                                    setCopiedCredId(cred.id);
                                    setTimeout(() => setCopiedCredId(null), 2000);
                                  }}
                                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                                >
                                  {copiedCredId === cred.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">Tersalin!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Salin Kredensial</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: ORDERARCHIVE (STRICT ROLE-BASED ACCESS CONTROL FOR OWNER) */}
              {(activeTab === 'archive' || activeTab === 'deleted_logs') && (
                <OrderArchive
                  userRole={adminRole}
                  archivedOrders={archivedOrders}
                  onRestoreOrder={(id) => {
                    const restored = storeService.restoreArchivedOrder(id, adminRole);
                    if (restored) {
                      refreshAll();
                      alert('Pesanan berhasil dipulihkan dari OrderArchive ke Pesanan Aktif!');
                    }
                  }}
                  onPermanentlyDelete={(id) => {
                    const deleted = storeService.permanentlyDeleteArchivedOrder(id, adminRole);
                    if (deleted) {
                      refreshAll();
                      alert('Pesanan berhasil dihapus secara permanen dari OrderArchive.');
                    }
                  }}
                  onClearAllArchives={() => {
                    const cleared = storeService.clearAllArchivedOrders(adminRole);
                    if (cleared) {
                      refreshAll();
                      alert('Seluruh OrderArchive berhasil dikosongkan.');
                    }
                  }}
                  onElevateToOwner={(pin) => {
                    const res = storeService.elevateToOwner(pin);
                    if (res.success) {
                      setAdminRole('owner');
                      setAdminSession(storeService.getAdminSession());
                      refreshAll();
                      return true;
                    }
                    return false;
                  }}
                  onRefresh={refreshAll}
                />
              )}

              {/* TAB 3: PRODUCTS MANAGEMENT */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-sm sm:text-base text-white uppercase">Kelola Katalog Produk</h3>
                    <button
                      onClick={() => {
                        storeService.resetProductsToDefault();
                        refreshAll();
                        alert('Katalog di-reset ke produk bawaan resmi!');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold"
                    >
                      Reset ke Default
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.map(prod => (
                      <div key={prod.id} className="p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800 flex gap-3">
                        <img src={prod.imageUrl} alt={prod.name} className="w-14 h-14 object-cover rounded-xl shrink-0" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-white truncate">{prod.name}</h4>
                          <span className="text-[10px] text-purple-400 uppercase font-semibold">{prod.category}</span>
                          <p className="text-xs font-black text-white font-mono mt-1">
                            Mulai Rp {prod.variants[0]?.price.toLocaleString('id-ID')}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] text-slate-400">{prod.variants.length} Varian</span>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="text-slate-500 hover:text-rose-400 ml-auto p-1"
                              title="Hapus Produk"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: COUPONS */}
              {activeTab === 'coupons' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-white uppercase">Kupon Promo & Diskon</h3>
                  <div className="space-y-2.5">
                    {coupons.map((c, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800 flex justify-between items-center text-xs">
                        <div>
                          <span className="font-mono font-black text-amber-400 text-sm">{c.code}</span>
                          <p className="text-slate-300 font-semibold">
                            Diskon {c.discountType === 'percent' ? `${c.value}%` : `Rp ${c.value.toLocaleString('id-ID')}`}
                          </p>
                          <p className="text-[10px] text-slate-400">Min. Belanja: Rp {c.minPurchase.toLocaleString('id-ID')}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${c.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                          {c.isActive ? 'AKTIF' : 'NONAKTIF'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PROMOBANNER CONFIGURATION */}
              {activeTab === 'banner' && (
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-white uppercase">
                        Konfigurasi Komponen PromoBanner
                      </h3>
                      <p className="text-xs text-slate-400">
                        Atur penawaran spesial, kode kupon diskon, dan lokasi tampil di beranda
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        storeService.saveSettings(settings);
                        alert('Konfigurasi PromoBanner berhasil disimpan!');
                        refreshAll();
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase transition-colors shadow-md"
                    >
                      Simpan Banner
                    </button>
                  </div>

                  {/* Config Form */}
                  <div className="p-4 rounded-2xl bg-[#0E1322] border border-slate-800 space-y-3.5 text-xs">
                    {/* Toggle Active */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700">
                      <div>
                        <span className="font-bold text-white text-xs block">Aktifkan PromoBanner di Beranda</span>
                        <span className="text-[11px] text-slate-400">Tampilkan atau sembunyikan banner penawaran spesial</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.promoBanner?.isActive ?? true}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              promoBanner: {
                                ...(settings.promoBanner || {
                                  isActive: true,
                                  title: 'FLASH SALE',
                                  description: 'Diskon hari ini',
                                  position: 'top',
                                  theme: 'purple_neon'
                                }),
                                isActive: e.target.checked
                              }
                            });
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* Judul Promo */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Judul PromoBanner:
                      </label>
                      <input
                        type="text"
                        value={settings.promoBanner?.title || ''}
                        onChange={(e) => {
                          setSettings({
                            ...settings,
                            promoBanner: {
                              ...(settings.promoBanner || { isActive: true, position: 'top', theme: 'purple_neon', description: '' }),
                              title: e.target.value
                            }
                          });
                        }}
                        placeholder="Contoh: ⚡ FLASH SALE BULAN INI: DISKON S.D RP 15.000!"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    {/* Deskripsi Promo */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Deskripsi / Penawaran Spesial:
                      </label>
                      <textarea
                        rows={2}
                        value={settings.promoBanner?.description || ''}
                        onChange={(e) => {
                          setSettings({
                            ...settings,
                            promoBanner: {
                              ...(settings.promoBanner || { isActive: true, position: 'top', theme: 'purple_neon', title: '' }),
                              description: e.target.value
                            }
                          });
                        }}
                        placeholder="Contoh: Beli Viu Drakor, Netflix 4K, Diamond MLBB, dan Robux lebih hemat dengan kode kupon diskon resmi."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Kode Kupon */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          Kode Kupon Diskon (Bisa Disalin Pembeli):
                        </label>
                        <input
                          type="text"
                          value={settings.promoBanner?.couponCode || ''}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              promoBanner: {
                                ...(settings.promoBanner || { isActive: true, position: 'top', theme: 'purple_neon', title: '', description: '' }),
                                couponCode: e.target.value.toUpperCase()
                              }
                            });
                          }}
                          placeholder="Contoh: YURAAHEMAT"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-mono font-bold text-xs uppercase"
                        />
                      </div>

                      {/* Teks Badge */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          Teks Label Badge:
                        </label>
                        <input
                          type="text"
                          value={settings.promoBanner?.badgeText || ''}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              promoBanner: {
                                ...(settings.promoBanner || { isActive: true, position: 'top', theme: 'purple_neon', title: '', description: '' }),
                                badgeText: e.target.value
                              }
                            });
                          }}
                          placeholder="Contoh: PENAWARAN SPESIAL TERBATAS"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Posisi Tampilan */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          Posisi di Beranda:
                        </label>
                        <select
                          value={settings.promoBanner?.position || 'top'}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              promoBanner: {
                                ...(settings.promoBanner || { isActive: true, theme: 'purple_neon', title: '', description: '' }),
                                position: e.target.value as any
                              }
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        >
                          <option value="top">Bagian Atas (Setelah Hero)</option>
                          <option value="middle">Bagian Tengah (Sebelum Cara Order)</option>
                          <option value="both">Keduanya (Atas & Tengah)</option>
                        </select>
                      </div>

                      {/* Tema Warna */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          Tema Desain Warna:
                        </label>
                        <select
                          value={settings.promoBanner?.theme || 'purple_neon'}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              promoBanner: {
                                ...(settings.promoBanner || { isActive: true, position: 'top', title: '', description: '' }),
                                theme: e.target.value as any
                              }
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        >
                          <option value="purple_neon">Ungu Neon (Default Yuraa)</option>
                          <option value="blue_electric">Biru Elektrik Cyber</option>
                          <option value="fire_amber">Api Oranye Amber</option>
                          <option value="emerald_pro">Emerald Hijau Mint</option>
                        </select>
                      </div>

                      {/* Batas Waktu */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          Teks Batas Waktu:
                        </label>
                        <input
                          type="text"
                          value={settings.promoBanner?.validUntil || ''}
                          onChange={(e) => {
                            setSettings({
                              ...settings,
                              promoBanner: {
                                ...(settings.promoBanner || { isActive: true, position: 'top', theme: 'purple_neon', title: '', description: '' }),
                                validUntil: e.target.value
                              }
                            });
                          }}
                          placeholder="Contoh: Berlaku Hari Ini s/d 23:59 WIB"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Teks Tombol Aksi:
                      </label>
                      <input
                        type="text"
                        value={settings.promoBanner?.actionText || ''}
                        onChange={(e) => {
                          setSettings({
                            ...settings,
                            promoBanner: {
                              ...(settings.promoBanner || { isActive: true, position: 'top', theme: 'purple_neon', title: '', description: '' }),
                              actionText: e.target.value
                            }
                          });
                        }}
                        placeholder="Contoh: Klaim Diskon & Belanja"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Live Preview Inside Dashboard */}
                  <div className="p-4 rounded-2xl bg-[#0E1322] border border-slate-800 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase text-purple-400 tracking-wider">
                      Pratinjau Langsung (Live Preview):
                    </span>
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-500/40 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {settings.promoBanner?.badgeText || 'PENAWARAN SPESIAL'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {settings.promoBanner?.validUntil || 'Aktif'}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-white text-sm">
                        {settings.promoBanner?.title || 'Judul Promo Banner'}
                      </h4>
                      <p className="text-slate-300 text-xs mt-1">
                        {settings.promoBanner?.description || 'Deskripsi promo penawaran spesial...'}
                      </p>
                      {settings.promoBanner?.couponCode && (
                        <div className="mt-2 inline-block px-2.5 py-1 rounded-xl bg-black/50 border border-purple-500/40 font-mono font-bold text-amber-300">
                          KODE: {settings.promoBanner.couponCode}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-white uppercase">Pengaturan Toko & DANA</h3>

                  <div className="space-y-3 p-4 rounded-2xl bg-[#0E1322] border border-slate-800 text-xs">
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">Nama Toko:</label>
                      <input
                        type="text"
                        value={settings.storeName}
                        onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Nomor DANA Toko (Untuk Menerima Transfer):
                      </label>
                      <input
                        type="text"
                        value={settings.danaNumber}
                        onChange={(e) => setSettings({ ...settings, danaNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Nomor WhatsApp CS (Untuk Bukti Transfer):
                      </label>
                      <input
                        type="text"
                        value={settings.whatsappNumber}
                        onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        PIN Login Admin:
                      </label>
                      <input
                        type="text"
                        value={settings.adminPin}
                        onChange={(e) => setSettings({ ...settings, adminPin: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1">
                        Teks Banner Promo:
                      </label>
                      <input
                        type="text"
                        value={settings.announcement}
                        onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                  >
                    Simpan Perubahan
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

        {/* ORDER EDIT MODAL */}
        {editingOrder && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md p-5 rounded-3xl bg-[#0D1220] border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm text-white">Update Status {editingOrder.id}</h4>
                <button onClick={() => setEditingOrder(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Pilih Status Baru:</label>
                <select
                  value={newOrderStatus}
                  onChange={(e) => setNewOrderStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  <option value="PENDING">MENUNGGU PEMBAYARAN</option>
                  <option value="PAID">DIBAYAR</option>
                  <option value="PROCESSING">SEDANG DIPROSES</option>
                  <option value="SUCCESS">BERHASIL (SUKSES)</option>
                  <option value="FAILED">GAGAL</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Kredensial Akun / Kode Voucher (Opsional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Email: ... | Pass: ... | Profil: ..."
                  value={fulfillmentText}
                  onChange={(e) => setFulfillmentText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Serial Number (SN Telco / Game Top Up):
                </label>
                <input
                  type="text"
                  placeholder="SN: 2026102600129..."
                  value={serialNumberText}
                  onChange={(e) => setSerialNumberText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setEditingOrder(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleUpdateOrder}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white"
                >
                  Simpan Status
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
