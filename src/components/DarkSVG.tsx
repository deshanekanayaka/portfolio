import { useEffect } from 'react'

export default function DarkSVG() {
  useEffect(() => {
    // A — CONSTELLATION STAR HOVER
    const starData = [
      { id: 'star-1-dark', cx: 80,  cy: 160, origR: 4   },
      { id: 'star-2-dark', cx: 180, cy: 100, origR: 3.5 },
      { id: 'star-3-dark', cx: 280, cy: 140, origR: 3   },
      { id: 'star-4-dark', cx: 340, cy: 80,  origR: 4.5 },
      { id: 'star-5-dark', cx: 420, cy: 120, origR: 2.5 },
      { id: 'star-6-dark', cx: 240, cy: 60,  origR: 2   },
      { id: 'star-7-dark', cx: 310, cy: 200, origR: 2.5 },
    ]

    const handleStarMove = (e: MouseEvent) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scale = Math.max(vw / 1200, vh / 800)
      const offsetX = (vw - 1200 * scale) / 2
      const offsetY = (vh - 800 * scale) / 2

      starData.forEach(({ id, cx, cy, origR }) => {
        const starVX = cx * scale + offsetX
        const starVY = cy * scale + offsetY
        const dist = Math.sqrt((e.clientX - starVX) ** 2 + (e.clientY - starVY) ** 2)
        const el = document.getElementById(id)
        if (!el) return
        if (dist < 80) {
          el.setAttribute('r', String(origR + 3))
          el.setAttribute('opacity', '1')
        } else {
          el.setAttribute('r', String(origR))
          el.removeAttribute('opacity')
        }
      })
    }

    document.addEventListener('mousemove', handleStarMove)

    // B — GUITAR STRING PLUCK
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
      document.removeEventListener('mousemove', handleStarMove)
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

        <g opacity="0.11">
          {/* CRESCENT MOON — top right */}
          <g id="moon-group-dark">
            <circle cx="1080" cy="120" r="160" fill="none" stroke="#A8B8CC" strokeWidth="1.5"/>
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
            <path id="string-1-dark" d="M 1200 800 Q 700 200 0 620" fill="none" stroke="#3B82F6" strokeWidth="0.9"  style={{ pointerEvents: 'stroke' }}/>
            <path id="string-2-dark" d="M 1200 800 Q 720 240 0 660" fill="none" stroke="#3B82F6" strokeWidth="0.85" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-3-dark" d="M 1200 800 Q 740 280 0 700" fill="none" stroke="#3B82F6" strokeWidth="0.8"  style={{ pointerEvents: 'stroke' }}/>
            <path id="string-4-dark" d="M 1200 800 Q 760 320 0 740" fill="none" stroke="#3B82F6" strokeWidth="0.75" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-5-dark" d="M 1200 800 Q 780 360 0 770" fill="none" stroke="#3B82F6" strokeWidth="0.7"  style={{ pointerEvents: 'stroke' }}/>
            <path id="string-6-dark" d="M 1200 800 Q 800 400 0 800" fill="none" stroke="#3B82F6" strokeWidth="0.65" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-7-dark" d="M 1200 700 Q 600 100 100 500" fill="none" stroke="#3B82F6" strokeWidth="1.1" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-8-dark" d="M 1200 650 Q 580 80 80 460"  fill="none" stroke="#3B82F6" strokeWidth="0.9" style={{ pointerEvents: 'stroke' }}/>
          </g>
          {/* Fret dots */}
          <circle cx="900" cy="310" r="2.5" fill="#60A5FA"/>
          <circle cx="750" cy="370" r="2"   fill="#60A5FA"/>
          <circle cx="600" cy="430" r="2.5" fill="#60A5FA"/>
          <circle cx="450" cy="490" r="2"   fill="#60A5FA"/>
          <circle cx="300" cy="540" r="2.5" fill="#60A5FA"/>
          <circle cx="950" cy="280" r="1.8" fill="#60A5FA"/>
          <circle cx="800" cy="340" r="2"   fill="#60A5FA"/>
          <circle cx="650" cy="400" r="1.8" fill="#60A5FA"/>
          <circle cx="500" cy="460" r="2"   fill="#60A5FA"/>
          <circle cx="350" cy="510" r="1.8" fill="#60A5FA"/>
          <circle cx="870" cy="250" r="1.5" fill="#60A5FA"/>
          <circle cx="720" cy="310" r="1.8" fill="#60A5FA"/>

          {/* CONSTELLATION */}
          <line x1="80" y1="160" x2="180" y2="100" stroke="#A8B8CC" strokeWidth="0.7"/>
          <line x1="180" y1="100" x2="280" y2="140" stroke="#A8B8CC" strokeWidth="0.7"/>
          <line x1="280" y1="140" x2="340" y2="80"  stroke="#A8B8CC" strokeWidth="0.6"/>
          <line x1="340" y1="80"  x2="420" y2="120" stroke="#A8B8CC" strokeWidth="0.6"/>
          <line x1="180" y1="100" x2="240" y2="60"  stroke="#A8B8CC" strokeWidth="0.5"/>
          <line x1="280" y1="140" x2="310" y2="200" stroke="#A8B8CC" strokeWidth="0.5"/>
          {/* Star nodes */}
          <circle id="star-1-dark" cx="80"  cy="160" r="4"   fill="#A8B8CC"/>
          <circle id="star-2-dark" cx="180" cy="100" r="3.5" fill="#CBD5E1"/>
          <circle id="star-3-dark" cx="280" cy="140" r="3"   fill="#A8B8CC"/>
          <circle id="star-4-dark" cx="340" cy="80"  r="4.5" fill="#CBD5E1"/>
          <circle id="star-5-dark" cx="420" cy="120" r="2.5" fill="#A8B8CC"/>
          <circle id="star-6-dark" cx="240" cy="60"  r="2"   fill="#CBD5E1"/>
          <circle id="star-7-dark" cx="310" cy="200" r="2.5" fill="#A8B8CC"/>
          {/* Isolated stars */}
          <circle cx="520" cy="50"  r="1.5" fill="#A8B8CC"/>
          <circle cx="460" cy="180" r="1"   fill="#A8B8CC"/>
          <circle cx="150" cy="260" r="1.2" fill="#A8B8CC"/>
          <circle cx="620" cy="90"  r="1.8" fill="#A8B8CC"/>
          <circle cx="700" cy="50"  r="1"   fill="#A8B8CC"/>
          <circle cx="50"  cy="80"  r="1.2" fill="#A8B8CC"/>

          {/* LIGHT BEAM — glowing for dark theme */}
          <line x1="220" y1="180" x2="780" y2="580" stroke="url(#beam-grad)" strokeWidth="2.5" filter="url(#dark-glow)"/>
          <line x1="220" y1="180" x2="780" y2="580" stroke="#ffffff" strokeWidth="0.5" opacity="0.6"/>
          {/* Glowing particles */}
          <circle cx="280" cy="220" r="3"   fill="#ffffff" opacity="0.8"  filter="url(#dark-glow)"/>
          <circle cx="360" cy="276" r="2.5" fill="#93C5FD" opacity="0.7"  filter="url(#dark-glow)"/>
          <circle cx="450" cy="340" r="3.5" fill="#ffffff" opacity="0.75" filter="url(#dark-glow)"/>
          <circle cx="540" cy="400" r="2"   fill="#93C5FD" opacity="0.6"/>
          <circle cx="630" cy="460" r="2.5" fill="#ffffff" opacity="0.55"/>
          <circle cx="710" cy="516" r="2"   fill="#93C5FD" opacity="0.4"/>
          {/* Scattered particles */}
          <circle cx="300" cy="200" r="1.5" fill="#ffffff" opacity="0.5"/>
          <circle cx="380" cy="295" r="1.8" fill="#93C5FD" opacity="0.45"/>
          <circle cx="470" cy="320" r="1.5" fill="#ffffff" opacity="0.4"/>
          <circle cx="560" cy="380" r="1.8" fill="#93C5FD" opacity="0.35"/>
          <circle cx="650" cy="440" r="1.5" fill="#ffffff" opacity="0.3"/>
          <circle cx="330" cy="240" r="1"   fill="#ffffff" opacity="0.35"/>
          <circle cx="410" cy="305" r="1.2" fill="#93C5FD" opacity="0.3"/>
          <circle cx="500" cy="365" r="1"   fill="#ffffff" opacity="0.28"/>
        </g>
      </svg>
    </>
  )
}
