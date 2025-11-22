
import React from 'react';
import { Organizer } from '../types';

const EXECUTIVES: Organizer[] = [
  { id: 1, name: 'Ir. John Doe, M.Si', role: 'Ketua Umum', imageUrl: 'https://picsum.photos/200/200?random=10' },
  { id: 2, name: 'Bpk. Michael Smith', role: 'Wakil Ketua I', imageUrl: 'https://picsum.photos/200/200?random=11' },
  { id: 3, name: 'Ibu Sarah Johnson', role: 'Sekretaris Umum', imageUrl: 'https://picsum.photos/200/200?random=12' },
  { id: 4, name: 'Bpk. Andi Pratama', role: 'Bendahara', imageUrl: 'https://picsum.photos/200/200?random=13' },
];

const DIVISIONS: Organizer[] = [
  { id: 5, name: 'Coach Budi', role: 'Bidang Prestasi', imageUrl: 'https://picsum.photos/150/150?random=14' },
  { id: 6, name: 'Siti Aminah', role: 'Humas & Media', imageUrl: 'https://picsum.photos/150/150?random=15' },
  { id: 7, name: 'Robert W', role: 'Bidang Perwasitan', imageUrl: 'https://picsum.photos/150/150?random=16' },
  { id: 8, name: 'Dr. Ratna', role: 'Bidang Kesehatan', imageUrl: 'https://picsum.photos/150/150?random=17' },
  { id: 9, name: 'Ferry K.', role: 'Bidang Kompetisi', imageUrl: 'https://picsum.photos/150/150?random=18' },
  { id: 10, name: 'Lina M.', role: 'Bidang Usaha Dana', imageUrl: 'https://picsum.photos/150/150?random=19' },
];

const OrganizationPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 font-sans">
        {/* Header (Clean Gradient - Darkened) */}
        <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-20 px-4 relative overflow-hidden">
             <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
             
             <div className="relative max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-xl">Struktur Organisasi</h1>
                <div className="h-1 w-20 bg-pbvsi-red mx-auto rounded-full mb-4 shadow-sm"></div>
                <p className="text-xl text-gray-400 drop-shadow-md">Masa Bakti 2024 - 2028</p>
             </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Executive Board */}
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-10 uppercase tracking-wide">Pengurus Harian</h2>
                {/* Adjusted grid: md=2cols, lg=3cols, xl=4cols for better tablet fit */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {EXECUTIVES.map((person) => (
                        <div key={person.id} className="bg-white rounded-2xl shadow-lg overflow-hidden text-center border-t-4 border-pbvsi-red hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="h-48 overflow-hidden bg-gray-100 relative">
                                <img 
                                    src={person.imageUrl} 
                                    alt={person.name} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                    <span className="text-white text-xs font-bold">PBVSI SULUT</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900">{person.name}</h3>
                                <p className="text-pbvsi-red font-medium text-sm mt-1">{person.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divisions */}
            <div>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-10 uppercase tracking-wide">Bidang & Seksi</h2>
                {/* Adjusted grid for divisions as well */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {DIVISIONS.map((person) => (
                        <div key={person.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gray-100">
                                <img src={person.imageUrl} alt={person.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm">{person.name}</h3>
                            <p className="text-gray-500 text-xs font-medium mt-1 uppercase">{person.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart Visualization (Simplified) */}
            <div className="mt-20 p-8 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
                <h3 className="text-lg font-bold text-gray-400 mb-4">Bagan Struktur</h3>
                <div className="flex justify-center">
                    <div className="flex flex-col items-center space-y-4 opacity-50">
                        <div className="w-32 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">KETUA UMUM</div>
                        <div className="h-8 w-0.5 bg-gray-300"></div>
                        <div className="w-64 h-0.5 bg-gray-300"></div>
                        <div className="flex space-x-8">
                            <div className="w-24 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">SEKRETARIS</div>
                            <div className="w-24 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">BENDAHARA</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default OrganizationPage;
