'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayerCard } from '@/components/players/PlayerCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { GAME_NAMES, RANK_ORDER } from '@/lib/utils'

interface Player {
  id: string
  pseudo: string
  firstName: string
  lastName: string
  className: string
  photo: string | null
  mainGame: string | null
  ranks: { game: string; rank: string }[]
}

const ALL_GAMES = ['lol', 'valorant', 'fc26', 'rocket_league', 'mario_kart', 'smash']

export function JoueursClient({ players }: { players: Player[] }) {
  const [gameFilter, setGameFilter] = useState<string>('all')
  const [rankFilter, setRankFilter] = useState<string>('all')

  const filtered = players.filter((p) => {
    if (gameFilter !== 'all' && p.mainGame !== gameFilter) return false
    if (rankFilter !== 'all') {
      const hasRank = p.ranks.some((r) => r.rank === rankFilter)
      if (!hasRank) return false
    }
    return true
  })

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-gaming text-3xl sm:text-4xl font-black text-white mb-2">
              Nos <span className="text-gradient">Joueurs</span>
            </h1>
            <p className="text-gray-500">Les 20 talents de la section e-sport</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <select
              value={gameFilter}
              onChange={(e) => setGameFilter(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded-lg px-4 py-2 text-sm text-gray-300 focus:border-neon-blue focus:outline-none"
            >
              <option value="all">Tous les jeux</option>
              {ALL_GAMES.map((g) => (
                <option key={g} value={g}>{GAME_NAMES[g]}</option>
              ))}
            </select>

            <select
              value={rankFilter}
              onChange={(e) => setRankFilter(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded-lg px-4 py-2 text-sm text-gray-300 focus:border-neon-blue focus:outline-none"
            >
              <option value="all">Tous les rangs</option>
              {RANK_ORDER.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <span className="text-gray-600 text-sm">{filtered.length} joueur{filtered.length > 1 ? 's' : ''}</span>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((player, i) => (
              <PlayerCard key={player.id} player={player} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Aucun joueur ne correspond aux filtres sélectionnés.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
