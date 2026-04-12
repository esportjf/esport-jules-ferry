import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PlayerProfileClient } from './PlayerProfileClient'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const player = await prisma.player.findUnique({ where: { id: params.id } })
  if (!player) return { title: 'Joueur introuvable' }
  return {
    title: `${player.pseudo} — Section E-sport Lycée Jules Ferry`,
    description: `Profil de ${player.pseudo} (${player.firstName} ${player.lastName}) — Section e-sport.`,
  }
}

export default async function PlayerProfilePage({ params }: { params: { id: string } }) {
  const player = await prisma.player.findUnique({
    where: { id: params.id },
    include: {
      ranks: true,
      trophies: {
        include: { trophy: true },
      },
    },
  })

  if (!player) notFound()

  const allTrophies = await prisma.trophy.findMany()

  return (
    <PlayerProfileClient
      player={JSON.parse(JSON.stringify(player))}
      allTrophies={JSON.parse(JSON.stringify(allTrophies))}
    />
  )
}
