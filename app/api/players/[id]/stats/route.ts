import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, jsonError } from '@/lib/api-utils'
import { z } from 'zod'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAuth()
  if (!session) return jsonError('Non autorisé', 401)

  // Only the player themselves or admin can see stats
  const player = await prisma.player.findUnique({ where: { id: params.id } })
  if (!player) return jsonError('Joueur introuvable', 404)

  if (session.user.role !== 'admin' && session.user.playerId !== params.id) {
    return jsonError('Accès refusé', 403)
  }

  const stats = await prisma.playerStat.findMany({
    where: { playerId: params.id },
    orderBy: { date: 'asc' },
  })

  return NextResponse.json(stats)
}

const statSchema = z.object({
  game: z.string().min(1),
  date: z.string(),
  data: z.record(z.number()),
})

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAuth()
  if (!session) return jsonError('Non autorisé', 401)

  // Only the player themselves can add their stats
  if (session.user.role !== 'admin' && session.user.playerId !== params.id) {
    return jsonError('Accès refusé', 403)
  }

  const body = await req.json()
  const parsed = statSchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  const stat = await prisma.playerStat.create({
    data: {
      playerId: params.id,
      game: parsed.data.game,
      date: new Date(parsed.data.date),
      data: JSON.stringify(parsed.data.data),
    },
  })

  return NextResponse.json(stat)
}
