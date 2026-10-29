import { profile } from '../content/profile'
import { LOCALES, useI18n, type Locale } from '../i18n/i18n-context'
import { useTheme, type ThemePreference } from '../theme/theme-context'
import { LogoMark, MonitorIcon, MoonIcon, SunIcon } from './icons'
import { SegmentedControl } from './SegmentedControl'

export function Header() {
  const { t, locale, setLocale } = useI18n()
  const { preference, setPreference } = useTheme()
  const handle = profile.name.split(' ')[0].toLowerCase()

  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4 sm:px-6">
        <p className="flex items-center gap-2 font-mono text-sm font-medium">
          <LogoMark className="size-7" />
          <span>
            {handle}
            <span className="text-muted">.status</span>
          </span>
        </p>
        <div className="flex items-center gap-2">
          <SegmentedControl<Locale>
            label={t('language.label')}
            size="sm"
            value={locale}
            onChange={setLocale}
            options={LOCALES.map((value) => ({
              value,
              label: value === 'en' ? 'EN' : 'PT',
              title: value === 'en' ? 'English' : 'Português',
              lang: value,
            }))}
          />
          <SegmentedControl<ThemePreference>
            label={t('theme.label')}
            size="sm"
            value={preference}
            onChange={setPreference}
            options={[
              { value: 'system', label: <MonitorIcon />, ariaLabel: t('theme.system') },
              { value: 'light', label: <SunIcon />, ariaLabel: t('theme.light') },
              { value: 'dark', label: <MoonIcon />, ariaLabel: t('theme.dark') },
            ]}
          />
        </div>
      </div>
    </header>
  )
}
