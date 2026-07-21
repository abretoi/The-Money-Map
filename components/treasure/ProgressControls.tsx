'use client'

import { useRef, useState } from 'react'
import { RotateCcw, Check, X } from 'lucide-react'
import { Doubloon, TreasureChest } from '@/components/art/Icons'
import { useProgress } from '@/hooks/useProgress'

/**
 * Save (export a backup) + Reset (wipe the voyage) controls.
 *
 * `variant="menu"` renders the labelled set for the sidebar; `variant="chip"`
 * renders a compact Save button for the top bar; `variant="reset-chip"` renders
 * a compact Reset Journey button for the top bar. All share the gold treasure
 * styling of the doubloon counter.
 */
export function ProgressControls({
  variant = 'menu',
}: {
  variant?: 'menu' | 'chip' | 'reset-chip'
}) {
  const { serialize, restore, reset, hydrated } = useProgress()
  const [saved, setSaved] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [confirmingChip, setConfirmingChip] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function download() {
    const blob = new Blob([serialize()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'the-money-map-progress.json'
    a.click()
    URL.revokeObjectURL(url)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function onRestoreFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    file.text().then((t) => restore(t))
    e.target.value = ''
  }

  if (!hydrated) return null

  const chipStyle = {
    borderColor: 'color-mix(in oklab, var(--gold) 32%, var(--line-1))',
    background: 'var(--gold-soft)',
    color: 'var(--gold)',
  } as const

  if (variant === 'chip') {
    return (
      <button
        type="button"
        onClick={download}
        aria-label="Save your voyage — download a progress backup"
        className="inline-flex items-center gap-[var(--s-2)] rounded-[var(--r-md)] border px-[var(--s-3)] py-[7px] text-[13px] transition-all duration-[var(--d-fast)] ease-[var(--ease)] hover:-translate-y-px"
        style={chipStyle}
      >
        {saved ? <Check size={15} /> : <TreasureChest className="size-[17px]" />}
        <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
      </button>
    )
  }

  if (variant === 'reset-chip') {
    if (confirmingChip) {
      return (
        <span className="inline-flex items-center gap-[2px] rounded-[var(--r-md)] border px-[var(--s-2)] py-[5px] text-[12px]"
          style={{ borderColor: 'color-mix(in oklab, var(--danger) 45%, var(--line-1))' }}>
          <button
            type="button"
            onClick={() => {
              reset()
              setConfirmingChip(false)
            }}
            className="px-[var(--s-2)] py-[2px] font-medium"
            style={{ color: 'var(--danger)' }}
          >
            Reset all?
          </button>
          <button
            type="button"
            onClick={() => setConfirmingChip(false)}
            aria-label="Cancel reset"
            className="grid size-5 place-items-center rounded-full text-[var(--ink-3)] hover:text-[var(--ink-1)]"
          >
            <X size={13} />
          </button>
        </span>
      )
    }
    return (
      <button
        type="button"
        onClick={() => setConfirmingChip(true)}
        aria-label="Reset your journey — clear all progress"
        className="inline-flex items-center gap-[var(--s-2)] rounded-[var(--r-md)] border px-[var(--s-3)] py-[7px] text-[13px] transition-all duration-[var(--d-fast)] ease-[var(--ease)] hover:-translate-y-px"
        style={chipStyle}
      >
        <RotateCcw size={15} />
        <span className="hidden sm:inline">Reset</span>
      </button>
    )
  }

  return (
    <div className="mt-[var(--s-4)] border-t border-[var(--line-1)] pt-[var(--s-4)]">
      <p className="m-0 mb-[var(--s-2)] text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
        Your voyage
      </p>

      <div className="grid gap-[var(--s-2)]">
        <button
          type="button"
          onClick={download}
          className="hover-gradient flex items-center gap-[var(--s-2)] rounded-[var(--r-md)] border border-[var(--line-1)] bg-[var(--bg-2)] px-[var(--s-3)] py-[var(--s-2)] text-[13px] text-[var(--ink-1)]"
        >
          {saved ? (
            <Check size={14} style={{ color: 'var(--gold)' }} />
          ) : (
            <Doubloon className="size-[16px]" style={{ color: 'var(--gold)' }} />
          )}
          {saved ? 'Progress saved' : 'Save progress'}
        </button>

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="hover-gradient flex items-center gap-[var(--s-2)] rounded-[var(--r-md)] border border-[var(--line-1)] bg-[var(--bg-2)] px-[var(--s-3)] py-[var(--s-2)] text-[13px] text-[var(--ink-2)]"
        >
          <TreasureChest className="size-[16px] text-[var(--ink-3)]" />
          Load a saved voyage
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          onChange={onRestoreFile}
          className="hidden"
        />

        {confirming ? (
          <div className="flex gap-[var(--s-2)]">
            <button
              type="button"
              onClick={() => {
                reset()
                setConfirming(false)
              }}
              className="flex-1 rounded-[var(--r-md)] border px-[var(--s-3)] py-[var(--s-2)] text-[12px]"
              style={{
                borderColor: 'color-mix(in oklab, var(--danger) 45%, var(--line-1))',
                color: 'var(--danger)',
              }}
            >
              Confirm reset
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-[var(--r-md)] border border-[var(--line-1)] px-[var(--s-3)] py-[var(--s-2)] text-[12px] text-[var(--ink-2)]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="flex items-center gap-[var(--s-2)] rounded-[var(--r-md)] border border-[var(--line-1)] bg-[var(--bg-2)] px-[var(--s-3)] py-[var(--s-2)] text-[13px] text-[var(--ink-3)] transition-colors duration-[var(--d-fast)] hover:text-[var(--danger)]"
          >
            <RotateCcw size={14} />
            Reset progress
          </button>
        )}
      </div>
    </div>
  )
}
