import { useEffect, useState } from 'react'
import API from '../utils/api'

const Team = () => {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/team')
      .then(res => setTeam(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const coreTeam = team.filter(m => m.category === 'core')
  const mentors = team.filter(m => m.category === 'mentor')

  return (
    <main className="pt-24 min-h-screen">
      {/* Header */}
      <section className="py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-accent font-heading text-sm font-semibold tracking-widest uppercase">The People</span>
          <h1 className="font-heading font-bold text-5xl md:text-6xl mt-3 mb-4">Our Team</h1>
          <p className="text-gray-400 font-body text-lg">
            The folks with amazing talent driving MU-ACM forward.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center gap-3 animate-pulse">
                <div className="w-20 h-20 rounded-full bg-surface" />
                <div className="h-4 bg-surface rounded w-3/4" />
                <div className="h-3 bg-surface rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ) : team.length === 0 ? (
        <div className="text-center text-gray-500 py-24 font-body text-lg">
          No team members yet.
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 pb-24">
          {/* Core Team */}
          {coreTeam.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-heading font-bold text-2xl">Core Team</h2>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {coreTeam.map(member => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* Mentors */}
          {mentors.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-heading font-bold text-2xl">Mentors</h2>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {mentors.map(member => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}

const MemberCard = ({ member }) => (
  <div className="group bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center hover:border-accent/50 transition-all duration-200 hover:-translate-y-1">
    <div className="w-20 h-20 rounded-full overflow-hidden bg-accent/10 mb-4 flex-shrink-0">
      {member.image ? (
        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-accent font-heading font-bold text-2xl">
          {member.name?.charAt(0)}
        </div>
      )}
    </div>
    <h3 className="font-heading font-bold text-sm group-hover:text-accent transition-colors">{member.name}</h3>
    <p className="text-gray-500 font-body text-xs mt-1">{member.role}</p>
    <div className="flex items-center gap-3 mt-3">
      {member.linkedin && (
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      )}
      {member.github && (
        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      )}
    </div>
  </div>
)

export default Team