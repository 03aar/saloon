import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { AppProvider, useApp } from './AppContext'

const wrapper = ({ children }: { children: ReactNode }) => <AppProvider>{children}</AppProvider>

describe('AppContext store', () => {
  it('starts signed out and signs a brand in, seeding the brand name from the company', () => {
    const { result } = renderHook(() => useApp(), { wrapper })
    expect(result.current.state.session).toBeNull()
    act(() => result.current.signIn({ role: 'brand', email: 'a@b.co', name: 'Lumen', company: 'Lumen Studios' }))
    expect(result.current.state.session?.role).toBe('brand')
    expect(result.current.state.brand.name).toBe('Lumen Studios')
  })

  it('persists state to localStorage and restores it', () => {
    const first = renderHook(() => useApp(), { wrapper })
    act(() => first.result.current.toggleSaved('mira-alia'))
    expect(JSON.parse(localStorage.getItem('bloop.state.v1')!).saved).toEqual(['mira-alia'])
    const second = renderHook(() => useApp(), { wrapper })
    expect(second.result.current.state.saved).toEqual(['mira-alia'])
  })

  it('toggles shortlist membership and clears the session on sign out', () => {
    const { result } = renderHook(() => useApp(), { wrapper })
    act(() => result.current.toggleShortlist('x'))
    act(() => result.current.toggleShortlist('y'))
    act(() => result.current.toggleShortlist('x'))
    expect(result.current.state.shortlist).toEqual(['y'])
    act(() => result.current.signIn({ role: 'creator', email: 'c@d.co', name: 'Mira' }))
    act(() => result.current.signOut())
    expect(result.current.state.session).toBeNull()
  })

  it('ignores corrupt persisted state', () => {
    localStorage.setItem('bloop.state.v1', '{not json')
    const { result } = renderHook(() => useApp(), { wrapper })
    expect(result.current.state.session).toBeNull()
  })
})
