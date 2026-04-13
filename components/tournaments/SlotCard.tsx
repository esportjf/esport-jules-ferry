'use client'

interface SlotCardProps {
  slotType: string
  player: {
    pseudo: string
    firstName: string
    lastName: string
    photo: string | null
  } | null
  golden?: boolean
}

const SLOT_LABELS: Record<string, string> = {
  binome_boy: 'Binôme (Garçon)',
  binome_girl: 'Binôme (Fille)',
  solo: 'Solo',
  team_member: 'Membre',
}

export function SlotCard({ slotType, player, golden = false }: SlotCardProps) {
  const borderClass = golden
    ? 'border-gold/50 bg-gold/5'
    : player
    ? 'border-neon-blue/30 bg-neon-blue/5'
    : 'border-dashed border-dark-600 bg-dark-900/50'

  return (
    <div className={`p-3 rounded-lg border-2 ${borderClass} transition-all duration-300 flex items-center gap-3`}>
      <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ${!player ? 'border border-dashed border-gray-600 flex items-center justify-center' : ''}`}>
        {player ? (
          <img
            src={player.photo || `https://api.dicebear.com/9.x/thumbs/svg?seed=${player.pseudo}`}
            alt={player.pseudo}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-600 text-lg">?</span>
        )}
      </div>
      <div className="min-w-0">
        {player ? (
          <>
            <p className="font-gaming text-xs font-bold text-white truncate">{player.pseudo}</p>
          </>
        ) : (
          <p className="text-gray-600 text-xs italic">Slot vide</p>
        )}
        <span className="text-[10px] text-gray-600">{SLOT_LABELS[slotType] || slotType}</span>
      </div>
    </div>
  )
}
