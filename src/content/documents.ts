import { documentInfo, type DocumentInfo, type DocumentKind } from './profile'

export interface SiteDocument extends DocumentInfo {
  fileName: string
  url: string
}

// Every PDF in /documents, collected at build time: drop a file in, rebuild, and it's listed.
const files = import.meta.glob<string>('../../documents/*.pdf', {
  query: '?url',
  import: 'default',
  eager: true,
})

/** Kind and language from the file name, for files without an entry in `documentInfo`. */
export function describeDocument(fileName: string): DocumentInfo {
  const known = documentInfo[fileName]
  if (known) return known

  const name = fileName.toLowerCase()
  const kind: DocumentKind = /cover|carta/.test(name)
    ? 'cover-letter'
    : /resume|curriculo|currículo|\bcv\b|-cv/.test(name)
      ? 'resume'
      : 'other'
  const lang = /[-_]en\.pdf$/.test(name)
    ? 'en'
    : /[-_]pt(-br)?\.pdf$/.test(name)
      ? 'pt'
      : /curriculo|currículo|carta/.test(name)
        ? 'pt'
        : 'en'

  const titles: Record<DocumentKind, { en: string; pt: string }> = {
    resume: { en: 'Résumé', pt: 'Currículo' },
    'cover-letter': { en: 'Cover letter', pt: 'Carta de apresentação' },
    other: { en: fileName.replace(/\.pdf$/i, ''), pt: fileName.replace(/\.pdf$/i, '') },
  }
  return { kind, lang, title: titles[kind] }
}

export const KIND_ORDER: Record<DocumentKind, number> = { resume: 0, 'cover-letter': 1, other: 2 }

export function listDocuments(source: Record<string, string> = files): SiteDocument[] {
  return Object.entries(source)
    .map(([path, url]) => {
      const fileName = path.split('/').pop() ?? path
      return { ...describeDocument(fileName), fileName, url }
    })
    .sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || a.fileName.localeCompare(b.fileName))
}

/** The résumé to feature in the header: one in the visitor's language if there is one. */
export function primaryResume(documents: SiteDocument[], lang: 'en' | 'pt'): SiteDocument | undefined {
  const resumes = documents.filter((d) => d.kind === 'resume')
  return resumes.find((d) => d.lang === lang) ?? resumes[0]
}
