const credentials = [
  'University of Westminster, BSc Hons Computer Science (2026)',
  'Westminster Award Bronze, April 2026',
  'Meta Front-End Professional Certificate, Jan 2024',
]

export default function EducationSection() {
  return (
    <section id="education">
      <div className="page-container">
        <h2 style={{
          fontSize: 36, fontWeight: 700, color: 'var(--text-bold)',
          letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 24,
        }}>education.</h2>
        <ul style={{
          display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 20,
          fontSize: 16, lineHeight: 1.6, color: 'var(--text-muted)',
        }}>
          {credentials.map(text => <li key={text}>{text}</li>)}
        </ul>
      </div>
    </section>
  )
}
