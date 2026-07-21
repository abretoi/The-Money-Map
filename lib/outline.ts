import { allChapters, lessonsInChapter } from './content'

export interface OutlineChapter {
  slug: string
  title: string
  island: string
  order: number
  url: string
  lessons: { slug: string; title: string; url: string }[]
}

/** Slim navigation outline shared by the desktop sidebar and mobile drawer.
 *  Built once on the server; the full lesson set never reaches the client. */
export function buildOutline(): OutlineChapter[] {
  return allChapters().map((c) => ({
    slug: c.slug,
    title: c.title,
    island: c.island ?? '',
    order: c.order,
    url: c.url,
    lessons: lessonsInChapter(c.slug).map((l) => ({
      slug: l.slug,
      title: l.title,
      url: l.url,
    })),
  }))
}
