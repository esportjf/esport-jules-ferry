'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/presentation', label: 'Présentation' },
  { href: '/joueurs', label: 'Joueurs' },
  { href: '/tournoi/hiver', label: 'Tournoi Hiver' },
  { href: '/tournoi/ete', label: 'Tournoi Été' },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-600/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="E-Sport JF" className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-neon-purple bg-neon-purple/10'
                      : 'text-gray-400 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-2">
                {session.user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-xs px-3 py-1.5 rounded-lg bg-neon-purple/20 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/30 transition-all"
                  >
                    Admin
                  </Link>
                )}
                {session.user.role === 'player' && (
                  <Link
                    href="/mon-profil"
                    className="text-xs px-3 py-1.5 rounded-lg bg-neon-blue/20 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/30 transition-all"
                  >
                    Mon Profil
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-all"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300"
              >
                Connexion
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-dark-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-dark-600/50 bg-dark-900/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    pathname === link.href
                      ? 'text-neon-purple bg-neon-purple/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
