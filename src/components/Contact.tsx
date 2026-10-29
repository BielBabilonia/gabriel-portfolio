import { profile } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { ArrowUpRightIcon } from './icons'
import { Section } from './Primitives'

interface ContactLink {
  key: string
  label: string
  detail: string
  href: string
  external: boolean
}

/** Contact channels as directory rows: "EMAIL ........ address ↗". */
export function Contact() {
  const { t } = useI18n()
  const { links } = profile

  const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
  // Links set to null in content/profile.ts are simply not shown.
  const items: ContactLink[] = []
  if (links.email) {
    items.push({ key: 'email', label: t('contact.email'), detail: links.email, href: `mailto:${links.email}`, external: false })
  }
  if (links.linkedin) {
    items.push({ key: 'linkedin', label: t('contact.linkedin'), detail: strip(links.linkedin), href: links.linkedin, external: true })
  }
  if (links.github) {
    items.push({ key: 'github', label: t('contact.github'), detail: strip(links.github), href: links.github, external: true })
  }
  if (links.cv) {
    items.push({ key: 'cv', label: t('contact.cv'), detail: 'PDF', href: links.cv, external: true })
  }

  return (
    <Section id="contact" index={4} title={t('contact.title')} subtitle={t('contact.subtitle')}>
      <ul className="border-b border-border-strong">
        {items.map((item) => (
          <li key={item.key} className="border-t border-border first:border-t-0">
            <a
              href={item.href}
              {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="group flex items-baseline py-4 transition-colors hover:bg-accent hover:text-accent-fg sm:px-2"
            >
              <span className="label w-24 shrink-0 text-muted group-hover:text-accent-fg">{item.label}</span>
              <span aria-hidden className="leader hidden group-hover:border-accent-fg sm:block" />
              <span className="min-w-0 truncate font-mono text-sm sm:text-base">{item.detail}</span>
              <ArrowUpRightIcon className="ml-3 size-4 shrink-0 self-center" />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
