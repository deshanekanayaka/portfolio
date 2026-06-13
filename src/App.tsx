import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './routes/Home'
import DiacifyCaseStudy from './routes/projects/Diacify'
import SKYCaseStudy from './routes/projects/SKY'

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
        <Route path="/projects/diacify" element={<DiacifyCaseStudy theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/projects/sky-health-check" element={<SKYCaseStudy theme={theme} onToggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  )
}
