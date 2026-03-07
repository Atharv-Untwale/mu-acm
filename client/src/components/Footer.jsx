import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <span className="text-accent font-heading font-bold text-2xl tracking-tight">
              MU<span className="text-white">-ACM</span>
            </span>
            <p className="text-gray-500 font-body text-sm mt-3 leading-relaxed max-w-xs">
              The ACM Student Chapter at Medi-Caps University. A vibrant community of tech enthusiasts dedicated to fostering growth in computing.
            </p>
            <a
              href="https://discord.com/invite/qaRz3z9rFF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-accent text-primary font-heading font-semibold text-sm px-5 py-2 rounded-full hover:bg-accentDark transition-colors duration-200"
            >
              Join Discord
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-white mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'About', href: '/#about' },
                { label: 'Events', href: '/events' },
                { label: 'Team', href: '/team' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contributors', href: '/contributors' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-accent font-body text-sm transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-white mb-4">Connect</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'Discord', href: 'https://discord.com/invite/qaRz3z9rFF' },
                { label: 'Instagram', href: '#' },
                { label: 'LinkedIn', href: '#' },
                { label: 'GitHub', href: '#' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-accent font-body text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 font-body text-xs">
            © {new Date().getFullYear()} MU-ACM. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contributors" className="text-gray-600 hover:text-accent font-body text-xs transition-colors">
              Our Developers
            </Link>
            <Link to="/admin/login" className="text-gray-600 hover:text-accent font-body text-xs transition-colors">
              Admin
            </Link>
          </div>
          <p className="text-gray-600 font-body text-xs">
            Made with 💙 by team MU-ACM
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer