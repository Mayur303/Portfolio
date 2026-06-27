import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="border-t py-12 mt-auto"
      style={{
        background: 'var(--color-bg-alt)',
        borderColor: 'var(--color-border-light)',
      }}
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
              Portfolio<span style={{ color: 'var(--color-highlight)' }}>.</span>
            </Link>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Aspiring Software Engineer
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex items-center gap-6">
            {['/', '/projects', '/experience', '/contact'].map((path) => (
              <Link
                key={path}
                to={path}
                className="text-sm font-medium transition-colors duration-300 hover:opacity-80"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/Mayur303"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mayurchaudhari303/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:mayurgc303@gmail.com"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-6 border-t text-center text-xs"
          style={{ borderColor: 'var(--color-border-light)', color: 'var(--color-text-subtle)' }}
        >
          © {currentYear} Mayur Chaudhari. All rights reserved. Built with React & Tailwind CSS.
        </div>
      </div>
    </footer>
  )
}
