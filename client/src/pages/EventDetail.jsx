import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import API from '../utils/api'
import { PAST_EVENTS } from './Events'
import { Reveal } from '../components/animations'

const EventDetail = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    // First check static events
    const staticEvent = PAST_EVENTS.find(e => e.id === id)

    // Then try API
    API.get(`/events/${id}`)
      .then(r => setEvent(r.data))
      .catch(() => {
        // Fall back to static if API fails or not found
        if (staticEvent) setEvent(staticEvent)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <main className="pt-20 min-h-screen flex items-center justify-center">
      <div className="font-['JetBrains_Mono'] text-[#00D4FF]/40 text-xs tracking-widest animate-pulse">
        LOADING EVENT...
      </div>
    </main>
  )

  if (!event) return (
    <main className="pt-20 min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="font-['JetBrains_Mono'] text-[#333] text-xs tracking-widest">
        // EVENT_NOT_FOUND
      </div>
      <Link to="/events"
        className="font-['JetBrains_Mono'] text-xs text-[#00D4FF]/60 hover:text-[#00D4FF]
          border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 px-5 py-2.5 transition-all duration-200">
        ← BACK TO EVENTS
      </Link>
    </main>
  )

  const photos = event.photos?.length > 0 ? event.photos : []
  const highlights = event.highlights?.length > 0 ? event.highlights : []

  return (
    <main className="pt-20 min-h-screen">

      {/* ── Cover image ── */}
      {event.coverImage && (
        <div className="relative w-full overflow-hidden bg-[#0a0a14]" style={{ maxHeight: '480px' }}>
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full object-cover"
            style={{ maxHeight: '480px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020205]/30 via-transparent to-[#020205]/30 pointer-events-none" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">

        {/* ── Back link ── */}
        <Reveal>
          <Link to="/events"
            className="inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs
              text-[#00D4FF]/50 hover:text-[#00D4FF] tracking-widest transition-colors mb-10 group">
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            BACK TO EVENTS
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_300px] gap-10 md:gap-16 items-start">

          {/* ── Left: main content ── */}
          <div>
            <Reveal>
              {/* Tags */}
              {event.tags?.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {event.tags.map(tag => (
                    <span key={tag} className="font-['JetBrains_Mono'] text-xs px-2 py-0.5
                      border border-[#00D4FF]/20 text-[#00D4FF]/60 tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="font-['Orbitron'] font-black text-2xl md:text-4xl text-white leading-tight mb-6">
                {event.title}
              </h1>
            </Reveal>

            {/* Overview */}
            <Reveal delay={80}>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs tracking-[0.35em] uppercase">Overview</span>
                  <div className="flex-1 h-px bg-[#0e0e1c]" />
                </div>
                <p className="font-['JetBrains_Mono'] text-[#9090a0] text-sm leading-loose">
                  {event.overview || event.description}
                </p>
              </div>
            </Reveal>

            {/* Highlights */}
            {highlights.length > 0 && (
              <Reveal delay={120}>
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs tracking-[0.35em] uppercase">Highlights</span>
                    <div className="flex-1 h-px bg-[#0e0e1c]" />
                  </div>
                  <ul className="flex flex-col gap-3">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#00D4FF]/40 mt-1 shrink-0">◆</span>
                        <span className="font-['JetBrains_Mono'] text-[#9090a0] text-sm leading-loose"
                          dangerouslySetInnerHTML={{ __html: h.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-bold">$1</span>') }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {/* Photo grid */}
            {photos.length > 0 && (
              <Reveal delay={160}>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs tracking-[0.35em] uppercase">Photos</span>
                    <div className="flex-1 h-px bg-[#0e0e1c]" />
                    <span className="font-['JetBrains_Mono'] text-[#333] text-xs">{photos.length}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {photos.map((url, i) => (
                      <div key={i}
                        className="aspect-video overflow-hidden border border-[#0e0e1c]
                          hover:border-[#00D4FF]/30 cursor-pointer group transition-all duration-200"
                        onClick={() => setLightbox(url)}>
                        <img src={url} alt={`Photo ${i + 1}`}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100
                            group-hover:scale-105 transition-all duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* ── Right: details sidebar ── */}
          <Reveal delay={100}>
            <div className="border border-[#0e0e1c] bg-[#06060e] p-6 flex flex-col gap-5 sticky top-24">
              <div className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs tracking-[0.35em] uppercase mb-1">
                Event Details
              </div>

              {/* Status */}
              <div className={`self-start font-['JetBrains_Mono'] text-xs px-3 py-1 border tracking-widest
                ${event.status === 'upcoming' || event.status === 'Ongoing'
                  ? 'border-[#00D4FF]/40 text-[#00D4FF] bg-[#00D4FF]/5'
                  : 'border-[#222] text-[#7a7a90]'
                }`}>
                {event.status?.toUpperCase()}
              </div>

              {/* Detail rows */}
              {[
                { icon: '📅', label: 'Date',     val: event.date },
                { icon: '🕐', label: 'Time',     val: event.time },
                { icon: '📍', label: 'Venue',    val: event.venue },
                { icon: '🎤', label: 'Speaker',  val: event.speaker },
                { icon: '👥', label: 'Attended', val: event.attendees ? `${event.attendees} people attended` : null },
              ].filter(r => r.val).map(({ icon, label, val }) => (
                <div key={label} className="flex items-start gap-3 border-t border-[#0e0e1c] pt-4">
                  <span className="text-base shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <div className="font-['JetBrains_Mono'] text-[#00D4FF]/50 text-xs tracking-widest mb-0.5 uppercase">
                      {label}
                    </div>
                    <div className="font-['JetBrains_Mono'] text-[#9090a0] text-xs leading-relaxed">{val}</div>
                  </div>
                </div>
              ))}

              {/* Register link for upcoming */}
              {event.registerLink && (
                <a href={event.registerLink} target="_blank" rel="noopener noreferrer"
                  className="group relative overflow-hidden mt-2 block text-center
                    border border-[#00D4FF]/40 text-[#00D4FF] font-['Orbitron'] font-bold
                    text-xs px-6 py-3 tracking-widest hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]
                    transition-all duration-300">
                  <span className="absolute inset-0 bg-[#00D4FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 group-hover:text-[#020205] transition-colors duration-300">
                    REGISTER →
                  </span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-[#020205]/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Photo"
            className="max-w-full max-h-full object-contain border border-[#00D4FF]/15" />
          <button className="absolute top-6 right-6 font-['JetBrains_Mono'] text-[#00D4FF]/60
            hover:text-[#00D4FF] text-2xl transition-colors">✕</button>
        </div>
      )}
    </main>
  )
}

export default EventDetail