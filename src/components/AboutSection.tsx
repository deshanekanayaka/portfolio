import { GraduationCap, Star } from 'lucide-react'

const credentials = [
  { icon: GraduationCap, text: 'University of Westminster — BSc Hons Computer Science (2026)' },
  { icon: Star, text: 'Westminster Award Bronze — April 2026' },
  { icon: GraduationCap, text: 'Meta Front-End Professional Certificate — Jan 2024' },
]

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: '72px 0' }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto', padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 56,
        alignItems: 'start',
      }} className="about-grid">

        {/* Left: about text */}
        <div>
          <h2 style={{
            fontSize: 48, fontWeight: 700, color: 'var(--text-primary)',
            letterSpacing: '-0.03em', lineHeight: 1,
            marginBottom: 32,
          }}>about.</h2>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '68ch' }}>
            I build systems that assume the model will be wrong. Every pipeline I ship has
            a defined behaviour for an empty retrieval, a rejected schema, and a failed
            tool call, plus a log line that says which one happened. ClaimLens returns
            NOT ENOUGH INFO rather than guessing. Diacify surfaces its confidence rather
            than hiding it. Most of my engineering time goes into the paths nobody demos.
          </p>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '68ch', marginTop: 20 }}>
            Currently building Retell, a daily voice practice tool for interview answers.
          </p>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '68ch', marginTop: 20 }}>
            Fuelled by black coffee. No sugar, no exceptions.
          </p>
        </div>

        {/* Right: credentials — aligned with about text top */}
        <div>
          <h3 style={{
            fontSize: 48, fontWeight: 700, color: 'var(--text-primary)',
            letterSpacing: '-0.03em', lineHeight: 1,
            marginBottom: 32,
          }}>education.</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {credentials.map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={14} style={{ color: 'var(--accent)' }} />
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, paddingTop: 4 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
