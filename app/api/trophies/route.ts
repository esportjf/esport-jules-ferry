import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, jsonError } from '@/lib/api-utils'
import { z } from 'zod'

export async function GET() {
  const trophies = await prisma.trophy.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(trophies)
}

const trophySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().default('🏆'),
  rarity: z.enum(['Commun', 'Rare', 'Épique', 'Légendaire']),
})

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const parsed = trophySchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  const trophy = await prisma.trophy.create({ data: parsed.data })
  return NextResponse.json(trophy)
}
