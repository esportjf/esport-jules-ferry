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

function BinomeCard({ boy, girl, game }: { boy: Slot; girl: Slot; game: string }) {
  return (
    <div className="rounded-xl border-2 border-neon-purple/30 bg-gradient-to-br from-neon-purple/5 to-dark-800 p-5 glow-purple">
      <h4 className="font-gaming text-sm font-bold text-neon-purple mb-4 text-center">{GAME_NAMES[game]}</h4>
      <div className="flex items-center justify-center gap-4">
        {[boy, girl].map((slot) => (
          <div key={slot.id} className="text-center">
            <div className={`w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 ${slot.player ? 'border-neon-purple/50' : 'border-dashed border-gray-600'}`}>
              {slot.player ? (
                <img src={slot.player.photo || `https://api.dicebear.com/9.x/thumbs/svg?seed=${slot.player.pseudo}`} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-dark-900 text-gray-600 text-lg">?</div>
              )}
            </div>
            <p className="font-gaming text-xs font-bold text-white">{slot.player?.pseudo || '—'}</p>
            <span className="text-[10px] text-gray-500">{slot.slotType === 'binome_boy' ? 'Garçon' : 'Fille'}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20">Binôme mixte</span>
      </div>
    </div>
  )
}

export function TournoiHiverClient({ tournament }: { tournament: TournamentData | null }) {
  if (!tournament) {
    return (
      <PageTransition>
        <div className="pt-24 pb-16 text-center">
          <p className="text-gray-500">Aucun tournoi d&apos;hiver n&apos;a encore été créé.</p>
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
        {/* Header */}
        <div className="relative py-16 mb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-dark-800 to-purple-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1)_0%,transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-5xl mb-4 block">❄️</span>
              <h1 className="font-gaming text-3xl sm:text-4xl font-black text-white mb-2">{tournament.name}</h1>
              <p className="text-gray-400 mb-4">Campus Cyber — Puteaux</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/20">
                <span className="text-neon-purple text-sm font-medium">4 joueurs + 4 supporters</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm text-center">
              ⚠️ Chaque élève ne peut participer qu&apos;à un seul jeu.
            </div>
          </ScrollReveal>

          {/* Binomes */}
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {Object.entries(gameSlots).map(([game, slots]) => {
                const boy = slots.find((s) => s.slotType === 'binome_boy')!
                const girl = slots.find((s) => s.slotType === 'binome_girl')!
                return <BinomeCard key={game} boy={boy} girl={girl} game={game} />
              })}
            </div>
          </ScrollReveal>

          {/* Supporters */}
          <ScrollReveal>
            <section>
              <h3 className="font-gaming text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-pink" />
                Supporters (4 places)
              </h3>
              <SupporterGrid supporters={tournament.supporters} maxSlots={4} />
            </section>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  )
}
