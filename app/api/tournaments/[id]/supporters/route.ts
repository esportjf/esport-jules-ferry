import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, jsonError } from '@/lib/api-utils'
import { z } from 'zod'

const supporterSchema = z.object({
  name: z.string().min(1),
})

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const parsed = supporterSchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  const supporter = await prisma.supporterSlot.create({
    data: { tournamentId: params.id, name: parsed.data.name },
  })

  return NextResponse.json(supporter)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const { id: supporterId } = await req.json()
  if (!supporterId) return jsonError('id requis')

  await prisma.supporterSlot.delete({ where: { id: supporterId } })

  return NextResponse.json({ success: true })
}
