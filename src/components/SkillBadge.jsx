import { motion } from 'framer-motion'

/**
 * SkillBadge — Individual skill chip with hover glow.
 *
 * @param {string} name - Skill name to display
 * @param {string} icon - Optional emoji/icon
 */
export default function SkillBadge({ name, icon, onDelete }) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium cursor-default select-none"
      style={{
        background: 'var(--color-surface)',
        color: 'var(--color-text-secondary)',
        border: '1px solid var(--color-border-light)',
      }}
      whileHover={{
        scale: onDelete ? 1.02 : 1.06,
        boxShadow: '0 0 20px rgba(184, 134, 11, 0.08)',
        borderColor: 'var(--color-accent-soft)',
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{name}</span>
      {onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
          className="ml-1 text-xs hover:text-red-500 transition-colors p-0.5 rounded-full hover:bg-black/10 focus:outline-none cursor-pointer flex items-center justify-center w-4 h-4"
          title={`Delete ${name}`}
        >
          ✕
        </button>
      )}
    </motion.div>
  )
}
