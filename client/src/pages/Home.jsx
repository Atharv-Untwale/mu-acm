import { useEffect, useState, useRef } from 'react'
import API from '../utils/api'
import { council, heads, mentors } from '../data/teamData'
import { Starfield, Reveal, Counter, useBootSequence } from '../components/animations'
import { PAST_EVENTS } from './Events'

// ═══════════════════════════════════════════════════════════════
// BOOT SCREEN
// ═══════════════════════════════════════════════════════════════
const BootScreen = ({ lines, done }) => (
  <div className={`fixed inset-0 z-[100] bg-[#020205] flex flex-col items-center justify-center
    transition-opacity duration-700 pointer-events-none ${done ? 'opacity-0' : 'opacity-100'}`}>

    {/* Center logo */}
    <div className="mb-10 flex flex-col items-center gap-3">
      <div className="w-16 h-16 border border-[#00D4FF]/40 flex items-center justify-center relative">
        <span className="font-['Orbitron'] font-black text-[#00D4FF] text-xl">ACM</span>
        <div className="absolute inset-0 border border-[#00D4FF]/10 scale-110" />
      </div>
      <span className="font-['Orbitron'] font-black text-white text-lg tracking-widest">MU-ACM</span>
    </div>

    {/* Terminal lines */}
    <div className="w-72 md:w-80 font-['JetBrains_Mono'] text-xs space-y-2">
      {lines.map((l, i) => (
        <div key={i} className={`flex items-center gap-2 ${l.accent ? 'text-[#00D4FF]' : 'text-[#7a7a90]'}`}
          style={{ animation: 'fadeIn 0.3s ease forwards' }}>
          <span className="text-[#00D4FF]/65">&gt;</span>
          <span>{l.text}</span>
          {i === lines.length - 1 && !l.accent && (
            <span className="animate-pulse text-[#00D4FF]">_</span>
          )}
        </div>
      ))}
    </div>

    {/* Progress bar */}
    <div className="w-72 md:w-80 h-px bg-[#111] mt-8 overflow-hidden">
      <div className="h-full bg-[#00D4FF]"
        style={{ animation: 'bootProgress 2.6s cubic-bezier(0.4,0,0.2,1) forwards' }} />
    </div>

    <style>{`
      @keyframes fadeIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:none} }
      @keyframes bootProgress { from{width:0%} to{width:100%} }
    `}</style>
  </div>
)

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
const Hero = ({ visible }) => {
  const s = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(24px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />

      <div className="absolute top-20 left-6 w-8 h-8 border-l border-t border-[#00D4FF]/20 pointer-events-none" />
      <div className="absolute top-20 right-6 w-8 h-8 border-r border-t border-[#00D4FF]/20 pointer-events-none" />
      <div className="absolute bottom-16 left-6 w-8 h-8 border-l border-b border-[#00D4FF]/20 pointer-events-none" />
      <div className="absolute bottom-16 right-6 w-8 h-8 border-r border-b border-[#00D4FF]/20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div style={s(0)} className="inline-flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] shadow-[0_0_8px_#00FF94] animate-pulse" />
          <span className="font-['JetBrains_Mono'] text-[#00D4FF]/60 text-xs tracking-[0.3em] uppercase">
            Medi-Caps University · ACM Student Chapter
          </span>
        </div>

        <h1 style={{ ...s(120), fontSize: 'clamp(2.8rem,8vw,6.5rem)' }}
          className="font-['Orbitron'] font-black leading-[1.05] mb-5 select-none">
          <span className="block text-white">We are more</span>
          <span className="block text-white">than just a</span>
          <span className="block text-[#00D4FF]">Club.</span>
        </h1>

        <div style={s(300)} className="mb-10">
          <span className="font-['JetBrains_Mono'] text-[#9090a0] text-sm tracking-wider">
            The tech community Medi-Caps{' '}
            <span className="text-[#00D4FF]">deserves.</span>
          </span>
        </div>

        <div style={s(450)} className="flex flex-col sm:flex-row gap-3 justify-center mb-12 md:mb-20">
          <a href="https://discord.com/invite/qaRz3z9rFF" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden bg-[#00D4FF] text-[#020205] font-['Orbitron'] font-black
              text-xs tracking-widest px-8 py-3.5 transition-all duration-300
              hover:shadow-[0_0_28px_rgba(0,212,255,0.4)]">
            <span className="absolute inset-0 bg-white/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">JOIN DISCORD →</span>
          </a>
          <a href="/events"
            className="group relative overflow-hidden border border-[#00D4FF]/30 hover:border-[#00D4FF]/70
              text-[#00D4FF] font-['Orbitron'] font-bold text-xs tracking-widest px-8 py-3.5
              transition-all duration-300">
            <span className="absolute inset-0 bg-[#00D4FF]/5 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">VIEW EVENTS</span>
          </a>
        </div>

        <div style={s(600)} className="flex items-center justify-center gap-10 md:gap-8 md:gap-8 md:p-16">
          {[['100000','100K+','ACM Members'],['174','174','Countries'],['75','75+','Years Old']].map(([raw,disp,lbl]) => (
            <div key={lbl} className="text-center">
              <div className="font-['Orbitron'] font-black text-[#00D4FF] text-2xl md:text-3xl">
                <Counter to={parseInt(raw)} suffix={disp.includes('+') ? '+' : ''} />
              </div>
              <div className="font-['JetBrains_Mono'] text-[#7a7a90] text-xs tracking-widest mt-1 uppercase">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-[#00D4FF] to-transparent animate-pulse" />
        <span className="font-['JetBrains_Mono'] text-xs text-[#9090a0] tracking-[0.4em]">SCROLL</span>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════════════════════
const EVENTS_ROW  = ['Fastn Roadshow','AINovate','Technical Tambola','Conquering Canva','Video Editing Workshop','Hands on Javascript','Genesis','Chakravyuh','Digital Marketing']
const TAGLINE_ROW = ['Build · Learn · Lead','Community & Code','Tech for Everyone','Medi-Caps University','ACM Student Chapter','Est. 2022','Workshops & Hackathons','Innovation Lab']

const Marquee = () => (
  <div className="relative z-10 overflow-hidden py-5" style={{ borderTop: '1px solid rgba(0,212,255,0.06)', borderBottom: '1px solid rgba(0,212,255,0.06)' }}>

    {/* Fade edges */}
    <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(90deg, #020205, transparent)' }} />
    <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(-90deg, #020205, transparent)' }} />

    {/* Row 1 — events, left to right */}
    <div className="flex gap-12 whitespace-nowrap mb-3" style={{ animation: 'marqueeL 35s linear infinite' }}>
      {[...EVENTS_ROW,...EVENTS_ROW,...EVENTS_ROW].map((e,i) => (
        <span key={i} className="flex items-center gap-4">
          <span className="font-['Orbitron'] font-black text-white/80 text-sm tracking-widest uppercase">{e}</span>
          <span className="text-[#00D4FF]/50 text-xs">✦</span>
        </span>
      ))}
    </div>

    {/* Row 2 — taglines, right to left, dimmer */}
    <div className="flex gap-12 whitespace-nowrap" style={{ animation: 'marqueeR 40s linear infinite' }}>
      {[...TAGLINE_ROW,...TAGLINE_ROW,...TAGLINE_ROW].map((e,i) => (
        <span key={i} className="flex items-center gap-4">
          <span className="font-['JetBrains_Mono'] text-[#00D4FF]/40 text-xs tracking-[0.3em] uppercase">{e}</span>
          <span className="text-[#00D4FF]/20 text-xs">◆</span>
        </span>
      ))}
    </div>

    <style>{`
      @keyframes marqueeL { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
      @keyframes marqueeR { 0%{transform:translateX(-33.333%)} 100%{transform:translateX(0)} }
    `}</style>
  </div>
)

// ═══════════════════════════════════════════════════════════════
// SECTION HEADER
// ═══════════════════════════════════════════════════════════════
const SectionHead = ({ index, label, title, center = false }) => (
  <div className={`mb-8 md:mb-14 ${center ? 'text-center' : ''}`}>
    <div className={`flex items-center gap-3 mb-3 ${center ? 'justify-center' : ''}`}>
      <span className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs">{index}</span>
      <div className="w-5 h-px bg-[#00D4FF]/25" />
      <span className="font-['JetBrains_Mono'] text-[#00D4FF]/60 text-xs tracking-[0.35em] uppercase">{label}</span>
    </div>
    <h2 className="font-['Orbitron'] font-black text-2xl md:text-5xl text-white leading-tight">{title}</h2>
  </div>
)

// ═══════════════════════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════════════════════
const About = () => (
  <section id="about" className="relative z-10 py-16 md:py-32 px-6 max-w-6xl mx-auto">
    <Reveal>
      <SectionHead index="01" label="About Us" title={<>What is <span className="text-[#00D4FF]">MU-ACM</span>?</>} />
    </Reveal>

    {/* Full-width group photo */}
    <Reveal delay={80}>
      <div className="relative group mb-8 md:mb-16 border border-[#00D4FF]/15 overflow-hidden">
        {/* Glow behind */}
        <div className="absolute -inset-6 bg-[#00D4FF]/3 blur-3xl pointer-events-none" />

        <img
          src="/about.jpg"
          alt="MU-ACM Team"
          className="w-full object-cover object-center transition-all duration-700
            grayscale group-hover:grayscale-0"
          style={{ maxHeight: '320px' }}
        />

        {/* Dark gradient overlays — bottom and sides */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/70 via-transparent to-[#020205]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020205]/30 via-transparent to-[#020205]/30 pointer-events-none" />

        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,1) 3px,rgba(0,0,0,1) 4px)' }} />

        {/* EST badge */}
        <div className="absolute bottom-4 right-4 border border-[#00D4FF]/25 bg-[#020205]/80
          backdrop-blur-sm px-3 py-1.5 font-['JetBrains_Mono'] text-xs text-[#00D4FF]/60 tracking-widest">
          EST. 2022
        </div>

        {/* Member count badge */}
        <div className="absolute bottom-4 left-4 border border-[#00D4FF]/20 bg-[#020205]/80
          backdrop-blur-sm px-3 py-1.5 font-['JetBrains_Mono'] text-xs text-[#9090a0] tracking-widest">
          MU-ACM CORE TEAM
        </div>
      </div>
    </Reveal>

    {/* Text + stats below */}
    <div className="grid md:grid-cols-2 gap-8 md:gap-8 md:p-16 items-start">
      <Reveal delay={120}>
        <p className="text-[#9090a0] font-['JetBrains_Mono'] text-sm leading-[2] mb-4">
          The ACM (Association for Computing Machinery) is a 75-year-old international scientific and industrial computing society with around 100,000 members spread over 174 countries.
        </p>
        <p className="text-[#7a7a90] font-['JetBrains_Mono'] text-sm leading-[2]">
          The Medi-Caps University ACM Student Chapter is a vibrant community of like-minded individuals with a shared love for technology. Dedicated to fostering growth in the world of computing, we organise events that cater to the holistic technical needs of the job market.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <div className="flex gap-6 md:gap-10 md:justify-end">
          {[['100000','100K+','Members'],['174','174','Countries'],['75','75+','Years']].map(([raw,disp,lbl])=>(
            <div key={lbl} className="text-center">
              <div className="font-['Orbitron'] font-black text-[#00D4FF] text-3xl md:text-4xl">
                <Counter to={parseInt(raw)} suffix={disp.includes('+') ? '+' : ''} />
              </div>
              <div className="font-['JetBrains_Mono'] text-[#6a6a7e] text-xs tracking-widest mt-2 uppercase">{lbl}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
)

// ═══════════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════════
const EventCard = ({ ev, delay = 0 }) => (
  <Reveal delay={delay}>
    <a href={`/events/${ev.id}`}
      className="group block border border-[#111120] hover:border-[#00D4FF]/25
        bg-[#06060e] overflow-hidden transition-all duration-300
        hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,212,255,0.06)]">
      <div className="aspect-video overflow-hidden relative bg-[#0a0a14]">
        {ev.coverImage
          ? <img src={ev.coverImage} alt={ev.title}
              className="w-full h-full object-cover opacity-50 group-hover:opacity-80
                group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0" />
          : <div className="w-full h-full flex items-center justify-center font-['JetBrains_Mono'] text-xs text-[#3a3a4a]">// NO IMAGE</div>
        }
        <div className={`absolute top-3 right-3 font-['JetBrains_Mono'] text-xs px-2 py-1 border tracking-widest
          ${ev.status === 'upcoming' ? 'border-[#00D4FF]/40 text-[#00D4FF]/80 bg-[#00D4FF]/5' : 'border-[#222] text-[#7a7a90]'}`}>
          {ev.status?.toUpperCase()}
        </div>
      </div>
      <div className="p-5">
        {ev.date && <div className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs tracking-widest mb-2">{ev.date}</div>}
        <h3 className="font-['Orbitron'] font-bold text-sm text-white group-hover:text-[#00D4FF]
          transition-colors mb-2 leading-snug">{ev.title}</h3>
        <p className="text-[#7a7a90] font-['JetBrains_Mono'] text-xs line-clamp-2 leading-loose">{ev.description}</p>
        {ev.speaker && (
          <div className="mt-3 pt-3 border-t border-[#0e0e1c] font-['JetBrains_Mono'] text-xs text-[#00D4FF]/65">
            <span className="text-[#00D4FF]/60">SPK</span> · {ev.speaker}
          </div>
        )}
      </div>
    </a>
  </Reveal>
)

const EventsSection = () => {
  const [upcoming, setUpcoming] = useState([])
  useEffect(() => {
    API.get('/events').then(r => setUpcoming(r.data.filter(e => e.status === 'upcoming').slice(0, 3))).catch(() => {})
  }, [])

  const displayed = upcoming.length > 0
    ? [...upcoming, ...PAST_EVENTS.slice(0, 3 - upcoming.length)]
    : PAST_EVENTS.slice(0, 3)

  return (
    <section className="relative z-10 py-16 md:py-32 px-6 max-w-6xl mx-auto">
      <Reveal>
        <div className="flex items-end justify-between mb-8 md:mb-14">
          <SectionHead index="02" label="Latest Events" title="Events" />
          <a href="/events" className="hidden md:flex items-center gap-2 font-['JetBrains_Mono'] text-xs
            text-[#00D4FF]/50 tracking-widest hover:text-[#00D4FF] transition-colors mb-8 md:mb-14">
            VIEW ALL →
          </a>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5">
        {displayed.map((ev, i) => <EventCard key={ev.id} ev={ev} delay={i * 80} />)}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════════
const TEAM_TESTIMONIALS = [
  { name: 'Atharv Untwale',   role: 'President',           quote: 'My journey with the ACM Student Chapter has been incredibly rewarding. I started as an Executive Member, learning the fundamentals of organizing events and building a strong tech community. Over time, I took on greater responsibilities, collaborated with amazing teammates, and contributed to initiatives that created real impact on campus. Today, leading the chapter is both an honor and a responsibility. ACM has not only helped me grow as a leader but has also given me the opportunity to inspire and support others in their tech journey.' },
  { name: 'Kasak Tolani',     role: 'Vice President',      quote: 'Working as the Vice President of ACM has been an incredibly meaningful experience for me. This role has allowed me to contribute to the growth of the club while learning valuable leadership and teamwork skills. From helping organize events to supporting the team, every moment has been a great opportunity to learn and collaborate with passionate people. ACM has become a place where ideas grow, friendships build, and I continue to develop both personally and professionally.' },
  { name: 'Hemant Sharma',    role: 'Vice President',      quote: 'Being the Vice President of ACM has been a really great experience for me. It\'s given me the chance to work with an amazing team and be part of organizing things that actually bring people together. There\'s always something new to learn, whether it\'s planning events, solving problems, or just sharing ideas with everyone. What I love most about ACM is the energy of the people and how supportive the community feels.' },
  { name: 'Heenal Jain',      role: 'Operations Head',     quote: 'Working as the Operations and Management Head at ACM has been a truly rewarding part of my college journey. This role has given me the opportunity to coordinate with an amazing team and ensure that our events and initiatives run smoothly. From managing responsibilities to solving challenges during activities, every experience has helped me grow in leadership, organization, and teamwork.' },
  { name: 'Tarang Choure',    role: 'Operations Co-Head',  quote: 'Being the Operations Co-Head at ACM has been an important part of my college journey. It allowed me to work closely with a great team and form strong connections with people who shared my enthusiasm. I managed responsibilities and supported various activities, gaining a lot of knowledge both inside and outside the college.' },
  { name: 'Gaurang Gupta',    role: 'PR Head',             quote: 'Being the Corporate and PR Head at ACM has been a truly transformative journey. ACM has given me the space to grow as a leader, communicator, and strategist. From collaborating with industry partners to building meaningful campus relations, every initiative has strengthened my confidence and shaped my professional identity.' },
  { name: 'Sabhyata Jain',    role: 'PR Co-Head',          quote: 'MU-ACM gave me a platform to combine creativity with purpose. Every campaign we run is a chance to bring more people into the world of technology.' },
  { name: 'Yash Thakur',      role: 'Technical Head',      quote: 'The technical team at MU-ACM is where ideas become reality. We don\'t just talk about building things — we sit down and actually build them.' },
  { name: 'Aditi Agrahari',   role: 'Content Head',        quote: 'Working as the Content Head of ACM has taught me so much. I might be the youngest core member in the team, but that\'s actually what makes it even more exciting — I get to learn, experiment, and bring a fresh perspective. This role has made me more confident and more connected to the club, and I genuinely enjoy every part of it.' },
  { name: 'Ikshit Jain',      role: 'Graphics Head',       quote: 'Working as the Graphics Head of ACM has been an amazing learning experience. Being responsible for the visual identity of the club, I get the opportunity to turn ideas into creative designs that represent our events and initiatives. This role has boosted my confidence and allowed me to contribute meaningfully to the club.' },
  { name: 'Vaishnavi Patidar', role: 'Graphics Co-Head',   quote: 'Being part of the ACM student chapter as Graphics Co-Head has been a truly rewarding experience. This role gave me the opportunity to combine creativity with teamwork while contributing to the chapter\'s activities and events. I\'m grateful for the chance to grow both creatively and professionally as part of the ACM community.' },
  { name: 'Kalash Kale',      role: 'Video Editing Head',  quote: 'Being a part of MU-ACM has been a really amazing journey. As the head of Video Editing and Production, I had the opportunity to work alongside amazing people and be part of a truly supportive team. I not only developed skills in my domain, but gained valuable abilities in teamwork, collaboration, and leadership.' },
  { name: 'Damita Pathak',    role: 'Mentor',              quote: 'Watching this chapter grow has been truly rewarding. The students here have an exceptional drive and a genuine hunger to make a difference.' },
  { name: 'Riddhima Kaushal', role: 'Mentor',              quote: 'MU-ACM represents everything a student community should be — inclusive, driven, and always striving to raise the bar for what\'s possible.' },
  { name: 'Ashwin Parande',   role: 'Mentor',              quote: 'Mentoring at MU-ACM is as much a learning experience for me as it is for the students. The curiosity and creativity here never ceases to inspire.' },
  { name: 'Aadeesh Jain',     role: 'Mentor',              quote: 'The growth I\'ve seen in MU-ACM\'s members — technically and as individuals — is a testament to what a strong community and shared purpose can achieve.' },
]

const TestimonialsSection = () => (
  <section id="testimonials" className="relative z-10 py-16 md:py-32 px-6 border-y border-[#00D4FF]/5">
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <SectionHead index="03" label="Voices" title="What Our Team Says" center />
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEAM_TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={(i % 3) * 70}>
            <div className="border border-[#0e0e1c] hover:border-[#00D4FF]/20 bg-[#06060e]
              p-6 flex flex-col gap-4 h-full transition-all duration-300
              hover:shadow-[0_8px_30px_rgba(0,212,255,0.05)]">
              <div className="font-['Orbitron'] text-[#00D4FF]/45 text-4xl leading-none">"</div>
              <p className="text-[#9090a0] font-['JetBrains_Mono'] text-xs leading-relaxed flex-1">{t.quote}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#0d0d1a]">
                <div className="w-8 h-8 border border-[#00D4FF]/15 bg-[#00D4FF]/5 shrink-0
                  flex items-center justify-center font-['Orbitron'] font-black text-[#00D4FF] text-xs">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-['Orbitron'] font-bold text-xs text-white truncate">{t.name}</div>
                  <div className="font-['JetBrains_Mono'] text-[#00D4FF]/60 text-xs tracking-widest mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ═══════════════════════════════════════════════════════════════
// TEAM
// ═══════════════════════════════════════════════════════════════
const LI = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
const GH = 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z'
const IG = 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'

const Social = ({ href, d }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="text-[#4a4a5e] hover:text-[#00D4FF] transition-colors duration-200 p-1">
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d={d} /></svg>
  </a>
) : null

const MemberCard = ({ m, large = false }) => (
  <div className={`group border border-[#0e0e1c] hover:border-[#00D4FF]/30 bg-[#06060e]
    flex flex-col items-center text-center transition-all duration-400
    hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,212,255,0.08)]
    ${large ? 'p-5' : 'p-3'}`}>
    <div className={`w-full overflow-hidden border border-[#111] group-hover:border-[#00D4FF]/30
      bg-[#0a0a14] transition-colors duration-300 mb-4
      flex items-center justify-center ${large ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
      {m.image
        ? <img src={m.image} alt={m.name}
            className="w-full h-full object-cover object-top transition-all duration-500
              grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal" />
        : <span className={`font-['Orbitron'] font-black text-[#00D4FF]/50
            ${large ? 'text-5xl' : 'text-3xl'}`}>{m.name.charAt(0)}</span>
      }
    </div>
    <h3 className={`font-['Orbitron'] font-bold text-white group-hover:text-[#00D4FF]
      transition-colors leading-tight w-full
      ${large ? 'text-sm mb-1.5' : 'text-xs mb-1'}`}>{m.name}</h3>
    <p className="font-['JetBrains_Mono'] text-[#00D4FF]/50 tracking-widest mb-3 w-full text-xs">{m.role?.toUpperCase()}</p>
    <div className="flex items-center gap-1">
      <Social href={m.linkedin} d={LI} />
      <Social href={m.github} d={GH} />
      <Social href={m.instagram} d={IG} />
    </div>
  </div>
)

const Divider = ({ label }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-1.5 h-1.5 bg-[#00D4FF]/25 rotate-45 shrink-0" />
    <span className="font-['JetBrains_Mono'] text-xs text-[#00D4FF]/55 tracking-[0.4em] uppercase whitespace-nowrap">{label}</span>
    <div className="flex-1 h-px bg-[#0e0e1c]" />
  </div>
)

const HomeTeamSection = () => (
  <section id="team" className="relative z-10 py-16 md:py-32 px-6 max-w-6xl mx-auto">
    <Reveal>
      <div className="flex items-end justify-between mb-8 md:mb-14">
        <SectionHead index="04" label="Core Team" title="The People" />
        <a href="/team" className="hidden md:flex items-center gap-2 font-['JetBrains_Mono'] text-xs
          text-[#00D4FF]/65 tracking-widest hover:text-[#00D4FF] transition-colors mb-8 md:mb-14">
          FULL TEAM →
        </a>
      </div>
    </Reveal>

    <div className="mb-8 md:mb-14">
      <Divider label="Council" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {council.map((m, i) => <Reveal key={i} delay={i * 70}><MemberCard m={m} large /></Reveal>)}
      </div>
    </div>

    <div className="mb-8 md:mb-14">
      <Divider label="Department Heads" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {heads.map((m, i) => <Reveal key={i} delay={i * 45}><MemberCard m={m} /></Reveal>)}
      </div>
    </div>

    <div className="mb-12">
      <Divider label="Mentors" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {mentors.map((m, i) => <Reveal key={i} delay={i * 50}><MemberCard m={m} /></Reveal>)}
      </div>
    </div>

    <Reveal delay={100}>
      <div className="text-center">
        <a href="/team" className="group relative overflow-hidden inline-flex items-center gap-2
          border border-[#00D4FF]/25 text-[#00D4FF]/70 font-['Orbitron'] font-bold text-xs
          px-8 py-3.5 tracking-widest hover:border-[#00D4FF]/50 hover:text-[#00D4FF] transition-all duration-300">
          <span className="absolute inset-0 bg-[#00D4FF]/4 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
          <span className="relative z-10">VIEW FULL TEAM →</span>
        </a>
      </div>
    </Reveal>
  </section>
)

// ═══════════════════════════════════════════════════════════════
// FACULTY — static
// ═══════════════════════════════════════════════════════════════
const FACULTY = [
  {
    name: 'Prof. Dr. Latika Jindal',
    designation: 'Head of Techno Clubs',
    department: 'Medi-Caps University',
    image: '/faculty-latika-jindal.webp',
    statement: 'Add Prof. Dr. Latika Jindal\'s statement here.',
  },
  {
    name: 'Prof. Priyanka Dhasal',
    designation: 'Faculty Coordinator',
    department: 'Medi-Caps University',
    image: '/faculty-priyanka-dhasal.webp',
    statement: 'Add Prof. Priyanka Dhasal\'s statement here.',
  },
]

const FacultySection = () => (
  <section id="faculty" className="relative z-10 py-16 md:py-32 px-6 max-w-6xl mx-auto">
    <Reveal>
      <SectionHead index="05" label="Faculty" title="Faculty Voices" />
    </Reveal>

    <div className="flex flex-col gap-6">
      {FACULTY.map((f, i) => (
        <Reveal key={i} delay={i * 100}>
          <div className="group border border-[#0e0e1c] hover:border-[#00D4FF]/25 bg-[#06060e]
            overflow-hidden transition-all duration-300 flex flex-col md:flex-row
            hover:shadow-[0_12px_40px_rgba(0,212,255,0.06)]">

            <div className="w-full md:w-80 shrink-0 relative overflow-hidden bg-[#0a0a14] flex items-center justify-center"
              style={{ minHeight: '260px' }}>
              {f.image
                ? <img src={f.image} alt={f.name}
                    className="w-full h-full object-cover object-top transition-all duration-500
                      grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal" />
                : <span className="font-['Orbitron'] font-black text-[#00D4FF]/30 text-7xl">
                    {f.name.charAt(0)}
                  </span>
              }
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-[#06060e] pointer-events-none" />
            </div>

            <div className="flex flex-col justify-between p-8 flex-1 border-l border-[#0e0e1c]">
              <div>
                <div className="font-['JetBrains_Mono'] text-[#00D4FF]/65 text-xs tracking-[0.35em] mb-3 uppercase">
                  Faculty
                </div>
                <h3 className="font-['Orbitron'] font-bold text-white text-xl leading-tight mb-2">
                  {f.name}
                </h3>
                <div className="font-['JetBrains_Mono'] text-[#00D4FF]/60 text-xs tracking-widest mb-1">
                  {f.designation}
                </div>
                <div className="font-['JetBrains_Mono'] text-[#6a6a7e] text-xs tracking-widest">
                  {f.department}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#0e0e1c]">
                <div className="font-['Orbitron'] text-[#00D4FF]/25 text-4xl leading-none mb-3">"</div>
                <p className="font-['JetBrains_Mono'] text-[#9090a0] text-sm leading-loose italic">
                  {f.statement}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
)

// ═══════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════
const FAQS = [
  { q:'Who can join MU-ACM?', a:'Any student at Medi-Caps University who has a passion for technology and computing.' },
  { q:'What activities does MU-ACM organize?', a:'Workshops, hackathons, tech talks, coding competitions, and various technical events throughout the year.' },
  { q:'Do I need prior programming experience?', a:'No! MU-ACM welcomes all skill levels — beginners and advanced programmers alike.' },
  { q:'How can I become a member?', a:'Register on our website or reach out on Discord.' },
]

const FAQ = () => {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" className="relative z-10 py-16 md:py-32 px-6 border-t border-[#00D4FF]/5">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <SectionHead index="06" label="FAQ" title="Common Questions" center />
        </Reveal>
        <div className="flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="border border-[#0e0e1c] hover:border-[#00D4FF]/15 bg-[#06060e] overflow-hidden transition-colors duration-300">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-4 text-left group">
                  <span className="font-['JetBrains_Mono'] text-[#00D4FF]/45 text-xs shrink-0 w-6">{String(i+1).padStart(2,'0')}</span>
                  <span className="font-['Orbitron'] font-bold text-xs text-white flex-1 group-hover:text-[#00D4FF]/80 transition-colors">{faq.q}</span>
                  <span className="font-['JetBrains_Mono'] text-[#00D4FF]/65 text-base shrink-0 transition-transform duration-300"
                    style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-32' : 'max-h-0'}`}>
                  <p className="px-16 pb-5 font-['JetBrains_Mono'] text-[#7a7a90] text-xs leading-relaxed border-t border-[#0e0e1c] pt-3">
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
  <section className="relative z-10 py-16 md:py-32 px-6">
    <Reveal>
      <div className="max-w-2xl mx-auto text-center border border-[#00D4FF]/12 bg-[#06060e] p-8 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.03) 0%, transparent 70%)' }} />
        {[['top-0 left-0','border-l border-t'],['top-0 right-0','border-r border-t'],
          ['bottom-0 left-0','border-l border-b'],['bottom-0 right-0','border-r border-b']].map(([p,c])=>(
          <div key={p} className={`absolute ${p} w-5 h-5 ${c} border-[#00D4FF]/30`} />
        ))}
        <div className="relative z-10">
          <div className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs tracking-[0.4em] mb-4">// 07 · JOIN</div>
          <h2 className="font-['Orbitron'] font-black text-3xl md:text-4xl text-white mb-4">
            Ready to join the <span className="text-[#00D4FF]">community</span>?
          </h2>
          <p className="font-['JetBrains_Mono'] text-[#6a6a7e] text-xs mb-10 leading-loose">
            Connect with like-minded tech enthusiasts. Share ideas. Grow together.
          </p>
          <a href="https://discord.com/invite/qaRz3z9rFF" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden inline-block border border-[#00D4FF]/50
              text-[#00D4FF] font-['Orbitron'] font-black text-xs px-10 py-4 tracking-widest
              hover:shadow-[0_0_32px_rgba(0,212,255,0.3)] transition-all duration-400">
            <span className="absolute inset-0 bg-[#00D4FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 group-hover:text-[#020205] transition-colors duration-300">JOIN DISCORD →</span>
          </a>
        </div>
      </div>
    </Reveal>
  </section>
)

// ═══════════════════════════════════════════════════════════════
// PAGE ROOT
// ═══════════════════════════════════════════════════════════════
export default function Home() {
  const { done, lines } = useBootSequence()

  return (
    <>
      <BootScreen lines={lines} done={done} />
      <Starfield />
      <main className="pt-0">
        <Hero visible={done} />
        <Marquee />
        <About />
        <EventsSection />
        <TestimonialsSection />
        <HomeTeamSection />
        <FacultySection />
        <FAQ />
        <JoinSection />
      </main>
    </>
  )
}