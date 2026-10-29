import { careerIncidents, type IncidentStatus } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { cn } from '../lib/cn'
import { formatMonth } from '../lib/time'
import type { SimulatedIncident } from '../lib/use-outage'
import { Section } from './Primitives'

interface LogEntry {
  key: string
  status: IncidentStatus
  title: string
  org?: string
  body: string
  date: string
}

const tagStyle: Record<IncidentStatus, string> = {
  resolved: 'border-border-strong text-fg',
  ongoing: 'border-accent bg-accent text-accent-fg',
  maintenance: 'border-degraded bg-degraded-soft text-degraded-fg',
}

/** Career timeline as an incident log: date column, status tag, entry. */
export function IncidentHistory({ simulated }: { simulated: readonly SimulatedIncident[] }) {
  const { t, l, locale } = useI18n()

  const entries: LogEntry[] = [
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
    <Section id="incidents" index={3} title={t('incidents.title')} subtitle={t('incidents.subtitle')}>
      <ol className="divide-y divide-border border-b border-border">
        {entries.map((entry) => (
          <li
            key={entry.key}
            className="grid animate-fade-in gap-2 py-4 first:pt-0 sm:grid-cols-[13rem_1fr] sm:gap-8"
          >
            <p className="label pt-1 text-muted">{entry.date}</p>
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-semibold text-fg">{entry.title}</h3>
                <span className={cn('label border px-1.5 py-px', tagStyle[entry.status])}>
                  {t(`incidents.${entry.status}`)}
                </span>
              </div>
              {entry.org && <p className="mt-0.5 text-sm text-fg">{entry.org}</p>}
              <p className="mt-1 text-sm leading-relaxed text-muted">{entry.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
