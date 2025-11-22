
import React, { useState } from 'react';
import { ShieldAlert, Lock, FileText, Upload, CheckCircle, AlertTriangle, EyeOff, ArrowLeft, Send } from 'lucide-react';

const ReportPage: React.FC = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API submission
    setTimeout(() => {
        setFormStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const handleBack = () => {
      // Simple reload to go back home/previous state logic handled by parent usually, 
      // but here we just assume user uses nav or we add a prop if needed. 
      // For visual consistency, we provide a back button that ideally interacts with App routing if passed.
      window.history.back(); 
  };

  if (formStatus === 'success') {
      return (
        <div className="bg-gray-50 min-h-screen animate-fade-in flex items-center justify-center px-4">
            <div className="bg-white max-w-2xl w-full p-10 rounded-3xl shadow-xl text-center border-t-8 border-green-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Laporan Diterima</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Terima kasih atas keberanian Anda melaporkan hal ini. Laporan Anda telah dienkripsi dan masuk ke sistem kami dengan ID Tiket: <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">#WBS-{Math.floor(Math.random() * 10000)}</span>.
                    <br/>Tim Kepatuhan PBVSI Sulut akan segera menindaklanjuti laporan ini.
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-lg"
                >
                    Kembali ke Beranda
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-20 font-sans">
      {/* Secure Header */}
      <div className="bg-gray-900 text-white py-16 px-4 relative overflow-hidden border-b-4 border-pbvsi-red">
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #222 25%, #222 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
         
         <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 bg-red-900/30 backdrop-blur-md rounded-full mb-6 border border-red-500/30 shadow-lg">
                <ShieldAlert className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Whistleblowing System</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Saluran pelaporan pelanggaran yang aman, rahasia, dan independen. Identitas pelapor dilindungi.
            </p>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        
        {/* Notice Card */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8 flex items-start shadow-sm">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
            <div>
                <h3 className="font-bold text-yellow-800 mb-1">Penting Sebelum Melapor</h3>
                <p className="text-sm text-yellow-700 leading-relaxed">
                    Gunakan fitur ini untuk melaporkan indikasi kecurangan pertandingan, penyalahgunaan dana, pelanggaran kode etik, atau tindakan ilegal lainnya di lingkungan PBVSI Sulut. Jangan gunakan untuk laporan palsu atau fitnah.
                </p>
            </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-800 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-gray-400" />
                    Formulir Pengaduan
                </h2>
                <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <Lock className="h-3 w-3 mr-1" />
                    Terenkripsi SSL 256-bit
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                
                {/* Section 1: Privacy Toggle */}
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full mr-4 transition-colors ${isAnonymous ? 'bg-gray-800 text-white' : 'bg-blue-200 text-blue-700'}`}>
                            {isAnonymous ? <EyeOff className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Kirim Sebagai Anonim?</h3>
                            <p className="text-xs text-gray-500">Identitas Anda tidak akan dicatat jika opsi ini aktif.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                </div>

                {/* Section 2: Reporter Info (Conditional) */}
                <div className={`space-y-6 transition-all duration-500 ${isAnonymous ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Identitas Pelapor</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                            <input type="text" disabled={isAnonymous} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pbvsi-red focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500" placeholder="Nama Anda" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon / WA</label>
                            <input type="text" disabled={isAnonymous} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pbvsi-red focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500" placeholder="0812..." />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" disabled={isAnonymous} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pbvsi-red focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500" placeholder="email@anda.com" />
                        </div>
                    </div>
                </div>

                {/* Section 3: Incident Detail */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Detail Kejadian</h3>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul Laporan <span className="text-red-500">*</span></label>
                        <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pbvsi-red focus:border-transparent bg-white text-gray-900" placeholder="Contoh: Indikasi Suap Wasit di Final Kejurda" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kejadian</label>
                            <input type="date" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pbvsi-red focus:border-transparent bg-white text-gray-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi Kejadian</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pbvsi-red focus:border-transparent bg-white text-gray-900" placeholder="Nama GOR / Tempat" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Uraian Kronologi <span className="text-red-500">*</span></label>
                        <textarea required rows={6} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pbvsi-red focus:border-transparent bg-white text-gray-900" placeholder="Jelaskan kejadian secara rinci (Apa, Siapa, Kapan, Di mana, Bagaimana)..."></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bukti Pendukung (Foto/Dokumen)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer group bg-white">
                            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3 group-hover:text-pbvsi-red transition-colors" />
                            <p className="text-sm text-gray-600 font-medium">Klik untuk upload atau drag & drop file di sini</p>
                            <p className="text-xs text-gray-400 mt-1">Max 10MB (JPG, PNG, PDF)</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                     <p className="text-xs text-gray-500 max-w-md">
                        Dengan mengirim laporan ini, Anda menyatakan bahwa informasi yang diberikan adalah benar dan dapat dipertanggungjawabkan (kecuali memilih anonim).
                     </p>
                     <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="w-full md:w-auto bg-pbvsi-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-red-900/20 transform hover:-translate-y-1 flex items-center justify-center"
                     >
                        {formStatus === 'submitting' ? (
                            <span className="flex items-center animate-pulse">Mengenkripsi & Mengirim...</span>
                        ) : (
                            <span className="flex items-center">Kirim Laporan <Send className="ml-2 h-5 w-5" /></span>
                        )}
                     </button>
                </div>

            </form>
        </div>

      </div>
    </div>
  );
};

export default ReportPage;
