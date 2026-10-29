import { useEffect } from 'react'
import { Banner } from './components/Banner'
import { Contact } from './components/Contact'
import { Documents } from './components/Documents'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Stats } from './components/Stats'
import { profile } from './content/profile'
import { useI18n } from './i18n/i18n-context'

export function App() {
  const { t } = useI18n()

  useEffect(() => {
    document.title = t('meta.title', { name: profile.name })
  }, [t])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="label sr-only z-50 bg-accent px-3 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t('skip')}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-5xl flex-1 px-4 outline-none sm:px-8">
        <Banner />
        <div className="mt-10 space-y-20">
          <Stats />
          <Skills />
          <Projects />
          <Experience />
          <Documents index={4} />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}
