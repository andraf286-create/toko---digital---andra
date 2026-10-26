export type ProductCategory = 
  | 'premium_subs'
  | 'games_account'
  | 'topup_game'
  | 'pulsa_data'
  | 'gift_card';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory?: string;
  brand: string;
  description: string;
  imageUrl: string;
  badge?: string; // e.g. "⭐ TRENDING", "🚀 PROSES ±30 MENIT", "🔥 TERLARIS"
  subBadge?: string; // e.g. "🚀 BAYAR LANGSUNG KIRIM", "⚡ DIPROSES SETELAH ORDER"
  soldCount?: number; // e.g. 7849
  stockLeft?: number; // e.g. 15
  isPopular?: boolean;
  isPromo?: boolean;
  inStock: boolean;
  requiredFields: ('userId' | 'zoneId' | 'server' | 'phoneNumber' | 'email' | 'whatsappNumber')[];
  guideText?: string;
  deliveryType: 'instant' | 'manual_30m' | 'voucher_code';
  variants: ProductVariant[];
}

export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

export interface OrderItem {
  productId: string;
  productName: string;
  productCategory: ProductCategory;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  customInputs: {
    userId?: string;
    zoneId?: string;
    server?: string;
    phoneNumber?: string;
    operator?: string;
    email?: string;
    whatsappNumber?: string;
    note?: string;
  };
}

export interface PaymentDetails {
  method: 'qris' | 'dana' | 'gopay' | 'ovo' | 'shopeepay' | 'bca_va' | 'bri_va' | 'mandiri_va' | 'alfamart' | 'indomaret';
  methodName: string;
  methodLogo?: string;
  qrisString?: string;
  vaNumber?: string;
  payCode?: string;
  uniqueCode: number;
  expiresAt: string;
}

export interface FulfillmentInfo {
  credentials?: string; // e.g. "email:pass | Profile 2 PIN 1234"
  voucherCode?: string;
  serialNumber?: string; // SN for pulsa / top up
  adminNotes?: string;
  processedAt?: string;
}

export interface Order {
  id: string; // e.g. "YUR-20261026-7281"
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  adminFee: number;
  discount: number;
  total: number;
  promoCode?: string;
  customerWhatsapp: string;
  customerEmail?: string;
  payment: PaymentDetails;
  status: OrderStatus;
  fulfillment?: FulfillmentInfo;
}

export interface Coupon {
  code: string;
  discountType: 'percent' | 'fixed';
  value: number; // e.g. 10 for 10%, or 5000 for Rp 5.000
  minPurchase: number;
  maxDiscount?: number;
  validUntil: string;
  isActive: boolean;
}

export interface PromoBannerConfig {
  isActive: boolean;
  title: string;
  description: string;
  couponCode?: string;
  badgeText?: string;
  position: 'top' | 'middle' | 'both';
  theme: 'purple_neon' | 'blue_electric' | 'fire_amber' | 'emerald_pro';
  validUntil?: string;
  actionText?: string;
}

export type AdminRole = 'owner' | 'staff';

export interface AdminUser {
  id: string;
  role: AdminRole;
  username: string;
  name: string;
}

export interface AdminSession {
  isLoggedIn: boolean;
  role: AdminRole;
  user: AdminUser;
  loggedAt: string;
}

export interface ArchivedOrder {
  id: string;
  orderId: string;
  productName: string;
  variantName: string;
  total: number;
  customerWhatsapp: string;
  customerEmail?: string;
  originalOrder: Order;
  archivedAt: string;
  archivedByRole: AdminRole;
  archivedByName: string;
  reason: string;
}

export interface AccountCredential {
  id: string;
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  email: string;
  password: string;
  profilePin?: string;
  extraNotes?: string;
  isUsed: boolean;
  usedByOrderId?: string;
  usedAt?: string;
  addedAt: string;
}

// Keep DeletedOrderLog compatible
export type DeletedOrderLog = ArchivedOrder;

export interface StoreSettings {
  storeName: string;
  brandTagline: string;
  whatsappNumber: string;
  danaNumber: string;
  danaAccountName: string;
  csHours: string;
  announcement: string;
  paymentGatewayMode: 'demo_simulation' | 'tripay_live' | 'midtrans_live';
  providerApiMode: 'simulation' | 'digiflazz' | 'vip_reseller';
  tripayApiKey: string;
  tripayPrivateKey: string;
  tripayMerchantCode: string;
  digiflazzUsername: string;
  digiflazzApiKey: string;
  adminPin: string;
  ownerPin?: string;
  staffPin?: string;
  promoBanner?: PromoBannerConfig;
}
