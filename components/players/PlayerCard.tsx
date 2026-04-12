'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GAME_NAMES, RANK_COLORS } from '@/lib/utils'
import { RankBadge } from './RankBadge'

interface PlayerCardProps {
  player: {
    id: string
    pseudo: string
    firstName: string
    lastName: string
    className: string
    photo: string | null
    mainGame: string | null
    ranks: { game: string; rank: string }[]
  }
  index: number
}

export function PlayerCard({ player, index }: PlayerCardProps) {
  const mainRank = player.ranks.find((r) => r.game === player.mainGame)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/joueurs/${player.id}`}>
        <div className="card-gaming p-4 group cursor-pointer h-full">
          {/* Avatar */}
          <div className="relative mb-3 flex justify-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-dark-600 group-hover:border-neon-blue/50 transition-all duration-300">
              <img
                src={player.photo || `https://api.dicebear.com/9.x/thumbs/svg?seed=${player.pseudo}`}
                alt={player.pseudo}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-center">
            <h3 className="font-gaming text-sm font-bold text-white group-hover:text-neon-blue transition-colors">
              {player.pseudo}
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">
              {player.firstName} {player.lastName}
            </p>
            <p className="text-gray-600 text-xs">{player.className}</p>

            {/* Main game + rank */}
            {player.mainGame && (
              <div className="mt-3 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {GAME_NAMES[player.mainGame]}
                </span>
                {mainRank && (
                  <RankBadge game={mainRank.game} rank={mainRank.rank} showGame={false} size="sm" />
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
