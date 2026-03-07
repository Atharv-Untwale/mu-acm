import { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Events', href: '/events' },
  { name: 'Team', href: '/team' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Faculty', href: '/#faculty' },
  { name: 'FAQ', href: '/#faq' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-accent font-heading font-bold text-2xl tracking-tight">
            MU<span className="text-white">-ACM</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-400 hover:text-accent text-sm font-body transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Join Discord Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://discord.com/invite/qaRz3z9rFF"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-primary font-heading font-semibold text-sm px-5 py-2 rounded-full hover:bg-accentDark transition-colors duration-200"
          >
            Join Discord
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-accent text-sm font-body transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://discord.com/invite/qaRz3z9rFF"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-primary font-heading font-semibold text-sm px-5 py-2 rounded-full text-center hover:bg-accentDark transition-colors duration-200"
          >
            Join Discord
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar