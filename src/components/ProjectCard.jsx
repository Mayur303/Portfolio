import { motion } from 'framer-motion'

/**
 * ProjectCard — Sleek project card with hover scale, tech tags, and action buttons.
 *
 * @param {object} project         - Project data object
 * @param {number} index           - Card index for stagger
 * @param {function} onExpand      - Callback to open modal
 */
export default function ProjectCard({ project, index, onExpand, isEditing, onDelete, onEdit }) {
  const handleClick = (e) => {
    if (isEditing) {
      onEdit?.(project)
    } else {
      onExpand?.(project)
    }
  }

  return (
    <motion.article
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-light)',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 16px 48px rgba(26, 26, 46, 0.08)',
      }}
      onClick={handleClick}
    >
      {/* Delete Card Button overlay */}
      {isEditing && onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete(project.id)
          }}
          className="absolute top-4 right-4 z-20 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer border border-red-200 shadow-md"
          title={`Delete ${project.title}`}
        >
          Delete
        </button>
      )}

      {/* Project Image Placeholder */}
      <div
        className="relative w-full aspect-video overflow-hidden"
        style={{ background: 'var(--color-bg-alt)' }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-30">{project.emoji || '🚀'}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(26, 26, 46, 0.6)' }}
        >
          <span className="text-white text-sm font-medium tracking-wide px-4 py-2 rounded-full border border-white/30">
            {isEditing ? 'Edit Project ✎' : 'View Details →'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-8">
        <h3
          className="text-lg font-semibold tracking-tight mb-2"
          style={{ color: 'var(--color-text)' }}
        >
          {project.title}
        </h3>

        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'var(--color-bg)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border-light)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="flex items-center gap-3 mt-auto">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-semibold tracking-wide transition-colors duration-300"
              style={{ color: 'var(--color-accent-soft)' }}
            >
              GitHub ↗
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-semibold tracking-wide transition-colors duration-300"
              style={{ color: 'var(--color-accent-soft)' }}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
