'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-gaming" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08)_0%,transparent_70%)]" />

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-neon-blue/5 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-neon-pink/5 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-blue/10 border border-neon-blue/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            <span className="text-neon-blue text-xs font-medium">Projet Educ Esport — France 2030</span>
          </div>
        </motion.div>

        <motion.h1
          className="font-gaming text-4xl sm:text-5xl md:text-7xl font-black mb-4 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-white">Section</span>{' '}
          <span className="text-gradient">E-Sport</span>
        </motion.h1>

        <motion.h2
          className="font-gaming text-lg sm:text-xl md:text-2xl text-gray-400 mb-2 font-medium"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Lycée Jules Ferry — Versailles
        </motion.h2>

        <motion.p
          className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Développer les compétences de demain à travers le gaming compétitif.
          Mixité, coopération et excellence.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link
            href="/presentation"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-gaming text-sm font-bold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105"
          >
            Découvrir la Section
          </Link>
          <Link
            href="/joueurs"
            className="px-8 py-3 rounded-xl border border-dark-600 text-gray-300 font-gaming text-sm font-bold hover:border-neon-blue/50 hover:text-white transition-all duration-300"
          >
            Nos Joueurs
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>
  )
}
