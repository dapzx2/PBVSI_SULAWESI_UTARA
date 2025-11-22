
import { NewsItem, Match, GalleryItem, DocumentItem, Player, Club } from '../types';
import { MOCK_NEWS, MOCK_MATCHES, MOCK_GALLERY, MOCK_DOCUMENTS, MOCK_PLAYERS_MEN, MOCK_PLAYERS_WOMEN, MOCK_CLUBS } from './mockData';

// Ganti URL ini sesuai dengan alamat server backend MySQL Anda nanti
const API_BASE_URL = 'http://localhost:3000/api';

const headers = {
  'Content-Type': 'application/json',
};

/**
 * HYBRID FETCHER
 * Mencoba mengambil data dari Database (API).
 * Jika gagal (server mati/belum ada), kembalikan Data Dummy (Mock).
 */
async function fetchWithFallback<T>(endpoint: string, mockData: T): Promise<T> {
  try {
    // Set timeout pendek agar tidak menunggu lama jika server mati
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 detik timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    console.log(`[API] Connected to MySQL for ${endpoint}`);
    return data;
  } catch (error) {
    console.warn(`[API] Backend offline/missing for ${endpoint}. Using Mock Data.`);
    return mockData;
  }
}

// Simulating CREATE/UPDATE/DELETE locally if API fails is complex without backend state.
// For now, if API fails, we just return the item as if it succeeded (Optimistic UI for Demo).
async function postWithFallback<T>(endpoint: string, data: any, mockReturn: T): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('API Error');
        return await response.json();
    } catch (error) {
        console.warn(`[API] Backend offline. Simulating CREATE for ${endpoint}`);
        // Simulate ID generation
        return { ...data, id: Math.floor(Math.random() * 10000) } as unknown as T;
    }
}

async function putWithFallback<T>(endpoint: string, data: any): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('API Error');
        return await response.json();
    } catch (error) {
        console.warn(`[API] Backend offline. Simulating UPDATE for ${endpoint}`);
        return data as T;
    }
}

async function deleteWithFallback(endpoint: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('API Error');
        return true;
    } catch (error) {
        console.warn(`[API] Backend offline. Simulating DELETE for ${endpoint}`);
        return true;
    }
}


// --- NEWS ---
export const apiNews = {
  getAll: () => fetchWithFallback<NewsItem[]>('/news', MOCK_NEWS),
  create: (item: Omit<NewsItem, 'id'>) => postWithFallback<NewsItem>('/news', item, {} as NewsItem),
  update: (item: NewsItem) => putWithFallback<NewsItem>(`/news/${item.id}`, item),
  delete: (id: number) => deleteWithFallback(`/news/${id}`),
};

// --- MATCHES ---
export const apiMatches = {
  getAll: () => fetchWithFallback<Match[]>('/matches', MOCK_MATCHES),
  create: (item: Match) => postWithFallback<Match>('/matches', item, {} as Match),
  update: (item: Match) => putWithFallback<Match>(`/matches/${item.id}`, item),
  delete: (id: string) => deleteWithFallback(`/matches/${id}`),
};

// --- GALLERY ---
export const apiGallery = {
  getAll: () => fetchWithFallback<GalleryItem[]>('/gallery', MOCK_GALLERY),
  create: (item: Omit<GalleryItem, 'id'>) => postWithFallback<GalleryItem>('/gallery', item, {} as GalleryItem),
  update: (item: GalleryItem) => putWithFallback<GalleryItem>(`/gallery/${item.id}`, item),
  delete: (id: number) => deleteWithFallback(`/gallery/${id}`),
};

// --- DOCUMENTS ---
export const apiDocs = {
  getAll: () => fetchWithFallback<DocumentItem[]>('/documents', MOCK_DOCUMENTS),
  create: (item: Omit<DocumentItem, 'id'>) => postWithFallback<DocumentItem>('/documents', item, {} as DocumentItem),
  update: (item: DocumentItem) => putWithFallback<DocumentItem>(`/documents/${item.id}`, item),
  delete: (id: number) => deleteWithFallback(`/documents/${id}`),
};

// --- PLAYERS ---
export const apiPlayers = {
  getAllMen: () => fetchWithFallback<Player[]>('/players?gender=Men', MOCK_PLAYERS_MEN),
  getAllWomen: () => fetchWithFallback<Player[]>('/players?gender=Women', MOCK_PLAYERS_WOMEN),
  create: (item: Omit<Player, 'id'> & { gender: 'Men' | 'Women' }) => postWithFallback<Player>('/players', item, {} as Player),
  update: (item: Player) => putWithFallback<Player>(`/players/${item.id}`, item),
  delete: (id: number) => deleteWithFallback(`/players/${id}`),
};

// --- CLUBS ---
export const apiClubs = {
  getAll: () => fetchWithFallback<Club[]>('/clubs', MOCK_CLUBS),
  create: (item: Omit<Club, 'id'>) => postWithFallback<Club>('/clubs', item, {} as Club),
  update: (item: Club) => putWithFallback<Club>(`/clubs/${item.id}`, item),
  delete: (id: number) => deleteWithFallback(`/clubs/${id}`),
};
