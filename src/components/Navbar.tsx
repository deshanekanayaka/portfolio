import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

interface NavbarProps {
  theme: string
  sinhala: boolean
  onToggleTheme: () => void
  onToggleSinhala: () => void
}

export default function Navbar({ theme, sinhala, onToggleTheme, onToggleSinhala }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showMeaning, setShowMeaning] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'home', href: '/' },
    { label: 'work', href: '#work' },
    { label: 'about', href: '#about' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled
        ? theme === 'dark' ? 'rgba(0,0,0,0.92)' : 'rgba(255,255,255,0.92)'
        : theme === 'dark' ? 'rgba(0,0,0,0.98)' : 'rgba(255,255,255,0.98)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition: 'all 0.2s ease',
    }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        padding: '0 32px',
        height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Name with tooltip */}
        <a href="/" style={{
          fontSize: 16, fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          textDecoration: 'none',
        }}>
          <span
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowMeaning(true)}
            onMouseLeave={() => setShowMeaning(false)}
          >
            {sinhala ? 'තරිදු' : 'tharidu'}
            {showMeaning && (
              <div style={{
                position: 'absolute',
                top: 28,
                left: 0,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 12,
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                zIndex: 200,
              }}>
                තරිදු — the moon, in sinhala.
              </div>
            )}
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ fontSize: 16, color: 'var(--text-primary)', opacity: 0.75, transition: 'color 0.15s, opacity 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.opacity = '0.75' }}
            >{l.label}</a>
          ))}
        </div>

        {/* Right: theme + flag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onToggleTheme}
            title="Toggle theme"
            style={{
              width: 36, height: 36,
              border: '1px solid var(--border)',
              borderRadius: 8,
              background: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={onToggleSinhala}
            title="Switch greeting to Sinhala"
            aria-label="Switch greeting to Sinhala"
            style={{
              fontSize: 20, background: 'none', border: 'none',
              cursor: 'pointer', lineHeight: 1,
              transform: sinhala ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
          >🇱🇰</button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: 4, padding: 4 }}
          className="hamburger" aria-label="Toggle menu">
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 2, display: 'block' }} />
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 2, display: 'block' }} />
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 2, display: 'block' }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: '16px 32px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 16, color: 'var(--text-muted)' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
