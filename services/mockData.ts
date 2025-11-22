

import { NewsItem, Match, GalleryItem, DocumentItem, Player, Club } from '../types';

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Tim Putri Sulut Lolos ke PON XXI 2024',
    excerpt: 'Sejarah baru tercipta, tim bola voli putri Sulawesi Utara memastikan tiket ke Pekan Olahraga Nasional.',
    date: '2024-05-20',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1000&auto=format&fit=crop',
    category: 'Kompetisi',
    content: [
        'Tim bola voli putri Sulawesi Utara mencetak sejarah dengan lolos ke PON XXI Aceh-Sumut 2024. Kepastian ini didapat setelah mereka mengalahkan tim kuat Sulawesi Selatan di babak kualifikasi zona Sulawesi.',
        'Pertandingan yang berlangsung sengit di GOR Sudiang Makassar tersebut berakhir dengan skor 3-1. Pelatih Kepala mengungkapkan rasa bangganya atas perjuangan tak kenal lelah para atlet.'
    ]
  },
  {
    id: 2,
    title: 'Pelatihan Wasit Nasional Digelar di Manado',
    excerpt: 'PBVSI Sulut menggelar penataran wasit tingkat nasional untuk meningkatkan kualitas perangkat pertandingan daerah.',
    date: '2024-06-10',
    imageUrl: 'https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=1000&auto=format&fit=crop',
    category: 'Edukasi'
  },
  {
    id: 3,
    title: 'Pembangunan GOR Voli Standar Internasional Dimulai',
    excerpt: 'Gubernur Sulawesi Utara meletakkan batu pertama pembangunan gelanggang olahraga khusus bola voli.',
    date: '2024-04-15',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    category: 'Infrastruktur'
  }
];

export const MOCK_MATCHES: Match[] = [
    {
        id: 'm-live-1',
        leagueId: 'div-utama-putra',
        status: 'live',
        date: 'Hari Ini',
        time: 'Sedang Berlangsung',
        venue: 'GOR KONI Sario',
        category: 'Semifinal',
        teamA: { id: 't-live-1', name: 'Bank SulutGo', logo: 'https://ui-avatars.com/api/?name=Bank+SulutGo&background=0D8ABC&color=fff' },
        teamB: { id: 't-live-2', name: 'Bhayangkara Sulut', logo: 'https://ui-avatars.com/api/?name=Bhayangkara&background=FFD700&color=000' },
        scoreA: 2,
        scoreB: 1,
        currentSet: 4,
        sets: ['25-20', '22-25', '25-18', '10-8']
    },
    {
        id: 'm1',
        leagueId: 'div-utama-putra',
        status: 'upcoming',
        date: '2024-08-15',
        time: '14:00',
        venue: 'GOR KONI Sario',
        category: 'Penyisihan Grup A',
        teamA: { id: 't1', name: 'JLE Elektrik', logo: 'https://ui-avatars.com/api/?name=JLE+Elektrik&background=FF0000&color=fff' },
        teamB: { id: 't2', name: 'Bright Jos', logo: 'https://ui-avatars.com/api/?name=Bright+Jos&background=0000FF&color=fff' }
    },
    {
        id: 'm2',
        leagueId: 'div-utama-putra',
        status: 'finished',
        date: '2024-08-10',
        time: '16:00',
        venue: 'GOR KONI Sario',
        category: 'Penyisihan Grup B',
        teamA: { id: 't3', name: 'Bhayangkara Sulut', logo: 'https://ui-avatars.com/api/?name=Bhayangkara&background=FFD700&color=000' },
        teamB: { id: 't4', name: 'PLN Suluttenggo', logo: 'https://ui-avatars.com/api/?name=PLN&background=00A3E0&color=fff' },
        scoreA: 3,
        scoreB: 1,
        sets: ['25-20', '25-22', '19-25', '25-18']
    }
];

export const MOCK_GALLERY: GalleryItem[] = [
  { id: 1, title: 'Final Kejurda 2023', category: 'Pertandingan', url: 'https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Latihan Tim PON', category: 'Latihan', url: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Pelantikan Pengurus', category: 'Seremonial', url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop' },
];

export const MOCK_DOCUMENTS: DocumentItem[] = [
    { id: 1, title: 'AD/ART PBVSI 2024', category: 'Regulasi', type: 'PDF', size: '2.4 MB', date: '2024-01-10' },
    { id: 2, title: 'Peraturan Teknis Pertandingan', category: 'Regulasi', type: 'PDF', size: '1.1 MB', date: '2024-02-15' },
    { id: 3, title: 'Formulir Pendaftaran Klub', category: 'Formulir', type: 'DOCX', size: '500 KB', date: '2024-03-01' },
    { id: 4, title: 'Laporan Keuangan Triwulan I', category: 'Transparansi', type: 'XLSX', size: '800 KB', date: '2024-04-10' },
];

export const MOCK_PLAYERS_MEN: Player[] = [
  { 
      id: 1, name: 'Rivan Nurmulki (Kw)', club: 'Bank SulutGo', position: 'Opposite', imageUrl: 'https://ui-avatars.com/api/?name=Rivan&background=random',
      height: 195, weight: 85, age: 28, spike: 350, block: 335, hand: 'Kanan',
      bio: 'Salah satu pemain terbaik yang dimiliki Sulawesi Utara saat ini.',
      career: [{year: '2022', team: 'Timnas', achievement: 'Emas SEA Games'}] 
  },
  { 
      id: 2, name: 'Doni Haryono (Kw)', club: 'Bhayangkara Sulut', position: 'Outside Hitter', imageUrl: 'https://ui-avatars.com/api/?name=Doni&background=random',
      height: 188, weight: 80, age: 25, spike: 340, block: 320, hand: 'Kanan'
  },
];

export const MOCK_PLAYERS_WOMEN: Player[] = [
  { 
      id: 101, name: 'Megawati (Kw)', club: 'JLE Elektrik', position: 'Opposite', imageUrl: 'https://ui-avatars.com/api/?name=Megawati&background=random',
      height: 185, weight: 70, age: 24, spike: 310, block: 295, hand: 'Kanan'
  },
  { 
      id: 102, name: 'Wilda (Kw)', club: 'PLN Suluttenggo', position: 'Middle Blocker', imageUrl: 'https://ui-avatars.com/api/?name=Wilda&background=random',
      height: 178, weight: 65, age: 29, spike: 290, block: 285, hand: 'Kanan'
  },
];

export const MOCK_CLUBS: Club[] = [
  {
    id: 1, name: 'Bank SulutGo Volley', logoUrl: 'https://ui-avatars.com/api/?name=BSG&background=0D8ABC&color=fff', city: 'Manado', status: 'Aktif', coach: 'Mr. X', founded: '2010',
    squad: [], achievements: ['Juara 1 Livoli 2023', 'Runner Up Kejurda 2022'],
    socials: { instagram: '@bsgvolley' }
  },
  {
    id: 2, name: 'JLE Elektrik', logoUrl: 'https://ui-avatars.com/api/?name=JLE&background=FF0000&color=fff', city: 'Tomohon', status: 'Aktif', coach: 'Coach Y', founded: '2015',
    squad: [], achievements: ['Juara 2 Livoli 2023']
  }
];