import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tournaments = await prisma.tournament.findMany({
    include: {
      slots: { include: { player: true } },
      supporters: { include: { player: true } },
    },
    orderBy: { year: 'desc' },
  })
  return NextResponse.json(tournaments)
}
