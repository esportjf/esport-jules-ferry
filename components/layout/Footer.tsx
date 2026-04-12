import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-600/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center font-gaming text-sm font-bold text-white">
                JF
              </div>
              <span className="font-gaming text-sm font-bold text-gradient">E-SPORT JF</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Section e-sport du Lycée Jules Ferry, Versailles. Projet Educ Esport — France 2030.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-gaming text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/presentation', label: 'Présentation' },
                { href: '/joueurs', label: 'Joueurs' },
                { href: '/tournoi/hiver', label: 'Tournoi Hiver' },
                { href: '/tournoi/ete', label: 'Tournoi Été' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-500 hover:text-neon-blue text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partenaires */}
          <div>
            <h3 className="font-gaming text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">Partenaires</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://educ-esport.fr/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-neon-purple text-sm transition-colors">
                  Educ Esport
                </a>
              </li>
              <li><span className="text-gray-500 text-sm">I3SP — Université Paris Cité</span></li>
              <li><span className="text-gray-500 text-sm">ArmaTeam</span></li>
              <li><span className="text-gray-500 text-sm">France 2030</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-gaming text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Lycée Jules Ferry</li>
              <li>Versailles, France</li>
              <li>
                <a href="mailto:esportjf@gmail.com" className="hover:text-neon-blue transition-colors">
                  esportjf@gmail.com
                </a>
              </li>
              <li className="pt-2 text-xs">
                Référents : G. Roux (SII) &amp; A. Aloy (Anglais)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-dark-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Section E-sport Lycée Jules Ferry. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://educ-esport.fr/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-neon-blue transition-colors">
              Projet Educ Esport — France 2030
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
