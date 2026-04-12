import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, jsonError } from '@/lib/api-utils'
import { z } from 'zod'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const player = await prisma.player.findUnique({
    where: { id: params.id },
    include: { ranks: true, trophies: { include: { trophy: true } } },
  })
  if (!player) return jsonError('Joueur introuvable', 404)
  return NextResponse.json(player)
}

const updateSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  pseudo: z.string().min(1).optional(),
  className: z.string().min(1).optional(),
  photo: z.string().optional(),
  mainGame: z.string().optional(),
})

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  const player = await prisma.player.update({
    where: { id: params.id },
    data: parsed.data,
  })
  return NextResponse.json(player)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const player = await prisma.player.findUnique({ where: { id: params.id } })
  if (!player) return jsonError('Joueur introuvable', 404)

  await prisma.player.delete({ where: { id: params.id } })
  await prisma.user.delete({ where: { id: player.userId } })

  return NextResponse.json({ success: true })
}
