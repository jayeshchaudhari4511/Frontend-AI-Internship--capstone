export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '72px',
        padding: '80px 48px',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Hero mark */}
      <JCMark size={128} />

      {/* Full lockup — light ground */}
      <JCLockup />

      {/* Reversed — dark ground */}
      <div
        style={{
          backgroundColor: '#111827',
          borderRadius: '24px',
          padding: '56px 72px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px',
        }}
      >
        <JCLockup dark />
      </div>

      {/* Favicon scale test */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ borderRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.12)' }}>
          <JCMark size={32} />
        </div>
        <div style={{ backgroundColor: '#111827', borderRadius: '6px', overflow: 'hidden' }}>
          <JCMark size={32} dark />
        </div>
        <span
          style={{
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: '#6B7280',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            textTransform: 'uppercase',
          }}
        >
          32 px
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Mark — interlocking JC
   J passes through the C's negative space.
   The J's hook terminal carries the green node.
───────────────────────────────────────────── */
function JCMark({ size = 96, dark = false }: { size?: number; dark?: boolean }) {
  const blue = dark ? '#F9FAFB' : '#2563EB'
  const green = '#10B981'
  const sw = 7 // stroke width in 100×100 viewBox units

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="JC"
    >
      {/*
        C — arc centered at (51, 45), r=23
        Opens to the right; top terminal ≈ (66, 27), bottom ≈ (66, 63)
        large-arc=1, sweep=0 → the long arc going through the left
      */}
      <path
        d="M 66,27 A 23,23 0 1,0 66,63"
        stroke={blue}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
      />

      {/*
        J — vertical from above C down through its interior, then a
        quarter-circle hook to the left. Center of hook arc: (37, 72).
      */}
      <path
        d="M 51,12 L 51,72 A 14,14 0 0,1 37,86"
        stroke={blue}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Network node — green dot at J hook terminal */}
      <circle cx="37" cy="86" r="5.5" fill={green} />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   Wordmark lockup — mark + name + role line
───────────────────────────────────────────── */
function JCLockup({ dark = false }: { dark?: boolean }) {
  const ink = dark ? '#F9FAFB' : '#111827'
  const sub = dark ? '#9CA3AF' : '#6B7280'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <JCMark size={52} dark={dark} />

      {/* Divider */}
      <div
        style={{
          width: '1px',
          height: '38px',
          backgroundColor: dark ? '#374151' : '#D1D5DB',
        }}
      />

      {/* Text block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: '18px',
            letterSpacing: '-0.03em',
            color: ink,
            lineHeight: 1.2,
          }}
        >
          jayesh chaudhari
        </span>
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: sub,
            lineHeight: 1.4,
          }}
        >
          AI · ML · Cloud
        </span>
      </div>
    </div>
  )
}
