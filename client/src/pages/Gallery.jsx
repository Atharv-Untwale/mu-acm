import { useState } from 'react'
import { Reveal } from '../components/animations'

// ─── ADD YOUR IMAGES HERE ─────────────────────────────────────
// Place images in client/public/Gallery/ and reference as '/Gallery/filename.jpg'
// caption and category are optional
const GALLERY = [
  // ── Example entries — replace with your real images ──────────
  { src: '/Gallery/DSC01663 (3).jpg.jpeg',       caption: 'Genesis',              category: 'Events' },
  { src: '/Gallery/IMG_20250911_010629.jpg.jpeg',       caption: 'Genesis',              category: 'Events' },
  { src: '/Gallery/genesis-3.jpg',       caption: 'Genesis',              category: 'Events' },
  { src: '/Gallery/IMG-20250707-WA0020.jpg.jpeg',       caption: 'open_source',              category: 'Events' },
  { src: '/Gallery/hacksangram-1.jpg',   caption: 'HackSangram',          category: 'Events' },
  { src: '/Gallery/hacksangram-2.jpg',   caption: 'HackSangram',          category: 'Events' },
  { src: '/Gallery/hacksangram-3.jpg',   caption: 'HackSangram',          category: 'Events' },
  { src: '/Gallery/hacksheild-1.jpg',    caption: 'HackShield',           category: 'Events' },
  { src: '/Gallery/hacksheild-2.jpg',    caption: 'HackShield',           category: 'Events' },
  { src: '/Gallery/atharv 2.png',    caption: 'Chakravyuh_2.0',           category: 'Events' },
  { src: '/Gallery/IMG20250327143739.jpg',    caption: 'Chakravyuh',           category: 'Events' },
  { src: '/Gallery/ainovate-1.jpg',      caption: 'AINovate',             category: 'Events' },
  { src: '/Gallery/Team.png',          caption: 'Core Team',            category: 'Team' },
  { src: '/Gallery/20260120_124728(0).jpg.jpeg',          caption: 'Core Team',            category: 'Team' },
  { src: '/Gallery/1740076308621.jpg.jpeg',          caption: 'Core Team',            category: 'Team' },
  { src: '/Gallery/IMG20251102150333.jpg',           caption: 'Behind the Scenes',    category: 'BTS' },
  { src: '/Gallery/IMG20250322224634.jpg',           caption: 'Behind the Scenes',    category: 'BTS' },
  { src: '/Gallery/IMG20251009143008.jpg',           caption: 'Behind the Scenes',    category: 'BTS' },
    { src: '/Gallery/IMG_3757.jpg',           caption: 'Fun',    category: 'Fun' },
]

// ─── Unique categories from the data ─────────────────────────
const CATEGORIES = ['All', ...new Set(GALLERY.map(g => g.category).filter(Boolean))]

// ─── Filter pill ──────────────────────────────────────────────
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

// ─── Gallery Page ─────────────────────────────────────────────
const Gallery = () => {
  const [filter, setFilter]   = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'All' ? GALLERY : GALLERY.filter(g => g.category === filter)

  return (
    <main className="pt-20 min-h-screen">

      {/* ── Header ── */}
      <section className="relative py-12 md:py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
        <div className="absolute top-8 left-6 w-8 h-8 border-l border-t border-[#00D4FF]/15 pointer-events-none" />
        <div className="absolute top-8 right-6 w-8 h-8 border-r border-t border-[#00D4FF]/15 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-['JetBrains_Mono'] text-[#00D4FF]/55 text-xs">06</span>
            <div className="w-5 h-px bg-[#00D4FF]/25" />
            <span className="font-['JetBrains_Mono'] text-[#00D4FF]/60 text-xs tracking-[0.35em] uppercase">Gallery</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-2xl md:text-5xl text-white mb-4">
            Our <span className="text-[#00D4FF]">Moments</span>
          </h1>
          <p className="font-['JetBrains_Mono'] text-[#7a7a90] text-xs leading-loose max-w-lg mx-auto">
            A visual record of everything MU-ACM has built, celebrated, and experienced together.
          </p>

          {/* Count */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="font-['Orbitron'] font-black text-2xl text-[#00D4FF]">{GALLERY.length}</span>
            <span className="font-['JetBrains_Mono'] text-[#444] text-xs tracking-widest uppercase">Photos</span>
          </div>
        </div>
      </section>

      {/* ── Filter pills ── */}
      <div className="flex justify-center gap-2 px-6 mb-10 flex-wrap">
        {CATEGORIES.map(cat => (
          <Pill key={cat} label={cat} active={filter === cat} onClick={() => setFilter(cat)} />
        ))}
      </div>

      {/* ── Grid ── */}
      <section className="px-6 pb-16 md:pb-32 max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-32 font-['JetBrains_Mono'] text-[#1a1a2e] text-xs tracking-widest">
            // NO_PHOTOS_FOUND
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {filtered.map((img, i) => (
              <Reveal key={i} delay={(i % 3) * 50}>
                <div
                  className="break-inside-avoid group border border-[#0e0e1c] hover:border-[#00D4FF]/30
                    overflow-hidden cursor-pointer transition-all duration-300 relative
                    hover:shadow-[0_8px_30px_rgba(0,212,255,0.08)]"
                  onClick={() => setLightbox(img)}>
                  <img
                    src={img.src}
                    alt={img.caption || 'Gallery photo'}
                    className="w-full object-cover block transition-all duration-500
                      group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay with caption */}
                  {img.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/80 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <div>
                        <div className="font-['Orbitron'] font-bold text-xs text-white leading-tight">
                          {img.caption}
                        </div>
                        {img.category && (
                          <div className="font-['JetBrains_Mono'] text-[10px] text-[#00D4FF]/60 tracking-widest mt-0.5">
                            {img.category.toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-[#020205]/96 flex flex-col items-center justify-center p-6 md:p-12"
          onClick={() => setLightbox(null)}>
          <button
            className="absolute top-6 right-6 font-['JetBrains_Mono'] text-[#00D4FF]/50
              hover:text-[#00D4FF] text-2xl transition-colors z-10"
            onClick={() => setLightbox(null)}>
            ✕
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.caption || 'Photo'}
            className="max-w-full max-h-[80vh] object-contain border border-[#00D4FF]/10"
            onClick={e => e.stopPropagation()}
          />
          {lightbox.caption && (
            <div className="mt-4 text-center">
              <div className="font-['Orbitron'] font-bold text-sm text-white">{lightbox.caption}</div>
              {lightbox.category && (
                <div className="font-['JetBrains_Mono'] text-xs text-[#00D4FF]/50 tracking-widest mt-1">
                  {lightbox.category.toUpperCase()}
                </div>
              )}
            </div>
          )}

          {/* Prev / Next */}
          <div className="flex gap-4 mt-6">
            <button
              className="font-['JetBrains_Mono'] text-xs text-[#00D4FF]/50 hover:text-[#00D4FF]
                border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 px-4 py-2 transition-all duration-200"
              onClick={e => {
                e.stopPropagation()
                const idx = filtered.findIndex(g => g.src === lightbox.src)
                setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length])
              }}>
              ← PREV
            </button>
            <button
              className="font-['JetBrains_Mono'] text-xs text-[#00D4FF]/50 hover:text-[#00D4FF]
                border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 px-4 py-2 transition-all duration-200"
              onClick={e => {
                e.stopPropagation()
                const idx = filtered.findIndex(g => g.src === lightbox.src)
                setLightbox(filtered[(idx + 1) % filtered.length])
              }}>
              NEXT →
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Gallery