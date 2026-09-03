/** Gold scalloped verified badge with a white check, used next to creator and brand names. */
export function Verified({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="Verified"
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path
        d="M12 1.6l2.3 1.9 2.9-.6 1.1 2.8 2.8 1.1-.6 2.9 1.9 2.3-1.9 2.3.6 2.9-2.8 1.1-1.1 2.8-2.9-.6L12 22.4l-2.3-1.9-2.9.6-1.1-2.8-2.8-1.1.6-2.9L1.6 12l1.9-2.3-.6-2.9 2.8-1.1 1.1-2.8 2.9.6z"
        fill="var(--gold)"
      />
      <path d="M7.6 12.3l2.9 2.9 5.9-6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
