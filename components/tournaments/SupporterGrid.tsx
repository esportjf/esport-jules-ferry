'use client'

interface Supporter {
  player: {
    pseudo: string
    firstName: string
    lastName: string
    photo: string | null
  }
}

interface SupporterGridProps {
  supporters: Supporter[]
  maxSlots?: number
}

export function SupporterGrid({ supporters, maxSlots = 16 }: SupporterGridProps) {
  const slots = Array.from({ length: maxSlots }, (_, i) => supporters[i] || null)

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
      {slots.map((supporter, i) => (
        <div
          key={i}
          className={`flex flex-col items-center p-2 rounded-lg ${
            supporter ? 'bg-dark-800 border border-dark-600' : 'border border-dashed border-dark-700'
          }`}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden mb-1">
            {supporter ? (
              <img
                src={supporter.player.photo || `https://api.dicebear.com/9.x/thumbs/svg?seed=${supporter.player.pseudo}`}
                alt={supporter.player.pseudo}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-dark-700 flex items-center justify-center text-gray-600 text-xs">?</div>
            )}
          </div>
          <span className="text-[9px] text-gray-400 truncate w-full text-center">
            {supporter ? supporter.player.pseudo : 'Libre'}
          </span>
        </div>
      ))}
    </div>
  )
}
