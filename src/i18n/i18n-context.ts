import { createContext, useContext } from 'react'
import type { Localized } from '../content/profile'
import type { MessageKey } from './messages'

export const LOCALES = ['en', 'pt-BR'] as const
export type Locale = (typeof LOCALES)[number]

export type TranslateVars = Record<string, string | number>

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: MessageKey, vars?: TranslateVars) => string
  /** Picks the right language from content text. */
  l: (text: Localized) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside <I18nProvider>')
  return context
}
