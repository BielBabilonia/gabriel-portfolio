import { profile } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { cn } from '../lib/cn'
import type { OutagePhase, SimulatedIncident } from '../lib/use-outage'
import { CheckIcon, GithubIcon, ZapIcon } from './icons'

const REPO_URL = 'https://github.com/BielBabilonia/gabriel-portfolio'

interface FooterProps {
  phase: OutagePhase
  lastIncident: SimulatedIncident | undefined
  onSimulate: () => void
}

export function Footer({ phase, lastIncident, onSimulate }: FooterProps) {
  const { t } = useI18n()
  const firstName = profile.name.split(' ')[0]

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 py-10 text-center sm:px-6">
        <button
          type="button"
          onClick={onSimulate}
          disabled={phase !== 'operational'}
          className={cn(
            'inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold shadow-card transition [&_svg]:size-4',
            phase === 'operational'
              ? 'border-down/40 bg-down-soft text-down-fg hover:scale-[1.03] hover:border-down active:scale-95'
              : 'cursor-wait border-border bg-surface-muted text-muted',
          )}
        >
          <ZapIcon />
          {phase === 'investigating' ? t('outage.running') : t('outage.button')}
        </button>

        {/* Polite announcement of the result; visible while the banner shows "resolved". */}
        <p aria-live="polite" className="min-h-5 text-sm text-up-fg">
          {phase === 'resolved' && lastIncident && (
            <span className="inline-flex animate-fade-in items-center gap-1.5">
              <CheckIcon className="size-4" />
              {t('outage.resolvedBy', { name: firstName, seconds: lastIncident.seconds })}
            </span>
          )}
        </p>

        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted">
          <span>{t('footer.built')}</span>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-sm hover:text-fg">
            <GithubIcon className="size-4" />
            {t('footer.source')}
          </a>
        </p>
      </div>
    </footer>
  )
}
