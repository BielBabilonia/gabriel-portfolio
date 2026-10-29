import { describe, expect, it } from 'vitest'
import { formatClock, formatDate, formatMonth, isWorkingHours, offsetLabel } from './time'

const SP = 'America/Sao_Paulo'

describe('time helpers', () => {
  it('formats the clock in the profile time zone', () => {
    expect(formatClock(new Date('2026-10-29T17:05:00Z'), SP, 'en-GB')).toBe('14:05')
  })

  it('labels the offset as UTC', () => {
    expect(offsetLabel(new Date('2026-10-29T12:00:00Z'), SP)).toBe('UTC-3')
  })

  it('knows working hours on weekdays only', () => {
    expect(isWorkingHours(new Date('2026-10-29T15:00:00Z'), SP)).toBe(true) // Thu 12:00
    expect(isWorkingHours(new Date('2026-10-29T23:30:00Z'), SP)).toBe(false) // Thu 20:30
    expect(isWorkingHours(new Date('2026-10-31T15:00:00Z'), SP)).toBe(false) // Sat
  })

  it('does not shift date-only strings across time zones', () => {
    expect(formatDate('2026-10-29', 'en-US')).toBe('Oct 29, 2026')
  })
})

describe('formatMonth', () => {
  it('formats year-month without time zone drift', () => {
    expect(formatMonth('2026-03', 'en-US')).toBe('Mar 2026')
    expect(formatMonth('2021-01', 'en-US')).toBe('Jan 2021')
  })
})
