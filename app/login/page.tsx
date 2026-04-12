'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Pseudo ou mot de passe incorrect.')
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-gaming" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-gaming p-8 glow-purple">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center font-gaming text-xl font-bold text-white mx-auto mb-4">
              JF
            </div>
            <h1 className="font-gaming text-xl font-black text-white">Connexion</h1>
            <p className="text-gray-500 text-sm mt-1">Section E-sport — Lycée Jules Ferry</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Pseudo</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all"
                placeholder="Ton pseudo..."
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all"
                placeholder="Mot de passe..."
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-gaming text-sm font-bold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se Connecter'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
