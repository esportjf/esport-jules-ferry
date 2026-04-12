'use client'

import { HeroSection } from '@/components/home/HeroSection'
import { StatsCounter } from '@/components/home/StatsCounter'
import { NewsGrid } from '@/components/home/NewsGrid'
import { CalendarTimeline } from '@/components/home/CalendarTimeline'
import { PalmaresSection } from '@/components/home/PalmaresSection'

interface HomeClientProps {
  articles: any[]
  events: any[]
}

export function HomeClient({ articles, events }: HomeClientProps) {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <PalmaresSection />
      <NewsGrid articles={articles} />
      <CalendarTimeline events={events} />
    </>
  )
}
