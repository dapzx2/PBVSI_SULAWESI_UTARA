
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Volleyball, ChevronDown, ChevronRight, History, Users, Phone, Shield, FileText, User, LayoutGrid, GraduationCap } from 'lucide-react';

interface NavbarProps {
    onNavigate: (page: 'home' | 'news' | 'matches' | 'about' | 'gallery' | 'contact' | 'history' | 'organization' | 'public-info' | 'players' | 'clubs' | 'report', sectionId?: string) => void;
    currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Handle click outside to close dropdowns
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Adjust body padding when mobile menu is open to prevent layout shift
    if (isMobileMenuOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (page: any, sectionId?: string) => {
    onNavigate(page, sectionId);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name: string) => {
      if (activeDropdown === name) {
          setActiveDropdown(null);
      } else {
          setActiveDropdown(name);
      }
  };

  const NAV_ITEMS = [
      { id: 'home', label: 'Beranda', type: 'link' },
      { id: 'news', label: 'Berita', type: 'link' },
      { id: 'matches', label: 'Pertandingan', type: 'link' },
      { 
          id: 'about', 
          label: 'Tentang', 
          type: 'dropdown',
          children: [
              { id: 'history', label: 'Sejarah', icon: History, desc: 'Perjalanan voli Sulut' },
              { id: 'organization', label: 'Struktur Organisasi', icon: Users, desc: 'Pengurus & Bidang' }
          ]
      },
      { id: 'gallery', label: 'Galeri', type: 'link' },
      { 
          id: 'public-info', 
          label: 'Informasi Publik', 
          type: 'dropdown',
          children: [
              { id: 'public-info', label: 'Dokumen & Regulasi', icon: FileText, desc: 'Unduh dokumen resmi' },
              { id: 'players', label: 'Database Pemain', icon: User, desc: 'Data atlet terdaftar' },
              { id: 'clubs', label: 'Database Klub', icon: Shield, desc: 'Daftar klub resmi' },
              { id: 'contact', label: 'Kontak', icon: Phone, desc: 'Hubungi sekretariat' }
          ] 
      },
  ];

  return (
    <>
      <nav 
          ref={navRef}
          className={`fixed w-full z-[60] transition-all duration-300 ${
              isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-gray-950 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div 
              className="flex items-center flex-shrink-0 cursor-pointer group" 
              onClick={() => handleNavClick('home')}
            >
              <div className={`p-2 rounded-lg mr-3 transition-colors duration-300 ${isScrolled ? 'bg-pbvsi-red text-white' : 'bg-white/10 text-pbvsi-red'}`}>
                  <Volleyball className={`h-6 w-6 ${isScrolled ? 'animate-spin-slow' : ''}`} />
              </div>
              <div className="flex flex-col">
                  <span className={`font-extrabold text-xl tracking-tight leading-none transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                      PBVSI
                  </span>
                  <span className={`text-[10px] font-bold tracking-[0.2em] transition-colors ${isScrolled ? 'text-pbvsi-red' : 'text-gray-400'}`}>
                      SULAWESI UTARA
                  </span>
              </div>
            </div>

            {/* Desktop Menu (XL+) */}
            <div className="hidden xl:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                  <div key={item.id} className="relative group">
                      {item.type === 'link' ? (
                          <button
                              onClick={() => handleNavClick(item.id)}
                              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                                  currentPage === item.id
                                  ? 'text-white bg-pbvsi-red shadow-md'
                                  : isScrolled ? 'text-gray-600 hover:bg-gray-100 hover:text-pbvsi-red' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                              }`}
                          >
                              {item.label}
                          </button>
                      ) : (
                          <div 
                              className="relative"
                              onMouseEnter={() => setActiveDropdown(item.id)}
                              onMouseLeave={() => setActiveDropdown(null)}
                          >
                              <button
                                  onClick={() => handleNavClick(item.id)} // Parent is also clickable
                                  className={`flex items-center px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 group-hover:text-pbvsi-red ${
                                      currentPage === item.id || item.children?.some(c => c.id === currentPage)
                                      ? 'text-white bg-pbvsi-red shadow-md'
                                      : isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                  }`}
                              >
                                  {item.label} <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                              </button>

                              {/* Dropdown Menu */}
                              <div className={`absolute left-0 top-full pt-4 w-72 transform transition-all duration-200 origin-top-left ${
                                  activeDropdown === item.id ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                              }`}>
                                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-2">
                                      <div className="h-1.5 w-12 bg-pbvsi-red rounded-full mx-auto mb-2"></div>
                                      {item.children?.map((child) => (
                                          <button
                                              key={child.id}
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleNavClick(child.id);
                                              }}
                                              className={`w-full flex items-start p-3 rounded-xl transition-colors text-left hover:bg-red-50 group/item ${
                                                  currentPage === child.id ? 'bg-red-50' : ''
                                              }`}
                                          >
                                              <div className={`p-2 rounded-lg mr-3 ${
                                                  currentPage === child.id ? 'bg-pbvsi-red text-white' : 'bg-gray-100 text-gray-500 group-hover/item:bg-pbvsi-red group-hover/item:text-white'
                                              } transition-colors`}>
                                                  {React.createElement(child.icon, { className: "h-5 w-5" })}
                                              </div>
                                              <div>
                                                  <span className={`block text-sm font-bold ${
                                                      currentPage === child.id ? 'text-pbvsi-red' : 'text-gray-900 group-hover/item:text-pbvsi-red'
                                                  }`}>
                                                      {child.label}
                                                  </span>
                                                  <span className="text-xs text-gray-500">{child.desc}</span>
                                              </div>
                                          </button>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 rounded-md ${
                    isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sidebar (Drawer) - OUTSIDE NAV to fix fixed positioning relative to viewport */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 h-[100dvh] w-screen bg-black/50 backdrop-blur-md z-[90] transition-all duration-300 xl:hidden ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        style={{ touchAction: 'none' }}
      ></div>

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-[85vw] max-w-xs bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-out xl:hidden flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
          {/* Drawer Header */}
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
              <div className="flex items-center">
                  <div className="bg-pbvsi-red p-1.5 rounded-lg mr-2">
                    <Volleyball className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-extrabold text-lg text-gray-900">PBVSI SULUT</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200 text-gray-500"
              >
                  <X className="h-6 w-6" />
              </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                  <div key={item.id} className="border-b border-gray-50 last:border-0 pb-2 mb-2 last:mb-0 last:pb-0">
                      {item.type === 'link' ? (
                          <button
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-all ${
                                currentPage === item.id 
                                ? 'bg-red-50 text-pbvsi-red' 
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                              {item.label}
                              {currentPage === item.id && <div className="w-2 h-2 rounded-full bg-pbvsi-red"></div>}
                          </button>
                      ) : (
                          <div className="space-y-1">
                              <div className="flex items-center justify-between pr-2">
                                <button
                                    onClick={() => handleNavClick(item.id)} // Parent clickable
                                    className={`flex-1 text-left px-4 py-3 rounded-xl text-base font-bold ${
                                        currentPage === item.id ? 'text-pbvsi-red' : 'text-gray-700'
                                    }`}
                                >
                                    {item.label}
                                </button>
                                <button 
                                    onClick={() => toggleDropdown(item.id)}
                                    className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500"
                                >
                                    <ChevronDown className={`h-5 w-5 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                                </button>
                              </div>

                              <div className={`overflow-hidden transition-all duration-300 pl-4 space-y-1 ${
                                  activeDropdown === item.id ? 'max-h-96 opacity-100 mb-2' : 'max-h-0 opacity-0'
                              }`}>
                                  {item.children?.map((child) => (
                                      <button
                                        key={child.id}
                                        onClick={() => handleNavClick(child.id)}
                                        className={`w-full flex items-center p-3 rounded-xl text-sm font-medium transition-colors ${
                                            currentPage === child.id 
                                            ? 'bg-red-50 text-pbvsi-red' 
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                      >
                                          <div className={`p-1.5 rounded-lg mr-3 ${
                                              currentPage === child.id ? 'bg-white text-pbvsi-red shadow-sm' : 'bg-gray-100 text-gray-400'
                                          }`}>
                                            {React.createElement(child.icon, { className: "h-4 w-4" })}
                                          </div>
                                          {child.label}
                                      </button>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
              ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
              <button 
                onClick={() => handleNavClick('report')}
                className="w-full flex items-center justify-center px-4 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg"
              >
                  <Shield className="h-4 w-4 mr-2" />
                  Lapor Pelanggaran
              </button>
          </div>
      </div>
    </>
  );
};

export default Navbar;
