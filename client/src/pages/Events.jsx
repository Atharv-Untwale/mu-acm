import { useEffect, useState } from 'react'
import API from '../utils/api'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    API.get('/events')
      .then(res => setEvents(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? events : events.filter(e => e.status === filter)

  return (
    <main className="pt-24 min-h-screen">
      {/* Header */}
      <section className="py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-accent font-heading text-sm font-semibold tracking-widest uppercase">What We Do</span>
          <h1 className="font-heading font-bold text-5xl md:text-6xl mt-3 mb-4">Our Events</h1>
          <p className="text-gray-400 font-body text-lg">
            Explore all the workshops, talks, and competitions organized by MU-ACM.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 px-6 mb-12">
        {['all', 'upcoming', 'completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full font-heading font-semibold text-sm capitalize transition-colors duration-200 ${
              filter === tab
                ? 'bg-accent text-primary'
                : 'bg-card border border-border text-gray-400 hover:border-accent hover:text-accent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-surface" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-3 bg-surface rounded w-1/4" />
                  <div className="h-5 bg-surface rounded w-3/4" />
                  <div className="h-3 bg-surface rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-24 font-body text-lg">
            No {filter === 'all' ? '' : filter} events found.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map(event => (
              <a
                key={event.id}
                href={`/events/${event.id}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="aspect-video bg-surface overflow-hidden">
                  {event.coverImage ? (
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 font-heading text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-heading font-semibold px-2 py-1 rounded-full ${
                      event.status === 'upcoming'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      {event.status?.toUpperCase()}
                    </span>
                    {event.date && (
                      <span className="text-gray-500 font-body text-xs">{event.date}</span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 font-body text-sm line-clamp-2 mb-4">
                    {event.description}
                  </p>
                  {event.speaker && (
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-body border-t border-border pt-3">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {event.speaker}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Events