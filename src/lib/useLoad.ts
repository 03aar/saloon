import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type Status = 'loading' | 'ready' | 'error'

const seen = new Set<string>()

/**
 * Simulates a network fetch so every screen has a real loading → ready/error lifecycle.
 * First visit to a key shows a skeleton for `ms`; later visits are instant (cached).
 * Append `?state=loading` or `?state=error` to any route to force that state for QA.
 */
export function useLoad(key: string, ms = 650) {
  const [params] = useSearchParams()
  const forced = params.get('state')
  const [status, setStatus] = useState<Status>(() => (forced === 'error' ? 'error' : forced === 'loading' ? 'loading' : seen.has(key) ? 'ready' : 'loading'))
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (forced === 'loading') return
    if (forced === 'error' && attempt === 0) {
      setStatus('error')
      return
    }
    if (status === 'ready') return
    const t = window.setTimeout(() => {
      seen.add(key)
      setStatus('ready')
    }, ms)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt, forced])

  const retry = useCallback(() => {
    setStatus('loading')
    setAttempt((a) => a + 1)
  }, [])

  return { status, retry, loading: status === 'loading', error: status === 'error' }
}

/** True when the browser reports it is offline. */
export function useOnline() {
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine))
  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])
  return online
}
