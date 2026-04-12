import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, jsonError } from '@/lib/api-utils'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

export async function GET() {
  const players = await prisma.player.findMany({
    include: { ranks: true },
    orderBy: { pseudo: 'asc' },
  })
  return NextResponse.json(players)
}

const createPlayerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  pseudo: z.string().min(1),
  className: z.string().min(1),
  photo: z.string().optional(),
  mainGame: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const parsed = createPlayerSchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  const { firstName, lastName, pseudo, className, photo, mainGame } = parsed.data

  const password = await bcrypt.hash(pseudo.toLowerCase(), 10)
  const user = await prisma.user.create({
    data: {
      username: pseudo.toLowerCase(),
      password,
      role: 'player',
      player: {
        create: {
          firstName,
          lastName,
          pseudo,
          className,
          photo: photo || `https://api.dicebear.com/9.x/thumbs/svg?seed=${pseudo}`,
          mainGame,
        },
      },
    },
    include: { player: true },
  })

  return NextResponse.json(user.player)
}
