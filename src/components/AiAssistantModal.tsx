import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, User, RefreshCw } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  danaNumber?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  danaNumber = '628984436849'
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `Halo Kak! 👋 Saya Asisten AI Yuraa Store. Ada yang bisa saya bantu seputar paket Viu Drakor, Netflix 4K, Top Up Diamond MLBB, Pulsa, atau cara transfer DANA ke ${danaNumber}?`,
      time: 'Baru saja'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text, time: userTime }]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Terima kasih pertanyaannya Kak! Untuk pemesanan produk digital, akun streaming, atau top up game, silakan pilih produk langsung di katalog utama ya.";
      
      const lower = text.toLowerCase();
      if (lower.includes('dana') || lower.includes('bayar') || lower.includes('transfer')) {
        reply = `Pembayaran via DANA dapat langsung ditransfer ke nomor resmi kami di: ${danaNumber}. Setelah transfer, silakan konfirmasi pesanan Anda melalui menu Lacak Pesanan atau WhatsApp.`;
      } else if (lower.includes('netflix') || lower.includes('viu') || lower.includes('akun') || lower.includes('streaming')) {
        reply = "Akun streaming premium (Netflix, Viu, dll) bergaransi resmi dan dikirimkan otomatis setelah pembayaran terverifikasi!";
      } else if (lower.includes('garansi') || lower.includes('aktif')) {
        reply = "Semua akun langganan di Yuraa Store bergaransi penuh selama masa aktifnya. Jika ada kendala, sistem kami juga akan mengingatkan ketika masa aktif tersisa 5 hari.";
      }

      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { sender: 'ai', text: reply, time: aiTime }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#10172A] border border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
        
        {/* Header Modal */}
        <div className="p-4 bg-gradient-to-r from-purple-900/80 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">Asisten AI Yuraa Store</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">ONLINE</span>
              </div>
              <p className="text-[11px] text-slate-400">Konsultasi produk digital, akun streaming, game & DANA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="px-4 py-2.5 bg-slate-900/50 border-b border-slate-800 flex gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-purple-400 font-semibold shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> TANYA CEPAT:
          </span>
          <button
            onClick={() => handleSend("Bagaimana cara bayar via DANA?")}
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0 transition-colors"
          >
            Bagaimana cara bayar via DANA?
          </button>
          <button
            onClick={() => handleSend("Apa beda Netflix dan Viu?")}
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0 transition-colors"
          >
            Apa beda Netflix dan Viu?
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-purple-600/30 text-purple-400 border border-purple-500/30'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/50 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className={`block text-[10px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                }`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>Asisten AI sedang mengetik...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanyakan paket film, akun game, atau cara bayar..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-lg shadow-purple-600/30 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
