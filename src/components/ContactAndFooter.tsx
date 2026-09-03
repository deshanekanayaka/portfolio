import { Mail, Github, Linkedin } from 'lucide-react'


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
              { icon: Mail, href: 'mailto:deshan.ekan@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                title={label}
                style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
