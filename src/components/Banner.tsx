import { profile } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { buttonStyles } from '../lib/button-styles'
import { cn } from '../lib/cn'
import type { OutagePhase } from '../lib/use-outage'
import { ArrowRightIcon, FileIcon } from './icons'
import { StatusDot } from './Primitives'

export function Banner({ phase }: { phase: OutagePhase }) {
  const { t, l } = useI18n()
  const { links } = profile
  const contact = links.email ? `mailto:${links.email}` : links.linkedin
  const down = phase === 'investigating'

  return (
    <div>
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'label flex items-center gap-3 border-y px-0 py-2.5 transition-colors',
          down ? 'animate-shake border-down bg-down px-3 text-white dark:text-bg' : 'border-border-strong text-fg',
        )}
      >
        <StatusDot tone={down ? 'down' : 'up'} blink={down} className={down ? 'ring-down' : undefined} />
        <span>
          {phase === 'operational' && t('banner.operational')}
          {phase === 'investigating' && t('banner.investigating')}
          {phase === 'resolved' && t('banner.resolved')}
        </span>
        <span aria-hidden className="leader hidden border-current opacity-40 sm:block" />
        <span className="hidden sm:inline">{l(profile.location)}</span>
      </div>

      <div className="pt-12 pb-4 sm:pt-20">
        {profile.openToWork && (
          <p className="label mb-6 inline-flex items-center gap-2 bg-accent px-2 py-1 text-accent-fg">
            {t('banner.openToWork')}
          </p>
        )}
        <h1 className="max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.035em] text-fg sm:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-5 text-xl font-medium tracking-tight text-fg sm:text-2xl">{l(profile.title)}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{l(profile.tagline)}</p>
        {(contact || links.cv) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {contact && (
              <a href={contact} className={buttonStyles.primary} {...(links.email ? {} : { target: '_blank', rel: 'noreferrer' })}>
                {t('banner.contact')}
                <ArrowRightIcon />
              </a>
            )}
            {links.cv && (
              <a href={links.cv} className={buttonStyles.secondary} target="_blank" rel="noreferrer">
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
