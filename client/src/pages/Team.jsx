import { council, heads, mentors, departments } from '../data/teamData'
import { Reveal } from '../components/animations'

// ─── SVG paths ────────────────────────────────────────────────
const LI = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
const GH = 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z'
const IG = 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'

const Social = ({ href, d }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="text-[#4a4a5e] hover:text-[#00D4FF] transition-colors duration-200 p-1">
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d={d} /></svg>
  </a>
) : null

// ─── Member Card — identical style to Home.jsx ─────────────────
// large  = council/mentor: portrait 3/4, bigger text
// medium = dept heads: portrait 4/5, medium text  
// small  = executives: portrait 4/5, smaller text
const MemberCard = ({ m, size = 'small' }) => {
  const isLarge  = size === 'large'
  const isMedium = size === 'medium'

  return (
    <div className={`group border border-[#0e0e1c] hover:border-[#00D4FF]/30 bg-[#06060e]
      flex flex-col items-center text-center transition-all duration-300
      hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,212,255,0.08)]
      ${isLarge ? 'p-5' : isMedium ? 'p-3.5' : 'p-3'}`}>

      {/* Photo */}
      <div className={`w-full overflow-hidden border border-[#111] group-hover:border-[#00D4FF]/30
        bg-[#0a0a14] transition-colors duration-300 mb-4 flex items-center justify-center
        ${isLarge ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
        {m.image
          ? <img src={m.image} alt={m.name}
              className="w-full h-full object-cover object-top transition-all duration-500
                grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal" />
          : <span className={`font-['Orbitron'] font-black text-[#00D4FF]/50
              ${isLarge ? 'text-5xl' : isMedium ? 'text-3xl' : 'text-2xl'}`}>
              {m.name?.charAt(0)}
            </span>
        }
      </div>

      {/* Name */}
      <h3 className={`font-['Orbitron'] font-bold text-white group-hover:text-[#00D4FF]
        transition-colors leading-tight w-full
        ${isLarge ? 'text-sm mb-1.5' : isMedium ? 'text-xs mb-1' : 'text-[11px] mb-1'}`}>
        {m.name}
      </h3>

      {/* Role */}
      <p className={`font-['JetBrains_Mono'] text-[#00D4FF]/50 tracking-widest mb-3 w-full
        ${isLarge ? 'text-xs' : 'text-[10px]'}`}>
        {m.role?.toUpperCase()}
      </p>

      {/* Socials */}
      <div className="flex items-center gap-1">
        <Social href={m.linkedin} d={LI} />
        <Social href={m.github}   d={GH} />
        <Social href={m.instagram} d={IG} />
      </div>
    </div>
  )
}

// ─── Section divider ──────────────────────────────────────────
const Divider = ({ label }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="w-1.5 h-1.5 bg-[#00D4FF]/25 rotate-45 shrink-0" />
    <span className="font-['JetBrains_Mono'] text-xs text-[#00D4FF]/55 tracking-[0.4em] uppercase whitespace-nowrap">
      {label}
    </span>
    <div className="flex-1 h-px bg-[#0e0e1c]" />
  </div>
)

// ─── Page ─────────────────────────────────────────────────────
const Team = () => (
  <main className="pt-20 min-h-screen">

    {/* Header */}
    <section className="relative py-24 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
      <div className="absolute top-8 left-6 w-8 h-8 border-l border-t border-[#00D4FF]/15 pointer-events-none" />
      <div className="absolute top-8 right-6 w-8 h-8 border-r border-t border-[#00D4FF]/15 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs">04</span>
          <div className="w-5 h-px bg-[#00D4FF]/25" />
          <span className="font-['JetBrains_Mono'] text-[#00D4FF]/60 text-xs tracking-[0.35em] uppercase">2025 – 26</span>
        </div>
        <h1 className="font-['Orbitron'] font-black text-4xl md:text-6xl text-white mb-4">
          Our <span className="text-[#00D4FF]">Team</span>
        </h1>
        <p className="font-['JetBrains_Mono'] text-[#7a7a90] text-sm leading-loose max-w-md mx-auto">
          The people behind MU-ACM — leading, building, and growing together.
        </p>
      </div>
    </section>

    <div className="max-w-6xl mx-auto px-6 pb-32 flex flex-col gap-20">

      {/* Council */}
      <div>
        <Reveal><Divider label="Council" /></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {council.map((m, i) => (
            <Reveal key={i} delay={i * 70}><MemberCard m={m} size="large" /></Reveal>
          ))}
        </div>
      </div>

      {/* All departments */}
      {departments.map((dept) => (
        <div key={dept.name}>
          <Reveal><Divider label={dept.name} /></Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {dept.members.map((m, i) => (
              <Reveal key={i} delay={(i % 5) * 50}>
                <MemberCard m={m} size={m.role?.toLowerCase().includes('head') ? 'medium' : 'small'} />
              </Reveal>
            ))}
          </div>
        </div>
      ))}

      {/* Mentors */}
      <div>
        <Reveal><Divider label="Mentors" /></Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mentors.map((m, i) => (
            <Reveal key={i} delay={i * 60}><MemberCard m={m} size="large" /></Reveal>
          ))}
        </div>
      </div>

    </div>
  </main>
)

export default Team