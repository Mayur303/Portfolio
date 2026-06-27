import AnimatedSection from './AnimatedSection'

/**
 * SectionHeading — Consistent section title with animated underline.
 *
 * @param {string} title    - Main heading text
 * @param {string} subtitle - Optional subtext below heading
 */
export default function SectionHeading({ title, subtitle }) {
  return (
    <AnimatedSection className="mb-16 text-center">
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight"
        style={{ color: 'var(--color-text)' }}
      >
        {title}
      </h2>
      <div
        className="mt-4 mx-auto h-[3px] w-16 rounded-full"
        style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-soft))' }}
      />
      {subtitle && (
        <p
          className="mt-4 text-base max-w-xl mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  )
}
