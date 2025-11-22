

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
  content?: string[]; // Array of paragraphs
}

export interface Organizer {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

export enum Sender {
  USER = 'user',
  AI = 'model'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}

export interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
}

export interface Team {
  id?: string;
  name: string;
  logo: string;
}

export interface Match {
  id: string;
  leagueId: string;
  status: 'upcoming' | 'live' | 'finished';
  date: string;
  time: string;
  venue: string;
  category: string;
  teamA: Team;
  teamB: Team;
  scoreA?: number; // Total Sets Won
  scoreB?: number; // Total Sets Won
  sets?: string[]; // Array of set scores e.g., ["25-20", "18-25"]
  currentSet?: number;
}

export interface League {
  id: string;
  name: string;
  season: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  url: string;
}

export interface DocumentItem {
  id: number;
  title: string;
  category: string;
  type: string;
  size: string;
  date: string;
  url?: string; // Base64 data or URL
}

export interface CareerHistory {
  year: string;
  team: string;
  role?: string; // Made optional to support older player data
  achievement?: string;
}

export interface Player {
  id: number;
  name: string;
  club: string;
  position: string;
  imageUrl: string;
  age?: number;
  height?: number;
  weight?: number;
  spike?: number;
  block?: number;
  hand?: string;
  bio?: string;
  career?: CareerHistory[];
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  website?: string;
}

export interface SquadMember {
  number: number;
  name: string;
  position: string;
}

export interface ClubCoach {
  name: string;
  role: string;
  license?: string;
  imageUrl?: string;
}

export interface Club {
  id: number;
  name: string;
  logoUrl: string;
  city: string;
  status: string;
  coach?: string;
  founded?: string;
  address?: string;
  description?: string;
  socials?: SocialLinks;
  squad: SquadMember[];
  achievements: string[];
  coaches?: ClubCoach[];
}