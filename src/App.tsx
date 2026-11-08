import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import Home from './routes/Home'

// Case studies are split out so the homepage bundle does not carry them.
const SKYCaseStudy = lazy(() => import('./routes/projects/SKY'))

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home
            theme={theme}
            onToggleTheme={toggleTheme}
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
