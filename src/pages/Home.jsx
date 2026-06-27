import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import AnimatedSection from '../components/AnimatedSection'
import SectionHeading from '../components/SectionHeading'
import SkillBadge from '../components/SkillBadge'
import { useAdmin } from '../context/AdminContext'
import EditPhotoModal from '../components/EditPhotoModal'
import PasswordModal from '../components/PasswordModal'

/* ====================================
   SKILL DATA
   ==================================== */
const INITIAL_SKILL_CATEGORIES = [
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: '🌐',
    skills: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Express.js', icon: '⚡' },
      { name: 'React.js', icon: '⚛️' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'JavaScript (ES6+)', icon: '🟨' },
      { name: 'HTML5', icon: '🧡' },
      { name: 'CSS3', icon: '💙' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Bootstrap', icon: '💜' },
      { name: 'REST APIs', icon: '🔌' },
      { name: 'JWT Authentication', icon: '🔑' },
    ],
  },
  {
    id: 'core-cs',
    title: 'Core Skills',
    icon: '💻',
    skills: [
      { name: 'Object-Oriented Programming (OOP)', icon: '🧩' },
      { name: 'Data Structures and Algorithms (DSA)', icon: '📊' },
      { name: 'Operating Systems (OS)', icon: '⚙️' },
      { name: 'Database Management Systems (DBMS)', icon: '🗄️' },
      { name: 'Computer Networks (CN)', icon: '🌐' },
      { name: 'Microsoft SQL Server (MSSQL)', icon: '🛢️' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    icon: '🤖',
    skills: [
      { name: 'Machine Learning', icon: '🧠' },
      { name: 'Deep Learning', icon: '🕸️' },
      { name: 'Neural Networks', icon: '🧬' },
      { name: 'PyTorch', icon: '🔥' },
      { name: 'TensorFlow', icon: '🧠' },
    ],
  },
  {
    id: 'tools-tech',
    title: 'Tools & Technologies',
    icon: '🛠️',
    skills: [
      { name: 'NumPy', icon: '🔢' },
      { name: 'Pandas', icon: '🐼' },
      { name: 'Scikit-learn', icon: '🧪' },
      { name: 'Jupyter Notebook', icon: '📓' },
      { name: 'Git & GitHub', icon: '🐙' },
    ],
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    icon: '🤝',
    skills: [
      { name: 'Communication', icon: '🗣️' },
      { name: 'Problem Solving', icon: '💡' },
      { name: 'Teamwork', icon: '👥' },
      { name: 'Leadership', icon: '👑' },
    ],
  },
  {
    id: 'custom-1782274218148',
    title: 'CV and NLP',
    icon: '⭐',
    skills: [
      { name: 'OpenCV', icon: '📸' },
      { name: 'Natural Language Processing', icon: '📑' },
      { name: 'NLTK & spaCy', icon: '🗣️' },
      { name: 'Computer Vision', icon: '👁️' },
    ],
  },
  {
    id: 'custom-1782274919156',
    title: 'Programing Languages',
    icon: '⭐',
    skills: [
      { name: 'Java', icon: '✨' },
      { name: 'C', icon: '✨' },
      { name: 'Python', icon: '✨' },
      { name: 'Javascript', icon: '✨' },
    ],
  },
]

/* ====================================
   HERO — Floating particles background
   ==================================== */
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle grid */}
      <div className="absolute inset-0 dot-bg opacity-40" />

      {/* Floating elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 80,
            height: 200 + i * 80,
            background: `radial-gradient(circle, rgba(184,134,11, ${0.03 - i * 0.004}) 0%, transparent 70%)`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ====================================
   HOME PAGE
   ==================================== */
export default function Home() {
  const { isAdmin } = useAdmin()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Map mouse offsets relative to container center to -15deg -> +15deg rotation
  const rotateX = useTransform(mouseY, [-150, 150], [15, -15])
  const rotateY = useTransform(mouseX, [-150, 150], [-15, 15])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const x = e.clientX - rect.left - width / 2
    const y = e.clientY - rect.top - height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const [headshotUrl, setHeadshotUrl] = useState(() => {
    return localStorage.getItem('portfolio_headshot_url') || '/headshot.jpg'
  })
  const [isEditPhotoOpen, setIsEditPhotoOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [typedName, setTypedName] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const nameText = "Mayur Chaudhari"
    let currentText = ""
    let index = 0

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < nameText.length) {
          currentText += nameText[index]
          setTypedName(currentText)
          index++
        }
        if (index >= nameText.length) {
          clearInterval(interval)
          setTimeout(() => setShowCursor(false), 1500)
        }
      }, 90)
      return () => clearInterval(interval)
    }, 600)

    return () => clearTimeout(startTimeout)
  }, [])

  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 1000)
      return () => clearTimeout(timer)
    }
  }, [clickCount])

  const handlePhotoClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1
      if (newCount === 3) {
        setIsPasswordOpen(true)
        return 0
      }
      return newCount
    })
  }

  const handleSavePhoto = (newUrl) => {
    localStorage.setItem('portfolio_headshot_url', newUrl)
    setHeadshotUrl(newUrl)
  }

  const handleResetPhoto = () => {
    localStorage.removeItem('portfolio_headshot_url')
    setHeadshotUrl('/headshot.jpg')
  }

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('portfolio_skills_categories')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse saved skills:', e)
      }
    }
    return INITIAL_SKILL_CATEGORIES
  })

  const [isEditing, setIsEditing] = useState(false)
  const [newSkillNames, setNewSkillNames] = useState({})
  const [newSkillIcons, setNewSkillIcons] = useState({})

  useEffect(() => {
    localStorage.setItem('portfolio_skills_categories', JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    if (!isAdmin) {
      setIsEditing(false)
    }
  }, [isAdmin])

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all skills and categories to default values? All custom edits will be lost.')) {
      setCategories(INITIAL_SKILL_CATEGORIES)
      localStorage.removeItem('portfolio_skills_categories')
    }
  }

  const handleUpdateTitle = (catId, newTitle) => {
    setCategories(prev =>
      prev.map(cat => cat.id === catId ? { ...cat, title: newTitle } : cat)
    )
  }

  const handleUpdateIcon = (catId, newIcon) => {
    setCategories(prev =>
      prev.map(cat => cat.id === catId ? { ...cat, icon: newIcon } : cat)
    )
  }

  const handleDeleteCategory = (catId) => {
    if (window.confirm('Are you sure you want to delete this skill card?')) {
      setCategories(prev => prev.filter(cat => cat.id !== catId))
    }
  }

  const handleAddCategory = () => {
    const newId = `custom-${Date.now()}`
    const newCat = {
      id: newId,
      title: 'New Skill Category',
      icon: '⭐',
      skills: []
    }
    setCategories(prev => [...prev, newCat])
  }

  const handleAddSkill = (catId) => {
    const name = newSkillNames[catId]?.trim()
    if (!name) return

    const icon = newSkillIcons[catId]?.trim() || '✨'

    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === catId) {
          if (cat.skills.some(s => s.name.toLowerCase() === name.toLowerCase())) {
            alert('This skill already exists in this category.')
            return cat
          }
          return {
            ...cat,
            skills: [...cat.skills, { name, icon }]
          }
        }
        return cat
      })
    )

    setNewSkillNames(prev => ({ ...prev, [catId]: '' }))
    setNewSkillIcons(prev => ({ ...prev, [catId]: '' }))
  }

  const handleDeleteSkill = (catId, skillName) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === catId) {
          return {
            ...cat,
            skills: cat.skills.filter(s => s.name !== skillName)
          }
        }
        return cat
      })
    )
  }
  return (
    <PageTransition>
      {/* ---- HERO SECTION ---- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />

        <div className="section-container relative z-10 pt-32 pb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 max-w-5xl mx-auto">
            {/* Left side: Name, Post, and CTA Button */}
            <div className="flex-1 text-center lg:text-left">
              {/* Available badge */}
              <AnimatedSection delay={0.1}>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
                  style={{
                    background: 'var(--color-highlight-soft)',
                    color: 'var(--color-highlight)',
                    border: '1px solid rgba(184, 134, 11, 0.15)',
                  }}
                >
                  Available for Opportunities
                </span>
              </AnimatedSection>

              {/* Name */}
              <AnimatedSection delay={0.3}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.2]">
                  <span className="inline-block mr-3.5" style={{ color: 'var(--color-text)' }}>
                    Hi, I'm
                  </span>
                  <span className="inline-flex items-center gradient-text relative">
                    {typedName}
                    {showCursor && (
                      <motion.span
                        className="inline-block w-1 ml-1.5 h-[0.85em] rounded-sm"
                        style={{ background: 'var(--color-highlight)' }}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </span>
                </h1>
              </AnimatedSection>

              {/* Subtitle */}
              <AnimatedSection delay={0.4}>
                <p
                  className="mt-5 text-2xl sm:text-3xl font-semibold max-w-xl mx-auto lg:mx-0"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Aspiring Software Engineer
                </p>
              </AnimatedSection>

              {/* CTA */}
              <AnimatedSection delay={0.5}>
                <div className="flex items-center mt-10 justify-center lg:justify-start">
                  <Link to="/projects" className="btn-primary">
                    <span>View Projects</span>
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* Right side: Photo with 3D Tilt & Floating effects */}
            <AnimatedSection delay={0.2} direction="right" className="flex-shrink-0">
              <motion.div
                className="relative cursor-pointer"
                style={{
                  perspective: 1000,
                  transformStyle: 'preserve-3d',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handlePhotoClick}
              >
                {/* Glow ring */}
                <motion.div
                  className="absolute -inset-4 rounded-full opacity-40 blur-2xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-border), var(--color-highlight-soft))',
                    transform: 'translateZ(-30px)',
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.35, 0.5, 0.35],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Outer spinning dashed futuristic tech ring */}
                <motion.div
                  className="absolute -inset-1.5 rounded-full border opacity-45"
                  style={{
                    borderColor: 'var(--color-highlight)',
                    transform: 'translateZ(-15px)',
                    borderStyle: 'dashed',
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* 3D Tilted Photo Container */}
                <motion.div
                  className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden"
                  style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)',
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <img
                    src={headshotUrl}
                    alt="Professional headshot"
                    className="w-full h-full object-cover scale-105 select-none pointer-events-none"
                    style={{
                      objectPosition: 'calc(50% - 5px) 50%',
                      transform: 'translateZ(20px)',
                    }}
                  />
                </motion.div>

                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditPhotoOpen(true);
                    }}
                    className="absolute bottom-2 right-2 p-3 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-105 flex items-center justify-center border-2"
                    style={{
                      background: 'var(--color-accent)',
                      borderColor: 'var(--color-bg)',
                      boxShadow: 'var(--shadow-md)',
                      width: '42px',
                      height: '42px',
                      zIndex: 30,
                      transform: 'translateZ(40px)',
                    }}
                    title="Change Photo"
                  >
                    📷
                  </button>
                )}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center p-2"
            style={{ border: '2px solid var(--color-border)' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-accent-soft)' }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ---- ABOUT ME SECTION ---- */}
      <section className="py-24 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
        <div className="section-container">
          <SectionHeading
            title="About Me"
            subtitle="A snapshot of my background, focus areas, and aspirations."
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
            {/* Bio Text */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <AnimatedSection delay={0.1}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  Who I Am
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  I am a dedicated Computer Science student and software engineer who loves turning complex problems into elegant, functional digital experiences. With a robust academic background, I bridge the gap between frontend design aesthetics and robust backend architecture.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Beyond standard full-stack development, I am deeply fascinated by Artificial Intelligence and Machine Learning, exploring how intelligent algorithms can enhance user interaction and data processing.
                </p>
              </AnimatedSection>
            </div>

            {/* 4 Cards Grid */}
            <div className="lg:col-span-7">
              <AnimatedSection delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full">
                  {/* Card 1: Education */}
                  <div
                    className="glass p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-500/20 flex flex-col justify-between min-h-[115px]"
                    style={{
                      borderColor: 'var(--color-border-light)',
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            background: 'rgba(184, 134, 11, 0.08)',
                            color: 'var(--color-highlight)',
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-[13px] tracking-wider uppercase" style={{ color: 'var(--color-text)' }}>
                          Education
                        </h3>
                      </div>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Final-year <span className="font-semibold text-[var(--color-text)]">Computer Science</span> student with a solid academic foundation.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Development */}
                  <div
                    className="glass p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-500/20 flex flex-col justify-between min-h-[115px]"
                    style={{
                      borderColor: 'var(--color-border-light)',
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            background: 'rgba(45, 52, 54, 0.06)',
                            color: 'var(--color-accent)',
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-[13px] tracking-wider uppercase" style={{ color: 'var(--color-text)' }}>
                          Full-Stack Dev
                        </h3>
                      </div>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Skilled in <span className="font-semibold text-[var(--color-text)]">MERN Stack</span>, with <span className="font-semibold text-[var(--color-text)]">8+ major</span> real-world solutions built.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: AI & Machine Learning */}
                  <div
                    className="glass p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-500/20 flex flex-col justify-between min-h-[115px]"
                    style={{
                      borderColor: 'var(--color-border-light)',
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            background: 'rgba(99, 110, 114, 0.08)',
                            color: 'var(--color-accent-soft)',
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-[13px] tracking-wider uppercase" style={{ color: 'var(--color-text)' }}>
                          AI & ML
                        </h3>
                      </div>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Passionate about <span className="font-semibold text-[var(--color-text)]">Machine Learning</span> & <span className="font-semibold text-[var(--color-text)]">Computer Vision</span>.
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Open Opportunities */}
                  <div
                    className="glass p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-500/20 flex flex-col justify-between min-h-[115px]"
                    style={{
                      borderColor: 'var(--color-border-light)',
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            background: 'rgba(184, 134, 11, 0.08)',
                            color: 'var(--color-highlight)',
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-[13px] tracking-wider uppercase" style={{ color: 'var(--color-text)' }}>
                          Opportunities
                        </h3>
                      </div>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Actively seeking <span className="font-semibold text-[var(--color-text)]">placement roles</span> and freelance projects.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ---- SKILLS SECTION ---- */}
      <section className="py-24" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="section-container">
          <SectionHeading
            title="Skills & Technologies"
            subtitle="Tools and technologies I use to build impactful solutions."
          />

          {/* Edit Toolbar */}
          {isAdmin && (
            <div className="flex items-center justify-center gap-4 mb-12 -mt-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary !py-2.5 !px-6 !text-sm flex items-center gap-2"
                style={{
                  background: isEditing ? 'var(--color-highlight)' : 'var(--color-accent)',
                }}
              >
                <span>{isEditing ? '✓ Done Editing' : '🔧 Edit Skills'}</span>
              </button>
              {isEditing && (
                <button
                  onClick={handleReset}
                  className="btn-secondary !py-2.5 !px-6 !text-sm hover:border-red-500 hover:text-red-500"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  Reset Defaults
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, catIndex) => (
              <AnimatedSection key={category.id} delay={catIndex * 0.1}>
                <div
                  className="rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-lg relative flex flex-col justify-between"
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border-light)',
                  }}
                >
                  {/* Delete Card Button */}
                  {isEditing && (
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer border border-red-200"
                      title="Delete card"
                    >
                      Delete Card
                    </button>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={category.icon || ''}
                            onChange={(e) => handleUpdateIcon(category.id, e.target.value)}
                            className="w-10 px-2 py-1 text-xl text-center rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500"
                            style={{
                              background: 'var(--color-surface)',
                              borderColor: 'var(--color-border)',
                              color: 'var(--color-text)',
                            }}
                            placeholder="🌐"
                            title="Category Emoji"
                          />
                          <input
                            type="text"
                            value={category.title || ''}
                            onChange={(e) => handleUpdateTitle(category.id, e.target.value)}
                            className="flex-1 px-3 py-1 font-semibold rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500"
                            style={{
                              background: 'var(--color-surface)',
                              borderColor: 'var(--color-border)',
                              color: 'var(--color-text)',
                            }}
                            placeholder="Category Title"
                          />
                        </>
                      ) : (
                        <>
                          <span className="text-2xl">{category.icon}</span>
                          <h3
                            className="text-lg font-semibold tracking-tight"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {category.title}
                          </h3>
                        </>
                      )}
                    </div>

                    {/* Skill chips */}
                    <div className="flex flex-wrap gap-2.5 mb-6">
                      {category.skills.map((skill) => (
                        <SkillBadge
                          key={skill.name}
                          name={skill.name}
                          icon={skill.icon}
                          onDelete={isEditing ? () => handleDeleteSkill(category.id, skill.name) : undefined}
                        />
                      ))}
                      {category.skills.length === 0 && !isEditing && (
                        <span className="text-sm italic" style={{ color: 'var(--color-text-muted)' }}>
                          No skills added yet.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add Skill form in edit mode */}
                  {isEditing && (
                    <div
                      className="mt-4 pt-4 border-t"
                      style={{ borderColor: 'var(--color-border-light)' }}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newSkillIcons[category.id] || ''}
                          onChange={(e) => setNewSkillIcons(prev => ({ ...prev, [category.id]: e.target.value }))}
                          className="w-10 px-2 py-1.5 text-center text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500"
                          style={{
                            background: 'var(--color-surface)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text)',
                          }}
                          placeholder="✨"
                          title="Skill Emoji"
                        />
                        <input
                          type="text"
                          value={newSkillNames[category.id] || ''}
                          onChange={(e) => setNewSkillNames(prev => ({ ...prev, [category.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              handleAddSkill(category.id)
                            }
                          }}
                          className="flex-1 px-3 py-1.5 text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-amber-500"
                          style={{
                            background: 'var(--color-surface)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text)',
                          }}
                          placeholder="Add skill..."
                        />
                        <button
                          onClick={() => handleAddSkill(category.id)}
                          className="px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-amber-600 hover:text-white transition-colors cursor-pointer border border-amber-500 text-amber-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}

            {/* Add New Category Card */}
            {isEditing && (
              <AnimatedSection delay={categories.length * 0.1}>
                <button
                  onClick={handleAddCategory}
                  className="rounded-2xl p-8 h-full min-h-[220px] transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-black/5 w-full"
                  style={{
                    border: '2px dashed var(--color-border)',
                    background: 'transparent',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span className="text-3xl">➕</span>
                  <span className="font-semibold text-base">Add Skill Card</span>
                </button>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* ---- CTA SECTION ---- */}
      <section className="py-24">
        <div className="section-container text-center">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Interested in working together?
            </h2>
            <p
              className="text-base max-w-md mx-auto mb-8"
              style={{ color: 'var(--color-text-muted)' }}
            >
              I'm actively looking for software engineering roles. Let's connect.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Get in Touch →
              </Link>
              <Link to="/projects" className="btn-secondary">
                See My Work
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <EditPhotoModal
        isOpen={isEditPhotoOpen}
        onClose={() => setIsEditPhotoOpen(false)}
        onSave={handleSavePhoto}
        onReset={handleResetPhoto}
      />
      <PasswordModal
        isOpen={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
      />
    </PageTransition>
  )
}
