import { Product, Order, Coupon, StoreSettings, OrderStatus, FulfillmentInfo, AccountCredential, DeletedOrderLog, ArchivedOrder, AdminRole, AdminSession } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_SETTINGS } from '../data/initialData';

const PRODUCTS_KEY = 'yuraa_products_v1';
const ORDERS_KEY = 'yuraa_orders_v1';
const COUPONS_KEY = 'yuraa_coupons_v1';
const SETTINGS_KEY = 'yuraa_settings_v1';
const ADMIN_AUTH_KEY = 'yuraa_admin_auth';
const CREDENTIALS_KEY = 'yuraa_credentials_v1';
const DELETED_ORDERS_KEY = 'yuraa_deleted_orders_v1';

const INITIAL_CREDENTIALS: AccountCredential[] = [
  {
    id: 'cred-1',
    productId: 'prod-netflix',
    productName: 'Netflix Premium UHD 4K',
    variantId: 'v-net-1',
    variantName: '1 Bulan Sharing (1 Profil)',
    email: 'yuraa.netf1@premiumyuraa.id',
    password: 'YuraaNetflixPass#882',
    profilePin: 'Profil 2 - PIN: 7719',
    extraNotes: 'Dilarang ubah password utama akun atau email.',
    isUsed: false,
    addedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'cred-2',
    productId: 'prod-viu',
    productName: 'Viu Premium VIP Drakor',
    variantId: 'v-viu-1',
    variantName: '1 Bulan Private No Ads',
    email: 'viu.drakor29@premiumyuraa.id',
    password: 'ViuVipDrakor#2026',
    profilePin: 'Akun Private Mandiri',
    extraNotes: 'Bebas nonton semua episode drakor full HD tanpa iklan.',
    isUsed: false,
    addedAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: 'cred-3',
    productId: 'prod-disney',
    productName: 'Disney+ Hotstar Premium',
    variantId: 'v-dis-1',
    variantName: '1 Bulan Full UHD',
    email: 'disney.yuraa44@premiumyuraa.id',
    password: 'DisneyHotstar#991',
    profilePin: 'Profil 1 - PIN: 1234',
    extraNotes: 'Garansi 30 hari penuh ganti baru jika terkendala.',
    isUsed: false,
    addedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'cred-4',
    productId: 'prod-canva',
    productName: 'Canva Pro Edu / Designer',
    variantId: 'v-can-1',
    variantName: '1 Bulan Private Invite',
    email: 'design.pro2026@premiumyuraa.id',
    password: 'CanvaDesign#Pass2',
    extraNotes: 'Kredensial tim Canva Pro garansi anti drop.',
    isUsed: false,
    addedAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: 'cred-5',
    productId: 'prod-acc-mlbb',
    productName: 'Akun Mobile Legends (Smurf Mythic)',
    variantId: 'v-acc-ml-1',
    variantName: 'Mythic Fresh (WR 70%+, 45 Hero)',
    email: 'mlbb.sultan881@gamemail.id',
    password: 'MoontonMythicSafe#99',
    profilePin: 'Full Monsep (All Unbind)',
    extraNotes: 'Email pemulihan bebas ganti. Garansi anti hackback seumur hidup.',
    isUsed: false,
    addedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

const INITIAL_DELETED_LOGS: ArchivedOrder[] = [
  {
    id: 'arch-1',
    orderId: 'YUR-20261025-1092',
    productName: 'Viu Premium VIP Drakor',
    variantName: '1 Bulan Private No Ads',
    total: 15000,
    customerWhatsapp: '081299887766',
    customerEmail: 'customer.drakor@gmail.com',
    originalOrder: {
      id: 'YUR-20261025-1092',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      items: [{
        productId: 'prod-viu',
        productName: 'Viu Premium VIP Drakor',
        productCategory: 'premium_subs',
        variantId: 'v-viu-1',
        variantName: '1 Bulan Private No Ads',
        price: 15000,
        quantity: 1,
        customInputs: { whatsappNumber: '081299887766' }
      }],
      subtotal: 15000,
      adminFee: 0,
      discount: 0,
      total: 15000,
      customerWhatsapp: '081299887766',
      payment: {
        method: 'dana',
        methodName: 'DANA (628984436849)',
        uniqueCode: 120,
        expiresAt: new Date().toISOString()
      },
      status: 'PENDING'
    },
    archivedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    archivedByRole: 'staff',
    archivedByName: 'Staff CS Operator',
    reason: 'Pembeli salah pilih varian dan membuat order baru'
  }
];

export const storeService = {
  // PRODUCTS
  getProducts(): Product[] {
    try {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  },

  saveProducts(products: Product[]): void {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('yuraa_data_updated'));
  },

  addProduct(product: Product): void {
    const products = this.getProducts();
    products.unshift(product);
    this.saveProducts(products);
  },

  updateProduct(product: Product): void {
    const products = this.getProducts().map(p => p.id === product.id ? product : p);
    this.saveProducts(products);
  },

  deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
  },

  resetProductsToDefault(): void {
    this.saveProducts(INITIAL_PRODUCTS);
  },

  // SETTINGS
  getSettings(): StoreSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(INITIAL_SETTINGS));
    return INITIAL_SETTINGS;
  },

  saveSettings(settings: StoreSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('yuraa_data_updated'));
  },

  // COUPONS
  getCoupons(): Coupon[] {
    try {
      const stored = localStorage.getItem(COUPONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    localStorage.setItem(COUPONS_KEY, JSON.stringify(INITIAL_COUPONS));
    return INITIAL_COUPONS;
  },

  saveCoupons(coupons: Coupon[]): void {
    localStorage.setItem(COUPONS_KEY, JSON.stringify(coupons));
    window.dispatchEvent(new Event('yuraa_data_updated'));
  },

  validateCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
    const cleanCode = code.trim().toUpperCase();
    const coupons = this.getCoupons();
    const coupon = coupons.find(c => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!coupon) {
      return { valid: false, discount: 0, message: 'Kode kupon promo tidak valid atau telah kedaluwarsa' };
    }

    if (subtotal < coupon.minPurchase) {
      return {
        valid: false,
        discount: 0,
        message: `Minimal belanja untuk kupon ini adalah Rp ${coupon.minPurchase.toLocaleString('id-ID')}`
      };
    }

    let discount = 0;
    if (coupon.discountType === 'percent') {
      discount = Math.round((subtotal * coupon.value) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.value;
    }

    return {
      valid: true,
      discount,
      message: `Kupon ${coupon.code} berhasil diterapkan! Hemat Rp ${discount.toLocaleString('id-ID')}`,
      coupon
    };
  },

  // ORDERS
  getOrders(): Order[] {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return [];
  },

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find(o => o.id.toUpperCase() === id.trim().toUpperCase());
  },

  getOrdersByPhone(phone: string): Order[] {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return this.getOrders().filter(o => {
      const oPhone = o.customerWhatsapp.replace(/[^0-9]/g, '');
      return oPhone.includes(cleanPhone) || cleanPhone.includes(oPhone);
    });
  },

  saveOrders(orders: Order[]): void {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event('yuraa_data_updated'));
  },

  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `YUR-${dateStr}-${randomSuffix}`;

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'PENDING'
    };

    const orders = this.getOrders();
    orders.unshift(newOrder);
    this.saveOrders(orders);
    return newOrder;
  },

  updateOrderStatus(orderId: string, status: OrderStatus, fulfillment?: FulfillmentInfo): Order | undefined {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return undefined;

    orders[index].status = status;
    if (fulfillment) {
      orders[index].fulfillment = {
        ...orders[index].fulfillment,
        ...fulfillment,
        processedAt: new Date().toISOString()
      };
    }

    this.saveOrders(orders);
    return orders[index];
  },

  deleteOrder(orderId: string, reason?: string): void {
    this.deleteOrderWithLog(orderId, reason);
  },

  // CREDENTIALS & RESTOCK MANAGEMENT (OWNER ONLY)
  getCredentials(): AccountCredential[] {
    try {
      const stored = localStorage.getItem(CREDENTIALS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(INITIAL_CREDENTIALS));
    return INITIAL_CREDENTIALS;
  },

  saveCredentials(credentials: AccountCredential[]): void {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    window.dispatchEvent(new Event('yuraa_data_updated'));
  },

  addCredential(data: Omit<AccountCredential, 'id' | 'addedAt' | 'isUsed'>): AccountCredential {
    const credentials = this.getCredentials();
    const newCred: AccountCredential = {
      ...data,
      id: 'cred-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      isUsed: false,
      addedAt: new Date().toISOString()
    };
    credentials.unshift(newCred);
    this.saveCredentials(credentials);

    // Sync product stock if applicable
    this.syncProductStockWithCredentials(data.productId, data.variantId);

    return newCred;
  },

  bulkAddCredentials(
    rawInput: string,
    productId: string,
    productName: string,
    variantId?: string,
    variantName?: string
  ): AccountCredential[] {
    const lines = rawInput.split('\n').map(l => l.trim()).filter(Boolean);
    const newCreds: AccountCredential[] = [];

    lines.forEach((line) => {
      // Formats supported: email:pass, email|pass, email pass, or email:pass:pin:notes
      const parts = line.split(/[|;:,]/).map(p => p.trim());
      if (parts.length >= 2) {
        const email = parts[0];
        const password = parts[1];
        const profilePin = parts[2] || undefined;
        const extraNotes = parts.slice(3).join(' ') || undefined;

        newCreds.push({
          id: 'cred-' + Date.now() + '-' + Math.floor(Math.random() * 100000),
          productId,
          productName,
          variantId,
          variantName,
          email,
          password,
          profilePin,
          extraNotes,
          isUsed: false,
          addedAt: new Date().toISOString()
        });
      }
    });

    if (newCreds.length > 0) {
      const current = this.getCredentials();
      const updated = [...newCreds, ...current];
      this.saveCredentials(updated);
      this.syncProductStockWithCredentials(productId, variantId);
    }

    return newCreds;
  },

  updateCredential(updatedCred: AccountCredential): void {
    const creds = this.getCredentials().map(c => c.id === updatedCred.id ? updatedCred : c);
    this.saveCredentials(creds);
  },

  deleteCredential(id: string): void {
    const creds = this.getCredentials().filter(c => c.id !== id);
    this.saveCredentials(creds);
  },

  getAvailableCredential(productId: string, variantId?: string): AccountCredential | undefined {
    const creds = this.getCredentials();
    return creds.find(c => {
      if (c.isUsed) return false;
      if (c.productId !== productId) return false;
      if (variantId && c.variantId && c.variantId !== variantId) return false;
      return true;
    });
  },

  markCredentialUsed(id: string, orderId: string): void {
    const creds = this.getCredentials();
    const index = creds.findIndex(c => c.id === id);
    if (index !== -1) {
      creds[index].isUsed = true;
      creds[index].usedByOrderId = orderId;
      creds[index].usedAt = new Date().toISOString();
      this.saveCredentials(creds);
    }
  },

  syncProductStockWithCredentials(productId: string, variantId?: string): void {
    try {
      const creds = this.getCredentials();
      const availableCount = creds.filter(c => c.productId === productId && (!variantId || c.variantId === variantId) && !c.isUsed).length;
      
      const products = this.getProducts();
      const prodIndex = products.findIndex(p => p.id === productId);
      if (prodIndex !== -1 && availableCount > 0) {
        if (variantId) {
          const vIndex = products[prodIndex].variants.findIndex(v => v.id === variantId);
          if (vIndex !== -1) {
            products[prodIndex].variants[vIndex].stock += 1;
          }
        }
        products[prodIndex].stockLeft = (products[prodIndex].stockLeft || 10) + 1;
        this.saveProducts(products);
      }
    } catch {
      // quiet sync
    }
  },

  // ORDER ARCHIVE (SOFT-DELETE) & STRICT RBAC ACCESS CONTROL
  getArchivedOrders(callerRole?: AdminRole): ArchivedOrder[] {
    const currentRole = callerRole || this.getAdminRole();
    // Strict RBAC: Only 'owner' role can view archived orders
    if (currentRole !== 'owner') {
      return [];
    }

    try {
      const stored = localStorage.getItem(DELETED_ORDERS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    localStorage.setItem(DELETED_ORDERS_KEY, JSON.stringify(INITIAL_DELETED_LOGS));
    return INITIAL_DELETED_LOGS;
  },

  // Backwards compatibility alias
  getDeletedOrders(callerRole?: AdminRole): ArchivedOrder[] {
    return this.getArchivedOrders(callerRole);
  },

  saveArchivedOrders(logs: ArchivedOrder[], callerRole?: AdminRole): boolean {
    const currentRole = callerRole || this.getAdminRole();
    if (currentRole !== 'owner') {
      console.warn('RBAC Violation: only owner can manage or mutate OrderArchive');
      return false;
    }
    localStorage.setItem(DELETED_ORDERS_KEY, JSON.stringify(logs));
    window.dispatchEvent(new Event('yuraa_data_updated'));
    return true;
  },

  saveDeletedOrders(logs: ArchivedOrder[]): void {
    this.saveArchivedOrders(logs, 'owner');
  },

  archiveOrder(orderId: string, reason?: string, callerRole?: AdminRole, callerName?: string): ArchivedOrder | undefined {
    const orders = this.getOrders();
    const orderToArchive = orders.find(o => o.id === orderId);
    if (!orderToArchive) return undefined;

    // Remove from active orders (Soft Delete)
    const remainingOrders = orders.filter(o => o.id !== orderId);
    this.saveOrders(remainingOrders);

    // Prepare archive record
    const role = callerRole || this.getAdminRole() || 'owner';
    const name = callerName || (role === 'owner' ? 'Owner Yuraa Store' : 'Staff CS Operator');
    const item = orderToArchive.items[0];

    const archiveEntry: ArchivedOrder = {
      id: 'arch-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      orderId: orderToArchive.id,
      productName: item?.productName || 'Produk Digital',
      variantName: item?.variantName || '-',
      total: orderToArchive.total,
      customerWhatsapp: orderToArchive.customerWhatsapp,
      customerEmail: orderToArchive.customerEmail,
      originalOrder: orderToArchive,
      archivedAt: new Date().toISOString(),
      archivedByRole: role,
      archivedByName: name,
      reason: reason?.trim() || 'Dipindahkan ke OrderArchive oleh admin'
    };

    let currentArchives: ArchivedOrder[] = [];
    try {
      const stored = localStorage.getItem(DELETED_ORDERS_KEY);
      if (stored) {
        currentArchives = JSON.parse(stored);
      } else {
        currentArchives = [...INITIAL_DELETED_LOGS];
      }
    } catch {
      currentArchives = [...INITIAL_DELETED_LOGS];
    }

    currentArchives.unshift(archiveEntry);
    localStorage.setItem(DELETED_ORDERS_KEY, JSON.stringify(currentArchives));
    window.dispatchEvent(new Event('yuraa_data_updated'));

    return archiveEntry;
  },

  deleteOrderWithLog(orderId: string, reason?: string): ArchivedOrder | undefined {
    return this.archiveOrder(orderId, reason);
  },

  restoreArchivedOrder(archiveId: string, callerRole?: AdminRole): boolean {
    const currentRole = callerRole || this.getAdminRole();
    if (currentRole !== 'owner') {
      alert('Akses Ditolak (RBAC Violation): Hanya akun dengan role "owner" yang dapat memulihkan pesanan dari arsip.');
      return false;
    }

    let archives: ArchivedOrder[] = [];
    try {
      const stored = localStorage.getItem(DELETED_ORDERS_KEY);
      archives = stored ? JSON.parse(stored) : [];
    } catch {
      archives = [];
    }

    const target = archives.find(a => a.id === archiveId);
    if (!target) return false;

    // Restore back to active orders
    const orders = this.getOrders();
    if (!orders.some(o => o.id === target.originalOrder.id)) {
      orders.unshift(target.originalOrder);
      this.saveOrders(orders);
    }

    // Remove from OrderArchive
    const updatedArchives = archives.filter(a => a.id !== archiveId);
    localStorage.setItem(DELETED_ORDERS_KEY, JSON.stringify(updatedArchives));
    window.dispatchEvent(new Event('yuraa_data_updated'));
    return true;
  },

  restoreOrder(archiveId: string): boolean {
    return this.restoreArchivedOrder(archiveId, 'owner');
  },

  permanentlyDeleteArchivedOrder(archiveId: string, callerRole?: AdminRole): boolean {
    const currentRole = callerRole || this.getAdminRole();
    if (currentRole !== 'owner') {
      alert('Akses Ditolak (RBAC Violation): Hanya akun dengan role "owner" yang dapat menghapus arsip secara permanen.');
      return false;
    }

    let archives: ArchivedOrder[] = [];
    try {
      const stored = localStorage.getItem(DELETED_ORDERS_KEY);
      archives = stored ? JSON.parse(stored) : [];
    } catch {
      archives = [];
    }

    const updated = archives.filter(a => a.id !== archiveId);
    localStorage.setItem(DELETED_ORDERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('yuraa_data_updated'));
    return true;
  },

  permanentlyDeleteLog(archiveId: string): void {
    this.permanentlyDeleteArchivedOrder(archiveId, 'owner');
  },

  clearAllArchivedOrders(callerRole?: AdminRole): boolean {
    const currentRole = callerRole || this.getAdminRole();
    if (currentRole !== 'owner') {
      alert('Akses Ditolak (RBAC Violation): Hanya akun dengan role "owner" yang dapat mengosongkan OrderArchive.');
      return false;
    }
    localStorage.setItem(DELETED_ORDERS_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('yuraa_data_updated'));
    return true;
  },

  clearAllDeletedLogs(): void {
    this.clearAllArchivedOrders('owner');
  },

  // PAYMENT SIMULATION / WEBHOOK SIMULATOR
  async simulatePaymentWebhook(orderId: string): Promise<Order | undefined> {
    const order = this.getOrderById(orderId);
    if (!order) return undefined;

    // Step 1: Status becomes PAID
    this.updateOrderStatus(orderId, 'PAID');
    window.dispatchEvent(new CustomEvent('yuraa_order_status_change', { detail: { orderId, status: 'PAID' } }));

    // Short simulated processing delay with digital provider
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 2: Status becomes PROCESSING
    this.updateOrderStatus(orderId, 'PROCESSING');
    window.dispatchEvent(new CustomEvent('yuraa_order_status_change', { detail: { orderId, status: 'PROCESSING' } }));

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 3: Check if store owner has restocked available account credentials
    const item = order.items[0];
    let fulfillment: FulfillmentInfo = {
      processedAt: new Date().toISOString()
    };

    const availableCredential = this.getAvailableCredential(item.productId, item.variantId);
    if (availableCredential && (item.productCategory === 'premium_subs' || item.productCategory === 'games_account')) {
      this.markCredentialUsed(availableCredential.id, orderId);
      fulfillment = {
        credentials: `Email / Akun: ${availableCredential.email}\nPassword: ${availableCredential.password}${
          availableCredential.profilePin ? `\nProfil / PIN: ${availableCredential.profilePin}` : ''
        }${availableCredential.extraNotes ? `\nCatatan Tambahan: ${availableCredential.extraNotes}` : ''}`,
        adminNotes: 'Kredensial resmi dialokasikan otomatis dari Stok Akun Restock Yuraa Store.'
      };
    } else if (item.productCategory === 'topup_game') {
      const snNumber = 'SN-' + Date.now().toString().slice(-8) + Math.floor(1000 + Math.random() * 9000);
      fulfillment = {
        serialNumber: snNumber,
        adminNotes: `Pengisian sukses ke User ID: ${item.customInputs.userId || '-'} (${item.customInputs.zoneId || ''}). Item telah masuk secara otomatis.`
      };
    } else if (item.productCategory === 'pulsa_data') {
      const snNumber = 'SN-TELCO-' + Date.now().toString().slice(-9);
      fulfillment = {
        serialNumber: snNumber,
        adminNotes: `Paket/Pulsa sukses diisi ke nomor ${item.customInputs.phoneNumber}. Kuota/Pulsa aktif.`
      };
    } else if (item.productCategory === 'premium_subs') {
      const emailRandom = `yuraa.cust${Math.floor(100 + Math.random() * 900)}@premiumyuraa.id`;
      fulfillment = {
        credentials: `Email: ${emailRandom}\nPassword: YuraaPass#${Math.floor(1000 + Math.random() * 9000)}\nProfil: Nomor 2 / PIN: 8821\nGaransi Aktif: 30 Hari`,
        adminNotes: 'Silakan gunakan profil yang ditentukan dan jangan mengubah kata sandi utama akun.'
      };
    } else if (item.productCategory === 'gift_card') {
      const code = 'GFT-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' +
                   Math.random().toString(36).substring(2, 6).toUpperCase() + '-' +
                   Math.random().toString(36).substring(2, 6).toUpperCase();
      fulfillment = {
        voucherCode: code,
        adminNotes: 'Redeem kode di menu akun Anda sebelum masa kedaluwarsa 12 bulan.'
      };
    } else {
      // games_account fallback
      fulfillment = {
        credentials: `Akun Login: mlbb.sultan${Math.floor(100 + Math.random() * 900)}@mail.com\nPassword: AkunMoonton2026!\nEmail Pemulihan: Diserahkan Full Access`,
        adminNotes: 'Harap segera kaitkan nomor HP dan ganti kata sandi setelah menerima akun.'
      };
    }

    const updated = this.updateOrderStatus(orderId, 'SUCCESS', fulfillment);
    window.dispatchEvent(new CustomEvent('yuraa_order_status_change', { detail: { orderId, status: 'SUCCESS' } }));
    return updated;
  },

  // ADMIN AUTH & STRICT ROLE-BASED ACCESS CONTROL (RBAC)
  getAdminSession(): AdminSession | null {
    try {
      const stored = sessionStorage.getItem(ADMIN_AUTH_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return null;
  },

  isAdminLoggedIn(): boolean {
    const session = this.getAdminSession();
    return !!session && session.isLoggedIn;
  },

  getAdminRole(): AdminRole | null {
    const session = this.getAdminSession();
    return session ? session.role : null;
  },

  isOwner(): boolean {
    return this.getAdminRole() === 'owner';
  },

  adminLogin(pin: string, requestedRole?: AdminRole): { success: boolean; role?: AdminRole; error?: string } {
    const settings = this.getSettings();
    const cleanPin = pin.trim();
    const ownerPin = (settings.ownerPin || settings.adminPin || 'yuraa123').trim();
    const staffPin = (settings.staffPin || 'staff123').trim();

    if (cleanPin === ownerPin) {
      const session: AdminSession = {
        isLoggedIn: true,
        role: 'owner',
        user: {
          id: 'user-owner',
          role: 'owner',
          username: 'owner',
          name: 'Owner (Super Admin)'
        },
        loggedAt: new Date().toISOString()
      };
      sessionStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(session));
      return { success: true, role: 'owner' };
    }

    if (cleanPin === staffPin) {
      const session: AdminSession = {
        isLoggedIn: true,
        role: 'staff',
        user: {
          id: 'user-staff',
          role: 'staff',
          username: 'staff_operator',
          name: 'Staff CS & Operator'
        },
        loggedAt: new Date().toISOString()
      };
      sessionStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(session));
      return { success: true, role: 'staff' };
    }

    return {
      success: false,
      error: 'PIN yang dimasukkan salah. Gunakan PIN Owner ("yuraa123") atau PIN Staff ("staff123").'
    };
  },

  elevateToOwner(pin: string): { success: boolean; error?: string } {
    const settings = this.getSettings();
    const ownerPin = (settings.ownerPin || settings.adminPin || 'yuraa123').trim();
    if (pin.trim() === ownerPin) {
      const session: AdminSession = {
        isLoggedIn: true,
        role: 'owner',
        user: {
          id: 'user-owner',
          role: 'owner',
          username: 'owner',
          name: 'Owner (Super Admin)'
        },
        loggedAt: new Date().toISOString()
      };
      sessionStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(session));
      window.dispatchEvent(new Event('yuraa_data_updated'));
      return { success: true };
    }
    return { success: false, error: 'PIN Owner salah. Akses ditolak oleh sistem RBAC.' };
  },

  adminLogout(): void {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    window.dispatchEvent(new Event('yuraa_data_updated'));
  }
};
