import { listDocuments, primaryResume } from '../content/documents'
import { profile } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { buttonStyles } from '../lib/button-styles'
import { ArrowRightIcon, FileIcon } from './icons'

const documents = listDocuments()

export function Banner() {
  const { t, l, locale } = useI18n()
  const resume = primaryResume(documents, locale === 'pt-BR' ? 'pt' : 'en')
  const { links } = profile
  const contact = links.email ? `mailto:${links.email}` : links.linkedin

  return (
    <div>
      {/* Running header, like the top of a printed manual page. */}
      <div className="label flex items-center gap-3 border-y border-border-strong py-2.5 text-fg">
        <span>{t('banner.portfolio')}</span>
        <span aria-hidden className="leader opacity-40" />
        <span>{l(profile.location)}</span>
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
        {(contact || resume) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {contact && (
              <a href={contact} className={buttonStyles.primary} {...(links.email ? {} : { target: '_blank', rel: 'noreferrer' })}>
                {t('banner.contact')}
                <ArrowRightIcon />
              </a>
            )}
            {resume && (
              <a href={resume.url} download={resume.fileName} className={buttonStyles.secondary}>
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
