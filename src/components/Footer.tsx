import { useI18n } from '../i18n/i18n-context'
import { GithubIcon } from './icons'

const REPO_URL = 'https://github.com/BielBabilonia/gabriel-portfolio'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-24 border-t border-border-strong">
      <div className="label mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-muted sm:px-8">
        <span>{t('footer.built')}</span>
        <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
          <GithubIcon className="size-3.5" />
          {t('footer.source')}
        </a>
      </div>
    </footer>
  )
}
