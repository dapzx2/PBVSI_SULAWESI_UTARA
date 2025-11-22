
import React from 'react';
import { History, Award, Calendar, ChevronRight } from 'lucide-react';

const TIMELINE = [
    { year: '1955', title: 'Berdirinya PBVSI', desc: 'Persatuan Bola Voli Seluruh Indonesia resmi berdiri secara nasional, dan tak lama kemudian mandat pembentukan pengurus di Sulawesi Utara mulai dijalankan.' },
    { year: '1970-an', title: 'Era Emas Voli Tarkam', desc: 'Bola voli menjadi olahraga rakyat paling populer di Minahasa dan Manado. Lahirnya klub-klub legendaris yang menguasai panggung kompetisi antar kampung.' },
    { year: '1990-an', title: 'Prestasi Nasional', desc: 'Tim Bola Voli Sulawesi Utara mulai diperhitungkan di kancah nasional dengan menembus 4 besar PON dan melahirkan pemain-pemain yang dipanggil ke Timnas.' },
    { year: '2010', title: 'Modernisasi Organisasi', desc: 'PBVSI Sulut mulai menerapkan sistem manajemen modern, database atlet digital, dan standarisasi pelatihan wasit.' },
    { year: '2024', title: 'Visi Menuju PON', desc: 'Fokus utama pengurus saat ini adalah meloloskan tim putra dan putri ke PON serta membangun fasilitas latihan berstandar internasional.' }
];

const HistoryPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen animate-fade-in pb-16 font-sans">
        {/* Header (Clean Gradient - Darkened) */}
        <div className="bg-gradient-to-r from-gray-950 to-gray-900 text-white py-16 md:py-20 px-4 relative overflow-hidden">
             {/* Blob - Lower Opacity */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-pbvsi-red rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
             
             <div className="relative max-w-4xl mx-auto text-center">
                <History className="h-10 w-10 md:h-12 md:w-12 mx-auto text-pbvsi-red mb-4 drop-shadow-lg" />
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-xl">Sejarah Bola Voli Sulut</h1>
                <p className="text-lg md:text-xl text-gray-400 drop-shadow-md">Perjalanan panjang membangun prestasi dari masa ke masa.</p>
             </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {/* Intro Text - Responsive Typography & Alignment */}
            <div className="prose prose-base md:prose-lg text-gray-600 mx-auto mb-12 md:mb-16 text-left md:text-justify leading-relaxed">
                <p className="lead font-medium text-gray-800 text-lg md:text-xl mb-4">
                    Sulawesi Utara dikenal sebagai salah satu lumbung atlet bola voli nasional. Kecintaan masyarakat "Nyiur Melambai" terhadap olahraga ini sudah mengakar sejak puluhan tahun silam.
                </p>
                <p>
                    Sejarah mencatat, bola voli masuk ke Sulawesi Utara dibawa oleh para guru-guru Belanda pada zaman kolonial, namun baru benar-benar berkembang pesat pasca kemerdekaan. Lapangan voli sederhana bermunculan di setiap desa, menjadikan voli bukan sekadar olahraga, tapi juga hiburan utama masyarakat pedesaan.
                </p>
            </div>

            {/* Timeline Section - Responsive Spacing */}
            <div className="relative border-l-4 border-pbvsi-red/20 ml-2 md:ml-4 space-y-10 md:space-y-12">
                {TIMELINE.map((item, idx) => (
                    <div key={idx} className="relative pl-6 md:pl-12 group">
                        {/* Dot - Fixed Positioning */}
                        <div className="absolute -left-[11px] top-1.5 h-5 w-5 rounded-full border-4 border-white bg-pbvsi-red shadow-md group-hover:scale-125 transition-transform z-10"></div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center mb-2 md:mb-3">
                            <span className="text-2xl md:text-3xl font-black text-gray-300 sm:mr-4 group-hover:text-pbvsi-red transition-colors duration-300 leading-none mb-1 sm:mb-0">{item.year}</span>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{item.title}</h3>
                        </div>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Hall of Fame - Responsive Grid */}
            <div className="mt-16 bg-red-50 rounded-2xl p-6 md:p-8 text-center border border-red-100">
                <Award className="h-8 w-8 md:h-10 md:w-10 text-pbvsi-red mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Hall of Fame</h3>
                <p className="text-sm md:text-base text-gray-600 mb-6">Mengenang para legenda yang telah mengharumkan nama Sulawesi Utara.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {['Maxi P.', 'Rully N.', 'Joko S.', 'Aprilia M.'].map((name, i) => (
                        <div key={i} className="bg-white p-3 rounded-lg shadow-sm font-semibold text-sm md:text-base text-gray-800 border border-red-100 hover:bg-red-600 hover:text-white transition-colors cursor-default">
                            {name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default HistoryPage;
