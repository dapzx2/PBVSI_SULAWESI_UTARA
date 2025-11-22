
import React, { useState, useEffect } from 'react';
import { Calendar, User, Search, ChevronRight, ArrowLeft, Clock, Tag, FileText, Inbox } from 'lucide-react';
import { NewsItem } from '../types';
import EmptyState from './EmptyState';

interface NewsPageProps {
    news: NewsItem[];
    initialNewsId?: number;
}

const NewsPage: React.FC<NewsPageProps> = ({ news, initialNewsId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Derive categories dynamically from data props
  const availableCategories = Array.from(new Set(news.map(item => item.category)));
  const CATEGORIES = ['Semua', ...availableCategories];

  // Initialize with props if provided
  useEffect(() => {
      if (initialNewsId) {
          const foundNews = news.find(n => n.id === initialNewsId);
          if (foundNews) {
              setSelectedNews(foundNews);
          }
      }
  }, [initialNewsId, news]);

  // Scroll to top when opening/closing an article
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedNews]);

  const handleReadMore = (item: NewsItem) => {
    setSelectedNews(item);
  };

  const handleBack = () => {
    setSelectedNews(null);
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // --- DETAIL VIEW RENDER ---
  if (selectedNews) {
    return (
      <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 font-sans relative">
        
        <div className="md:hidden fixed bottom-6 left-6 z-50 animate-fade-in-up delay-500">
            <button 
                onClick={handleBack}
                className="bg-pbvsi-red text-white p-4 rounded-full shadow-2xl shadow-red-900/30 border border-red-500 flex items-center justify-center hover:bg-red-700 active:scale-95 transition-transform"
            >
                <ArrowLeft className="h-6 w-6" />
            </button>
        </div>

        <div className="relative w-full h-[400px] md:h-[500px]">
            <div className="absolute top-6 left-4 md:left-8 z-30 animate-fade-in-right">
                <button 
                    onClick={handleBack}
                    className="flex items-center px-4 py-2.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 text-white text-sm font-bold transition-all hover:pr-6 group shadow-lg"
                >
                    <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                    Kembali ke Berita
                </button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
            <img 
                src={selectedNews.imageUrl} 
                alt={selectedNews.title} 
                className="w-full h-full object-cover animate-zoom-in"
            />
            <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
                <div className="max-w-4xl animate-fade-in-up delay-100">
                    <span className="inline-block bg-pbvsi-red text-white px-3 py-1 rounded-md text-xs font-bold tracking-wide uppercase mb-4 shadow-lg">
                        {selectedNews.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                        {selectedNews.title}
                    </h1>
                    <div className="flex flex-wrap items-center text-sm md:text-base text-gray-300 gap-6 font-medium drop-shadow-md">
                        <span className="flex items-center">
                            <div className="bg-white/20 p-1.5 rounded-full mr-2">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            Admin PBVSI
                        </span>
                        <span className="flex items-center">
                            <div className="bg-white/20 p-1.5 rounded-full mr-2">
                                <Calendar className="h-4 w-4 text-white" />
                            </div>
                            {selectedNews.date}
                        </span>
                        <span className="flex items-center">
                            <div className="bg-white/20 p-1.5 rounded-full mr-2">
                                <Clock className="h-4 w-4 text-white" />
                            </div>
                            5 menit baca
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 animate-fade-in-up delay-200">
                    <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 lg:p-12 mb-8">
                        <div className="mb-8 p-6 bg-red-50 border-l-4 border-pbvsi-red rounded-r-lg">
                            <p className="text-lg md:text-xl text-gray-800 font-medium italic leading-relaxed">
                                "{selectedNews.excerpt}"
                            </p>
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                            {selectedNews.content ? (
                                selectedNews.content.map((paragraph, index) => (
                                    <p key={index} className="text-justify text-gray-700">
                                        {paragraph}
                                    </p>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Konten lengkap sedang dalam proses penyuntingan.</p>
                            )}
                        </div>
                        
                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                                <Tag className="h-5 w-5 text-pbvsi-red mr-2" />
                                <span className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full cursor-pointer transition hover:scale-105">#BolaVoli</span>
                                <span className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full cursor-pointer transition hover:scale-105">#PBVSISulut</span>
                                <span className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full cursor-pointer transition hover:scale-105">#{selectedNews.category}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6 animate-fade-in-up delay-300">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pbvsi-red">
                        <h3 className="font-bold text-gray-900 mb-4">Diterbitkan Oleh</h3>
                        <div className="flex items-center gap-4">
                            <div className="bg-gray-100 p-3 rounded-full">
                                <User className="h-8 w-8 text-gray-500" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Humas PBVSI Sulut</p>
                                <p className="text-xs text-gray-500">Official Account</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                            <span className="w-1 h-6 bg-pbvsi-red mr-3 rounded-full"></span>
                            Berita Terkait
                        </h3>
                        <div className="space-y-6">
                            {news.filter(n => n.id !== selectedNews.id).slice(0, 3).map(related => (
                                <div 
                                    key={related.id} 
                                    onClick={() => handleReadMore(related)} 
                                    className="group cursor-pointer flex gap-4 items-start hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                >
                                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                                        <img src={related.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={related.title} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-pbvsi-red uppercase mb-1 tracking-wide">{related.category}</p>
                                        <h4 className="text-sm font-bold text-gray-800 group-hover:text-pbvsi-red transition-colors line-clamp-2 leading-snug">
                                            {related.title}
                                        </h4>
                                        <p className="text-[10px] text-gray-400 mt-2">{related.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleBack} className="w-full mt-6 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all hover:shadow-sm">
                            Lihat Semua Berita
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW RENDER (Default) ---
  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      <div className="bg-gradient-to-r from-gray-950 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute right-0 top-0 -mr-20 -mt-20 w-80 h-80 bg-pbvsi-red/10 rounded-full blur-3xl animate-float"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-down">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-full mb-4 border border-white/10 shadow-sm">
                <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">Berita & Artikel</h1>
            <p className="text-gray-400 text-lg drop-shadow-md">Update terbaru seputar dunia voli Sulawesi Utara</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-fade-in-up delay-100">
            
            {availableCategories.length > 0 ? (
                <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-2 scrollbar-hide">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 active:scale-95 ${
                                selectedCategory === cat 
                                ? 'bg-pbvsi-red text-white shadow-md transform scale-105' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-sm text-gray-400 italic w-full md:w-auto">
                    Menampilkan semua berita
                </div>
            )}

            <div className="relative w-full md:w-72">
                <input
                    type="text"
                    placeholder="Cari berita..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pbvsi-red focus:border-transparent outline-none transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
        </div>

        {news.length === 0 ? (
            <EmptyState 
                icon={Inbox}
                title="Belum Ada Berita"
                message="Saat ini belum ada artikel berita yang diterbitkan di portal ini."
            />
        ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
                <article 
                    key={item.id} 
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group animate-fade-in-up hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => handleReadMore(item)}>
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        <div className="absolute top-4 left-4">
                            <span className="bg-pbvsi-red/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                {item.category}
                            </span>
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                            <span className="flex items-center"><Calendar className="h-3 w-3 mr-1"/> {item.date}</span>
                            <span className="flex items-center"><User className="h-3 w-3 mr-1"/> Admin</span>
                        </div>
                        <h3 
                            onClick={() => handleReadMore(item)}
                            className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pbvsi-red transition-colors cursor-pointer line-clamp-2"
                        >
                            {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                            {item.excerpt}
                        </p>
                        <button 
                            onClick={() => handleReadMore(item)}
                            className="text-pbvsi-red font-semibold text-sm flex items-center mt-auto hover:translate-x-1 transition-transform"
                        >
                            Baca Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                </article>
            ))}
            </div>
        ) : (
            <EmptyState 
                icon={Search}
                title="Berita Tidak Ditemukan"
                message={
                    searchTerm 
                    ? `Maaf, tidak ada berita yang cocok dengan "${searchTerm}".`
                    : `Belum ada berita untuk kategori "${selectedCategory}".`
                }
                actionLabel="Reset Pencarian"
                onAction={() => {setSearchTerm(''); setSelectedCategory('Semua');}}
            />
        )}
      </div>
    </div>
  );
};

export default NewsPage;