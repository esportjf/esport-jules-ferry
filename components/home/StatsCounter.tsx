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
      {/* Séparateur lumineux haut */}
      <div className="glow-line absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div
                className="text-center p-6 rounded-2xl transition-all duration-300 group"
                style={{
                  background: 'rgba(13,11,31,0.7)',
                  border: '1px solid rgba(45,27,105,0.6)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(123,63,228,0.5)'
                  el.style.boxShadow = '0 0 28px rgba(123,63,228,0.12)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(45,27,105,0.6)'
                  el.style.boxShadow = 'none'
                }}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className="font-mono text-3xl sm:text-4xl font-medium text-gradient block"
                />
                <p
                  className="font-body text-sm mt-2 tracking-wide"
                  style={{ color: 'rgba(237,232,255,0.38)' }}
                >
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
