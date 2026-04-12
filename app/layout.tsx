import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Section E-sport — Lycée Jules Ferry Versailles',
  description: 'La section e-sport du Lycée Jules Ferry de Versailles. Compétitions, entraînements et développement des compétences par le gaming.',
  keywords: ['esport', 'lycée', 'Jules Ferry', 'Versailles', 'gaming', 'éducation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-dark-900 text-gray-200 font-body">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
