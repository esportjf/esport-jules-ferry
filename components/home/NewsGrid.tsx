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
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-gaming text-2xl sm:text-3xl font-black text-white mb-2">
              Dernières <span className="text-gradient">Actualités</span>
            </h2>
            <p className="text-gray-500">L&apos;essentiel de la scène esport et de notre section</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ScrollReveal key={article.id} delay={i * 0.1}>
              <div className="card-gaming group h-full flex flex-col">
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
                  <time className="text-neon-blue text-xs font-medium">{formatDate(article.createdAt)}</time>
                  <h3 className="font-gaming text-sm font-bold text-white mt-2 mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 flex-1">{article.content}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
