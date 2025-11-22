

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Trophy, Clock, ChevronRight, Shield, ArrowLeft, Activity, CalendarX, AlertCircle, ChevronDown, Filter, Users, BarChart2, Radio } from 'lucide-react';
import EmptyState from './EmptyState';
import { Match, League } from '../types';

// Using hardcoded leagues for filtering context, but Matches come from props
const LEAGUES: League[] = [
    { id: 'div-utama-putra', name: 'Divisi Utama Putra', season: '2024/2025' },
    { id: 'div-utama-putri', name: 'Divisi Utama Putri', season: '2024/2025' },
    { id: 'kejurda-u19', name: 'Kejurda Junior U-19', season: '2024' },
];

interface MatchesPageProps {
    matches: Match[];
}

type Tab = 'live' | 'schedule' | 'results' | 'standings';
type DetailTab = 'summary' | 'stats' | 'lineups';

const MatchesPage: React.FC<MatchesPageProps> = ({ matches }) => {
  const [activeTab, setActiveTab] = useState<Tab>('schedule');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>('summary');
  
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>('div-utama-putra');
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedMatch]);

  // Check if there are any live matches to auto-switch tab or show indicator
  const liveMatchesCount = matches.filter(m => m.status === 'live' && m.leagueId === selectedLeagueId).length;

  const selectedLeagueInfo = LEAGUES.find(l => l.id === selectedLeagueId) || LEAGUES[0];

  // Filter Data based on selected League
  const filteredMatches = matches.filter(m => m.leagueId === selectedLeagueId);
  const liveMatches = filteredMatches.filter(m => m.status === 'live');
  const upcomingMatches = filteredMatches.filter(m => m.status === 'upcoming');
  const finishedMatches = filteredMatches.filter(m => m.status === 'finished');

  // --- DETAIL VIEW COMPONENT ---
  const renderMatchDetail = (match: Match) => {
    return (
        <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 relative font-sans">
            
            <div className="md:hidden fixed bottom-6 left-6 z-50 animate-fade-in-up delay-300">
                <button 
                    onClick={() => setSelectedMatch(null)}
                    className="bg-pbvsi-red text-white p-3 rounded-full shadow-2xl shadow-red-900/30 border border-red-500 flex items-center justify-center hover:bg-red-700 active:scale-95 transition-transform"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>
            </div>

            <div className="bg-gradient-to-b from-gray-950 to-gray-900 text-white py-8 md:py-12 px-4 relative overflow-hidden">
                <div className="absolute top-4 left-4 md:top-6 md:left-8 z-30 animate-fade-in-right">
                    <button 
                        onClick={() => setSelectedMatch(null)}
                        className="flex items-center px-3 py-2 md:px-4 md:py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs md:text-sm font-bold transition-all hover:pr-6 group shadow-lg"
                    >
                        <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                        Kembali
                    </button>
                </div>

                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <div className="relative max-w-5xl mx-auto mt-12 md:mt-0 animate-fade-in-up delay-100">
                    <div className="text-center mb-6 md:mb-8">
                        {match.status === 'live' && (
                             <span className="inline-flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-3 animate-pulse shadow-lg shadow-red-900/50">
                                <span className="w-2 h-2 bg-white rounded-full mr-2"></span> LIVE &bull; SET {match.currentSet}
                             </span>
                        )}
                        <div className="block">
                            <span className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] md:text-xs font-bold mb-2 tracking-wider uppercase border border-white/10 shadow-sm">
                                {match.category} &bull; {match.venue}
                            </span>
                        </div>
                        <p className="text-gray-400 text-xs md:text-sm flex items-center justify-center drop-shadow-sm">
                            <Calendar className="h-3 w-3 mr-1"/> {match.date} &bull; <Clock className="h-3 w-3 mx-1"/> {match.time}
                        </p>
                    </div>

                    <div className="flex flex-row items-center justify-center gap-2 md:gap-16">
                        {/* Team A */}
                        <div className="flex flex-col items-center w-1/3 md:w-auto animate-slide-in-left">
                            <div className="w-16 h-16 md:w-32 md:h-32 bg-white rounded-full p-1 shadow-2xl mb-3 md:mb-4 relative">
                                <img src={match.teamA.logo} alt={match.teamA.name} className="w-full h-full rounded-full object-cover border-2 md:border-4 border-gray-200" />
                                {match.status === 'live' && (match.scoreA || 0) > (match.scoreB || 0) && <div className="absolute -top-2 -right-2 bg-yellow-400 p-1 rounded-full shadow-sm border-2 border-white"><Trophy className="h-3 w-3 md:h-5 md:w-5 text-yellow-900" /></div>}
                            </div>
                            <h2 className="text-xs md:text-2xl font-bold text-center leading-tight drop-shadow-md line-clamp-2 md:line-clamp-none h-10 md:h-auto flex items-center justify-center">{match.teamA.name}</h2>
                        </div>

                        {/* Score Center */}
                        <div className="flex flex-col items-center justify-center w-1/3 md:w-auto px-2 animate-zoom-in delay-200">
                            {match.status !== 'upcoming' ? (
                                <>
                                    <div className="text-4xl md:text-7xl font-black tracking-tighter flex items-center gap-2 md:gap-4 drop-shadow-2xl">
                                        <span className={(match.scoreA || 0) > (match.scoreB || 0) ? 'text-white' : 'text-gray-500'}>{match.scoreA}</span>
                                        <span className="text-xl md:text-2xl text-gray-600">-</span>
                                        <span className={(match.scoreB || 0) > (match.scoreA || 0) ? 'text-white' : 'text-gray-500'}>{match.scoreB}</span>
                                    </div>
                                    <span className={`text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded mt-2 shadow-sm ${match.status === 'live' ? 'bg-red-600 animate-pulse' : 'bg-green-500'}`}>
                                        {match.status === 'live' ? 'SEDANG BERTANDING' : 'SELESAI'}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="text-2xl md:text-5xl font-black text-gray-500 drop-shadow-sm">VS</span>
                                    <span className="bg-pbvsi-red text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded mt-2 animate-pulse shadow-sm text-center whitespace-nowrap">AKAN DATANG</span>
                                </>
                            )}
                        </div>

                        {/* Team B */}
                        <div className="flex flex-col items-center w-1/3 md:w-auto animate-slide-in-right">
                            <div className="w-16 h-16 md:w-32 md:h-32 bg-white rounded-full p-1 shadow-2xl mb-3 md:mb-4 relative">
                                <img src={match.teamB.logo} alt={match.teamB.name} className="w-full h-full rounded-full object-cover border-2 md:border-4 border-gray-200" />
                                {match.status === 'live' && (match.scoreB || 0) > (match.scoreA || 0) && <div className="absolute -top-2 -right-2 bg-yellow-400 p-1 rounded-full shadow-sm border-2 border-white"><Trophy className="h-3 w-3 md:h-5 md:w-5 text-yellow-900" /></div>}
                            </div>
                            <h2 className="text-xs md:text-2xl font-bold text-center leading-tight drop-shadow-md line-clamp-2 md:line-clamp-none h-10 md:h-auto flex items-center justify-center">{match.teamB.name}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="max-w-5xl mx-auto px-4 mt-6 md:mt-8">
                <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide animate-fade-in-up delay-200">
                    <button 
                        onClick={() => setDetailTab('summary')}
                        className={`pb-3 md:pb-4 px-4 md:px-6 font-medium text-sm md:text-base whitespace-nowrap transition-colors border-b-2 ${detailTab === 'summary' ? 'border-pbvsi-red text-pbvsi-red font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Activity className="h-4 w-4 inline-block mr-2" /> Ringkasan
                    </button>
                    <button 
                        onClick={() => setDetailTab('stats')}
                        className={`pb-3 md:pb-4 px-4 md:px-6 font-medium text-sm md:text-base whitespace-nowrap transition-colors border-b-2 ${detailTab === 'stats' ? 'border-pbvsi-red text-pbvsi-red font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <BarChart2 className="h-4 w-4 inline-block mr-2" /> Statistik
                    </button>
                    <button 
                        onClick={() => setDetailTab('lineups')}
                        className={`pb-3 md:pb-4 px-4 md:px-6 font-medium text-sm md:text-base whitespace-nowrap transition-colors border-b-2 ${detailTab === 'lineups' ? 'border-pbvsi-red text-pbvsi-red font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Users className="h-4 w-4 inline-block mr-2" /> Line-up
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 min-h-[300px] animate-fade-in">
                    {/* SUMMARY TAB */}
                    {detailTab === 'summary' && (
                        <div className="space-y-8 animate-fade-in">
                             
                             {match.status !== 'upcoming' && match.sets && match.sets.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-center font-bold text-gray-900 mb-4">Rincian Skor Per Set</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full max-w-lg mx-auto text-center border-collapse">
                                            <thead>
                                                <tr className="text-xs text-gray-500 border-b border-gray-200">
                                                    <th className="pb-2 font-medium">Tim</th>
                                                    {match.sets.map((_, i) => <th key={i} className="pb-2 font-medium">Set {i + 1}</th>)}
                                                    <th className="pb-2 font-bold text-gray-900">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-gray-100">
                                                    <td className="py-3 font-bold text-gray-900 text-left pl-2">{match.teamA.name}</td>
                                                    {match.sets.map((s, i) => {
                                                        const score = s.split('-')[0];
                                                        const isWinner = parseInt(s.split('-')[0]) > parseInt(s.split('-')[1]);
                                                        return <td key={i} className={`py-3 ${isWinner ? 'font-bold text-pbvsi-red' : 'text-gray-600'}`}>{score}</td>;
                                                    })}
                                                    <td className="py-3 font-black text-lg">{match.scoreA}</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 font-bold text-gray-900 text-left pl-2">{match.teamB.name}</td>
                                                    {match.sets.map((s, i) => {
                                                        const score = s.split('-')[1];
                                                        const isWinner = parseInt(s.split('-')[1]) > parseInt(s.split('-')[0]);
                                                        return <td key={i} className={`py-3 ${isWinner ? 'font-bold text-pbvsi-red' : 'text-gray-600'}`}>{score}</td>;
                                                    })}
                                                    <td className="py-3 font-black text-lg">{match.scoreB}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                             )}

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Info Pertandingan</h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-600">Venue</span>
                                        <span className="font-medium text-gray-900 text-right">{match.venue}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-600">Kategori</span>
                                        <span className="font-medium text-gray-900 text-right">{match.category}</span>
                                    </li>
                                    <li className="flex justify-between pb-2">
                                        <span className="text-gray-600">Wasit Utama</span>
                                        <span className="font-medium text-gray-900">Bpk. Suryadi</span>
                                    </li>
                                </ul>
                            </div>
                            
                            {match.status === 'upcoming' && (
                                <div className="text-center py-6 text-gray-500">
                                    <Clock className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-4 text-gray-300" />
                                    <p className="text-sm md:text-base">Pertandingan belum dimulai. Skor langsung akan muncul di sini saat pertandingan dimulai.</p>
                                </div>
                            )}
                        </div>
                    )}
                    {/* PLACEHOLDERS FOR OTHER TABS */}
                    {(detailTab === 'stats' || detailTab === 'lineups') && (
                        <div className="text-center py-12 animate-fade-in">
                            <EmptyState 
                                icon={detailTab === 'stats' ? BarChart2 : Users}
                                title={detailTab === 'stats' ? "Statistik Belum Tersedia" : "Line-up Belum Dirilis"}
                                message="Data detail untuk bagian ini belum diinput oleh panitia pertandingan."
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  };

  // --- MAIN RENDER ---
  if (selectedMatch) {
      return renderMatchDetail(selectedMatch);
  }

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in pb-16 font-sans">
      <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white py-16 md:py-20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
         
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-down">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-full mb-4 border border-white/10 shadow-sm">
                <Trophy className="h-6 w-6 text-yellow-400 drop-shadow-sm" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">Jadwal & Hasil</h1>
            <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto drop-shadow-md">
                Pantau skor langsung, jadwal, dan hasil turnamen bola voli Sulawesi Utara.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8 animate-fade-in-up delay-100">
            <div className="flex justify-center md:justify-start mb-6 border-b border-gray-100 pb-4">
                <div className="relative inline-block text-left w-full md:w-auto z-20">
                    <button
                        onClick={() => setIsLeagueDropdownOpen(!isLeagueDropdownOpen)}
                        className="inline-flex justify-between w-full md:w-auto items-center px-4 md:px-6 py-3 border border-gray-200 shadow-sm text-sm font-bold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pbvsi-red transition-all active:scale-95"
                    >
                        <span className="flex flex-col text-left mr-4 md:mr-8 overflow-hidden">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Liga Terpilih</span>
                            <span className="text-sm md:text-lg truncate">{selectedLeagueInfo.name}</span>
                        </span>
                        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isLeagueDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isLeagueDropdownOpen && (
                        <div 
                            className="origin-top-left absolute left-0 mt-2 w-full md:w-72 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in overflow-hidden z-50"
                            onMouseLeave={() => setIsLeagueDropdownOpen(false)}
                        >
                            <div className="py-1">
                                {LEAGUES.map((league) => (
                                    <button
                                        key={league.id}
                                        onClick={() => {
                                            setSelectedLeagueId(league.id);
                                            setIsLeagueDropdownOpen(false);
                                        }}
                                        className={`flex items-center w-full px-4 py-3 text-sm font-bold text-left transition-colors ${
                                            selectedLeagueId === league.id 
                                            ? 'bg-red-50 text-pbvsi-red border-l-4 border-pbvsi-red' 
                                            : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                                        }`}
                                    >
                                        <div className="flex flex-col">
                                            <span>{league.name}</span>
                                            <span className="text-xs font-normal text-gray-400">{league.season}</span>
                                        </div>
                                        {selectedLeagueId === league.id && <Shield className="ml-auto h-4 w-4" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-2">
                <div className="flex bg-gray-100 rounded-lg p-1 w-full md:w-auto overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('live')}
                        className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-md text-xs md:text-sm font-bold transition-all whitespace-nowrap flex items-center ${
                            activeTab === 'live' ? 'bg-white text-red-600 shadow-sm transform scale-105 ring-1 ring-red-100' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <Radio className={`h-3 w-3 mr-1.5 ${liveMatchesCount > 0 ? 'animate-pulse text-red-500' : ''}`} />
                        Live Score
                        {liveMatchesCount > 0 && <span className="ml-2 bg-red-600 text-white text-[10px] px-1.5 rounded-full animate-pulse">{liveMatchesCount}</span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('schedule')}
                        className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-md text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === 'schedule' ? 'bg-white text-pbvsi-red shadow-sm transform scale-105' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Jadwal
                    </button>
                    <button
                        onClick={() => setActiveTab('results')}
                        className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-md text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === 'results' ? 'bg-white text-pbvsi-red shadow-sm transform scale-105' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Hasil
                    </button>
                    <button
                        onClick={() => setActiveTab('standings')}
                        className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-md text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === 'standings' ? 'bg-white text-pbvsi-red shadow-sm transform scale-105' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Klasemen
                    </button>
                </div>
                
                <div className="hidden md:block text-xs text-gray-400 font-medium flex items-center">
                    <Filter className="h-3 w-3 mr-1" />
                    {selectedLeagueInfo.name}
                </div>
            </div>
        </div>

        <div className="space-y-6">
            
            {/* LIVE MATCHES TAB */}
            {activeTab === 'live' && (
                <div className="space-y-4">
                    {liveMatches.length > 0 ? (
                        liveMatches.map((match, index) => (
                            <div 
                                key={match.id} 
                                onClick={() => setSelectedMatch(match)}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all border-2 border-red-500 cursor-pointer group animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="bg-red-600 text-white text-center py-2 font-bold text-xs md:text-sm tracking-widest flex justify-center items-center">
                                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                                    LIVE &bull; SET {match.currentSet || 1}
                                </div>
                                <div className="p-6 flex flex-col md:flex-row items-center justify-between">
                                    <div className="flex flex-col items-center w-full md:w-1/3">
                                        <img src={match.teamA.logo} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-gray-100 mb-2" alt="" />
                                        <h3 className="font-bold text-lg text-center">{match.teamA.name}</h3>
                                    </div>
                                    
                                    <div className="flex flex-col items-center px-4 my-4 md:my-0">
                                        <div className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter flex gap-4">
                                            <span>{match.scoreA}</span>
                                            <span className="text-gray-300">-</span>
                                            <span>{match.scoreB}</span>
                                        </div>
                                        <div className="mt-2 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                            Skor Sementara
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center w-full md:w-1/3">
                                        <img src={match.teamB.logo} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-gray-100 mb-2" alt="" />
                                        <h3 className="font-bold text-lg text-center">{match.teamB.name}</h3>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-xs text-gray-500 border-t border-gray-100">
                                    <span>{match.venue}</span>
                                    <span className="text-red-600 font-bold group-hover:underline">Lihat Detail Skor &rarr;</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <EmptyState 
                            icon={Radio}
                            title="Tidak Ada Pertandingan Live"
                            message={`Saat ini tidak ada pertandingan yang sedang berlangsung untuk ${selectedLeagueInfo.name}.`}
                        />
                    )}
                </div>
            )}

            {activeTab === 'schedule' && (
                <div className="space-y-4">
                    {upcomingMatches.length > 0 ? (
                        upcomingMatches.map((match, index) => (
                            <div 
                                key={match.id} 
                                onClick={() => setSelectedMatch(match)}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all border-l-4 border-pbvsi-red flex flex-col md:flex-row cursor-pointer group animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Date & Venue Column */}
                                <div className="bg-gray-50 p-4 md:p-6 w-full md:w-1/4 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-gray-100 gap-2">
                                    <div className="flex items-center text-pbvsi-red font-bold">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span className="text-sm md:text-base">{match.date}</span>
                                    </div>
                                    <div className="flex flex-col md:items-start items-end">
                                        <div className="flex items-center text-gray-600 text-xs md:text-sm mb-1">
                                            <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                                            {match.time}
                                        </div>
                                        <div className="flex items-center text-gray-500 text-[10px] md:text-xs">
                                            <MapPin className="h-3 w-3 mr-1 md:mr-2" />
                                            <span className="truncate max-w-[100px] md:max-w-none">{match.venue}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Matchup Column */}
                                <div className="p-4 md:p-6 w-full md:w-3/4 flex items-center justify-between relative">
                                    <div className="flex flex-col items-center w-1/3">
                                        <img src={match.teamA.logo} alt={match.teamA.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover mb-2 bg-gray-200 group-hover:scale-105 transition-transform duration-300" />
                                        <h3 className="font-bold text-center text-gray-900 text-xs md:text-sm lg:text-base line-clamp-2">{match.teamA.name}</h3>
                                    </div>

                                    <div className="flex flex-col items-center w-1/3 px-2">
                                        <span className="text-2xl md:text-3xl font-black text-gray-200 group-hover:text-pbvsi-red transition-colors">VS</span>
                                        <span className="bg-red-100 text-pbvsi-red text-[10px] md:text-xs font-bold px-2 py-1 rounded mt-2 text-center line-clamp-1">{match.category}</span>
                                        <span className="text-[10px] md:text-xs text-gray-400 mt-2 flex items-center">Detail <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform"/></span>
                                    </div>

                                    <div className="flex flex-col items-center w-1/3">
                                        <img src={match.teamB.logo} alt={match.teamB.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover mb-2 bg-gray-200 group-hover:scale-105 transition-transform duration-300" />
                                        <h3 className="font-bold text-center text-gray-900 text-xs md:text-sm lg:text-base line-clamp-2">{match.teamB.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <EmptyState 
                            icon={CalendarX}
                            title="Belum Ada Jadwal"
                            message={`Belum ada jadwal pertandingan yang akan datang untuk ${selectedLeagueInfo.name}.`}
                        />
                    )}
                </div>
            )}

            {activeTab === 'results' && (
                <div className="space-y-4">
                    {finishedMatches.length > 0 ? (
                        finishedMatches.map((match, index) => (
                            <div 
                                key={match.id} 
                                onClick={() => setSelectedMatch(match)}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col md:flex-row cursor-pointer group animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="bg-gray-900 text-white p-3 md:p-4 w-full md:w-1/6 flex flex-row md:flex-col justify-between md:justify-center items-center text-center">
                                    <span className="text-xs text-gray-400 md:mb-1">{match.date}</span>
                                    <span className="font-bold text-pbvsi-red group-hover:text-white transition-colors text-sm md:text-base">FULL TIME</span>
                                </div>
                                <div className="p-4 md:p-6 flex-1 flex items-center justify-between">
                                    <div className={`flex flex-col md:flex-row items-center flex-1 justify-end gap-2 md:gap-4 ${(match.scoreA || 0) > (match.scoreB || 0) ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                                        <span className="text-center md:text-right text-xs md:text-base order-2 md:order-1">{match.teamA.name}</span>
                                        <img src={match.teamA.logo} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 order-1 md:order-2" />
                                    </div>

                                    <div className="px-4 md:px-6 flex flex-col items-center justify-center">
                                        <div className="bg-gray-100 px-3 py-1 md:px-4 md:py-2 rounded-lg text-lg md:text-xl font-black tracking-widest text-gray-800 group-hover:bg-pbvsi-red group-hover:text-white transition-colors whitespace-nowrap shadow-inner">
                                            {match.scoreA} - {match.scoreB}
                                        </div>
                                        <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider hidden md:block">Lihat Detail</span>
                                    </div>

                                    <div className={`flex flex-col md:flex-row items-center flex-1 justify-start gap-2 md:gap-4 ${(match.scoreB || 0) > (match.scoreA || 0) ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                                        <img src={match.teamB.logo} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200" />
                                        <span className="text-center md:text-left text-xs md:text-base">{match.teamB.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <EmptyState 
                            icon={Activity}
                            title="Belum Ada Hasil"
                            message={`Belum ada pertandingan yang selesai untuk ${selectedLeagueInfo.name}.`}
                        />
                    )}
                </div>
            )}

            {activeTab === 'standings' && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
                     <div className="p-6">
                        <EmptyState 
                            icon={AlertCircle}
                            title="Klasemen Belum Tersedia"
                            message={`Tabel klasemen untuk ${selectedLeagueInfo.name} belum tersedia saat ini.`}
                        />
                     </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default MatchesPage;