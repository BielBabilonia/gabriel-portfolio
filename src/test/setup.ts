import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

window.matchMedia ??= (query: string) =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList

// The service ping must not hit the network in tests.
vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(null))))

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})
