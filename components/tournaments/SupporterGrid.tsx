'use client'

interface Supporter {
  id: string
  name: string
}

interface SupporterGridProps {
  supporters: Supporter[]
  maxSlots: number
}

export function SupporterGrid({ supporters, maxSlots }: SupporterGridProps) {
  const emptyCount = Math.max(0, maxSlots - supporters.length)

  return (
    <div className="flex flex-wrap gap-2">
      {supporters.map((s) => (
        <div
          key={s.id}
          className="px-3 py-1.5 rounded-lg bg-dark-800 border border-neon-purple/20 text-sm text-gray-300"
        >
          {s.name}
        </div>
      ))}
      {Array.from({ length: emptyCount }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="px-3 py-1.5 rounded-lg border border-dashed border-dark-600 text-sm text-gray-600 italic"
        >
          Libre
        </div>
      ))}
    </div>
  )
}
