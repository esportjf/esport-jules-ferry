import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, jsonError } from '@/lib/api-utils'
import { z } from 'zod'

const assignSchema = z.object({
  trophyId: z.string().min(1),
})

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const parsed = assignSchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  const existing = await prisma.playerTrophy.findUnique({
    where: { playerId_trophyId: { playerId: params.id, trophyId: parsed.data.trophyId } },
  })
  if (existing) return jsonError('Trophée déjà attribué')

  const pt = await prisma.playerTrophy.create({
    data: { playerId: params.id, trophyId: parsed.data.trophyId },
    include: { trophy: true },
  })

  return NextResponse.json(pt)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const { trophyId } = await req.json()
  if (!trophyId) return jsonError('trophyId requis')

  await prisma.playerTrophy.delete({
    where: { playerId_trophyId: { playerId: params.id, trophyId } },
  })

  return NextResponse.json({ success: true })
}
