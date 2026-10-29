/** "14:32" in the given time zone. */
export function formatClock(date: Date, timeZone: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { timeZone, hour: '2-digit', minute: '2-digit' }).format(date)
}

/** "GMT-3" style offset label for the time zone. */
export function offsetLabel(date: Date, timeZone: string): string {
  const part = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' })
    .formatToParts(date)
    .find((p) => p.type === 'timeZoneName')
  return part?.value.replace('GMT', 'UTC') ?? ''
}

/** Weekdays, 9:00–19:00 in the given time zone. */
export function isWorkingHours(date: Date, timeZone: string): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const weekday = parts.find((p) => p.type === 'weekday')?.value
  const hour = Number(parts.find((p) => p.type === 'hour')?.value)
  return weekday !== 'Sat' && weekday !== 'Sun' && hour >= 9 && hour < 19
}

export function formatDate(isoDate: string, locale: string): string {
  // Date-only strings are parsed as UTC; format in UTC so the day doesn't shift.
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(isoDate))
}

/** "Mar 2026" from "2026-03". */
export function formatMonth(yearMonth: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${yearMonth}-01T00:00:00Z`),
  )
}

export function formatLatency(ms: number, locale: string): string {
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(ms)} ms`
}
