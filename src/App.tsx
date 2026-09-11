import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import Home from './routes/Home'

// Case studies are split out so the homepage bundle does not carry them.
const SKYCaseStudy = lazy(() => import('./routes/projects/SKY'))

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [sinhala, setSinhala] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (sinhala) {
      const t = setTimeout(() => setSinhala(false), 2500)
      return () => clearTimeout(t)
    }
  }, [sinhala])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  const toggleSinhala = () => setSinhala(s => !s)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home
            theme={theme}
            sinhala={sinhala}
            onToggleTheme={toggleTheme}
            onToggleSinhala={toggleSinhala}
          />
        } />
        <Route path="/projects/sky-health-check" element={
          <Suspense fallback={null}>
            <SKYCaseStudy theme={theme} onToggleTheme={toggleTheme} />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  )
}
