import { KIND_ORDER, listDocuments } from '../content/documents'
import { useI18n } from '../i18n/i18n-context'
import { DownloadIcon } from './icons'
import { Section } from './Primitives'

const documents = listDocuments()

/** Downloadable PDFs from /documents, as directory rows. Hidden when the folder is empty. */
export function Documents({ index }: { index: number }) {
  const { t, l, locale } = useI18n()
  if (documents.length === 0) return null
  const lang = locale === 'pt-BR' ? 'pt' : 'en'
  // Same kind order, but documents in the visitor's language first.
  const sorted = [...documents].sort(
    (a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || Number(b.lang === lang) - Number(a.lang === lang),
  )

  return (
    <Section id="documents" index={index} title={t('documents.title')} subtitle={t('documents.subtitle')}>
      <ul className="border-b border-border-strong">
        {sorted.map((doc) => (
          <li key={doc.fileName} className="border-t border-border first:border-t-0">
            <a
              href={doc.url}
              download={doc.fileName}
              className="group flex items-baseline gap-3 py-4 transition-colors hover:bg-accent hover:text-accent-fg sm:px-2"
            >
              <span className="label w-28 shrink-0 text-muted group-hover:text-accent-fg">
                {t(`documents.kind.${doc.kind}`)}
              </span>
              <span className="min-w-0 flex-1 font-medium">{l(doc.title)}</span>
              <span className="label shrink-0 text-muted group-hover:text-accent-fg">
                {doc.lang === 'en' ? 'EN' : 'PT'} · PDF
              </span>
              <DownloadIcon className="size-4 shrink-0 self-center" />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
