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
    id: 1782379337040,
    title: 'Zerodha Clone - Using MERN Stack Web development',
    emoji: '📊',
    description: 'A MERN stack replication of the Zerodha stock brokerage platform. Features a clean, minimal landing page alongside an interactive user dashboard for real-time stock monitoring, portfolio management, watchlist customization, and instant mock order placement.',
    longDescription: 'A full-stack, responsive stock trading application clone inspired by Zerodha\'s Kite platform. Built using the MERN stack (MongoDB, Express.js, React, Node.js), it replicates a high-performance trading ecosystem featuring real-time interactive watchlists, dynamic portfolio tracking (holdings and positions), responsive charting, and an absolute state-driven mock order execution engine.',
    tags: ['HTML', 'CSS', 'Javascript', 'React', 'NodeJS', 'MongoDB', 'ExpressJS'],
    features: ['Feature 1', 'Feature 2'],
    github: '',
    live: '',
    image: '',
  },
  {
    id: 1782379781459,
    title: 'SpamShield AI — Email Spam Detection Using BERT',
    emoji: '🛡️',
    description: 'SpamShield AI is a production-ready, full-stack spam detection platform. It uses a fine-tuned BERT (Bidirectional Encoder Representations from Transformers) model to analyze emails.',
    longDescription: 'SpamShield AI is a production-ready, full-stack spam detection platform. It uses a fine-tuned BERT (Bidirectional Encoder Representations from Transformers) model to analyze emails with high precision, providing real-time insights into tokenization, lemmatization, and spam indicators.',
    tags: ['Python', 'FastAPI', 'Uvicorn', 'PyTorch', 'Transformers', 'Scikit-learn', 'NLTK', 'Pandas', 'NumPy'],
    features: ['Feature 1', 'Feature 2'],
    github: 'https://github.com/Mayur303/SpamShield---Email-Spam-detection-AI',
    live: '',
    image: '',
  },
  {
    id: 1782380356037,
    title: 'EmotiSense AI -  Facial Emotion Recognition (FER) web application built with OpenCV, and DeepFace',
    emoji: '🚀',
    description: 'A real-time Facial Emotion Recognition (FER) web application built with FastAPI, React (Vite), OpenCV, and DeepFace.',
    longDescription: 'Frontend: Captures webcam frames using the HTML5 <video> and Canvas APIs, and streams binary JPEG frames to the backend.\nBackend: Processes incoming frames over WebSockets. Uses OpenCV\'s Haar Cascade for rapid face localization, followed by DeepFace (a deep learning facial recognition framework) to classify emotions into 7 categories.\nDashboard: Receives real-time JSON responses and overlays bounding boxes and emotion probabilities on a sleek, sci-fi themed UI built with Tailwind CSS and Framer Motion.',
    tags: ['React', 'FarmerMotion', 'Tailwind CSS', 'WebSocket', 'OpenCV', 'VGG-Face', 'Deepface', 'Recharts'],
    features: ['Feature 1', 'Feature 2'],
    github: 'https://github.com/Mayur303/Emotisense---Facial-Emotion-Recognition-System',
    live: 'https://emotisense10.vercel.app/',
    image: '',
  },
  {
    id: 1782457200715,
    title: 'VendorVerify – Smart QR Authentication System',
    emoji: '🚀',
    description: 'VendorVerify is a secure full-stack QR authentication platform that enables vendors to generate unique QR codes for products, allowing consumers to instantly verify product authenticity and prevent counterfeit goods.',
    longDescription: 'VendorVerify is a full-stack smart QR authentication platform designed to combat counterfeit products and improve supply chain transparency by enabling secure product verification. The system allows vendors to generate unique, cryptographically secure QR codes linked to individual products or batches, which consumers and verification staff can scan to instantly validate authenticity in real time. It incorporates role-based access control for vendors, consumers, and administrators, along with secure authentication, product management, and centralized monitoring.\n\nThe platform also maintains a comprehensive audit trail by recording every verification attempt, including scan time, location, and verification status, helping detect suspicious activities and enhance security. Built with a scalable architecture and responsive user interface, VendorVerify provides a reliable, efficient, and user-friendly solution for secure product authentication, vendor management, and counterfeit prevention across modern supply chains.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'HTML5', 'CSS3', 'JavaScript', 'JWT Authentication', 'bcrypt.js', 'QR Code Generation', 'REST APIs', 'MongoDB Atlas'],
    features: ['Feature 1', 'Feature 2'],
    github: 'https://github.com/Mayur303/FSD117-Mayur303',
    live: '',
    image: '',
  },
  {
    id: 1782459484726,
    title: 'Zoom -  full stack video conferencing web application.',
    emoji: '🚀',
    description: 'A MERN-based video conferencing application enabling secure, real-time meetings with chat and screen sharing. Developed a Zoom-inspired web application for secure, real-time video conferencing and seamless collaboration.',
    longDescription: '**Zoom – Full-Stack Video Conferencing Web Application** is a modern, scalable web platform that enables users to host and join secure real-time video meetings with seamless communication and collaboration. The application features user authentication, instant meeting creation, unique meeting links, HD video and audio calling, live chat, screen sharing, participant management, and responsive design to deliver a smooth experience across desktop and mobile devices. Built using the MERN stack with WebRTC and Socket.io for real-time communication, it ensures low-latency connectivity, secure data exchange, and an intuitive user interface for virtual meetings, online collaboration, and remote communication.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'WebRTC', 'Socket.io', 'JWT Authentication'],
    features: ['Feature 1', 'Feature 2'],
    github: '',
    live: '',
    image: '',
  },
]

/* ====================================
   PROJECTS PAGE
   ==================================== */
export default function Projects() {
  const { isAdmin } = useAdmin()
  const [projectsList, setProjectsList] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects_data_v2')
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
    localStorage.setItem('portfolio_projects_data_v2', JSON.stringify(projectsList))
  }, [projectsList])

  useEffect(() => {
    if (!isAdmin) {
      setIsEditing(false)
    }
  }, [isAdmin])

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all projects to default values? All custom edits will be lost.')) {
      setProjectsList(INITIAL_PROJECTS)
      localStorage.removeItem('portfolio_projects_data_v2')
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
