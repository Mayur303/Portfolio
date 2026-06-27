import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ResumeModal from './ResumeModal'
import { useAdmin } from '../context/AdminContext'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/experience', label: 'Experience' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const { isAdmin, logout } = useAdmin()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'var(--color-surface-glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border-light)' : '1px solid transparent',
      }}
    >
      <nav className="section-container relative flex items-center justify-between h-20">
        {/* Logo / Name */}
        <Link to="/" className="relative z-10">
          <motion.span
            className="text-xl font-bold tracking-tight"
            style={{ color: 'var(--color-text)' }}
            whileHover={{ scale: 1.02 }}
          >
            {/* INSERT_YOUR_NAME — Replace with your name */}
            Portfolio<span style={{ color: 'var(--color-highlight)' }}>.</span>
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
                style={{
                  color: location.pathname === path
                    ? 'var(--color-text)'
                    : 'var(--color-text-muted)',
                }}
              >
                {label}
                {location.pathname === path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                    style={{ background: 'var(--color-accent)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setIsResumeOpen(true)}
            className="btn-secondary !py-2.5 !px-6 !text-xs cursor-pointer"
          >
            Resume ↗
          </button>
          {isAdmin && (
            <button
              onClick={logout}
              className="btn-primary !py-2.5 !px-6 !text-xs cursor-pointer"
              style={{ background: '#EF4444' }}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-toggle"
          className="relative z-10 lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          <motion.span
            className="block w-6 h-[2px] rounded-full"
            style={{ background: 'var(--color-text)' }}
            animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-[2px] rounded-full"
            style={{ background: 'var(--color-text)' }}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-[2px] rounded-full"
            style={{ background: 'var(--color-text)' }}
            animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full left-0 right-0 glass border-b"
            style={{ borderColor: 'var(--color-border-light)' }}
          >
            <ul className="section-container py-6 flex flex-col gap-2">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="block py-3 px-4 text-base font-medium rounded-xl transition-all duration-300"
                    style={{
                      color: location.pathname === path
                        ? 'var(--color-text)'
                        : 'var(--color-text-muted)',
                      background: location.pathname === path
                        ? 'var(--color-surface)'
                        : 'transparent',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setIsResumeOpen(true)
                  }}
                  className="btn-primary w-full justify-center !text-sm cursor-pointer"
                >
                  Resume ↗
                </button>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      logout()
                    }}
                    className="btn-secondary w-full justify-center !text-sm cursor-pointer"
                    style={{
                      color: '#EF4444',
                      borderColor: '#EF4444',
                    }}
                  >
                    Logout Admin
                  </button>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Resume Overlay Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </header>
  )
}
