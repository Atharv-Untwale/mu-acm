import { useEffect, useState } from 'react'
import API from '../utils/api'
import { Reveal } from '../components/animations'

// ─── All past events (static, from old site) ──────────────────
export const PAST_EVENTS = [
  {
    id: 'code_canvas',
    title: 'Code Canvas',
    date: 'March 2026',
    status: 'Ongoing',
    coverImage: '/Events/Code Canvas.png',
    description: 'The founding event of MU-ACM — a celebration of community, technology, and the beginning of something extraordinary at Medi-Caps University.',
    speaker: null,
    tags: ['Web Development'],
  },
  {
    id: 'vertex',
    title: 'Getting Started With Vertex AI',
    date: 'February 2026',
    status: 'completed',
    coverImage: '/Events/Vertex AI.png',
    description: 'The founding event of MU-ACM — a celebration of community, technology, and the beginning of something extraordinary at Medi-Caps University.',
    speaker: 'Mr. Abhishek Raj Permani',
    tags: ['AI', 'Agentic AI'],
  },
  {
    id: 'chakkravyuh_2.0',
    title: 'Chakravyuh 2.0: The Escape Room',
    date: 'February 2026',
    status: 'completed',
    coverImage: '/Events/Poster (7).png',
    description: 'The founding event of MU-ACM — a celebration of community, technology, and the beginning of something extraordinary at Medi-Caps University.',
    speaker: null,
    tags: ['Game'],
  },
  {
    id: 'genesis',
    title: 'Genesis: A Web3 Awakening',
    date: 'Jul 2024',
    status: 'completed',
    coverImage: '/events/genesis.webp',
    description: 'The founding event of MU-ACM — a celebration of community, technology, and the beginning of something extraordinary at Medi-Caps University.',
    speaker: 'Mr. Anurag Bajpai & Mr. Jasneet Singh Saini',
    tags: ['Community', 'Web3'],
  },
  {
    id: 'basics-of-javascript',
    title: 'Basics of Javascript',
    date: 'Feb 2025',
    status: 'completed',
    coverImage: '/events/basics-of-js.webp',
    description: 'A free online workshop introducing participants to the fundamentals and practical applications of JavaScript. Covered variables, functions, DOM manipulation and more.',
    speaker: 'Mr. Swayam Prajapat — Full Stack Developer',
    tags: ['Workshop', 'Web Dev'],
  },
  {
    id: 'fundamentals-of-video-editing',
    title: 'Fundamentals of Video Editing',
    date: 'Jan 2025',
    status: 'completed',
    coverImage: '/events/editing.webp',
    description: 'A hands-on workshop covering the core principles of video editing — storytelling through cuts, color grading, transitions, and industry-standard tools.',
    speaker: 'Mr. Ram Krishna Swarnkar',
    tags: ['Workshop', 'Design'],
  },
  {
    id: 'digital-marketing',
    title: 'Leveraging AI in Digital Marketing',
    date: 'Dec 2024',
    status: 'completed',
    coverImage: '/events/dm.webp',
    description: 'Expert sessions exploring the intersection of AI and digital marketing — AI-driven strategies, personalised campaigns, data-driven decisions and customer engagement.',
    speaker: 'Mr. Kaustubh Joshi',
    tags: ['Workshop', 'AI'],
  },
  {
    id: 'conquering-canva',
    title: 'Conquering Canva',
    date: 'Nov 2024',
    status: 'completed',
    coverImage: '/events/canva.webp',
    description: 'A creative workshop teaching students to design professional graphics, posters, and social media content using Canva — no prior design experience required.',
    speaker: 'Ms. Aditi Pathak',
    tags: ['Workshop', 'Design'],
  },
  {
    id: 'technical-tambola',
    title: 'Technical Tambola',
    date: 'Oct 2024',
    status: 'completed',
    coverImage: '/events/tambola.webp',
    description: 'A unique twist on the classic Tambola — tech trivia edition. Test your knowledge of computing concepts in a fun, high-energy competitive format.',
    speaker: null,
    tags: ['Competition', 'Fun'],
  },
  {
    id: 'ainovate',
    title: 'AINovate',
    date: 'Sep 2024',
    status: 'completed',
    coverImage: '/events/ainovate.webp',
    description: 'An innovation-focused event exploring the frontiers of Artificial Intelligence — from generative AI models to real-world industry applications and future trends.',
    speaker: 'Mr. Lokesh Sukhwal',
    tags: ['AI', 'Innovation'],
  },
  {
    id: 'fastn-roadshow',
    title: 'Fastn Roadshow',
    date: 'Aug 2024',
    status: 'completed',
    coverImage: '/events/fastn.webp',
    description: 'A roadshow in collaboration with Fastn, introducing students to the next generation of web development tools, low-code platforms, and modern workflows.',
    speaker: null,
    tags: ['Web Dev', 'Industry'],
  },
]

// ─── Event Card ───────────────────────────────────────────────
const EventCard = ({ ev, i = 0 }) => (
  <Reveal delay={(i % 3) * 70}>
    <a href={`/events/${ev.id}`}
      className="group block border border-[#0e0e1c] hover:border-[#00D4FF]/30
        bg-[#06060e] overflow-hidden transition-all duration-300
        hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,212,255,0.07)]">
      <div className="aspect-video overflow-hidden relative bg-[#0a0a14]">
        {ev.coverImage
          ? <img src={ev.coverImage} alt={ev.title}
              className="w-full h-full object-cover opacity-50 group-hover:opacity-80
                group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0" />
          : <div className="w-full h-full flex items-center justify-center
              font-['JetBrains_Mono'] text-xs text-[#1a1a2e]">// NO_IMAGE</div>
        }
        <div className={`absolute top-3 right-3 font-['JetBrains_Mono'] text-xs px-2 py-1
          border tracking-widest backdrop-blur-sm
          ${ev.status === 'upcoming' || ev.status === 'Ongoing'
            ? 'border-[#00D4FF]/50 text-[#00D4FF] bg-[#00D4FF]/10'
            : 'border-[#222] text-[#7a7a90] bg-[#020205]/60'
          }`}>
          {ev.status?.toUpperCase()}
        </div>
        {ev.tags?.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {ev.tags.map(tag => (
              <span key={tag} className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5
                border border-[#00D4FF]/15 text-[#00D4FF]/65 bg-[#020205]/70 tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-5">
        {ev.date && (
          <div className="font-['JetBrains_Mono'] text-[#00D4FF]/60 text-xs tracking-widest mb-2">
            {ev.date}
          </div>
        )}
        <h3 className="font-['Orbitron'] font-bold text-sm text-white group-hover:text-[#00D4FF]
          transition-colors mb-2 leading-snug">{ev.title}</h3>
        <p className="text-[#7a7a90] font-['JetBrains_Mono'] text-xs line-clamp-2 leading-loose">
          {ev.description}
        </p>
        {ev.speaker && (
          <div className="mt-3 pt-3 border-t border-[#0e0e1c] font-['JetBrains_Mono'] text-xs
            text-[#00D4FF]/65 flex items-center gap-2">
            <span className="text-[#00D4FF]/60 font-bold">SPK</span>
            <span className="truncate">{ev.speaker}</span>
          </div>
        )}
      </div>
    </a>
  </Reveal>
)

const Pill = ({ label, active, onClick }) => (
  <button onClick={onClick}
    className={`font-['JetBrains_Mono'] text-xs tracking-widest px-4 py-2 border
      transition-all duration-200
      ${active
        ? 'border-[#00D4FF]/60 text-[#00D4FF] bg-[#00D4FF]/5'
        : 'border-[#111] text-[#6a6a7e] hover:border-[#00D4FF]/25 hover:text-[#00D4FF]/60'
      }`}>
    {label.toUpperCase()}
  </button>
)

const Events = () => {
  const [apiEvents, setApiEvents] = useState([])
  const [filter, setFilter]       = useState('all')
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    API.get('/events')
      .then(r => setApiEvents(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const apiIds    = new Set(apiEvents.map(e => e.id))
  const allEvents = [...apiEvents, ...PAST_EVENTS.filter(e => !apiIds.has(e.id))]

  const filtered       = filter === 'all' ? allEvents : allEvents.filter(e => e.status === filter)
  const upcomingCount  = allEvents.filter(e => e.status === 'upcoming' || e.status === 'Ongoing').length
  const completedCount = allEvents.filter(e => e.status === 'completed').length

  return (
    <main className="pt-20 min-h-screen">
      <section className="relative py-12 md:py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
        <div className="absolute top-8 left-6 w-8 h-8 border-l border-t border-[#00D4FF]/15 pointer-events-none" />
        <div className="absolute top-8 right-6 w-8 h-8 border-r border-t border-[#00D4FF]/15 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs">02</span>
            <div className="w-5 h-px bg-[#00D4FF]/25" />
            <span className="font-['JetBrains_Mono'] text-[#00D4FF]/60 text-xs tracking-[0.35em] uppercase">Events</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-2xl md:text-5xl text-white mb-4">
            Our <span className="text-[#00D4FF]">Events</span>
          </h1>
          <p className="font-['JetBrains_Mono'] text-[#7a7a90] text-xs leading-loose tracking-wide max-w-lg mx-auto">
            Workshops, hackathons, tech talks and competitions — everything MU-ACM has organized and what's coming next.
          </p>
          <div className="flex items-center justify-center gap-8 mt-10">
            {[
              { val: allEvents.length,  label: 'Total',     color: 'text-white' },
              { val: upcomingCount,     label: 'Upcoming',  color: 'text-[#00FF94]' },
              { val: completedCount,    label: 'Completed', color: 'text-[#00D4FF]' },
            ].map(({ val, label, color }, i, arr) => (
              <div key={label} className="flex items-center gap-8">
                <div className="text-center">
                  <div className={`font-['Orbitron'] font-black text-2xl ${color}`}>{val}</div>
                  <div className="font-['JetBrains_Mono'] text-[#6a6a7e] text-xs tracking-widest mt-0.5 uppercase">{label}</div>
                </div>
                {i < arr.length - 1 && <div className="w-px h-8 bg-[#0e0e1c]" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-center gap-2 px-6 mb-12">
        {['all', 'upcoming', 'completed'].map(tab => (
          <Pill key={tab} label={tab} active={filter === tab} onClick={() => setFilter(tab)} />
        ))}
      </div>

      <section className="px-6 pb-16 md:pb-32 max-w-6xl mx-auto">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-[#0e0e1c] bg-[#06060e] overflow-hidden animate-pulse">
                <div className="aspect-video bg-[#0a0a14]" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-2 bg-[#0a0a14] rounded w-1/4" />
                  <div className="h-4 bg-[#0a0a14] rounded w-3/4" />
                  <div className="h-2 bg-[#0a0a14] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 md:py-32 font-['JetBrains_Mono'] text-[#1a1a2e] text-xs tracking-widest">
            // NO_{filter.toUpperCase()}_EVENTS_FOUND
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {filtered.map((ev, i) => <EventCard key={ev.id} ev={ev} i={i} />)}
          </div>
        )}
      </section>
    </main>
  )
}

export default Events