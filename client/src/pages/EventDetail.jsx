import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import API from '../utils/api'

const EventDetail = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get(`/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <main className="pt-24 min-h-screen flex items-center justify-center">
      <div className="text-gray-500 font-body animate-pulse">Loading event...</div>
    </main>
  )

  if (!event) return (
    <main className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="font-heading font-bold text-3xl">Event not found</h2>
      <Link to="/events" className="text-accent font-heading hover:underline">Back to Events</Link>
    </main>
  )

  return (
    <main className="pt-24 min-h-screen">
      {/* Back Button */}
      <div className="px-6 max-w-5xl mx-auto pt-8">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-accent font-heading text-sm transition-colors"
        >
          <span>←</span> Back to Events
        </Link>
      </div>

      {/* Cover Image */}
      {event.coverImage && (
        <div className="max-w-5xl mx-auto px-6 mt-6">
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border">
            <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="md:col-span-2">
            <span className={`text-xs font-heading font-semibold px-2 py-1 rounded-full ${
              event.status === 'upcoming' ? 'bg-accent/10 text-accent' : 'bg-gray-800 text-gray-400'
            }`}>
              {event.status?.toUpperCase()}
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mt-4 mb-6">{event.title}</h1>
            <p className="text-gray-300 font-body text-lg leading-relaxed">{event.description}</p>

            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {event.tags.map(tag => (
                  <span key={tag} className="bg-card border border-border text-gray-400 font-body text-xs px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="font-heading font-semibold text-sm text-gray-400 uppercase tracking-widest">Event Details</h3>

              {event.date && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-body">Date</div>
                    <div className="text-sm font-heading font-semibold">{event.date}</div>
                  </div>
                </div>
              )}

              {event.speaker && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-body">Speaker</div>
                    <div className="text-sm font-heading font-semibold">{event.speaker}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default EventDetail