import type { ReactNode } from 'react'
import { profile } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { FileIcon, GithubIcon, LinkedinIcon, MailIcon } from './icons'
import { Card, Section } from './Primitives'

interface ContactLink {
  key: string
  label: string
  detail: string
  href: string
  icon: ReactNode
  external: boolean
}

export function Contact() {
  const { t } = useI18n()
  const { links } = profile

  const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')
  // Links set to null in content/profile.ts are simply not shown.
  const items: ContactLink[] = []
  if (links.email) {
    items.push({ key: 'email', label: t('contact.email'), detail: links.email, href: `mailto:${links.email}`, icon: <MailIcon />, external: false })
  }
  if (links.linkedin) {
    items.push({ key: 'linkedin', label: t('contact.linkedin'), detail: strip(links.linkedin), href: links.linkedin, icon: <LinkedinIcon />, external: true })
  }
  if (links.github) {
    items.push({ key: 'github', label: t('contact.github'), detail: strip(links.github), href: links.github, icon: <GithubIcon />, external: true })
  }
  if (links.cv) {
    items.push({ key: 'cv', label: t('contact.cv'), detail: 'PDF', href: links.cv, icon: <FileIcon />, external: true })
  }

  return (
    <Section id="contact" title={t('contact.title')} subtitle={t('contact.subtitle')}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.key}>
            <Card className="transition-colors hover:border-accent">
              <a
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="flex items-center gap-4 rounded-xl p-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-fg [&_svg]:size-5">
                  {item.icon}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-fg">{item.label}</span>
                  <span className="block truncate font-mono text-xs text-muted">{item.detail}</span>
                </span>
              </a>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
