import type { ReactNode } from 'react'
import { profile, projects } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { formatClock, isWorkingHours, offsetLabel } from '../lib/time'
import { useNow } from '../lib/use-now'
import { Card, StatusDot } from './Primitives'

function Tile({ label, value, hint }: { label: string; value: ReactNode; hint: ReactNode }) {
  return (
    <Card className="p-4">
      <dl>
        <dt className="text-sm text-muted">{label}</dt>
        <dd className="mt-1.5 text-2xl font-semibold tracking-tight text-fg">{value}</dd>
        <dd className="mt-1 flex items-center gap-1.5 text-xs text-muted">{hint}</dd>
      </dl>
    </Card>
  )
}

function LocalTime() {
  const { t, locale } = useI18n()
  const now = new Date(useNow(15_000))
  const working = isWorkingHours(now, profile.timeZone)
  return (
    <Tile
      label={`${t('stats.localTime')} · ${offsetLabel(now, profile.timeZone)}`}
      value={<time dateTime={now.toISOString()}>{formatClock(now, profile.timeZone, locale)}</time>}
      hint={
        <>
          <StatusDot tone={working ? 'up' : 'paused'} className="size-2" />
          {working ? t('stats.workingHours') : t('stats.offHours')}
        </>
      }
    />
  )
}

export function Stats() {
  const { t, l } = useI18n()
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <LocalTime />
      <Tile label={t('stats.languages')} value={l(profile.languages)} hint={t('stats.languagesHint')} />
      <Tile
        label={t('stats.services')}
        value={projects.filter((p) => p.state === 'live').length}
        hint={t('stats.servicesHint')}
      />
      <Tile label={t('stats.based')} value={l(profile.location)} hint={t('stats.basedHint')} />
    </div>
  )
}
