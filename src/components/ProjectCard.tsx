import { useState, useRef, useEffect } from 'react'
import { Github, ExternalLink, FolderOpen, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export interface ProjectData {
  title: string
  description: string
  lead?: string
  typeBadge: string
  statBadge: string
  stack: string[]
  demo: string
  github: string
  caseStudy?: string
  flagship?: boolean
  screenshot?: string
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  const [hovered, setHovered] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const navigate = useNavigate()
  const openerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Cards render a ~500px-wide slot, the lightbox renders up to 90vw. Shipping
  // one 1400px file to both wastes ~60KB on the card, so each screenshot is
  // built at two sizes and the "-full" variant is fetched only when opened.
  const screenshotFull = project.screenshot?.replace(/\.webp$/, '-full.webp')

  // Dialog behaviour: focus the close button, close on Escape, lock background
  // scroll, and hand focus back to the thumbnail that opened it.
  useEffect(() => {
    if (!lightboxOpen) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      openerRef.current?.focus()
    }
  }, [lightboxOpen])

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--surface)',
          border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
          borderRadius: 14,
          padding: '22px 22px 20px',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hovered ? '0 8px 28px rgba(59,130,246,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
          transition: 'all 0.2s ease',
          display: 'flex', flexDirection: 'column', gap: 12,
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          minHeight: 400,
        }}
      >
        {project.screenshot && (
          <button
            type="button"
            ref={openerRef}
            onClick={() => setLightboxOpen(true)}
            aria-label={`View larger screenshot of ${project.title}`}
            style={{
              width: 'calc(100% + 44px)',
              height: 180,
              borderRadius: '10px 10px 0 0',
              overflow: 'hidden',
              cursor: 'zoom-in',
              margin: '-22px -22px 16px -22px',
              flexShrink: 0,
              padding: 0,
              border: 'none',
              background: 'none',
              display: 'block',
            }}
          >
            {/* No width/height attributes: the six screenshots have different
                aspect ratios and the 180px-tall parent plus object-fit: cover
                fully determines layout, so there is no CLS to guard against. */}
            <img
              src={project.screenshot}
              alt={project.title + ' screenshot'}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                display: 'block',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </button>
        )}

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <FolderOpen size={16} style={{ color: 'var(--text-faint)', marginTop: 2, flexShrink: 0 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {project.title}
            </span>
            {project.flagship && (
              <span style={{
                fontSize: 10, fontWeight: 500,
                color: 'var(--accent-text)', background: 'var(--accent-bg)',
                border: '1px solid var(--accent-border)',
                borderRadius: 4, padding: '1px 7px',
              }}>Flagship</span>
            )}
          </div>
        </div>

        {/* Type + stat badges */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 11, fontWeight: 500, color: 'var(--accent-text)',
            background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
            borderRadius: 4, padding: '2px 8px',
          }}>{project.typeBadge}</span>
          <span style={{
            fontSize: 11, fontWeight: 400, color: 'var(--text-muted)',
            background: 'var(--surface-raised)', border: '1px solid var(--border)',
            borderRadius: 4, padding: '2px 8px',
          }}>{project.statBadge}</span>
        </div>

        {/* Description */}
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>
          {project.lead ?? project.description}
        </p>

        {/* Tech stack pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
          {project.stack.map(tech => (
            <span key={tech} style={{
              fontSize: 12,
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid var(--accent-border)',
              background: 'var(--accent-bg)',
              color: 'var(--accent-text)',
              whiteSpace: 'nowrap',
            }}>{tech}</span>
          ))}
        </div>

        {/* Buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
              {project.caseStudy && (
                  <button
                      onClick={() => navigate(project.caseStudy!)}
                      style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border)',
                          borderRadius: 6,
                          padding: '6px 13px',
                          background: 'transparent',
                          transition: 'all 0.15s',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                      }}
                      onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent-border)'
                          e.currentTarget.style.color = 'var(--accent-text)'
                      }}
                      onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border)'
                          e.currentTarget.style.color = 'var(--text-muted)'
                      }}
                  >
                      <BookOpen size={12} />
                      Case study
                  </button>
              )}

              <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#fff',
                      background: '#15803D',
                      border: '1px solid #15803D',
                      borderRadius: 6,
                      padding: '6px 13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      transition: 'background 0.15s',
                      textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#166534'
                  }}
                  onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#15803D'
                  }}
              >
                  <Github size={12} />
                  GitHub
              </a>

              {project.demo && (
                  <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: '#fff',
                          background: 'var(--accent-solid)',
                          border: '1px solid var(--accent-solid)',
                          borderRadius: 6,
                          padding: '6px 13px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          transition: 'background 0.15s',
                          textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--accent-solid-hover)'
                      }}
                      onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--accent-solid)'
                      }}
                  >
                      Live
                      <ExternalLink size={11} />
                  </a>
              )}
          </div>
      </div>

      {lightboxOpen && project.screenshot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} screenshot`}
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            cursor: 'zoom-out',
          }}
        >
          <img
            src={screenshotFull}
            alt={project.title + ' screenshot'}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              borderRadius: 12,
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              objectFit: 'contain',
              cursor: 'default',
            }}
          />
          <button
            ref={closeRef}
            type="button"
            aria-label="Close image"
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: 40,
              height: 40,
              color: '#fff',
              fontSize: 20,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
          >×</button>
        </div>
      )}
    </>
  )
}
