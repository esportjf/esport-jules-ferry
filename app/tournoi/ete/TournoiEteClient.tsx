'use client'

import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SlotCard } from '@/components/tournaments/SlotCard'
import { SupporterGrid } from '@/components/tournaments/SupporterGrid'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GAME_NAMES } from '@/lib/utils'

interface TournamentData {
  id: string
  name: string
  season: string
  year: number
  slots: {
    id: string
    game: string
    slotType: string
    slotIndex: number
    player: { pseudo: string; firstName: string; lastName: string; photo: string | null } | null
  }[]
  supporters: {
    player: { pseudo: string; firstName: string; lastName: string; photo: string | null }
  }[]
}

const GAME_ORDER = ['smash', 'mario_kart', 'fc26', 'rocket_league', 'lol', 'valorant']
const GAME_DESCRIPTIONS: Record<string, string> = {
  smash: '1 binôme mixte (1G + 1F) + 2 joueurs solo — 4 slots',
  mario_kart: '1 binôme mixte (1G + 1F) + 2 joueurs solo — 4 slots',
  fc26: '1 binôme mixte (1G + 1F) + 2 joueurs solo — 4 slots',
  rocket_league: '1 binôme (2 joueurs) — 2 slots',
  lol: '1 équipe de 5 — 5 slots',
  valorant: '1 équipe de 5 — 5 slots',
}

export function TournoiEteClient({ tournament }: { tournament: TournamentData | null }) {
  if (!tournament) {
    return (
      <PageTransition>
        <div className="pt-24 pb-16 text-center">
          <p className="text-gray-500">Aucun tournoi d&apos;été n&apos;a encore été créé.</p>
        </div>
      </PageTransition>
    )
  }

  const gameSlots: Record<string, typeof tournament.slots> = {}
  for (const slot of tournament.slots) {
    if (!gameSlots[slot.game]) gameSlots[slot.game] = []
    gameSlots[slot.game].push(slot)
  }

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="relative py-16 mb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-dark-800 to-orange-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,165,0,0.08)_0%,transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-5xl mb-4 block">☀️</span>
              <h1 className="font-gaming text-3xl sm:text-4xl font-black text-white mb-2">{tournament.name}</h1>
              <p className="text-gray-400 mb-4">Athletica — Eaubonne</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                <span className="text-orange-400 text-sm font-medium">24 joueurs + 16 supporters — 6 jeux</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Constraint */}
          <ScrollReveal>
            <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm text-center">
              ⚠️ Chaque élève ne peut participer qu&apos;à un seul jeu.
            </div>
          </ScrollReveal>

          {/* Game slots */}
          {GAME_ORDER.map((game) => {
            const slots = gameSlots[game]
            if (!slots) return null
            return (
              <ScrollReveal key={game}>
                <section className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-gaming text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-400" />
                      {GAME_NAMES[game] || game}
                    </h3>
                    <span className="text-xs text-gray-500">{GAME_DESCRIPTIONS[game]}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {slots.map((slot) => (
                      <SlotCard key={slot.id} slotType={slot.slotType} player={slot.player} golden />
                    ))}
                  </div>
                </section>
              </ScrollReveal>
            )
          })}

          {/* Supporters */}
          <ScrollReveal>
            <section className="mt-12">
              <h3 className="font-gaming text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-pink" />
                Supporters (16 places)
              </h3>
              <SupporterGrid supporters={tournament.supporters} />
            </section>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  )
}
