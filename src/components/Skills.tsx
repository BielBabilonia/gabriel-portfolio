import { skills } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { Chip, Section } from './Primitives'

export function Skills() {
  const { t, l } = useI18n()
  return (
    <Section id="skills" index={1} title={t('skills.title')} subtitle={t('skills.subtitle')}>
      <ul className="divide-y divide-border">
        {skills.map((skill) => (
          <li key={skill.id} className="grid gap-3 py-5 first:pt-0 sm:grid-cols-[13rem_1fr] sm:gap-8">
            <div className="flex items-baseline gap-2 sm:block">
              <h3 className="font-semibold text-fg">{l(skill.name)}</h3>
              {skill.primary && (
                <p className="label inline-block bg-accent px-1.5 py-px text-accent-fg sm:mt-2">{t('skills.primary')}</p>
              )}
            </div>
            <div>
              <p className="text-sm leading-relaxed text-muted">{l(skill.description)}</p>
              {skill.tech.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={l(skill.name)}>
                  {skill.tech.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
