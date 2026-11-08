import { useEffect, useRef } from 'react'

const stars = [
  [24, 102], [54, 67], [89, 80], [110, 34], [151, 53], [166, 112], [119, 137],
]

export default function BackgroundArtwork({ theme }: { theme: 'light' | 'dark' }) {
  const artworkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const artwork = artworkRef.current
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = window.matchMedia('(pointer: fine)')
    if (!artwork) return

    const moon = artwork.querySelector<SVGGElement>('.moon-art')!
    const nodes = Array.from(artwork.querySelectorAll<SVGCircleElement>('.constellation-star'))
    const strings = Array.from(artwork.querySelectorAll<SVGPathElement>('.guitar-string'))
    const samples = strings.map(path => {
      const length = path.getTotalLength()
      return Array.from({ length: 49 }, (_, i) => path.getPointAtLength(length * i / 48))
    })
    let frame: number | null = null
    let cursor = { x: 0, y: 0 }
    const timers = new Map<SVGPathElement, ReturnType<typeof setTimeout>>()

    const update = () => {
      frame = null
      const rect = moon.getBoundingClientRect()
      moon.classList.toggle('is-near', Math.hypot(cursor.x - rect.x - rect.width / 2, cursor.y - rect.y - rect.height / 2) < 150)
      nodes.forEach(node => {
        const box = node.getBoundingClientRect()
        node.classList.toggle('is-near', Math.hypot(cursor.x - box.x - box.width / 2, cursor.y - box.y - box.height / 2) < 30)
      })
      const matrix = strings[0]?.getScreenCTM()
      if (!matrix) return
      strings.forEach((path, i) => {
        const near = samples[i].some(point => {
          const screen = point.matrixTransform(matrix)
          return Math.hypot(cursor.x - screen.x, cursor.y - screen.y) < 9
        })
        if (near && !path.classList.contains('is-near')) {
          path.classList.add('string-pluck')
          clearTimeout(timers.get(path))
          timers.set(path, setTimeout(() => {
            path.classList.remove('string-pluck')
            timers.delete(path)
          }, 600))
        }
        path.classList.toggle('is-near', near)
      })
    }
    const move = (event: MouseEvent) => {
      if (motion.matches || !pointer.matches) return
      cursor = { x: event.clientX, y: event.clientY }
      if (frame === null) frame = requestAnimationFrame(update)
    }
    const reset = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      artwork.querySelectorAll('.is-near').forEach(el => el.classList.remove('is-near'))
      strings.forEach(path => path.classList.remove('string-pluck'))
      timers.forEach(timer => clearTimeout(timer))
      timers.clear()
    }
    document.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', reset)
    motion.addEventListener('change', reset)
    pointer.addEventListener('change', reset)
    return () => {
      document.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', reset)
      motion.removeEventListener('change', reset)
      pointer.removeEventListener('change', reset)
      reset()
    }
  }, [])

  return (
    <div ref={artworkRef} className={`site-background artwork-${theme}`} aria-hidden="true">
      <svg className="background-moon" viewBox="0 0 260 260">
        <g className="moon-art">
          <g className="moon-rings" fill="none" stroke="currentColor">
            <circle cx="130" cy="130" r="100" strokeWidth="0.7" strokeDasharray="2 9" />
            <circle cx="130" cy="130" r="122" strokeWidth="0.5" strokeDasharray="2 12" />
          </g>
          <path d="M 151 52 A 78 78 0 1 0 201 177 A 70 70 0 0 1 151 52 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <g fill="none" stroke="currentColor" strokeWidth="0.7">
            <circle cx="80" cy="112" r="7" /><circle cx="89" cy="153" r="4" />
          </g>
        </g>
      </svg>

      <svg className="background-constellation" viewBox="0 0 190 165">
        <path d="M24 102 L54 67 L89 80 L110 34 L151 53 L166 112 L119 137 L89 80" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 5" />
        {stars.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} className="constellation-star" cx={cx} cy={cy} r="2" fill="currentColor" />
        ))}
        <path d="M110 27 V41 M103 34 H117" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>

      <svg className="background-strings" viewBox="0 0 1200 260" preserveAspectRatio="none">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} className="guitar-string"
            d={`M -80 ${64 + i * 14} Q 400 ${200 + i * 11} 1280 ${90 + i * 14}`}
            fill="none" stroke="currentColor" strokeWidth={i < 6 ? 0.7 : 0.9} />
        ))}
      </svg>

      <svg className="background-beam" viewBox="0 0 240 320">
        <defs>
          <linearGradient id={`beam-${theme}`} x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="currentColor" stopOpacity="0" />
            <stop offset="0.65" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-20 320 L210 20" fill="none" stroke={`url(#beam-${theme})`} strokeWidth="1.2" />
        <circle cx="49" cy="230" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="118" cy="140" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="164" cy="80" r="1" fill="currentColor" opacity="0.2" />
      </svg>
    </div>
  )
}
