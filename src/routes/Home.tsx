import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProjectsSection from '../components/ProjectsSection'
import WorkSection from '../components/WorkSection'
import EducationSection from '../components/EducationSection'
import { Footer } from '../components/ContactAndFooter'
import ScrollProgress from '../components/ScrollProgress'
import LightSVG from '../components/LightSVG'
import DarkSVG from '../components/DarkSVG'
import { Helmet } from 'react-helmet-async'

interface Props {
  theme: string
  onToggleTheme: () => void
}

export default function Home({
  theme, onToggleTheme,
}: Props) {
  return (
    <>
      <Helmet>
        <title>Tharidu Deshan Ekanayaka | Software Engineer, London</title>
        <meta name="description" content="Software engineer in London. First Class CS graduate (Westminster) building full-stack and AI/ML systems. Open to graduate SWE and junior AI/ML roles." />
      </Helmet>
      <a href="#main" className="skip-link">Skip to content</a>
      {theme === 'dark' ? <DarkSVG /> : <LightSVG />}
      <ScrollProgress />
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <main id="main" className="homepage-main" tabIndex={-1}>
        <Hero />
        <WorkSection />
        <ProjectsSection />
        <EducationSection />
      </main>
      <Footer />
    </>
  )
}
