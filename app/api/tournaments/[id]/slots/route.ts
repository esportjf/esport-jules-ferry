import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, jsonError } from '@/lib/api-utils'
import { z } from 'zod'

const slotSchema = z.object({
  slotId: z.string().min(1),
  playerId: z.string().nullable(),
})

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const parsed = slotSchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  // Check player is not already assigned to another game in this tournament
  if (parsed.data.playerId) {
    const existingSlot = await prisma.tournamentSlot.findFirst({
      where: {
        tournamentId: params.id,
        playerId: parsed.data.playerId,
        id: { not: parsed.data.slotId },
      },
    })
    if (existingSlot) {
      return jsonError('Ce joueur est déjà assigné à un autre jeu dans ce tournoi')
    }
  }

  const slot = await prisma.tournamentSlot.update({
    where: { id: parsed.data.slotId },
    data: { playerId: parsed.data.playerId },
    include: { player: true },
  })

  return NextResponse.json(slot)
}
