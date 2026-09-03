import { useEffect } from 'react'

export default function DarkSVG() {
  useEffect(() => {
    // Skip every motion effect for users who ask for reduced motion, and on
    // touch devices where hover-driven effects never fire but still cost work.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reducedMotion || coarsePointer) return

    // A — GUITAR STRING PLUCK
    const stringIds = Array.from({ length: 8 }, (_, i) => `string-${i + 1}-dark`)
    const stringCleanups: Array<() => void> = []

    stringIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const listener = () => {
        el.classList.remove('string-pluck')
        el.getBoundingClientRect()
        el.classList.add('string-pluck')
        setTimeout(() => el.classList.remove('string-pluck'), 600)
      }
      el.addEventListener('mouseenter', listener)
      stringCleanups.push(() => el.removeEventListener('mouseenter', listener))
    })

    // C — MOON GLOW ON PROXIMITY
    let moonRaf: number | null = null
    let currentScale = 1

    const handleMoonMove = (e: MouseEvent) => {
      const moonCenterX = window.innerWidth * 0.9
      const moonCenterY = window.innerHeight * 0.15
      const dist = Math.sqrt((e.clientX - moonCenterX) ** 2 + (e.clientY - moonCenterY) ** 2)
      const targetScale = dist < 300 ? 1 + 0.08 * (1 - dist / 300) : 1

      if (moonRaf) cancelAnimationFrame(moonRaf)

      const moonGroup = document.getElementById('moon-group-dark')
      if (!moonGroup) return

      const animate = () => {
        currentScale += (targetScale - currentScale) * 0.1
        moonGroup.style.transform = `scale(${currentScale})`
        moonGroup.style.transformOrigin = '1000px 120px'
        if (Math.abs(targetScale - currentScale) > 0.001) {
          moonRaf = requestAnimationFrame(animate)
        }
      }
      moonRaf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMoonMove)

    // D — PATRONUS PARTICLE TRAIL
    let lastX = 0, lastY = 0, lastParticleTime = 0

    const handleParticle = (e: MouseEvent) => {
      const now = Date.now()
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const speed = Math.sqrt(dx * dx + dy * dy)
      lastX = e.clientX
      lastY = e.clientY

      if (speed > 8 && now - lastParticleTime > 30) {
        lastParticleTime = now
        const p = document.createElement('div')
        p.style.cssText = [
          'position:fixed',
          `left:${e.clientX - 2}px`,
          `top:${e.clientY - 2}px`,
          'width:4px',
          'height:4px',
          'border-radius:50%',
          'background:#93C5FD',
          'pointer-events:none',
          'z-index:50',
          'opacity:0.7',
          'transition:opacity 0.6s ease,transform 0.6s ease',
        ].join(';')
        document.body.appendChild(p)
        setTimeout(() => {
          p.style.opacity = '0'
          p.style.transform = 'scale(0)'
        }, 50)
        setTimeout(() => p.parentNode?.removeChild(p), 650)
      }
    }

    document.addEventListener('mousemove', handleParticle)

    return () => {
      window.removeEventListener('mousemove', handleMoonMove)
      document.removeEventListener('mousemove', handleParticle)
      stringCleanups.forEach(fn => fn())
      if (moonRaf) cancelAnimationFrame(moonRaf)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes pluck-anim {
          0%   { transform: translateY(0px); }
          25%  { transform: translateY(-5px); }
          50%  { transform: translateY(3px); }
          75%  { transform: translateY(-2px); }
          100% { transform: translateY(0px); }
        }
        .string-pluck { animation: pluck-anim 0.6s ease forwards; }
      `}</style>
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="dark-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.8"/>
            <stop offset="40%"  stopColor="#93C5FD" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
          </linearGradient>
        </defs>

        <g opacity="0.14">
          {/* CRESCENT MOON — top right */}
          <g id="moon-group-dark">
            <circle cx="1080" cy="120" r="160" fill="none" stroke="#A8B8CC" strokeWidth="2"/>
            <circle cx="1118" cy="100" r="140" fill="#07090F" stroke="none"/>
            {/* Craters */}
            <circle cx="1010" cy="80"  r="18" fill="none" stroke="#A8B8CC" strokeWidth="1"/>
            <circle cx="980"  cy="140" r="10" fill="none" stroke="#A8B8CC" strokeWidth="0.8"/>
            <circle cx="1025" cy="170" r="14" fill="none" stroke="#A8B8CC" strokeWidth="0.8"/>
            <circle cx="960"  cy="100" r="6"  fill="none" stroke="#A8B8CC" strokeWidth="0.6"/>
            {/* Radial rings */}
            <circle cx="1000" cy="120" r="200" fill="none" stroke="#A8B8CC" strokeWidth="0.6" strokeDasharray="4,8"/>
            <circle cx="1000" cy="120" r="260" fill="none" stroke="#A8B8CC" strokeWidth="0.4" strokeDasharray="3,10"/>
            <circle cx="1000" cy="120" r="320" fill="none" stroke="#A8B8CC" strokeWidth="0.3" strokeDasharray="2,12"/>
          </g>

          {/* GUITAR STRINGS */}
          <g style={{ pointerEvents: 'all' }}>
            <path id="string-1-dark" d="M 1200 800 Q 700 200 0 620" fill="none" stroke="#3B82F6" strokeWidth="1.2"  style={{ pointerEvents: 'stroke' }}/>
            <path id="string-2-dark" d="M 1200 800 Q 720 240 0 660" fill="none" stroke="#3B82F6" strokeWidth="1.15" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-3-dark" d="M 1200 800 Q 740 280 0 700" fill="none" stroke="#3B82F6" strokeWidth="1.1"  style={{ pointerEvents: 'stroke' }}/>
            <path id="string-4-dark" d="M 1200 800 Q 760 320 0 740" fill="none" stroke="#3B82F6" strokeWidth="1.05" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-5-dark" d="M 1200 800 Q 780 360 0 770" fill="none" stroke="#3B82F6" strokeWidth="1.0"  style={{ pointerEvents: 'stroke' }}/>
            <path id="string-6-dark" d="M 1200 800 Q 800 400 0 800" fill="none" stroke="#3B82F6" strokeWidth="0.95" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-7-dark" d="M 1200 700 Q 600 100 100 500" fill="none" stroke="#3B82F6" strokeWidth="1.4" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-8-dark" d="M 1200 650 Q 580 80 80 460"  fill="none" stroke="#3B82F6" strokeWidth="1.2" style={{ pointerEvents: 'stroke' }}/>
          </g>
          {/* Fret dots */}
          <circle cx="900" cy="310" r="3"   fill="#60A5FA"/>
          <circle cx="750" cy="370" r="2.5" fill="#60A5FA"/>
          <circle cx="600" cy="430" r="3"   fill="#60A5FA"/>
          <circle cx="450" cy="490" r="2.5" fill="#60A5FA"/>
          <circle cx="300" cy="540" r="3"   fill="#60A5FA"/>
          <circle cx="950" cy="280" r="2.3" fill="#60A5FA"/>
          <circle cx="800" cy="340" r="2.5" fill="#60A5FA"/>
          <circle cx="650" cy="400" r="2.3" fill="#60A5FA"/>
          <circle cx="500" cy="460" r="2.5" fill="#60A5FA"/>
          <circle cx="350" cy="510" r="2.3" fill="#60A5FA"/>
          <circle cx="870" cy="250" r="2"   fill="#60A5FA"/>
          <circle cx="720" cy="310" r="2.3" fill="#60A5FA"/>

          {/* LIGHT BEAM — glowing for dark theme */}
          <line x1="220" y1="180" x2="780" y2="580" stroke="url(#beam-grad)" strokeWidth="2.5" opacity="0.4" filter="url(#dark-glow)"/>
          <line x1="220" y1="180" x2="780" y2="580" stroke="#ffffff" strokeWidth="0.5" opacity="0.2"/>
          {/* Glowing particles */}
          <circle cx="280" cy="220" r="3"   fill="#ffffff" opacity="0.3"  filter="url(#dark-glow)"/>
          <circle cx="360" cy="276" r="2.5" fill="#93C5FD" opacity="0.25" filter="url(#dark-glow)"/>
          <circle cx="450" cy="340" r="3.5" fill="#ffffff" opacity="0.28" filter="url(#dark-glow)"/>
          <circle cx="540" cy="400" r="2"   fill="#93C5FD" opacity="0.2"/>
          <circle cx="630" cy="460" r="2.5" fill="#ffffff" opacity="0.18"/>
          <circle cx="710" cy="516" r="2"   fill="#93C5FD" opacity="0.14"/>
        </g>
      </svg>
    </>
  )
}
