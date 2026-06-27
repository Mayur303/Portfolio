import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import AnimatedSection from '../components/AnimatedSection'
import SectionHeading from '../components/SectionHeading'

/* ====================================
   CONTACT INFO
   ==================================== */
const contactInfo = [
  {
    label: 'Email',
    value: 'mayurgc303@gmail.com',
    href: 'mailto:mayurgc303@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mayurchaudhari303/',
    href: 'https://www.linkedin.com/in/mayurchaudhari303/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/Mayur303',
    href: 'https://github.com/Mayur303',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
]

/* ====================================
   CONTACT PAGE
   ==================================== */
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch("https://formsubmit.co/ajax/mayurgc303@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New portfolio contact message from ${formData.name}`
        })
      });

      if (response.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 5000)
      } else {
        throw new Error('FormSubmit endpoint returned error status')
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <PageTransition>
      <section className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />

        <div className="section-container relative z-10">
          <SectionHeading
            title="Get in Touch"
            subtitle="Have an opportunity, question, or just want to connect? I'd love to hear from you."
          />

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info Column */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.1}>
                <h3
                  className="text-lg font-semibold mb-6"
                  style={{ color: 'var(--color-text)' }}
                >
                  Contact Information
                </h3>

                <div className="space-y-5">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                      style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border-light)',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: 'var(--color-bg)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <div
                          className="text-xs font-medium uppercase tracking-widest"
                          style={{ color: 'var(--color-text-subtle)' }}
                        >
                          {info.label}
                        </div>
                        <div
                          className="text-sm font-medium mt-0.5"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Location */}
                <div className="mt-8 p-4 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-subtle)' }}>
                        Location
                      </div>
                      <div className="text-sm font-medium mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                        {/* INSERT_LOCATION */}
                        India
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.25}>
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-8"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border-light)',
                  }}
                >
                  <h3
                    className="text-lg font-semibold mb-6"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Send a Message
                  </h3>

                  <div className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: 'var(--color-text-subtle)' }}
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                        style={{
                          background: 'var(--color-bg)',
                          color: 'var(--color-text)',
                          border: '1px solid var(--color-border-light)',
                          ringColor: 'var(--color-accent-soft)',
                        }}
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: 'var(--color-text-subtle)' }}
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                        style={{
                          background: 'var(--color-bg)',
                          color: 'var(--color-text)',
                          border: '1px solid var(--color-border-light)',
                        }}
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: 'var(--color-text-subtle)' }}
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about the opportunity or your question..."
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-300 focus:ring-2"
                        style={{
                          background: 'var(--color-bg)',
                          color: 'var(--color-text)',
                          border: '1px solid var(--color-border-light)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center mt-6"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </span>
                    ) : status === 'sent' ? (
                      '✓ Message Sent!'
                    ) : status === 'error' ? (
                      '✕ Error Sending'
                    ) : (
                      'Send Message →'
                    )}
                  </motion.button>

                  {status === 'sent' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-sm mt-4 font-medium text-emerald-600"
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.p>
                  )}

                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-sm mt-4 font-medium text-red-500"
                    >
                      Oops! Something went wrong. Please try again.
                    </motion.p>
                  )}
                </form>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
