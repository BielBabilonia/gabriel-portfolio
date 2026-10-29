import type { ReactNode } from 'react'
import { profile, projects } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { formatClock, isWorkingHours, offsetLabel } from '../lib/time'
import { useNow } from '../lib/use-now'
import { StatusDot } from './Primitives'

function Cell({ label, value, hint }: { label: string; value: ReactNode; hint: ReactNode }) {
  return (
    // 2×2 on phones, one row of four from sm up; inner rules only.
    <div className="border-border-strong p-4 odd:border-r [&:nth-child(-n+2)]:border-b sm:border-r-0 sm:[&:nth-child(-n+2)]:border-b-0 sm:not-last:border-r">
      <dl>
        <dt className="label text-muted">{label}</dt>
        <dd className="mt-3 text-2xl font-semibold tracking-tight text-fg tabular-nums">{value}</dd>
        <dd className="mt-1 flex items-center gap-1.5 text-xs text-muted">{hint}</dd>
      </dl>
    </div>
  )
}

function LocalTime() {
  const { t, locale } = useI18n()
  const now = new Date(useNow(15_000))
  const working = isWorkingHours(now, profile.timeZone)
  return (
    <Cell
      label={`${t('stats.localTime')} · ${offsetLabel(now, profile.timeZone)}`}
      value={<time dateTime={now.toISOString()}>{formatClock(now, profile.timeZone, locale)}</time>}
      hint={
        <>
          <StatusDot tone={working ? 'up' : 'paused'} />
          {working ? t('stats.workingHours') : t('stats.offHours')}
        </>
      }
    />
  )
}

/** Spec-sheet row: four ruled cells. */
export function Stats() {
  const { t, l } = useI18n()
  return (
    <div className="grid grid-cols-2 border border-border-strong sm:grid-cols-4">
      <LocalTime />
      <Cell label={t('stats.languages')} value={l(profile.languages)} hint={t('stats.languagesHint')} />
      <Cell
        label={t('stats.services')}
        value={projects.filter((p) => p.state === 'live').length}
        hint={t('stats.servicesHint')}
      />
      <Cell label={t('stats.based')} value={l(profile.location)} hint={t('stats.basedHint')} />
    </div>
  )
}
