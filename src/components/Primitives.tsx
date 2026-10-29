import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  index: number
  title: string
  subtitle: string
  children: ReactNode
}

/** Numbered manual section: "02 — Services", with a hairline rule. */
export function Section({ id, index, title, subtitle, children }: SectionProps) {
  return (
    <section aria-labelledby={`${id}-title`}>
      <header className="mb-5 flex items-baseline gap-3 border-t border-border-strong pt-3">
        {/* Orange is a mark, not text: it lacks contrast for small type on paper. */}
        <span className="label flex items-center gap-2 text-fg" aria-hidden>
          <span className="inline-block size-2 bg-accent" />
          {String(index).padStart(2, '0')}
        </span>
        <h2 id={`${id}-title`} className="label text-fg">
          {title}
        </h2>
        <p className="label ml-auto hidden text-subtle sm:block">{subtitle}</p>
      </header>
      {children}
    </section>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return <li className="border border-border px-1.5 py-px font-mono text-[11px] text-muted">{children}</li>
}
