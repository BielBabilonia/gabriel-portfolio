import { useEffect, useState } from 'react'

export type PingResult =
  | { state: 'checking' }
  | { state: 'up'; ms: number }
  | { state: 'down' }

const TIMEOUT_MS = 8000
const INTERVAL_MS = 60_000

/**
 * Measures a real round trip from the visitor's browser to `url`.
 * `no-cors` gives an opaque response, which is enough to time it.
 */
export function usePing(url: string): PingResult {
  const [result, setResult] = useState<PingResult>({ state: 'checking' })

  useEffect(() => {
    let cancelled = false
    let controller: AbortController | undefined

    async function ping() {
      controller = new AbortController()
      const timeout = window.setTimeout(() => controller?.abort(), TIMEOUT_MS)
      const start = performance.now()
      try {
        await fetch(url, { mode: 'no-cors', cache: 'no-store', signal: controller.signal })
        if (!cancelled) setResult({ state: 'up', ms: performance.now() - start })
      } catch {
        if (!cancelled) setResult({ state: 'down' })
      } finally {
        window.clearTimeout(timeout)
      }
    }

    ping()
    const id = window.setInterval(ping, INTERVAL_MS)
    return () => {
      cancelled = true
      controller?.abort()
      window.clearInterval(id)
    }
  }, [url])

  return result
}
