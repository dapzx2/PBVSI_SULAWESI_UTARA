
import React, { useState, useEffect } from 'react';
import { Search, Shield, MapPin, User, Calendar, Filter, ChevronRight, ShieldAlert, ArrowLeft, Facebook, Instagram, Globe, Trophy, Users, Info, GraduationCap, AlertTriangle } from 'lucide-react';
import EmptyState from './EmptyState';
import { Club } from '../types';

interface ClubDatabasePageProps {
    clubs: Club[];
}

const formatValue = (val: string | undefined) => {
    if (!val) return <span className="text-gray-400 italic text-sm">Tidak Diketahui</span>;
    return val;
};

type Tab = 'profile' | 'squad' | 'coaches' | 'achievements';

const ClubDatabasePage: React.FC<ClubDatabasePageProps> = ({ clubs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Semua');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const CITIES = ['Semua', ...Array.from(new Set(clubs.map(c => c.city)))];

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (club.coach && club.coach.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCity = selectedCity === 'Semua' || club.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  useEffect(() => {
      if (selectedClub) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveTab('profile');
      }
  }, [selectedClub]);

  // --- CLUB DETAIL VIEW ---
  if (selectedClub) {
      return (
        <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 font-sans">
            {/* Hero Banner */}
            <div className="bg-gray-900 h-64 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #222 25%, #222 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                {/* Back Button */}
                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <button 
                        onClick={() => setSelectedClub(null)}
                        className="flex items-center px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-sm font-bold transition-all hover:pr-6 group shadow-lg"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                        Kembali
                    </button>
                </div>
            </div>

            {/* Club Header Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 mb-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white p-2 shadow-lg -mt-20 md:-mt-24 border-4 border-white">
                        <img src={selectedClub.logoUrl} alt={selectedClub.name} className="w-full h-full object-cover rounded-xl border border-gray-100" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900">{selectedClub.name}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                selectedClub.status === 'Aktif' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                                {selectedClub.status}
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-gray-500 text-sm font-medium">
                            <span className="flex items-center"><MapPin className="h-4 w-4 mr-1.5 text-pbvsi-red" /> {selectedClub.city}</span>
                            <span className="flex items-center"><Calendar className="h-4 w-4 mr-1.5 text-pbvsi-red" /> Est. {selectedClub.founded || '?'}</span>
                            <span className="flex items-center"><User className="h-4 w-4 mr-1.5 text-pbvsi-red" /> {selectedClub.coach || 'N/A'}</span>
                        </div>
                    </div>
                    
                    {/* Socials */}
                    <div className="flex gap-3">
                        {selectedClub.socials?.instagram && (
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-pink-500 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </button>
                        )}
                        {selectedClub.socials?.facebook && (
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </button>
                        )}
                        {selectedClub.socials?.website && (
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition-colors">
                                <Globe className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs & Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`pb-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'profile' ? 'border-pbvsi-red text-pbvsi-red font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Info className="inline-block w-4 h-4 mr-2" /> Profil & Sejarah
                    </button>
                    <button 
                        onClick={() => setActiveTab('squad')}
                        className={`pb-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'squad' ? 'border-pbvsi-red text-pbvsi-red font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Users className="inline-block w-4 h-4 mr-2" /> Daftar Pemain
                    </button>
                    <button 
                        onClick={() => setActiveTab('coaches')}
                        className={`pb-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'coaches' ? 'border-pbvsi-red text-pbvsi-red font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <GraduationCap className="inline-block w-4 h-4 mr-2" /> Staf Pelatih
                    </button>
                    <button 
                        onClick={() => setActiveTab('achievements')}
                        className={`pb-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'achievements' ? 'border-pbvsi-red text-pbvsi-red font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Trophy className="inline-block w-4 h-4 mr-2" /> Prestasi
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8 min-h-[300px]">
                    {activeTab === 'profile' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Tentang Klub</h3>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    {selectedClub.description || <span className="italic text-gray-400">Deskripsi klub belum tersedia.</span>}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl h-fit">
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Informasi Kontak</h3>
                                <ul className="space-y-4 text-sm">
                                    <li>
                                        <p className="text-gray-400 text-xs font-bold mb-1">Alamat Markas</p>
                                        <p className="text-gray-800 font-medium">{formatValue(selectedClub.address)}</p>
                                    </li>
                                    <li>
                                        <p className="text-gray-400 text-xs font-bold mb-1">Kota Asal</p>
                                        <p className="text-gray-800 font-medium">{selectedClub.city}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'squad' && (
                        <div>
                            {selectedClub.squad.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {selectedClub.squad.map((player, idx) => (
                                        <div key={idx} className="flex items-center p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50">
                                            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-black text-lg mr-4 shadow-lg">
                                                {player.number || idx + 1}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{player.name}</p>
                                                <p className="text-xs text-pbvsi-red font-bold bg-red-50 px-2 py-0.5 rounded inline-block mt-1 border border-red-100">{player.position}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                                        <AlertTriangle className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">Data Skuad Belum Tersedia</h3>
                                    <p className="text-gray-500 text-sm max-w-xs mt-2">Daftar pemain untuk musim ini belum diperbarui oleh manajemen klub.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'coaches' && (
                        <div>
                            {selectedClub.coaches && selectedClub.coaches.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {selectedClub.coaches.map((coach, index) => (
                                        <div key={index} className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <img 
                                                src={coach.imageUrl || `https://ui-avatars.com/api/?name=${coach.name}&background=random`} 
                                                alt={coach.name} 
                                                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-100" 
                                            />
                                            <div>
                                                <h3 className="font-bold text-gray-900">{coach.name}</h3>
                                                <p className="text-pbvsi-red text-sm font-medium">{coach.role}</p>
                                                <span className="inline-block mt-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-semibold">
                                                    {coach.license}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                                        <GraduationCap className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">Data Pelatih Belum Tersedia</h3>
                                    <p className="text-gray-500 text-sm max-w-xs mt-2">Daftar staf pelatih belum ditambahkan ke database klub ini.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'achievements' && (
                        <div>
                             {selectedClub.achievements.length > 0 ? (
                                <ul className="space-y-4">
                                    {selectedClub.achievements.map((ach, i) => (
                                        <li key={i} className="flex items-start p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                                            <Trophy className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-0.5" />
                                            <span className="font-bold text-gray-800">{ach}</span>
                                        </li>
                                    ))}
                                </ul>
                             ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                                        <Trophy className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">Belum Ada Data Prestasi</h3>
                                    <p className="text-gray-500 text-sm max-w-xs mt-2">Data prestasi klub belum ditambahkan ke database.</p>
                                </div>
                             )}
                        </div>
                    )}
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 font-sans">
      {/* Header (Clean Gradient - Darkened) */}
      <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-black text-white py-16 px-4 relative overflow-hidden">
         {/* Pattern - Low Opacity */}
         <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         
         <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-full mb-4 border border-white/10 shadow-sm">
                <Shield className="h-6 w-6 text-pbvsi-red" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-xl">Database Klub</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto drop-shadow-md">
                Daftar klub bola voli resmi yang terdaftar dan aktif di bawah naungan PBVSI Sulawesi Utara.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Controls Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* City Filter */}
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <Filter className="h-5 w-5 text-gray-400 hidden md:block flex-shrink-0" />
                    {CITIES.length > 1 && CITIES.map(city => (
                        <button
                            key={city}
                            onClick={() => setSelectedCity(city)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                selectedCity === city 
                                ? 'bg-gray-900 text-white shadow-md' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-72">
                    <input 
                        type="text" 
                        placeholder="Cari klub atau pelatih..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pbvsi-red focus:outline-none transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
            </div>
        </div>

        {/* Clubs Grid */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[400px]">
            {/* CHECK FOR EMPTY SOURCE DATA */}
            {clubs.length === 0 ? (
                <div className="p-12">
                    <EmptyState 
                        icon={ShieldAlert}
                        title="Database Kosong"
                        message="Saat ini belum ada klub yang terdaftar dalam database PBVSI Sulut."
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {filteredClubs.length > 0 ? (
                        filteredClubs.map((club) => (
                            <div 
                                key={club.id} 
                                onClick={() => setSelectedClub(club)}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                            <img src={club.logoUrl} alt={club.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            club.status === 'Aktif' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-red-100 text-red-700'
                                        }`}>
                                            {club.status}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-pbvsi-red transition-colors">{club.name}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <MapPin className="h-3 w-3 mr-1" /> {club.city}
                                    </div>
                                    
                                    <div className="space-y-2 border-t border-gray-100 pt-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 flex items-center"><User className="h-3 w-3 mr-1.5"/> Pelatih</span>
                                            <span className="font-semibold text-gray-900">{club.coach || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 flex items-center"><Calendar className="h-3 w-3 mr-1.5"/> Berdiri</span>
                                            <span className="font-semibold text-gray-900">{club.founded || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center group-hover:bg-red-50 transition-colors">
                                    <span className="text-xs text-gray-500 group-hover:text-pbvsi-red font-medium">Lihat Profil Klub</span>
                                    <button className="text-gray-400 group-hover:text-pbvsi-red transition-colors">
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full">
                             <EmptyState 
                                icon={ShieldAlert}
                                title="Klub Tidak Ditemukan"
                                message={`Tidak ada klub yang cocok dengan kata kunci "${searchTerm}" di wilayah ${selectedCity}.`}
                                actionLabel="Lihat Semua Klub"
                                onAction={() => {setSearchTerm(''); setSelectedCity('Semua')}}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default ClubDatabasePage;
