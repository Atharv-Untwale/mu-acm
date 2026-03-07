import { useEffect, useState } from 'react'
import API from '../utils/api'

const Gallery = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    API.get('/gallery')
      .then(res => setPhotos(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = ['all', ...new Set(photos.map(p => p.category).filter(Boolean))]
  const filtered = filter === 'all' ? photos : photos.filter(p => p.category === filter)

  return (
    <main className="pt-24 min-h-screen">
      {/* Header */}
      <section className="py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-accent font-heading text-sm font-semibold tracking-widest uppercase">Memories</span>
          <h1 className="font-heading font-bold text-5xl md:text-6xl mt-3 mb-4">Gallery</h1>
          <p className="text-gray-400 font-body text-lg">
            A collection of moments and memories from MU-ACM events.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      {categories.length > 1 && (
        <div className="flex justify-center gap-3 px-6 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-heading font-semibold text-sm capitalize transition-colors duration-200 ${
                filter === cat
                  ? 'bg-accent text-primary'
                  : 'bg-card border border-border text-gray-400 hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        {loading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl animate-pulse break-inside-avoid"
                style={{ height: `${Math.random() * 150 + 150}px` }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-24 font-body text-lg">
            No photos yet. Check back soon!
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map(photo => (
              <div
                key={photo.id}
                className="break-inside-avoid group relative overflow-hidden rounded-xl border border-border cursor-pointer hover:border-accent/50 transition-all duration-200"
                onClick={() => setSelected(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.caption || 'Gallery photo'}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {photo.caption && (
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                    <p className="text-white font-body text-sm">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-primary/95 z-50 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            onClick={() => setSelected(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={selected.url}
              alt={selected.caption}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            {selected.caption && (
              <p className="text-gray-400 font-body text-sm text-center mt-4">{selected.caption}</p>
            )}
            {selected.event && (
              <p className="text-accent font-heading text-xs text-center mt-1 uppercase tracking-widest">{selected.event}</p>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default Gallery