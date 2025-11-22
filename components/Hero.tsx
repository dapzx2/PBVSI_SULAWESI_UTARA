
import React from 'react';
import { ArrowRight, Volleyball } from 'lucide-react';

interface HeroProps {
    onNavigate: (page: 'home' | 'news' | 'about', sectionId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-gray-950 h-[600px] flex items-center overflow-hidden group">
      {/* Abstract CSS Background - Darker */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black"></div>
      {/* Pattern - Reduced Opacity */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      {/* Decorative Shapes - Floating Animation */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-pbvsi-red/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Use lg:flex-row instead of md:flex-row to keep it stacked on tablets */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="max-w-2xl z-10 text-center lg:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-red-200 text-sm font-bold mb-6 backdrop-blur-sm shadow-sm justify-center lg:justify-start animate-fade-in-down">
             <Volleyball className="w-4 h-4 mr-2 animate-spin-slow" /> PBVSI Official Portal
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl mb-6 leading-tight drop-shadow-2xl animate-fade-in-up delay-100">
            Bangkitkan <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 drop-shadow-sm">Semangat Voli</span> <br/>
            Sulawesi Utara
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed drop-shadow-md animate-fade-in-up delay-200">
            Wadah resmi pembinaan, kompetisi, dan pengembangan prestasi bola voli di Bumi Nyiur Melambai. Torang Bisa!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
            <button
              onClick={() => onNavigate('news')}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-pbvsi-red hover:bg-red-700 md:text-lg transition-all duration-300 shadow-lg shadow-red-900/50 hover:-translate-y-1 hover:shadow-red-900/70 active:scale-95"
            >
              Berita Terbaru
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/10 bg-white/5 text-base font-bold rounded-full text-white hover:bg-white hover:text-gray-900 md:text-lg transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm hover:shadow-lg active:scale-95"
            >
              Tentang PBVSI
            </button>
          </div>
        </div>
        
        {/* Abstract Illustration Side - Only visible on large desktops */}
        <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none animate-pulse-slow">
             <Volleyball className="w-[600px] h-[600px] text-white" />
        </div>
      </div>
    </div>
  );
};

export default Hero;