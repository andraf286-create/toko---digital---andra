// Service untuk mengurus pengiriman email akun & notifikasi berlangganan

export interface EmailData {
  customerEmail: string;
  customerName?: string;
  productName: string;
  accountDetails: string;
  expiryDate: string;
}

export const emailService = {
  // 1. Kirim Akun Otomatis ke Email setelah Pembelian Sukses
  sendAccountDetails: async (data: EmailData): Promise<boolean> => {
    try {
      console.log(`[Email Service] Mengirim detail akun ke: ${data.customerEmail}`);
      console.log(`Produk: ${data.productName}`);
      console.log(`Detail Akun: ${data.accountDetails}`);
      
      // Simulasi pengiriman email otomatis (bisa diintegrasikan ke EmailJS / Webhook API)
      return true;
    } catch (error) {
      console.error('[Email Service] Gagal mengirim email:', error);
      return false;
    }
  },

  // 2. Kirim Notifikasi Pengingat Sisa 5 Hari Masa Aktif Langganan
  sendRenewalReminder: async (customerEmail: string, productName: string, daysLeft: number): Promise<boolean> => {
    try {
      console.log(`[Email Service] Mengirim pengingat langganan ke: ${customerEmail}`);
      console.log(`Peringatan: Masa aktif ${productName} sisa ${daysLeft} hari lagi.`);
      
      return true;
    } catch (error) {
      console.error('[Email Service] Gagal mengirim pengingat email:', error);
      return false;
    }
  }
};
