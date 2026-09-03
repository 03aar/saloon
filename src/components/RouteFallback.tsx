/** Shown for the split second a lazily-loaded screen takes to arrive. Matches the page ground so nothing flashes. */
export function RouteFallback() {
  return (
    <div aria-busy="true" aria-label="Loading" style={{ minHeight: '100dvh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--gold-soft)', borderTopColor: 'var(--gold)', animation: 'spin 700ms linear infinite' }} />
    </div>
  )
}
