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

const TYPE_COLORS: Record<string, string> = {
  tournament: '#FFD700',
  training: '#00D4FF',
  event: '#EC4899',
}

const TYPE_LABELS: Record<string, string> = {
  tournament: 'Tournoi',
  training: 'Entraînement',
  event: 'Événement',
}

export function CalendarTimeline({ events }: { events: CalendarEvent[] }) {
  return (
    <section className="py-20 bg-dark-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-gaming text-2xl sm:text-3xl font-black text-white mb-2">
              Calendrier <span className="text-gradient">E-sport</span>
            </h2>
            <p className="text-gray-500">Nos prochains événements et entraînements</p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink" />

          <div className="space-y-6">
            {events.map((event, i) => {
              const color = TYPE_COLORS[event.type] || '#00D4FF'
              return (
                <ScrollReveal key={event.id} delay={i * 0.1}>
                  <div className="relative pl-16">
                    {/* Dot */}
                    <div
                      className="absolute left-4 top-4 w-5 h-5 rounded-full border-2 bg-dark-900"
                      style={{ borderColor: color, boxShadow: `0 0 10px ${color}40` }}
                    />

                    <div className="card-gaming p-4">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${color}15`, color }}
                        >
                          {TYPE_LABELS[event.type] || event.type}
                        </span>
                        <time className="text-gray-500 text-xs">{formatDate(event.date)}</time>
                      </div>
                      <h3 className="font-gaming text-sm font-bold text-white">{event.title}</h3>
                      {event.description && (
                        <p className="text-gray-500 text-sm mt-1">{event.description}</p>
                      )}
                      {event.location && (
                        <p className="text-gray-600 text-xs mt-2">📍 {event.location}</p>
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
