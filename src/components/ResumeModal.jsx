import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '../context/AdminContext'

/**
 * ResumeModal — Overlay PDF previewer with download and update capabilities.
 *
 * @param {boolean} isOpen   - Determines if modal is open
 * @param {function} onClose - Callback to close the modal
 */
export default function ResumeModal({ isOpen, onClose }) {
  const { isAdmin } = useAdmin()
  const [resumeUrl, setResumeUrl] = useState('/Resume.pdf')
  const [isEditing, setIsEditing] = useState(false)
  const [urlInput, setUrlInput] = useState('')

  // Load custom resume URL on mount / open
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('portfolio_resume_url')
      if (saved) {
        setResumeUrl(saved)
        if (!saved.startsWith('data:')) {
          setUrlInput(saved)
        }
      } else {
        setResumeUrl('/Resume.pdf')
      }
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Auto-exit edit mode when admin logs out
  useEffect(() => {
    if (!isAdmin) {
      setIsEditing(false)
    }
  }, [isAdmin])

  // Escape key listener
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are supported.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit. To prevent browser storage issues, please enter a hosted link URL instead.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      try {
        localStorage.setItem('portfolio_resume_url', reader.result)
        setResumeUrl(reader.result)
        setIsEditing(false)
        setUrlInput('')
        alert('Resume file uploaded successfully!')
      } catch (err) {
        console.error(err)
        alert('Storage quota exceeded. Please use a hosted URL link instead.')
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    const trimmedUrl = urlInput.trim()
    if (!trimmedUrl) return

    localStorage.setItem('portfolio_resume_url', trimmedUrl)
    setResumeUrl(trimmedUrl)
    setIsEditing(false)
    alert('Resume URL updated successfully!')
  }

  const handleReset = () => {
    if (window.confirm('Reset resume back to default Resume.pdf in codebase?')) {
      localStorage.removeItem('portfolio_resume_url')
      setResumeUrl('/Resume.pdf')
      setUrlInput('')
      setIsEditing(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
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
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col"
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
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
              <div>
                <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                  Curriculum Vitae / Resume
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  View, download, or manage resume updates.
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <a
                  href={resumeUrl}
                  download="Mayur_Chaudhari_Resume.pdf"
                  className="btn-primary !py-2 !px-4 !text-xs flex items-center gap-1.5 cursor-pointer"
                  style={{ background: 'var(--color-accent)' }}
                >
                  📥 Download PDF
                </a>
                {isAdmin && (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-secondary !py-2 !px-4 !text-xs flex items-center gap-1 cursor-pointer"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    {isEditing ? '← View Resume' : '⚙️ Manage'}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-lg hover:text-red-500 transition-colors p-1"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-6 min-h-[400px]">
              {isEditing ? (
                <div className="space-y-6 max-w-md mx-auto py-8">
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Update Resume Document
                  </h4>

                  {/* Option 1: File Uploader */}
                  <div className="p-5 rounded-xl border border-dashed text-center" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-3xl block mb-2">📁</span>
                    <span className="text-xs font-semibold block mb-3">Upload PDF File (Max 2MB)</span>
                    <label className="btn-secondary !py-2 !px-4 !text-xs cursor-pointer inline-block">
                      Select PDF File
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t" style={{ borderColor: 'var(--color-border-light)' }}></div>
                    <span className="flex-shrink mx-4 text-xs font-medium" style={{ color: 'var(--color-text-subtle)' }}>OR</span>
                    <div className="flex-grow border-t" style={{ borderColor: 'var(--color-border-light)' }}></div>
                  </div>

                  {/* Option 2: URL link */}
                  <form onSubmit={handleUrlSubmit} className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-subtle)' }}>
                      Hosted PDF Link (Google Drive / OneDrive / Cloudinary etc.)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.com/my-resume.pdf"
                        className="flex-1 px-3 py-2 text-sm rounded-lg border focus:ring-1 focus:ring-amber-500 outline-none"
                        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                      />
                      <button
                        type="submit"
                        className="btn-primary !py-2 !px-4 !text-xs cursor-pointer"
                        style={{ background: 'var(--color-highlight)' }}
                      >
                        Save Link
                      </button>
                    </div>
                  </form>

                  <div className="pt-4 border-t flex justify-between items-center" style={{ borderColor: 'var(--color-border-light)' }}>
                    <button
                      onClick={handleReset}
                      className="btn-secondary !py-2 !px-4 !text-xs text-red-500 border-red-200 hover:border-red-500 hover:text-white hover:bg-red-500 cursor-pointer"
                    >
                      Reset Default Resume
                    </button>
                    <span className="text-[10px] text-right max-w-[200px] leading-relaxed" style={{ color: 'var(--color-text-subtle)' }}>
                      Replace <code>public/Resume.pdf</code> in your codebase to update the permanent default file.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[65vh] rounded-xl overflow-hidden border" style={{ borderColor: 'var(--color-border-light)' }}>
                  <object
                    data={resumeUrl}
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                      <span className="text-4xl mb-4">📄</span>
                      <h4 className="font-semibold text-base mb-2">Resume Preview Unavailable</h4>
                      <p className="text-xs max-w-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                        Your browser doesn't support embedding PDF previews directly (especially common on mobile devices).
                      </p>
                      <a
                        href={resumeUrl}
                        download="Mayur_Chaudhari_Resume.pdf"
                        className="btn-primary !py-2.5 !px-6 !text-xs cursor-pointer"
                      >
                        📥 Download PDF to View
                      </a>
                    </div>
                  </object>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
