import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, jsonError } from '@/lib/api-utils'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAuth()
  if (!session) return jsonError('Non autorisé', 401)

  // Player can update their own photo, admin can update anyone's
  if (session.user.role !== 'admin' && session.user.playerId !== params.id) {
    return jsonError('Accès refusé', 403)
  }

  const { photo } = await req.json()
  if (!photo || typeof photo !== 'string') return jsonError('Photo requise')

  // Limit base64 size (~500KB)
  if (photo.length > 700000) return jsonError('Image trop lourde (max 500KB)')

  const player = await prisma.player.update({
    where: { id: params.id },
    data: { photo },
  })

  return NextResponse.json({ photo: player.photo })
}
