import { prisma } from '@/lib/prisma'
import { TournoiHiverClient } from './TournoiHiverClient'

export const metadata = {
  title: 'Tournoi d\'Hiver — Section E-sport Lycée Jules Ferry',
  description: 'Le Tournoi d\'Hiver du Campus Cyber : sélection, format et équipes.',
}

export default async function TournoiHiverPage() {
  const tournament = await prisma.tournament.findFirst({
    where: { season: 'winter' },
    orderBy: { year: 'desc' },
    include: {
      slots: {
        include: { player: true },
        orderBy: [{ game: 'asc' }, { slotType: 'asc' }, { slotIndex: 'asc' }],
      },
      supporters: true,
    },
  })

  return <TournoiHiverClient tournament={tournament ? JSON.parse(JSON.stringify(tournament)) : null} />
}
