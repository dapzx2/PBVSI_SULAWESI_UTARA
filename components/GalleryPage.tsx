
import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Video, Filter, ZoomIn, X, ChevronLeft, ChevronRight, ImageOff, Play } from 'lucide-react';
import EmptyState from './EmptyState';
import { GalleryItem } from '../types';

interface GalleryPageProps {
    galleryItems: GalleryItem[];
}

const GalleryPage: React.FC<GalleryPageProps> = ({ galleryItems }) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  
  // Touch state for swipe detection
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Derive categories dynamically
  const availableCategories = Array.from(new Set(galleryItems.map(item => item.category)));
  const CATEGORIES = ['Semua', ...availableCategories];

  const filteredItems = selectedCategory === 'Semua' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  // Helper to identify video
  const isVideo = (url: string) => url.startsWith('data:video') || url.endsWith('.mp4') || url.endsWith('.webm');

  // --- LIGHTBOX LOGIC ---
  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const handleNext = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    if (currentIndex === -1) return; // Safety check
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  }, [selectedImage, filteredItems]);

  const handlePrev = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    if (currentIndex === -1) return; // Safety check
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  }, [selectedImage, filteredItems]);

  // --- SWIPE HANDLERS ---
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext(); // Swipe Left -> Next Image
    } else if (distance < -minSwipeDistance) {
      handlePrev(); // Swipe Right -> Prev Image
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handleNext, handlePrev]);


  return (
    <div className="bg-white min-h-screen animate-fade-in pb-16">
      <div className="bg-gradient-to-r from-gray-950 to-black text-white py-20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-down">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-full mb-4 border border-white/10 shadow-sm">
                <Camera className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-xl">Galeri Foto & Video</h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                Momen-momen terbaik dari aksi atlet, kompetisi, dan kegiatan PBVSI Sulut.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {availableCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in-up">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 ${
                            selectedCategory === cat 
                            ? 'bg-pbvsi-red text-white shadow-lg scale-105' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        )}

        {galleryItems.length === 0 ? (
             <EmptyState 
                icon={ImageOff}
                title="Galeri Belum Tersedia"
                message="Saat ini belum ada foto atau video yang diunggah ke dalam galeri."
            />
        ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                    <div 
                        key={item.id} 
                        className="relative group overflow-hidden rounded-xl shadow-md aspect-[4/3] cursor-pointer bg-gray-200 animate-zoom-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => handleOpenLightbox(item)}
                    >
                        {isVideo(item.url) ? (
                             <div className="w-full h-full relative">
                                <video 
                                    src={item.url} 
                                    className="w-full h-full object-cover" 
                                    muted
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center pl-1 shadow-lg animate-pulse-slow">
                                        <Play className="h-6 w-6 text-pbvsi-red fill-current" />
                                    </div>
                                </div>
                             </div>
                        ) : (
                            <img 
                                src={item.url} 
                                alt={item.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        )}
                        
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-6 ${
                            hoveredId === item.id ? 'opacity-100' : 'opacity-0'
                        }`}>
                            <span className="text-pbvsi-red text-xs font-bold uppercase tracking-wider mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{item.category}</span>
                            <h3 className="text-white font-bold text-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h3>
                            <div className="mt-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                <span className="inline-flex items-center text-white/80 text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                                    <ZoomIn className="h-3 w-3 mr-1" /> {isVideo(item.url) ? 'Putar' : 'Perbesar'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <EmptyState 
                icon={ImageOff}
                title="Kategori Kosong"
                message={`Tidak ada konten dalam kategori "${selectedCategory}".`}
                actionLabel="Lihat Semua Galeri"
                onAction={() => setSelectedCategory('Semua')}
            />
        )}

      </div>

      {selectedImage && (
        <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in backdrop-blur-sm" 
            onClick={handleCloseLightbox}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            
            <button 
                onClick={handleCloseLightbox}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-50 hover:rotate-90"
            >
                <X className="h-8 w-8" />
            </button>

            {/* Desktop Prev Button */}
            <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block z-50 hover:-translate-x-1"
            >
                <ChevronLeft className="h-10 w-10" />
            </button>

            <div 
                className="relative w-full max-w-5xl max-h-[85vh] flex flex-col items-center justify-center p-4 animate-zoom-in"
                onClick={(e) => e.stopPropagation()}
            >
                {isVideo(selectedImage.url) ? (
                    <video 
                        src={selectedImage.url} 
                        controls 
                        autoPlay
                        className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                    />
                ) : (
                    <img 
                        src={selectedImage.url} 
                        alt={selectedImage.title} 
                        className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl select-none"
                        draggable={false}
                    />
                )}
                
                <div className="mt-4 text-center text-white select-none animate-fade-in-up">
                    <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{selectedImage.category} • {filteredItems.findIndex(i => i.id === selectedImage.id) + 1}/{filteredItems.length}</p>
                </div>
            </div>

            {/* Desktop Next Button */}
            <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block z-50 hover:translate-x-1"
            >
                <ChevronRight className="h-10 w-10" />
            </button>

            {/* Mobile Hint */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 md:hidden pointer-events-none text-white/30 text-xs">
                <span className="animate-pulse">&larr; Geser</span>
                <span className="animate-pulse">Geser &rarr;</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;