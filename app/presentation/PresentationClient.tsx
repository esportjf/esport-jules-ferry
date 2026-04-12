'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PageTransition } from '@/components/layout/PageTransition'
import { GAME_NAMES, GAME_PLATFORMS, GAME_COLORS } from '@/lib/utils'

const timeline = [
  { date: 'Septembre 2023', title: 'Lancement de la section', description: 'Création de la section e-sport avec 10 élèves pionniers et le soutien du projet Educ Esport.' },
  { date: 'Décembre 2023', title: 'Premier Tournoi d\'Hiver', description: 'Première participation au Tournoi d\'Hiver au Campus Cyber de Puteaux. Titre de "Meilleur Lycée".' },
  { date: 'Mars 2024', title: 'Expansion de la section', description: 'La section passe à 20 élèves encadrés et 20 en session libre. Ajout de nouveaux jeux au programme.' },
  { date: 'Juin 2024', title: 'Victoire au Tournoi Régional d\'Été', description: 'Sacre au Grand Tournoi Régional à Athletica, Eaubonne — 800 élèves, 30 établissements.' },
  { date: 'Décembre 2024', title: 'Double Victoire au Tournoi d\'Hiver', description: 'Deuxième titre consécutif de "Meilleur Lycée" au Campus Cyber.' },
  { date: 'Avril 2025', title: 'Partenariat renforcé ArmaTeam', description: 'Sessions de coaching avec des joueurs professionnels et développement du programme pédagogique.' },
  { date: 'Aujourd\'hui', title: 'En route vers de nouveaux sommets', description: 'Préparation des tournois 2026 et développement du projet sur 3 ans.' },
]

const objectives = [
  { icon: '🧠', title: 'Compétences psychosociales', description: 'Développer la résilience, la gestion du stress et la confiance en soi.' },
  { icon: '🤝', title: 'Coopération', description: 'Apprendre le travail d\'équipe, la communication et la stratégie collective.' },
  { icon: '⚖️', title: 'Mixité', description: 'Promouvoir l\'inclusion et l\'égalité dans le gaming et l\'e-sport.' },
  { icon: '🏫', title: 'Climat scolaire', description: 'Améliorer le bien-être et l\'engagement des élèves dans la vie du lycée.' },
  { icon: '🎯', title: 'Lutte contre le décrochage', description: 'Remotiver les élèves par le jeu et la compétition encadrée.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Relation famille-école', description: 'Impliquer les familles dans le parcours numérique de leurs enfants.' },
  { icon: '💻', title: 'Compétences numériques', description: 'Maîtriser les outils numériques et comprendre l\'écosystème digital.' },
  { icon: '🎮', title: 'Apprentissage par le jeu', description: 'Utiliser le gaming comme vecteur d\'apprentissage et de développement.' },
]

const games = [
  { key: 'lol', description: 'MOBA stratégique en 5v5. Travail d\'équipe, communication et prise de décision rapide.' },
  { key: 'valorant', description: 'FPS tactique 5v5. Précision, stratégie et coordination d\'équipe.' },
  { key: 'fc26', description: 'Simulation de football. Réflexes, tactique et esprit sportif.' },
  { key: 'rocket_league', description: 'Football motorisé en arène. Mécanique, aérien et synergie de duo.' },
  { key: 'mario_kart', description: 'Course fun et compétitive. Adaptabilité, gestion des items et régularité.' },
  { key: 'smash', description: 'Jeu de combat multijoueur. Réflexes, lecture de l\'adversaire et maîtrise technique.' },
]

const pillars = [
  { icon: '🚀', title: 'Croissance', description: 'Doubler le nombre d\'élèves encadrés et ouvrir la section à d\'autres jeux et plateformes.' },
  { icon: '🏅', title: 'Excellence', description: 'Viser les finales nationales et devenir une référence parmi les lycées e-sport de France.' },
  { icon: '🌍', title: 'Rayonnement', description: 'Créer des échanges avec d\'autres établissements et organiser nos propres tournois.' },
]

export function PresentationClient() {
  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <motion.h1
            className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Notre <span className="text-gradient">Section</span>
          </motion.h1>
          <motion.p
            className="text-gray-500 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Une section e-sport éducative, compétitive et inclusive, intégrée au projet national Educ Esport.
          </motion.p>
        </section>

        {/* Timeline */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <ScrollReveal>
            <h2 className="font-gaming text-2xl font-black text-white mb-10 text-center">
              Notre <span className="text-gradient">Histoire</span>
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink" />

            {timeline.map((item, i) => (
              <ScrollReveal key={item.date} delay={i * 0.1}>
                <div className={`relative mb-8 md:flex ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 w-5 h-5 rounded-full bg-dark-900 border-2 border-neon-blue z-10" />
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-10' : 'md:pr-10 md:text-right'}`}>
                    <span className="text-neon-blue text-xs font-bold">{item.date}</span>
                    <h3 className="font-gaming text-sm font-bold text-white mt-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Objectives */}
        <section className="bg-dark-800/30 py-20 mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-gaming text-2xl font-black text-white mb-10 text-center">
                Nos <span className="text-gradient">Objectifs</span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {objectives.map((obj, i) => (
                <ScrollReveal key={obj.title} delay={i * 0.05}>
                  <div className="card-gaming p-5 h-full text-center">
                    <div className="text-3xl mb-3">{obj.icon}</div>
                    <h3 className="font-gaming text-xs font-bold text-white mb-2">{obj.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{obj.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Method */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <ScrollReveal>
            <h2 className="font-gaming text-2xl font-black text-white mb-10 text-center">
              Notre <span className="text-gradient">Méthode</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Théorie', desc: '30 minutes de cours sur la stratégie, l\'analyse de jeu et les compétences psychosociales.', color: '#00D4FF' },
              { step: '02', title: 'Échauffement', desc: 'Exercices de warm-up physiques et cognitifs pour préparer la session.', color: '#8B5CF6' },
              { step: '03', title: 'Pratique', desc: 'Entraînement encadré sur les jeux, avec objectifs spécifiques et feedback en temps réel.', color: '#EC4899' },
              { step: '04', title: 'Débriefing', desc: 'Retour collectif sur la session : analyse des performances et axes d\'amélioration.', color: '#FFD700' },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.1}>
                <div className="card-gaming p-5 h-full">
                  <span className="font-gaming text-2xl font-black" style={{ color: item.color }}>{item.step}</span>
                  <h3 className="font-gaming text-sm font-bold text-white mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Games */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <ScrollReveal>
            <h2 className="font-gaming text-2xl font-black text-white mb-10 text-center">
              Nos <span className="text-gradient">Jeux</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, i) => (
              <ScrollReveal key={game.key} delay={i * 0.1}>
                <div
                  className="card-gaming p-6 h-full group"
                  style={{ borderColor: `${GAME_COLORS[game.key]}20` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-gaming text-sm font-bold" style={{ color: GAME_COLORS[game.key] }}>
                      {GAME_NAMES[game.key]}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-dark-700 text-gray-400">
                      {GAME_PLATFORMS[game.key]}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{game.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Vision 3 years */}
        <section className="bg-dark-800/30 py-20 mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-gaming text-2xl font-black text-white mb-10 text-center">
                Vision à <span className="text-gradient">3 ans</span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, i) => (
                <ScrollReveal key={pillar.title} delay={i * 0.15}>
                  <div className="text-center p-8 rounded-2xl bg-dark-800 border border-dark-600 hover:border-neon-blue/30 transition-all duration-300">
                    <div className="text-4xl mb-4">{pillar.icon}</div>
                    <h3 className="font-gaming text-base font-bold text-white mb-3">{pillar.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-gaming text-2xl font-black text-white mb-10 text-center">
              Nos <span className="text-gradient">Partenaires</span>
            </h2>
          </ScrollReveal>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {['Educ Esport', 'ArmaTeam', 'I3SP', 'France 2030'].map((partner, i) => (
              <ScrollReveal key={partner} delay={i * 0.1}>
                <div className="px-8 py-4 rounded-xl bg-dark-800 border border-dark-600 hover:border-neon-blue/30 transition-all">
                  <span className="font-gaming text-sm text-gray-400">{partner}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
