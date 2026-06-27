import { useState, useEffect } from 'react'
import PageTransition from '../components/PageTransition'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import EditProjectModal from '../components/EditProjectModal'
import AnimatedSection from '../components/AnimatedSection'
import { useAdmin } from '../context/AdminContext'

/* ====================================
   PROJECT DATA
   ==================================== */
const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'Project Sammati',
    emoji: '📄',
    description:
      'A web application featuring document analysis and multilingual support, enabling users to process and understand documents across multiple languages.',
    longDescription:
      'Project Sammati is a comprehensive web application designed for document analysis and multilingual support. It enables users to upload, process, and analyze documents in multiple languages with an intuitive interface. The platform leverages modern NLP techniques to provide accurate translations and insightful document summaries.',
    tags: ['React', 'Node.js', 'MongoDB', 'NLP', 'Express'],
    features: [
      'Document upload and automated analysis pipeline',
      'Multilingual support with real-time translation',
      'Intelligent document summarization',
      'RESTful API architecture with Express.js',
      'Responsive UI built with React',
    ],
    github: '', // INSERT_GITHUB_LINK
    live: '',   // INSERT_LIVE_LINK
    image: '',  // INSERT_PROJECT_IMAGE_URL
  },
  {
    id: 2,
    title: 'Spam Email Detection',
    emoji: '🛡️',
    description:
      'An NLP mini-project utilizing the Enron Email Dataset and BERT-based models for high-accuracy spam classification.',
    longDescription:
      'This NLP project tackles email spam classification using the well-known Enron Email Dataset. It employs BERT-based transformer models fine-tuned for binary classification, achieving high precision and recall. The project demonstrates expertise in natural language understanding, data preprocessing, and model evaluation.',
    tags: ['NLP', 'BERT', 'Machine Learning', 'Enron Dataset'],
    features: [
      'Data preprocessing pipeline for the Enron Email Dataset',
      'BERT-based transformer model fine-tuning',
      'High-accuracy spam vs. legitimate classification',
      'Evaluation with precision, recall, and F1 metrics',
      'Visualization of model performance and confusion matrix',
    ],
    github: '', // INSERT_GITHUB_LINK
    live: '',   // INSERT_LIVE_LINK
    image: '',  // INSERT_PROJECT_IMAGE_URL
  },
  {
    id: 3,
    /* PLACEHOLDER_PROJECT_3 — Replace with your third project */
    title: 'Project Three',
    emoji: '🚀',
    description:
      'A placeholder for your third project. Replace this with your actual project details including description, tech stack, and links.',
    longDescription:
      'Replace this entire project object with your real project data. Include a thorough description of the problem solved, your approach, and the impact of the project.',
    tags: ['INSERT_TECH_1', 'INSERT_TECH_2', 'INSERT_TECH_3'],
    features: [
      'INSERT_FEATURE_1',
      'INSERT_FEATURE_2',
      'INSERT_FEATURE_3',
    ],
    github: '', // INSERT_GITHUB_LINK
    live: '',   // INSERT_LIVE_LINK
    image: '',  // INSERT_PROJECT_IMAGE_URL
  },
]

/* ====================================
   PROJECTS PAGE
   ==================================== */
export default function Projects() {
  const { isAdmin } = useAdmin()
  const [projectsList, setProjectsList] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects_data')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse saved projects:', e)
      }
    }
    return INITIAL_PROJECTS
  })

  const [selectedProject, setSelectedProject] = useState(null)
  const [editingProject, setEditingProject] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    localStorage.setItem('portfolio_projects_data', JSON.stringify(projectsList))
  }, [projectsList])

  useEffect(() => {
    if (!isAdmin) {
      setIsEditing(false)
    }
  }, [isAdmin])

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all projects to default values? All custom edits will be lost.')) {
      setProjectsList(INITIAL_PROJECTS)
      localStorage.removeItem('portfolio_projects_data')
    }
  }

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjectsList(prev => prev.filter(p => p.id !== projectId))
    }
  }

  const handleAddProject = () => {
    const newId = Date.now()
    const newProj = {
      id: newId,
      title: 'New Project',
      emoji: '🚀',
      description: 'A brief description of the new project.',
      longDescription: 'A detailed description of the new project including technologies, development process, and features.',
      tags: ['React', 'CSS'],
      features: ['Feature 1', 'Feature 2'],
      github: '',
      live: '',
      image: '',
    }
    setProjectsList(prev => [...prev, newProj])
    setEditingProject(newProj)
  }

  const handleSaveProject = (updatedProject) => {
    setProjectsList(prev =>
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    )
    setEditingProject(null)
  }

  return (
    <PageTransition>
      <section className="pt-32 pb-24 min-h-screen">
        <div className="section-container">
          <SectionHeading
            title="Projects"
            subtitle="A selection of projects that demonstrate my skills in full-stack development, NLP, and system design."
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
                <span>{isEditing ? '✓ Done Editing' : '🔧 Edit Projects'}</span>
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

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsList.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isEditing={isEditing}
                onDelete={handleDeleteProject}
                onEdit={setEditingProject}
                onExpand={setSelectedProject}
              />
            ))}

            {/* Add New Project Card */}
            {isEditing && (
              <AnimatedSection delay={projectsList.length * 0.1}>
                <button
                  onClick={handleAddProject}
                  className="rounded-2xl p-8 h-full min-h-[350px] transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-black/5 w-full"
                  style={{
                    border: '2px dashed var(--color-border)',
                    background: 'transparent',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span className="text-4xl">➕</span>
                  <span className="font-semibold text-base">Add New Project</span>
                </button>
              </AnimatedSection>
            )}
          </div>

          {/* "More coming soon" hint */}
          {!isEditing && (
            <div className="mt-16 text-center">
              <p className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
                More projects coming soon. Check back for updates.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Project Edit Modal */}
      <EditProjectModal
        project={editingProject}
        onSave={handleSaveProject}
        onClose={() => setEditingProject(null)}
      />
    </PageTransition>
  )
}
