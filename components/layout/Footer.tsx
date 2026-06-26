'use client'

import Link from 'next/link'

const footerLinkClass = "font-body text-sm transition-colors"

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a
      href={href}
      {...props}
      className={footerLinkClass}
      style={{ color: 'rgba(237,232,255,0.38)' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = '#A259FF' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(237,232,255,0.38)' }}
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer
      className="mt-20"
      style={{
        background: '#06040F',
        borderTop: '1px solid rgba(45,27,105,0.5)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="E-Sport JF" className="h-8 w-auto" />
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(237,232,255,0.32)' }}>
              Section e-sport du Lycée Jules Ferry, Versailles. Projet Educ Esport — France 2030.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-gaming text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: 'rgba(162,89,255,0.65)' }}
            >
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/presentation', label: 'Présentation' },
                { href: '/joueurs', label: 'Joueurs' },
                { href: '/tournoi/hiver', label: 'Tournoi Hiver' },
                { href: '/tournoi/ete', label: 'Tournoi Été' },
              ].map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Partenaires */}
          <div>
            <h3
              className="font-gaming text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: 'rgba(162,89,255,0.65)' }}
            >
              Partenaires
            </h3>
            <ul className="space-y-2.5">
              <li>
                <FooterLink href="https://educ-esport.fr/" external>Educ Esport</FooterLink>
              </li>
              <li><span className="font-body text-sm" style={{ color: 'rgba(237,232,255,0.32)' }}>I3SP — Université Paris Cité</span></li>
              <li><span className="font-body text-sm" style={{ color: 'rgba(237,232,255,0.32)' }}>ArmaTeam</span></li>
              <li><span className="font-body text-sm" style={{ color: 'rgba(237,232,255,0.32)' }}>France 2030</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-gaming text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: 'rgba(162,89,255,0.65)' }}
            >
              Contact
            </h3>
            <ul className="space-y-2.5 font-body text-sm" style={{ color: 'rgba(237,232,255,0.32)' }}>
              <li>Lycée Jules Ferry</li>
              <li>Versailles, France</li>
              <li>
                <FooterLink href="mailto:esportjf@gmail.com">esportjf@gmail.com</FooterLink>
              </li>
              <li className="pt-1 text-xs" style={{ color: 'rgba(237,232,255,0.22)' }}>
                Référents : G. Roux (SII) &amp; A. Aloy (Anglais)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(45,27,105,0.4)' }}
        >
          <p className="font-body text-xs" style={{ color: 'rgba(237,232,255,0.22)' }}>
            &copy; {new Date().getFullYear()} Section E-sport Lycée Jules Ferry. Tous droits réservés.
          </p>
          <FooterLink href="https://educ-esport.fr/" external>
            Projet Educ Esport — France 2030
          </FooterLink>
        </div>
      </div>
    </footer>
  )
}
