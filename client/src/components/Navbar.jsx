import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCursor } from './animations'

const links = [
  { label: 'About',       href: '/#about' },
  { label: 'Events',      href: '/events' },
  { label: 'Team',        href: '/team' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'Testimonials',href: '/#testimonials' },
  { label: 'FAQ',         href: '/#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hov, setHov] = useState(null)
  const location = useLocation()
  useCursor()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-[#00D4FF]/10 shadow-[0_4px_30px_rgba(0,212,255,0.04)]' : 'bg-transparent'}`}>

        {/* top neon line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-40" />

        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link to="/" className="group flex items-center gap-2.5 shrink-0">
            <div className="relative w-9 h-9 border border-[#00D4FF]/40 group-hover:border-[#00D4FF] transition-colors duration-300 flex items-center justify-center overflow-hidden">
              <span className="font-['Orbitron'] font-black text-[10px] text-[#00D4FF] tracking-tight leading-none z-10">MU<br/>ACM</span>
              <div className="absolute inset-0 bg-[#00D4FF]/8 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-['Orbitron'] font-black text-base tracking-widest text-white">MU<span className="text-[#00D4FF]">-ACM</span></span>
              <span className="font-['JetBrains_Mono'] text-[9px] text-[#00D4FF]/40 tracking-[0.3em]">STUDENT CHAPTER</span>
            </div>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                className="relative px-3.5 py-2 font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase transition-colors duration-200
                  text-[#888] hover:text-[#00D4FF]"
              >
                {hov === i && (
                  <span className="absolute inset-0 border border-[#00D4FF]/25 bg-[#00D4FF]/5 pointer-events-none" />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            ))}
          </div>

          {/* ── Right side ── */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse shadow-[0_0_6px_#00FF94]" />
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#555] tracking-widest">SYS:ONLINE</span>
            </div>
            <a
              href="https://discord.com/invite/qaRz3z9rFF"
              target="_blank" rel="noopener noreferrer"
              className="group relative overflow-hidden border border-[#00D4FF]/50 hover:border-[#00D4FF]
                font-['Orbitron'] font-bold text-[10px] text-[#00D4FF] px-5 py-2.5 tracking-widest
                transition-all duration-300 hover:shadow-[0_0_16px_rgba(0,212,255,0.3)]"
            >
              <span className="absolute inset-0 bg-[#00D4FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 group-hover:text-[#050508] transition-colors duration-300">JOIN DISCORD</span>
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setOpen(p => !p)}
            className="lg:hidden flex flex-col gap-1.5 p-2 text-[#00D4FF]"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-[#00D4FF] transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-4 h-px bg-[#00D4FF] transition-all duration-300 ${open ? 'opacity-0 -translate-x-2' : ''}`} />
            <span className={`block w-6 h-px bg-[#00D4FF] transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>

        {/* bottom dim line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </nav>

      {/* ── Mobile menu ── */}
      <div className={`fixed inset-x-0 top-[65px] z-40 bg-[#080810]/95 backdrop-blur-xl border-b border-[#00D4FF]/10
        transition-all duration-300 overflow-hidden lg:hidden
        ${open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 py-4 flex flex-col gap-0">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-3.5 border-b border-white/5 font-['JetBrains_Mono'] text-xs text-[#666] hover:text-[#00D4FF] tracking-widest transition-colors uppercase"
            >
              <span className="text-[#00D4FF]/50">{String(i + 1).padStart(2, '0')}</span>
              {l.label}
            </a>
          ))}
          <a
            href="https://discord.com/invite/qaRz3z9rFF"
            target="_blank" rel="noopener noreferrer"
            className="mt-4 border border-[#00D4FF]/50 text-[#00D4FF] font-['Orbitron'] font-bold text-[10px]
              px-5 py-3 text-center tracking-widest hover:bg-[#00D4FF] hover:text-[#050508] transition-all duration-300"
          >
            JOIN DISCORD
          </a>
        </div>
      </div>
    </>
  )
}