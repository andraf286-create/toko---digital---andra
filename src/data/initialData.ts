import { Product, Coupon, StoreSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // ----------------------------------------------------
  // 1. STREAMING & ENTERTAINMENT
  // ----------------------------------------------------
  {
    id: 'netflix-premium',
    title: 'Netflix Premium UHD 4K',
    subtitle: 'Akun Private / Shared Profile 4K UHD Anti-Limit',
    category: 'PREMIUM_SUBS',
    description: 'Nikmati ribuan film dan serial TV dengan kualitas resolusi tertinggi 4K Ultra HD. Bebas iklan, support semua device (Smart TV, HP, Laptop, Tablet). Garansi penuh selama masa aktif.',
    price: 28500,
    originalPrice: 42750,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    stock: 15,
    salesCount: 7849,
    rating: 4.9,
    badge: 'TRENDING',
    processType: 'AUTO',
    variants: [
      { id: 'nf-1m-1u', name: '1 Bulan - 1 Profile (Shared 1 User)', price: 28500, stock: 10, duration: '30 Hari' },
      { id: 'nf-1m-pvt', name: '1 Bulan - Private (Full Account 5 Profile)', price: 135000, stock: 5, duration: '30 Hari' },
      { id: 'nf-3m-1u', name: '3 Bulan - 1 Profile (Shared 1 User)', price: 79000, stock: 8, duration: '90 Hari' },
      { id: 'nf-1y-pvt', name: '1 Tahun - Private Account Garansi Full', price: 950000, stock: 2, duration: '365 Hari' }
    ],
    instructions: [
      'Email & PIN Profile akan dikirimkan otomatis di halaman invoice / WhatsApp.',
      'Gunakan profile sesuai nomor slot yang diberikan.',
      'Dilarang mengubah password, email, atau pengaturan pembayaran akun.'
    ]
  },
  {
    id: 'spotify-premium',
    title: 'Spotify Premium Individual',
    subtitle: 'Mendengarkan Musik Bebas Iklan & Download Offline',
    category: 'PREMIUM_SUBS',
    description: 'Dengarkan lagu favorit tanpa gangguan iklan, bebas skip lagu sepuasnya, kualitas audio tertinggi 320kbps, dan fitur download musik offline.',
    price: 18500,
    originalPrice: 38000,
    image: 'https://images.unsplash.com/photo-1614680376593-902f749f7edc?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    stock: 25,
    salesCount: 4210,
    rating: 4.8,
    badge: 'PROSES ±30 MENIT',
    processType: 'MANUAL',
    variants: [
      { id: 'spot-1m-plan', name: '1 Bulan - Individual Plan (Upgrade Akun Sendiri)', price: 18500, stock: 15, duration: '30 Hari' },
      { id: 'spot-2m-fam', name: '2 Bulan - Family Invite Slot', price: 25000, stock: 10, duration: '60 Hari' },
      { id: 'spot-6m-ind', name: '6 Bulan - Private Premium Individual', price: 98000, stock: 5, duration: '180 Hari' },
      { id: 'spot-1y-ind', name: '1 Tahun - Private Premium Individual', price: 175000, stock: 3, duration: '365 Hari' }
    ],
    instructions: [
      'Kirimkan email & password akun Spotify Kakak di catatan order / admin WhatsApp.',
      'Atau pilih opsi link invite Family jika ingin bergabung via link.',
      'Proses pengerjaan cepat 5 - 30 menit pada jam operasional.'
    ]
  },
  {
    id: 'disney-hotstar',
    title: 'Disney+ Hotstar Premium',
    subtitle: 'Akses Marvel, Disney, Pixar, & Film Indonesia Terbaik',
    category: 'PREMIUM_SUBS',
    description: 'Nonton blockbuster Hollywood, Marvel Studios, Star Wars, Disney+ Originals, serta film-film bioskop Indonesia eksklusif dalam resolusi HD/4K.',
    price: 27000,
    originalPrice: 49000,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
    stock: 20,
    salesCount: 3120,
    rating: 4.9,
    badge: 'POPULER',
    processType: 'MANUAL',
    variants: [
      { id: 'disney-1m', name: '1 Bulan - Premium Solo / Private Number', price: 27000, stock: 12, duration: '30 Hari' },
      { id: 'disney-3m', name: '3 Bulan - Pack Premium Full', price: 75000, stock: 5, duration: '90 Hari' },
      { id: 'disney-1y', name: '1 Tahun - Premium Plan (Semua Device)', price: 260000, stock: 3, duration: '365 Hari' }
    ],
    instructions: [
      'Login menggunakan nomor HP yang terdaftar saat order.',
      'Kode OTP akan dikirimkan oleh Admin via WhatsApp saat proses login.',
      'Mendukung TV, Ponsel, Tablet, dan Laptop.'
    ]
  },
  {
    id: 'viu-premium',
    title: 'Viu Premium VIP',
    subtitle: 'Drama Korea, Anime, & Drama Asia Sub Indo Eksklusif',
    category: 'PREMIUM_SUBS',
    description: 'Streaming Drama Korea terbaru yang tayang bersamaan dengan Korea (Simulcast), Variety Show Asia, dan Film Asia sub Indo tanpa iklan.',
    price: 12000,
    originalPrice: 30000,
    image: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&auto=format&fit=crop&q=80',
    stock: 30,
    salesCount: 5410,
    rating: 4.8,
    badge: 'BAYAR LANGSUNG KIRIM',
    processType: 'AUTO',
    variants: [
      { id: 'viu-1m', name: '1 Bulan - VIP Private Account', price: 12000, stock: 20, duration: '30 Hari' },
      { id: 'viu-6m', name: '6 Bulan - VIP Private Account', price: 35000, stock: 7, duration: '180 Hari' },
      { id: 'viu-1y', name: '1 Tahun - VIP Private Account', price: 60000, stock: 3, duration: '365 Hari' }
    ],
    instructions: [
      'Email & Password akun Viu VIP langsung aktif dan dikirim otomatis.',
      'Bisa dipakai di Android, iOS, maupun Smart TV.'
    ]
  },
  {
    id: 'bstation-premium',
    title: 'Anime Bstation / Bilibili VIP',
    subtitle: 'Nonton Anime HD 1080P/4K Subtitle Indonesia Termurah',
    category: 'PREMIUM_SUBS',
    description: 'Platform streaming anime terbesar. Nikmati kualitas streaming hingga 4K, akses awal episode anime ongoing terbaru, dan sound effect surround sound.',
    price: 16500,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80',
    stock: 18,
    salesCount: 1950,
    rating: 4.9,
    badge: 'ANIME SPECIAL',
    processType: 'AUTO',
    variants: [
      { id: 'bstation-1m', name: '1 Bulan - Premium VIP Slot', price: 16500, stock: 10, duration: '30 Hari' },
      { id: 'bstation-1y', name: '1 Tahun - Premium VIP Private', price: 110000, stock: 8, duration: '365 Hari' }
    ],
    instructions: [
      'Akun VIP siap pakai dikirimkan otomatis beserta petunjuk login.',
      'Dilarang membagikan akun ke pengguna lain.'
    ]
  },
  {
    id: 'canva-pro',
    title: 'Canva Pro Edu & Lifetime Team',
    subtitle: 'Akses Semua Fitur Pro, Template, & Element Tanpa Batas',
    category: 'PREMIUM_SUBS',
    description: 'Buka semua fitur premium Canva seperti Hapus Latar Belakang (Background Remover), Brand Kit, jutaan elemen & foto premium, serta ekspor format SVG/PDF Print.',
    price: 9500,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    stock: 50,
    salesCount: 8930,
    rating: 5.0,
    badge: 'BEST SELLER',
    processType: 'AUTO',
    variants: [
      { id: 'canva-1y', name: 'Canva Pro - Invite Email Akun Sendiri (1 Tahun)', price: 9500, stock: 30, duration: '1 Tahun' },
      { id: 'canva-lt', name: 'Canva Pro - Garansi Lifetime Member', price: 19500, stock: 20, duration: 'Selamanya' }
    ],
    instructions: [
      'Masukkan email Canva Kakak saat memesan.',
      'Undangan tim (Team Invite Link) akan langsung dikirimkan ke email atau WhatsApp Kakak.'
    ]
  },

  // ----------------------------------------------------
  // 2. VOUCHER & TOP UP GAME
  // ----------------------------------------------------
  {
    id: 'mlbb-diamonds',
    title: 'Mobile Legends: Bang Bang',
    subtitle: 'Top Up Diamond MLBB Murah, Cepat, & Legal 100%',
    category: 'VOUCHERS',
    description: 'Top up Diamond Mobile Legends termurah hanya butuh User ID & Zone ID. Bebas ban, aman, dan langsung masuk dalam waktu 1-3 menit.',
    price: 14500,
    originalPrice: 18000,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    stock: 999,
    salesCount: 12450,
    rating: 5.0,
    badge: 'PROSES 1 MENIT',
    processType: 'AUTO',
    variants: [
      { id: 'ml-86', name: '86 Diamonds (77 + 9 Bonus)', price: 19500, stock: 99, duration: 'Instant' },
      { id: 'ml-172', name: '172 Diamonds', price: 38500, stock: 99, duration: 'Instant' },
      { id: 'ml-257', name: '257 Diamonds (234 + 23 Bonus)', price: 57000, stock: 99, duration: 'Instant' },
      { id: 'ml-706', name: '706 Diamonds (625 + 81 Bonus)', price: 155000, stock: 99, duration: 'Instant' },
      { id: 'ml-pass', name: 'Weekly Diamond Pass (WDP)', price: 275000, stock: 99, duration: 'Instant' }
    ],
    instructions: [
      'Masukkan User ID dan Zone ID di kolom catatan/form (Contoh: 12345678 (2109)).',
      'Diamond akan langsung masuk ke mailbox / balance game secara otomatis.'
    ]
  },
  {
    id: 'freefire-diamonds',
    title: 'Free Fire Diamonds',
    subtitle: 'Top Up FF Instant Kirim Cukup ID Player',
    category: 'VOUCHERS',
    description: 'Top up Diamond Free Fire resmi dan legal. Proses sekilat kilat cukup memasukkan Player ID Free Fire Kakak.',
    price: 10000,
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    stock: 999,
    salesCount: 9810,
    rating: 4.9,
    badge: 'KILAT',
    processType: 'AUTO',
    variants: [
      { id: 'ff-100', name: '100 Diamonds', price: 14000, stock: 99, duration: 'Instant' },
      { id: 'ff-355', name: '355 Diamonds', price: 47000, stock: 99, duration: 'Instant' },
      { id: 'ff-720', name: '720 Diamonds', price: 92000, stock: 99, duration: 'Instant' },
      { id: 'ff-membership', name: 'Member Mingguan Free Fire', price: 28000, stock: 99, duration: 'Instant' }
    ],
    instructions: [
      'Masukkan Player ID Free Fire Kakak dengan benar.',
      'Proses otomatis 1-5 menit 24 Jam nonstop.'
    ]
  },
  {
    id: 'roblox-robux',
    title: 'Roblox Robux Instant / Via Gamepass',
    subtitle: 'Robux Legal & Safe 100% Untuk Avatar & Game Items',
    category: 'VOUCHERS',
    description: 'Beli Robux murah aman bebas kontroversi. Tersedia pengiriman instan via gift card / log-in atau via Gamepass Roblox.',
    price: 35000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=1200&auto=format&fit=crop&q=80',
    stock: 50,
    salesCount: 2150,
    rating: 4.9,
    badge: 'POPULER',
    processType: 'MANUAL',
    variants: [
      { id: 'rbx-400', name: '400 Robux Clean', price: 68000, stock: 20, duration: '15-30 Mnt' },
      { id: 'rbx-800', name: '800 Robux Clean', price: 135000, stock: 15, duration: '15-30 Mnt' },
      { id: 'rbx-1000', name: '1.000 Robux Fast', price: 165000, stock: 10, duration: '15-30 Mnt' }
    ],
    instructions: [
      'Sediakan Username Roblox atau link Gamepass saat memesan.',
      'Tim admin kami akan memproses transaksi sesuai petunjuk varian.'
    ]
  },
  {
    id: 'efootball-coins',
    title: 'eFootball Coins (PES Mobile)',
    subtitle: 'Top Up eFootball Coins iOS & Android Fast Process',
    category: 'VOUCHERS',
    description: 'Dapatkan eFootball Coins untuk gacha pemain Legend, Epic, dan Match Pass terbaru di eFootball Mobile.',
    price: 16000,
    originalPrice: 22000,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&auto=format&fit=crop&q=80',
    stock: 40,
    salesCount: 1640,
    rating: 4.8,
    badge: 'PROSES 15 MENIT',
    processType: 'MANUAL',
    variants: [
      { id: 'ef-130', name: '130 eFootball Coins', price: 16000, stock: 20, duration: '15 Mnt' },
      { id: 'ef-550', name: '550 eFootball Coins', price: 65000, stock: 15, duration: '15 Mnt' },
      { id: 'ef-1040', name: '1.040 eFootball Coins', price: 125000, stock: 5, duration: '15 Mnt' }
    ],
    instructions: [
      'Gunakan Konami ID atau login Google Play / Game Center yang terhubung.',
      'Admin akan membantu proses top up secara langsung.'
    ]
  },

  // ----------------------------------------------------
  // 3. UTILITAS & PULSA / E-MONEY / GIFT CARD
  // ----------------------------------------------------
  {
    id: 'pulsa-all-operator',
    title: 'Pulsa All Operator Indonesia',
    subtitle: 'Telkomsel, Indosat, XL, Tri, Smartfren, Axis',
    category: 'SOFTWARE',
    description: 'Isi ulang pulsa reguler semua operator seluler Indonesia. Pengisian cepat otomatis hitungan detik.',
    price: 10500,
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?w=1200&auto=format&fit=crop&q=80',
    stock: 999,
    salesCount: 15400,
    rating: 5.0,
    badge: 'OTOMATIS 24 JAM',
    processType: 'AUTO',
    variants: [
      { id: 'pls-10k', name: 'Pulsa Rp 10.000', price: 10800, stock: 999, duration: 'Detik' },
      { id: 'pls-25k', name: 'Pulsa Rp 25.000', price: 25800, stock: 999, duration: 'Detik' },
      { id: 'pls-50k', name: 'Pulsa Rp 50.000', price: 50500, stock: 999, duration: 'Detik' },
      { id: 'pls-100k', name: 'Pulsa Rp 100.000', price: 99000, stock: 999, duration: 'Detik' }
    ],
    instructions: [
      'Masukkan nomor HP penerima pulsa di kolom catatan/tujuan.',
      'Pastikan nomor HP masih dalam masa aktif.'
    ]
  },
  {
    id: 'google-play-giftcard',
    title: 'Google Play Gift Card IDR',
    subtitle: 'Kode Voucher Resmi Google Play Store Indonesia',
    category: 'VOUCHERS',
    description: 'Kode voucher Google Play resmi rupiah untuk pembelian aplikasi, item game, buku, dan film di Google Play Store.',
    price: 22000,
    originalPrice: 25000,
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
    stock: 45,
    salesCount: 3890,
    rating: 4.9,
    badge: 'KODE INSTAN',
    processType: 'AUTO',
    variants: [
      { id: 'gpgc-20k', name: 'Voucher Google Play Rp 20.000', price: 22000, stock: 20, duration: 'Instant' },
      { id: 'gpgc-50k', name: 'Voucher Google Play Rp 50.000', price: 53500, stock: 15, duration: 'Instant' },
      { id: 'gpgc-100k', name: 'Voucher Google Play Rp 100.000', price: 106000, stock: 10, duration: 'Instant' }
    ],
    instructions: [
      'Kode voucher akan muncul di rincian transaksi setelah pembayaran lunas.',
      'Redeem kode langsung di Google Play Store (Menu Profile > Pembayaran & Langganan > Tukarkan Kode).'
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c1',
    code: 'YURAAHEBAT',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    maxDiscount: 15000,
    minPurchase: 20000,
    usageLimit: 50,
    usedCount: 12,
    expiryDate: '2026-12-31'
  },
  {
    id: 'c2',
    code: 'HEMAT5K',
    discountType: 'FIXED',
    discountValue: 5000,
    minPurchase: 30000,
    usageLimit: 100,
    usedCount: 45,
    expiryDate: '2026-12-31'
  },
  {
    id: 'c3',
    code: 'GAMERSEJATI',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    maxDiscount: 20000,
    minPurchase: 50000,
    usageLimit: 30,
    usedCount: 8,
    expiryDate: '2026-12-31'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Yuraa Store id',
  storeTagline: 'Toko Produk Digital & Top Up Game Terpercaya No.1',
  adminWhatsapp: '628984436849',
  announcementText: '⚡ Promo Spesial 2026: Gunakan kode kupon YURAAHEBAT untuk potongan harga s/d Rp 15.000!',
  danaNumber: '628984436849',
  danaName: 'Yuraa Store Official',
  gopayNumber: '628984436849',
  gopayName: 'Yuraa Store Official',
  ovoNumber: '',
  ovoName: '',
  qrisImageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
  bannerImages: [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1614680376593-902f749f7edc?w=1200&auto=format&fit=crop&q=80'
  ]
};
``eof
