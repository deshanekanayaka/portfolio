import { useState, useRef } from 'react'
import ProjectCard, { ProjectData } from './ProjectCard'

const projects: ProjectData[] = [
  {
    title: 'Diacify — Clinical Decision Support',
    description: 'ML system that ranks diabetic patients by urgency. Rebuilt from a 53% university submission to 94% Random Forest accuracy.',
    typeBadge: 'ML · Full-stack',
    statBadge: '94% accuracy',
    stack: ['React 18', 'Node.js', 'FastAPI', 'MySQL 8', 'scikit-learn', 'Docker', 'GitHub Actions'],
    demo: 'https://diacify.vercel.app/',
    github: 'https://github.com/deshanekanayaka/diacify',
    caseStudy: '/projects/diacify',
    flagship: true,
    screenshot: '/screenshots/diacify.png',
  },
  {
    title: 'Agile Group Web Application',
    description: 'Full-stack Django 5 app delivered to a SKY Engineering client in a 12-week agile sprint. Implemented the Spotify Squad Health Check model across four user tiers with role-based dashboards.',
    typeBadge: 'Full-stack',
    statBadge: '20 end-to-end tests',
    stack: ['Django 5', 'Python', 'Bootstrap 5', 'SQLite', 'JavaScript'],
    demo: 'https://web-production-8ef73.up.railway.app/login/',
    github: 'https://github.com/deshanekanayaka/Software-Development-Group-Project',
    screenshot: '/screenshots/sky-health-check.png',
  },
  {
    title: 'Java REST API + React Frontend',
    description: 'Spring Boot 3.2 REST API with 8 CRUD endpoints for staff management. Typed exception hierarchy, DTO contracts, JUnit/Mockito tests, Swagger docs. Deployed on Railway and Vercel.',
    typeBadge: 'API',
    statBadge: '8 endpoints',
    stack: ['Spring Boot 3.2', 'PostgreSQL', 'JUnit 5', 'React 18', 'TypeScript'],
    demo: 'https://health-centre-application.vercel.app/',
    github: 'https://github.com/deshanekanayaka/HealthCentreApplication',
    screenshot: '/screenshots/java-api.png',
  },
  {
    title: 'Yurjinia — Project Management SPA',
    description: 'Jira-style SPA with Kanban board, per-project ticket management, reusable shadcn/ui component library, and TanStack Query for server state.',
    typeBadge: 'Frontend',
    statBadge: 'React 19 · TanStack',
    stack: ['React 19', 'TypeScript', 'TanStack Router', 'Zustand', 'Clerk'],
    demo: 'https://yurjinia-frontend.vercel.app/',
    github: 'https://github.com/deshanekanayaka/Yurjinia-Frontend',
    screenshot: '/screenshots/yurjinia.png',
  },
  {
    title: 'Potions Guide — TypeScript SPA',
    description: 'React SPA consuming the Potter DB API. Debounced search reduced API calls by 70% and cut response time to under 200ms.',
    typeBadge: 'Frontend',
    statBadge: '70% fewer API calls',
    stack: ['React', 'TypeScript', 'REST API', 'Vite'],
    demo: 'https://potions-guide.vercel.app',
    github: 'https://github.com/deshanekanayaka/Potions-Guide',
    screenshot: '/screenshots/potions-guide.png',
  },
]

export default function ProjectsSection() {
  const [tab, setTab] = useState<'featured' | 'all'>('featured')
  const sectionRef = useRef<HTMLElement>(null)

  const shown = tab === 'featured' ? projects.filter((_, i) => i < 2) : projects

  return (
    <section id="work" ref={sectionRef} style={{ padding: '80px 0 64px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px' }}>

        {/* Ted-style heading */}
        <h2 style={{
          fontSize: 48, fontWeight: 700, color: 'var(--text-primary)',
          letterSpacing: '-0.03em', lineHeight: 1,
          marginBottom: 40,
        }}>
          my projects.
        </h2>

        {/* Tab toggle — Ted style: pill toggle not underline tabs */}
        <div style={{
          display: 'inline-flex',
          background: 'var(--surface-raised)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: 4,
          marginBottom: 32,
          gap: 2,
        }}>
          {(['featured', 'all'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontSize: 13, fontWeight: 500,
                padding: '7px 18px',
                borderRadius: 7,
                border: 'none',
                background: tab === t ? 'var(--surface)' : 'transparent',
                color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)',
                boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {t === 'featured' ? 'Featured' : 'All Projects'}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }} className="projects-grid">
          {shown.map((p, index) => {
            const isLastOdd = index === shown.length - 1 && shown.length % 2 !== 0
            return (
              <div key={p.title} style={{ gridColumn: isLastOdd ? '1 / -1' : undefined }} className={isLastOdd ? 'last-odd-card' : undefined}>
                <ProjectCard project={p} />
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .last-odd-card { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  )
}
