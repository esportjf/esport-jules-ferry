'use client'

import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SupporterGrid } from '@/components/tournaments/SupporterGrid'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GAME_NAMES } from '@/lib/utils'

interface Slot {
  id: string
  game: string
  slotType: string
  slotIndex: number
  player: { pseudo: string; photo: string | null } | null
}

interface TournamentData {
  id: string
  name: string
  slots: Slot[]
  supporters: { id: string; name: string }[]
}

const GAME_ORDER = ['smash', 'mario_kart', 'fc26', 'rocket_league', 'lol', 'valorant']

function PlayerSlot({ slot }: { slot: Slot }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-dark-900/50">
      <div className={`w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ${!slot.player ? 'border border-dashed border-gray-600' : ''}`}>
        {slot.player ? (
          <img src={slot.player.photo || `https://api.dicebear.com/9.x/thumbs/svg?seed=${slot.player.pseudo}`} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-dark-900 text-gray-600 text-sm">?</div>
        )}
      </div>
      <span className="font-gaming text-xs font-bold text-white truncate">{slot.player?.pseudo || '—'}</span>
    </div>
  )
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

  const gameSlots: Record<string, Slot[]> = {}
  for (const slot of tournament.slots) {
    if (!gameSlots[slot.game]) gameSlots[slot.game] = []
    gameSlots[slot.game].push(slot)
  }

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <div className="relative py-16 mb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-dark-800 to-purple-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-5xl mb-4 block">☀️</span>
              <h1 className="font-gaming text-3xl sm:text-4xl font-black text-white mb-2">{tournament.name}</h1>
              <p className="text-gray-400 mb-4">Athletica — Eaubonne</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/20">
                <span className="text-neon-purple text-sm font-medium">24 joueurs + 16 supporters — 6 jeux</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm text-center">
              ⚠️ Chaque élève ne peut participer qu&apos;à un seul jeu.
            </div>
          </ScrollReveal>

          {GAME_ORDER.map((game) => {
            const slots = gameSlots[game]
            if (!slots) return null

            const binomeBoy = slots.find((s) => s.slotType === 'binome_boy')
            const binomeGirl = slots.find((s) => s.slotType === 'binome_girl')
            const solos = slots.filter((s) => s.slotType === 'solo')
            const team = slots.filter((s) => s.slotType === 'team_member')

            return (
              <ScrollReveal key={game}>
                <section className="mb-8">
                  <h3 className="font-gaming text-base font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-purple" />
                    {GAME_NAMES[game]}
                  </h3>

                  <div className="space-y-3">
                    {/* Binome card */}
                    {binomeBoy && binomeGirl && (
                      <div className="rounded-xl border-2 border-neon-purple/30 bg-gradient-to-r from-neon-purple/5 to-dark-800 p-4">
                        <span className="text-[10px] font-bold text-neon-purple uppercase tracking-wider mb-3 block">Binôme mixte</span>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-[10px] text-gray-500 block mb-1">Garçon</span>
                            <PlayerSlot slot={binomeBoy} />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block mb-1">Fille</span>
                            <PlayerSlot slot={binomeGirl} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Solos */}
                    {solos.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {solos.map((slot) => (
                          <div key={slot.id} className="card-gaming p-3">
                            <span className="text-[10px] text-gray-500 block mb-1">Solo</span>
                            <PlayerSlot slot={slot} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Team */}
                    {team.length > 0 && (
                      <div className="card-gaming p-4">
                        <span className="text-[10px] font-bold text-neon-pink uppercase tracking-wider mb-3 block">Équipe de {team.length}</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                          {team.map((slot) => (
                            <PlayerSlot key={slot.id} slot={slot} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </ScrollReveal>
            )
          })}

          <ScrollReveal>
            <section className="mt-12">
              <h3 className="font-gaming text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-pink" />
                Supporters (16 places)
              </h3>
              <SupporterGrid supporters={tournament.supporters} maxSlots={16} />
            </section>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  )
}
