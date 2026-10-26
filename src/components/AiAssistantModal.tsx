import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, CornerDownLeft, RefreshCw, Zap, MessageCircle } from 'lucide-react';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  danaNumber: string;
}

const QUICK_PROMPTS = [
  'Bagaimana cara bayar via DANA?',
  'Apa beda Netflix Sharing vs Private?',
  'Rekomendasi paket Viu Drama Korea',
  'Cara cek User ID & Zone ID MLBB?',
  'Ada kupon promo aktif apa saja?'
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  danaNumber
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Halo Kak! 👋 Saya Asisten AI Yuraa Store id (didukung maskot Beruang x Harimau ⚡).\n\nAda yang bisa saya bantu seputar paket Viu Drakor, Netflix 4K, Top Up Diamond MLBB, Pulsa, atau cara transfer DANA ke ${danaNumber}?`,
      timestamp: 'Baru saja'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!questionText) setInput('');
    setIsTyping(true);

    // AI Response generation (with smart store knowledge engine)
    setTimeout(() => {
      let reply = '';
      const q = textToSend.toLowerCase();

      if (q.includes('dana') || q.includes('bayar') || q.includes('transfer') || q.includes('bukti')) {
        reply = `💳 **Cara Pembayaran via DANA di Yuraa Store id:**\n\n1. Pilih produk & varian yang Kakak inginkan di web.\n2. Pilih metode pembayaran **DANA**.\n3. Transfer saldo DANA ke nomor: **${danaNumber}** (a/n **Yuraa Store id**).\n4. Setelah transfer, klik tombol *"Kirim Bukti Pembayaran ke WhatsApp"* di halaman invoice untuk mengirim screenshot bukti transfer ke admin.\n5. Pesanan langsung diproses otomatis dalam 1-15 menit! ⚡`;
      } else if (q.includes('viu') || q.includes('drakor') || q.includes('drama')) {
        reply = `🎬 **Viu Premium VIP (Drama Korea & Film Asia):**\n\nDi Yuraa Store id tersedia paket Viu Premium VIP:\n• 1 Bulan: Rp 12.000 (Private Account)\n• 3 Bulan: Rp 29.000 (Private Account)\n• 6 Bulan: Rp 49.000 (Private Account)\n\nSemua paket bebas iklan, kualitas Full HD, dan subtitle bahasa Indonesia resmi. Tanpa butuh VPN!`;
      } else if (q.includes('sharing') || q.includes('private') || q.includes('netflix')) {
        reply = `🎬 **Perbedaan Netflix Sharing vs Private:**\n\n• **Sharing Profile (Rp 28.500/bulan):** 1 profil diisi 2 pengguna. Sangat hemat, namun ada kemungkinan limit screen jika ditonton bersamaan.\n• **Private Profile (Rp 42.000/bulan):** 1 profil khusus 1 pengguna dengan PIN pribadi. Bebas limit screen dan jauh lebih nyaman!\n• **Private Full Account (Rp 139.000/bulan):** Akun utuh dengan 5 profil milik sendiri.`;
      } else if (q.includes('mlbb') || q.includes('mobile legends') || q.includes('zone') || q.includes('user id')) {
        reply = `💎 **Cara Cek User ID & Zone ID Mobile Legends:**\n\n1. Buka game MLBB Anda.\n2. Klik foto profil di pojok kiri atas.\n3. Lihat di bawah foto profil, ada angka seperti: **12345678 (1234)**.\n• Angka depan (12345678) adalah **User ID**.\n• Angka dalam kurung (1234) adalah **Zone/Server ID**.\n\nTop up di Yuraa Store id otomatis masuk dalam 1-3 menit tanpa perlu password akun Anda! ⚡`;
      } else if (q.includes('kupon') || q.includes('promo') || q.includes('diskon') || q.includes('hemat')) {
        reply = `🎉 **Kode Promo Kupon Yuraa Store id Aktif Saat Ini:**\n\n1. **YURAAHEMAT** : Potongan Rp 5.000 (min. belanja Rp 25.000)\n2. **FLASHGAME** : Diskon 10% s.d Rp 15.000 (min. belanja Rp 20.000)\n3. **BARUGABUNG** : Potongan Rp 3.000 (min. belanja Rp 10.000)\n\nMasukkan kode kupon di menu checkout sebelum bayar ya Kak!`;
      } else if (q.includes('akun game') || q.includes('sultan') || q.includes('smurf') || q.includes('ff') || q.includes('roblox') || q.includes('efootball')) {
        reply = `🎮 **Katalog Akun Game Legal & Bergaransi:**\n\n• **MLBB:** Akun Smurf Mythic (Rp 75k) & Sultan High (Rp 450k) - All Unbind 100% anti hackback!\n• **Free Fire:** Akun Old Season 8 & Evo Gun Max\n• **Roblox:** Akun Clean Aged 2019+ & Akun terisi 1000 Robux\n• **eFootball:** Skuad Konami ID Epic Booster OVR 3150+\n\nSemua akun diserahkan full access beserta email pemulihan!`;
      } else if (q.includes('pulsa') || q.includes('kuota') || q.includes('paket data') || q.includes('telkomsel')) {
        reply = `📱 **Pulsa & Paket Data Semua Operator:**\n\nKami melayani Telkomsel, Indosat Ooredoo, XL, AXIS, Tri (3), dan Smartfren. Sistem otomatis mendeteksi nomor operator Anda dan Serial Number (SN) resmi langsung terbit dalam 30 detik!`;
      } else {
        reply = `Terima kasih atas pertanyaannya Kak! Di **Yuraa Store id**, kami menyediakan Akun Premium (Viu, Netflix, Spotify, Canva Pro), Top Up Game, Akun Game, Pulsa & Paket Data, serta Gift Card.\n\nPembayaran via **DANA nomor ${danaNumber}** langsung diproses cepat dan bergaransi 100%. Ada produk spesifik yang ingin Kakak tanyakan?`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-xl h-[85vh] max-h-[680px] rounded-3xl bg-[#0B0F19] dark:bg-[#0B0F19] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 bg-[#0E1322] dark:bg-[#0E1322] light:bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 shadow-[0_0_15px_-2px_rgba(168,85,247,0.5)]">
              <img
                src="/src/assets/images/mascot_bear_tiger_hero_1792993941291.jpg"
                alt="Yuraa AI"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base text-white dark:text-white light:text-slate-900">
                  Asisten AI Yuraa Store
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                Konsultasi produk digital, akun streaming, game & DANA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 border-b border-slate-800/60 bg-[#0A0E18] dark:bg-[#0A0E18] light:bg-slate-100/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-purple-400 uppercase shrink-0">Tanya Cepat:</span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] font-medium px-3 py-1 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-purple-500 hover:text-white whitespace-nowrap shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-7 h-7 rounded-full bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-xs text-purple-300 shrink-0 mt-0.5">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? 'bg-[#12182B] dark:bg-[#12182B] light:bg-slate-100 text-slate-100 dark:text-slate-100 light:text-slate-900 border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span className="text-[9px] opacity-60 block mt-1.5 text-right font-mono">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-full bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-xs text-purple-300 shrink-0">
                🤖
              </div>
              <div className="p-3 rounded-2xl bg-[#12182B] border border-slate-800 text-slate-400 text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                <span className="ml-1 text-[11px]">Asisten AI sedang mengetik jawaban...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 bg-[#0E1322] dark:bg-[#0E1322] light:bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Tanyakan paket film, akun game, atau cara bayar..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-700 dark:border-slate-700 light:border-slate-200 text-xs sm:text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg disabled:opacity-40 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
