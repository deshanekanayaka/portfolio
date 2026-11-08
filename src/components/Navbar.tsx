import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

interface NavbarProps {
  theme: string
  onToggleTheme: () => void
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)

  useEffect(() => {
    // rAF-coalesced, and only re-render when the boolean actually flips.
    let raf: number | null = null
    const onScroll = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(() => {
        raf = null
        setScrolled(window.scrollY > 20)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  const links = [
    { label: 'home', href: '/' },
    { label: 'work', href: '#work' },
    { label: 'projects', href: '#projects' },
    { label: 'education', href: '#education' },
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
        height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }} className="page-container">
        {/* Name */}
        <a href="/" className="name-link"
          aria-describedby={tooltipDismissed ? undefined : 'name-meaning'}
          onMouseEnter={() => setTooltipDismissed(false)}
          onFocus={() => setTooltipDismissed(false)}
          onKeyDown={e => { if (e.key === 'Escape') setTooltipDismissed(true) }}
          style={{
          fontSize: 16, fontWeight: 600,
          color: 'var(--text-bold)',
          letterSpacing: '-0.01em',
          textDecoration: 'none',
        }}>
          tharidu
          {!tooltipDismissed && (
            <span id="name-meaning" className="name-tooltip" role="tooltip">
              තරිදු, the moon, in sinhala.
            </span>
          )}
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

        {/* Right: theme */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onToggleTheme}
            type="button"
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={theme === 'dark'}
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
              e.currentTarget.style.color = 'var(--accent-text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          style={{ display: 'none', flexDirection: 'column', gap: 4, padding: 4 }}
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu">
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 2, display: 'block' }} />
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 2, display: 'block' }} />
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 2, display: 'block' }} />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" style={{
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
