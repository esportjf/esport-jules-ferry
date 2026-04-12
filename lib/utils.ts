export const GAME_NAMES: Record<string, string> = {
  lol: 'League of Legends',
  valorant: 'Valorant',
  fc26: 'FC 26',
  rocket_league: 'Rocket League',
  mario_kart: 'Mario Kart 8',
  smash: 'Super Smash Bros',
}

export const GAME_PLATFORMS: Record<string, string> = {
  lol: 'PC',
  valorant: 'PC',
  fc26: 'PS5',
  rocket_league: 'PS5',
  mario_kart: 'Nintendo Switch',
  smash: 'Nintendo Switch',
}

export const GAME_COLORS: Record<string, string> = {
  lol: '#C89B3C',
  valorant: '#FF4655',
  fc26: '#00A859',
  rocket_league: '#0078F2',
  mario_kart: '#E60012',
  smash: '#FF0000',
}

export const RANK_ORDER = ['Fer', 'Bronze', 'Argent', 'Or', 'Platine', 'Diamant', 'Maître', 'Grand Maître', 'Challenger']

export const RANK_COLORS: Record<string, string> = {
  'Fer': '#6B7280',
  'Bronze': '#CD7F32',
  'Argent': '#C0C0C0',
  'Or': '#FFD700',
  'Platine': '#00CED1',
  'Diamant': '#B9F2FF',
  'Maître': '#9B59B6',
  'Grand Maître': '#E74C3C',
  'Challenger': '#F1C40F',
}

export const RARITY_COLORS: Record<string, string> = {
  'Commun': '#9CA3AF',
  'Rare': '#3B82F6',
  'Épique': '#8B5CF6',
  'Légendaire': '#F59E0B',
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
