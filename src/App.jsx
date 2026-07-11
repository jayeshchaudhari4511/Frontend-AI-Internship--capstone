import './index.css';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <main
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-16"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── Background orbs ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="orb w-[600px] h-[600px] opacity-30"
        style={{
          background: 'radial-gradient(circle, #6366f1, #8b5cf6)',
          top: '-200px',
          left: '-200px',
          animationDelay: '0s',
        }}
      />
      <div
        aria-hidden="true"
        className="orb w-[500px] h-[500px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #4f46e5, #06b6d4)',
          bottom: '-150px',
          right: '-150px',
          animationDelay: '-6s',
        }}
      />

      {/* ── Noise texture overlay ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      <div className="relative z-10 w-full max-w-xl fade-up">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="mb-10 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6"
            style={{
              borderColor: 'rgba(99,102,241,0.35)',
              background:  'rgba(99,102,241,0.12)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-medium tracking-wide" style={{ color: '#a5b4fc' }}>
              Available for projects
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, #f1f5f9 30%, #a5b4fc 70%, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Let's Work Together
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind or just want to say hello?<br />
            Drop me a message and I'll get back within 24 hours.
          </p>
        </header>

        {/* ── Card ────────────────────────────────────────────────────── */}
        <section
          aria-label="Contact form"
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background:    'var(--card)',
            border:        '1px solid var(--card-border)',
            backdropFilter: 'blur(24px)',
            boxShadow:     '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <ContactForm />
        </section>

        {/* ── Footer note ─────────────────────────────────────────────── */}
        <p className="mt-6 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          Your information is never shared or sold.
        </p>
      </div>
    </main>
  );
}

export default App;
