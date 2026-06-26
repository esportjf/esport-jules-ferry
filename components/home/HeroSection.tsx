'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900">

      {/* Perspective grid — arena floor receding to horizon */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
        style={{ perspective: '700px' }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-30%',
            right: '-30%',
            height: '65%',
            transformOrigin: '50% 100%',
            transform: 'rotateX(62deg)',
            backgroundImage: `
              linear-gradient(rgba(123,63,228,0.22) 1px, transparent 1px),
              linear-gradient(90deg, rgba(123,63,228,0.22) 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px',
          }}
        />
        {/* Fade grid toward horizon and edges */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 65%, transparent 25%, #06040F 72%)',
          }}
        />
      </div>

      {/* Ligne horizon lumineuse */}
      <div
        className="absolute left-0 right-0"
        aria-hidden="true"
        style={{
          top: '58%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(123,63,228,0.5) 30%, rgba(224,64,251,0.35) 70%, transparent 100%)',
        }}
      />

      {/* Halo asymétrique — grand violet haut-gauche */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: '-80px',
          left: '-60px',
          width: '560px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(123,63,228,0.22) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Halo asymétrique — petit magenta bas-droite */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: '-40px',
          right: '-20px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(224,64,251,0.18) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">

        {/* Badge — Projet Educ Esport */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            background: 'rgba(123,63,228,0.08)',
            border: '1px solid rgba(123,63,228,0.25)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-neon"
            style={{ background: '#7B3FE4' }}
          />
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: '#A259FF' }}
          >
            Projet Educ Esport — France 2030
          </span>
        </motion.div>

        {/* H1 — deux lignes, deux registres Orbitron */}
        <motion.h1
          className="font-gaming font-black leading-none mb-4"
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15 }}
        >
          <span
            className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-lavender"
            style={{ letterSpacing: '0.14em' }}
          >
            SECTION
          </span>
          <span
            className="block text-gradient text-5xl sm:text-6xl md:text-8xl lg:text-9xl"
            style={{ letterSpacing: '0.06em' }}
          >
            E·SPORT
          </span>
        </motion.h1>

        {/* Sous-titre lycée — Space Grotesk, aéré */}
        <motion.p
          className="font-body text-sm sm:text-base tracking-[0.22em] uppercase mb-7"
          style={{ color: 'rgba(237,232,255,0.45)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.32 }}
        >
          Lycée Jules Ferry — Versailles
        </motion.p>

        {/* ── TROPHY TICKER — élément signature ── */}
        <motion.div
          className="relative inline-flex items-center gap-3 px-5 py-3 mb-8 overflow-hidden"
          style={{
            borderLeft: '2px solid #E040FB',
            background: 'linear-gradient(90deg, rgba(224,64,251,0.07) 0%, rgba(224,64,251,0.02) 100%)',
          }}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.5 }}
        >
          {/* Sweep lumineux */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(224,64,251,0.22) 50%, transparent 100%)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 4.5,
              ease: 'linear',
            }}
          />
          <span style={{ color: '#E040FB', fontSize: '13px' }} aria-hidden="true">⚡</span>
          <span
            className="font-mono text-xs sm:text-sm font-medium"
            style={{ color: '#E040FB', letterSpacing: '0.18em' }}
          >
            2× CHAMPION RÉGIONAL ÎLE-DE-FRANCE
          </span>
        </motion.div>

        {/* Accroche */}
        <motion.p
          className="font-body text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(237,232,255,0.48)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.62 }}
        >
          Développer les compétences de demain à travers le gaming compétitif.
          Mixité, coopération et excellence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.74 }}
        >
          <Link
            href="/presentation"
            className="px-8 py-3 rounded-lg font-gaming text-sm font-bold tracking-wider text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #7B3FE4 0%, #A259FF 100%)',
              boxShadow: '0 0 24px rgba(123,63,228,0.45)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 36px rgba(162,89,255,0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 24px rgba(123,63,228,0.45)'
            }}
          >
            Découvrir la Section
          </Link>
          <Link
            href="/joueurs"
            className="px-8 py-3 rounded-lg font-gaming text-sm font-bold tracking-wider transition-all duration-300 hover:text-lavender"
            style={{
              border: '1px solid rgba(45,27,105,1)',
              color: 'rgba(237,232,255,0.6)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(123,63,228,0.55)'
              e.currentTarget.style.background = 'rgba(123,63,228,0.06)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(45,27,105,1)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Nos Joueurs
          </Link>
        </motion.div>
      </div>

      {/* Fondu bas vers la section suivante */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #06040F 0%, transparent 100%)' }}
        aria-hidden="true"
      />
    </section>
  )
}
