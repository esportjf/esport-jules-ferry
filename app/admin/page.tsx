import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AdminClient } from './AdminClient'

export const metadata = {
  title: 'Administration — Section E-sport Lycée Jules Ferry',
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') redirect('/login')

  const [players, trophies, tournaments, news, events] = await Promise.all([
    prisma.player.findMany({
      include: { ranks: true, trophies: { include: { trophy: true } } },
      orderBy: { pseudo: 'asc' },
    }),
    prisma.trophy.findMany({ orderBy: { name: 'asc' } }),
    prisma.tournament.findMany({
      include: {
        slots: { include: { player: true }, orderBy: [{ game: 'asc' }, { slotType: 'asc' }, { slotIndex: 'asc' }] },
        supporters: true,
      },
      orderBy: { year: 'desc' },
    }),
    prisma.newsArticle.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.calendarEvent.findMany({ orderBy: { date: 'asc' } }),
  ])

  return (
    <AdminClient
      initialPlayers={JSON.parse(JSON.stringify(players))}
      initialTrophies={JSON.parse(JSON.stringify(trophies))}
      initialTournaments={JSON.parse(JSON.stringify(tournaments))}
      initialNews={JSON.parse(JSON.stringify(news))}
      initialEvents={JSON.parse(JSON.stringify(events))}
    />
  )
}
