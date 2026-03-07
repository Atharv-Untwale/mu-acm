import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../utils/api'
import toast from 'react-hot-toast'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.post('/auth/login', { email, password })
      login(res.data.token)
      toast.success('Welcome back, Admin!')
      navigate('/admin')
    } catch (err) {
      toast.error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-primary flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="text-accent font-heading font-bold text-3xl tracking-tight">
            MU<span className="text-white">-ACM</span>
          </span>
          <p className="text-gray-500 font-body text-sm mt-2">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h1 className="font-heading font-bold text-2xl mb-6">Sign In</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-400 font-body text-sm mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@muacm.com"
                required
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="text-gray-400 font-body text-sm mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-primary font-heading font-bold py-3 rounded-xl hover:bg-accentDark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 font-body text-xs mt-6">
          MU-ACM Admin Panel — Restricted Access
        </p>
      </div>
    </main>
  )
}

export default AdminLogin