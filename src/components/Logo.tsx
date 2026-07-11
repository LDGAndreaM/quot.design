export function LogoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M18 12c-3.31 0-6 2.69-6 6v12" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 30v14c0 3.31 2.69 6 6 6h4" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
      <path d="M18 12h16l12 12v14a4 4 0 0 1-4 4H28" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 12v8a4 4 0 0 0 4 4h8" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="19" y="30" width="9" height="5" rx="1.5" fill="#22D3EE" />
      <rect x="30" y="30" width="9" height="5" rx="1.5" fill="#EC4899" />
      <rect x="41" y="30" width="9" height="5" rx="1.5" fill="#FACC15" />
    </svg>
  );
}

export function Wordmark({ size = 16 }: { size?: number }) {
  return (
    <span className="font-display font-semibold text-ink" style={{ fontSize: size }}>
      Quot<span className="text-pink">.</span>Design
    </span>
  );
}
