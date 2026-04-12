'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

const trophies = [
  {
    title: 'Tournoi d\'Hiver — Campus Cyber',
    subtitle: '"Meilleur Lycée" — Double Victoire',
    location: 'Puteaux',
    year: '2024 & 2025',
    icon: '🏆',
  },
  {
    title: 'Grand Tournoi Régional d\'Été',
    subtitle: 'Champions — 800 élèves, 30 établissements',
    location: 'Athletica, Eaubonne',
    year: '2025',
    icon: '🏆',
  },
  {
    title: 'Tournoi de la Mairie',
    subtitle: 'Vainqueurs du tournoi municipal',
    location: 'Versailles',
    year: '2025',
    icon: '🏆',
  },
]

export function PalmaresSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-gaming text-2xl sm:text-3xl font-black text-white mb-2">
              Notre <span className="text-gradient">Palmarès</span>
            </h2>
            <p className="text-gray-500">Les victoires qui ont forgé notre réputation</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trophies.map((trophy, i) => (
            <ScrollReveal key={trophy.title} delay={i * 0.15}>
              <div className="relative p-6 rounded-2xl bg-dark-800 border border-gold/20 hover:border-gold/50 transition-all duration-500 group glow-gold text-center h-full">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="text-5xl mb-4">{trophy.icon}</div>
                  <h3 className="font-gaming text-sm font-bold text-gold mb-2">{trophy.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{trophy.subtitle}</p>
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                    <span>📍 {trophy.location}</span>
                    <span>•</span>
                    <span>{trophy.year}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
