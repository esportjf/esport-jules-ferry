import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { MonProfilClient } from './MonProfilClient'

export const metadata = {
  title: 'Mon Profil — Section E-sport Lycée Jules Ferry',
}

export default async function MonProfilPage() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user.playerId) redirect('/login')

  const player = await prisma.player.findUnique({
    where: { id: session.user.playerId },
    include: {
      ranks: true,
      trophies: { include: { trophy: true } },
      stats: { orderBy: { date: 'asc' } },
    },
  })

  if (!player) redirect('/login')

  const allTrophies = await prisma.trophy.findMany()

  return (
    <MonProfilClient
      player={JSON.parse(JSON.stringify(player))}
      allTrophies={JSON.parse(JSON.stringify(allTrophies))}
    />
  )
}
