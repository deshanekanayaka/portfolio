import { Github, Linkedin, Mail, Download } from 'lucide-react'

const iconSocials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/thariduekanayaka/' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/deshanekanayaka' },
  { icon: Mail, label: 'Email', href: 'mailto:deshan.ekan@gmail.com' },
]

export default function Hero() {
  return (
    <section className="hero-section" style={{
      display: 'flex',
      alignItems: 'center',
      paddingTop: 96,
      paddingBottom: 0,
    }}>
      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 240px',
        gap: 32,
        alignItems: 'center',
      }} className="page-container hero-grid">

        {/* Left */}
        <div>
          <h1 style={{
            fontSize: 44, fontWeight: 700, color: 'var(--text-bold)',
            letterSpacing: '-0.025em', lineHeight: 1.15,
            marginBottom: 8,
          }} className="hero-h1">
            hi, i'm tharidu. <span className="wave-hand" role="img" aria-label="Waving hand" tabIndex={0}>👋</span>
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20, maxWidth: 460 }}>
            <span style={{ fontSize: 21, fontWeight: 400, color: 'var(--text-primary)' }}>
              software engineer in London
            </span>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-muted)' }}>
              Outside code, I play fingerpicking guitar and practise yoga.
            </p>
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a href="/Tharidu_Ekanayaka_CV.pdf" download
              title="Download CV"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 18px',
                border: '1.5px solid var(--border)',
                borderRadius: 10,
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: 13, fontWeight: 500,
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent-text)'
                e.currentTarget.style.background = 'var(--accent-bg)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(59,130,246,0.18)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.background = 'var(--surface)'
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Download size={15} />
              Download CV
            </a>

            {iconSocials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href}
                target="_blank" rel="noopener noreferrer"
                title={label}
                aria-label={label}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 38, height: 38,
                  border: '1.5px solid var(--border)',
                  borderRadius: 10,
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--accent-text)'
                  e.currentTarget.style.background = 'var(--accent-bg)'
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(59,130,246,0.18)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.background = 'var(--surface)'
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div className="hero-photo-wrap" style={{
          width: 240, height: 280,
          borderRadius: 20,
          overflow: 'hidden',
          flexShrink: 0,
          border: '1px solid var(--border)',
          background: 'var(--surface-raised)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <img
            src="/photo.webp"
            alt="Tharidu Ekanayaka"
            width={640}
            height={641}
            // This is the LCP element, so it must not be lazy or deprioritised.
            fetchPriority="high"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            onError={e => {
              // If the photo 404s, fall back to an initial rather than the old
              // "Add photo.jpg to /public" developer note, which shipped to users.
              e.currentTarget.style.display = 'none'
              const next = e.currentTarget.nextElementSibling as HTMLElement
              if (next) next.style.display = 'flex'
            }}
          />
          <div aria-hidden="true" style={{
            display: 'none', position: 'absolute', inset: 0,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 64, fontWeight: 600, color: 'var(--text-bold)' }}>
              T
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section { min-height: auto !important; padding-top: 88px !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hero-photo-wrap { width: 180px !important; height: 210px !important; margin: 0 auto; }
          .hero-h1 { font-size: 36px !important; }
        }
      `}</style>
    </section>
  )
}
