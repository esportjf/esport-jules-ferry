import { prisma } from '@/lib/prisma'
import { JoueursClient } from './JoueursClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Nos Joueurs — Section E-sport Lycée Jules Ferry',
  description: 'Découvrez les 20 joueurs de la section e-sport du Lycée Jules Ferry.',
}

export default async function JoueursPage() {
  const players = await prisma.player.findMany({
    include: {
      ranks: true,
    },
    orderBy: { pseudo: 'asc' },
  })

  return <JoueursClient players={JSON.parse(JSON.stringify(players))} />
}
