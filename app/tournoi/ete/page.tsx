import { prisma } from '@/lib/prisma'
import { TournoiEteClient } from './TournoiEteClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Tournoi d\'Été — Section E-sport Lycée Jules Ferry',
  description: 'Le Grand Tournoi Régional d\'Été : sélection, format et équipes pour tous les jeux.',
}

export default async function TournoiEtePage() {
  const tournament = await prisma.tournament.findFirst({
    where: { season: 'summer' },
    orderBy: { year: 'desc' },
    include: {
      slots: {
        include: { player: true },
        orderBy: [{ game: 'asc' }, { slotType: 'asc' }, { slotIndex: 'asc' }],
      },
      supporters: true,
    },
  })

  return <TournoiEteClient tournament={tournament ? JSON.parse(JSON.stringify(tournament)) : null} />
}
