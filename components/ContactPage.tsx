import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Facebook, Instagram, Youtube, CheckCircle, Clock, MessageSquare, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const FAQ_ITEMS = [
    {
        question: "Bagaimana cara mendaftarkan klub baru?",
        answer: "Pendaftaran klub dapat dilakukan dengan mengunjungi sekretariat PBVSI Sulut dengan membawa dokumen legalitas klub, daftar pemain, dan surat rekomendasi dari pengurus cabang kabupaten/kota setempat."
    },
    {
        question: "Apakah ada biaya untuk seleksi atlet daerah?",
        answer: "Seleksi atlet daerah yang diselenggarakan resmi oleh PBVSI Sulut umumnya tidak dipungut biaya (gratis). Hati-hati terhadap penipuan yang mengatasnamakan pengurus."
    },
    {
        question: "Bolehkah masyarakat umum menyewa lapangan latihan?",
        answer: "GOR Hall B terbuka untuk umum di luar jadwal Pelatda. Silakan hubungi kontak sekretariat untuk cek ketersediaan jadwal dan biaya sewa."
    }
];

const ContactPage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  const toggleFaq = (index: number) => {
      setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-20 font-sans">
      {/* Hero Header with Theme Gradient (Clean & Dark) */}
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-24 pb-48 px-4 relative overflow-hidden">
        {/* Abstract Background Shapes - Low Opacity */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/5 blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white/5 blur-3xl opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-red-200 text-sm font-semibold mb-6 shadow-sm">
                Layanan Informasi 24/7
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
                Hubungi Tim <span className="text-pbvsi-red drop-shadow-md">PBVSI</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Kami siap mendengar masukan, menjawab pertanyaan, dan berkolaborasi untuk kemajuan voli Sulawesi Utara.
            </p>
        </div>
      </div>

      {/* Floating Quick Info Cards - Uniform Theme Colors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Location */}
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-pbvsi-red group">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 text-pbvsi-red group-hover:bg-pbvsi-red group-hover:text-white transition-colors duration-300">
                      <MapPin className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sekretariat</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                      GOR KONI Sario, Jl. Jendral Ahmad Yani, Sario, Manado, Sulut
                  </p>
              </div>

              {/* Card 2: Phone */}
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-pbvsi-red group">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-700 group-hover:bg-pbvsi-red group-hover:text-white transition-colors duration-300">
                      <Phone className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Telepon & WA</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-1">
                      +62 812 3456 7890 (Admin)
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                      +62 431 888 999 (Kantor)
                  </p>
              </div>

              {/* Card 3: Email */}
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-pbvsi-red group">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-700 group-hover:bg-pbvsi-red group-hover:text-white transition-colors duration-300">
                      <Mail className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Email Resmi</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-1">
                      sekretariat@pbvsisulut.id
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                      humas@pbvsisulut.id
                  </p>
              </div>
          </div>
      </div>

      {/* Main Content: Form & Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
          <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Left Column: Contact Form */}
              <div className="lg:w-2/3">
                  <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-100">
                      <div className="flex items-center mb-8">
                          <div className="p-3 bg-red-50 rounded-full mr-4">
                            <MessageSquare className="h-6 w-6 text-pbvsi-red" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">Kirim Pesan</h2>
                      </div>

                      {formStatus === 'success' ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center animate-fade-in flex flex-col items-center justify-center h-96">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Pesan Terkirim!</h3>
                            <p className="text-gray-600 max-w-md">
                                Terima kasih telah menghubungi kami. Tim admin PBVSI Sulut akan segera membalas pesan Anda melalui email.
                            </p>
                            <button 
                                onClick={() => setFormStatus('idle')}
                                className="mt-8 px-6 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-100 transition"
                            >
                                Kirim pesan lain
                            </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Nama Lengkap</label>
                                    <input type="text" required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pbvsi-red focus:border-transparent focus:bg-white outline-none transition-all" placeholder="Contoh: Budi Santoso" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Anda</label>
                                    <input type="email" required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pbvsi-red focus:border-transparent focus:bg-white outline-none transition-all" placeholder="nama@email.com" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Topik</label>
                                <select className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pbvsi-red focus:border-transparent focus:bg-white outline-none transition-all appearance-none">
                                    <option>Pertanyaan Umum</option>
                                    <option>Pendaftaran Klub / Atlet</option>
                                    <option>Informasi Kompetisi</option>
                                    <option>Media & Sponsorship</option>
                                    <option>Laporan / Pengaduan</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Isi Pesan</label>
                                <textarea rows={5} required className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pbvsi-red focus:border-transparent focus:bg-white outline-none transition-all resize-none" placeholder="Tuliskan detail pertanyaan atau keperluan Anda..."></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={formStatus === 'submitting'}
                                className="w-full bg-pbvsi-red hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/20 transform hover:-translate-y-1 flex items-center justify-center text-lg"
                            >
                                {formStatus === 'submitting' ? (
                                    <span className="flex items-center animate-pulse">Mengirim...</span>
                                ) : (
                                    <span className="flex items-center">Kirim Pesan Sekarang <Send className="ml-2 h-5 w-5" /></span>
                                )}
                            </button>
                        </form>
                      )}
                  </div>
              </div>

              {/* Right Column: Additional Info & Socials */}
              <div className="lg:w-1/3 space-y-8">
                  {/* Operational Hours */}
                  <div className="bg-gray-900 text-white rounded-3xl shadow-lg p-8 relative overflow-hidden border border-gray-800">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gray-800 rounded-full blur-xl"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-6 flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-pbvsi-red" />
                            Jam Operasional
                        </h3>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex justify-between border-b border-gray-700 pb-2">
                                <span>Senin - Jumat</span>
                                <span className="font-bold text-white">08:00 - 17:00 WITA</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-700 pb-2">
                                <span>Sabtu</span>
                                <span className="font-bold text-white">09:00 - 14:00 WITA</span>
                            </li>
                            <li className="flex justify-between pb-2">
                                <span>Minggu / Libur</span>
                                <span className="text-red-400 font-bold">Tutup</span>
                            </li>
                        </ul>
                      </div>
                  </div>

                  {/* Map Visualization (Replaced Photo with CSS Block) */}
                  <div className="bg-white rounded-3xl shadow-lg p-2 border border-gray-100">
                      <div className="relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden group flex items-center justify-center">
                          {/* CSS Pattern Map Placeholder */}
                          <div className="absolute inset-0 opacity-20" style={{ 
                              backgroundImage: 'repeating-linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), repeating-linear-gradient(45deg, #ccc 25%, #f0f0f0 25%, #f0f0f0 75%, #ccc 75%, #ccc)',
                              backgroundPosition: '0 0, 10px 10px',
                              backgroundSize: '20px 20px' 
                          }}></div>
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200/50"></div>

                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="bg-pbvsi-red text-white p-3 rounded-full shadow-xl animate-bounce z-10">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div className="mt-4 bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-gray-200 flex items-center z-10 cursor-pointer hover:bg-gray-50">
                                    Lihat di Google Maps <ArrowRight className="ml-1 h-3 w-3" />
                                </div>
                          </div>
                      </div>
                  </div>

                  {/* Social Media - Monochrome to Red */}
                  <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Ikuti Sosial Media</h3>
                      <div className="flex justify-between gap-4">
                          <a href="#" className="flex-1 flex flex-col items-center justify-center py-4 bg-gray-50 rounded-2xl text-gray-600 hover:bg-pbvsi-red hover:text-white transition-all duration-300 group">
                              <Facebook className="h-6 w-6 mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-bold">Facebook</span>
                          </a>
                          <a href="#" className="flex-1 flex flex-col items-center justify-center py-4 bg-gray-50 rounded-2xl text-gray-600 hover:bg-pbvsi-red hover:text-white transition-all duration-300 group">
                              <Instagram className="h-6 w-6 mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-bold">Instagram</span>
                          </a>
                          <a href="#" className="flex-1 flex flex-col items-center justify-center py-4 bg-gray-50 rounded-2xl text-gray-600 hover:bg-pbvsi-red hover:text-white transition-all duration-300 group">
                              <Youtube className="h-6 w-6 mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-bold">Youtube</span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Pertanyaan yang Sering Diajukan</h2>
              <p className="text-gray-500 mt-2">Cari tahu jawaban cepat untuk pertanyaan umum seputar PBVSI Sulut.</p>
          </div>
          
          <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <button 
                        onClick={() => toggleFaq(index)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                      >
                          <span className="font-bold text-gray-800">{item.question}</span>
                          {openFaqIndex === index ? (
                              <ChevronUp className="h-5 w-5 text-pbvsi-red" />
                          ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                      </button>
                      <div 
                        className={`px-6 text-gray-600 text-sm leading-relaxed bg-gray-50 transition-all duration-300 ease-in-out overflow-hidden ${
                            openFaqIndex === index ? 'max-h-40 py-5 border-t border-gray-100' : 'max-h-0 py-0'
                        }`}
                      >
                          {item.answer}
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default ContactPage;