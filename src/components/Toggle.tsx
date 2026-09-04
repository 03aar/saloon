type Props = { checked: boolean; onChange: (v: boolean) => void; label: string }

export function Toggle({ checked, onChange, label }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      style={{
        width: 56,
        height: 32,
        borderRadius: 'var(--r-pill)',
        background: checked ? 'var(--gold)' : 'var(--surface-3)',
        position: 'relative',
        transition: 'background-color 220ms var(--ease)',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: checked ? 27 : 3,
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 2px 6px rgba(28,25,22,0.2)',
          transition: 'left 220ms var(--ease)',
        }}
      />
    </button>
  )
}
