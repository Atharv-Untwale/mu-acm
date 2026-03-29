import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCursor } from './animations'

const links = [
  { label: 'About',        href: '/#about' },
  { label: 'Events',       href: '/events' },
  { label: 'Team',         href: '/team' },
  // { label: 'Achievements', href: '/achievements' },
  { label: 'Gallery',      href: '/gallery' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ',          href: '/#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useCursor()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
        ${scrolled
          ? 'bg-[#020205]/80 backdrop-blur-2xl border-b border-white/[0.04]'
          : 'bg-transparent'
        }`}>

        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            {/* ACM logo — place your logo at client/public/acm-logo.png */}
            <div className="h-9 w-auto flex items-center">
              <img
                src="/acm-logo.png"
                alt="MU-ACM"
                className="h-full w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                onError={e => {
                  // Fallback if image not found yet
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback placeholder shown until logo is added */}
              <div className="hidden w-9 h-9 border border-[#00D4FF]/30 group-hover:border-[#00D4FF]/70
                items-center justify-center transition-all duration-300">
                <span className="font-['Orbitron'] font-black text-xs text-[#00D4FF] leading-none">MU<br/>ACM</span>
              </div>
            </div>
            <div>
              <div className="font-['Orbitron'] font-black text-[15px] tracking-widest text-white leading-none">
                MU<span className="text-[#00D4FF]">-ACM</span>
              </div>
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#00D4FF]/50 tracking-[0.3em] leading-none mt-0.5">
                STUDENT CHAPTER
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <a key={l.label} href={l.href}
                className="relative px-4 py-2 font-['JetBrains_Mono'] text-xs tracking-widest
                  uppercase text-[#aaaabc] hover:text-[#00D4FF] transition-colors duration-200 group">
                <span className="absolute inset-0 border border-transparent group-hover:border-[#00D4FF]/15
                  group-hover:bg-[#00D4FF]/4 transition-all duration-200" />
                <span className="relative z-10">{l.label}</span>
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse shadow-[0_0_5px_#00FF94]" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#9090a8] tracking-widest">ONLINE</span>
            </div>
            <a href="https://chat.whatsapp.com/GgpDcfZc8KwJambREQf823" target="_blank" rel="noopener noreferrer"
              className="group relative overflow-hidden border border-[#00D4FF]/30 hover:border-[#00D4FF]/70
                font-['Orbitron'] font-bold text-xs text-[#00D4FF] px-5 py-2.5 tracking-widest
                transition-all duration-300 hover:shadow-[0_0_16px_rgba(0,212,255,0.2)]">
              <span className="absolute inset-0 bg-[#00D4FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 group-hover:text-[#020205] transition-colors duration-300">JOIN OUR COMMUNITY</span>
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setOpen(p => !p)} className="lg:hidden p-2 flex flex-col gap-1.5">
            <span className={`block w-5 h-px bg-[#00D4FF]/60 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-[#00D4FF]/60 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[#00D4FF]/60 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Bottom line — subtle */}
        {scrolled && <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00D4FF]/10 to-transparent" />}
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-x-0 top-16 z-40 bg-[#020205]/95 backdrop-blur-2xl
        border-b border-white/[0.04] transition-all duration-300 overflow-hidden lg:hidden
        ${open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-5 flex flex-col gap-0">
          {links.map((l, i) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-3 border-b border-white/[0.03]
                font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#9090a8]
                hover:text-[#00D4FF] transition-colors">
              <span className="text-[#00D4FF]/45 w-5 text-xs">{String(i+1).padStart(2,'0')}</span>
              {l.label}
            </a>
          ))}
          <a href="https://discord.com/invite/qaRz3z9rFF" target="_blank" rel="noopener noreferrer"
            className="mt-4 border border-[#00D4FF]/30 text-[#00D4FF] font-['Orbitron'] font-bold text-xs
              px-5 py-3 text-center tracking-widest hover:bg-[#00D4FF]/10 transition-all duration-300">
            JOIN DISCORD
          </a>
        </div>
      </div>
    </>
  )
}