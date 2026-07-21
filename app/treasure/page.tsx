import type { Metadata } from 'next'
import { TreasureHall } from '@/components/treasure/TreasureHall'

export const metadata: Metadata = {
  title: 'Treasure Hall',
  description: 'Your doubloons, treasure chests, and the voyage certificate.',
}

export default function TreasurePage() {
  return <TreasureHall />
}
