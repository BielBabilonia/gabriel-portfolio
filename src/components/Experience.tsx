import { experience } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { formatMonth } from '../lib/time'
import { Section } from './Primitives'

export function Experience() {
  const { t, l, locale } = useI18n()
  return (
    <Section id="experience" index={3} title={t('experience.title')} subtitle={t('experience.subtitle')}>
      <ol className="divide-y divide-border border-b border-border">
        {experience.map((item) => {
          const period = `${formatMonth(item.start, locale)} – ${
            item.end ? formatMonth(item.end, locale) : t('experience.present')
          }`
          return (
            <li key={`${item.org}-${item.start}`} className="grid gap-2 py-4 first:pt-0 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <p className="label pt-1 text-muted">{period}</p>
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-semibold text-fg">{l(item.title)}</h3>
                  {item.end === null && (
                    <span className="label bg-accent px-1.5 py-px text-accent-fg">{t('experience.current')}</span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-fg">{item.org}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{l(item.body)}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
