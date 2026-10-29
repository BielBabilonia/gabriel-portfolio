import { useCallback, useEffect, useRef, useState } from 'react'

export type OutagePhase = 'operational' | 'investigating' | 'resolved'

const INVESTIGATING_MS = 2400
const RESOLVED_MS = 4000

export interface SimulatedIncident {
  at: number
  seconds: number
}

/**
 * The "Simulate outage" easter egg: operational → investigating → resolved → operational.
 * Each run is logged so it shows up in the incident history for this visit.
 */
export function useOutage() {
  const [phase, setPhase] = useState<OutagePhase>('operational')
  const [history, setHistory] = useState<SimulatedIncident[]>([])
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  const trigger = useCallback(() => {
    if (phase !== 'operational') return
    const start = Date.now()
    setPhase('investigating')
    timers.current.push(
      window.setTimeout(() => {
        const seconds = Math.round((Date.now() - start) / 100) / 10
        setPhase('resolved')
        setHistory((current) => [{ at: Date.now(), seconds }, ...current])
        timers.current.push(window.setTimeout(() => setPhase('operational'), RESOLVED_MS))
      }, INVESTIGATING_MS),
    )
  }, [phase])

  return { phase, history, trigger, down: phase === 'investigating' }
}
