'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-gaming text-4xl font-black text-red-500 mb-4">Erreur</h1>
        <p className="text-lavender/40 mb-6">Une erreur inattendue s&apos;est produite.</p>
        <button
          onClick={reset}
          className="inline-block px-6 py-3 rounded-lg text-white font-gaming text-sm font-bold tracking-wider transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #7B3FE4 0%, #A259FF 100%)', boxShadow: '0 0 24px rgba(123,63,228,0.4)' }}
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
