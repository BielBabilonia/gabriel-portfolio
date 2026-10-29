import { describe, expect, it } from 'vitest'
import { describeDocument, listDocuments, primaryResume } from './documents'

describe('documents', () => {
  it('guesses kind and language from the file name', () => {
    expect(describeDocument('resume-jane-EN.pdf')).toMatchObject({ kind: 'resume', lang: 'en' })
    expect(describeDocument('curriculo-jane.pdf')).toMatchObject({ kind: 'resume', lang: 'pt' })
    expect(describeDocument('carta-jane.pdf')).toMatchObject({ kind: 'cover-letter', lang: 'pt' })
    expect(describeDocument('cover-letter-jane.pdf')).toMatchObject({ kind: 'cover-letter', lang: 'en' })
    expect(describeDocument('portfolio-print.pdf')).toMatchObject({ kind: 'other' })
  })

  it('lists résumés first and picks one in the visitor language', () => {
    const docs = listDocuments({
      '../../documents/cover-letter-jane.pdf': '/a.pdf',
      '../../documents/curriculo-jane.pdf': '/b.pdf',
      '../../documents/resume-jane-EN.pdf': '/c.pdf',
    })
    expect(docs.map((d) => d.kind)).toEqual(['resume', 'resume', 'cover-letter'])
    expect(primaryResume(docs, 'pt')?.fileName).toBe('curriculo-jane.pdf')
    expect(primaryResume(docs, 'en')?.fileName).toBe('resume-jane-EN.pdf')
  })
})
