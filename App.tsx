import React, { useState, useEffect } from 'react';
import { Volleyball, Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import ChatWidget from './components/ChatWidget';
import NewsPage from './components/NewsPage';
import AboutPage from './components/AboutPage';
import GalleryPage from './components/GalleryPage';
import ContactPage from './components/ContactPage';
import MatchesPage from './components/MatchesPage';
import HistoryPage from './components/HistoryPage';
import OrganizationPage from './components/OrganizationPage';
import PublicInfoPage from './components/PublicInfoPage';
import PlayerDatabasePage from './components/PlayerDatabasePage';
import ClubDatabasePage from './components/ClubDatabasePage';
import ReportPage from './components/ReportPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { NewsItem, Match, GalleryItem, DocumentItem, Player, Club } from './types';
import { apiNews, apiMatches, apiGallery, apiDocs, apiPlayers, apiClubs } from './services/api';

type PageState = 'home' | 'news' | 'matches' | 'about' | 'gallery' | 'contact' | 'history' | 'organization' | 'public-info' | 'players' | 'clubs' | 'report' | 'login';

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('home');
  const [selectedNewsId, setSelectedNewsId] = useState<number | undefined>(undefined);
  
  // --- ADMIN & DATA STATE ---
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [footerClickCount, setFooterClickCount] = useState(0);

  // Data State - Initialized Empty, populated via useEffect
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [matchesList, setMatchesList] = useState<Match[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [docList, setDocList] = useState<DocumentItem[]>([]);
  const [playersMen, setPlayersMen] = useState<Player[]>([]);
  const [playersWomen, setPlayersWomen] = useState<Player[]>([]);
  const [clubList, setClubList] = useState<Club[]>([]);

  // --- FETCH DATA ON LOAD (HYBRID MODE) ---
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // This will try to fetch from localhost:3000
        // If failed, it returns Mock Data silently (fallback)
        const newsData = await apiNews.getAll();
        setNewsList(newsData);

        const matchesData = await apiMatches.getAll();
        setMatchesList(matchesData);

        const galleryData = await apiGallery.getAll();
        setGalleryList(galleryData);

        const docsData = await apiDocs.getAll();
        setDocList(docsData);

        const menData = await apiPlayers.getAllMen();
        setPlayersMen(menData);

        const womenData = await apiPlayers.getAllWomen();
        setPlayersWomen(womenData);

        const clubsData = await apiClubs.getAll();
        setClubList(clubsData);
      } catch (error) {
        console.error("Critical Error loading data:", error);
      }
    };

    fetchAllData();
  }, []);

  // --- SECRET LOGIN TRIGGER ---
  const handleFooterSecretClick = () => {
      setFooterClickCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 5) {
              setCurrentPage('login');
              window.scrollTo(0, 0);
              return 0;
          }
          return newCount;
      });
  };

  // --- CRUD HANDLERS ---
  // Note: These update Local State AND try to call API.
  // If API fails, Local State is still updated (Optimistic UI).

  // News
  const addNews = async (item: Omit<NewsItem, 'id'>) => {
      const newItem = await apiNews.create(item); // Returns mock item with ID if api fails
      setNewsList([newItem, ...newsList]);
  };
  const updateNews = async (item: NewsItem) => {
      const updatedItem = await apiNews.update(item);
      setNewsList(newsList.map(n => n.id === item.id ? updatedItem : n));
  };
  const deleteNews = async (id: number) => {
      await apiNews.delete(id);
      setNewsList(newsList.filter(n => n.id !== id));
  };

  // Matches
  const addMatch = async (item: any) => {
      const newItem = await apiMatches.create(item);
      setMatchesList([newItem, ...matchesList]);
  };
  const updateMatch = async (item: Match) => {
      const updatedItem = await apiMatches.update(item);
      setMatchesList(matchesList.map(m => m.id === item.id ? updatedItem : m));
  };
  const deleteMatch = async (id: string) => {
      await apiMatches.delete(id);
      setMatchesList(matchesList.filter(m => m.id !== id));
  };

  // Gallery
  const addGallery = async (item: Omit<GalleryItem, 'id'>) => {
      const newItem = await apiGallery.create(item);
      setGalleryList([newItem, ...galleryList]);
  };
  const updateGallery = async (item: GalleryItem) => {
      const updatedItem = await apiGallery.update(item);
      setGalleryList(galleryList.map(g => g.id === item.id ? updatedItem : g));
  };
  const deleteGallery = async (id: number) => {
      await apiGallery.delete(id);
      setGalleryList(galleryList.filter(g => g.id !== id));
  };

  // Documents
  const addDoc = async (item: Omit<DocumentItem, 'id'>) => {
      const newItem = await apiDocs.create(item);
      setDocList([newItem, ...docList]);
  };
  const updateDoc = async (item: DocumentItem) => {
      const updatedItem = await apiDocs.update(item);
      setDocList(docList.map(d => d.id === item.id ? updatedItem : d));
  };
  const deleteDoc = async (id: number) => {
      await apiDocs.delete(id);
      setDocList(docList.filter(d => d.id !== id));
  };

  // Players (Men)
  const addPlayerMen = async (item: Omit<Player, 'id'>) => {
      const newItem = await apiPlayers.create({ ...item, gender: 'Men' });
      setPlayersMen([newItem, ...playersMen]);
  };
  const updatePlayerMen = async (item: Player) => {
      const updatedItem = await apiPlayers.update(item);
      setPlayersMen(playersMen.map(p => p.id === item.id ? updatedItem : p));
  };
  const deletePlayerMen = async (id: number) => {
      await apiPlayers.delete(id);
      setPlayersMen(playersMen.filter(p => p.id !== id));
  };

  // Players (Women)
  const addPlayerWomen = async (item: Omit<Player, 'id'>) => {
      const newItem = await apiPlayers.create({ ...item, gender: 'Women' });
      setPlayersWomen([newItem, ...playersWomen]);
  };
  const updatePlayerWomen = async (item: Player) => {
      const updatedItem = await apiPlayers.update(item);
      setPlayersWomen(playersWomen.map(p => p.id === item.id ? updatedItem : p));
  };
  const deletePlayerWomen = async (id: number) => {
      await apiPlayers.delete(id);
      setPlayersWomen(playersWomen.filter(p => p.id !== id));
  };

  // Clubs
  const addClub = async (item: Omit<Club, 'id'>) => {
      const newItem = await apiClubs.create(item);
      setClubList([newItem, ...clubList]);
  };
  const updateClub = async (item: Club) => {
      const updatedItem = await apiClubs.update(item);
      setClubList(clubList.map(c => c.id === item.id ? updatedItem : c));
  };
  const deleteClub = async (id: number) => {
      await apiClubs.delete(id);
      setClubList(clubList.filter(c => c.id !== id));
  };


  const handleNavigate = (page: PageState, sectionId?: string, dataId?: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (page === 'news' && dataId) {
        setSelectedNewsId(dataId);
    } else {
        setSelectedNewsId(undefined);
    }
  };

  // 1. Render Admin Dashboard if Logged In
  if (isAdminLoggedIn) {
      return (
          <AdminDashboard 
            onLogout={() => {
                setIsAdminLoggedIn(false);
                setCurrentPage('home');
            }}
            news={newsList} onAddNews={addNews} onUpdateNews={updateNews} onDeleteNews={deleteNews}
            matches={matchesList} onAddMatch={addMatch} onUpdateMatch={updateMatch} onDeleteMatch={deleteMatch}
            gallery={galleryList} onAddGallery={addGallery} onUpdateGallery={updateGallery} onDeleteGallery={deleteGallery}
            documents={docList} onAddDocument={addDoc} onUpdateDocument={updateDoc} onDeleteDocument={deleteDoc}
            playersMen={playersMen} onAddPlayerMen={addPlayerMen} onUpdatePlayerMen={updatePlayerMen} onDeletePlayerMen={deletePlayerMen}
            playersWomen={playersWomen} onAddPlayerWomen={addPlayerWomen} onUpdatePlayerWomen={updatePlayerWomen} onDeletePlayerWomen={deletePlayerWomen}
            clubs={clubList} onAddClub={addClub} onUpdateClub={updateClub} onDeleteClub={deleteClub}
          />
      );
  }

  // 2. Render Login Page (Full Screen, No Navbar/Footer)
  if (currentPage === 'login') {
      return (
          <AdminLogin 
            onLogin={() => {
                setIsAdminLoggedIn(true);
            }}
            onBack={() => {
                setCurrentPage('home');
            }}
          />
      );
  }

  // 3. Render Main App Website
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar onNavigate={(page) => handleNavigate(page)} currentPage={currentPage} />
      
      {/* Key on main forces re-render and animation trigger on route change */}
      <main className="flex-grow pt-20 animate-fade-in-up" key={currentPage}>
        {currentPage === 'home' && (
            <>
                <Hero onNavigate={(page) => handleNavigate(page)} />
                <NewsSection 
                    news={newsList}
                    onViewAll={() => handleNavigate('news')} 
                    onNewsClick={(id) => handleNavigate('news', undefined, id)}
                />
            </>
        )}
        
        {currentPage === 'news' && <NewsPage news={newsList} initialNewsId={selectedNewsId} />}
        {currentPage === 'matches' && <MatchesPage matches={matchesList} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'history' && <HistoryPage />}
        {currentPage === 'organization' && <OrganizationPage />}
        {currentPage === 'gallery' && <GalleryPage galleryItems={galleryList} />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'public-info' && <PublicInfoPage documents={docList} onNavigate={handleNavigate} />}
        {currentPage === 'players' && <PlayerDatabasePage playersMen={playersMen} playersWomen={playersWomen} />}
        {currentPage === 'clubs' && <ClubDatabasePage clubs={clubList} />}
        {currentPage === 'report' && <ReportPage />}
      </main>

      <footer className="bg-gray-950 text-white border-t border-gray-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Column 1: Brand (CLICK HERE 5 TIMES FOR ADMIN LOGIN PAGE) */}
                <div className="space-y-6 select-none cursor-pointer group" onClick={handleFooterSecretClick}>
                    <div className="flex items-center gap-3">
                        <div className="bg-pbvsi-red p-2 rounded-lg shadow-lg shadow-red-900/20 group-hover:scale-110 transition-transform duration-300">
                             <Volleyball className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-xl tracking-tight leading-none group-hover:text-pbvsi-red transition-colors">PBVSI</h3>
                            <span className="text-pbvsi-red text-xs font-bold tracking-widest">SULAWESI UTARA</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Wadah resmi pembinaan dan pengembangan prestasi bola voli di Bumi Nyiur Melambai.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">Navigasi Utama</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><button onClick={() => handleNavigate('home')} className="hover:text-pbvsi-red hover:translate-x-2 transition-all flex items-center w-full text-left"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span> Beranda</button></li>
                        <li><button onClick={() => handleNavigate('news')} className="hover:text-pbvsi-red hover:translate-x-2 transition-all flex items-center w-full text-left"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span> Berita & Artikel</button></li>
                        <li><button onClick={() => handleNavigate('matches')} className="hover:text-pbvsi-red hover:translate-x-2 transition-all flex items-center w-full text-left"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span> Jadwal & Hasil</button></li>
                        <li><button onClick={() => handleNavigate('players')} className="hover:text-pbvsi-red hover:translate-x-2 transition-all flex items-center w-full text-left"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span> Database Atlet</button></li>
                    </ul>
                </div>

                {/* Column 3: Public Services */}
                <div>
                    <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">Layanan Publik</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><button onClick={() => handleNavigate('public-info')} className="hover:text-pbvsi-red hover:translate-x-2 transition-all flex items-center w-full text-left"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span> Unduh Dokumen</button></li>
                        <li><button onClick={() => handleNavigate('clubs')} className="hover:text-pbvsi-red hover:translate-x-2 transition-all flex items-center w-full text-left"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span> Database Klub</button></li>
                        <li><button onClick={() => handleNavigate('contact')} className="hover:text-pbvsi-red hover:translate-x-2 transition-all flex items-center w-full text-left"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span> Kontak Sekretariat</button></li>
                        <li><button onClick={() => handleNavigate('report')} className="hover:text-pbvsi-red hover:translate-x-2 transition-all flex items-center w-full text-left"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-2"></span> Whistleblowing System</button></li>
                    </ul>
                </div>

                {/* Column 4: Contact Info */}
                <div>
                    <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">Hubungi Kami</h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start">
                            <MapPin className="h-5 w-5 text-pbvsi-red mr-3 flex-shrink-0 mt-0.5 animate-bounce-slow" />
                            <span>Gedung KONI Sario, Jl. Jendral Ahmad Yani, Sario Utara, Manado, Sulawesi Utara 95114</span>
                        </li>
                        <li className="flex items-center">
                            <Mail className="h-5 w-5 text-pbvsi-red mr-3 flex-shrink-0" />
                            <span>sekretariat@pbvsisulut.id</span>
                        </li>
                        <li className="flex items-center">
                            <Phone className="h-5 w-5 text-pbvsi-red mr-3 flex-shrink-0" />
                            <span>+62 431 888 999</span>
                        </li>
                    </ul>
                    
                    <div className="mt-6 flex space-x-3">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pbvsi-red hover:text-white transition-all duration-300 border border-gray-800 hover:border-pbvsi-red hover:-translate-y-1 hover:shadow-lg">
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pbvsi-red hover:text-white transition-all duration-300 border border-gray-800 hover:border-pbvsi-red hover:-translate-y-1 hover:shadow-lg">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pbvsi-red hover:text-white transition-all duration-300 border border-gray-800 hover:border-pbvsi-red hover:-translate-y-1 hover:shadow-lg">
                            <Youtube className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm text-center md:text-left">
                    &copy; {new Date().getFullYear()} PBVSI Sulawesi Utara. All rights reserved.
                </p>
                <div className="flex space-x-6 text-sm text-gray-500">
                    <a href="#" className="hover:text-white transition-colors hover:underline">Kebijakan Privasi</a>
                    <a href="#" className="hover:text-white transition-colors hover:underline">Syarat & Ketentuan</a>
                </div>
            </div>
        </div>

        <ChatWidget />
    </footer>
    </div>
  );
}

export default App;