'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

const trophies = [
  {
    title: 'Tournoi d\'Hiver — Campus Cyber',
    subtitle: '"Meilleur Lycée" — Double Victoire',
    location: 'Puteaux',
    year: '2024 & 2025',
  },
  {
    title: 'Grand Tournoi Régional d\'Été',
    subtitle: 'Champions — 800 élèves, 30 établissements',
    location: 'Athletica, Eaubonne',
    year: '2025',
  },
  {
    title: 'Tournoi de la Mairie',
    subtitle: 'Vainqueurs du tournoi municipal',
    location: 'Versailles',
    year: '2025',
  },
]

export function PalmaresSection() {
  return (
    <section className="py-24 relative">
      {/* Fond légèrement violet pour différencier visuellement */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(22,13,56,0.35) 0%, rgba(6,4,15,0) 100%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p
              className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: 'rgba(162,89,255,0.6)' }}
            >
              Palmarès
            </p>
            <h2 className="font-gaming text-2xl sm:text-3xl font-black text-lavender">
              Nos <span className="text-gradient">Victoires</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trophies.map((trophy, i) => (
            <ScrollReveal key={trophy.title} delay={i * 0.15}>
              <div
                className="relative p-7 rounded-2xl text-center h-full transition-all duration-500 group overflow-hidden"
                style={{
                  background: 'rgba(13,11,31,0.8)',
                  border: '1px solid rgba(255,215,0,0.18)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(255,215,0,0.45)'
                  el.style.boxShadow = '0 0 36px rgba(255,215,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(255,215,0,0.18)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Halo doré au survol */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.07) 0%, transparent 65%)' }}
                />

                {/* Trophée SVG — plus élégant que l'emoji */}
                <div className="relative mb-5">
                  <svg
                    viewBox="0 0 48 48"
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M24 34c-6.627 0-12-5.373-12-12V10h24v12c0 6.627-5.373 12-12 12z"
                      stroke="#FFD700"
                      strokeWidth="2"
                      fill="rgba(255,215,0,0.06)"
                    />
                    <path d="M12 14H6a4 4 0 004 4h2" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                    <path d="M36 14h6a4 4 0 01-4 4h-2" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                    <path d="M24 34v6" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16 40h16" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                    <path d="M20 22l2.5 3L28 19" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h3
                  className="font-gaming text-xs font-bold mb-2 leading-snug"
                  style={{ color: '#FFD700' }}
                >
                  {trophy.title}
                </h3>
                <p
                  className="font-body text-sm mb-4"
                  style={{ color: 'rgba(237,232,255,0.6)' }}
                >
                  {trophy.subtitle}
                </p>
                <div
                  className="flex items-center justify-center gap-2 font-mono text-xs"
                  style={{ color: 'rgba(237,232,255,0.3)' }}
                >
                  <span>📍 {trophy.location}</span>
                  <span>·</span>
                  <span>{trophy.year}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
