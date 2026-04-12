import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, jsonError } from '@/lib/api-utils'
import { z } from 'zod'

const supporterSchema = z.object({
  playerId: z.string().min(1),
})

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const parsed = supporterSchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  const count = await prisma.supporterSlot.count({ where: { tournamentId: params.id } })
  if (count >= 16) return jsonError('Maximum 16 supporters atteint')

  const supporter = await prisma.supporterSlot.create({
    data: { tournamentId: params.id, playerId: parsed.data.playerId },
    include: { player: true },
  })

  return NextResponse.json(supporter)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const { playerId } = await req.json()
  if (!playerId) return jsonError('playerId requis')

  await prisma.supporterSlot.delete({
    where: { tournamentId_playerId: { tournamentId: params.id, playerId } },
  })

  return NextResponse.json({ success: true })
}
