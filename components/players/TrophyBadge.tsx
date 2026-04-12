'use client'

import { RARITY_COLORS } from '@/lib/utils'

interface TrophyBadgeProps {
  name: string
  description: string
  icon: string
  rarity: string
  unlocked: boolean
  awardedAt?: string | Date
}

export function TrophyBadge({ name, description, icon, rarity, unlocked, awardedAt }: TrophyBadgeProps) {
  const color = RARITY_COLORS[rarity] || '#6B7280'

  return (
    <div
      className={`relative group p-4 rounded-xl border transition-all duration-300 ${
        unlocked
          ? 'bg-dark-800 hover:scale-105 cursor-default'
          : 'bg-dark-900 opacity-40 grayscale'
      }`}
      style={{
        borderColor: unlocked ? `${color}40` : '#242438',
        boxShadow: unlocked ? `0 0 20px ${color}15` : 'none',
      }}
    >
      <div className="text-3xl mb-2">{unlocked ? icon : '🔒'}</div>
      <h4 className="font-gaming text-xs font-bold mb-1" style={{ color: unlocked ? color : '#6B7280' }}>
        {name}
      </h4>
      <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
      <div className="mt-2 flex items-center justify-between">
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color }}
        >
          {rarity}
        </span>
        {unlocked && awardedAt && (
          <span className="text-gray-600 text-[10px]">
            {new Date(awardedAt).toLocaleDateString('fr-FR')}
          </span>
        )}
      </div>
    </div>
  )
}
