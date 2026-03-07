import { useEffect, useState, useRef } from 'react'
import API from '../utils/api'
import { council, heads, mentors } from '../data/teamData'
import { Particles, Reveal, Typewriter, Counter } from '../components/animations'

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
const Hero = () => {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t) }, [])

  const fade = (delay) =>
    `transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
  const fadeDelay = (ms) => ({ transitionDelay: vis ? `${ms}ms` : '0ms' })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.07) 0%, #050508 70%)' }}>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.025) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Particles */}
      <Particles count={60} />

      {/* Scan line */}
      <div className="absolute inset-x-0 h-[2px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(90deg,transparent,rgba(0,212,255,0.5),transparent)',
          animation: 'scanMove 7s linear infinite',
        }} />

      {/* Corner brackets */}
      {[['top-20 left-5','border-l border-t'],['top-20 right-5','border-r border-t'],
        ['bottom-24 left-5','border-l border-b'],['bottom-24 right-5','border-r border-b']].map(([pos, cls]) => (
        <div key={pos} className={`absolute ${pos} w-10 h-10 ${cls} border-[#00D4FF]/25 pointer-events-none`} />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto w-full">

        {/* Status pill */}
        <div className={`${fade(0)} inline-flex items-center gap-2 border border-[#00D4FF]/25 bg-[#00D4FF]/5
          font-['JetBrains_Mono'] text-[#00D4FF] text-[11px] px-4 py-2 mb-8 tracking-widest`}
          style={fadeDelay(0)}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] shadow-[0_0_6px_#00FF94] animate-pulse" />
          SYS:ONLINE // MU-ACM STUDENT CHAPTER // MEDI-CAPS UNIVERSITY
        </div>

        {/* Main heading — glitch on "COMMUNITY" */}
        <h1 className={`${fade(200)} font-['Orbitron'] font-black leading-[0.95] mb-6 select-none`}
          style={{ fontSize: 'clamp(3rem,10vw,7rem)', ...fadeDelay(150) }}>
          <span className="block text-white tracking-tight">WE ARE MORE</span>
          <span className="block tracking-tight" style={{ WebkitTextStroke: '1px rgba(0,212,255,0.6)', color: 'transparent' }}>
            THAN JUST A
          </span>
          <span className="block text-[#00D4FF] glitch-text" data-text="CLUB">CLUB</span>
        </h1>

        {/* Typewriter subtitle */}
        <div className={`${fade(300)} h-7 mb-10 font-['JetBrains_Mono'] text-[#555] text-sm tracking-widest`}
          style={fadeDelay(300)}>
          &gt;&gt;&nbsp;
          <Typewriter words={['Workshops & Hackathons', 'Tech Talks & Competitions', 'Community & Networking', 'Learning & Growing Together']} />
        </div>

        {/* CTAs */}
        <div className={`${fade(400)} flex flex-col sm:flex-row gap-3 justify-center mb-16`} style={fadeDelay(450)}>
          <a href="https://discord.com/invite/qaRz3z9rFF" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden bg-[#00D4FF] text-[#050508] font-['Orbitron'] font-black
              text-[11px] tracking-widest px-9 py-4 transition-all duration-300
              hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]">
            <span className="absolute inset-0 bg-[#00FF94] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">JOIN DISCORD →</span>
          </a>
          <a href="/events"
            className="group relative overflow-hidden border border-[#00D4FF]/40 hover:border-[#00D4FF]
              text-[#00D4FF] font-['Orbitron'] font-bold text-[11px] tracking-widest px-9 py-4
              transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]">
            <span className="absolute inset-0 bg-[#00D4FF]/5 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">VIEW EVENTS</span>
          </a>
        </div>

        {/* Stats */}
        <div className={`${fade(600)} grid grid-cols-3 gap-3 max-w-sm mx-auto`} style={fadeDelay(600)}>
          {[['100000','100K+','ACM MEMBERS'],['174','174','COUNTRIES'],['75','75+','YEARS']].map(([raw, disp, lbl]) => (
            <div key={lbl} className="border border-[#1a1a2e] bg-[#0a0a12] p-4 text-center
              hover:border-[#00D4FF]/30 transition-colors duration-300">
              <div className="font-['Orbitron'] font-black text-[#00D4FF] text-2xl">
                <Counter to={parseInt(raw)} suffix={disp.includes('+') ? '+' : ''} />
              </div>
              <div className="font-['JetBrains_Mono'] text-[#444] text-[9px] tracking-widest mt-1">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-['JetBrains_Mono'] text-[9px] text-[#666] tracking-[0.4em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#00D4FF]/60 to-transparent animate-pulse" />
      </div>

      <style>{`
        @keyframes scanMove {
          0%   { top: -2px }
          100% { top: 100% }
        }
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
          font: inherit;
        }
        .glitch-text::before {
          color: #00FF94;
          clip-path: polygon(0 0,100% 0,100% 38%,0 38%);
          animation: glA 4.5s infinite;
        }
        .glitch-text::after {
          color: #FF2D9B;
          clip-path: polygon(0 62%,100% 62%,100% 100%,0 100%);
          animation: glB 4.5s infinite;
        }
        @keyframes glA {
          0%,89%,100%{ transform:translate(0);opacity:0 }
          90%{ transform:translate(-3px,1px) skewX(-4deg);opacity:0.8 }
          92%{ transform:translate(3px,-1px);opacity:0.6 }
          94%{ transform:translate(-2px);opacity:0 }
        }
        @keyframes glB {
          0%,85%,100%{ transform:translate(0);opacity:0 }
          86%{ transform:translate(3px,1px) skewX(4deg);opacity:0.8 }
          88%{ transform:translate(-3px);opacity:0.6 }
          90%{ transform:translate(2px);opacity:0 }
        }
      `}</style>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════════════════════
const PAST = ['Fastn Roadshow','AINovate','Technical Tambola','Conquering Canva','Video Editing Workshop','Hands on Javascript','Genesis','Chakravyuh','Digital Marketing']
const Marquee = () => (
  <div className="border-y border-[#00D4FF]/8 py-3 overflow-hidden bg-[#080810]">
    <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'marqueeRun 28s linear infinite' }}>
      {[...PAST,...PAST,...PAST].map((e,i)=>(
        <span key={i} className="font-['JetBrains_Mono'] text-[#333] text-[10px] tracking-[0.25em] uppercase flex items-center gap-4">
          <span className="text-[#00D4FF]/50">◆</span>{e}
        </span>
      ))}
    </div>
    <style>{`@keyframes marqueeRun{0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}`}</style>
  </div>
)

// ═══════════════════════════════════════════════════════════════
// SECTION LABEL helper
// ═══════════════════════════════════════════════════════════════
const SectionLabel = ({ index, label }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="font-['JetBrains_Mono'] text-[#00D4FF]/40 text-[10px] tracking-widest">{index}</span>
    <div className="w-6 h-px bg-[#00D4FF]/30" />
    <span className="font-['JetBrains_Mono'] text-[#00D4FF] text-[10px] tracking-[0.35em] uppercase">{label}</span>
  </div>
)

// ═══════════════════════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════════════════════
const About = () => (
  <section id="about" className="py-28 px-6 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-20 items-center">
      <Reveal>
        <SectionLabel index="01" label="About Us" />
        <h2 className="font-['Orbitron'] font-black text-4xl md:text-5xl mb-6 leading-tight">
          WHAT IS <span className="text-[#00D4FF]">MU-ACM</span>?
        </h2>
        <p className="text-[#666] font-['JetBrains_Mono'] text-sm leading-loose mb-4">
          The ACM (Association for Computing Machinery) is a 75-year-old international scientific and industrial computing society with around 100,000 members spread over 174 countries.
        </p>
        <p className="text-[#555] font-['JetBrains_Mono'] text-sm leading-loose mb-10">
          The Medi-Caps University ACM Student Chapter is a vibrant community of like-minded individuals with a shared love for technology, dedicated to fostering growth in computing.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[['100000','100K+','ACM Members'],['174','174','Countries'],['75','75+','Years Old']].map(([raw,disp,lbl])=>(
            <div key={lbl} className="border border-[#1a1a2e] hover:border-[#00D4FF]/40 bg-[#0a0a12] p-5 text-center transition-colors duration-300 group">
              <div className="font-['Orbitron'] font-black text-[#00D4FF] text-2xl group-hover:text-shadow-glow">
                <Counter to={parseInt(raw)} suffix={disp.includes('+') ? '+' : ''} />
              </div>
              <div className="font-['JetBrains_Mono'] text-[#333] text-[9px] tracking-widest mt-1.5">{lbl}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={180} direction="right">
        <div className="relative">
          <div className="absolute -inset-3 bg-gradient-to-br from-[#00D4FF]/12 to-transparent blur-2xl pointer-events-none" />
          <div className="relative border border-[#00D4FF]/20 overflow-hidden group">
            <img src="/about.webp" alt="About MU-ACM"
              className="w-full aspect-square object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent" />
            {/* scanline overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.3) 3px,rgba(0,0,0,0.3) 4px)' }} />
            <div className="absolute top-3 left-3 font-['JetBrains_Mono'] text-[9px] text-[#00D4FF]/50 tracking-widest">FILE://about.webp</div>
          </div>
          <div className="absolute -bottom-3 -right-3 border border-[#00D4FF]/30 bg-[#0a0a12] px-4 py-2 font-['JetBrains_Mono'] text-[10px] text-[#00D4FF]/70">
            EST. 2022
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)

// ═══════════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════════
const EventsSection = () => {
  const [events, setEvents] = useState([])
  useEffect(() => { API.get('/events').then(r => setEvents(r.data.slice(0,3))).catch(()=>{}) }, [])

  return (
    <section className="py-28 px-6 max-w-7xl mx-auto">
      <Reveal>
        <div className="flex items-end justify-between mb-14">
          <div>
            <SectionLabel index="02" label="Latest Events" />
            <h2 className="font-['Orbitron'] font-black text-4xl md:text-5xl">EVENTS</h2>
          </div>
          <a href="/events" className="hidden md:flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] text-[#00D4FF]/70
            tracking-widest border border-[#00D4FF]/20 px-4 py-2.5 hover:border-[#00D4FF]/60 hover:text-[#00D4FF]
            hover:bg-[#00D4FF]/5 transition-all duration-300">
            VIEW_ALL →
          </a>
        </div>
      </Reveal>

      {events.length === 0 ? (
        <div className="text-center py-20 font-['JetBrains_Mono'] text-[#333] text-sm tracking-widest">
          // NO_EVENTS_FOUND — CHECK BACK SOON
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {events.map((ev, i) => (
            <Reveal key={ev.id} delay={i * 90}>
              <a href={`/events/${ev.id}`}
                className="group block border border-[#1a1a2e] hover:border-[#00D4FF]/40 bg-[#080810]
                  overflow-hidden transition-all duration-300 hover:-translate-y-1
                  hover:shadow-[0_8px_30px_rgba(0,212,255,0.08)]">
                <div className="aspect-video overflow-hidden relative bg-[#0a0a12]">
                  {ev.coverImage
                    ? <img src={ev.coverImage} alt={ev.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105
                          transition-all duration-500 grayscale group-hover:grayscale-[50%]" />
                    : <div className="w-full h-full flex items-center justify-center font-['JetBrains_Mono'] text-xs text-[#333]">// NO_IMAGE</div>
                  }
                  <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.15) 3px,rgba(0,0,0,0.15) 4px)' }} />
                  <div className={`absolute top-2 right-2 font-['JetBrains_Mono'] text-[9px] px-2 py-1 border tracking-widest
                    ${ev.status==='upcoming' ? 'border-[#00D4FF]/50 text-[#00D4FF] bg-[#00D4FF]/10' : 'border-[#444]/50 text-[#555] bg-black/30'}`}>
                    {ev.status?.toUpperCase()}
                  </div>
                </div>
                <div className="p-5">
                  {ev.date && <div className="font-['JetBrains_Mono'] text-[#333] text-[10px] tracking-widest mb-2">{ev.date}</div>}
                  <h3 className="font-['Orbitron'] font-bold text-sm group-hover:text-[#00D4FF] transition-colors mb-2 leading-snug">{ev.title}</h3>
                  <p className="text-[#444] font-['JetBrains_Mono'] text-[11px] line-clamp-2 leading-relaxed">{ev.description}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════════
const TestimonialsSection = () => {
  const [list, setList] = useState([])
  useEffect(() => { API.get('/testimonials').then(r => setList(r.data)).catch(()=>{}) }, [])

  return (
    <section id="testimonials" className="py-28 px-6 border-y border-[#00D4FF]/6"
      style={{ background: 'linear-gradient(180deg,#080810 0%,#050508 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <SectionLabel index="03" label="Testimonials" />
            <h2 className="font-['Orbitron'] font-black text-4xl md:text-5xl">WHAT THEY SAY</h2>
          </div>
        </Reveal>

        {list.length === 0
          ? <div className="text-center py-20 font-['JetBrains_Mono'] text-[#333] text-sm">// NO_TESTIMONIALS_YET</div>
          : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((t, i) => (
                <Reveal key={t.id} delay={i * 70}>
                  <div className="relative border border-[#1a1a2e] hover:border-[#00D4FF]/30 bg-[#080810] p-6
                    flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,212,255,0.06)] h-full overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#00D4FF]/4 pointer-events-none" />
                    <div className="font-['Orbitron'] text-[#00D4FF]/30 text-4xl leading-none">"</div>
                    <p className="text-[#666] font-['JetBrains_Mono'] text-xs leading-relaxed flex-1">{t.quote}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-[#1a1a2e]">
                      <div className="w-9 h-9 border border-[#00D4FF]/20 bg-[#00D4FF]/5 flex items-center justify-center
                        font-['Orbitron'] font-black text-[#00D4FF] text-xs shrink-0">
                        {t.name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-['Orbitron'] font-bold text-xs text-white">{t.name}</div>
                        <div className="font-['JetBrains_Mono'] text-[#333] text-[9px] tracking-widest mt-0.5">{t.role}</div>
                      </div>
                      {t.type === 'speaker' && (
                        <span className="ml-auto font-['JetBrains_Mono'] text-[9px] border border-[#00D4FF]/25 text-[#00D4FF]/70 px-2 py-0.5 tracking-widest">SPK</span>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// TEAM
// ═══════════════════════════════════════════════════════════════
const SocialLink = ({ href, icon }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="w-6 h-6 border border-[#1e1e2e] hover:border-[#00D4FF]/50 flex items-center justify-center
      text-[#444] hover:text-[#00D4FF] transition-all duration-200">
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: icon }} />
  </a>
) : null

const LI_PATH = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
const GH_PATH = 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z'
const IG_PATH = 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'

const MemberCard = ({ m, size = 'md' }) => {
  const big = size === 'lg'
  return (
    <div className={`group border border-[#1a1a2e] hover:border-[#00D4FF]/35 bg-[#080810]
      flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1
      hover:shadow-[0_8px_24px_rgba(0,212,255,0.07)] ${big ? 'p-7' : 'p-4'}`}>
      <div className={`border border-[#1e1e2e] group-hover:border-[#00D4FF]/40 bg-[#0a0a12]
        overflow-hidden transition-colors duration-300 mb-3 flex items-center justify-center
        ${big ? 'w-20 h-20' : 'w-14 h-14'}`}>
        {m.image
          ? <img src={m.image} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          : <span className={`font-['Orbitron'] font-black text-[#00D4FF] ${big ? 'text-2xl' : 'text-lg'}`}>{m.name.charAt(0)}</span>
        }
      </div>
      <h3 className={`font-['Orbitron'] font-bold group-hover:text-[#00D4FF] transition-colors leading-tight ${big ? 'text-sm mb-1' : 'text-[11px] mb-0.5'}`}>{m.name}</h3>
      <p className="font-['JetBrains_Mono'] text-[#333] tracking-widest mb-2" style={{ fontSize: '9px' }}>{m.role?.toUpperCase()}</p>
      <div className="flex items-center gap-1.5">
        <SocialLink href={m.linkedin} icon={`<path d="${LI_PATH}"/>`} />
        <SocialLink href={m.github} icon={`<path d="${GH_PATH}"/>`} />
        <SocialLink href={m.instagram} icon={`<path d="${IG_PATH}"/>`} />
      </div>
    </div>
  )
}

const TeamDivider = ({ label }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-2 h-2 bg-[#00D4FF]/40 rotate-45" />
    <span className="font-['JetBrains_Mono'] text-[10px] text-[#00D4FF]/50 tracking-[0.4em] uppercase">{label}</span>
    <div className="flex-1 h-px bg-[#1a1a2e]" />
  </div>
)

const HomeTeamSection = () => (
  <section id="team" className="py-28 px-6 max-w-7xl mx-auto">
    <Reveal>
      <div className="flex items-end justify-between mb-14">
        <div>
          <SectionLabel index="04" label="Core Team" />
          <h2 className="font-['Orbitron'] font-black text-4xl md:text-5xl">THE PEOPLE</h2>
        </div>
        <a href="/team" className="hidden md:flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] text-[#00D4FF]/70
          tracking-widest border border-[#00D4FF]/20 px-4 py-2.5 hover:border-[#00D4FF]/60 hover:text-[#00D4FF]
          hover:bg-[#00D4FF]/5 transition-all duration-300">
          FULL_TEAM →
        </a>
      </div>
    </Reveal>

    {/* Council */}
    <div className="mb-14">
      <TeamDivider label="Council" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {council.map((m, i) => (
          <Reveal key={i} delay={i * 80}><MemberCard m={m} size="lg" /></Reveal>
        ))}
      </div>
    </div>

    {/* Heads */}
    <div className="mb-14">
      <TeamDivider label="Department Heads" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {heads.map((m, i) => (
          <Reveal key={i} delay={i * 50}><MemberCard m={m} /></Reveal>
        ))}
      </div>
    </div>

    {/* Mentors */}
    <div className="mb-12">
      <TeamDivider label="Mentors" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {mentors.map((m, i) => (
          <Reveal key={i} delay={i * 60}><MemberCard m={m} /></Reveal>
        ))}
      </div>
    </div>

    <Reveal delay={100}>
      <div className="text-center">
        <a href="/team"
          className="group relative overflow-hidden inline-flex items-center gap-2 border border-[#00D4FF]/30
            text-[#00D4FF] font-['Orbitron'] font-bold text-[11px] px-8 py-3.5 tracking-widest
            hover:border-[#00D4FF] hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300">
          <span className="absolute inset-0 bg-[#00D4FF]/5 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
          <span className="relative z-10">VIEW FULL TEAM →</span>
        </a>
      </div>
    </Reveal>
  </section>
)

// ═══════════════════════════════════════════════════════════════
// FACULTY
// ═══════════════════════════════════════════════════════════════
const FacultySection = () => {
  const [list, setList] = useState([])
  useEffect(() => { API.get('/faculty').then(r => setList(r.data)).catch(()=>{}) }, [])

  return (
    <section id="faculty" className="py-28 px-6 max-w-7xl mx-auto">
      <Reveal>
        <div className="mb-14">
          <SectionLabel index="05" label="Faculty" />
          <h2 className="font-['Orbitron'] font-black text-4xl md:text-5xl">FACULTY VOICES</h2>
        </div>
      </Reveal>
      {list.length === 0
        ? <div className="text-center py-20 font-['JetBrains_Mono'] text-[#333] text-sm">// NO_STATEMENTS_YET</div>
        : (
          <div className="grid md:grid-cols-2 gap-4">
            {list.map((f, i) => (
              <Reveal key={f.id} delay={i * 100}>
                <div className="border border-[#1a1a2e] hover:border-[#00D4FF]/30 bg-[#080810] p-6 flex gap-5
                  transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,212,255,0.06)]">
                  <div className="w-14 h-14 shrink-0 border border-[#1e1e2e] bg-[#0a0a12] overflow-hidden flex items-center justify-center">
                    {f.image
                      ? <img src={f.image} alt={f.name} className="w-full h-full object-cover grayscale" />
                      : <span className="font-['Orbitron'] font-black text-[#00D4FF] text-xl">{f.name?.charAt(0)}</span>
                    }
                  </div>
                  <div>
                    <p className="text-[#666] font-['JetBrains_Mono'] text-[11px] leading-relaxed italic mb-4">"{f.statement}"</p>
                    <div className="font-['Orbitron'] font-bold text-xs text-[#00D4FF]">{f.name}</div>
                    <div className="font-['JetBrains_Mono'] text-[#333] text-[9px] tracking-widest mt-0.5">
                      {f.designation} // {f.department}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════
const FAQS = [
  { q:'Who can join MU-ACM?', a:'Any student at Medi-Caps University who has a passion for technology and computing can join MU-ACM.' },
  { q:'What activities does MU-ACM organize?', a:'We organize workshops, hackathons, tech talks, coding competitions, and various technical events throughout the year.' },
  { q:'Do I need prior programming experience?', a:'No! MU-ACM welcomes students of all skill levels. We have events for beginners as well as advanced programmers.' },
  { q:'How can I become a member?', a:'You can join by registering on our website or reaching out to us on Discord.' },
]

const FAQ = () => {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" className="py-28 px-6 border-t border-[#00D4FF]/6"
      style={{ background: 'linear-gradient(180deg,#080810 0%,#050508 100%)' }}>
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="mb-14">
            <SectionLabel index="06" label="FAQ" />
            <h2 className="font-['Orbitron'] font-black text-4xl md:text-5xl">COMMON QUERIES</h2>
          </div>
        </Reveal>
        <div className="flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="border border-[#1a1a2e] hover:border-[#00D4FF]/20 bg-[#080810] overflow-hidden transition-colors duration-300">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-[#00D4FF]/3 transition-colors"
                >
                  <span className="font-['JetBrains_Mono'] text-[#00D4FF]/30 text-[10px] shrink-0">{String(i+1).padStart(2,'0')}</span>
                  <span className="font-['Orbitron'] font-bold text-xs flex-1">{faq.q}</span>
                  <span className="font-['JetBrains_Mono'] text-[#00D4FF] text-lg shrink-0 transition-transform duration-300"
                    style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ${open === i ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-6 pb-5 pt-2 font-['JetBrains_Mono'] text-[#555] text-xs leading-relaxed border-t border-[#1a1a2e] ml-10">
                    {faq.a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// JOIN CTA
// ═══════════════════════════════════════════════════════════════
const JoinSection = () => (
  <section className="py-28 px-6">
    <Reveal>
      <div className="max-w-3xl mx-auto text-center border border-[#00D4FF]/15 bg-[#080810] p-14 relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.04) 0%, #080810 100%)' }}>

        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.04) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Corner brackets */}
        {[['top-0 left-0','border-l-2 border-t-2'],['top-0 right-0','border-r-2 border-t-2'],
          ['bottom-0 left-0','border-l-2 border-b-2'],['bottom-0 right-0','border-r-2 border-b-2']].map(([pos,cls])=>(
          <div key={pos} className={`absolute ${pos} w-6 h-6 ${cls} border-[#00D4FF]/50`} />
        ))}

        <div className="relative z-10">
          <SectionLabel index="07" label="Join Us" />
          <h2 className="font-['Orbitron'] font-black text-4xl md:text-5xl mb-4">
            READY TO <span className="text-[#00D4FF]">JOIN</span>?
          </h2>
          <p className="font-['JetBrains_Mono'] text-[#555] text-xs mb-10 leading-loose tracking-widest">
            Connect with like-minded tech enthusiasts.<br/>Share ideas. Grow together.
          </p>
          <a
            href="https://discord.com/invite/qaRz3z9rFF"
            target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden inline-block border-2 border-[#00D4FF] text-[#00D4FF]
              font-['Orbitron'] font-black text-[11px] px-12 py-4 tracking-widest
              hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all duration-300">
            <span className="absolute inset-0 bg-[#00D4FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 group-hover:text-[#050508] transition-colors duration-300">JOIN DISCORD →</span>
          </a>
        </div>
      </div>
    </Reveal>
  </section>
)

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <main className="pt-0">
      <Hero />
      <Marquee />
      <About />
      <EventsSection />
      <TestimonialsSection />
      <HomeTeamSection />
      <FacultySection />
      <FAQ />
      <JoinSection />
    </main>
  )
}