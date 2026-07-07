import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ScrollProgress from '../../components/ScrollProgress'

const stack = ['Django 5', 'Python', 'Bootstrap 5', 'SQLite', 'JavaScript']
const highlights = [
  { title: 'Role-based routing', body: 'Centralised dashboard router with traffic-light voting (Green/Amber/Red) and trend tracking per assessment card across sessions.' },
  { title: '20 end-to-end tests', body: 'Django TestCase tests covering authentication, voting workflows, role-based routing, and profile management across all four user tiers.' },
  { title: 'Unique constraint enforcement', body: 'ORM-level constraint prevents duplicate submissions per (user, session, card) — data integrity enforced at the database layer.' },
]

interface Props { theme: string; onToggleTheme: () => void }

export default function SKYCaseStudy({ theme, onToggleTheme }: Props) {
  const navigate = useNavigate()
  return (
    <>
      <Helmet>
        <title>SKY Engineering Case Study | Tharidu Deshan Ekanayaka</title>
        <meta name="description" content="Agile group web app case study for SKY Engineering · Django 5 app with role-based dashboards and end-to-end tests." />
      </Helmet>
      <ScrollProgress />
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={15} /> Back
        </button>
        <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>tharidu</span>
        <button onClick={onToggleTheme} style={{ fontSize: 18, background: 'none', border: 'none', cursor: 'pointer' }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      <main style={{ paddingTop: 60 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 32px 80px' }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 12 }}>
            Agile Group Web Application — SKY Engineering
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 20 }}>
            Full-stack Django 5 app delivered to a live client in a 12-week agile sprint.
          </p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            <a href="https://web-production-8ef73.up.railway.app/login/" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 500, color: '#fff', background: 'var(--accent)', borderRadius: 6, padding: '7px 14px' }}>
              View live <ExternalLink size={12} />
            </a>
            <a href="https://github.com/deshanekanayaka/Software-Development-Group-Project" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 14px', background: 'var(--surface)' }}>
              <Github size={13} /> GitHub
            </a>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 36 }}>
            {stack.map(s => (
              <span key={s} style={{ fontSize: 11, fontWeight: 500, color: 'var(--accent)', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: 4, padding: '2px 8px' }}>{s}</span>
            ))}
          </div>
          <div style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: 10, padding: '18px 20px', marginBottom: 36 }}>
            <p style={{ fontSize: 14, color: 'var(--accent)', lineHeight: 1.75 }}>
              Built as a 5-person agile team for a real SKY Engineering client, implementing the Spotify Squad Health Check model.
              The application supports four user tiers — team member, team lead, admin, and viewer.
            </p>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Technical highlights</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="highlights-grid">
            {highlights.map(h => (
              <div key={h.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{h.title}</div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.65 }}>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
