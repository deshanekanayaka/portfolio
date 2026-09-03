import { Github, Linkedin, Mail, Download } from 'lucide-react'

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/deshanekanayaka', download: false },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/thariduekanayaka/', download: false },
  { icon: Mail, label: 'Email', href: 'mailto:deshanekanayake2003@gmail.com', download: false },
  { icon: Download, label: 'Download CV', href: '/Tharidu_Ekanayaka_CV.pdf', download: true },
]

interface HeroProps {
  sinhala: boolean
  onToggleSinhala: () => void
}

export default function Hero({ sinhala, onToggleSinhala }: HeroProps) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 60,
    }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto', padding: '0 32px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 64,
        alignItems: 'center',
      }} className="hero-grid">

        {/* Left */}
        <div>
          <h1 style={{
            fontSize: 52, fontWeight: 700, color: 'var(--text-primary)',
            letterSpacing: '-0.025em', lineHeight: 1.0,
            marginBottom: 22,
          }} className="hero-h1">
            {sinhala ? 'ආයුබෝවන්, මම තරිදු' : "hi, i'm tharidu."}
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
            <span style={{ fontSize: 16, color: 'var(--text-primary)', fontWeight: 500 }}>
              software engineer · based in london{' '}
              <span
                style={{ cursor: 'pointer' }}
                title="ආයුබෝවන්"
                onClick={onToggleSinhala}
              ></span>
            </span>
            <span style={{ fontSize: 16, color: 'var(--text-primary)', fontWeight: 500 }}>
              bsc (hons) computer science, first class honours · westminster
            </span>
            <span style={{ fontSize: 16, color: 'var(--text-primary)', fontWeight: 400, fontStyle: 'italic', opacity: 1 }}>
              fuelled by black coffee · no sugar · no exceptions
            </span>
          </div>

          {/* Availability near CTAs */}
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>
              open to graduate swe and junior ai/ml roles
            </span>
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {socials.map(({ icon: Icon, label, href, download }) => (
              <a key={label} href={href}
                {...(download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
                title={label}
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
                  e.currentTarget.style.color = 'var(--accent)'
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
                <Icon size={15} />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div className="hero-photo-wrap" style={{
          width: 320, height: 400,
          borderRadius: 20,
          overflow: 'hidden',
          flexShrink: 0,
          border: '1px solid var(--border)',
          background: 'var(--surface-raised)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <img
            src="/photo.jpg"
            alt="Tharidu E"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              const next = e.currentTarget.nextElementSibling as HTMLElement
              if (next) next.style.display = 'flex'
            }}
          />
          <div style={{
            display: 'none', position: 'absolute', inset: 0,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', padding: '0 24px' }}>
              Add photo.jpg to /public
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-photo-wrap { width: 220px !important; height: 275px !important; margin: 0 auto; }
          .hero-h1 { font-size: 36px !important; }
        }
      `}</style>
    </section>
  )
}
