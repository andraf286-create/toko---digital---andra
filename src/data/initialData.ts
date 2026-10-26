import { Product, Coupon, StoreSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // A. Akun dan Langganan Premium
  {
    id: 'prod-netflix',
    name: 'Netflix Premium UHD 4K',
    category: 'premium_subs',
    brand: 'Netflix',
    description: 'Nonton jutaan film & series box office kualitas Ultra HD 4K, anti on-hold, garansi toko penuh.',
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&auto=format&fit=crop&q=80',
    badge: '⭐ TRENDING',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 7849,
    stockLeft: 15,
    isPopular: true,
    isPromo: true,
    inStock: true,
    requiredFields: ['whatsappNumber', 'email'],
    guideText: 'Masukkan email dan WhatsApp Anda. Detail login akun (email, password, nomor profil, dan PIN) dikirim langsung ke WhatsApp.',
    deliveryType: 'instant',
    variants: [
      { id: 'nf-1p-1m', name: 'Sharing Profile (1 Bulan - 1 Profil 2 User)', price: 28500, originalPrice: 42750, stock: 15 },
      { id: 'nf-pv-1m', name: 'Private Profile (1 Bulan - 1 Profil 1 User Bebas Limit)', price: 42000, originalPrice: 65000, stock: 8 },
      { id: 'nf-full-1m', name: 'Private Account Full (5 Profil Milik Sendiri)', price: 139000, originalPrice: 186000, stock: 5 },
      { id: 'nf-1p-3m', name: 'Sharing Profile (3 Bulan Garansi Penuh)', price: 79000, originalPrice: 120000, stock: 10 }
    ]
  },
  {
    id: 'prod-spotify',
    name: 'Spotify Premium Individual',
    category: 'premium_subs',
    brand: 'Spotify',
    description: 'Streaming musik tanpa jeda iklan, unduh offline kualitas audio tertinggi 320kbps master sound.',
    imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=500&auto=format&fit=crop&q=80',
    badge: '🚀 PROSES ±30 MENIT',
    subBadge: '⚡ DIPROSES SETELAH ORDER',
    soldCount: 4210,
    stockLeft: 25,
    isPopular: true,
    inStock: true,
    requiredFields: ['whatsappNumber', 'email'],
    guideText: 'Bisa perpanjang akun Spotify pribadi atau terima akun baru siap pakai bergaransi.',
    deliveryType: 'instant',
    variants: [
      { id: 'sp-1m', name: 'Spotify Individual (1 Bulan Garansi Penuh)', price: 18500, originalPrice: 38000, stock: 50 },
      { id: 'sp-2m', name: 'Spotify Individual (2 Bulan Hemat)', price: 34000, originalPrice: 65000, stock: 25 },
      { id: 'sp-3m', name: 'Spotify Individual (3 Bulan Anti Drop)', price: 48000, originalPrice: 95000, stock: 30 },
      { id: 'sp-fam-1m', name: 'Spotify Family Invite Link Resmi', price: 12000, originalPrice: 25000, stock: 40 }
    ]
  },
  {
    id: 'prod-disney',
    name: 'Disney+ Hotstar Premium',
    category: 'premium_subs',
    brand: 'Disney+',
    description: 'Streaming film Marvel Studios, Star Wars saga, Pixar, dan serial lokal original dengan kualitas 4K Dolby Atmos.',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop&q=80',
    badge: '⭐ POPULER',
    subBadge: '⚡ DIPROSES SETELAH ORDER',
    soldCount: 3120,
    stockLeft: 18,
    isPopular: true,
    inStock: true,
    requiredFields: ['whatsappNumber', 'phoneNumber'],
    guideText: 'Kirimkan nomor telepon terdaftar Disney+ Anda untuk verifikasi OTP resmi aktivasi paket.',
    deliveryType: 'manual_30m',
    variants: [
      { id: 'dn-basic-1m', name: '1 Bulan Basic Plan (1 Layar Full HD)', price: 27000, originalPrice: 39000, stock: 20 },
      { id: 'dn-prem-1m', name: '1 Bulan Premium Plan 4K (Sharing 1 User)', price: 38000, originalPrice: 65000, stock: 18 },
      { id: 'dn-prem-3m', name: '3 Bulan Premium Plan 4K Sharing', price: 95000, originalPrice: 150000, stock: 12 }
    ]
  },
  {
    id: 'prod-viu',
    name: 'Viu Premium VIP',
    category: 'premium_subs',
    brand: 'Viu',
    description: 'Nonton Drama Korea (Drakor) on-going, anime, dan variety show Asia tanpa iklan dan subtitle bahasa Indonesia.',
    imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500&auto=format&fit=crop&q=80',
    badge: '🚀 PROSES ±15 MENIT',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 1980,
    stockLeft: 30,
    inStock: true,
    requiredFields: ['whatsappNumber', 'email'],
    guideText: 'Akun private atau aktivasi akun Anda sendiri dengan tautan VIP resmi.',
    deliveryType: 'instant',
    variants: [
      { id: 'viu-1m', name: 'Viu VIP 1 Bulan (Private Account)', price: 12000, originalPrice: 25000, stock: 40 },
      { id: 'viu-3m', name: 'Viu VIP 3 Bulan (Private Account)', price: 29000, originalPrice: 55000, stock: 30 },
      { id: 'viu-6m', name: 'Viu VIP 6 Bulan (Private Account)', price: 49000, originalPrice: 90000, stock: 20 }
    ]
  },
  {
    id: 'prod-bstation',
    name: 'Anime Bstation / Bilibili VIP',
    category: 'premium_subs',
    brand: 'Bstation',
    description: 'Akses anime simulcast terbaru kualitas 1080p 60fps & 4K, tonton episode eksklusif sebelum non-VIP tayang.',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80',
    badge: '⭐ ANIME FAVORIT',
    subBadge: '⚡ DIPROSES SETELAH ORDER',
    soldCount: 1640,
    stockLeft: 22,
    inStock: true,
    requiredFields: ['whatsappNumber', 'email'],
    guideText: 'Kode voucher redeem atau akun VIP private langsung login.',
    deliveryType: 'voucher_code',
    variants: [
      { id: 'bili-1m', name: 'Bstation VIP 1 Bulan (Akun Private)', price: 16500, originalPrice: 30000, stock: 35 },
      { id: 'bili-3m', name: 'Bstation VIP 3 Bulan (Akun Private)', price: 42000, originalPrice: 75000, stock: 22 },
      { id: 'bili-1y', name: 'Bstation VIP 1 Tahun (Super Hemat)', price: 145000, originalPrice: 250000, stock: 10 }
    ]
  },
  {
    id: 'prod-canva',
    name: 'Canva Pro Edu & Lifetime Team',
    category: 'premium_subs',
    brand: 'Canva',
    description: 'Desain tanpa batas dengan akses 100+ juta aset grafis, foto premium, Magic Resize, dan Brand Kit lengkap.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=80',
    badge: '⚡ INSTANT INVITE',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 5240,
    stockLeft: 60,
    isPopular: true,
    inStock: true,
    requiredFields: ['email', 'whatsappNumber'],
    guideText: 'Cukup masukkan email akun Canva Anda. Undangan Pro Team resmi langsung terkirim ke kotak masuk email Anda.',
    deliveryType: 'instant',
    variants: [
      { id: 'canva-1m', name: 'Canva Pro 1 Bulan Garansi', price: 9500, originalPrice: 20000, stock: 80 },
      { id: 'canva-1y', name: 'Canva Pro 1 Tahun (Garansi 12 Bulan)', price: 29000, originalPrice: 65000, stock: 60 },
      { id: 'canva-lt', name: 'Canva Pro Lifetime (Akun Team Edu)', price: 45000, originalPrice: 99000, stock: 40 }
    ]
  },

  // B. Game dan Akun Game (DESKRIPSI KHUSUS GAME)
  {
    id: 'prod-acc-mlbb',
    name: 'Akun Mobile Legends: Bang Bang',
    category: 'games_account',
    brand: 'Moonton',
    description: 'Akun MLBB All Unbind, siap push Ranked. Koleksi skin epic/collector langka, emblem max, anti-hackback bergaransi.',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
    badge: '🛡️ ALL UNBIND 100%',
    subBadge: '⚡ DIPROSES SETELAH ORDER',
    soldCount: 890,
    stockLeft: 6,
    isPopular: true,
    inStock: true,
    requiredFields: ['whatsappNumber', 'email'],
    guideText: 'Data login Moonton + Email login akan dikirim langsung ke WhatsApp Anda beserta panduan ganti sandi dan amankan akun.',
    deliveryType: 'manual_30m',
    variants: [
      { id: 'ml-smurf', name: 'Akun Smurf Mythic (Skin 40+, Hero 65+, Emblem Max)', price: 75000, originalPrice: 110000, stock: 4 },
      { id: 'ml-epic-bundle', name: 'Akun Sultan Medium (Skin 120+, 3 Epic Limited, Winrate 60%+)', price: 185000, originalPrice: 275000, stock: 2 },
      { id: 'ml-collector', name: 'Akun Sultan High (Skin 250+, 2 Collector, 5 Lightborn, All Unbind)', price: 450000, originalPrice: 650000, stock: 1 }
    ]
  },
  {
    id: 'prod-acc-ff',
    name: 'Akun Free Fire (FF)',
    category: 'games_account',
    brand: 'Garena',
    description: 'Akun Free Fire Old Season, bundle bandit/artic blue langka, evo gun level tinggi, login Google/VK aman dan full akses.',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=80',
    badge: '🛡️ GARANSI AKUN',
    subBadge: '⚡ DIPROSES SETELAH ORDER',
    soldCount: 650,
    stockLeft: 4,
    inStock: true,
    requiredFields: ['whatsappNumber', 'email'],
    guideText: 'Kredensial dan data pemulihan diserahkan full akses.',
    deliveryType: 'manual_30m',
    variants: [
      { id: 'ff-starter', name: 'Akun FF Old Season 8 (Bundle Rapi, Siap Ranked)', price: 65000, originalPrice: 90000, stock: 3 },
      { id: 'ff-evo-gun', name: 'Akun FF Evo Gun Max (AK Naga / MP40 Cobra Lv Max)', price: 230000, originalPrice: 320000, stock: 1 }
    ]
  },
  {
    id: 'prod-acc-roblox',
    name: 'Akun Roblox Aged / Loaded',
    category: 'games_account',
    brand: 'Roblox Corp',
    description: 'Akun Roblox berumur (Old 2018-2021) belum pernah verifikasi email (Clean), siap pakai dengan avatar accessories langka.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80',
    badge: '🚀 PROSES ±10 MENIT',
    subBadge: '⚡ DIPROSES SETELAH ORDER',
    soldCount: 740,
    stockLeft: 12,
    inStock: true,
    requiredFields: ['whatsappNumber', 'email'],
    guideText: 'Akun belum diverifikasi email atau nomor HP. Anda bisa langsung menautkan email dan mengamankan akun sendiri.',
    deliveryType: 'manual_30m',
    variants: [
      { id: 'rbx-clean-aged', name: 'Akun Roblox Clean Aged 2019+ (Inventory Starter)', price: 35000, originalPrice: 50000, stock: 12 },
      { id: 'rbx-1000-loaded', name: 'Akun Roblox Terisi 1.000 Robux Balance Ready', price: 125000, originalPrice: 170000, stock: 4 }
    ]
  },
  {
    id: 'prod-acc-efootball',
    name: 'Akun eFootball Mobile (PES)',
    category: 'games_account',
    brand: 'Konami',
    description: 'Akun eFootball skuad impian OVR 3150+, bertabur pemain kartu Epic Booster Messi, Neymar, Vieira, dan Gullit.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop&q=80',
    badge: '⚽ KONAMI ID BERSIH',
    subBadge: '⚡ DIPROSES SETELAH ORDER',
    soldCount: 520,
    stockLeft: 5,
    inStock: true,
    requiredFields: ['whatsappNumber', 'email'],
    guideText: 'Detail login Konami ID resmi, data email dapat diganti ke email milik pembeli 100%.',
    deliveryType: 'manual_30m',
    variants: [
      { id: 'ef-epic-3', name: 'Skuad OVR 3150+ (3 Epic Booster + 1000 Koin)', price: 95000, originalPrice: 140000, stock: 4 },
      { id: 'ef-sultan-gullit', name: 'Skuad Sultan OVR 3180+ (Gullit Booster + Vieira + Big Time Messi)', price: 290000, originalPrice: 400000, stock: 1 }
    ]
  },

  // C. Top Up Game
  {
    id: 'prod-topup-mlbb',
    name: 'Mobile Legends: Bang Bang Diamonds',
    category: 'topup_game',
    brand: 'Moonton',
    description: 'Top up Diamond MLBB resmi via User ID & Zone ID, 100% legal dan anti-minus, masuk dalam hitungan detik 24 jam.',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&auto=format&fit=crop&q=80',
    badge: '⚡ INSTANT 1-3 MENIT',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 15420,
    stockLeft: 999,
    isPopular: true,
    isPromo: true,
    inStock: true,
    requiredFields: ['userId', 'zoneId', 'whatsappNumber'],
    guideText: 'Cara Cek ID: Buka profil akun MLBB Anda di pojok kiri atas. Contoh: ID: 12345678, Server / Zone ID: (1234).',
    deliveryType: 'instant',
    variants: [
      { id: 'ml-wdp', name: 'Weekly Diamond Pass (WDP)', price: 27500, originalPrice: 32000, stock: 999 },
      { id: 'ml-86', name: '86 Diamonds (78 + 8 Bonus)', price: 20500, originalPrice: 24000, stock: 999 },
      { id: 'ml-172', name: '172 Diamonds (156 + 16 Bonus)', price: 41000, originalPrice: 48000, stock: 999 },
      { id: 'ml-257', name: '257 Diamonds (234 + 23 Bonus)', price: 61000, originalPrice: 70000, stock: 999 },
      { id: 'ml-706', name: '706 Diamonds (625 + 81 Bonus)', price: 164000, originalPrice: 185000, stock: 999 },
      { id: 'ml-2195', name: '2195 Diamonds (1860 + 335 Bonus)', price: 495000, originalPrice: 560000, stock: 999 }
    ]
  },
  {
    id: 'prod-topup-ff',
    name: 'Free Fire Diamonds',
    category: 'topup_game',
    brand: 'Garena',
    description: 'Top up Diamond Free Fire resmi cepat dan aman hanya butuh User ID FF. Otomatis masuk tanpa login.',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80',
    badge: '⚡ INSTANT 1 MENIT',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 9810,
    stockLeft: 999,
    isPopular: true,
    inStock: true,
    requiredFields: ['userId', 'whatsappNumber'],
    guideText: 'Cara Cek ID FF: Masuk ke profil akun Free Fire Anda, salin nomor User ID (UID) di bawah nama karakter.',
    deliveryType: 'instant',
    variants: [
      { id: 'ff-mem-w', name: 'Membership Mingguan (Weekly)', price: 29000, originalPrice: 35000, stock: 999 },
      { id: 'ff-mem-m', name: 'Membership Bulanan (Monthly)', price: 115000, originalPrice: 135000, stock: 999 },
      { id: 'ff-70', name: '70 Diamonds', price: 9500, originalPrice: 12000, stock: 999 },
      { id: 'ff-140', name: '140 Diamonds', price: 18800, originalPrice: 23000, stock: 999 },
      { id: 'ff-355', name: '355 Diamonds', price: 46500, originalPrice: 55000, stock: 999 },
      { id: 'ff-720', name: '720 Diamonds', price: 92000, originalPrice: 105000, stock: 999 }
    ]
  },
  {
    id: 'prod-topup-roblox',
    name: 'Roblox Robux Resmi',
    category: 'topup_game',
    brand: 'Roblox Corp',
    description: 'Isi saldo Robux resmi dan aman via Gamepass / Group Funds. Rate murah, proses dipandu hingga masuk.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80',
    badge: '⚡ RATE TERMURAH',
    subBadge: '⚡ DIPROSES SETELAH ORDER',
    soldCount: 6310,
    stockLeft: 999,
    inStock: true,
    requiredFields: ['userId', 'whatsappNumber'],
    guideText: 'Masukkan Username Roblox Anda. Pastikan gamepass sudah diset sesuai nominal Robux yang dipilih.',
    deliveryType: 'instant',
    variants: [
      { id: 'rbx-100', name: '100 Robux Fast', price: 14000, originalPrice: 20000, stock: 999 },
      { id: 'rbx-400', name: '400 Robux Fast Delivery', price: 54000, originalPrice: 70000, stock: 999 },
      { id: 'rbx-800', name: '800 Robux Super Hemat', price: 105000, originalPrice: 135000, stock: 999 },
      { id: 'rbx-1700', name: '1.700 Robux Paket Sultan', price: 218000, originalPrice: 275000, stock: 999 }
    ]
  },
  {
    id: 'prod-topup-efootball',
    name: 'eFootball Coins Resmi',
    category: 'topup_game',
    brand: 'Konami',
    description: 'Top up eFootball Coins untuk gacha Epic Booster Player. Proses cepat hanya via Konami ID / Akun login.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop&q=80',
    badge: '🚀 PROSES ±10 MENIT',
    subBadge: '⚡ DIPROSES SETELAH ORDER',
    soldCount: 3820,
    stockLeft: 999,
    inStock: true,
    requiredFields: ['userId', 'whatsappNumber'],
    guideText: 'Masukkan ID Pemilik eFootball Anda (atau Konami Linked ID).',
    deliveryType: 'manual_30m',
    variants: [
      { id: 'ef-coin-130', name: '130 eFootball Coins', price: 17000, originalPrice: 22000, stock: 999 },
      { id: 'ef-coin-550', name: '550 eFootball Coins', price: 72000, originalPrice: 85000, stock: 999 },
      { id: 'ef-coin-1050', name: '1050 eFootball Coins', price: 138000, originalPrice: 160000, stock: 999 },
      { id: 'ef-coin-2130', name: '2130 eFootball Coins', price: 272000, originalPrice: 310000, stock: 999 }
    ]
  },

  // D. Pulsa dan Paket Data
  {
    id: 'prod-telkomsel',
    name: 'Telkomsel Pulsa & Paket Data',
    category: 'pulsa_data',
    brand: 'Telkomsel',
    description: 'Isi ulang pulsa reguler Telkomsel (SimPATI, As, Halo, By.U) dan paket InternetMAX / OMG! tercepat 24 jam.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=80',
    badge: '⚡ SN REALTIME 30 DETIK',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 11200,
    stockLeft: 999,
    isPopular: true,
    inStock: true,
    requiredFields: ['phoneNumber', 'whatsappNumber'],
    guideText: 'Prefix Telkomsel: 0811, 0812, 0813, 0821, 0822, 0823, 0851, 0852, 0853. Pastikan nomor dalam masa aktif.',
    deliveryType: 'instant',
    variants: [
      { id: 'tsel-p10', name: 'Pulsa Reguler 10.000', price: 10850, originalPrice: 12000, stock: 999 },
      { id: 'tsel-p25', name: 'Pulsa Reguler 25.000', price: 25400, originalPrice: 27000, stock: 999 },
      { id: 'tsel-p50', name: 'Pulsa Reguler 50.000', price: 49900, originalPrice: 52000, stock: 999 },
      { id: 'tsel-p100', name: 'Pulsa Reguler 100.000', price: 98500, originalPrice: 102000, stock: 999 },
      { id: 'tsel-d14gb', name: 'InternetMAX 14 GB (30 Hari Full 24 Jam)', price: 44000, originalPrice: 55000, stock: 999 },
      { id: 'tsel-d35gb', name: 'InternetMAX 35 GB (30 Hari Full Kuota Utama)', price: 88000, originalPrice: 105000, stock: 999 }
    ]
  },
  {
    id: 'prod-indosat',
    name: 'Indosat Ooredoo IM3 Pulsa & Data',
    category: 'pulsa_data',
    brand: 'Indosat',
    description: 'Pulsa reguler dan kuota Freedom Internet Indosat IM3 murni 24 jam tanpa pembagian zona waktu.',
    imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&auto=format&fit=crop&q=80',
    badge: '⚡ SN REALTIME 30 DETIK',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 8430,
    stockLeft: 999,
    inStock: true,
    requiredFields: ['phoneNumber', 'whatsappNumber'],
    guideText: 'Prefix Indosat: 0814, 0815, 0816, 0855, 0856, 0857, 0858.',
    deliveryType: 'instant',
    variants: [
      { id: 'isat-p10', name: 'Pulsa Reguler 10.000', price: 10700, originalPrice: 12000, stock: 999 },
      { id: 'isat-p25', name: 'Pulsa Reguler 25.000', price: 25200, originalPrice: 27000, stock: 999 },
      { id: 'isat-p50', name: 'Pulsa Reguler 50.000', price: 49700, originalPrice: 52000, stock: 999 },
      { id: 'isat-p100', name: 'Pulsa Reguler 100.000', price: 98000, originalPrice: 102000, stock: 999 },
      { id: 'isat-d10gb', name: 'Freedom Internet 10 GB (30 Hari)', price: 39000, originalPrice: 50000, stock: 999 },
      { id: 'isat-d25gb', name: 'Freedom Internet 25 GB (30 Hari)', price: 73000, originalPrice: 90000, stock: 999 }
    ]
  },
  {
    id: 'prod-xl',
    name: 'XL Axiata Pulsa & Data',
    category: 'pulsa_data',
    brand: 'XL',
    description: 'Pulsa XL reguler dan paket Xtra Combo Flex dengan bonus kuota YouTube/Tiktok/Games.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=80',
    badge: '⚡ SN REALTIME 30 DETIK',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 6710,
    stockLeft: 999,
    inStock: true,
    requiredFields: ['phoneNumber', 'whatsappNumber'],
    guideText: 'Prefix XL: 0817, 0818, 0819, 0859, 0877, 0878.',
    deliveryType: 'instant',
    variants: [
      { id: 'xl-p10', name: 'Pulsa Reguler 10.000', price: 10750, originalPrice: 12000, stock: 999 },
      { id: 'xl-p25', name: 'Pulsa Reguler 25.000', price: 25250, originalPrice: 27000, stock: 999 },
      { id: 'xl-p50', name: 'Pulsa Reguler 50.000', price: 49800, originalPrice: 52000, stock: 999 },
      { id: 'xl-p100', name: 'Pulsa Reguler 100.000', price: 98200, originalPrice: 102000, stock: 999 },
      { id: 'xl-flex-m', name: 'Xtra Combo Flex M (15 GB + Vidio 30 Hari)', price: 48000, originalPrice: 60000, stock: 999 }
    ]
  },
  {
    id: 'prod-axis',
    name: 'AXIS Pulsa & Paket Data',
    category: 'pulsa_data',
    brand: 'AXIS',
    description: 'Pulsa AXIS dan kuota Bronet 24 Jam kuota hemat anak muda, langsung aktif dalam hitungan detik.',
    imageUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=500&auto=format&fit=crop&q=80',
    badge: '⚡ SN REALTIME 30 DETIK',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 5120,
    stockLeft: 999,
    inStock: true,
    requiredFields: ['phoneNumber', 'whatsappNumber'],
    guideText: 'Prefix AXIS: 0831, 0832, 0833, 0838.',
    deliveryType: 'instant',
    variants: [
      { id: 'ax-p10', name: 'Pulsa Reguler 10.000', price: 10700, originalPrice: 12000, stock: 999 },
      { id: 'ax-p25', name: 'Pulsa Reguler 25.000', price: 25150, originalPrice: 27000, stock: 999 },
      { id: 'ax-p50', name: 'Pulsa Reguler 50.000', price: 49650, originalPrice: 52000, stock: 999 },
      { id: 'ax-bro-12gb', name: 'Bronet 24 Jam 12 GB (30 Hari)', price: 38500, originalPrice: 48000, stock: 999 }
    ]
  },
  {
    id: 'prod-tri',
    name: 'Tri (3) Indonesia Pulsa & Data',
    category: 'pulsa_data',
    brand: 'Tri',
    description: 'Pulsa Tri reguler dan kuota AlwaysOn (AON) masa aktif selamanya mengikuti masa aktif kartu sim.',
    imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&auto=format&fit=crop&q=80',
    badge: '⚡ SN REALTIME 30 DETIK',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 4320,
    stockLeft: 999,
    inStock: true,
    requiredFields: ['phoneNumber', 'whatsappNumber'],
    guideText: 'Prefix Tri: 0895, 0896, 0897, 0898, 0899.',
    deliveryType: 'instant',
    variants: [
      { id: 'tri-p10', name: 'Pulsa Reguler 10.000', price: 10700, originalPrice: 12000, stock: 999 },
      { id: 'tri-p25', name: 'Pulsa Reguler 25.000', price: 25100, originalPrice: 27000, stock: 999 },
      { id: 'tri-p50', name: 'Pulsa Reguler 50.000', price: 49600, originalPrice: 52000, stock: 999 },
      { id: 'tri-aon-16gb', name: 'AON (AlwaysOn) 16 GB Kuota Bebas', price: 47000, originalPrice: 60000, stock: 999 }
    ]
  },
  {
    id: 'prod-smartfren',
    name: 'Smartfren Pulsa & Data',
    category: 'pulsa_data',
    brand: 'Smartfren',
    description: 'Pulsa Smartfren dan Kuota Unlimited Nonstop bebas FUP dengan sinyal 4G/5G stabil.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=80',
    badge: '⚡ SN REALTIME 30 DETIK',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 3890,
    stockLeft: 999,
    inStock: true,
    requiredFields: ['phoneNumber', 'whatsappNumber'],
    guideText: 'Prefix Smartfren: 0881, 0882, 0883, 0884, 0885, 0886, 0887, 0888, 0889.',
    deliveryType: 'instant',
    variants: [
      { id: 'sm-p10', name: 'Pulsa Reguler 10.000', price: 10750, originalPrice: 12000, stock: 999 },
      { id: 'sm-p25', name: 'Pulsa Reguler 25.000', price: 25200, originalPrice: 27000, stock: 999 },
      { id: 'sm-p50', name: 'Pulsa Reguler 50.000', price: 49700, originalPrice: 52000, stock: 999 },
      { id: 'sm-unlimited', name: 'Unlimited Nonstop 12 GB + Akses Unlimited', price: 45000, originalPrice: 55000, stock: 999 }
    ]
  },

  // E. Gift Card
  {
    id: 'prod-gc-roblox',
    name: 'Roblox Digital Gift Card (PIN Code)',
    category: 'gift_card',
    brand: 'Roblox Corp',
    description: 'Kode voucher resmi Roblox untuk ditukarkan ke Robux atau langganan Roblox Premium di roblox.com/redeem.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80',
    badge: '🎁 KODE VOUCHER INSTAN',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 4890,
    stockLeft: 25,
    isPopular: true,
    inStock: true,
    requiredFields: ['whatsappNumber', 'email'],
    guideText: 'Kode PIN digital langsung terbit di halaman invoice dan dikirimkan ke WhatsApp & Email Anda.',
    deliveryType: 'voucher_code',
    variants: [
      { id: 'gc-rbx-10usd', name: 'Roblox Gift Card $10 USD (800 Robux + Bonus)', price: 160000, originalPrice: 180000, stock: 25 },
      { id: 'gc-rbx-25usd', name: 'Roblox Gift Card $25 USD (2.000 Robux)', price: 395000, originalPrice: 440000, stock: 15 },
      { id: 'gc-rbx-100idr', name: 'Roblox Gift Card IDR 100.000 Resmi', price: 104000, originalPrice: 115000, stock: 30 }
    ]
  },
  {
    id: 'prod-gc-googleplay',
    name: 'Google Play Gift Card Indonesia',
    category: 'gift_card',
    brand: 'Google Play',
    description: 'Voucher saldo resmi Google Play IDR untuk beli diamond game, aplikasi, dan langganan di Google Play Store.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=80',
    badge: '🎁 KODE RESMI PLAY STORE',
    subBadge: '🚀 BAYAR LANGSUNG KIRIM',
    soldCount: 3950,
    stockLeft: 40,
    inStock: true,
    requiredFields: ['whatsappNumber', 'email'],
    guideText: 'Kode voucher 16 digit untuk diredeem di aplikasi Play Store > Pembayaran & Langganan > Tukarkan Kode.',
    deliveryType: 'voucher_code',
    variants: [
      { id: 'gp-20k', name: 'Google Play IDR 20.000', price: 21500, originalPrice: 25000, stock: 50 },
      { id: 'gp-50k', name: 'Google Play IDR 50.000', price: 52500, originalPrice: 58000, stock: 40 },
      { id: 'gp-100k', name: 'Google Play IDR 100.000', price: 103000, originalPrice: 112000, stock: 35 }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'YURAAHEMAT',
    discountType: 'fixed',
    value: 5000,
    minPurchase: 25000,
    validUntil: '2026-12-31',
    isActive: true
  },
  {
    code: 'FLASHGAME',
    discountType: 'percent',
    value: 10,
    minPurchase: 20000,
    maxDiscount: 15000,
    validUntil: '2026-12-31',
    isActive: true
  },
  {
    code: 'BARUGABUNG',
    discountType: 'fixed',
    value: 3000,
    minPurchase: 10000,
    validUntil: '2026-12-31',
    isActive: true
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Yuraa Store id',
  brandTagline: 'Semua Kebutuhan Digitalmu, Satu Tempat!',
  whatsappNumber: '628984436849', // user's designated number
  danaNumber: '628984436849', // user's exact designated DANA number
  danaAccountName: 'Yuraa Store id',
  csHours: '08:00 - 24:00 WIB (24 Jam Otomatis Sistem)',
  announcement: '⚡ Promo Berkah: Bayar via DANA nomor 628984436849 langsung diproses! Gunakan kode kupon YURAAHEMAT.',
  paymentGatewayMode: 'demo_simulation',
  providerApiMode: 'simulation',
  tripayApiKey: 'DEV-TRIPAY-API-KEY-DEMO',
  tripayPrivateKey: 'DEV-PRIVATE-KEY-SECRET',
  tripayMerchantCode: 'T128919',
  digiflazzUsername: 'yuraastoreid',
  digiflazzApiKey: 'dev-digiflazz-secret-key',
  adminPin: 'yuraa123',
  ownerPin: 'yuraa123',
  staffPin: 'staff123',
  promoBanner: {
    isActive: true,
    title: '⚡ FLASH SALE BULAN INI: DISKON S.D RP 15.000!',
    description: 'Beli Viu Drakor, Netflix 4K, Diamond MLBB, dan Robux lebih hemat dengan kode kupon diskon resmi.',
    couponCode: 'YURAAHEMAT',
    badgeText: 'PENAWARAN SPESIAL TERBATAS',
    position: 'top',
    theme: 'purple_neon',
    validUntil: 'Berlaku Hari Ini s/d 23:59 WIB',
    actionText: 'Klaim Diskon & Belanja'
  }
};
