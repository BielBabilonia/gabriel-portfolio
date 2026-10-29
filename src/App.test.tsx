import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { profile } from './content/profile'
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

afterEach(() => vi.useRealTimers())

describe('App', () => {
  it('renders the profile as a status page', () => {
    renderApp()
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('All systems operational')
    expect(screen.getByRole('heading', { name: 'Upwatch' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Live demo/ })).toHaveAttribute('href', 'https://upwatch-gamma.vercel.app')
  })

  it('hides contact links that are not configured', () => {
    renderApp()
    const contact = screen.getByRole('region', { name: 'Subscribe to updates' })
    expect(within(contact).getAllByRole('link')).toHaveLength(
      Object.values(profile.links).filter(Boolean).length,
    )
  })

  it('simulates an outage and logs it in the incident history', () => {
    vi.useFakeTimers()
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: 'Simulate outage' }))
    expect(screen.getByRole('status')).toHaveTextContent('Major outage')
    expect(screen.getAllByText('Down').length).toBeGreaterThan(0)

    act(() => vi.advanceTimersByTime(2500))
    expect(screen.getByRole('status')).toHaveTextContent('Incident resolved')
    expect(screen.getByText('Simulated outage')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(4000))
    expect(screen.getByRole('status')).toHaveTextContent('All systems operational')
  })

  it('speaks Portuguese', () => {
    renderApp('pt-BR')
    expect(screen.getByRole('status')).toHaveTextContent('Todos os sistemas operacionais')
    expect(screen.getByText('Desenvolvedor Frontend · React & TypeScript')).toBeInTheDocument()
  })
})
