import { profile } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { cn } from '../lib/cn'
import type { OutagePhase } from '../lib/use-outage'
import { AlertIcon, CheckIcon, FileIcon, MailIcon } from './icons'
import { StatusDot } from './Primitives'

const bannerStyle: Record<OutagePhase, string> = {
  operational: 'border-up/40 bg-up-soft text-up-fg',
  investigating: 'border-down/40 bg-down-soft text-down-fg animate-shake',
  resolved: 'border-up/40 bg-up-soft text-up-fg',
}

const primaryButton =
  'inline-flex h-10 items-center gap-2 rounded-lg bg-linear-to-r from-accent-from to-accent-to px-4 text-sm font-medium text-accent-fg shadow-card transition hover:brightness-110 [&_svg]:size-4'
const secondaryButton =
  'inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-fg shadow-card transition-colors hover:bg-surface-muted [&_svg]:size-4'

export function Banner({ phase }: { phase: OutagePhase }) {
  const { t, l } = useI18n()
  const { links } = profile
  const contact = links.email ? `mailto:${links.email}` : links.linkedin

  return (
    <div className="space-y-8">
      <div
        role="status"
        aria-live="polite"
        className={cn('flex items-center gap-3 rounded-xl border px-5 py-4 transition-colors', bannerStyle[phase])}
      >
        {phase === 'investigating' ? <AlertIcon className="size-6 shrink-0" /> : <CheckIcon className="size-6 shrink-0" />}
        <p className="text-lg font-semibold">
          {phase === 'operational' && t('banner.operational')}
          {phase === 'investigating' && t('banner.investigating')}
          {phase === 'resolved' && t('banner.resolved')}
        </p>
      </div>

      <div>
        {profile.openToWork && (
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-fg shadow-card">
            <StatusDot tone="up" pulse />
            {t('banner.openToWork')}
          </p>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-fg sm:text-6xl">{profile.name}</h1>
        <p className="text-gradient mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{l(profile.title)}</p>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{l(profile.tagline)}</p>
        {(contact || links.cv) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {contact && (
              <a href={contact} className={primaryButton} {...(links.email ? {} : { target: '_blank', rel: 'noreferrer' })}>
                <MailIcon />
                {t('banner.contact')}
              </a>
            )}
            {links.cv && (
              <a href={links.cv} className={secondaryButton} target="_blank" rel="noreferrer">
                <FileIcon />
                {t('banner.resume')}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
