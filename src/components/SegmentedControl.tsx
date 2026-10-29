import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface Option<T extends string> {
  value: T
  label: ReactNode
  /** Accessible name when the label is an icon. */
  ariaLabel?: string
  /** Hover hint; defaults to ariaLabel. */
  title?: string
  lang?: string
}

interface SegmentedControlProps<T extends string> {
  label: string
  options: readonly Option<T>[]
  value: T
  onChange: (value: T) => void
}

/** Row of square toggle keys, like hardware switches. */
export function SegmentedControl<T extends string>({ label, options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <div role="group" aria-label={label} className="inline-flex border border-border-strong">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            aria-label={option.ariaLabel}
            title={option.title ?? option.ariaLabel}
            lang={option.lang}
            onClick={() => onChange(option.value)}
            className={cn(
              'label inline-flex h-7 min-w-7 items-center justify-center border-l border-border-strong px-2 first:border-l-0 [&_svg]:size-3.5',
              active ? 'bg-fg text-bg' : 'text-muted hover:text-fg',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
