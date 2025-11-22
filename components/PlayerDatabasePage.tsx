
import React, { useState, useEffect } from 'react';
import { Search, Users, Filter, Ruler, Weight, Shirt, ChevronRight, UserX, ArrowLeft, Activity, Trophy, Target, Hand, AlertCircle } from 'lucide-react';
import EmptyState from './EmptyState';
import { Player } from '../types';

interface PlayerDatabasePageProps {
    playersMen: Player[];
    playersWomen: Player[];
}

const formatValue = (val: string | number | undefined, unit: string = '') => {
    if (val === undefined || val === null || val === '' || val === 0) {
        return <span className="text-gray-400 italic text-sm">N/A</span>;
    }
    return `${val} ${unit}`;
};

const PlayerDatabasePage: React.FC<PlayerDatabasePageProps> = ({ playersMen, playersWomen }) => {
  const [activeCategory, setActiveCategory] = useState<'Putra' | 'Putri'>('Putra');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('Semua');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const data = activeCategory === 'Putra' ? playersMen : playersWomen;
  const positions = ['Semua', ...Array.from(new Set(data.map(p => p.position)))];

  const filteredData = data.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          player.club.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'Semua' || player.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  const handleCategoryChange = (category: 'Putra' | 'Putri') => {
      setActiveCategory(category);
      setSelectedPosition('Semua');
      setSearchTerm('');
      setSelectedPlayer(null);
  };

  // Scroll to top when detailed view opens
  useEffect(() => {
      if (selectedPlayer) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }, [selectedPlayer]);

  // --- PLAYER DETAIL VIEW ---
  if (selectedPlayer) {
      return (
        <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 font-sans">
            {/* Header / Cover */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 h-64 relative">
                {/* Back Button */}
                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <button 
                        onClick={() => setSelectedPlayer(null)}
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
                            <div className="w-48 h-48 rounded-full p-1 bg-white shadow-xl mb-6">
                                <img src={selectedPlayer.imageUrl} alt={selectedPlayer.name} className="w-full h-full rounded-full object-cover" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-1">{selectedPlayer.name}</h2>
                            <p className="text-pbvsi-red font-bold uppercase tracking-wide text-sm mb-4">{selectedPlayer.position}</p>
                            
                            <div className="w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Klub Saat Ini</p>
                                <p className="font-bold text-gray-800">{selectedPlayer.club || <span className="text-gray-400 italic font-normal">Tanpa Klub</span>}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                    <p className="text-xs text-gray-400 uppercase font-bold">Umur</p>
                                    <p className="font-black text-xl text-gray-900">{formatValue(selectedPlayer.age, 'thn')}</p>
                                </div>
                                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                    <p className="text-xs text-gray-400 uppercase font-bold">Tangan</p>
                                    <p className="font-black text-xl text-gray-900">{selectedPlayer.hand || <span className="text-gray-400 italic text-sm">N/A</span>}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Detailed Stats & Bio */}
                        <div className="md:w-2/3 p-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-pbvsi-red" /> Atribut Fisik & Skill
                            </h3>
                            
                            {/* Physical Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                                <div className="text-center">
                                    <div className="inline-flex p-3 bg-red-50 rounded-full mb-2 text-pbvsi-red"><Ruler className="h-6 w-6" /></div>
                                    <p className="text-sm text-gray-500">Tinggi</p>
                                    <p className="text-xl font-black text-gray-900">{formatValue(selectedPlayer.height, 'cm')}</p>
                                </div>
                                <div className="text-center">
                                    <div className="inline-flex p-3 bg-red-50 rounded-full mb-2 text-pbvsi-red"><Weight className="h-6 w-6" /></div>
                                    <p className="text-sm text-gray-500">Berat</p>
                                    <p className="text-xl font-black text-gray-900">{formatValue(selectedPlayer.weight, 'kg')}</p>
                                </div>
                                <div className="text-center">
                                    <div className="inline-flex p-3 bg-red-50 rounded-full mb-2 text-pbvsi-red"><Target className="h-6 w-6" /></div>
                                    <p className="text-sm text-gray-500">Spike</p>
                                    <p className="text-xl font-black text-gray-900">{formatValue(selectedPlayer.spike, 'cm')}</p>
                                </div>
                                <div className="text-center">
                                    <div className="inline-flex p-3 bg-red-50 rounded-full mb-2 text-pbvsi-red"><Hand className="h-6 w-6" /></div>
                                    <p className="text-sm text-gray-500">Block</p>
                                    <p className="text-xl font-black text-gray-900">{formatValue(selectedPlayer.block, 'cm')}</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Biografi Singkat</h3>
                                    <p className="text-gray-600 leading-relaxed text-justify">
                                        {selectedPlayer.bio || <span className="italic text-gray-400">Belum ada informasi biografi yang ditambahkan untuk pemain ini.</span>}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b border-gray-100 pb-2">
                                        <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> Riwayat Karir & Prestasi
                                    </h3>
                                    {selectedPlayer.career && selectedPlayer.career.length > 0 ? (
                                        <div className="space-y-4">
                                            {selectedPlayer.career.map((c, i) => (
                                                <div key={i} className="flex items-start">
                                                    <div className="w-16 font-bold text-gray-400 text-sm pt-1">{c.year}</div>
                                                    <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                        <p className="font-bold text-gray-900">{c.team}</p>
                                                        {c.achievement && (
                                                            <p className="text-xs text-pbvsi-red font-medium mt-1 flex items-center">
                                                                <Trophy className="h-3 w-3 mr-1" /> {c.achievement}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                                            <AlertCircle className="h-5 w-5 text-gray-400 mr-3" />
                                            <p className="text-gray-500 italic text-sm">Data karir dan prestasi belum ditambahkan.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 font-sans">
      {/* Header (Clean Gradient - Darkened) */}
      <div className="bg-gradient-to-br from-gray-950 to-black text-white py-16 px-4 relative overflow-hidden">
         {/* Pattern - Lower Opacity */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         
         <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-full mb-4 border border-white/10 shadow-sm">
                <Users className="h-6 w-6 text-pbvsi-red" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-xl">Database Atlet</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto drop-shadow-md">
                Data resmi atlet bola voli yang terdaftar di PBVSI Sulawesi Utara.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Main Controls Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {/* Category Toggle */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex shadow-inner">
                    <button 
                        onClick={() => handleCategoryChange('Putra')}
                        className={`px-8 py-2.5 rounded-md text-sm font-bold transition-all duration-300 ${
                            activeCategory === 'Putra' 
                            ? 'bg-white text-gray-900 shadow-md transform scale-105' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Putra
                    </button>
                    <button 
                        onClick={() => handleCategoryChange('Putri')}
                        className={`px-8 py-2.5 rounded-md text-sm font-bold transition-all duration-300 ${
                            activeCategory === 'Putri' 
                            ? 'bg-white text-pbvsi-red shadow-md transform scale-105' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Putri
                    </button>
                </div>
            </div>

            {/* Filter & Search Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center border-t border-gray-100 pt-6">
                {/* Position Filter */}
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <Filter className="h-5 w-5 text-gray-400 hidden md:block flex-shrink-0" />
                    {positions.map(pos => (
                        <button
                            key={pos}
                            onClick={() => setSelectedPosition(pos)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                selectedPosition === pos 
                                ? 'bg-gray-900 text-white shadow-md' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {pos}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-72">
                    <input 
                        type="text" 
                        placeholder={`Cari pemain ${activeCategory.toLowerCase()}...`}
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
            {/* CHECK FOR EMPTY SOURCE DATA FIRST */}
            {data.length === 0 ? (
                <div className="p-12">
                    <EmptyState 
                        icon={UserX}
                        title="Database Kosong"
                        message={`Saat ini belum ada data atlet ${activeCategory.toLowerCase()} yang terdaftar dalam sistem database PBVSI Sulut.`}
                    />
                </div>
            ) : (
                <>
                    {filteredData.length > 0 ? (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                                            <th className="p-5 font-bold">Atlet</th>
                                            <th className="p-5 font-bold">Klub</th>
                                            <th className="p-5 font-bold">Posisi</th>
                                            <th className="p-5 font-bold text-center">Tinggi (cm)</th>
                                            <th className="p-5 font-bold text-center">Berat (kg)</th>
                                            <th className="p-5 font-bold text-center">Umur</th>
                                            <th className="p-5 font-bold text-center">Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredData.map((player) => (
                                            <tr 
                                                key={player.id} 
                                                onClick={() => setSelectedPlayer(player)}
                                                className="hover:bg-gray-50 transition-colors group cursor-pointer"
                                            >
                                                <td className="p-5">
                                                    <div className="flex items-center">
                                                        <img src={player.imageUrl} alt={player.name} className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-100" />
                                                        <span className="font-bold text-gray-900 group-hover:text-pbvsi-red transition-colors">{player.name}</span>
                                                    </div>
                                                </td>
                                                <td className="p-5 text-gray-600">{player.club || '-'}</td>
                                                <td className="p-5">
                                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold border border-gray-200">
                                                        {player.position}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-center font-medium text-gray-700">{player.height || '-'}</td>
                                                <td className="p-5 text-center font-medium text-gray-700">{player.weight || '-'}</td>
                                                <td className="p-5 text-center font-medium text-gray-700">{player.age || '-'}</td>
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
                                {filteredData.map((player) => (
                                    <div 
                                        key={player.id} 
                                        onClick={() => setSelectedPlayer(player)}
                                        className="p-4 border-b border-gray-100 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        <img src={player.imageUrl} alt={player.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{player.name}</h3>
                                            <p className="text-xs text-gray-500 mb-1">{player.club || 'Tanpa Klub'}</p>
                                            <span className="bg-red-50 text-pbvsi-red px-2 py-0.5 rounded text-[10px] font-bold border border-red-100">
                                                {player.position}
                                            </span>
                                            <div className="flex gap-3 mt-2 text-xs text-gray-500">
                                                <span className="flex items-center"><Ruler className="h-3 w-3 mr-1"/> {player.height || '-'} cm</span>
                                                <span className="flex items-center"><Weight className="h-3 w-3 mr-1"/> {player.weight || '-'} kg</span>
                                                <span className="flex items-center"><Shirt className="h-3 w-3 mr-1"/> {player.age || '-'} thn</span>
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
                                title="Atlet Tidak Ditemukan"
                                message={`Tidak ada data atlet yang cocok dengan pencarian "${searchTerm}" pada filter yang dipilih.`}
                                actionLabel="Reset Filter"
                                onAction={() => {setSearchTerm(''); setSelectedPosition('Semua')}}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDatabasePage;
