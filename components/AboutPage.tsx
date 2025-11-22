import React from 'react';
import { Target, Award, Users, History, CheckCircle2, MapPin, Building2 } from 'lucide-react';
import { Organizer } from '../types';

const ORGANIZERS: Organizer[] = [
  { id: 1, name: 'Ir. John Doe, M.Si', role: 'Ketua Umum', imageUrl: 'https://picsum.photos/150/150?random=10' },
  { id: 2, name: 'Michael Smith', role: 'Sekretaris Umum', imageUrl: 'https://picsum.photos/150/150?random=11' },
  { id: 3, name: 'Sarah Johnson', role: 'Bendahara', imageUrl: 'https://picsum.photos/150/150?random=12' },
  { id: 4, name: 'Coach Budi', role: 'Bidang Prestasi', imageUrl: 'https://picsum.photos/150/150?random=13' },
  { id: 5, name: 'Andi Pratama', role: 'Bidang Pertandingan', imageUrl: 'https://picsum.photos/150/150?random=14' },
  { id: 6, name: 'Siti Aminah', role: 'Humas & Media', imageUrl: 'https://picsum.photos/150/150?random=15' },
  { id: 7, name: 'Robert W', role: 'Bidang Perwasitan', imageUrl: 'https://picsum.photos/150/150?random=16' },
  { id: 8, name: 'Dr. Ratna', role: 'Bidang Kesehatan', imageUrl: 'https://picsum.photos/150/150?random=17' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen animate-fade-in pb-16 font-sans">
      {/* Header Page (Clean Gradient - Darkened) */}
      <div className="bg-gradient-to-b from-gray-950 to-gray-900 text-white py-24 relative overflow-hidden">
         {/* CSS Pattern - Lower Opacity */}
         <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(45deg, #D91E29 25%, transparent 25%, transparent 50%, #D91E29 50%, #D91E29 75%, transparent 75%, transparent)', backgroundSize: '60px 60px' }}></div>
         
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-red-200 text-sm font-bold mb-6 tracking-wider uppercase shadow-sm backdrop-blur-sm">
                Profil Organisasi
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-2xl">
                Membangun Prestasi<br/><span className="text-pbvsi-red drop-shadow-md">Voli Sulawesi Utara</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Induk organisasi bola voli yang berdedikasi melahirkan atlet berkarakter dan berprestasi dari Bumi Nyiur Melambai.
            </p>
        </div>
      </div>

      {/* Visi & Misi Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi Card - Red Theme */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-t-8 border-pbvsi-red hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center mb-6">
                    <div className="p-4 bg-red-50 rounded-2xl mr-5 shadow-sm">
                        <Target className="h-10 w-10 text-pbvsi-red" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Visi Kami</h2>
                        <div className="h-1 w-12 bg-pbvsi-red mt-2 rounded-full"></div>
                    </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed italic font-medium">
                    "Menjadikan Bola Voli sebagai olahraga unggulan Sulawesi Utara yang berprestasi di tingkat Nasional dan Internasional serta membangun karakter generasi muda yang sportif dan kompetitif."
                </p>
            </div>

            {/* Misi Card - Dark/Gray Theme with Red Accents */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-t-8 border-gray-800 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center mb-6">
                    <div className="p-4 bg-gray-100 rounded-2xl mr-5 shadow-sm">
                        <Award className="h-10 w-10 text-gray-800" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Misi Kami</h2>
                        <div className="h-1 w-12 bg-gray-800 mt-2 rounded-full"></div>
                    </div>
                </div>
                <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start group">
                        <CheckCircle2 className="h-6 w-6 text-pbvsi-red mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="leading-relaxed">Melaksanakan pembinaan atlet usia dini secara berjenjang dan berkelanjutan.</span>
                    </li>
                    <li className="flex items-start group">
                        <CheckCircle2 className="h-6 w-6 text-pbvsi-red mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="leading-relaxed">Meningkatkan kualitas pelatih dan wasit melalui sertifikasi nasional.</span>
                    </li>
                    <li className="flex items-start group">
                        <CheckCircle2 className="h-6 w-6 text-pbvsi-red mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="leading-relaxed">Memperbanyak kompetisi lokal yang berkualitas di seluruh Kabupaten/Kota.</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>

      {/* History / Profile Section (No generic photo) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 relative">
                  {/* Graphic Element instead of Photo */}
                  <div className="w-full aspect-video bg-gray-900 rounded-2xl shadow-2xl relative overflow-hidden flex items-center justify-center">
                       <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
                       <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-pbvsi-red rounded-full opacity-20 blur-3xl"></div>
                       <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-white rounded-full opacity-5 blur-3xl"></div>
                       
                       <div className="text-center relative z-10 p-8">
                           <Building2 className="h-16 w-16 text-white mx-auto mb-4 opacity-80" />
                           <h3 className="text-2xl font-bold text-white mb-2">Sekretariat PBVSI</h3>
                           <p className="text-gray-400">Pusat Administrasi & Koordinasi Voli Sulut</p>
                       </div>
                  </div>
                  
                  <div className="absolute -bottom-10 -left-4 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block border-l-4 border-pbvsi-red">
                      <div className="flex items-center gap-4">
                          <div className="bg-red-50 p-3 rounded-full">
                              <Users className="h-6 w-6 text-pbvsi-red" />
                          </div>
                          <div>
                              <p className="text-3xl font-bold text-gray-900">15+</p>
                              <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Cabang Kab/Kota</p>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="lg:w-1/2">
                  <div className="flex items-center mb-4 text-pbvsi-red font-bold uppercase tracking-wide text-sm">
                      <History className="h-4 w-4 mr-2" />
                      <span>Sejarah & Latar Belakang</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                      Dari Tarkam hingga <span className="text-pbvsi-red">Kancah Nasional</span>
                  </h2>
                  <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6 text-justify">
                      <p>
                          Persatuan Bola Voli Seluruh Indonesia (PBVSI) Provinsi Sulawesi Utara adalah garda terdepan dalam pengembangan olahraga bola voli di Bumi Nyiur Melambai. Sejarah panjang voli di Sulut tidak lepas dari antusiasme masyarakat yang tinggi, mulai dari pertandingan antar kampung (Tarkam) yang meriah hingga lahirnya atlet-atlet profesional.
                      </p>
                      <p>
                          Kami berkomitmen untuk mentransformasi bakat alam yang melimpah menjadi prestasi nyata. Dengan manajemen organisasi yang modern, transparan, dan berbasis data, PBVSI Sulut terus berupaya meningkatkan standar kompetisi dan pelatihan demi mengharumkan nama daerah.
                      </p>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-100 flex gap-8">
                        <div>
                            <h4 className="text-4xl font-bold text-gray-900">1955</h4>
                            <p className="text-sm text-gray-500 mt-1">Tahun Berdiri PBVSI</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-gray-900">500+</h4>
                            <p className="text-sm text-gray-500 mt-1">Klub Terdaftar</p>
                        </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Organization Structure */}
      <div className="bg-gray-50 py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">Pengurus Provinsi</h2>
                <div className="h-1 w-24 bg-pbvsi-red mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    Daftar nama pengurus yang siap melayani dan memajukan bola voli Sulawesi Utara.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {ORGANIZERS.map((person) => (
                    <div key={person.id} className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-0 overflow-hidden group">
                        {/* Card Image Area (Maintained as it's database content) */}
                        <div className="relative h-64 bg-gray-200 overflow-hidden">
                             <div className="absolute inset-0 bg-pbvsi-red/0 group-hover:bg-pbvsi-red/80 transition-colors duration-300 z-10 flex items-center justify-center">
                                <div className="transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-white text-center px-4">
                                    <p className="font-bold text-lg">PBVSI Sulut</p>
                                    <p className="text-xs">Periode 2024-2028</p>
                                </div>
                             </div>
                            <img 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" 
                                src={person.imageUrl} 
                                alt={person.name} 
                            />
                        </div>
                        
                        {/* Card Content */}
                        <div className="p-6 text-center relative z-20 bg-white">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{person.name}</h3>
                            <p className="text-sm text-pbvsi-red font-bold uppercase tracking-wider">{person.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;