import type { Block } from '@/lib/content'
import { Timeline } from './Timeline'
import { Comparison } from './Comparison'
import { Buckets } from './Buckets'
import { Flow } from './Flow'
import { DataTable } from './DataTable'
import { Phases } from './Phases'
import { Stats } from './Stats'
import { Note } from './Note'

/**
 * The block registry.
 *
 * Adding a block type means touching three places: the Zod schema in
 * velite.config.ts, a component here, and a flattener in lib/search.ts.
 * Keeping the switch exhaustive means TypeScript catches a missing renderer
 * at build time rather than rendering nothing at runtime.
 */
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'timeline':
      return <Timeline block={block} />
    case 'comparison':
      return <Comparison block={block} />
    case 'buckets':
      return <Buckets block={block} />
    case 'flow':
      return <Flow block={block} />
    case 'table':
      return <DataTable block={block} />
    case 'phases':
      return <Phases block={block} />
    case 'stat':
      return <Stats block={block} />
    case 'note':
      return <Note block={block} />
    default: {
      const exhaustive: never = block
      return exhaustive
    }
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockRenderer key={i} block={b} />
      ))}
    </>
  )
}
