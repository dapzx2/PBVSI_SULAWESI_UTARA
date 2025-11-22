
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronRight, UserX, ArrowLeft, Award, Briefcase, Calendar, UserCheck, GraduationCap } from 'lucide-react';
import EmptyState from './EmptyState';

interface CareerHistory {
    year: string;
    team: string;
    role: string;
    achievement?: string;
}

interface Coach {
  id: number;
  name: string;
  club: string;
  license: 'Nasional A' | 'Nasional B' | 'Nasional C' | 'Daerah' | 'FIVB Level 1' | 'FIVB Level 2';
  specialization: string;
  experience: number; // years
  age: number;
  imageUrl: string;
  bio: string;
  career: CareerHistory[];
}

const MOCK_COACHES: Coach[] = [
  { 
    id: 1, 
    name: 'Joko Susilo', 
    club: 'Bright Jos Elektrik', 
    license: 'Nasional A', 
    specialization: 'Taktik & Strategi', 
    experience: 15, 
    age: 45, 
    imageUrl: 'https://picsum.photos/400/400?random=90',
    bio: 'Pelatih senior yang dikenal dengan pendekatan disiplin tinggi. Telah melahirkan banyak pemain timnas dari Sulawesi Utara.',
    career: [
        { year: '2020-Sekarang', team: 'Bright Jos Elektrik', role: 'Kepala Pelatih', achievement: 'Juara Livoli Divisi 1' },
        { year: '2015-2019', team: 'Tim PON Sulut', role: 'Asisten Pelatih' }
    ]
  },
  { 
    id: 2, 
    name: 'Teddy Wijaya', 
    club: 'Bank SulutGo', 
    license: 'Nasional B', 
    specialization: 'Fisik & Conditioning', 
    experience: 10, 
    age: 38, 
    imageUrl: 'https://picsum.photos/400/400?random=91',
    bio: 'Mantan atlet yang beralih menjadi pelatih fisik. Fokus pada pengembangan stamina dan kekuatan lompatan atlet.',
    career: [
        { year: '2018-Sekarang', team: 'Bank SulutGo', role: 'Kepala Pelatih' },
        { year: '2016', team: 'Timnas Junior', role: 'Pelatih Fisik' }
    ]
  },
  { 
    id: 3, 
    name: 'Rully Nere', 
    club: 'Minahasa Hebat', 
    license: 'Nasional C', 
    specialization: 'Pembinaan Usia Dini', 
    experience: 8, 
    age: 35, 
    imageUrl: 'https://picsum.photos/400/400?random=92',
    bio: 'Spesialis dalam menjaring dan memoles bakat-bakat muda di daerah Minahasa.',
    career: [
        { year: '2019-Sekarang', team: 'Minahasa Hebat', role: 'Kepala Pelatih' }
    ]
  },
  { 
    id: 4, 
    name: 'Siska Mangundap', 
    club: 'PLN Suluttenggo Putri', 
    license: 'Nasional A', 
    specialization: 'Teknik Dasar', 
    experience: 20, 
    age: 50, 
    imageUrl: 'https://picsum.photos/400/400?random=93',
    bio: 'Pelatih wanita paling berpengaruh di Sulut. Dikenal sangat detail dalam membenahi teknik dasar pemain putri.',
    career: [
        { year: '2010-Sekarang', team: 'PLN Suluttenggo', role: 'Kepala Pelatih' },
        { year: '2012', team: 'Tim PON Sulut Putri', role: 'Kepala Pelatih' }
    ]
  },
  { 
    id: 5, 
    name: 'Denny Moningka', 
    club: 'Tomohon Spikers', 
    license: 'Daerah', 
    specialization: 'Scouting', 
    experience: 5, 
    age: 30, 
    imageUrl: 'https://picsum.photos/400/400?random=94',
    bio: 'Pelatih muda berbakat yang sukses membawa Tomohon Spikers promosi ke divisi utama daerah.',
    career: []
  },
  { 
    id: 6, 
    name: 'Coach "Opa" Yan', 
    club: 'Freelance / Konsultan', 
    license: 'FIVB Level 2', 
    specialization: 'High Performance', 
    experience: 35, 
    age: 65, 
    imageUrl: 'https://picsum.photos/400/400?random=95',
    bio: 'Legenda hidup kepelatihan voli Indonesia asal Sulut. Sering menjadi instruktur pelatihan pelatih nasional.',
    career: [
        { year: '1990-2000', team: 'Timnas Indonesia', role: 'Kepala Pelatih' },
        { year: '2010-Sekarang', team: 'PBVSI Pusat', role: 'Instruktur' }
    ]
  },
];

const LICENSES = ['Semua', 'FIVB Level 2', 'FIVB Level 1', 'Nasional A', 'Nasional B', 'Nasional C', 'Daerah'];

const CoachDatabasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLicense, setSelectedLicense] = useState('Semua');
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  const filteredCoaches = MOCK_COACHES.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          coach.club.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLicense = selectedLicense === 'Semua' || coach.license === selectedLicense;
    return matchesSearch && matchesLicense;
  });

  // Scroll to top when detailed view opens
  useEffect(() => {
      if (selectedCoach) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }, [selectedCoach]);

  // --- COACH DETAIL VIEW ---
  if (selectedCoach) {
      return (
        <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 font-sans">
            {/* Header / Cover */}
            <div className="bg-gradient-to-r from-gray-900 to-blue-900 h-64 relative">
                {/* Back Button */}
                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <button 
                        onClick={() => setSelectedCoach(null)}
                        className="flex items-center px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-sm font-bold transition-all hover:pr-6 group shadow-lg"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                        Kembali
                    </button>
                </div>
                {/* Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Left: Photo & Basic Info */}
                        <div className="md:w-1/3 bg-gray-50 p-8 flex flex-col items-center text-center border-r border-gray-100">
                            <div className="w-48 h-48 rounded-full p-1 bg-white shadow-xl mb-6 border-4 border-white">
                                <img src={selectedCoach.imageUrl} alt={selectedCoach.name} className="w-full h-full rounded-full object-cover" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-1">{selectedCoach.name}</h2>
                            <div className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide mb-4 border border-blue-200">
                                {selectedCoach.license}
                            </div>
                            
                            <div className="w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Klub Saat Ini</p>
                                <p className="font-bold text-gray-800">{selectedCoach.club}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                    <p className="text-xs text-gray-400 uppercase font-bold">Pengalaman</p>
                                    <p className="font-black text-xl text-gray-900">{selectedCoach.experience} <span className="text-xs font-normal text-gray-500">thn</span></p>
                                </div>
                                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                    <p className="text-xs text-gray-400 uppercase font-bold">Umur</p>
                                    <p className="font-black text-xl text-gray-900">{selectedCoach.age} <span className="text-xs font-normal text-gray-500">thn</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Detailed Stats & Bio */}
                        <div className="md:w-2/3 p-8">
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <UserCheck className="h-5 w-5 mr-2 text-pbvsi-red" /> Spesialisasi & Filosofi
                                </h3>
                                <div className="mb-4">
                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-bold border border-gray-200">
                                        {selectedCoach.specialization}
                                    </span>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    {selectedCoach.bio}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-2">
                                    <Briefcase className="h-5 w-5 mr-2 text-gray-500" /> Riwayat Karir
                                </h3>
                                {selectedCoach.career.length > 0 ? (
                                    <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
                                        {selectedCoach.career.map((c, i) => (
                                            <div key={i} className="relative pl-8">
                                                {/* Dot */}
                                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-pbvsi-red"></div>
                                                
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                                                    <h4 className="font-bold text-gray-900 text-lg">{c.team}</h4>
                                                    <span className="text-sm font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{c.year}</span>
                                                </div>
                                                <p className="text-pbvsi-red font-bold text-sm mb-1">{c.role}</p>
                                                {c.achievement && (
                                                    <p className="text-sm text-gray-500 italic flex items-center mt-1">
                                                        <Award className="h-3 w-3 mr-1 text-yellow-500" /> {c.achievement}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 italic text-sm">Data riwayat karir belum ditambahkan secara rinci.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  }

  // --- MAIN LIST VIEW ---
  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 font-sans">
      {/* Header (Clean Gradient - Darkened) */}
      <div className="bg-gradient-to-br from-gray-950 to-black text-white py-16 px-4 relative overflow-hidden">
         {/* Pattern - Lower Opacity */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         
         <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-full mb-4 border border-white/10 shadow-sm">
                <Briefcase className="h-6 w-6 text-pbvsi-red" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-xl">Database Pelatih</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto drop-shadow-md">
                Daftar pelatih berlisensi resmi di bawah naungan PBVSI Sulawesi Utara.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Main Controls Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* License Filter */}
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <Filter className="h-5 w-5 text-gray-400 hidden md:block flex-shrink-0" />
                    {LICENSES.map(lic => (
                        <button
                            key={lic}
                            onClick={() => setSelectedLicense(lic)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                selectedLicense === lic 
                                ? 'bg-gray-900 text-white shadow-md' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {lic}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-72">
                    <input 
                        type="text" 
                        placeholder="Cari nama pelatih..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pbvsi-red focus:outline-none transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
            </div>
        </div>

        {/* Table View for Desktop / Card View for Mobile */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[400px]">
            {filteredCoaches.length > 0 ? (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                                    <th className="p-5 font-bold">Nama Pelatih</th>
                                    <th className="p-5 font-bold">Klub</th>
                                    <th className="p-5 font-bold">Lisensi</th>
                                    <th className="p-5 font-bold text-center">Pengalaman</th>
                                    <th className="p-5 font-bold text-center">Umur</th>
                                    <th className="p-5 font-bold text-center">Detail</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCoaches.map((coach) => (
                                    <tr 
                                        key={coach.id} 
                                        onClick={() => setSelectedCoach(coach)}
                                        className="hover:bg-gray-50 transition-colors group cursor-pointer"
                                    >
                                        <td className="p-5">
                                            <div className="flex items-center">
                                                <img src={coach.imageUrl} alt={coach.name} className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-100" />
                                                <span className="font-bold text-gray-900 group-hover:text-pbvsi-red transition-colors">{coach.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-gray-600">{coach.club}</td>
                                        <td className="p-5">
                                            <span className={`px-2 py-1 rounded text-xs font-bold border ${
                                                coach.license.includes('Nasional A') || coach.license.includes('FIVB')
                                                ? 'bg-blue-50 text-blue-700 border-blue-100'
                                                : 'bg-gray-100 text-gray-700 border-gray-200'
                                            }`}>
                                                {coach.license}
                                            </span>
                                        </td>
                                        <td className="p-5 text-center font-medium text-gray-700">{coach.experience} Thn</td>
                                        <td className="p-5 text-center font-medium text-gray-700">{coach.age}</td>
                                        <td className="p-5 text-center">
                                            <button className="text-gray-400 hover:text-pbvsi-red transition-colors">
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden">
                        {filteredCoaches.map((coach) => (
                            <div 
                                key={coach.id} 
                                onClick={() => setSelectedCoach(coach)}
                                className="p-4 border-b border-gray-100 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <img src={coach.imageUrl} alt={coach.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900">{coach.name}</h3>
                                    <p className="text-xs text-gray-500 mb-1">{coach.club}</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">
                                            {coach.license}
                                        </span>
                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold border border-gray-200">
                                            {coach.experience} Thn Exp
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-300" />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="p-6">
                    <EmptyState 
                        icon={UserX}
                        title="Pelatih Tidak Ditemukan"
                        message={`Tidak ada data pelatih yang cocok dengan pencarian "${searchTerm}" pada lisensi yang dipilih.`}
                        actionLabel="Reset Filter"
                        onAction={() => {setSearchTerm(''); setSelectedLicense('Semua')}}
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CoachDatabasePage;
