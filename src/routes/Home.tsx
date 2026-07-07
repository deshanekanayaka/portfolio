import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProjectsSection from '../components/ProjectsSection'
import AboutSection from '../components/AboutSection'
import { Footer } from '../components/ContactAndFooter'
import ScrollProgress from '../components/ScrollProgress'
import LightSVG from '../components/LightSVG'
import DarkSVG from '../components/DarkSVG'
import { Helmet } from 'react-helmet-async'

interface Props {
  theme: string
  sinhala: boolean
  onToggleTheme: () => void
  onToggleSinhala: () => void
}

export default function Home({
  theme, sinhala,
  onToggleTheme, onToggleSinhala,
}: Props) {
  return (
    <>
      <Helmet>
        <title>Tharidu Deshan Ekanayaka | Software Engineer, London</title>
        <meta name="description" content="Software engineer in London. First Class CS graduate (Westminster) building full-stack and AI/ML systems. Open to graduate SWE and junior AI/ML roles." />
      </Helmet>
      {theme === 'dark' ? <DarkSVG /> : <LightSVG />}
      <ScrollProgress />
      <Navbar
        theme={theme}
        sinhala={sinhala}
        onToggleTheme={onToggleTheme}
        onToggleSinhala={onToggleSinhala}
      />
      <main>
        <Hero sinhala={sinhala} onToggleSinhala={onToggleSinhala} />
        <ProjectsSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
