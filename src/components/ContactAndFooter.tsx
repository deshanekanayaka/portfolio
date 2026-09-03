import { Mail, Github, Linkedin, X } from 'lucide-react'


export function ContactPopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '28px 32px',
          maxWidth: 360, width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          animation: 'fadeIn 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              You know where to find me.
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginTop: -2 }}>
            <X size={16} />
          </button>
        </div>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
          Links are right below — LinkedIn, GitHub, or email. I'm actively looking for junior and graduate software engineering roles in London from July 2026.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="mailto:deshan.ekan@gamil.com"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontSize: 13, fontWeight: 500, color: '#fff',
              background: 'var(--accent)', border: '1px solid var(--accent)',
              borderRadius: 8, padding: '9px 0', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            <Mail size={14} /> Email me
          </a>
          <a href="https://www.linkedin.com/in/thariduekanayaka/" target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontSize: 13, fontWeight: 500, color: 'var(--text-primary)',
              background: 'var(--surface-raised)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '9px 0', transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            <Linkedin size={14} /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <>
      <footer style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '24px 0',
      }}>
        <div style={{
          maxWidth: 1080, margin: '0 auto', padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          {/* Left: copyright */}
          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            © 2026 tharidu, London
          </span>

          {/* Right: icons */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {[
              { icon: Linkedin, href: 'https://www.linkedin.com/in/thariduekanayaka/', label: 'LinkedIn' },
              { icon: Github, href: 'https://github.com/deshanekanayaka', label: 'GitHub' },
              { icon: Mail, href: 'mailto:deshan.ekan@gamil.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                title={label}
                style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}
