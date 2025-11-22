
import React, { useState } from 'react';
import { FileText, Download, Search, PieChart, Briefcase, FileCheck, ChevronRight, Filter, FolderOpen } from 'lucide-react';
import EmptyState from './EmptyState';
import { DocumentItem } from '../types';

interface PublicInfoPageProps {
    onNavigate?: (page: 'contact' | 'report') => void;
    documents: DocumentItem[];
}

const PublicInfoPage: React.FC<PublicInfoPageProps> = ({ onNavigate, documents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Derive categories dynamically
  const availableCategories = Array.from(new Set(documents.map(doc => doc.category)));
  const CATEGORIES = ['Semua', ...availableCategories];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 font-sans">
      <div className="bg-gradient-to-r from-gray-950 to-gray-900 text-white py-20 px-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay blur-3xl opacity-5"></div>
         
         <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-full mb-4 border border-white/10 shadow-sm">
                <FileCheck className="h-6 w-6 text-pbvsi-red" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-xl">Informasi Publik</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto drop-shadow-md">
                Akses terbuka untuk regulasi, formulir, laporan, dan dokumen resmi PBVSI Sulawesi Utara.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-800 flex items-start hover:-translate-y-1 transition-transform">
                <div className="p-3 bg-gray-100 rounded-lg mr-4">
                    <Briefcase className="h-6 w-6 text-gray-800" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Program Kerja</h3>
                    <p className="text-sm text-gray-500 mt-1">Fokus pembinaan usia dini dan peningkatan kualitas pelatih.</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-500 flex items-start hover:-translate-y-1 transition-transform">
                <div className="p-3 bg-gray-100 rounded-lg mr-4">
                    <PieChart className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Transparansi</h3>
                    <p className="text-sm text-gray-500 mt-1">Laporan penggunaan anggaran yang akuntabel dan terbuka.</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-pbvsi-red flex items-start hover:-translate-y-1 transition-transform">
                <div className="p-3 bg-red-50 rounded-lg mr-4">
                    <FileText className="h-6 w-6 text-pbvsi-red" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Regulasi</h3>
                    <p className="text-sm text-gray-500 mt-1">Kumpulan aturan pertandingan dan AD/ART organisasi.</p>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Download className="h-6 w-6 mr-2 text-gray-400" />
                    Pusat Unduhan
                </h2>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    {availableCategories.length > 0 && (
                        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-hide">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                        selectedCategory === cat 
                                        ? 'bg-gray-900 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                    
                    <div className="relative w-full md:w-64">
                        <input 
                            type="text" 
                            placeholder="Cari dokumen..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pbvsi-red focus:outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {documents.length === 0 ? (
                    <EmptyState 
                        icon={FolderOpen}
                        title="Belum Ada Dokumen"
                        message="Saat ini belum ada dokumen publik yang tersedia untuk diunduh."
                    />
                ) : filteredDocs.length > 0 ? (
                    filteredDocs.map((doc) => (
                        <div key={doc.id} className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all bg-gray-50/50 hover:bg-white">
                            <div className="flex items-start gap-4 mb-3 md:mb-0">
                                <div className={`p-3 rounded-lg ${
                                    doc.type === 'PDF' ? 'bg-red-50 text-pbvsi-red' : 
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 group-hover:text-pbvsi-red transition-colors">{doc.title}</h4>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                        <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-700 font-medium">{doc.category}</span>
                                        <span>{doc.size}</span>
                                        <span>•</span>
                                        <span>{doc.date}</span>
                                    </div>
                                </div>
                            </div>
                            <a 
                                href={doc.url || '#'} 
                                download={doc.title}
                                className={`flex items-center justify-center w-full md:w-auto px-5 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all text-sm ${!doc.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={e => !doc.url && e.preventDefault()}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Unduh
                            </a>
                        </div>
                    ))
                ) : (
                    <EmptyState 
                        icon={FolderOpen}
                        title="Dokumen Tidak Ditemukan"
                        message={
                            searchTerm
                            ? `Maaf, dokumen dalam kategori "${selectedCategory}" yang cocok dengan "${searchTerm}" tidak ditemukan.`
                            : `Belum ada dokumen untuk kategori "${selectedCategory}".`
                        }
                        actionLabel={searchTerm ? "Reset Pencarian" : undefined}
                        onAction={searchTerm ? () => {setSearchTerm(''); setSelectedCategory('Semua')} : undefined}
                    />
                )}
            </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Layanan Permohonan Informasi</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Jika Anda membutuhkan dokumen atau data spesifik yang tidak tersedia di halaman ini, Anda dapat mengajukan permohonan informasi publik secara resmi ke sekretariat kami.
                </p>
                <button 
                    onClick={() => onNavigate && onNavigate('contact')}
                    className="text-pbvsi-red font-bold flex items-center hover:underline"
                >
                    Hubungi Sekretariat <ChevronRight className="h-4 w-4 ml-1" />
                </button>
             </div>
             <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4">Whistleblowing System</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        Laporkan pelanggaran etik, kecurangan pertandingan, atau penyalahgunaan wewenang dalam lingkungan PBVSI Sulut secara rahasia.
                    </p>
                    <button 
                        onClick={() => onNavigate && onNavigate('report')}
                        className="bg-pbvsi-red hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition-colors text-sm"
                    >
                        Buat Laporan
                    </button>
                </div>
                <div className="absolute right-0 bottom-0 -mb-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default PublicInfoPage;
