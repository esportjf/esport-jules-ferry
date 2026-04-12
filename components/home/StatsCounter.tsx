'use client'

import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const stats = [
  { value: 230, suffix: '+', label: 'Élèves initiés', icon: '🎮' },
  { value: 40, suffix: '', label: 'Talents réguliers', icon: '🏅' },
  { value: 3, suffix: '', label: 'Titres régionaux', icon: '🏆' },
  { value: 6, suffix: '', label: 'Jeux pratiqués', icon: '🕹️' },
]

export function StatsCounter() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl bg-dark-800/50 border border-dark-600/50 hover:border-neon-blue/30 transition-all duration-300">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className="font-gaming text-3xl sm:text-4xl font-black text-gradient"
                />
                <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
