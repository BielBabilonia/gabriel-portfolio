import { useState } from 'react'
import { projects, type Project } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { cn } from '../lib/cn'
import { formatDate, formatLatency } from '../lib/time'
import { dailyBars } from '../lib/uptime'
import { useNow } from '../lib/use-now'
import { usePing } from '../lib/use-ping'
import { ExternalLinkIcon, GithubIcon } from './icons'
import { Card, Chip, Section, StatusDot } from './Primitives'

function UptimeBar({ name, launchedAt, down }: { name: string; launchedAt: string; down: boolean }) {
  const { t, locale } = useI18n()
  const now = useNow(60 * 60 * 1000)
  const bars = dailyBars(launchedAt, now)
  const [hovered, setHovered] = useState<number | null>(null)
  const active = hovered === null ? undefined : bars[hovered]

  return (
    <div className="relative">
      <div
        role="img"
        aria-label={t('services.uptimeLabel', { name, date: formatDate(launchedAt, locale) })}
        className="flex h-8 gap-px sm:gap-0.5"
        onMouseLeave={() => setHovered(null)}
      >
        {bars.map((bar, index) => {
          const isToday = index === bars.length - 1
          return (
            <span
              key={bar.day}
              onMouseEnter={() => setHovered(index)}
              className={cn(
                'h-full flex-1 rounded-[2px] transition-colors',
                isToday && down ? 'bg-down' : bar.online ? 'bg-up' : 'bg-empty',
                hovered !== null && hovered !== index && 'opacity-60',
              )}
            />
          )
        })}
      </div>
      {active && hovered !== null && (
        <span
          aria-hidden
          style={{ left: `${Math.min(85, Math.max(15, ((hovered + 0.5) / bars.length) * 100))}%` }}
          className="pointer-events-none absolute bottom-full z-20 mb-2 w-max -translate-x-1/2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-fg shadow-overlay"
        >
          {new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(active.day)}:{' '}
          {active.online ? t('services.online') : t('services.notLaunched')}
        </span>
      )}
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>{t('services.daysAgo')}</span>
        <span>{t('services.today')}</span>
      </div>
    </div>
  )
}

interface LiveServiceCardProps {
  project: Project
  url: string
  launchedAt: string
  down: boolean
}

function LiveServiceCard({ project, url, launchedAt, down }: LiveServiceCardProps) {
  const { t, l, locale } = useI18n()
  const ping = usePing(url)
  const isDown = down || ping.state === 'down'

  return (
    <Card className="overflow-hidden">
      {project.image && (
        <a href={url} target="_blank" rel="noreferrer" className="block border-b border-border bg-surface-muted" tabIndex={-1}>
          <img
            src={project.image}
            alt={t('services.screenshot', { name: project.name })}
            width={1280}
            height={820}
            loading="lazy"
            className="aspect-[16/8] w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
          />
        </a>
      )}
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-fg">{project.name}</h3>
            <p className="mt-1 max-w-xl text-sm text-muted">{l(project.description)}</p>
          </div>
          <p className={cn('flex items-center gap-2 text-sm font-medium', isDown ? 'text-down-fg' : 'text-up-fg')}>
            <StatusDot tone={ping.state === 'checking' && !down ? 'paused' : isDown ? 'down' : 'up'} pulse={isDown} />
            {down ? t('status.down') : ping.state === 'checking' ? t('status.checking') : isDown ? t('status.down') : t('status.operational')}
          </p>
        </div>

        <div className="space-y-1 font-mono text-xs text-muted">
          <p>{t('services.since', { date: formatDate(launchedAt, locale) })}</p>
          <p aria-live="polite">
            {ping.state === 'up' && t('services.responseTime', { ms: formatLatency(ping.ms, locale) })}
            {ping.state === 'down' && t('services.unreachable')}
            {ping.state === 'checking' && t('status.checking')}
          </p>
        </div>

        <UptimeBar name={project.name} launchedAt={launchedAt} down={down} />

        <ul className="flex flex-wrap gap-1.5" aria-label={project.name}>
          {project.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-linear-to-r from-accent-from to-accent-to px-3.5 text-sm font-medium text-accent-fg shadow-card transition hover:brightness-110 [&_svg]:size-4"
          >
            {t('services.live')}
            <ExternalLinkIcon />
          </a>
          {project.repo && <SourceLink href={project.repo} />}
        </div>
      </div>
    </Card>
  )
}

function SourceLink({ href }: { href: string }) {
  const { t } = useI18n()
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3.5 text-sm font-medium text-fg shadow-card transition-colors hover:bg-surface-muted [&_svg]:size-4"
    >
      <GithubIcon />
      {t('services.source')}
    </a>
  )
}

/** Projects that aren't deployed websites: no ping, no uptime bars. */
function OfflineServiceCard({ project }: { project: Project }) {
  const { t, l } = useI18n()
  const building = project.state === 'building'
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-fg">{project.name}</h3>
        <p className={cn('flex items-center gap-2 text-sm font-medium', building ? 'text-degraded-fg' : 'text-paused-fg')}>
          <StatusDot tone={building ? 'degraded' : 'paused'} pulse={building} />
          {building ? t('services.building') : t('services.done')}
        </p>
      </div>
      <p className="text-sm text-muted">{l(project.description)}</p>
      <p className="font-mono text-xs text-subtle">{t('services.offline')}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5" aria-label={project.name}>
        {project.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </ul>
      {project.repo && (
        <div>
          <SourceLink href={project.repo} />
        </div>
      )}
    </Card>
  )
}

export function ServicesSection({ down }: { down: boolean }) {
  const { t } = useI18n()
  return (
    <Section id="services" title={t('services.title')} subtitle={t('services.subtitle')}>
      <div className="space-y-4">
        {projects.map((project) =>
          project.state === 'live' && project.url && project.launchedAt ? (
            <LiveServiceCard
              key={project.id}
              project={project}
              url={project.url}
              launchedAt={project.launchedAt}
              down={down}
            />
          ) : null,
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {projects
            .filter((project) => project.state !== 'live')
            .map((project) => (
              <OfflineServiceCard key={project.id} project={project} />
            ))}
        </div>
      </div>
    </Section>
  )
}
