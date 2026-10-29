import { useEffect } from 'react'
import { Banner } from './components/Banner'
import { ComponentsSection } from './components/ComponentsSection'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { IncidentHistory } from './components/IncidentHistory'
import { ServicesSection } from './components/ServicesSection'
import { Stats } from './components/Stats'
import { profile } from './content/profile'
import { useI18n } from './i18n/i18n-context'
import { useOutage } from './lib/use-outage'

export function App() {
  const { t } = useI18n()
  const outage = useOutage()

  useEffect(() => {
    document.title = t('meta.title', { name: profile.name })
  }, [t])

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[36rem]" />
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t('skip')}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="relative mx-auto w-full max-w-4xl flex-1 space-y-12 px-4 py-10 outline-none sm:px-6 sm:py-14">
        <Banner phase={outage.phase} />
        <Stats />
        <ComponentsSection down={outage.down} />
        <ServicesSection down={outage.down} />
        <IncidentHistory simulated={outage.history} />
        <Contact />
      </main>
      <Footer phase={outage.phase} lastIncident={outage.history[0]} onSimulate={outage.trigger} />
    </div>
  )
}
