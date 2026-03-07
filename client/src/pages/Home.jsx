import { useEffect, useState } from 'react'
import API from '../utils/api'

// ─── HERO SECTION ───────────────────────────────────────────
const Hero = () => (
  <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative z-10 max-w-4xl mx-auto">
      <span className="inline-block bg-accent/10 text-accent border border-accent/20 text-xs font-heading font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
        Technical Community of Students
      </span>

      <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight mb-6">
        We are more than<br />
        just a <span className="text-accent">club</span>
      </h1>

      <p className="text-gray-400 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Get access to exclusive events, workshops, and a community of tech enthusiasts at Medi-Caps University.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://discord.com/invite/qaRz3z9rFF"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent text-primary font-heading font-bold px-8 py-3.5 rounded-full hover:bg-accentDark transition-colors duration-200"
        >
          Join Our Community
        </a>
        <a
          href="/events"
          className="border border-border text-white font-heading font-semibold px-8 py-3.5 rounded-full hover:border-accent hover:text-accent transition-colors duration-200"
        >
          View Events
        </a>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
      <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
      <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
    </div>
  </section>
)

// ─── MARQUEE SECTION ────────────────────────────────────────
const events = ['Fastn Roadshow', 'AINovate', 'Technical Tambola', 'Conquering Canva', 'Video Editing Workshop', 'Hands on Javascript', 'Genesis', 'Chakravyuh', 'Digital Marketing']

const Marquee = () => (
  <div className="border-y border-border py-4 overflow-hidden bg-surface">
    <div className="flex animate-marquee gap-12 whitespace-nowrap">
      {[...events, ...events].map((e, i) => (
        <span key={i} className="text-gray-500 font-heading font-semibold text-sm tracking-widest uppercase flex items-center gap-4">
          {e} <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  </div>
)

// ─── ABOUT SECTION ──────────────────────────────────────────
const About = () => (
  <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-accent font-heading text-sm font-semibold tracking-widest uppercase">About Us</span>
        <h2 className="font-heading font-bold text-4xl md:text-5xl mt-3 mb-6 leading-tight">
          What is <span className="text-accent">MU-ACM</span>?
        </h2>
        <p className="text-gray-400 font-body text-lg leading-relaxed mb-6">
          The ACM (Association for Computing Machinery) is a 75-year-old international scientific and industrial computing society with around 100,000 members spread over 174 countries.
        </p>
        <p className="text-gray-400 font-body text-lg leading-relaxed mb-8">
          The Medi-Caps University ACM Student Chapter is a vibrant community of like-minded individuals with a shared love for technology, dedicated to fostering growth in the world of computing.
        </p>
        <div className="grid grid-cols-3 gap-6">
          {[['100K+', 'ACM Members'], ['174', 'Countries'], ['75+', 'Years Old']].map(([num, label]) => (
            <div key={label} className="text-center p-4 bg-card rounded-xl border border-border">
              <div className="text-accent font-heading font-bold text-2xl">{num}</div>
              <div className="text-gray-500 font-body text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="w-full aspect-square bg-card rounded-2xl border border-border flex items-center justify-center overflow-hidden">
          <img src="/about.webp" alt="About MU-ACM" className="w-full h-full object-cover rounded-2xl opacity-80" />
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
      </div>
    </div>
  </section>
)

// ─── EVENTS SECTION ─────────────────────────────────────────
const EventsSection = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    API.get('/events').then(res => setEvents(res.data.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-accent font-heading text-sm font-semibold tracking-widest uppercase">What we do</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl mt-3">Latest Events</h2>
        </div>
        <a href="/events" className="hidden md:flex items-center gap-2 text-accent font-heading font-semibold hover:gap-3 transition-all duration-200">
          View All <span>→</span>
        </a>
      </div>

      {events.length === 0 ? (
        <div className="text-center text-gray-500 py-16 font-body">No events yet. Check back soon!</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {events.map(event => (
            <a key={event.id} href={`/events/${event.id}`} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-colors duration-200">
              <div className="aspect-video bg-surface overflow-hidden">
                {event.coverImage
                  ? <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  : <div className="w-full h-full flex items-center justify-center text-gray-600 font-heading">No Image</div>
                }
              </div>
              <div className="p-5">
                <span className={`text-xs font-heading font-semibold px-2 py-1 rounded-full ${event.status === 'upcoming' ? 'bg-accent/10 text-accent' : 'bg-gray-800 text-gray-400'}`}>
                  {event.status?.toUpperCase()}
                </span>
                <h3 className="font-heading font-bold text-lg mt-3 mb-2 group-hover:text-accent transition-colors">{event.title}</h3>
                <p className="text-gray-500 font-body text-sm line-clamp-2">{event.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

// ─── TESTIMONIALS SECTION ───────────────────────────────────
const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    API.get('/testimonials').then(res => setTestimonials(res.data)).catch(() => {})
  }, [])

  return (
    <section id="testimonials" className="py-24 px-6 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent font-heading text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl mt-3">Hear What They Say</h2>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center text-gray-500 py-16 font-body">No testimonials yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
                <p className="text-gray-300 font-body text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-heading font-bold text-sm">
                    {t.name?.charAt(0)}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-sm">{t.name}</div>
                    <div className="text-gray-500 font-body text-xs">{t.role} {t.company ? `@ ${t.company}` : ''}</div>
                  </div>
                  {t.type === 'speaker' && (
                    <span className="ml-auto text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-heading">Speaker</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── FACULTY SECTION ────────────────────────────────────────
const FacultySection = () => {
  const [faculty, setFaculty] = useState([])

  useEffect(() => {
    API.get('/faculty').then(res => setFaculty(res.data)).catch(() => {})
  }, [])

  return (
    <section id="faculty" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-accent font-heading text-sm font-semibold tracking-widest uppercase">Faculty</span>
        <h2 className="font-heading font-bold text-4xl md:text-5xl mt-3">What Our Faculty Say</h2>
      </div>

      {faculty.length === 0 ? (
        <div className="text-center text-gray-500 py-16 font-body">No faculty statements yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {faculty.map(f => (
            <div key={f.id} className="bg-card border border-border rounded-2xl p-8 flex gap-6">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex-shrink-0 overflow-hidden">
                {f.image
                  ? <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-accent font-heading font-bold text-xl">{f.name?.charAt(0)}</div>
                }
              </div>
              <div>
                <p className="text-gray-300 font-body text-sm leading-relaxed italic mb-4">"{f.statement}"</p>
                <div className="font-heading font-semibold text-sm">{f.name}</div>
                <div className="text-gray-500 font-body text-xs">{f.designation} — {f.department}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

// ─── FAQ SECTION ────────────────────────────────────────────
const faqs = [
  { q: 'Who can join MU-ACM?', a: 'Any student at Medi-Caps University who has a passion for technology and computing can join MU-ACM.' },
  { q: 'What kind of activities does MU-ACM organize?', a: 'We organize workshops, hackathons, tech talks, coding competitions, and various technical events throughout the year.' },
  { q: 'Do I need prior programming experience?', a: 'No! MU-ACM welcomes students of all skill levels. We have events for beginners as well as advanced programmers.' },
  { q: 'How can I become a member?', a: 'You can join by registering on our website or reaching out to us on Discord.' },
]

const FAQ = () => {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 px-6 bg-surface border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent font-heading text-sm font-semibold tracking-widest uppercase">FAQ</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl mt-3">Common Questions</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-heading font-semibold text-sm">{faq.q}</span>
                <span className="text-accent text-xl">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-gray-400 font-body text-sm leading-relaxed border-t border-border pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── JOIN SECTION ───────────────────────────────────────────
const JoinSection = () => (
  <section className="py-24 px-6">
    <div className="max-w-3xl mx-auto text-center bg-card border border-border rounded-3xl p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
      <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 relative z-10">
        Ready to join this <span className="text-accent">Community?</span>
      </h2>
      <p className="text-gray-400 font-body text-lg mb-8 relative z-10">
        Join our vibrant Discord community! Connect, share, and grow with like-minded enthusiasts.
      </p>
      <a
        href="https://discord.com/invite/qaRz3z9rFF"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 inline-block bg-accent text-primary font-heading font-bold px-10 py-4 rounded-full hover:bg-accentDark transition-colors duration-200 text-lg"
      >
        Join Discord 🚀
      </a>
    </div>
  </section>
)

// ─── MAIN HOME PAGE ─────────────────────────────────────────
const Home = () => {
  return (
    <main className="pt-0">
      <Hero />
      <Marquee />
      <About />
      <EventsSection />
      <TestimonialsSection />
      <FacultySection />
      <FAQ />
      <JoinSection />
    </main>
  )
}

export default Home