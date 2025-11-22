
import React from 'react';
import { Calendar, User, Inbox, ArrowRight } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsSectionProps {
    news: NewsItem[];
    onViewAll: () => void;
    onNewsClick: (id: number) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, onViewAll, onNewsClick }) => {
  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-down">
          <h2 className="text-base font-bold text-pbvsi-red tracking-wide uppercase">Informasi Terkini</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Berita & Agenda Voli Sulut
          </p>
        </div>

        {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(0, 3).map((item, index) => (
                <div 
                    key={item.id} 
                    className="flex flex-col rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group animate-fade-in-up bg-white border border-gray-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => onNewsClick(item.id)}
                >
                <div className="flex-shrink-0 overflow-hidden relative h-48">
                    <img className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" src={item.imageUrl} alt={item.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between relative">
                    <div className="flex-1">
                    <p className="text-xs font-bold text-white bg-pbvsi-red px-2 py-1 rounded inline-block mb-2 shadow-sm">
                        {item.category}
                    </p>
                    <div className="block mt-2">
                        <p className="text-xl font-bold text-gray-900 group-hover:text-pbvsi-red transition-colors line-clamp-2">
                        {item.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500 line-clamp-3">
                        {item.excerpt}
                        </p>
                    </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                        <div className="flex text-xs text-gray-400 space-x-4">
                            <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.date}
                            </span>
                            <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            Admin
                            </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-pbvsi-red group-hover:translate-x-1 transition-all" />
                    </div>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 animate-fade-in">
                <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-4">
                    <Inbox className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Belum Ada Berita</h3>
                <p className="text-gray-500 text-sm mt-2">Saat ini belum ada artikel berita terbaru yang diterbitkan.</p>
            </div>
        )}
        
        <div className="mt-12 text-center animate-fade-in delay-300">
             <button onClick={onViewAll} className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-bold rounded-full text-gray-700 bg-white hover:bg-gray-50 hover:text-pbvsi-red hover:border-red-200 transition-all shadow-sm hover:shadow-md active:scale-95">
                Lihat Semua Berita <ArrowRight className="ml-2 h-4 w-4" />
             </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;