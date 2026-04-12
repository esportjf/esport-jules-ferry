import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      role: string
      playerId: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub?: string
    role: string
    playerId: string | null
  }
}
