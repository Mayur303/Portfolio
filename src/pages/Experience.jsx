import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import AnimatedSection from '../components/AnimatedSection'
import SectionHeading from '../components/SectionHeading'
import { useAdmin } from '../context/AdminContext'

/* ====================================
   EXPERIENCE DATA
   ==================================== */
const INITIAL_EXPERIENCES = [
  {
    role: 'Software Development Intern',
    organization: 'Civora Nexus',
    period: 'Jan 2026 – Feb 2026',
    description:
      'Completed a 5-week remote internship under the CivoraX Internship Program. Developed authentication modules, implemented smart validation processes, and maintained progress records using industry standard workflows.',
    responsibilities: [
      'Developed and integrated (FSD-117) VendorVerify Smart QR Authentication System',
      'Configured repository workflows and maintained changes using Git (push, pull, commit)',
      'Constructed modular frontend components and submitted daily project updates',
      'Demonstrated rapid learning ability, technical professionalism, and consistent performance',
    ],
    icon: '💻',
  },
  {
    role: 'Training and Placement Cell Coordinator',
    organization: 'College Placement Cell',
    period: 'Aug 2024 – Present',
    description:
      'Coordinated placement activities and facilitated communication between recruiters and students. Organized training sessions, workshops, and mock interviews to prepare students for top-tier company placements.',
    responsibilities: [
      'Bridged communication between hiring companies and the student body',
      'Organized mock interviews, aptitude tests, and technical workshops',
      'Managed logistics for on-campus and virtual placement drives',
      'Assisted in maintaining placement records and analytics',
    ],
    icon: '🎓',
  },
]

/* ====================================
   ACHIEVEMENTS DATA
   ==================================== */
const INITIAL_ACHIEVEMENTS = [
  {
    title: 'Programming Problem Solving',
    icon: '🧩',
    items: [
      'Consistent problem solver with strong DSA fundamentals',
      'Solved 200+ competitive programming and LeetCode problems',
      'Solved 100+SQL Queries on MS SQL Server at LeetCode platform',
    ],
  },
  {
    title: 'Innovation Hackathons',
    icon: '🏆',
    items: [
      'Participated in multiple national-level hackathons, developing innovative full-stack solutions and collaborating effectively in team-based problem-solving environments.',
      'Actively participated in hackathons, building real-world software solutions under tight deadlines while enhancing problem-solving and teamwork skills.',
    ],
  },
  {
    title: 'Scored At National Level Exams',
    icon: '🏆',
    items: [
      'Achieved 97.38 percentile in the Maharashtra Common Entrance Test (MHT-CET), demonstrating strong aptitude in Physics, Chemistry, and Mathematics.',
      'Successfully qualified JEE Main, securing a competitive percentile through consistent academic performance.',
    ],
  },
]

const INITIAL_HOBBIES = [
  {
    name: 'Building Web Applications',
    icon: '💻',
    description: 'Passionate about building scalable, user-centric full-stack web applications that solve real-world problems using modern technologies and clean architecture.',
  },
  {
    name: 'Solving DSA & Coding Challenges',
    icon: '🧩',
    description: 'Enjoy solving Data Structures and Algorithms problems to strengthen logical thinking, optimize solutions, and enhance problem-solving skills.',
  },
  {
    name: 'Cycling',
    icon: '🚴',
    description: 'Enjoy cycling to stay active, improve endurance, and maintain a healthy balance between work and personal well-being.',
  },
  {
    name: 'Traveling',
    icon: '✈️',
    description: 'Enjoy traveling to explore new places, experience diverse cultures, and gain fresh perspectives that inspire creativity and personal growth.',
  },
]

/* ====================================
   EXPERIENCE PAGE
   ==================================== */
export default function Experience() {
  const { isAdmin } = useAdmin()
  const [experiencesList, setExperiencesList] = useState(() => {
    const saved = localStorage.getItem('portfolio_experiences_data')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse experiences:', e)
      }
    }
    return INITIAL_EXPERIENCES
  })

  const [achievementsList, setAchievementsList] = useState(() => {
    const saved = localStorage.getItem('portfolio_achievements_data')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse achievements:', e)
      }
    }
    return INITIAL_ACHIEVEMENTS
  })

  const [hobbiesList, setHobbiesList] = useState(() => {
    const saved = localStorage.getItem('portfolio_hobbies_data')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse hobbies:', e)
      }
    }
    return INITIAL_HOBBIES
  })

  const [isEditing, setIsEditing] = useState(false)
  const [newResponsibilities, setNewResponsibilities] = useState({})
  const [newAchievementItems, setNewAchievementItems] = useState({})

  // Auto-save changes to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_experiences_data', JSON.stringify(experiencesList))
  }, [experiencesList])

  useEffect(() => {
    if (!isAdmin) {
      setIsEditing(false)
    }
  }, [isAdmin])

  useEffect(() => {
    localStorage.setItem('portfolio_achievements_data', JSON.stringify(achievementsList))
  }, [achievementsList])

  useEffect(() => {
    localStorage.setItem('portfolio_hobbies_data', JSON.stringify(hobbiesList))
  }, [hobbiesList])

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all experience, achievements, and hobbies to default values? All custom edits will be lost.')) {
      setExperiencesList(INITIAL_EXPERIENCES)
      setAchievementsList(INITIAL_ACHIEVEMENTS)
      setHobbiesList(INITIAL_HOBBIES)
      localStorage.removeItem('portfolio_experiences_data')
      localStorage.removeItem('portfolio_achievements_data')
      localStorage.removeItem('portfolio_hobbies_data')
    }
  }

  // Experiences Handlers
  const handleUpdateExperience = (index, field, value) => {
    setExperiencesList(prev =>
      prev.map((exp, i) => i === index ? { ...exp, [field]: value } : exp)
    )
  }

  const handleDeleteExperience = (index) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      setExperiencesList(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleAddExperience = () => {
    const newExp = {
      role: 'New Role Title',
      organization: 'New Organization',
      period: 'Period (e.g. Aug 2024 - Present)',
      description: 'Role and overview description goes here...',
      responsibilities: ['Responsibility bullet 1'],
      icon: '🎓'
    }
    setExperiencesList(prev => [...prev, newExp])
  }

  const handleAddResponsibility = (index) => {
    const text = newResponsibilities[index]?.trim()
    if (!text) return
    setExperiencesList(prev =>
      prev.map((exp, i) => {
        if (i === index) {
          return { ...exp, responsibilities: [...exp.responsibilities, text] }
        }
        return exp
      })
    )
    setNewResponsibilities(prev => ({ ...prev, [index]: '' }))
  }

  const handleDeleteResponsibility = (expIndex, respIndex) => {
    setExperiencesList(prev =>
      prev.map((exp, i) => {
        if (i === expIndex) {
          return {
            ...exp,
            responsibilities: exp.responsibilities.filter((_, rIdx) => rIdx !== respIndex)
          }
        }
        return exp
      })
    )
  }

  // Achievements Handlers
  const handleUpdateAchievement = (index, field, value) => {
    setAchievementsList(prev =>
      prev.map((ach, i) => i === index ? { ...ach, [field]: value } : ach)
    )
  }

  const handleDeleteAchievement = (index) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      setAchievementsList(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleAddAchievement = () => {
    const newAch = {
      title: 'New Achievement Group',
      icon: '🏆',
      items: ['Detail bullet point 1']
    }
    setAchievementsList(prev => [...prev, newAch])
  }

  const handleAddAchievementItem = (index) => {
    const text = newAchievementItems[index]?.trim()
    if (!text) return
    setAchievementsList(prev =>
      prev.map((ach, i) => {
        if (i === index) {
          return { ...ach, items: [...ach.items, text] }
        }
        return ach
      })
    )
    setNewAchievementItems(prev => ({ ...prev, [index]: '' }))
  }

  const handleDeleteAchievementItem = (achIndex, itemIndex) => {
    setAchievementsList(prev =>
      prev.map((ach, i) => {
        if (i === achIndex) {
          return {
            ...ach,
            items: ach.items.filter((_, idx) => idx !== itemIndex)
          }
        }
        return ach
      })
    )
  }

  // Hobbies Handlers
  const handleUpdateHobby = (index, field, value) => {
    setHobbiesList(prev =>
      prev.map((hob, i) => i === index ? { ...hob, [field]: value } : hob)
    )
  }

  const handleDeleteHobby = (index) => {
    if (window.confirm('Are you sure you want to delete this hobby card?')) {
      setHobbiesList(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleAddHobby = () => {
    const newHob = {
      name: 'New Hobby',
      icon: '🎯',
      description: 'Hobby/interest short description.'
    }
    setHobbiesList(prev => [...prev, newHob])
  }

  return (
    <PageTransition>
      {/* ---- EXPERIENCE & LEADERSHIP ---- */}
      <section className="pt-32 pb-24">
        <div className="section-container">
          <SectionHeading
            title="Experience & Leadership"
            subtitle="Roles that shaped my professional journey and leadership skills."
          />

          {/* Edit Toolbar */}
          {isAdmin && (
            <div className="flex items-center justify-center gap-4 mb-12 -mt-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary !py-2.5 !px-6 !text-sm flex items-center gap-2 cursor-pointer"
                style={{
                  background: isEditing ? 'var(--color-highlight)' : 'var(--color-accent)',
                }}
              >
                <span>{isEditing ? '✓ Done Editing' : '🔧 Edit Page'}</span>
              </button>
              {isEditing && (
                <button
                  onClick={handleReset}
                  className="btn-secondary !py-2.5 !px-6 !text-sm hover:border-red-500 hover:text-red-500 cursor-pointer"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  Reset Defaults
                </button>
              )}
            </div>
          )}

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden sm:block"
              style={{ background: 'linear-gradient(to bottom, var(--color-border-light), var(--color-border), var(--color-border-light))' }}
            />

            {experiencesList.map((exp, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.2}
                direction={index % 2 === 0 ? 'left' : 'right'}
                className={`relative mb-12 sm:mb-16 ${index % 2 === 0
                    ? 'md:pr-[calc(50%+2rem)] md:text-right'
                    : 'md:pl-[calc(50%+2rem)]'
                  }`}
              >
                {/* Timeline dot */}
                <div
                  className="hidden sm:flex absolute left-8 md:left-1/2 top-8 w-4 h-4 -translate-x-1/2 rounded-full z-10 items-center justify-center"
                  style={{
                    background: 'var(--color-bg)',
                    border: '3px solid var(--color-accent)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                />

                {/* Card */}
                <motion.div
                  className="rounded-2xl p-8 transition-all duration-500 relative"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border-light)',
                  }}
                  whileHover={{
                    boxShadow: '0 8px 32px rgba(26, 26, 46, 0.06)',
                    y: -2,
                  }}
                >
                  {isEditing && (
                    <button
                      onClick={() => handleDeleteExperience(index)}
                      className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer border border-red-200 shadow-sm"
                      title="Delete experience"
                    >
                      Delete
                    </button>
                  )}

                  {isEditing ? (
                    <div className="space-y-4 text-left">
                      {/* Icon & Role */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={exp.icon || ''}
                          onChange={(e) => handleUpdateExperience(index, 'icon', e.target.value)}
                          className="w-10 px-2 py-1 text-center rounded-lg border focus:ring-1 focus:ring-amber-500"
                          style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                          placeholder="💼"
                          title="Role Icon"
                        />
                        <input
                          type="text"
                          value={exp.role || ''}
                          onChange={(e) => handleUpdateExperience(index, 'role', e.target.value)}
                          className="flex-1 px-3 py-1 font-semibold rounded-lg border focus:ring-1 focus:ring-amber-500"
                          style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                          placeholder="Role Title"
                        />
                      </div>

                      {/* Org & Period */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={exp.organization || ''}
                          onChange={(e) => handleUpdateExperience(index, 'organization', e.target.value)}
                          className="px-3 py-1 text-sm rounded-lg border focus:ring-1 focus:ring-amber-500"
                          style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                          placeholder="Organization"
                        />
                        <input
                          type="text"
                          value={exp.period || ''}
                          onChange={(e) => handleUpdateExperience(index, 'period', e.target.value)}
                          className="px-3 py-1 text-sm rounded-lg border focus:ring-1 focus:ring-amber-500"
                          style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                          placeholder="Period"
                        />
                      </div>

                      {/* Description */}
                      <textarea
                        value={exp.description || ''}
                        onChange={(e) => handleUpdateExperience(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border focus:ring-1 focus:ring-amber-500 h-20 resize-none"
                        style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                        placeholder="Description of the role..."
                      />

                      {/* Responsibilities */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Responsibilities
                        </label>
                        <div className="space-y-1.5">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <div key={rIdx} className="flex items-center gap-2">
                              <span className="text-amber-500">▸</span>
                              <input
                                type="text"
                                value={resp}
                                onChange={(e) => {
                                  const updated = [...exp.responsibilities]
                                  updated[rIdx] = e.target.value
                                  handleUpdateExperience(index, 'responsibilities', updated)
                                }}
                                className="flex-1 px-3 py-1 text-sm rounded-lg border focus:ring-1 focus:ring-amber-500"
                                style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteResponsibility(index, rIdx)}
                                className="text-xs hover:text-red-500 transition-colors p-1"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                        {/* Add bullet */}
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            value={newResponsibilities[index] || ''}
                            onChange={(e) => setNewResponsibilities(prev => ({ ...prev, [index]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAddResponsibility(index)
                              }
                            }}
                            className="flex-1 px-3 py-1 text-sm rounded-lg border focus:ring-1 focus:ring-amber-500"
                            style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                            placeholder="Add responsibility bullet..."
                          />
                          <button
                            type="button"
                            onClick={() => handleAddResponsibility(index)}
                            className="px-2.5 py-1 rounded-lg text-sm font-semibold border border-amber-500 text-amber-500 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span className="text-2xl">{exp.icon}</span>
                        <div>
                          <h3
                            className="text-lg font-semibold tracking-tight"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {exp.role}
                          </h3>
                          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {exp.organization} {exp.period && `• ${exp.period}`}
                          </p>
                        </div>
                      </div>

                      <p
                        className="text-sm leading-relaxed mb-4 text-left"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {exp.description}
                      </p>

                      <ul className={`space-y-2 text-left`}>
                        {exp.responsibilities.map((item, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 text-sm ${index % 2 === 0 ? 'md:flex-row-reverse md:justify-start' : ''}`}
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-highlight)' }}>▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </motion.div>
              </AnimatedSection>
            ))}

            {/* Add Experience Button */}
            {isEditing && (
              <AnimatedSection
                delay={experiencesList.length * 0.2}
                className="relative mb-12 sm:mb-16 md:pl-[calc(50%+2rem)]"
              >
                <button
                  onClick={handleAddExperience}
                  className="rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-black/5 w-full min-h-[160px]"
                  style={{
                    border: '2px dashed var(--color-border)',
                    background: 'transparent',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span className="text-3xl">➕</span>
                  <span className="font-semibold text-sm">Add Experience Role</span>
                </button>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* ---- ACHIEVEMENTS ---- */}
      <section className="py-24" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="section-container">
          <SectionHeading
            title="Achievements"
            subtitle="Problem-solving milestones and competitive highlights."
          />

          <div className="max-w-3xl mx-auto">
            {achievementsList.map((achievement, index) => (
              <AnimatedSection key={index} delay={0.1}>
                <div
                  className="rounded-2xl p-8 mb-6 relative"
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border-light)',
                  }}
                >
                  {isEditing && (
                    <button
                      onClick={() => handleDeleteAchievement(index)}
                      className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer border border-red-200 shadow-sm"
                    >
                      Delete
                    </button>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={achievement.icon || ''}
                          onChange={(e) => handleUpdateAchievement(index, 'icon', e.target.value)}
                          className="w-10 px-2 py-1 text-center rounded-lg border focus:ring-1 focus:ring-amber-500 text-lg"
                          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                          placeholder="🏆"
                        />
                        <input
                          type="text"
                          value={achievement.title || ''}
                          onChange={(e) => handleUpdateAchievement(index, 'title', e.target.value)}
                          className="flex-1 px-3 py-1 font-semibold rounded-lg border focus:ring-1 focus:ring-amber-500"
                          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                          placeholder="Achievement Group Title"
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">{achievement.icon}</span>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {achievement.title}
                        </h3>
                      </>
                    )}
                  </div>

                  {/* Bullet items list */}
                  <ul className="space-y-2 text-left">
                    {achievement.items.map((item, i) => (
                      <li key={i} className="text-sm">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <span className="text-amber-500">▸</span>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const updated = [...achievement.items]
                                updated[i] = e.target.value
                                handleUpdateAchievement(index, 'items', updated)
                              }}
                              className="flex-1 px-3 py-1 text-sm rounded-lg border focus:ring-1 focus:ring-amber-500"
                              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteAchievementItem(index, i)}
                              className="text-xs hover:text-red-500 transition-colors p-1"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2">
                            <span style={{ color: 'var(--color-highlight)' }}>▸</span>
                            <span>{item}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Add Achievement item */}
                  {isEditing && (
                    <div className="flex gap-2 mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
                      <input
                        type="text"
                        value={newAchievementItems[index] || ''}
                        onChange={(e) => setNewAchievementItems(prev => ({ ...prev, [index]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddAchievementItem(index)
                          }
                        }}
                        className="flex-1 px-3 py-1 text-sm rounded-lg border focus:ring-1 focus:ring-amber-500"
                        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                        placeholder="Add milestone / highlight..."
                      />
                      <button
                        type="button"
                        onClick={() => handleAddAchievementItem(index)}
                        className="px-2.5 py-1 rounded-lg text-sm font-semibold border border-amber-500 text-amber-500 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}

            {/* Add Achievement Group Button */}
            {isEditing && (
              <button
                onClick={handleAddAchievement}
                className="rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-black/5 w-full min-h-[120px]"
                style={{
                  border: '2px dashed var(--color-border)',
                  background: 'transparent',
                  color: 'var(--color-text-muted)',
                }}
              >
                <span className="text-2xl">➕</span>
                <span className="font-semibold text-sm">Add Achievement Group</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ---- HOBBIES ---- */}
      <section className="py-24">
        <div className="section-container">
          <SectionHeading
            title="Interests & Hobbies"
            subtitle="A balance of logical thinking and physical activity."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hobbiesList.map((hobby, index) => (
              <AnimatedSection key={hobby.name || index} delay={index * 0.12}>
                <motion.div
                  className="rounded-2xl p-8 text-center transition-all duration-500 h-full relative flex flex-col justify-between"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border-light)',
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 8px 32px rgba(26, 26, 46, 0.06)',
                  }}
                >
                  {isEditing && (
                    <button
                      onClick={() => handleDeleteHobby(index)}
                      className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer border border-red-200"
                    >
                      ✕
                    </button>
                  )}

                  {isEditing ? (
                    <div className="space-y-3 mt-4 text-left">
                      {/* Icon */}
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Emoji</label>
                        <input
                          type="text"
                          value={hobby.icon || ''}
                          onChange={(e) => handleUpdateHobby(index, 'icon', e.target.value)}
                          className="w-12 px-2 py-1 text-center rounded-lg border focus:ring-1 focus:ring-amber-500"
                          style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                          placeholder="🎯"
                        />
                      </div>
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Hobby Name</label>
                        <input
                          type="text"
                          value={hobby.name || ''}
                          onChange={(e) => handleUpdateHobby(index, 'name', e.target.value)}
                          className="w-full px-3 py-1 rounded-lg border focus:ring-1 focus:ring-amber-500 text-sm font-semibold"
                          style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                          placeholder="Sudoku"
                        />
                      </div>
                      {/* Description */}
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Description</label>
                        <textarea
                          value={hobby.description || ''}
                          onChange={(e) => handleUpdateHobby(index, 'description', e.target.value)}
                          className="w-full px-3 py-1 text-xs rounded-lg border h-14 resize-none focus:ring-1 focus:ring-amber-500"
                          style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                          placeholder="Logical reasoning..."
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl block mb-3">{hobby.icon}</span>
                      <h4
                        className="text-base font-semibold mb-1"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {hobby.name}
                      </h4>
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {hobby.description}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatedSection>
            ))}

            {/* Add Hobby Button */}
            {isEditing && (
              <AnimatedSection delay={hobbiesList.length * 0.12}>
                <button
                  onClick={handleAddHobby}
                  className="rounded-2xl p-8 h-full min-h-[180px] transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-black/5 w-full"
                  style={{
                    border: '2px dashed var(--color-border)',
                    background: 'transparent',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span className="text-3xl">➕</span>
                  <span className="font-semibold text-sm">Add Hobby</span>
                </button>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
