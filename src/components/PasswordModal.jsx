import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '../context/AdminContext'

/**
 * PasswordModal — Dialog box prompting for admin password authentication.
 *
 * @param {boolean} isOpen   - Modal open state
 * @param {function} onClose - Close modal callback
 */
export default function PasswordModal({ isOpen, onClose }) {
  const { login } = useAdmin()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setPassword('')
      setError(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape key handler
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(password)
    if (success) {
      onClose()
    } else {
      setError(true)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(26, 26, 46, 0.4)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative w-full max-w-sm rounded-2xl p-6 flex flex-col"
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border-light)',
              boxShadow: 'var(--shadow-xl)',
            }}
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-lg font-bold tracking-tight mb-2" style={{ color: 'var(--color-text)' }}>
              🔑 Admin Authentication
            </h3>
            <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
              Please enter password to enable edit permissions.
            </p>

            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(false)
                  }}
                  placeholder="Enter admin password..."
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                  style={{
                    background: 'var(--color-surface)',
                    borderColor: error ? '#EF4444' : 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                  autoFocus
                />
                {error && (
                  <span className="text-[10px] text-red-500 mt-1 block">
                    Incorrect password. Please try again.
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary !py-2 !px-4 !text-xs cursor-pointer"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary !py-2 !px-4 !text-xs cursor-pointer"
                  style={{ background: 'var(--color-highlight)' }}
                >
                  Verify Password
                </button>
              </div>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
