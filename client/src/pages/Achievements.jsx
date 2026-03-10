import { Reveal } from '../components/animations'

// ─── Achievement data ─────────────────────────────────────────
// Add your real achievements here
const ACHIEVEMENTS = [
  {
    title: 'Best Student Chapter Award',
    year: '2024',
    category: 'Recognition',
    description: 'Recognized as one of the top performing ACM student chapters for our consistent event quality, community outreach, and technical contributions.',
    icon: '🏆',
  },
  {
    title: 'AINovate Hackathon',
    year: '2024',
    category: 'Event',
    description: 'Successfully organized AINovate, an AI-focused hackathon that brought together 100+ participants to build innovative solutions using modern AI tools.',
    icon: '⚡',
  },
  {
    title: 'Fastn Partnership',
    year: '2024',
    category: 'Industry',
    description: 'Partnered with Fastn to host an exclusive roadshow at Medi-Caps University, giving students hands-on exposure to next-gen web development tools.',
    icon: '🤝',
  },
  {
    title: 'Genesis — Chapter Launch',
    year: '2024',
    category: 'Milestone',
    description: 'Successfully launched the MU-ACM Student Chapter with Genesis, our founding event, establishing a strong foundation for the tech community at Medi-Caps University.',
    icon: '🚀',
  },
  {
    title: '500+ Students Impacted',
    year: '2024',
    category: 'Community',
    description: 'Through workshops, tech talks, competitions and community events, MU-ACM has directly impacted over 500 students across the university.',
    icon: '👥',
  },
  {
    title: 'Industry Speaker Sessions',
    year: '2024',
    category: 'Learning',
    description: 'Hosted multiple sessions with industry professionals covering Full Stack Development, Digital Marketing, AI, Video Production and more.',
    icon: '🎤',
  },
]

const CATEGORY_COLORS = {
  Recognition: 'border-[#00FF94]/30 text-[#00FF94]/70',
  Event:       'border-[#00D4FF]/30 text-[#00D4FF]/70',
  Industry:    'border-purple-400/30 text-purple-400/70',
  Milestone:   'border-orange-400/30 text-orange-400/70',
  Community:   'border-pink-400/30 text-pink-400/70',
  Learning:    'border-yellow-400/30 text-yellow-400/70',
}

// ─── Page ─────────────────────────────────────────────────────
const Achievements = () => (
  <main className="pt-20 min-h-screen">

    {/* ── Hero header ── */}
    <section className="relative py-24 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
      <div className="absolute top-8 left-6 w-8 h-8 border-l border-t border-[#00D4FF]/15 pointer-events-none" />
      <div className="absolute top-8 right-6 w-8 h-8 border-r border-t border-[#00D4FF]/15 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs">08</span>
          <div className="w-5 h-px bg-[#00D4FF]/25" />
          <span className="font-['JetBrains_Mono'] text-[#00D4FF]/60 text-xs tracking-[0.35em] uppercase">Achievements</span>
        </div>
        <h1 className="font-['Orbitron'] font-black text-4xl md:text-6xl text-white mb-4">
          Our Team's <span className="text-[#00D4FF]">Achievements</span>
        </h1>
        <p className="font-['JetBrains_Mono'] text-[#7a7a90] text-sm leading-loose max-w-lg mx-auto">
          Milestones reached, partnerships built, and communities impacted — a record of what MU-ACM has accomplished.
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 mt-10">
          {[
            { val: ACHIEVEMENTS.length, label: 'Achievements' },
            { val: '500+',              label: 'Students Impacted' },
            { val: '8+',                label: 'Events Organized' },
          ].map(({ val, label }, i, arr) => (
            <div key={label} className="flex items-center gap-8">
              <div className="text-center">
                <div className="font-['Orbitron'] font-black text-2xl text-[#00D4FF]">{val}</div>
                <div className="font-['JetBrains_Mono'] text-[#444] text-xs tracking-widest mt-0.5 uppercase">{label}</div>
              </div>
              {i < arr.length - 1 && <div className="w-px h-8 bg-[#0e0e1c]" />}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Grid ── */}
    <section className="px-6 pb-32 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACHIEVEMENTS.map((a, i) => (
          <Reveal key={i} delay={(i % 3) * 70}>
            <div className="group border border-[#0e0e1c] hover:border-[#00D4FF]/25 bg-[#06060e]
              p-6 flex flex-col gap-4 h-full transition-all duration-300
              hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,212,255,0.06)]">

              {/* Top row — icon + year + category */}
              <div className="flex items-start justify-between">
                <span className="text-3xl">{a.icon}</span>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs tracking-widest">
                    {a.year}
                  </span>
                  <span className={`font-['JetBrains_Mono'] text-xs px-2 py-0.5 border tracking-widest
                    ${CATEGORY_COLORS[a.category] ?? 'border-[#00D4FF]/30 text-[#00D4FF]/70'}`}>
                    {a.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-['Orbitron'] font-bold text-sm text-white group-hover:text-[#00D4FF]
                transition-colors leading-snug">
                {a.title}
              </h3>

              {/* Description */}
              <p className="font-['JetBrains_Mono'] text-[#7a7a90] text-xs leading-loose flex-1">
                {a.description}
              </p>

              {/* Bottom accent line */}
              <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-[#00D4FF]/40 to-transparent
                transition-all duration-500" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  </main>
)

export default Achievements