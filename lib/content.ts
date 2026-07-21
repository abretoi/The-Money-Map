import { chapters, lessons } from '#content'
import type { Chapter, Lesson } from '#content'

export type { Chapter, Lesson }

/** A block is one entry in a lesson's `blocks` array. */
export type Block = Lesson['blocks'][number]
export type BlockType = Block['type']

export const allChapters = (): Chapter[] =>
  [...chapters].sort((a, b) => a.order - b.order)

export const allLessons = (): Lesson[] =>
  [...lessons].sort((a, b) => a.order - b.order)

export const chapterBySlug = (slug: string): Chapter | undefined =>
  chapters.find((c) => c.slug === slug)

export const lessonsInChapter = (chapterSlug: string): Lesson[] =>
  lessons
    .filter((l) => l.chapter === chapterSlug)
    .sort((a, b) => a.order - b.order)

export const lessonBySlug = (
  chapterSlug: string,
  lessonSlug: string
): Lesson | undefined =>
  lessons.find((l) => l.chapter === chapterSlug && l.slug === lessonSlug)

/** Flat reading order across the whole book — powers prev/next and progress. */
export const readingOrder = (): Lesson[] =>
  allChapters().flatMap((c) => lessonsInChapter(c.slug))

export function neighbours(lesson: Lesson) {
  const order = readingOrder()
  const i = order.findIndex(
    (l) => l.chapter === lesson.chapter && l.slug === lesson.slug
  )
  return {
    prev: i > 0 ? order[i - 1] : undefined,
    next: i >= 0 && i < order.length - 1 ? order[i + 1] : undefined,
    position: i + 1,
    total: order.length,
  }
}
