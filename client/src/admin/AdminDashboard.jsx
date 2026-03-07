import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../utils/api'
import toast from 'react-hot-toast'

// ─── SIDEBAR ────────────────────────────────────────────────
const navItems = [
  { path: '/admin', label: 'Dashboard', icon: '⊞', exact: true },
  { path: '/admin/events', label: 'Events', icon: '📅' },
  { path: '/admin/team', label: 'Team', icon: '👥' },
  { path: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { path: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
  { path: '/admin/faculty', label: 'Faculty', icon: '🎓' },
]

const Sidebar = ({ onLogout }) => {
  const location = useLocation()
  return (
    <aside className="w-64 min-h-screen bg-surface border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <span className="text-accent font-heading font-bold text-xl">MU<span className="text-white">-ACM</span></span>
        <p className="text-gray-500 font-body text-xs mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map(item => {
          const active = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path) && item.path !== '/admin'
              ? true
              : location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm transition-colors duration-150 ${
                active ? 'bg-accent/10 text-accent font-semibold' : 'text-gray-400 hover:text-white hover:bg-card'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors duration-150"
        >
          <span>→</span> Logout
        </button>
      </div>
    </aside>
  )
}

// ─── OVERVIEW ───────────────────────────────────────────────
const Overview = () => {
  const [counts, setCounts] = useState({ events: 0, team: 0, gallery: 0, testimonials: 0, faculty: 0 })

  useEffect(() => {
    Promise.all([
      API.get('/events'), API.get('/team'), API.get('/gallery'),
      API.get('/testimonials'), API.get('/faculty')
    ]).then(([e, t, g, te, f]) => {
      setCounts({ events: e.data.length, team: t.data.length, gallery: g.data.length, testimonials: te.data.length, faculty: f.data.length })
    }).catch(() => {})
  }, [])

  const stats = [
    { label: 'Events', value: counts.events, icon: '📅', path: '/admin/events' },
    { label: 'Team Members', value: counts.team, icon: '👥', path: '/admin/team' },
    { label: 'Gallery Photos', value: counts.gallery, icon: '🖼️', path: '/admin/gallery' },
    { label: 'Testimonials', value: counts.testimonials, icon: '💬', path: '/admin/testimonials' },
    { label: 'Faculty', value: counts.faculty, icon: '🎓', path: '/admin/faculty' },
  ]

  return (
    <div>
      <h1 className="font-heading font-bold text-3xl mb-2">Dashboard</h1>
      <p className="text-gray-500 font-body text-sm mb-8">Welcome back! Here's an overview of your website content.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(stat => (
          <Link key={stat.label} to={stat.path} className="bg-card border border-border rounded-2xl p-5 hover:border-accent/50 transition-colors">
            <div className="text-2xl mb-3">{stat.icon}</div>
            <div className="font-heading font-bold text-3xl text-accent">{stat.value}</div>
            <div className="text-gray-500 font-body text-xs mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── EVENTS MANAGER ─────────────────────────────────────────
const EventsManager = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', date: '', status: 'upcoming', coverImage: '', speaker: '', tags: '' })

  const fetchEvents = () => {
    API.get('/events').then(res => setEvents(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchEvents() }, [])

  const resetForm = () => {
    setForm({ title: '', description: '', date: '', status: 'upcoming', coverImage: '', speaker: '', tags: '' })
    setEditing(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
    try {
      if (editing) {
        await API.put(`/events/${editing}`, payload)
        toast.success('Event updated!')
      } else {
        await API.post('/events', payload)
        toast.success('Event created!')
      }
      fetchEvents()
      resetForm()
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleEdit = (event) => {
    setForm({ ...event, tags: event.tags?.join(', ') || '' })
    setEditing(event.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return
    try {
      await API.delete(`/events/${id}`)
      toast.success('Event deleted!')
      fetchEvents()
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-3xl">Events</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-accent text-primary font-heading font-semibold text-sm px-5 py-2 rounded-xl hover:bg-accentDark transition-colors">
          + Add Event
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="font-heading font-bold text-lg mb-4">{editing ? 'Edit Event' : 'New Event'}</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <FormInput label="Title" value={form.title} onChange={v => setForm({ ...form, title: v })} required />
            <FormInput label="Speaker" value={form.speaker} onChange={v => setForm({ ...form, speaker: v })} />
            <FormInput label="Date" type="date" value={form.date} onChange={v => setForm({ ...form, date: v })} />
            <FormSelect label="Status" value={form.status} onChange={v => setForm({ ...form, status: v })} options={['upcoming', 'completed']} />
            <FormInput label="Cover Image URL" value={form.coverImage} onChange={v => setForm({ ...form, coverImage: v })} />
            <FormInput label="Tags (comma separated)" value={form.tags} onChange={v => setForm({ ...form, tags: v })} />
            <div className="md:col-span-2">
              <label className="text-gray-400 font-body text-sm mb-1.5 block">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-accent text-primary font-heading font-semibold text-sm px-6 py-2 rounded-xl hover:bg-accentDark transition-colors">
                {editing ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={resetForm} className="bg-card border border-border text-gray-400 font-heading font-semibold text-sm px-6 py-2 rounded-xl hover:border-gray-500 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="text-gray-500 font-body text-sm">Loading...</div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-500 py-16 font-body">No events yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {events.map(event => (
            <div key={event.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {event.coverImage && (
                  <img src={event.coverImage} alt={event.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <h3 className="font-heading font-semibold text-sm truncate">{event.title}</h3>
                  <p className="text-gray-500 font-body text-xs mt-0.5">{event.date} · {event.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(event)} className="text-gray-400 hover:text-accent font-body text-xs px-3 py-1.5 rounded-lg border border-border hover:border-accent transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(event.id)} className="text-gray-400 hover:text-red-400 font-body text-xs px-3 py-1.5 rounded-lg border border-border hover:border-red-400 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── TEAM MANAGER ───────────────────────────────────────────
const TeamManager = () => {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', role: '', image: '', category: 'core', order: 0, linkedin: '', github: '' })

  const fetchTeam = () => API.get('/team').then(res => setTeam(res.data)).finally(() => setLoading(false))
  useEffect(() => { fetchTeam() }, [])

  const resetForm = () => { setForm({ name: '', role: '', image: '', category: 'core', order: 0, linkedin: '', github: '' }); setEditing(null); setShowForm(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) { await API.put(`/team/${editing}`, form); toast.success('Member updated!') }
      else { await API.post('/team', form); toast.success('Member added!') }
      fetchTeam(); resetForm()
    } catch { toast.error('Something went wrong') }
  }

  const handleEdit = (m) => { setForm(m); setEditing(m.id); setShowForm(true) }
  const handleDelete = async (id) => {
    if (!confirm('Delete this member?')) return
    try { await API.delete(`/team/${id}`); toast.success('Deleted!'); fetchTeam() }
    catch { toast.error('Something went wrong') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-3xl">Team</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-accent text-primary font-heading font-semibold text-sm px-5 py-2 rounded-xl hover:bg-accentDark transition-colors">+ Add Member</button>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="font-heading font-bold text-lg mb-4">{editing ? 'Edit Member' : 'New Member'}</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <FormInput label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
            <FormInput label="Role" value={form.role} onChange={v => setForm({ ...form, role: v })} required />
            <FormInput label="Image URL" value={form.image} onChange={v => setForm({ ...form, image: v })} />
            <FormSelect label="Category" value={form.category} onChange={v => setForm({ ...form, category: v })} options={['core', 'mentor']} />
            <FormInput label="Order" type="number" value={form.order} onChange={v => setForm({ ...form, order: Number(v) })} />
            <FormInput label="LinkedIn URL" value={form.linkedin} onChange={v => setForm({ ...form, linkedin: v })} />
            <FormInput label="GitHub URL" value={form.github} onChange={v => setForm({ ...form, github: v })} />
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-accent text-primary font-heading font-semibold text-sm px-6 py-2 rounded-xl hover:bg-accentDark transition-colors">{editing ? 'Update' : 'Add'}</button>
              <button type="button" onClick={resetForm} className="bg-card border border-border text-gray-400 font-heading font-semibold text-sm px-6 py-2 rounded-xl hover:border-gray-500 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="text-gray-500 font-body text-sm">Loading...</div> : team.length === 0 ? (
        <div className="text-center text-gray-500 py-16 font-body">No team members yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {team.map(m => (
            <div key={m.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex-shrink-0 overflow-hidden">
                  {m.image ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-accent font-heading font-bold">{m.name?.charAt(0)}</div>}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm">{m.name}</h3>
                  <p className="text-gray-500 font-body text-xs">{m.role} · {m.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(m)} className="text-gray-400 hover:text-accent font-body text-xs px-3 py-1.5 rounded-lg border border-border hover:border-accent transition-colors">Edit</button>
                <button onClick={() => handleDelete(m.id)} className="text-gray-400 hover:text-red-400 font-body text-xs px-3 py-1.5 rounded-lg border border-border hover:border-red-400 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── GALLERY MANAGER ────────────────────────────────────────
const GalleryManager = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ url: '', caption: '', event: '', category: 'general' })

  const fetchPhotos = () => API.get('/gallery').then(res => setPhotos(res.data)).finally(() => setLoading(false))
  useEffect(() => { fetchPhotos() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try { await API.post('/gallery', form); toast.success('Photo added!'); fetchPhotos(); setForm({ url: '', caption: '', event: '', category: 'general' }); setShowForm(false) }
    catch { toast.error('Something went wrong') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this photo?')) return
    try { await API.delete(`/gallery/${id}`); toast.success('Deleted!'); fetchPhotos() }
    catch { toast.error('Something went wrong') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-3xl">Gallery</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-accent text-primary font-heading font-semibold text-sm px-5 py-2 rounded-xl hover:bg-accentDark transition-colors">+ Add Photo</button>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="font-heading font-bold text-lg mb-4">Add Photo</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <FormInput label="Image URL" value={form.url} onChange={v => setForm({ ...form, url: v })} required />
            <FormInput label="Caption" value={form.caption} onChange={v => setForm({ ...form, caption: v })} />
            <FormInput label="Event Name" value={form.event} onChange={v => setForm({ ...form, event: v })} />
            <FormInput label="Category" value={form.category} onChange={v => setForm({ ...form, category: v })} />
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-accent text-primary font-heading font-semibold text-sm px-6 py-2 rounded-xl hover:bg-accentDark transition-colors">Add</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-card border border-border text-gray-400 font-heading font-semibold text-sm px-6 py-2 rounded-xl hover:border-gray-500 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="text-gray-500 font-body text-sm">Loading...</div> : photos.length === 0 ? (
        <div className="text-center text-gray-500 py-16 font-body">No photos yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="group relative bg-card border border-border rounded-xl overflow-hidden">
              <img src={photo.url} alt={photo.caption} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => handleDelete(photo.id)} className="text-red-400 font-body text-xs px-3 py-1.5 rounded-lg border border-red-400 hover:bg-red-400/10 transition-colors">Delete</button>
              </div>
              {photo.caption && <p className="p-2 text-gray-400 font-body text-xs truncate">{photo.caption}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── TESTIMONIALS MANAGER ───────────────────────────────────
const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', role: '', company: '', image: '', quote: '', type: 'member' })

  const fetchTestimonials = () => API.get('/testimonials').then(res => setTestimonials(res.data)).finally(() => setLoading(false))
  useEffect(() => { fetchTestimonials() }, [])

  const resetForm = () => { setForm({ name: '', role: '', company: '', image: '', quote: '', type: 'member' }); setEditing(null); setShowForm(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) { await API.put(`/testimonials/${editing}`, form); toast.success('Updated!') }
      else { await API.post('/testimonials', form); toast.success('Added!') }
      fetchTestimonials(); resetForm()
    } catch { toast.error('Something went wrong') }
  }

  const handleEdit = (t) => { setForm(t); setEditing(t.id); setShowForm(true) }
  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try { await API.delete(`/testimonials/${id}`); toast.success('Deleted!'); fetchTestimonials() }
    catch { toast.error('Something went wrong') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-3xl">Testimonials</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-accent text-primary font-heading font-semibold text-sm px-5 py-2 rounded-xl hover:bg-accentDark transition-colors">+ Add</button>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="font-heading font-bold text-lg mb-4">{editing ? 'Edit' : 'New'} Testimonial</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <FormInput label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
            <FormInput label="Role" value={form.role} onChange={v => setForm({ ...form, role: v })} />
            <FormInput label="Company" value={form.company} onChange={v => setForm({ ...form, company: v })} />
            <FormSelect label="Type" value={form.type} onChange={v => setForm({ ...form, type: v })} options={['member', 'speaker']} />
            <FormInput label="Image URL" value={form.image} onChange={v => setForm({ ...form, image: v })} />
            <div className="md:col-span-2">
              <label className="text-gray-400 font-body text-sm mb-1.5 block">Quote</label>
              <textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} rows={3} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-accent text-primary font-heading font-semibold text-sm px-6 py-2 rounded-xl hover:bg-accentDark transition-colors">{editing ? 'Update' : 'Add'}</button>
              <button type="button" onClick={resetForm} className="bg-card border border-border text-gray-400 font-heading font-semibold text-sm px-6 py-2 rounded-xl hover:border-gray-500 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="text-gray-500 font-body text-sm">Loading...</div> : testimonials.length === 0 ? (
        <div className="text-center text-gray-500 py-16 font-body">No testimonials yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {testimonials.map(t => (
            <div key={t.id} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-sm">{t.name}</h3>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-heading">{t.type}</span>
                </div>
                <p className="text-gray-500 font-body text-xs">{t.role} {t.company ? `@ ${t.company}` : ''}</p>
                <p className="text-gray-400 font-body text-xs mt-2 line-clamp-2 italic">"{t.quote}"</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(t)} className="text-gray-400 hover:text-accent font-body text-xs px-3 py-1.5 rounded-lg border border-border hover:border-accent transition-colors">Edit</button>
                <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-400 font-body text-xs px-3 py-1.5 rounded-lg border border-border hover:border-red-400 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── FACULTY MANAGER ────────────────────────────────────────
const FacultyManager = () => {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', designation: '', department: '', image: '', statement: '' })

  const fetchFaculty = () => API.get('/faculty').then(res => setFaculty(res.data)).finally(() => setLoading(false))
  useEffect(() => { fetchFaculty() }, [])

  const resetForm = () => { setForm({ name: '', designation: '', department: '', image: '', statement: '' }); setEditing(null); setShowForm(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) { await API.put(`/faculty/${editing}`, form); toast.success('Updated!') }
      else { await API.post('/faculty', form); toast.success('Added!') }
      fetchFaculty(); resetForm()
    } catch { toast.error('Something went wrong') }
  }

  const handleEdit = (f) => { setForm(f); setEditing(f.id); setShowForm(true) }
  const handleDelete = async (id) => {
    if (!confirm('Delete this faculty member?')) return
    try { await API.delete(`/faculty/${id}`); toast.success('Deleted!'); fetchFaculty() }
    catch { toast.error('Something went wrong') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-3xl">Faculty</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-accent text-primary font-heading font-semibold text-sm px-5 py-2 rounded-xl hover:bg-accentDark transition-colors">+ Add</button>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="font-heading font-bold text-lg mb-4">{editing ? 'Edit' : 'New'} Faculty</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <FormInput label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
            <FormInput label="Designation" value={form.designation} onChange={v => setForm({ ...form, designation: v })} />
            <FormInput label="Department" value={form.department} onChange={v => setForm({ ...form, department: v })} />
            <FormInput label="Image URL" value={form.image} onChange={v => setForm({ ...form, image: v })} />
            <div className="md:col-span-2">
              <label className="text-gray-400 font-body text-sm mb-1.5 block">Statement</label>
              <textarea value={form.statement} onChange={e => setForm({ ...form, statement: e.target.value })} rows={3} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-accent text-primary font-heading font-semibold text-sm px-6 py-2 rounded-xl hover:bg-accentDark transition-colors">{editing ? 'Update' : 'Add'}</button>
              <button type="button" onClick={resetForm} className="bg-card border border-border text-gray-400 font-heading font-semibold text-sm px-6 py-2 rounded-xl hover:border-gray-500 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="text-gray-500 font-body text-sm">Loading...</div> : faculty.length === 0 ? (
        <div className="text-center text-gray-500 py-16 font-body">No faculty yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {faculty.map(f => (
            <div key={f.id} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-sm">{f.name}</h3>
                <p className="text-gray-500 font-body text-xs">{f.designation} — {f.department}</p>
                <p className="text-gray-400 font-body text-xs mt-2 line-clamp-2 italic">"{f.statement}"</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(f)} className="text-gray-400 hover:text-accent font-body text-xs px-3 py-1.5 rounded-lg border border-border hover:border-accent transition-colors">Edit</button>
                <button onClick={() => handleDelete(f.id)} className="text-gray-400 hover:text-red-400 font-body text-xs px-3 py-1.5 rounded-lg border border-border hover:border-red-400 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── REUSABLE FORM COMPONENTS ───────────────────────────────
const FormInput = ({ label, value, onChange, type = 'text', required }) => (
  <div>
    <label className="text-gray-400 font-body text-sm mb-1.5 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-accent transition-colors"
    />
  </div>
)

const FormSelect = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-gray-400 font-body text-sm mb-1.5 block">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-accent transition-colors"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
)

// ─── MAIN DASHBOARD ─────────────────────────────────────────
const AdminDashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
    toast.success('Logged out!')
  }

  return (
    <div className="flex min-h-screen bg-primary">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 p-8 overflow-auto">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/events" element={<EventsManager />} />
          <Route path="/team" element={<TeamManager />} />
          <Route path="/gallery" element={<GalleryManager />} />
          <Route path="/testimonials" element={<TestimonialsManager />} />
          <Route path="/faculty" element={<FacultyManager />} />
        </Routes>
      </main>
    </div>
  )
}

export default AdminDashboard