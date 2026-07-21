'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'

interface QuizItem {
  question: string
  options: string[]
  answer: number
  explanation?: string
}

/**
 * Quiz items are authored, but every figure they reference is drawn from the
 * lesson's `extracted` blocks — see the provenance rule in the extraction
 * guide. Nothing here introduces a number that is not on the source map.
 */
export function Quiz({
  items,
  lessonUrl,
}: {
  items: QuizItem[]
  lessonUrl: string
}) {
  const [picked, setPicked] = useState<Record<number, number>>({})

  return (
    <section className="my-[var(--s-8)]" aria-labelledby="quiz-heading">
      <h2
        id="quiz-heading"
        className="mb-[var(--s-4)] font-serif text-[var(--text-h3)] text-[var(--ink-1)]"
      >
        Check your bearings
      </h2>

      <ol className="m-0 list-none space-y-[var(--s-4)] p-0">
        {items.map((q, qi) => {
          const choice = picked[qi]
          const answered = choice !== undefined
          const correct = choice === q.answer

          return (
            <li key={qi} className="card p-[var(--s-5)]">
              <p className="m-0 mb-[var(--s-3)] text-[14px] font-medium text-[var(--ink-1)]">
                {q.question}
              </p>

              <div
                role="group"
                aria-label={q.question}
                className="grid gap-[var(--s-2)]"
              >
                {q.options.map((opt, oi) => {
                  const isPicked = choice === oi
                  const isAnswer = oi === q.answer
                  const reveal = answered && (isPicked || isAnswer)

                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={answered}
                      onClick={() =>
                        setPicked((p) => ({ ...p, [qi]: oi }))
                      }
                      className="flex items-center gap-[var(--s-3)] rounded-[var(--r-md)] border px-[var(--s-4)] py-[var(--s-3)] text-left text-[13px] transition-all duration-[var(--d-fast)] ease-[var(--ease)] disabled:cursor-default"
                      style={{
                        borderColor: reveal
                          ? isAnswer
                            ? 'color-mix(in oklab, var(--green-3) 45%, var(--line-1))'
                            : 'color-mix(in oklab, var(--danger) 40%, var(--line-1))'
                          : 'var(--line-1)',
                        background: reveal
                          ? isAnswer
                            ? 'color-mix(in oklab, var(--green-3) 9%, var(--bg-2))'
                            : 'color-mix(in oklab, var(--danger) 7%, var(--bg-2))'
                          : 'var(--bg-2)',
                        color: 'var(--ink-1)',
                      }}
                    >
                      {reveal &&
                        (isAnswer ? (
                          <Check
                            size={14}
                            aria-hidden
                            style={{ color: 'var(--green-3)' }}
                          />
                        ) : (
                          <X
                            size={14}
                            aria-hidden
                            style={{ color: 'var(--danger)' }}
                          />
                        ))}
                      {opt}
                    </button>
                  )
                })}
              </div>

              {answered && q.explanation && (
                <p
                  className="m-0 mt-[var(--s-3)] text-[13px] leading-relaxed"
                  style={{
                    color: correct ? 'var(--ink-2)' : 'var(--ink-2)',
                  }}
                >
                  {q.explanation}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
