import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'
import { experience, profile } from './content/profile'
import { I18nProvider } from './i18n/I18nProvider'
import { ThemeProvider } from './theme/ThemeProvider'

function renderApp(locale: 'en' | 'pt-BR' = 'en') {
  return render(
    <ThemeProvider>
      <I18nProvider locale={locale}>
        <App />
      </I18nProvider>
    </ThemeProvider>,
  )
}

describe('App', () => {
  it('introduces the person and their work', () => {
    renderApp()
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Upwatch' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Live demo/ })).toHaveAttribute('href', 'https://upwatch-gamma.vercel.app')
  })

  it('lists experience with the current role marked', () => {
    renderApp()
    const section = screen.getByRole('region', { name: 'Experience' })
    expect(within(section).getAllByRole('listitem')).toHaveLength(experience.length)
    expect(within(section).getAllByText('Current')).toHaveLength(experience.filter((e) => e.end === null).length)
  })

  it('shows every configured contact link', () => {
    renderApp()
    const contact = screen.getByRole('region', { name: 'Contact' })
    expect(within(contact).getAllByRole('link')).toHaveLength(Object.values(profile.links).filter(Boolean).length)
  })

  it('speaks Portuguese', () => {
    renderApp('pt-BR')
    expect(screen.getByRole('region', { name: 'Experiência' })).toBeInTheDocument()
    expect(screen.getByText('Desenvolvedor Frontend · React & TypeScript')).toBeInTheDocument()
  })
})
