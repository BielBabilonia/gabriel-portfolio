import { profile } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { cn } from '../lib/cn'
import type { OutagePhase, SimulatedIncident } from '../lib/use-outage'
import { GithubIcon } from './icons'

const REPO_URL = 'https://github.com/BielBabilonia/gabriel-portfolio'

interface FooterProps {
  phase: OutagePhase
  lastIncident: SimulatedIncident | undefined
  onSimulate: () => void
}

export function Footer({ phase, lastIncident, onSimulate }: FooterProps) {
  const { t } = useI18n()
  const firstName = profile.name.split(' ')[0]
  const idle = phase === 'operational'

  return (
    <footer className="mt-24 border-t border-border-strong">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:grid-cols-[1fr_auto] sm:items-center sm:px-8">
        <div className="flex items-center gap-5">
          {/* A physical-looking emergency button: the page's easter egg. */}
          <button
            type="button"
            onClick={onSimulate}
            disabled={!idle}
            aria-describedby="outage-hint"
            className="group relative grid size-16 shrink-0 place-items-center rounded-full border-2 border-fg bg-surface-muted p-1.5 disabled:cursor-wait"
          >
            <span
              className={cn(
                'block size-full rounded-full bg-down shadow-[inset_0_-4px_0_rgb(0_0_0/0.25)] transition-transform',
                idle ? 'group-hover:-translate-y-px group-active:translate-y-0.5 group-active:shadow-none' : 'translate-y-0.5 shadow-none',
              )}
            />
            <span className="sr-only">{t('outage.button')}</span>
          </button>
          <div>
            <p className="label text-fg">{phase === 'investigating' ? t('outage.running') : t('outage.button')}</p>
            <p id="outage-hint" className="mt-1 text-sm text-muted" aria-live="polite">
              {phase === 'resolved' && lastIncident
                ? t('outage.resolvedBy', { name: firstName, seconds: lastIncident.seconds })
                : t('outage.hint')}
            </p>
          </div>
        </div>

        <div className="label flex flex-col gap-2 text-muted sm:items-end">
          <span>{t('footer.built')}</span>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
            <GithubIcon className="size-3.5" />
            {t('footer.source')}
          </a>
        </div>
      </div>
    </footer>
  )
}
