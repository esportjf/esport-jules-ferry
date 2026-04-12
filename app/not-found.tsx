import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-gaming text-6xl font-black text-gradient mb-4">404</h1>
        <h2 className="font-gaming text-xl font-bold text-white mb-2">Page introuvable</h2>
        <p className="text-gray-500 mb-6">Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-gaming text-sm font-bold hover:shadow-lg hover:shadow-neon-blue/25 transition-all"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
