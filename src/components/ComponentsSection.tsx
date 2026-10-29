import { systemComponents } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { cn } from '../lib/cn'
import { Chip, Section, StatusDot } from './Primitives'

export function ComponentsSection({ down }: { down: boolean }) {
  const { t, l } = useI18n()
  return (
    <Section id="components" index={1} title={t('components.title')} subtitle={t('components.subtitle')}>
      <ul className="divide-y divide-border">
        {systemComponents.map((component, index) => (
          <li key={component.id} className="grid gap-3 py-5 first:pt-0 sm:grid-cols-[13rem_1fr] sm:gap-8">
            <div className="flex items-baseline sm:block">
              <h3 className="font-semibold text-fg">{l(component.name)}</h3>
              {component.primary && (
                <p className="label ml-2 text-muted sm:mt-1 sm:ml-0">↳ {t('components.primary')}</p>
              )}
            </div>
            <div>
              <p
                className={cn('label flex items-center transition-colors', down ? 'text-down-fg' : 'text-up-fg')}
                // Components fall one after another during the simulated outage.
                style={{ transitionDelay: down ? `${index * 200}ms` : '0ms' }}
              >
                <span className="text-muted">{t('components.statusLabel')}</span>
                <span aria-hidden className="leader" />
                <StatusDot tone={down ? 'down' : 'up'} blink={down} className="mr-2" />
                {down ? t('status.down') : t('status.operational')}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{l(component.description)}</p>
              {component.tech.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={l(component.name)}>
                  {component.tech.map((tech) => (
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
