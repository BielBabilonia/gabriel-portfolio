import { careerIncidents, type IncidentStatus } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { cn } from '../lib/cn'
import { formatMonth } from '../lib/time'
import type { SimulatedIncident } from '../lib/use-outage'
import { Card, Section } from './Primitives'

interface TimelineItem {
  key: string
  status: IncidentStatus
  title: string
  org?: string
  body: string
  date: string
}

const statusStyle: Record<IncidentStatus, { dot: string; badge: string }> = {
  resolved: { dot: 'bg-up ring-up/50', badge: 'bg-up-soft text-up-fg' },
  ongoing: { dot: 'bg-accent ring-accent/50', badge: 'bg-accent-soft text-fg' },
  maintenance: { dot: 'bg-degraded ring-degraded/50', badge: 'bg-degraded-soft text-degraded-fg' },
}

export function IncidentHistory({ simulated }: { simulated: readonly SimulatedIncident[] }) {
  const { t, l, locale } = useI18n()

  const items: TimelineItem[] = [
    ...simulated.map((incident) => ({
      key: `sim-${incident.at}`,
      status: 'resolved' as const,
      title: t('incidents.simulatedTitle'),
      body: t('incidents.simulatedBody', { seconds: incident.seconds }),
      date: new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(incident.at),
    })),
    ...careerIncidents.map((incident, index) => {
      const start = formatMonth(incident.start, locale)
      const period =
        incident.end === undefined
          ? start
          : `${start} – ${incident.end ? formatMonth(incident.end, locale) : t('incidents.present')}`
      return {
        key: `career-${index}`,
        status: incident.status,
        title: l(incident.title),
        org: incident.org,
        body: l(incident.body),
        date: period,
      }
    }),
  ]

  return (
    <Section id="incidents" title={t('incidents.title')} subtitle={t('incidents.subtitle')}>
      <Card className="p-5">
        <ol>
          {items.map((item, index) => (
            <li key={item.key} className="relative flex animate-fade-in gap-4 pb-6 last:pb-0">
              {index < items.length - 1 && <span aria-hidden className="absolute top-5 bottom-0 left-[7px] w-px bg-border" />}
              <span
                aria-hidden
                className={cn('relative mt-1 size-[15px] shrink-0 rounded-full border-[3px] border-surface ring-1', statusStyle[item.status].dot)}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="font-medium text-fg">{item.title}</h3>
                  <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', statusStyle[item.status].badge)}>
                    {t(`incidents.${item.status}`)}
                  </span>
                </div>
                {item.org && <p className="mt-0.5 text-sm font-medium text-fg/80">{item.org}</p>}
                <p className="mt-1 text-sm text-muted">{item.body}</p>
                <p className="mt-1 font-mono text-xs text-subtle">{item.date}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </Section>
  )
}
