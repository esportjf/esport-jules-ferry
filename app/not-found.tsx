import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-gaming text-7xl font-black text-gradient mb-4" style={{ letterSpacing: '0.08em' }}>404</h1>
        <h2 className="font-gaming text-xl font-bold text-lavender mb-2">Page introuvable</h2>
        <p className="text-lavender/40 mb-6">Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg text-white font-gaming text-sm font-bold tracking-wider transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #7B3FE4 0%, #A259FF 100%)', boxShadow: '0 0 24px rgba(123,63,228,0.4)' }}
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
