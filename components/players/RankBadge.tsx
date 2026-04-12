'use client'

import { RANK_COLORS, GAME_NAMES } from '@/lib/utils'

const RANK_ICONS: Record<string, string> = {
  'Fer': '🪨',
  'Bronze': '🥉',
  'Argent': '🥈',
  'Or': '🥇',
  'Platine': '💠',
  'Diamant': '💎',
  'Maître': '🔮',
  'Grand Maître': '🌟',
  'Challenger': '👑',
}

interface RankBadgeProps {
  game: string
  rank: string
  showGame?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function RankBadge({ game, rank, showGame = true, size = 'md' }: RankBadgeProps) {
  const color = RANK_COLORS[rank] || '#6B7280'
  const icon = RANK_ICONS[rank] || '❓'

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-lg font-medium ${sizeClasses[size]}`}
      style={{
        backgroundColor: `${color}15`,
        border: `1px solid ${color}40`,
        color: color,
      }}
    >
      <span>{icon}</span>
      <span>{rank}</span>
      {showGame && (
        <span className="text-gray-500 text-xs ml-1">— {GAME_NAMES[game] || game}</span>
      )}
    </div>
  )
}
