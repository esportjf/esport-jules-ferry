import { prisma } from '@/lib/prisma'
import { HomeClient } from './HomeClient'

export default async function HomePage() {
  const [articles, events] = await Promise.all([
    prisma.newsArticle.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.calendarEvent.findMany({
      where: { date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      take: 8,
    }),
  ])

  return (
    <HomeClient
      articles={JSON.parse(JSON.stringify(articles))}
      events={JSON.parse(JSON.stringify(events))}
    />
  )
}
