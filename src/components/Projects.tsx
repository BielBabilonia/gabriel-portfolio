import { projects, type Project } from '../content/profile'
import { useI18n } from '../i18n/i18n-context'
import { buttonStyles } from '../lib/button-styles'
import { cn } from '../lib/cn'
import { formatDate } from '../lib/time'
import { ArrowUpRightIcon, GithubIcon } from './icons'
import { Chip, Section } from './Primitives'

function ProjectLinks({ project }: { project: Project }) {
  const { t } = useI18n()
  if (!project.url && !project.repo) return null
  return (
    <div className="flex flex-wrap gap-3">
      {project.url && (
        <a href={project.url} target="_blank" rel="noreferrer" className={buttonStyles.primary}>
          {t('projects.live')}
          <ArrowUpRightIcon />
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer" className={buttonStyles.secondary}>
          <GithubIcon />
          {t('projects.source')}
        </a>
      )}
    </div>
  )
}

function Stack({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={project.name}>
      {project.stack.map((tech) => (
        <Chip key={tech}>{tech}</Chip>
      ))}
    </ul>
  )
}

/** Deployed project: screenshot as a captioned figure next to the write-up. */
function FeaturedProject({ project, figure }: { project: Project; figure: number }) {
  const { t, l, locale } = useI18n()
  return (
    <article className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
      {project.image && (
        <figure>
          <a
            href={project.url ?? undefined}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            className="block border border-border-strong"
          >
            <img
              src={project.image}
              alt={t('projects.screenshot', { name: project.name })}
              width={1280}
              height={820}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </a>
          <figcaption className="label mt-2 text-subtle">
            {t('projects.figure', { n: String(figure).padStart(2, '0'), name: project.name })}
          </figcaption>
        </figure>
      )}
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-3xl font-semibold tracking-tight text-fg">{project.name}</h3>
          {project.launchedAt && (
            <p className="label mt-2 text-muted">
              {t('projects.liveSince', { date: formatDate(project.launchedAt, locale) })}
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-muted">{l(project.description)}</p>
        </div>
        <Stack project={project} />
        <div className="mt-auto">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}

/** Projects that aren't websites: a compact entry. */
function OtherProject({ project }: { project: Project }) {
  const { t, l } = useI18n()
  const building = project.state === 'building'
  return (
    <article className="flex flex-col gap-3 border-t border-border pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-fg">{project.name}</h3>
        <p className={cn('label border px-1.5 py-px', building ? 'border-degraded text-degraded-fg' : 'border-border text-muted')}>
          {building ? t('projects.building') : t('projects.done')}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-muted">{l(project.description)}</p>
      <div className="mt-auto space-y-3">
        <Stack project={project} />
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

export function Projects() {
  const { t } = useI18n()
  const featured = projects.filter((p) => p.state === 'live')
  const others = projects.filter((p) => p.state !== 'live')
  return (
    <Section id="projects" index={2} title={t('projects.title')} subtitle={t('projects.subtitle')}>
      <div className="space-y-12">
        {featured.map((project, index) => (
          <FeaturedProject key={project.id} project={project} figure={index + 1} />
        ))}
        {others.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2">
            {others.map((project) => (
              <OtherProject key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
