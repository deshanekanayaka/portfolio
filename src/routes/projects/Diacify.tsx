import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ScrollProgress from '../../components/ScrollProgress'

const stack = ['React 18', 'Node.js', 'FastAPI', 'MySQL 8', 'scikit-learn', 'Docker', 'GitHub Actions']

const before_after = [
  ['Authentication', 'clerk_id trusted from request body', 'Clerk session token verified on every route'],
  ['Patient identity', 'Auto-increment integer only', 'Human-readable PAT-YYYY-NNNN IDs'],
  ['Visit history', 'One record per patient ever', 'Append-only visits table with longitudinal history'],
  ['ML labels', 'Self-invented point scoring', 'ADA 2025 HbA1c thresholds + five-flag composite rule'],
  ['ML failure mode', 'Patient save failed if ML down', 'Visit saved first, ML async, pending state if unreachable'],
  ['Tests', 'Zero', '8 Jest integration tests + 4 pytest tests'],
  ['CI/CD', 'None', '3 GitHub Actions workflows with path filters'],
  ['Schema', 'Single flat table', 'patients, visits, appointments, audit_log'],
  ['Security headers', 'None', 'helmet.js + express-rate-limit + Winston'],
  ['ML service access', 'Open CORS', 'X-Internal-Secret header required'],
]

const highlights = [
  { title: 'Row-level multi-tenancy', body: 'Every query derives clerk_id from the verified session token, never the request body — the pattern production healthcare SaaS systems use.' },
  { title: 'MySQL window functions', body: 'ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY visit_date DESC) returns current score and previous visit for trend comparison in a single query.' },
  { title: 'Async ML decoupling', body: 'Visit data writes to MySQL first. ML called async. If FastAPI is unreachable, visit saves with risk_category: pending. Zero data loss.' },
]

interface Props { theme: string; onToggleTheme: () => void }

export default function DiacifyCaseStudy({ theme, onToggleTheme }: Props) {
  const navigate = useNavigate()
  return (
    <>
      <Helmet>
        <title>Diacify Case Study | Tharidu Deshan Ekanayaka</title>
        <meta name="description" content="Clinical decision support system case study · rebuilt a 53%-graded submission into a production three-service system with 94% Random Forest accuracy." />
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
            Diacify — Clinical Decision Support System
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 20 }}>
            Rebuilt from a 53% university submission into a production-grade three-service system.
          </p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            <a href="https://diacify.vercel.app/" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 500, color: '#fff', background: 'var(--accent)', borderRadius: 6, padding: '7px 14px' }}>
              View live <ExternalLink size={12} />
            </a>
            <a href="https://github.com/deshanekanayaka/diacify" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 14px', background: 'var(--surface)' }}>
              <Github size={13} /> GitHub
            </a>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 36 }}>
            {stack.map(s => (
              <span key={s} style={{ fontSize: 11, fontWeight: 500, color: 'var(--accent)', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: 4, padding: '2px 8px' }}>{s}</span>
            ))}
          </div>
          <blockquote style={{ borderLeft: '3px solid var(--accent)', background: 'var(--accent-bg)', borderRadius: '0 8px 8px 0', padding: '16px 20px', marginBottom: 36 }}>
            <p style={{ fontSize: 15, fontStyle: 'italic', color: 'var(--accent)', lineHeight: 1.7 }}>
              "This project started as my university final year project. For the implementation component I received 53%. Every single criticism in the examiner feedback was valid."
            </p>
          </blockquote>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>What was broken</h2>
          <div style={{ overflowX: 'auto', marginBottom: 36 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                  {['Issue', 'Before', 'After'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {before_after.map(([issue, before, after], i) => (
                  <tr key={issue} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '11px 14px', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{issue}</td>
                    <td style={{ padding: '11px 14px', color: '#EF4444' }}>{before}</td>
                    <td style={{ padding: '11px 14px', color: '#16A34A' }}>{after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Technical highlights</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 36 }} className="highlights-grid">
            {highlights.map(h => (
              <div key={h.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{h.title}</div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.65 }}>{h.body}</p>
              </div>
            ))}
          </div>
          <a href="https://diacify.vercel.app/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: '#fff', background: 'var(--accent)', borderRadius: 8, padding: '10px 22px' }}>
            View the live system <ExternalLink size={14} />
          </a>
        </div>
      </main>
      <style>{`.highlights-grid { @media (max-width: 640px) { grid-template-columns: 1fr !important; } }`}</style>
    </>
  )
}
