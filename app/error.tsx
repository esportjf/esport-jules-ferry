'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-gaming text-4xl font-black text-red-500 mb-4">Erreur</h1>
        <p className="text-gray-500 mb-6">Une erreur inattendue s&apos;est produite.</p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-gaming text-sm font-bold hover:shadow-lg hover:shadow-neon-blue/25 transition-all"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
