import { useEffect, useRef } from 'react'

// ─── CUSTOM CURSOR ───────────────────────────────────────────
export const useCursor = () => {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`
    }

    const tick = () => {
      rx += (mx - rx - 12) * 0.12
      ry += (my - ry - 12) * 0.12
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    tick()

    const grow = () => { ring.style.width = '48px'; ring.style.height = '48px'; ring.style.borderColor = 'rgba(0,212,255,0.8)' }
    const shrink = () => { ring.style.width = '24px'; ring.style.height = '24px'; ring.style.borderColor = 'rgba(0,212,255,0.4)' }
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => window.removeEventListener('mousemove', onMove)
  }, [])
}

// ─── FLOATING PARTICLES CANVAS ───────────────────────────────
export const Particles = ({ count = 55 }) => {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.35 + 0.08,
    }))

    let id
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${p.a})`
        ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${0.07 * (1 - d / 90)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      id = requestAnimationFrame(draw)
    }
    draw()

    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [count])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─── SCROLL REVEAL ────────────────────────────────────────────
export const Reveal = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const yOffset = direction === 'up' ? 36 : direction === 'down' ? -36 : 0
    const xOffset = direction === 'left' ? 36 : direction === 'right' ? -36 : 0
    el.style.opacity = '0'
    el.style.transform = `translate(${xOffset}px, ${yOffset}px)`
    el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translate(0,0)'
        obs.unobserve(el)
      }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, direction])
  return <div ref={ref} className={className}>{children}</div>
}

// ─── TYPEWRITER ───────────────────────────────────────────────
export const Typewriter = ({ words, className = '' }) => {
  const ref = useRef(null)
  useEffect(() => {
    let wi = 0, ci = 0, deleting = false
    const tick = () => {
      const word = words[wi]
      if (!ref.current) return
      ref.current.textContent = deleting
        ? word.substring(0, ci - 1)
        : word.substring(0, ci + 1)
      deleting ? ci-- : ci++
      let delay = deleting ? 45 : 95
      if (!deleting && ci === word.length) { delay = 1800; deleting = true }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 400 }
      setTimeout(tick, delay)
    }
    tick()
  }, [words])
  return (
    <span className={className}>
      <span ref={ref} />
      <span className="text-accent animate-pulse">█</span>
    </span>
  )
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────
export const Counter = ({ to, suffix = '' }) => {
  const ref = useRef(null)
  const done = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        let n = 0
        const step = to / 70
        const t = setInterval(() => {
          n = Math.min(n + step, to)
          if (ref.current) ref.current.textContent = Math.floor(n).toLocaleString() + suffix
          if (n >= to) clearInterval(t)
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to, suffix])
  return <span ref={ref}>0{suffix}</span>
}