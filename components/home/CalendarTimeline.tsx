'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { formatDate } from '@/lib/utils'

interface CalendarEvent {
  id: string
  title: string
  description: string | null
  date: string
  location: string | null
  type: string
}

const TYPE_CONFIG: Record<string, { color: string; label: string }> = {
  tournament: { color: '#FFD700', label: 'Tournoi' },
  training:   { color: '#00D4FF', label: 'Entraînement' },
  event:      { color: '#E040FB', label: 'Événement' },
}

export function CalendarTimeline({ events }: { events: CalendarEvent[] }) {
  return (
    <section
      className="py-24 relative"
      style={{ background: 'linear-gradient(180deg, rgba(22,13,56,0.45) 0%, rgba(6,4,15,0) 100%)' }}
    >
      {/* Séparateur lumineux haut et bas */}
      <div className="glow-line absolute top-0 left-0 right-0" aria-hidden="true" />
      <div className="glow-line absolute bottom-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p
              className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: 'rgba(162,89,255,0.6)' }}
            >
              Planning
            </p>
            <h2 className="font-gaming text-2xl sm:text-3xl font-black text-lavender">
              Calendrier <span className="text-gradient">E-sport</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Ligne timeline — violet → magenta */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: '24px',
              background: 'linear-gradient(180deg, #7B3FE4 0%, #A259FF 50%, #E040FB 100%)',
              opacity: 0.5,
            }}
          />

          <div className="space-y-5">
            {events.map((event, i) => {
              const cfg = TYPE_CONFIG[event.type] ?? { color: '#A259FF', label: event.type }
              return (
                <ScrollReveal key={event.id} delay={i * 0.08}>
                  <div className="relative pl-16">
                    {/* Point sur la timeline */}
                    <div
                      className="absolute top-4 w-5 h-5 rounded-full"
                      style={{
                        left: '15px',
                        border: `2px solid ${cfg.color}`,
                        background: '#06040F',
                        boxShadow: `0 0 10px ${cfg.color}50`,
                      }}
                    />

                    <div
                      className="p-4 rounded-xl transition-all duration-300 group"
                      style={{
                        background: 'rgba(13,11,31,0.8)',
                        border: '1px solid rgba(45,27,105,0.55)',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget
                        el.style.borderColor = `${cfg.color}35`
                        el.style.boxShadow = `0 0 20px ${cfg.color}12`
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget
                        el.style.borderColor = 'rgba(45,27,105,0.55)'
                        el.style.boxShadow = 'none'
                      }}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="font-mono text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-sm"
                          style={{
                            background: `${cfg.color}12`,
                            color: cfg.color,
                            border: `1px solid ${cfg.color}25`,
                          }}
                        >
                          {cfg.label}
                        </span>
                        <time
                          className="font-mono text-xs"
                          style={{ color: 'rgba(237,232,255,0.32)' }}
                        >
                          {formatDate(event.date)}
                        </time>
                      </div>
                      <h3 className="font-gaming text-sm font-bold text-lavender">{event.title}</h3>
                      {event.description && (
                        <p
                          className="font-body text-sm mt-1 leading-relaxed"
                          style={{ color: 'rgba(237,232,255,0.42)' }}
                        >
                          {event.description}
                        </p>
                      )}
                      {event.location && (
                        <p
                          className="font-mono text-xs mt-2"
                          style={{ color: 'rgba(237,232,255,0.25)' }}
                        >
                          📍 {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
