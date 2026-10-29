import { systemComponents } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { cn } from '../lib/cn'
import { Card, Chip, Section, StatusDot } from './Primitives'

export function ComponentsSection({ down }: { down: boolean }) {
  const { t, l } = useI18n()
  return (
    <Section id="components" title={t('components.title')} subtitle={t('components.subtitle')}>
      <Card>
        <ul className="divide-y divide-border">
          {systemComponents.map((component, index) => (
            <li key={component.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2 font-medium text-fg">
                  {l(component.name)}
                  {component.primary && (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-fg">
                      {t('components.primary')}
                    </span>
                  )}
                </p>
                <p
                  className={cn('flex items-center gap-2 text-sm font-medium transition-colors', down ? 'text-down-fg' : 'text-up-fg')}
                  // Components fall one after another during the simulated outage.
                  style={{ transitionDelay: down ? `${index * 250}ms` : '0ms' }}
                >
                  <StatusDot tone={down ? 'down' : 'up'} pulse={down} />
                  {down ? t('status.down') : t('status.operational')}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted">{l(component.description)}</p>
              {component.tech.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={l(component.name)}>
                  {component.tech.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}
