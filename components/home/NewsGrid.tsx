'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { formatDate } from '@/lib/utils'

interface NewsArticle {
  id: string
  title: string
  content: string
  imageUrl: string | null
  createdAt: string
}

export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p
              className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: 'rgba(162,89,255,0.6)' }}
            >
              Actualités
            </p>
            <h2 className="font-gaming text-2xl sm:text-3xl font-black text-lavender">
              Dernières <span className="text-gradient">Nouvelles</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ScrollReveal key={article.id} delay={i * 0.08}>
              <article
                className="group h-full flex flex-col rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'rgba(13,11,31,0.8)',
                  border: '1px solid rgba(45,27,105,0.6)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(123,63,228,0.45)'
                  el.style.boxShadow = '0 0 30px rgba(123,63,228,0.1)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(45,27,105,0.6)'
                  el.style.boxShadow = 'none'
                }}
              >
                {article.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <time
                    className="font-mono text-xs tracking-wider"
                    style={{ color: '#A259FF' }}
                  >
                    {formatDate(article.createdAt)}
                  </time>
                  <h3
                    className="font-gaming text-sm font-bold text-lavender mt-2 mb-2 line-clamp-2 transition-colors group-hover:text-neon-blue"
                  >
                    {article.title}
                  </h3>
                  <p
                    className="font-body text-sm line-clamp-3 flex-1 leading-relaxed"
                    style={{ color: 'rgba(237,232,255,0.38)' }}
                  >
                    {article.content}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
