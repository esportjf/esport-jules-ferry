import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, jsonError } from '@/lib/api-utils'
import { z } from 'zod'

export async function GET() {
  const events = await prisma.calendarEvent.findMany({ orderBy: { date: 'asc' } })
  return NextResponse.json(events)
}

const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.string(),
  location: z.string().optional(),
  type: z.enum(['tournament', 'training', 'event']),
})

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const parsed = eventSchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  const event = await prisma.calendarEvent.create({
    data: { ...parsed.data, date: new Date(parsed.data.date) },
  })
  return NextResponse.json(event)
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const { id, ...data } = body
  if (!id) return jsonError('ID requis')

  const parsed = eventSchema.safeParse(data)
  if (!parsed.success) return jsonError('Données invalides')

  const event = await prisma.calendarEvent.update({
    where: { id },
    data: { ...parsed.data, date: new Date(parsed.data.date) },
  })
  return NextResponse.json(event)
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const { id } = await req.json()
  if (!id) return jsonError('ID requis')

  await prisma.calendarEvent.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
