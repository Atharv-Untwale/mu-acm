import { useEffect, useRef, useState } from 'react'

// ─── BOOT SEQUENCE ────────────────────────────────────────────
// Shows a terminal-style init screen, then fades out
export const useBootSequence = () => {
  const [done, setDone] = useState(false)
  const [lines, setLines] = useState([])

  const sequence = [
    { text: 'INITIALIZING MU-ACM SYSTEM...', delay: 0 },
    { text: 'CONNECTING TO FIREBASE DATABASE...', delay: 400 },
    { text: 'LOADING STUDENT CHAPTER DATA...', delay: 800 },
    { text: 'VERIFYING CREDENTIALS...', delay: 1200 },
    { text: 'ALL SYSTEMS NOMINAL.', delay: 1700, accent: true },
    { text: 'WELCOME TO MU-ACM.', delay: 2100, accent: true },
  ]

  useEffect(() => {
    // Skip boot if already seen this session
    if (sessionStorage.getItem('mu-acm-booted')) {
      setDone(true)
      return
    }

    sequence.forEach(({ text, delay, accent }) => {
      setTimeout(() => {
        setLines(prev => [...prev, { text, accent }])
      }, delay)
    })

    setTimeout(() => {
      sessionStorage.setItem('mu-acm-booted', '1')
      setDone(true)
    }, 2900)
  }, [])

  return { done, lines }
}

// ─── STARFIELD CANVAS ─────────────────────────────────────────
export const Starfield = () => {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    // Stars at different depths (layers for parallax feel)
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.4 + 0.2,
      opacity: Math.random() * 0.5 + 0.05,
      speed: Math.random() * 0.12 + 0.02,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    let frame = 0
    let id

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      stars.forEach(s => {
        // Subtle twinkle
        const twinkle = Math.sin(frame * 0.02 + s.twinkleOffset) * 0.15 + 0.85
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 230, 255, ${s.opacity * twinkle})`
        ctx.fill()
      })

      id = requestAnimationFrame(draw)
    }
    draw()

    // Parallax on scroll
    const onScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      stars.forEach(s => {
        s.y -= s.speed * 0.8
        if (s.y < 0) {
          s.y = canvas.height
          s.x = Math.random() * canvas.width
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  )
}

// ─── SCROLL REVEAL ─────────────────────────────────────────────
export const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(48px)'
    el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        obs.unobserve(el)
      }
    }, { threshold: 0.08 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return <div ref={ref} className={className}>{children}</div>
}

// ─── TYPEWRITER ────────────────────────────────────────────────
export const Typewriter = ({ words, className = '' }) => {
  const ref = useRef(null)
  useEffect(() => {
    let wi = 0, ci = 0, deleting = false
    const tick = () => {
      const word = words[wi]
      if (!ref.current) return
      ref.current.textContent = deleting ? word.substring(0, ci - 1) : word.substring(0, ci + 1)
      deleting ? ci-- : ci++
      let delay = deleting ? 40 : 90
      if (!deleting && ci === word.length) { delay = 2200; deleting = true }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350 }
      setTimeout(tick, delay)
    }
    tick()
  }, [words])
  return (
    <span className={className}>
      <span ref={ref} />
      <span className="text-[#00D4FF] animate-pulse ml-0.5">█</span>
    </span>
  )
}

// ─── COUNTER ──────────────────────────────────────────────────
export const Counter = ({ to, suffix = '' }) => {
  const ref = useRef(null)
  const done = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        let n = 0
        const step = to / 60
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

// ─── CURSOR ───────────────────────────────────────────────────
export const useCursor = () => {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return
    let mx = 0, my = 0, rx = 0, ry = 0
    const move = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`
    }
    const tick = () => {
      rx += (mx - rx - 12) * 0.12
      ry += (my - ry - 12) * 0.12
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', move)
    tick()
    return () => window.removeEventListener('mousemove', move)
  }, [])
}