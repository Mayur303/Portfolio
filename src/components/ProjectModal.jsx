import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ProjectModal — Expanded project detail overlay with backdrop blur.
 *
 * @param {object|null} project - Project data (null = hidden)
 * @param {function} onClose    - Callback to close modal
 */
export default function ProjectModal({ project, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [project])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

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

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
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
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
              style={{
                background: 'var(--color-surface)',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border-light)',
              }}
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Project Image */}
            <div
              className="w-full aspect-video"
              style={{ background: 'var(--color-bg-alt)' }}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl opacity-20">{project.emoji || '🚀'}</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-8">
              <h2
                className="text-2xl font-bold tracking-tight mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                {project.title}
              </h2>

              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {project.longDescription || project.description}
              </p>

              {/* Tech stack */}
              <div className="mb-6">
                <h4
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: 'var(--color-text-subtle)' }}
                >
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full text-sm font-medium"
                      style={{
                        background: 'var(--color-surface)',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border-light)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key features */}
              {project.features && (
                <div className="mb-6">
                  <h4
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: 'var(--color-text-subtle)' }}
                  >
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        <span style={{ color: 'var(--color-highlight)' }}>▸</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action links */}
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary !py-2.5 !px-5 !text-sm"
                  >
                    GitHub ↗
                  </a>
                ) : (
                  <span className="text-xs italic" style={{ color: 'var(--color-text-subtle)' }}>
                    {/* INSERT_GITHUB_LINK */} GitHub link coming soon
                  </span>
                )}
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-2.5 !px-5 !text-sm"
                  >
                    Live Demo ↗
                  </a>
                ) : (
                  <span className="text-xs italic" style={{ color: 'var(--color-text-subtle)' }}>
                    {/* INSERT_LIVE_LINK */} Live demo coming soon
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
