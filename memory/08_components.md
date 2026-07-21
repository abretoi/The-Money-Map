# 08 · Components

## Block registry

`components/blocks/index.tsx` maps each block `type` to a component. The switch
is exhaustive (`never` default), so a missing renderer is a TypeScript error,
not a silent blank.

| type | component | note |
|---|---|---|
| timeline | `Timeline` | rail on wide, spine on narrow |
| comparison | `Comparison` | `highlight` figure is the anchor |
| buckets | `Buckets` | `layout: chips` for label-only pills |
| flow | `Flow` | numbering is content, not decoration |
| table | `DataTable` | scrolls inside its own container |
| phases | `Phases` | positional green ramp encodes progression |
| stat | `Stats` | figures render verbatim |
| note | `Note` | info / warning / disclaimer / insight |

`BlockShell` wraps every block with title + provenance affordance (`data-source`)
and the `asOf` badge.

## Reader

- `Sidebar` (server) builds a slim outline → `ChapterNav` (client). The full
  lesson set with blocks must never reach the browser bundle.
- `useProgress` — local-first progress/bookmarks in localStorage. Shape is a
  plain serialisable record keyed by lesson URL, ready for a future sync layer.
- `SearchTrigger` — ⌘K palette; fetches `/search-index.json` lazily on first
  open so the index never enters the initial bundle.
- `Quiz`, `LessonMeta`, `ProgressSummary`, `ThemeToggle`, `TopBar`.

## Rules

- Add a block type → touch three files: schema, component, search flattener.
- Server components by default; `'use client'` only where state/effects require.
- Every interactive element is keyboard reachable and has a visible focus ring.
