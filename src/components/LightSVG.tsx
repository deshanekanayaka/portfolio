import { useEffect } from 'react'

export default function LightSVG() {
  useEffect(() => {
    // A — CONSTELLATION STAR HOVER
    const starData = [
      { id: 'star-1-light', cx: 80,  cy: 160, origR: 4   },
      { id: 'star-2-light', cx: 180, cy: 100, origR: 3.5 },
      { id: 'star-3-light', cx: 280, cy: 140, origR: 3   },
      { id: 'star-4-light', cx: 340, cy: 80,  origR: 4.5 },
      { id: 'star-5-light', cx: 420, cy: 120, origR: 2.5 },
      { id: 'star-6-light', cx: 240, cy: 60,  origR: 2   },
      { id: 'star-7-light', cx: 310, cy: 200, origR: 2.5 },
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
    const stringIds = Array.from({ length: 8 }, (_, i) => `string-${i + 1}-light`)
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

      const moonGroup = document.getElementById('moon-group-light')
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
          'background:#3B82F6',
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
          <filter id="light-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <g opacity="0.18">
          {/* CRESCENT MOON — top right, large */}
          <g id="moon-group-light">
            <circle cx="1080" cy="120" r="160" fill="none" stroke="#94A3B8" strokeWidth="1.5"/>
            <circle cx="1118" cy="100" r="140" fill="#FFFFFF" stroke="none"/>
            {/* Crater circles inside crescent */}
            <circle cx="1010" cy="80" r="18" fill="none" stroke="#94A3B8" strokeWidth="1"/>
            <circle cx="980" cy="140" r="10" fill="none" stroke="#94A3B8" strokeWidth="0.8"/>
            <circle cx="1025" cy="170" r="14" fill="none" stroke="#94A3B8" strokeWidth="0.8"/>
            <circle cx="960" cy="100" r="6" fill="none" stroke="#94A3B8" strokeWidth="0.6"/>
            {/* Radial rings from moon */}
            <circle cx="1000" cy="120" r="200" fill="none" stroke="#94A3B8" strokeWidth="0.6" strokeDasharray="4,8"/>
            <circle cx="1000" cy="120" r="260" fill="none" stroke="#94A3B8" strokeWidth="0.4" strokeDasharray="3,10"/>
            <circle cx="1000" cy="120" r="320" fill="none" stroke="#94A3B8" strokeWidth="0.3" strokeDasharray="2,12"/>
          </g>

          {/* GUITAR STRINGS — 8 curves */}
          <g style={{ pointerEvents: 'all' }}>
            <path id="string-1-light" d="M 1200 800 Q 700 200 0 620" fill="none" stroke="#3B82F6" strokeWidth="0.9" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-2-light" d="M 1200 800 Q 720 240 0 660" fill="none" stroke="#3B82F6" strokeWidth="0.85" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-3-light" d="M 1200 800 Q 740 280 0 700" fill="none" stroke="#3B82F6" strokeWidth="0.8" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-4-light" d="M 1200 800 Q 760 320 0 740" fill="none" stroke="#3B82F6" strokeWidth="0.75" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-5-light" d="M 1200 800 Q 780 360 0 770" fill="none" stroke="#3B82F6" strokeWidth="0.7" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-6-light" d="M 1200 800 Q 800 400 0 800" fill="none" stroke="#3B82F6" strokeWidth="0.65" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-7-light" d="M 1200 700 Q 600 100 100 500" fill="none" stroke="#3B82F6" strokeWidth="1.1" style={{ pointerEvents: 'stroke' }}/>
            <path id="string-8-light" d="M 1200 650 Q 580 80 80 460" fill="none" stroke="#3B82F6" strokeWidth="0.9" style={{ pointerEvents: 'stroke' }}/>
          </g>
          {/* Fret dots along strings */}
          <circle cx="900" cy="310" r="2.5" fill="#3B82F6"/>
          <circle cx="750" cy="370" r="2" fill="#3B82F6"/>
          <circle cx="600" cy="430" r="2.5" fill="#3B82F6"/>
          <circle cx="450" cy="490" r="2" fill="#3B82F6"/>
          <circle cx="300" cy="540" r="2.5" fill="#3B82F6"/>
          <circle cx="950" cy="280" r="1.8" fill="#3B82F6"/>
          <circle cx="800" cy="340" r="2" fill="#3B82F6"/>
          <circle cx="650" cy="400" r="1.8" fill="#3B82F6"/>
          <circle cx="500" cy="460" r="2" fill="#3B82F6"/>
          <circle cx="350" cy="510" r="1.8" fill="#3B82F6"/>
          <circle cx="870" cy="250" r="1.5" fill="#3B82F6"/>
          <circle cx="720" cy="310" r="1.8" fill="#3B82F6"/>

          {/* CONSTELLATION — upper left */}
          <line x1="80" y1="160" x2="180" y2="100" stroke="#94A3B8" strokeWidth="0.7"/>
          <line x1="180" y1="100" x2="280" y2="140" stroke="#94A3B8" strokeWidth="0.7"/>
          <line x1="280" y1="140" x2="340" y2="80" stroke="#94A3B8" strokeWidth="0.6"/>
          <line x1="340" y1="80" x2="420" y2="120" stroke="#94A3B8" strokeWidth="0.6"/>
          <line x1="180" y1="100" x2="240" y2="60" stroke="#94A3B8" strokeWidth="0.5"/>
          <line x1="280" y1="140" x2="310" y2="200" stroke="#94A3B8" strokeWidth="0.5"/>
          {/* Star nodes */}
          <circle id="star-1-light" cx="80"  cy="160" r="4"   fill="#94A3B8"/>
          <circle id="star-2-light" cx="180" cy="100" r="3.5" fill="#CBD5E1"/>
          <circle id="star-3-light" cx="280" cy="140" r="3"   fill="#94A3B8"/>
          <circle id="star-4-light" cx="340" cy="80"  r="4.5" fill="#CBD5E1"/>
          <circle id="star-5-light" cx="420" cy="120" r="2.5" fill="#94A3B8"/>
          <circle id="star-6-light" cx="240" cy="60"  r="2"   fill="#CBD5E1"/>
          <circle id="star-7-light" cx="310" cy="200" r="2.5" fill="#94A3B8"/>
          {/* Isolated stars */}
          <circle cx="520" cy="50"  r="1.5" fill="#94A3B8"/>
          <circle cx="460" cy="180" r="1"   fill="#94A3B8"/>
          <circle cx="150" cy="260" r="1.2" fill="#94A3B8"/>
          <circle cx="620" cy="90"  r="1.8" fill="#94A3B8"/>
          <circle cx="700" cy="50"  r="1"   fill="#94A3B8"/>
          <circle cx="50"  cy="80"  r="1.2" fill="#94A3B8"/>

          {/* LIGHT BEAM */}
          <line x1="220" y1="180" x2="780" y2="580" stroke="#3B82F6" strokeWidth="1" opacity="0.9"/>
          {/* Particles along beam */}
          <circle cx="280" cy="220" r="2"   fill="#3B82F6" opacity="0.7"/>
          <circle cx="360" cy="276" r="1.5" fill="#3B82F6" opacity="0.6"/>
          <circle cx="450" cy="340" r="2.5" fill="#3B82F6" opacity="0.65"/>
          <circle cx="540" cy="400" r="1.5" fill="#3B82F6" opacity="0.5"/>
          <circle cx="630" cy="460" r="2"   fill="#3B82F6" opacity="0.45"/>
          <circle cx="710" cy="516" r="1.5" fill="#3B82F6" opacity="0.35"/>
          {/* Scattered particles around beam */}
          <circle cx="300" cy="200" r="1"   fill="#3B82F6" opacity="0.4"/>
          <circle cx="380" cy="295" r="1.2" fill="#3B82F6" opacity="0.35"/>
          <circle cx="470" cy="320" r="1"   fill="#3B82F6" opacity="0.3"/>
          <circle cx="560" cy="380" r="1.2" fill="#3B82F6" opacity="0.3"/>
          <circle cx="650" cy="440" r="1"   fill="#3B82F6" opacity="0.25"/>
        </g>
      </svg>
    </>
  )
}
