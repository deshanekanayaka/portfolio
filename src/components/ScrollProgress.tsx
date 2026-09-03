import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Coalesce scroll events into one state update per frame; a raw scroll
    // handler calling setState fires far more often than the display refreshes.
    let raf: number | null = null
    const onScroll = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(() => {
        raf = null
        const el = document.documentElement
        const total = el.scrollHeight - el.clientHeight
        setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true" style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 2, zIndex: 150,
      background: 'transparent',
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'var(--accent)',
        transition: 'width 0.1s ease',
      }} />
    </div>
  )
}
