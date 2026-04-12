import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, jsonError } from '@/lib/api-utils'
import { z } from 'zod'

const rankSchema = z.object({
  game: z.string().min(1),
  rank: z.string().min(1),
})

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const parsed = rankSchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  const rank = await prisma.rank.upsert({
    where: { playerId_game: { playerId: params.id, game: parsed.data.game } },
    update: { rank: parsed.data.rank },
    create: { playerId: params.id, game: parsed.data.game, rank: parsed.data.rank },
  })

  return NextResponse.json(rank)
}
