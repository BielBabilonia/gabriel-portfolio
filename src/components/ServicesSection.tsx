import { useState, type ReactNode } from 'react'
import { projects, type Project } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { buttonStyles } from '../lib/button-styles'
import { cn } from '../lib/cn'
import { formatDate, formatLatency } from '../lib/time'
import { dailyBars } from '../lib/uptime'
import { useNow } from '../lib/use-now'
import { usePing } from '../lib/use-ping'
import { ArrowUpRightIcon, GithubIcon } from './icons'
import { Chip, Section, StatusDot } from './Primitives'

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
        className="flex h-7 gap-px"
        onMouseLeave={() => setHovered(null)}
      >
        {bars.map((bar, index) => {
          const isToday = index === bars.length - 1
          return (
            <span
              key={bar.day}
              onMouseEnter={() => setHovered(index)}
              className={cn(
                'h-full flex-1',
                isToday && down ? 'bg-down' : bar.online ? 'bg-up' : 'bg-empty',
                hovered === index && 'bg-fg',
              )}
            />
          )
        })}
      </div>
      {active && hovered !== null && (
        <span
          aria-hidden
          style={{ left: `${Math.min(85, Math.max(15, ((hovered + 0.5) / bars.length) * 100))}%` }}
          className="label pointer-events-none absolute bottom-full z-20 mb-2 w-max -translate-x-1/2 bg-fg px-2 py-1 text-bg"
        >
          {new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(active.day)} ·{' '}
          {active.online ? t('services.online') : t('services.notLaunched')}
        </span>
      )}
      <div className="label mt-1.5 flex justify-between text-subtle">
        <span>{t('services.daysAgo')}</span>
        <span>{t('services.today')}</span>
      </div>
    </div>
  )
}

/** "Label ........ value" row, like a spec sheet. */
function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline font-mono text-xs">
      <dt className="label text-muted">{label}</dt>
      <span aria-hidden className="leader" />
      <dd className="text-right text-fg">{children}</dd>
    </div>
  )
}

interface LiveServiceProps {
  project: Project
  url: string
  launchedAt: string
  down: boolean
  figure: number
}

function LiveService({ project, url, launchedAt, down, figure }: LiveServiceProps) {
  const { t, l, locale } = useI18n()
  const ping = usePing(url)
  const isDown = down || ping.state === 'down'
  const tone = isDown ? 'down' : ping.state === 'checking' ? 'paused' : 'up'

  return (
    <article className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
      {project.image && (
        <figure>
          <a href={url} target="_blank" rel="noreferrer" tabIndex={-1} className="block border border-border-strong">
            <img
              src={project.image}
              alt={t('services.screenshot', { name: project.name })}
              width={1280}
              height={820}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </a>
          <figcaption className="label mt-2 text-subtle">
            {t('services.figure', { n: String(figure).padStart(2, '0'), name: project.name })}
          </figcaption>
        </figure>
      )}
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-3xl font-semibold tracking-tight text-fg">{project.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{l(project.description)}</p>
        </div>

        <dl className="space-y-1.5">
          <SpecRow label={t('services.statusLabel')}>
            <span className={cn('inline-flex items-center gap-2', isDown ? 'text-down-fg' : tone === 'up' && 'text-up-fg')}>
              <StatusDot tone={tone} blink={isDown} />
              {down || ping.state === 'down'
                ? t('status.down')
                : ping.state === 'checking'
                  ? t('status.checking')
                  : t('status.operational')}
            </span>
          </SpecRow>
          <SpecRow label={t('services.responseLabel')}>
            <span aria-live="polite">
              {ping.state === 'up' && formatLatency(ping.ms, locale)}
              {ping.state === 'down' && '—'}
              {ping.state === 'checking' && '…'}
            </span>
          </SpecRow>
          <SpecRow label={t('services.sinceLabel')}>{formatDate(launchedAt, locale)}</SpecRow>
        </dl>
        <p className="-mt-3 font-mono text-[11px] text-subtle">{t('services.measured')}</p>

        <UptimeBar name={project.name} launchedAt={launchedAt} down={down} />

        <ul className="flex flex-wrap gap-1.5" aria-label={project.name}>
          {project.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3">
          <a href={url} target="_blank" rel="noreferrer" className={buttonStyles.primary}>
            {t('services.live')}
            <ArrowUpRightIcon />
          </a>
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className={buttonStyles.secondary}>
              <GithubIcon />
              {t('services.source')}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/** Projects that aren't deployed websites: no ping, no uptime bars. */
function OfflineService({ project }: { project: Project }) {
  const { t, l } = useI18n()
  const building = project.state === 'building'
  return (
    <article className="flex flex-col gap-3 border-t border-border pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-fg">{project.name}</h3>
        <p className={cn('label flex items-center gap-2', building ? 'text-degraded-fg' : 'text-muted')}>
          <StatusDot tone={building ? 'degraded' : 'paused'} blink={building} />
          {building ? t('services.building') : t('services.done')}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-muted">{l(project.description)}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5" aria-label={project.name}>
        {project.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </ul>
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer" className={cn(buttonStyles.secondary, 'self-start')}>
          <GithubIcon />
          {t('services.source')}
        </a>
      )}
    </article>
  )
}

export function ServicesSection({ down }: { down: boolean }) {
  const { t } = useI18n()
  const live = projects.filter((p) => p.state === 'live' && p.url && p.launchedAt)
  const offline = projects.filter((p) => p.state !== 'live')
  return (
    <Section id="services" index={2} title={t('services.title')} subtitle={t('services.subtitle')}>
      <div className="space-y-12">
        {live.map((project, index) => (
          <LiveService
            key={project.id}
            project={project}
            url={project.url!}
            launchedAt={project.launchedAt!}
            down={down}
            figure={index + 1}
          />
        ))}
        {offline.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2">
            {offline.map((project) => (
              <OfflineService key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
