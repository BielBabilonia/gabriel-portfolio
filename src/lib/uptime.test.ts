import { describe, expect, it } from 'vitest'
import { dailyBars } from './uptime'

describe('dailyBars', () => {
  it('marks days before launch as not launched', () => {
    const bars = dailyBars('2026-10-28', Date.parse('2026-10-29T15:00:00Z'), 5)
    expect(bars.map((b) => b.online)).toEqual([false, false, false, true, true])
    expect(new Date(bars.at(-1)!.day).toISOString()).toBe('2026-10-29T00:00:00.000Z')
  })
})
