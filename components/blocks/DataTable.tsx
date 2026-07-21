import { BlockShell } from './BlockShell'
import type { Block } from '@/lib/content'

type T = Extract<Block, { type: 'table' }>

/** Wide tables scroll inside their own container so the page body never
 *  scrolls horizontally. */
export function DataTable({ block }: { block: T }) {
  return (
    <BlockShell title={block.title} source={block.source} asOf={block.asOf}>
      <div className="card overflow-x-auto p-0">
        <table className="w-full border-collapse text-left text-[13px]">
          <thead>
            <tr>
              {block.headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className="whitespace-nowrap border-b border-[var(--line-1)] px-[var(--s-4)] py-[var(--s-3)] text-[11px] uppercase tracking-[0.12em] text-[var(--gold)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[var(--line-1)] last:border-0"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={
                      'px-[var(--s-4)] py-[var(--s-3)] align-top leading-relaxed ' +
                      (j === 0
                        ? 'font-medium text-[var(--ink-1)]'
                        : 'text-[var(--ink-2)]')
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BlockShell>
  )
}
