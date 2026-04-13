'use client'

import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { RankBadge } from '@/components/players/RankBadge'
import { TrophyBadge } from '@/components/players/TrophyBadge'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GAME_NAMES } from '@/lib/utils'

const ALL_GAMES = ['lol', 'valorant', 'fc26', 'rocket_league', 'mario_kart', 'smash']

interface PlayerProfile {
  id: string
  pseudo: string
  firstName: string
  lastName: string
  className: string
  photo: string | null
  mainGame: string | null
  ranks: { game: string; rank: string }[]
  trophies: {
    trophy: { id: string; name: string; description: string; icon: string; rarity: string }
    awardedAt: string
  }[]
}

interface Trophy {
  id: string
  name: string
  description: string
  icon: string
  rarity: string
}

export function PlayerProfileClient({ player, allTrophies }: { player: PlayerProfile; allTrophies: Trophy[] }) {
  const unlockedIds = new Set(player.trophies.map((t) => t.trophy.id))

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        {/* Banner */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          {/* Header */}
          <motion.div
            className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-dark-900 shadow-lg">
              <img
                src={player.photo || `https://api.dicebear.com/9.x/thumbs/svg?seed=${player.pseudo}`}
                alt={player.pseudo}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="font-gaming text-2xl sm:text-3xl font-black text-white">{player.pseudo}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-gray-400">{player.className}</span>
                {player.mainGame && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                    {GAME_NAMES[player.mainGame]}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Ranks */}
          <ScrollReveal>
            <section className="mb-10">
              <h2 className="font-gaming text-lg font-bold text-white mb-4">
                Rangs <span className="text-gradient">par Jeu</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ALL_GAMES.map((game) => {
                  const rank = player.ranks.find((r) => r.game === game)
                  return (
                    <div key={game} className="card-gaming p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{GAME_NAMES[game]}</span>
                        {rank ? (
                          <RankBadge game={game} rank={rank.rank} showGame={false} size="sm" />
                        ) : (
                          <span className="text-xs text-gray-600 italic">Non classé</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </ScrollReveal>

          {/* Trophies */}
          <ScrollReveal>
            <section>
              <h2 className="font-gaming text-lg font-bold text-white mb-4">
                Trophées <span className="text-gradient">& Succès</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {allTrophies.map((trophy) => {
                  const awarded = player.trophies.find((t) => t.trophy.id === trophy.id)
                  return (
                    <TrophyBadge
                      key={trophy.id}
                      name={trophy.name}
                      description={trophy.description}
                      icon={trophy.icon}
                      rarity={trophy.rarity}
                      unlocked={unlockedIds.has(trophy.id)}
                      awardedAt={awarded?.awardedAt}
                    />
                  )
                })}
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  )
}
