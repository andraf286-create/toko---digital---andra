import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, MessageSquare, ThumbsUp, Plus, X, Check } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  productBought: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Rian Pratama',
    location: 'Jakarta Selatan',
    productBought: 'Netflix Premium UHD 4K (Private Profile)',
    rating: 5,
    comment: 'Awalnya ragu, pas nyoba transfer DANA ke 628984436849 langsung diproses gak sampe 5 menit kredensial akun udah masuk ke WA. Kualitas 4K jernih banget dan profil pake PIN sendiri!',
    date: 'Kemarin, 21:14 WIB',
    verified: true
  },
  {
    id: 'testi-2',
    name: 'Nabila Syahrini',
    location: 'Bandung',
    productBought: 'Viu Premium VIP Drakor (3 Bulan)',
    rating: 5,
    comment: 'Pecinta drakor wajib beli di sini! Viu nya private resmi tanpa perlu repot pake VPN. Admin ramah dan gercep pas ditanya lewat WhatsApp. Bintang 5 pokoknya! ⭐',
    date: '2 hari lalu',
    verified: true
  },
  {
    id: 'testi-3',
    name: 'Fauzan Fadilah',
    location: 'Surabaya',
    productBought: 'Mobile Legends 706 Diamonds',
    rating: 5,
    comment: 'Top up diamond MLBB cuma butuh User ID & Zone ID, beneran gak minta password. 1 menit langsung masuk diamond nya, bisa langsung gacha skin idaman. Mantap Yuraa Store!',
    date: '3 hari lalu',
    verified: true
  },
  {
    id: 'testi-4',
    name: 'Bagus Wicaksono',
    location: 'Semarang',
    productBought: 'Roblox 800 Robux Fast',
    rating: 5,
    comment: 'Rate Robux paling murah dan aman anti-banned. Panduan dari admin jelas banget. Bakal langganan terus di sini buat top up game.',
    date: '4 hari lalu',
    verified: true
  },
  {
    id: 'testi-5',
    name: 'Dewi Anggraini',
    location: 'Yogyakarta',
    productBought: 'Telkomsel InternetMAX 35 GB',
    rating: 5,
    comment: 'Beli paket data tengah malem tetep masuk kilat. SN terbit langsung, pulsa dan kuota 24 jam bertambah. Praktis banget bayar pake DANA.',
    date: '5 hari lalu',
    verified: true
  },
  {
    id: 'testi-6',
    name: 'Aldo Kurniawan',
    location: 'Medan',
    productBought: 'Akun Mobile Legends (Smurf Mythic)',
    rating: 5,
    comment: 'Akun all unbind beneran aman, dikasih data email pemulihan lengkap. Garansi toko anti hackback bikin tenang belanja akun game.',
    date: '6 hari lalu',
    verified: true
  }
];

const TESTIMONIALS_KEY = 'yuraa_testimonials_v1';

export const CustomerTestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(TESTIMONIALS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_TESTIMONIALS;
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formProduct, setFormProduct] = useState('Viu Premium VIP Drakor');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');

  useEffect(() => {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
  }, [testimonials]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      alert('Silakan isi nama dan ulasan Anda.');
      return;
    }

    const newTesti: Testimonial = {
      id: 'testi-' + Date.now(),
      name: formName.trim(),
      location: formLocation.trim() || 'Indonesia',
      productBought: formProduct,
      rating: formRating,
      comment: formComment.trim(),
      date: 'Baru saja',
      verified: true
    };

    setTestimonials(prev => [newTesti, ...prev]);
    setIsModalOpen(false);
    setFormName('');
    setFormLocation('');
    setFormComment('');
    alert('Terima kasih! Ulasan Anda telah berhasil diterbitkan.');
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
            BUKTI & KEPERCAYAAN
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight mt-0.5 flex items-center gap-2">
            <span>Testimoni Pelanggan Setia</span>
            <span className="text-amber-400">⭐</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1">
            Ribuan pelanggan telah merasakan kecepatan transaksi dan garansi resmi di Yuraa Store id.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tulis Ulasan Anda</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-3xl bg-[#0D1220] dark:bg-[#0D1220] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col justify-between space-y-3.5 hover:border-purple-500/50 transition-all shadow-sm"
          >
            {/* Top Rating & Verified Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>

              {t.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Terverifikasi</span>
                </span>
              )}
            </div>

            {/* Comment */}
            <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed italic">
              "{t.comment}"
            </p>

            {/* Product Tag */}
            <div className="pt-2 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-xs text-white dark:text-white light:text-slate-900 leading-none">
                  {t.name}
                </h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 mt-0.5">
                  {t.location} • <span className="text-purple-400 font-semibold">{t.productBought}</span>
                </p>
              </div>

              <span className="text-[9px] text-slate-500 font-mono">
                {t.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT REVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-[#0B0F19] dark:bg-[#0B0F19] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-extrabold text-sm sm:text-base text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                <span>⭐</span>
                <span>Tulis Ulasan & Pengalaman</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                  Nama Anda:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Andi Pratama"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-700 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                  Kota / Wilayah:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta / Surabaya / Makassar"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-700 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                  Produk Yang Dibeli:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Viu Premium / Netflix 4K / MLBB Diamonds"
                  value={formProduct}
                  onChange={(e) => setFormProduct(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-700 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                  Rating Bintang:
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-400 ml-2">
                    {formRating}.0 / 5.0
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                  Ulasan / Testimoni Anda:
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan pengalaman berbelanja di Yuraa Store id..."
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-700 text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Kirim Ulasan Sekarang
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
