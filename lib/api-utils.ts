import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { NextResponse } from 'next/server'

export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return null
  }
  return session
}

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) return null
  return session
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}
