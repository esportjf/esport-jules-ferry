import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const GAMES = ['lol', 'valorant', 'fc26', 'rocket_league', 'mario_kart', 'smash'] as const
const RANKS = ['Fer', 'Bronze', 'Argent', 'Or', 'Platine', 'Diamant', 'Maître', 'Grand Maître', 'Challenger']
const CLASSES = ['2nde A', '2nde B', '2nde C', '1ère A', '1ère B', '1ère STI2D', 'Terminale A', 'Terminale B', 'Terminale STI2D']

const players = [
  { firstName: 'Lucas', lastName: 'Martin', pseudo: 'ShadowStrike', className: '2nde A', mainGame: 'valorant' },
  { firstName: 'Emma', lastName: 'Bernard', pseudo: 'NeonQueen', className: '1ère B', mainGame: 'lol' },
  { firstName: 'Hugo', lastName: 'Dubois', pseudo: 'TurboFox', className: 'Terminale A', mainGame: 'rocket_league' },
  { firstName: 'Léa', lastName: 'Thomas', pseudo: 'PixelWitch', className: '2nde B', mainGame: 'lol' },
  { firstName: 'Nathan', lastName: 'Robert', pseudo: 'BlazeMaster', className: '1ère STI2D', mainGame: 'valorant' },
  { firstName: 'Chloé', lastName: 'Richard', pseudo: 'IcePhoenix', className: '1ère A', mainGame: 'fc26' },
  { firstName: 'Théo', lastName: 'Petit', pseudo: 'DarkViper', className: 'Terminale B', mainGame: 'lol' },
  { firstName: 'Manon', lastName: 'Durand', pseudo: 'StarFury', className: '2nde C', mainGame: 'smash' },
  { firstName: 'Enzo', lastName: 'Leroy', pseudo: 'NightHawk', className: '1ère B', mainGame: 'valorant' },
  { firstName: 'Sarah', lastName: 'Moreau', pseudo: 'LunaSniper', className: 'Terminale STI2D', mainGame: 'fc26' },
  { firstName: 'Raphaël', lastName: 'Simon', pseudo: 'ThunderBolt', className: '2nde A', mainGame: 'rocket_league' },
  { firstName: 'Jade', lastName: 'Laurent', pseudo: 'CrystalBlade', className: '1ère A', mainGame: 'lol' },
  { firstName: 'Maxime', lastName: 'Lefebvre', pseudo: 'OmegaWolf', className: 'Terminale A', mainGame: 'valorant' },
  { firstName: 'Camille', lastName: 'Michel', pseudo: 'VoidAngel', className: '2nde B', mainGame: 'mario_kart' },
  { firstName: 'Louis', lastName: 'Garcia', pseudo: 'FlameKnight', className: '1ère STI2D', mainGame: 'fc26' },
  { firstName: 'Inès', lastName: 'David', pseudo: 'ArcticFox', className: 'Terminale B', mainGame: 'smash' },
  { firstName: 'Adam', lastName: 'Bertrand', pseudo: 'StormRider', className: '2nde C', mainGame: 'lol' },
  { firstName: 'Zoé', lastName: 'Roux', pseudo: 'NovaStar', className: '1ère B', mainGame: 'mario_kart' },
  { firstName: 'Gabriel', lastName: 'Vincent', pseudo: 'PhantomAce', className: 'Terminale STI2D', mainGame: 'rocket_league' },
  { firstName: 'Lina', lastName: 'Fournier', pseudo: 'EmberDancer', className: '2nde A', mainGame: 'valorant' },
]

const trophies = [
  { name: 'Premier Sang', description: 'Premier kill en tournoi officiel', icon: '🗡️', rarity: 'Commun' },
  { name: 'Imbattable', description: '5 victoires consécutives en matchs officiels', icon: '🔥', rarity: 'Rare' },
  { name: 'Stratège', description: 'Meilleur appel tactique reconnu par les coachs', icon: '🧠', rarity: 'Épique' },
  { name: 'MVP du Tournoi', description: 'Élu meilleur joueur d\'un tournoi', icon: '⭐', rarity: 'Légendaire' },
  { name: 'Esprit d\'Équipe', description: 'Reconnu pour sa contribution au collectif', icon: '🤝', rarity: 'Commun' },
  { name: 'Clutch Master', description: 'A retourné un round décisif en infériorité', icon: '💎', rarity: 'Épique' },
  { name: 'Sniper d\'Élite', description: '80% de headshots sur une série de matchs', icon: '🎯', rarity: 'Rare' },
  { name: 'Roi du Drift', description: 'Meilleur temps sur circuit Rainbow Road', icon: '🏎️', rarity: 'Rare' },
  { name: 'Goal Machine', description: '10 buts marqués en un seul tournoi FC', icon: '⚽', rarity: 'Rare' },
  { name: 'Aérien', description: 'But spectaculaire en Rocket League', icon: '🚀', rarity: 'Épique' },
  { name: 'Combo Infini', description: 'Combo de plus de 50% en Smash Bros', icon: '💥', rarity: 'Épique' },
  { name: 'Légende Vivante', description: 'Plus de 100 matchs joués en compétition', icon: '👑', rarity: 'Légendaire' },
  { name: 'Rookie de l\'Année', description: 'Meilleure progression sur une saison', icon: '🌟', rarity: 'Rare' },
  { name: 'Défenseur de Fer', description: '20 saves en un seul match de Rocket League', icon: '🛡️', rarity: 'Épique' },
  { name: 'Champion Régional', description: 'Vainqueur d\'un tournoi régional', icon: '🏆', rarity: 'Légendaire' },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.playerStat.deleteMany()
  await prisma.playerTrophy.deleteMany()
  await prisma.supporterSlot.deleteMany()
  await prisma.tournamentSlot.deleteMany()
  await prisma.rank.deleteMany()
  await prisma.trophy.deleteMany()
  await prisma.player.deleteMany()
  await prisma.tournament.deleteMany()
  await prisma.newsArticle.deleteMany()
  await prisma.calendarEvent.deleteMany()
  await prisma.user.deleteMany()

  // Create admin
  const adminPassword = await bcrypt.hash('esportjf2024', 10)
  await prisma.user.create({
    data: { username: 'admin', password: adminPassword, role: 'admin' },
  })
  console.log('✅ Admin created')

  // Create players
  const createdPlayers = []
  for (const p of players) {
    const password = await bcrypt.hash(p.pseudo.toLowerCase(), 10)
    const user = await prisma.user.create({
      data: {
        username: p.pseudo.toLowerCase(),
        password,
        role: 'player',
        player: {
          create: {
            firstName: p.firstName,
            lastName: p.lastName,
            pseudo: p.pseudo,
            className: p.className,
            mainGame: p.mainGame,
            photo: `https://api.dicebear.com/9.x/thumbs/svg?seed=${p.pseudo}`,
          },
        },
      },
      include: { player: true },
    })
    createdPlayers.push(user.player!)
  }
  console.log(`✅ ${createdPlayers.length} players created`)

  // Assign ranks
  for (const player of createdPlayers) {
    const numGames = 2 + Math.floor(Math.random() * 3)
    const assignedGames = [...GAMES].sort(() => Math.random() - 0.5).slice(0, numGames)
    // Always include main game
    if (player.mainGame && !assignedGames.includes(player.mainGame as any)) {
      assignedGames[0] = player.mainGame as any
    }
    for (const game of assignedGames) {
      const isMain = game === player.mainGame
      const minRank = isMain ? 3 : 0
      const rankIndex = minRank + Math.floor(Math.random() * (RANKS.length - minRank))
      await prisma.rank.create({
        data: { playerId: player.id, game, rank: RANKS[rankIndex] },
      })
    }
  }
  console.log('✅ Ranks assigned')

  // Create trophies
  const createdTrophies = []
  for (const t of trophies) {
    const trophy = await prisma.trophy.create({ data: t })
    createdTrophies.push(trophy)
  }
  console.log(`✅ ${createdTrophies.length} trophies created`)

  // Assign trophies to random players
  for (const trophy of createdTrophies) {
    const numPlayers = 1 + Math.floor(Math.random() * 5)
    const selectedPlayers = [...createdPlayers].sort(() => Math.random() - 0.5).slice(0, numPlayers)
    for (const player of selectedPlayers) {
      const daysAgo = Math.floor(Math.random() * 365)
      await prisma.playerTrophy.create({
        data: {
          playerId: player.id,
          trophyId: trophy.id,
          awardedAt: new Date(Date.now() - daysAgo * 86400000),
        },
      })
    }
  }
  console.log('✅ Trophies assigned')

  // Create tournaments
  const winterTournament = await prisma.tournament.create({
    data: { name: 'Tournoi d\'Hiver 2025', season: 'winter', year: 2025 },
  })
  const summerTournament = await prisma.tournament.create({
    data: { name: 'Tournoi d\'Été 2026', season: 'summer', year: 2026 },
  })

  // Winter slots: Mario Kart (2 binome) + FC26 (2 binome)
  const winterSlots = [
    { game: 'mario_kart', slotType: 'binome_boy', slotIndex: 0 },
    { game: 'mario_kart', slotType: 'binome_girl', slotIndex: 0 },
    { game: 'fc26', slotType: 'binome_boy', slotIndex: 0 },
    { game: 'fc26', slotType: 'binome_girl', slotIndex: 0 },
  ]
  for (const slot of winterSlots) {
    await prisma.tournamentSlot.create({
      data: { tournamentId: winterTournament.id, ...slot },
    })
  }

  // Summer slots
  const summerSlots = [
    // Smash: 1 binome + 2 solo
    { game: 'smash', slotType: 'binome_boy', slotIndex: 0 },
    { game: 'smash', slotType: 'binome_girl', slotIndex: 0 },
    { game: 'smash', slotType: 'solo', slotIndex: 0 },
    { game: 'smash', slotType: 'solo', slotIndex: 1 },
    // Mario Kart: 1 binome + 2 solo
    { game: 'mario_kart', slotType: 'binome_boy', slotIndex: 0 },
    { game: 'mario_kart', slotType: 'binome_girl', slotIndex: 0 },
    { game: 'mario_kart', slotType: 'solo', slotIndex: 0 },
    { game: 'mario_kart', slotType: 'solo', slotIndex: 1 },
    // FC26: 1 binome + 2 solo
    { game: 'fc26', slotType: 'binome_boy', slotIndex: 0 },
    { game: 'fc26', slotType: 'binome_girl', slotIndex: 0 },
    { game: 'fc26', slotType: 'solo', slotIndex: 0 },
    { game: 'fc26', slotType: 'solo', slotIndex: 1 },
    // Rocket League: 1 binome
    { game: 'rocket_league', slotType: 'binome_boy', slotIndex: 0 },
    { game: 'rocket_league', slotType: 'binome_girl', slotIndex: 0 },
    // LoL: team of 5
    ...Array.from({ length: 5 }, (_, i) => ({ game: 'lol', slotType: 'team_member', slotIndex: i })),
    // Valorant: team of 5
    ...Array.from({ length: 5 }, (_, i) => ({ game: 'valorant', slotType: 'team_member', slotIndex: i })),
  ]
  for (const slot of summerSlots) {
    await prisma.tournamentSlot.create({
      data: { tournamentId: summerTournament.id, ...slot },
    })
  }

  console.log('✅ Tournaments created with slots')

  // Create news articles
  const news = [
    {
      title: 'Victoire éclatante au Tournoi d\'Hiver du Campus Cyber !',
      content: 'Notre équipe a décroché le titre de "Meilleur Lycée" pour la deuxième année consécutive au Campus Cyber de Puteaux. Une performance remarquable de nos joueurs FC et Mario Kart qui ont dominé les phases finales avec brio.',
      imageUrl: 'https://placehold.co/800x400/1a1a2e/00D4FF?text=Tournoi+Hiver',
    },
    {
      title: 'LEC 2025 : Karmine Corp en route vers les Worlds',
      content: 'La saison LEC bat son plein et Karmine Corp continue d\'impressionner. Nos élèves suivent de près les performances de l\'équipe française qui représente nos couleurs sur la scène européenne de League of Legends.',
      imageUrl: 'https://placehold.co/800x400/1a1a2e/8B5CF6?text=LEC+2025',
    },
    {
      title: 'VCT Masters : L\'Europe domine la scène Valorant',
      content: 'Les VCT Masters ont livré un spectacle incroyable cette année. L\'occasion pour nos joueurs Valorant d\'analyser les stratégies des meilleurs et de s\'en inspirer pour nos prochains tournois.',
      imageUrl: 'https://placehold.co/800x400/1a1a2e/EC4899?text=VCT+Masters',
    },
    {
      title: 'RLCS : Rocket League au sommet de l\'esport',
      content: 'La Rocket League Championship Series continue de grandir. Nos binômes Rocket League s\'entraînent dur pour reproduire les rotations et les plays aériens des pros lors du prochain tournoi régional.',
      imageUrl: 'https://placehold.co/800x400/1a1a2e/00D4FF?text=RLCS',
    },
    {
      title: 'Nouveau partenariat avec l\'ArmaTeam',
      content: 'Nous sommes fiers d\'annoncer le renforcement de notre partenariat avec l\'ArmaTeam dans le cadre du projet Educ Esport. Des sessions de coaching avec des joueurs professionnels sont prévues ce trimestre.',
      imageUrl: 'https://placehold.co/800x400/1a1a2e/8B5CF6?text=ArmaTeam',
    },
    {
      title: 'Worlds LoL 2025 : Retour sur une édition historique',
      content: 'Les Championnats du Monde de League of Legends ont tenu toutes leurs promesses. Retour sur les moments forts qui ont fait vibrer notre communauté et inspiré nos joueurs pour la saison à venir.',
      imageUrl: 'https://placehold.co/800x400/1a1a2e/EC4899?text=Worlds+LoL',
    },
  ]
  for (let i = 0; i < news.length; i++) {
    await prisma.newsArticle.create({
      data: {
        ...news[i],
        createdAt: new Date(Date.now() - i * 7 * 86400000),
      },
    })
  }
  console.log('✅ News articles created')

  // Create calendar events
  const events = [
    { title: 'Entraînement Section E-sport', description: 'Session hebdomadaire de pratique encadrée', date: new Date('2026-04-15'), location: 'Salle E-sport, Lycée Jules Ferry', type: 'training' },
    { title: 'Entraînement Section E-sport', description: 'Session hebdomadaire de pratique encadrée', date: new Date('2026-04-22'), location: 'Salle E-sport, Lycée Jules Ferry', type: 'training' },
    { title: 'Tournoi Inter-classes LoL', description: 'Tournoi interne entre les classes du lycée', date: new Date('2026-05-03'), location: 'Salle E-sport, Lycée Jules Ferry', type: 'tournament' },
    { title: 'Entraînement Spécial Tournoi', description: 'Préparation intensive avant le tournoi d\'été', date: new Date('2026-05-10'), location: 'Salle E-sport, Lycée Jules Ferry', type: 'training' },
    { title: 'Tournoi de la Mairie de Versailles', description: 'Compétition organisée par la ville de Versailles', date: new Date('2026-05-24'), location: 'Mairie de Versailles', type: 'tournament' },
    { title: 'Stream Caritatif', description: 'Stream de gaming pour une cause solidaire', date: new Date('2026-06-07'), location: 'En ligne', type: 'event' },
    { title: 'Grand Tournoi Régional d\'Été', description: 'Le plus grand tournoi de la saison — 800 élèves, 30 établissements', date: new Date('2026-06-21'), location: 'Athletica, Eaubonne', type: 'tournament' },
    { title: 'Cérémonie de fin d\'année E-sport', description: 'Remise des trophées et célébration de la saison', date: new Date('2026-06-28'), location: 'Amphithéâtre, Lycée Jules Ferry', type: 'event' },
  ]
  for (const event of events) {
    await prisma.calendarEvent.create({ data: event })
  }
  console.log('✅ Calendar events created')

  // Create mock stats for some players
  const statPlayers = createdPlayers.slice(0, 6)
  for (const player of statPlayers) {
    const game = player.mainGame || 'lol'
    for (let week = 0; week < 8; week++) {
      const date = new Date(Date.now() - (7 - week) * 7 * 86400000)
      let data: Record<string, number> = {}
      switch (game) {
        case 'lol':
          data = { kda: +(2 + Math.random() * 4).toFixed(1), csPerMin: +(5 + Math.random() * 4).toFixed(1), visionScore: Math.floor(20 + Math.random() * 40), winrate: Math.floor(40 + Math.random() * 30) }
          break
        case 'valorant':
          data = { kda: +(0.8 + Math.random() * 2).toFixed(1), headshotPct: Math.floor(15 + Math.random() * 30), winrate: Math.floor(40 + Math.random() * 30) }
          break
        case 'fc26':
          data = { goalsPerMatch: +(0.5 + Math.random() * 2.5).toFixed(1), assistsPerMatch: +(0.3 + Math.random() * 1.5).toFixed(1), possession: Math.floor(35 + Math.random() * 30), winrate: Math.floor(40 + Math.random() * 30) }
          break
        case 'rocket_league':
          data = { goalsPerMatch: +(0.5 + Math.random() * 2).toFixed(1), savesPerMatch: +(1 + Math.random() * 3).toFixed(1), assistsPerMatch: +(0.3 + Math.random() * 1.5).toFixed(1), winrate: Math.floor(40 + Math.random() * 30) }
          break
        case 'mario_kart':
          data = { avgPosition: +(1 + Math.random() * 5).toFixed(1), firstPlaces: Math.floor(Math.random() * 10), winrate: Math.floor(30 + Math.random() * 40) }
          break
        case 'smash':
          data = { winrate: Math.floor(40 + Math.random() * 30), avgKOs: +(1 + Math.random() * 4).toFixed(1) }
          break
      }
      await prisma.playerStat.create({
        data: { playerId: player.id, game, date, data: JSON.stringify(data) },
      })
    }
  }
  console.log('✅ Player stats created')

  console.log('🎉 Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
