import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom lacks a few browser APIs the UI relies on.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({ matches: false, media: query, onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() }))
}
window.scrollTo = vi.fn()
Element.prototype.scrollIntoView = vi.fn()
if (!globalThis.CSS) (globalThis as unknown as { CSS: unknown }).CSS = { escape: (s: string) => s }

afterEach(() => {
  cleanup()
  localStorage.clear()
})
