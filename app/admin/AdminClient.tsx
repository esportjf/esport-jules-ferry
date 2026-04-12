'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { GAME_NAMES, RANK_ORDER, RARITY_COLORS } from '@/lib/utils'

const TABS = [
  { id: 'players', label: 'Joueurs' },
  { id: 'ranks', label: 'Rangs' },
  { id: 'trophies', label: 'Trophées' },
  { id: 'tournaments', label: 'Tournois' },
  { id: 'news', label: 'Actualités' },
  { id: 'calendar', label: 'Calendrier' },
]

const ALL_GAMES = ['lol', 'valorant', 'fc26', 'rocket_league', 'mario_kart', 'smash']

interface Props {
  initialPlayers: any[]
  initialTrophies: any[]
  initialTournaments: any[]
  initialNews: any[]
  initialEvents: any[]
}

export function AdminClient({ initialPlayers, initialTrophies, initialTournaments, initialNews, initialEvents }: Props) {
  const [tab, setTab] = useState('players')
  const [players, setPlayers] = useState(initialPlayers)
  const [trophies, setTrophies] = useState(initialTrophies)
  const [tournaments] = useState(initialTournaments)
  const [news, setNews] = useState(initialNews)
  const [events, setEvents] = useState(initialEvents)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  // ─── Players CRUD ───
  const [playerForm, setPlayerForm] = useState({ firstName: '', lastName: '', pseudo: '', className: '', mainGame: '' })
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null)

  const createPlayer = async () => {
    setLoading(true)
    const res = await fetch('/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerForm),
    })
    if (res.ok) {
      const newPlayer = await res.json()
      setPlayers([...players, { ...newPlayer, ranks: [], trophies: [] }])
      setPlayerForm({ firstName: '', lastName: '', pseudo: '', className: '', mainGame: '' })
      showMessage('Joueur créé !')
    } else {
      const err = await res.json()
      showMessage(err.error || 'Erreur')
    }
    setLoading(false)
  }

  const updatePlayer = async (id: string, data: any) => {
    const res = await fetch(`/api/players/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const updated = await res.json()
      setPlayers(players.map((p: any) => (p.id === id ? { ...p, ...updated } : p)))
      setEditingPlayer(null)
      showMessage('Joueur mis à jour !')
    }
  }

  const deletePlayer = async (id: string) => {
    if (!confirm('Supprimer ce joueur ?')) return
    const res = await fetch(`/api/players/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setPlayers(players.filter((p: any) => p.id !== id))
      showMessage('Joueur supprimé')
    }
  }

  // ─── Ranks ───
  const updateRank = async (playerId: string, game: string, rank: string) => {
    const res = await fetch(`/api/players/${playerId}/ranks`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game, rank }),
    })
    if (res.ok) {
      setPlayers(players.map((p: any) => {
        if (p.id !== playerId) return p
        const ranks = p.ranks.filter((r: any) => r.game !== game)
        ranks.push({ game, rank })
        return { ...p, ranks }
      }))
      showMessage('Rang mis à jour !')
    }
  }

  // ─── Trophies ───
  const [trophyForm, setTrophyForm] = useState({ name: '', description: '', icon: '🏆', rarity: 'Commun' })

  const createTrophy = async () => {
    const res = await fetch('/api/trophies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trophyForm),
    })
    if (res.ok) {
      const t = await res.json()
      setTrophies([...trophies, t])
      setTrophyForm({ name: '', description: '', icon: '🏆', rarity: 'Commun' })
      showMessage('Trophée créé !')
    }
  }

  const assignTrophy = async (playerId: string, trophyId: string) => {
    const res = await fetch(`/api/players/${playerId}/trophies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trophyId }),
    })
    if (res.ok) {
      const pt = await res.json()
      setPlayers(players.map((p: any) => {
        if (p.id !== playerId) return p
        return { ...p, trophies: [...p.trophies, pt] }
      }))
      showMessage('Trophée attribué !')
    } else {
      const err = await res.json()
      showMessage(err.error || 'Erreur')
    }
  }

  // ─── Tournament slots ───
  const updateSlot = async (tournamentId: string, slotId: string, playerId: string | null) => {
    const res = await fetch(`/api/tournaments/${tournamentId}/slots`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slotId, playerId }),
    })
    if (res.ok) {
      showMessage('Slot mis à jour !')
      window.location.reload()
    } else {
      const err = await res.json()
      showMessage(err.error || 'Erreur')
    }
  }

  // ─── News ───
  const [newsForm, setNewsForm] = useState({ title: '', content: '', imageUrl: '' })

  const createNews = async () => {
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsForm),
    })
    if (res.ok) {
      const article = await res.json()
      setNews([article, ...news])
      setNewsForm({ title: '', content: '', imageUrl: '' })
      showMessage('Article créé !')
    }
  }

  const deleteNews = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return
    const res = await fetch('/api/news', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      setNews(news.filter((n: any) => n.id !== id))
      showMessage('Article supprimé')
    }
  }

  // ─── Calendar ───
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', location: '', type: 'training' })

  const createEvent = async () => {
    const res = await fetch('/api/calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventForm),
    })
    if (res.ok) {
      const event = await res.json()
      setEvents([...events, event].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()))
      setEventForm({ title: '', description: '', date: '', location: '', type: 'training' })
      showMessage('Événement créé !')
    }
  }

  const deleteEvent = async (id: string) => {
    if (!confirm('Supprimer cet événement ?')) return
    const res = await fetch('/api/calendar', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      setEvents(events.filter((e: any) => e.id !== id))
      showMessage('Événement supprimé')
    }
  }

  const inputClass = 'bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white focus:border-neon-blue focus:outline-none w-full'
  const btnClass = 'px-4 py-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50'
  const btnDanger = 'px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs border border-red-500/30 hover:bg-red-500/30 transition-all'

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="font-gaming text-2xl sm:text-3xl font-black text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Dashboard <span className="text-gradient">Admin</span>
          </motion.h1>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm"
            >
              {message}
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 mb-8 p-1 bg-dark-800 rounded-xl">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t.id ? 'bg-neon-blue/20 text-neon-blue' : 'text-gray-500 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ─── PLAYERS TAB ─── */}
          {tab === 'players' && (
            <div>
              <h2 className="font-gaming text-lg font-bold text-white mb-4">Gestion des Joueurs</h2>

              {/* Add form */}
              <div className="card-gaming p-4 mb-6">
                <h3 className="text-sm font-bold text-gray-300 mb-3">Ajouter un joueur</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <input className={inputClass} placeholder="Prénom" value={playerForm.firstName} onChange={(e) => setPlayerForm({ ...playerForm, firstName: e.target.value })} />
                  <input className={inputClass} placeholder="Nom" value={playerForm.lastName} onChange={(e) => setPlayerForm({ ...playerForm, lastName: e.target.value })} />
                  <input className={inputClass} placeholder="Pseudo" value={playerForm.pseudo} onChange={(e) => setPlayerForm({ ...playerForm, pseudo: e.target.value })} />
                  <input className={inputClass} placeholder="Classe" value={playerForm.className} onChange={(e) => setPlayerForm({ ...playerForm, className: e.target.value })} />
                  <select className={inputClass} value={playerForm.mainGame} onChange={(e) => setPlayerForm({ ...playerForm, mainGame: e.target.value })}>
                    <option value="">Jeu principal</option>
                    {ALL_GAMES.map((g) => <option key={g} value={g}>{GAME_NAMES[g]}</option>)}
                  </select>
                  <button onClick={createPlayer} disabled={loading} className={btnClass}>Ajouter</button>
                </div>
              </div>

              {/* Players list */}
              <div className="space-y-2">
                {players.map((p: any) => (
                  <div key={p.id} className="card-gaming p-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={p.photo || `https://api.dicebear.com/9.x/thumbs/svg?seed=${p.pseudo}`} className="w-10 h-10 rounded-full" alt="" />
                      <div>
                        <span className="font-gaming text-sm font-bold text-white">{p.pseudo}</span>
                        <span className="text-gray-500 text-xs ml-2">{p.firstName} {p.lastName} — {p.className}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {editingPlayer === p.id ? (
                        <div className="flex gap-2 items-center">
                          <input className={inputClass + ' !w-24'} placeholder="Classe" defaultValue={p.className}
                            onBlur={(e) => updatePlayer(p.id, { className: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && updatePlayer(p.id, { className: (e.target as HTMLInputElement).value })}
                          />
                          <button onClick={() => setEditingPlayer(null)} className="text-gray-500 text-xs">Annuler</button>
                        </div>
                      ) : (
                        <button onClick={() => setEditingPlayer(p.id)} className="text-xs px-3 py-1.5 rounded-lg bg-dark-700 text-gray-400 hover:text-white transition-all">
                          Modifier
                        </button>
                      )}
                      <button onClick={() => deletePlayer(p.id)} className={btnDanger}>Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── RANKS TAB ─── */}
          {tab === 'ranks' && (
            <div>
              <h2 className="font-gaming text-lg font-bold text-white mb-4">Attribution des Rangs</h2>
              <div className="space-y-3">
                {players.map((p: any) => (
                  <div key={p.id} className="card-gaming p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={p.photo || `https://api.dicebear.com/9.x/thumbs/svg?seed=${p.pseudo}`} className="w-8 h-8 rounded-full" alt="" />
                      <span className="font-gaming text-sm font-bold text-white">{p.pseudo}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                      {ALL_GAMES.map((game) => {
                        const currentRank = p.ranks.find((r: any) => r.game === game)?.rank || ''
                        return (
                          <div key={game}>
                            <label className="text-[10px] text-gray-500 block mb-1">{GAME_NAMES[game]}</label>
                            <select
                              className={inputClass + ' !text-xs !py-1.5'}
                              value={currentRank}
                              onChange={(e) => e.target.value && updateRank(p.id, game, e.target.value)}
                            >
                              <option value="">Non classé</option>
                              {RANK_ORDER.map((r) => <option key={r} value={r}>{r}</option>)}
                            </select>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── TROPHIES TAB ─── */}
          {tab === 'trophies' && (
            <div>
              <h2 className="font-gaming text-lg font-bold text-white mb-4">Gestion des Trophées</h2>

              {/* Create trophy */}
              <div className="card-gaming p-4 mb-6">
                <h3 className="text-sm font-bold text-gray-300 mb-3">Créer un trophée</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <input className={inputClass} placeholder="Nom" value={trophyForm.name} onChange={(e) => setTrophyForm({ ...trophyForm, name: e.target.value })} />
                  <input className={inputClass} placeholder="Description" value={trophyForm.description} onChange={(e) => setTrophyForm({ ...trophyForm, description: e.target.value })} />
                  <input className={inputClass} placeholder="Icône (emoji)" value={trophyForm.icon} onChange={(e) => setTrophyForm({ ...trophyForm, icon: e.target.value })} />
                  <select className={inputClass} value={trophyForm.rarity} onChange={(e) => setTrophyForm({ ...trophyForm, rarity: e.target.value })}>
                    {['Commun', 'Rare', 'Épique', 'Légendaire'].map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <button onClick={createTrophy} className={btnClass}>Créer</button>
                </div>
              </div>

              {/* Assign trophy */}
              <div className="card-gaming p-4 mb-6">
                <h3 className="text-sm font-bold text-gray-300 mb-3">Attribuer un trophée</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select id="assign-player" className={inputClass}>
                    <option value="">Choisir un joueur</option>
                    {players.map((p: any) => <option key={p.id} value={p.id}>{p.pseudo}</option>)}
                  </select>
                  <select id="assign-trophy" className={inputClass}>
                    <option value="">Choisir un trophée</option>
                    {trophies.map((t: any) => <option key={t.id} value={t.id}>{t.icon} {t.name} ({t.rarity})</option>)}
                  </select>
                  <button
                    onClick={() => {
                      const pid = (document.getElementById('assign-player') as HTMLSelectElement).value
                      const tid = (document.getElementById('assign-trophy') as HTMLSelectElement).value
                      if (pid && tid) assignTrophy(pid, tid)
                    }}
                    className={btnClass}
                  >
                    Attribuer
                  </button>
                </div>
              </div>

              {/* Trophies list */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {trophies.map((t: any) => (
                  <div key={t.id} className="card-gaming p-3 text-center">
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <h4 className="font-gaming text-xs font-bold" style={{ color: RARITY_COLORS[t.rarity] }}>{t.name}</h4>
                    <p className="text-gray-500 text-[10px] mt-1">{t.description}</p>
                    <span className="text-[9px] mt-1 block" style={{ color: RARITY_COLORS[t.rarity] }}>{t.rarity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── TOURNAMENTS TAB ─── */}
          {tab === 'tournaments' && (
            <div>
              <h2 className="font-gaming text-lg font-bold text-white mb-4">Gestion des Tournois</h2>
              {tournaments.map((tournament: any) => (
                <div key={tournament.id} className="mb-10">
                  <h3 className="font-gaming text-base font-bold text-white mb-4">{tournament.name}</h3>

                  {/* Group slots by game */}
                  {Object.entries(
                    tournament.slots.reduce((acc: any, slot: any) => {
                      if (!acc[slot.game]) acc[slot.game] = []
                      acc[slot.game].push(slot)
                      return acc
                    }, {})
                  ).map(([game, slots]: [string, any]) => (
                    <div key={game} className="mb-4">
                      <h4 className="text-sm text-gray-400 mb-2">{GAME_NAMES[game]}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {slots.map((slot: any) => (
                          <div key={slot.id} className="card-gaming p-3 flex items-center gap-2">
                            <span className="text-[10px] text-gray-500 w-24">{slot.slotType}</span>
                            <select
                              className={inputClass + ' !text-xs !py-1'}
                              value={slot.playerId || ''}
                              onChange={(e) => updateSlot(tournament.id, slot.id, e.target.value || null)}
                            >
                              <option value="">— Vide —</option>
                              {players.map((p: any) => (
                                <option key={p.id} value={p.id}>{p.pseudo}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ─── NEWS TAB ─── */}
          {tab === 'news' && (
            <div>
              <h2 className="font-gaming text-lg font-bold text-white mb-4">Gestion des Actualités</h2>

              <div className="card-gaming p-4 mb-6">
                <h3 className="text-sm font-bold text-gray-300 mb-3">Ajouter un article</h3>
                <div className="grid grid-cols-1 gap-3">
                  <input className={inputClass} placeholder="Titre" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
                  <textarea className={inputClass + ' min-h-[80px]'} placeholder="Contenu" value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} />
                  <input className={inputClass} placeholder="URL Image (optionnel)" value={newsForm.imageUrl} onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })} />
                  <button onClick={createNews} className={btnClass + ' justify-self-start'}>Publier</button>
                </div>
              </div>

              <div className="space-y-2">
                {news.map((article: any) => (
                  <div key={article.id} className="card-gaming p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{article.title}</h4>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-1">{article.content}</p>
                    </div>
                    <button onClick={() => deleteNews(article.id)} className={btnDanger}>Supprimer</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── CALENDAR TAB ─── */}
          {tab === 'calendar' && (
            <div>
              <h2 className="font-gaming text-lg font-bold text-white mb-4">Gestion du Calendrier</h2>

              <div className="card-gaming p-4 mb-6">
                <h3 className="text-sm font-bold text-gray-300 mb-3">Ajouter un événement</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <input className={inputClass} placeholder="Titre" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} />
                  <input className={inputClass} placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
                  <input className={inputClass} type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
                  <input className={inputClass} placeholder="Lieu" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />
                  <select className={inputClass} value={eventForm.type} onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}>
                    <option value="training">Entraînement</option>
                    <option value="tournament">Tournoi</option>
                    <option value="event">Événement</option>
                  </select>
                  <button onClick={createEvent} className={btnClass}>Ajouter</button>
                </div>
              </div>

              <div className="space-y-2">
                {events.map((event: any) => (
                  <div key={event.id} className="card-gaming p-4 flex items-center justify-between">
                    <div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full mr-2 ${
                        event.type === 'tournament' ? 'bg-gold/10 text-gold' :
                        event.type === 'training' ? 'bg-neon-blue/10 text-neon-blue' :
                        'bg-neon-pink/10 text-neon-pink'
                      }`}>
                        {event.type}
                      </span>
                      <span className="text-sm font-bold text-white">{event.title}</span>
                      <span className="text-gray-500 text-xs ml-2">{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <button onClick={() => deleteEvent(event.id)} className={btnDanger}>Supprimer</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
