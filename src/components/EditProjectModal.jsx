import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * EditProjectModal — Overlay form to edit project details.
 *
 * @param {object|null} project - The project being edited
 * @param {function} onSave     - Callback when changes are saved
 * @param {function} onClose    - Callback to close the modal
 */
export default function EditProjectModal({ project, onSave, onClose }) {
  const [title, setTitle] = useState('')
  const [emoji, setEmoji] = useState('🚀')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [github, setGithub] = useState('')
  const [live, setLive] = useState('')

  // Load project values when it changes
  useEffect(() => {
    if (project) {
      setTitle(project.title || '')
      setEmoji(project.emoji || '🚀')
      setImage(project.image || '')
      setDescription(project.description || '')
      setLongDescription(project.longDescription || '')
      setTagsInput(project.tags ? project.tags.join(', ') : '')
      setGithub(project.github || '')
      setLive(project.live || '')
      
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('Project Title is required')
      return
    }

    // Parse tags input: split by comma, trim whitespace, filter empty
    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    onSave({
      ...project,
      title: title.trim(),
      emoji: emoji.trim() || '🚀',
      image: image.trim(),
      description: description.trim(),
      longDescription: longDescription.trim(),
      tags,
      github: github.trim(),
      live: live.trim(),
    })
  }

  return (
    <AnimatePresence>
      {project && (
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

          {/* Modal Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-8"
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
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
              <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                Edit Project Details
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-lg hover:text-red-500 transition-colors p-1"
                aria-label="Close form"
              >
                ✕
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-5 mb-8">
              {/* Row 1: Title and Emoji */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    placeholder="e.g. Project Sammati"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Emoji / Icon
                  </label>
                  <input
                    type="text"
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    className="w-full px-4 py-2.5 text-center rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    placeholder="🚀"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  Project Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  placeholder="https://example.com/project-image.jpg"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  Short Description (Card preview)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all h-20 resize-none animate-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  placeholder="Brief 1-2 sentence description for the card preview..."
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  Detailed Description (Modal expanded view)
                </label>
                <textarea
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all h-28 resize-none animate-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  placeholder="Comprehensive description of technologies, challenge, and results..."
                />
              </div>

              {/* Tech Stack Comma Separated */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  Tech Stack (Comma-separated tags)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  placeholder="React, Node.js, MongoDB, NLP"
                />
              </div>

              {/* Links Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    GitHub Link URL
                  </label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Live Deployed Demo URL
                  </label>
                  <input
                    type="text"
                    value={live}
                    onChange={(e) => setLive(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary !py-2.5 !px-6 !text-sm cursor-pointer"
                style={{ borderColor: 'var(--color-border)' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary !py-2.5 !px-6 !text-sm cursor-pointer"
                style={{ background: 'var(--color-highlight)' }}
              >
                Save Changes
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
