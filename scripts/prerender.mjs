import fs from 'fs'
import path from 'path'

// Simple prerender: inject minimal real content into built HTML for better SEO/snippets.
// It preserves the built bundle and only fills #root with static markup so crawlers see content fast.
// Note: This is not a full SSR. The client app will hydrate/replace on load.

const distDir = path.resolve(process.cwd(), 'dist')
const templatePath = path.join(distDir, 'index.html')

if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found. Did you run `vite build`?')
  process.exit(1)
}

/**
 * Load base HTML and return helpers to produce route-specific HTML snapshots.
 */
const baseHtml = fs.readFileSync(templatePath, 'utf8')

function inject({ title, bodyHtml }) {
  // Update <title>
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  // Inject body content into #root
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`) 
  return html
}

function write(routePath, html) {
  const outDir = path.join(distDir, routePath)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8')
}

// Pull project titles from source for accuracy (fallback: hardcode if file read fails)
function getProjectTitles() {
  try {
    const src = fs.readFileSync(path.resolve('src/components/ProjectsSection.tsx'), 'utf8')
    const titles = Array.from(src.matchAll(/title:\s*'([^']+)'/g)).map(m => m[1])
    return titles
  } catch (e) {
    return []
  }
}

const projectTitles = getProjectTitles()

// Routes to prerender
const routes = [
  {
    path: '.',
    title: 'Tharidu Deshan Ekanayaka | Software Engineer, London',
    body: `
      <a href="#main" class="skip-link">Skip to content</a>
      <main id="main">
        <section style="padding:40px 0 24px">
          <div style="max-width:1080px;margin:0 auto;padding:0 32px">
            <h1 style="font-size:42px;font-weight:700;color:var(--text-primary);letter-spacing:-0.02em;margin:0 0 8px">hi, i'm tharidu. 👋</h1>
            <div style="display:flex;flex-direction:column;gap:10px;max-width:460px">
              <span style="font-size:21px;color:var(--text-primary)">software engineer in London</span>
              <span style="font-size:16px;color:var(--text-muted);line-height:1.5">Backend-leaning full-stack, currently working my way into AI engineering.</span>
            </div>
            <h2 style="font-size:20px;font-weight:700;color:var(--text-primary);letter-spacing:-0.01em;margin:26px 0 10px">work.</h2>
            <ul style="padding-left:18px;margin:0;color:var(--text-muted);font-size:16px;line-height:1.7">
              ${projectTitles.slice(0,6).map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        </section>
      </main>
    `,
  },
  {
    path: 'projects/sky-health-check',
    title: 'SKY Engineering Case Study | Tharidu Deshan Ekanayaka',
    body: `
      <a href="#main" class="skip-link">Skip to content</a>
      <main id="main" style="padding:40px 0">
        <div style="max-width:800px;margin:0 auto;padding:0 32px">
          <h1 style="font-size:28px;font-weight:700;color:var(--text-primary);letter-spacing:-0.02em;margin:0 0 10px">Agile Group Web Application — SKY Engineering</h1>
          <p style="font-size:15px;color:var(--text-muted);line-height:1.65;margin:0 0 12px">Full-stack Django 5 app delivered to a live client in a 12-week agile sprint.</p>
        </div>
      </main>
    `,
  }
]

for (const r of routes) {
  const html = inject({ title: r.title, bodyHtml: r.body })
  write(r.path, html)
  if (r.path === '.') {
    // also overwrite root index.html so the homepage serves content from the root file
    fs.writeFileSync(templatePath, html, 'utf8')
  }
}

console.log('[prerender] Wrote static HTML for /, /projects/sky-health-check')
