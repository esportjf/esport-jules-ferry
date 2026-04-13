'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { RankBadge } from '@/components/players/RankBadge'
import { TrophyBadge } from '@/components/players/TrophyBadge'
import { StatChart } from '@/components/players/StatChart'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GAME_NAMES, GAME_COLORS } from '@/lib/utils'

const ALL_GAMES = ['lol', 'valorant', 'fc26', 'rocket_league', 'mario_kart', 'smash']

const STAT_KEYS: Record<string, { key: string; label: string; color: string }[]> = {
  lol: [
    { key: 'kda', label: 'KDA', color: '#C89B3C' },
    { key: 'csPerMin', label: 'CS/min', color: '#00D4FF' },
    { key: 'winrate', label: 'Winrate %', color: '#8B5CF6' },
  ],
  valorant: [
    { key: 'kda', label: 'KDA', color: '#FF4655' },
    { key: 'headshotPct', label: 'HS %', color: '#00D4FF' },
    { key: 'winrate', label: 'Winrate %', color: '#8B5CF6' },
  ],
  fc26: [
    { key: 'goalsPerMatch', label: 'Buts/match', color: '#00A859' },
    { key: 'assistsPerMatch', label: 'Passes D./match', color: '#00D4FF' },
    { key: 'winrate', label: 'Winrate %', color: '#8B5CF6' },
  ],
  rocket_league: [
    { key: 'goalsPerMatch', label: 'Buts/match', color: '#0078F2' },
    { key: 'savesPerMatch', label: 'Saves/match', color: '#00D4FF' },
    { key: 'winrate', label: 'Winrate %', color: '#8B5CF6' },
  ],
  mario_kart: [
    { key: 'avgPosition', label: 'Position moy.', color: '#E60012' },
    { key: 'firstPlaces', label: '1ères places', color: '#FFD700' },
    { key: 'winrate', label: 'Winrate %', color: '#8B5CF6' },
  ],
  smash: [
    { key: 'avgKOs', label: 'KOs moyens', color: '#FF0000' },
    { key: 'winrate', label: 'Winrate %', color: '#8B5CF6' },
  ],
}

interface Props {
  player: any
  allTrophies: any[]
}

export function MonProfilClient({ player, allTrophies }: Props) {
  const [statForm, setStatForm] = useState({ game: player.mainGame || 'lol', date: new Date().toISOString().split('T')[0], data: '' })
  const [message, setMessage] = useState('')
  const [photo, setPhoto] = useState(player.photo)
  const unlockedIds = new Set(player.trophies.map((t: any) => t.trophy.id))

  // Group stats by game
  const statsByGame: Record<string, any[]> = {}
  for (const stat of player.stats) {
    if (!statsByGame[stat.game]) statsByGame[stat.game] = []
    statsByGame[stat.game].push({
      date: new Date(stat.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      ...JSON.parse(stat.data),
    })
  }

  const addStat = async () => {
    try {
      const dataObj = JSON.parse(statForm.data)
      const res = await fetch(`/api/players/${player.id}/stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game: statForm.game,
          date: statForm.date,
          data: dataObj,
        }),
      })
      if (res.ok) {
        setMessage('Stats ajoutées ! Rafraîchis la page pour voir les graphiques.')
        setStatForm({ ...statForm, data: '' })
      } else {
        const err = await res.json()
        setMessage(err.error || 'Erreur')
      }
    } catch {
      setMessage('JSON invalide. Ex: {"kda": 3.2, "winrate": 55}')
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 500000) { setMessage('Image trop lourde (max 500KB)'); return }
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result as string
      const res = await fetch(`/api/players/${player.id}/photo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo: base64 }),
      })
      if (res.ok) { setPhoto(base64); setMessage('Photo mise à jour !') }
      else { setMessage('Erreur lors de l\'upload') }
    }
    reader.readAsDataURL(file)
  }

  const inputClass = 'bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white focus:border-neon-purple focus:outline-none w-full'

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        {/* Banner */}
        <div className="relative h-40 md:h-56 bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
          {/* Header */}
          <motion.div
            className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-dark-900">
                <img src={photo || `https://api.dicebear.com/9.x/thumbs/svg?seed=${player.pseudo}`} alt="" className="w-full h-full object-cover" />
              </div>
              <label className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-xs">Changer</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="font-gaming text-2xl font-black text-white">{player.pseudo}</h1>
              <p className="text-gray-400 text-sm">{player.className}</p>
            </div>
          </motion.div>

          {/* Ranks */}
          <ScrollReveal>
            <section className="mb-10">
              <h2 className="font-gaming text-lg font-bold text-white mb-4">Mes <span className="text-gradient">Rangs</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ALL_GAMES.map((game) => {
                  const rank = player.ranks.find((r: any) => r.game === game)
                  return (
                    <div key={game} className="card-gaming p-4 flex items-center justify-between">
                      <span className="text-xs text-gray-400">{GAME_NAMES[game]}</span>
                      {rank ? <RankBadge game={game} rank={rank.rank} showGame={false} size="sm" /> : <span className="text-xs text-gray-600 italic">Non classé</span>}
                    </div>
                  )
                })}
              </div>
            </section>
          </ScrollReveal>

          {/* Trophies */}
          <ScrollReveal>
            <section className="mb-10">
              <h2 className="font-gaming text-lg font-bold text-white mb-4">Mes <span className="text-gradient">Trophées</span></h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {allTrophies.map((trophy: any) => {
                  const awarded = player.trophies.find((t: any) => t.trophy.id === trophy.id)
                  return (
                    <TrophyBadge key={trophy.id} name={trophy.name} description={trophy.description} icon={trophy.icon} rarity={trophy.rarity} unlocked={unlockedIds.has(trophy.id)} awardedAt={awarded?.awardedAt} />
                  )
                })}
              </div>
            </section>
          </ScrollReveal>

          {/* Stats Charts */}
          <ScrollReveal>
            <section className="mb-10">
              <h2 className="font-gaming text-lg font-bold text-white mb-4">Mes <span className="text-gradient">Statistiques</span></h2>

              {Object.keys(statsByGame).length === 0 ? (
                <p className="text-gray-500 text-sm">Aucune statistique enregistrée. Utilise le formulaire ci-dessous pour ajouter tes stats.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Object.entries(statsByGame).map(([game, data]) => (
                    <StatChart
                      key={game}
                      title={GAME_NAMES[game] || game}
                      data={data}
                      dataKeys={STAT_KEYS[game] || [{ key: 'winrate', label: 'Winrate', color: '#8B5CF6' }]}
                    />
                  ))}
                </div>
              )}
            </section>
          </ScrollReveal>

          {/* Add Stats Form */}
          <ScrollReveal>
            <section>
              <h2 className="font-gaming text-lg font-bold text-white mb-4">Ajouter des <span className="text-gradient">Stats</span></h2>

              {message && (
                <div className="mb-4 p-3 rounded-lg bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm">{message}</div>
              )}

              <div className="card-gaming p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                  <select className={inputClass} value={statForm.game} onChange={(e) => setStatForm({ ...statForm, game: e.target.value })}>
                    {ALL_GAMES.map((g) => <option key={g} value={g}>{GAME_NAMES[g]}</option>)}
                  </select>
                  <input className={inputClass} type="date" value={statForm.date} onChange={(e) => setStatForm({ ...statForm, date: e.target.value })} />
                  <input className={inputClass} placeholder='Ex: {"kda": 3.5, "winrate": 60}' value={statForm.data} onChange={(e) => setStatForm({ ...statForm, data: e.target.value })} />
                  <button onClick={addStat} className="px-4 py-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-bold hover:opacity-90 transition-all">
                    Ajouter
                  </button>
                </div>

                {/* Hint about stats format */}
                <div className="text-[10px] text-gray-600 space-y-1">
                  <p>Format JSON. Clés possibles par jeu :</p>
                  <p><span className="text-gray-400">LoL:</span> kda, csPerMin, visionScore, winrate</p>
                  <p><span className="text-gray-400">Valorant:</span> kda, headshotPct, winrate</p>
                  <p><span className="text-gray-400">FC 26:</span> goalsPerMatch, assistsPerMatch, possession, winrate</p>
                  <p><span className="text-gray-400">Rocket League:</span> goalsPerMatch, savesPerMatch, assistsPerMatch, winrate</p>
                  <p><span className="text-gray-400">Mario Kart:</span> avgPosition, firstPlaces, winrate</p>
                  <p><span className="text-gray-400">Smash:</span> avgKOs, winrate</p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  )
}
