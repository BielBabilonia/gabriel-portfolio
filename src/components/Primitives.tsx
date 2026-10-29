import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../lib/cn'

export type Tone = 'up' | 'down' | 'degraded' | 'paused'

const dotColor: Record<Tone, string> = {
  up: 'bg-up',
  down: 'bg-down',
  degraded: 'bg-degraded',
  paused: 'bg-paused',
}

/** Colored status dot. Decorative: always pair it with a text label. */
export function StatusDot({ tone, pulse = false, className }: { tone: Tone; pulse?: boolean; className?: string }) {
  return (
    <span aria-hidden className={cn('relative inline-flex size-2.5 shrink-0', className)}>
      {pulse && <span className={cn('absolute inset-0 animate-pulse-ring rounded-full', dotColor[tone])} />}
      <span className={cn('relative inline-flex size-full rounded-full', dotColor[tone])} />
    </span>
  )
}

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('rounded-xl border border-border bg-surface shadow-card', className)} {...props} />
}

interface SectionProps {
  id: string
  title: string
  subtitle: string
  children: ReactNode
  aside?: ReactNode
}

export function Section({ id, title, subtitle, children, aside }: SectionProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="animate-fade-in">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 id={`${id}-title`} className="font-semibold text-fg">
            {title}
          </h2>
          <p className="text-sm text-muted">{subtitle}</p>
        </div>
        {aside}
      </div>
      {children}
    </section>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </li>
  )
}
