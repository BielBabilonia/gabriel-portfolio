const DAY_MS = 24 * 60 * 60 * 1000

export interface DayBar {
  /** UTC midnight of the day. */
  day: number
  online: boolean
}

/**
 * One bar per day for the last `days` days, ending today. Days on or after the
 * launch date are "online"; earlier ones are "not launched yet". Honest by design:
 * we don't fabricate outages or uptime we never measured.
 */
export function dailyBars(launchedAt: string, now: number, days = 90): DayBar[] {
  const today = Math.floor(now / DAY_MS) * DAY_MS
  const launch = Date.parse(launchedAt)
  return Array.from({ length: days }, (_, i) => {
    const day = today - (days - 1 - i) * DAY_MS
    return { day, online: day >= launch }
  })
}
