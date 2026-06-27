import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * EditPhotoModal — Dialog box prompting admin to replace the profile headshot.
 *
 * @param {boolean} isOpen   - Determines if modal is open
 * @param {function} onClose - Callback to close the modal
 * @param {function} onSave  - Callback when a new image URL/base64 is saved
 * @param {function} onReset - Callback when photo is reset to default
 */
export default function EditPhotoModal({ isOpen, onClose, onSave, onReset }) {
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setUrlInput('')
      setError('')
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate type is image
    if (!file.type.startsWith('image/')) {
      setError('Only image files (JPG, PNG, WEBP) are supported.')
      return
    }

    // Validate size (limit to 1.5MB to save localStorage quota)
    if (file.size > 1.5 * 1024 * 1024) {
      setError('File size exceeds 1.5MB. Please upload a smaller image or use a hosted link instead.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      try {
        onSave(reader.result)
        onClose()
      } catch (err) {
        console.error(err)
        setError('Browser storage quota exceeded. Please use a hosted URL link instead.')
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    const trimmedUrl = urlInput.trim()
    if (!trimmedUrl) return

    onSave(trimmedUrl)
    onClose()
  }

  const handleResetClick = () => {
    if (window.confirm('Reset profile picture back to default headshot?')) {
      onReset()
      onClose()
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
          <motion.div
            className="relative w-full max-w-md rounded-2xl p-6 flex flex-col"
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
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                📷 Update Profile Photo
              </h3>
              <button
                onClick={onClose}
                className="text-lg hover:text-red-500 transition-colors p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
              Modify the profile headshot displayed on the Home page.
            </p>

            <div className="space-y-4">
              {/* Option 1: File Upload */}
              <div className="p-4 rounded-xl border border-dashed text-center" style={{ borderColor: 'var(--color-border)' }}>
                <span className="text-2xl block mb-1">🖼️</span>
                <span className="text-xs font-semibold block mb-2" style={{ color: 'var(--color-text)' }}>Upload Local Image</span>
                <span className="text-[10px] block mb-3" style={{ color: 'var(--color-text-subtle)' }}>Max size: 1.5MB (PNG, JPG, WEBP)</span>
                <label className="btn-secondary !py-2 !px-4 !text-xs cursor-pointer inline-block">
                  Select Image File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t" style={{ borderColor: 'var(--color-border-light)' }} />
                <span className="flex-shrink mx-3 text-[10px] font-medium" style={{ color: 'var(--color-text-subtle)' }}>OR</span>
                <div className="flex-grow border-t" style={{ borderColor: 'var(--color-border-light)' }} />
              </div>

              {/* Option 2: Image URL */}
              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-subtle)' }}>
                  Paste Image URL Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value)
                      setError('')
                    }}
                    placeholder="https://example.com/profile-picture.jpg"
                    className="flex-1 px-3 py-2 text-sm rounded-lg border focus:ring-1 focus:ring-amber-500 outline-none"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <button
                    type="submit"
                    className="btn-primary !py-2 !px-4 !text-xs cursor-pointer"
                    style={{ background: 'var(--color-highlight)' }}
                  >
                    Save URL
                  </button>
                </div>
              </form>

              {error && (
                <div className="text-xs text-red-500 mt-2 block font-medium">
                  ⚠️ {error}
                </div>
              )}

              <div className="pt-4 border-t flex justify-between items-center" style={{ borderColor: 'var(--color-border-light)' }}>
                <button
                  type="button"
                  onClick={handleResetClick}
                  className="btn-secondary !py-2 !px-4 !text-xs text-red-500 border-red-200 hover:border-red-500 hover:text-white hover:bg-red-500 cursor-pointer"
                >
                  Reset Default
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary !py-2 !px-4 !text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
