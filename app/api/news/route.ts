import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, jsonError } from '@/lib/api-utils'
import { z } from 'zod'

export async function GET() {
  const articles = await prisma.newsArticle.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(articles)
}

const newsSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const parsed = newsSchema.safeParse(body)
  if (!parsed.success) return jsonError('Données invalides')

  const article = await prisma.newsArticle.create({ data: parsed.data })
  return NextResponse.json(article)
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const body = await req.json()
  const { id, ...data } = body
  if (!id) return jsonError('ID requis')

  const parsed = newsSchema.safeParse(data)
  if (!parsed.success) return jsonError('Données invalides')

  const article = await prisma.newsArticle.update({ where: { id }, data: parsed.data })
  return NextResponse.json(article)
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return jsonError('Non autorisé', 401)

  const { id } = await req.json()
  if (!id) return jsonError('ID requis')

  await prisma.newsArticle.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
