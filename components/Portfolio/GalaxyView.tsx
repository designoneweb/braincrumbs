'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Project {
  id: string
  title: string
  category: string
  description: string
  tech: string[]
  link?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 'neural-dashboard',
    title: 'Neural Analytics Dashboard',
    category: 'AI / Full-Stack',
    description: 'Real-time ML model monitoring with predictive analytics. Reduced inference latency by 40%.',
    tech: ['Python', 'FastAPI', 'React', 'TensorFlow'],
    featured: true,
  },
  {
    id: 'defi-protocol',
    title: 'DeFi Yield Protocol',
    category: 'Blockchain',
    description: 'Automated yield optimization across multiple chains. $2M+ TVL achieved.',
    tech: ['Solidity', 'Rust', 'React', 'The Graph'],
  },
  {
    id: 'brand-genesis',
    title: 'Brand Genesis System',
    category: 'Design / AI',
    description: 'AI-powered brand identity generator. From concept to vector in minutes.',
    tech: ['Figma API', 'GPT-4', 'Next.js', 'Vercel'],
  },
  {
    id: 'quantum-sim',
    title: 'Quantum Circuit Simulator',
    category: 'Research',
    description: 'Browser-based quantum computing playground with visual circuit builder.',
    tech: ['Qiskit', 'WebAssembly', 'Three.js', 'TypeScript'],
  },
  {
    id: 'trading-bot',
    title: 'Autonomous Trading Agent',
    category: 'AI / Finance',
    description: 'Multi-strategy trading system with reinforcement learning. 23% annual return.',
    tech: ['Python', 'PyTorch', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'creative-engine',
    title: 'Creative Engine',
    category: 'Generative Art',
    description: 'Real-time generative art platform. Each piece unique, all pieces mine.',
    tech: ['p5.js', 'GLSL', 'Node.js', 'WebGL'],
  },
]

interface ProjectNodeProps {
  project: Project
  position: { x: number; y: number }
  onSelect: (project: Project) => void
  isSelected: boolean
}

function ProjectNode({ project, position, onSelect, isSelected }: ProjectNodeProps) {
  const [isHovered, setIsHovered] = useState(false)

  const nodeSize = project.featured ? 120 : 80

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        x: '-50%',
        y: '-50%',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: isSelected ? 1.3 : isHovered ? 1.15 : 1,
        zIndex: isSelected || isHovered ? 20 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isSelected
            ? '0 0 60px rgba(0, 255, 65, 0.6), 0 0 120px rgba(0, 255, 65, 0.3)'
            : isHovered
            ? '0 0 40px rgba(0, 255, 65, 0.4), 0 0 80px rgba(0, 255, 65, 0.2)'
            : '0 0 20px rgba(0, 255, 65, 0.2)',
        }}
        style={{
          width: nodeSize,
          height: nodeSize,
        }}
      />

      {/* Node core */}
      <motion.div
        className={`
          relative rounded-full border-2 flex items-center justify-center
          ${project.featured ? 'border-terminal-green bg-terminal-green/10' : 'border-terminal-green/50 bg-void-lighter'}
        `}
        style={{
          width: nodeSize,
          height: nodeSize,
        }}
        animate={{
          borderColor: isSelected ? '#00ffff' : isHovered ? '#00FF41' : project.featured ? '#00FF41' : 'rgba(0, 255, 65, 0.5)',
        }}
      >
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border border-terminal-green/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Category icon */}
        <span className="font-mono text-xs text-terminal-green text-center px-2">
          {project.category.split('/')[0].trim()}
        </span>
      </motion.div>

      {/* Label */}
      <motion.div
        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
        animate={{ opacity: isHovered || isSelected ? 1 : 0.5 }}
      >
        <span className="font-mono text-xs text-white/80">{project.title}</span>
      </motion.div>

      {/* Orbiting particles for featured */}
      {project.featured && (
        <>
          {[0, 120, 240].map((rotation, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-terminal-green"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                rotate: [rotation, rotation + 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-terminal-green"
                style={{
                  transform: `translateX(${nodeSize / 2 + 15}px)`,
                }}
              />
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  )
}

function ProjectCard({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/90 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        className="relative max-w-2xl w-full bg-void-lighter border border-terminal-green/30 rounded-lg overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 0 60px rgba(0, 255, 65, 0.2), inset 0 0 60px rgba(0, 255, 65, 0.05)',
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-terminal-green/20">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-xs text-terminal-green/60 tracking-widest uppercase">
                {project.category}
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-white/70 leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div>
            <span className="font-mono text-xs text-terminal-green/60 tracking-widest uppercase block mb-3">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-terminal-green/10 border border-terminal-green/30 rounded font-mono text-sm text-terminal-green"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Code preview placeholder */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-4 text-sm text-white/60 font-mono">{project.id}.ts</span>
            </div>
            <div className="terminal-body text-sm">
              <div className="text-white/60">{'// Project metrics'}</div>
              <div><span className="text-holo-magenta">export const</span> metrics = {'{'}</div>
              <div className="ml-4">status: <span className="text-terminal-green">"completed"</span>,</div>
              <div className="ml-4">satisfaction: <span className="text-holo-yellow">100</span>,</div>
              <div className="ml-4">bugs: <span className="text-holo-cyan">0</span></div>
              <div>{'}'}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function GalaxyView() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Generate positions in a galaxy-like pattern (percentages)
  const positions = projects.map((_, i) => {
    const angle = (i / projects.length) * Math.PI * 2
    const radiusPercent = 25 + (i % 2) * 10
    return {
      x: 50 + Math.cos(angle) * radiusPercent,
      y: 50 + Math.sin(angle) * radiusPercent,
    }
  })

  // Generate stable star positions (only on client to avoid hydration mismatch)
  const starPositions = useMemo(() => {
    if (!isMounted) return []
    // Use seeded random for consistency
    const seed = 12345
    const seededRandom = (n: number) => {
      const x = Math.sin(seed + n) * 10000
      return x - Math.floor(x)
    }
    return [...Array(50)].map((_, i) => ({
      left: seededRandom(i * 3) * 100,
      top: seededRandom(i * 3 + 1) * 100,
      opacity: seededRandom(i * 3 + 2) * 0.5 + 0.2,
      duration: 2 + seededRandom(i * 3 + 3) * 2,
      delay: seededRandom(i * 3 + 4) * 2,
    }))
  }, [isMounted])

  // Mouse parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 100, damping: 30 }
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig)
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <section className="relative min-h-screen py-32 overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {isMounted && starPositions.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.span
          className="font-mono text-terminal-green text-sm tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {'>'} The Crumbs
        </motion.span>
        <motion.h2
          className="font-display text-4xl md:text-6xl font-bold text-white mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Fragments of <span className="holo-text">Genius</span>
        </motion.h2>
        <motion.p
          className="text-white/60 mt-4 font-mono text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Click a node to explore the project
        </motion.p>
      </div>

      {/* Galaxy Container */}
      <motion.div
        ref={containerRef}
        className="relative h-[600px] max-w-5xl mx-auto"
        onMouseMove={handleMouseMove}
        style={{
          x: parallaxX,
          y: parallaxY,
        }}
      >
        {/* Central glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-terminal-green/5 blur-3xl" />

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 255, 65, 0.3)" />
              <stop offset="50%" stopColor="rgba(0, 255, 65, 0.1)" />
              <stop offset="100%" stopColor="rgba(0, 255, 65, 0.3)" />
            </linearGradient>
          </defs>
          {/* Orbital paths */}
          <circle
            cx="50%"
            cy="50%"
            r="25%"
            fill="none"
            stroke="rgba(0, 255, 65, 0.1)"
            strokeWidth="1"
            strokeDasharray="5 10"
          />
          <circle
            cx="50%"
            cy="50%"
            r="35%"
            fill="none"
            stroke="rgba(0, 255, 65, 0.05)"
            strokeWidth="1"
            strokeDasharray="5 15"
          />
        </svg>

        {/* Project Nodes */}
        {projects.map((project, i) => (
          <ProjectNode
            key={project.id}
            project={project}
            position={{
              x: positions[i].x,
              y: positions[i].y,
            }}
            onSelect={setSelectedProject}
            isSelected={selectedProject?.id === project.id}
          />
        ))}
      </motion.div>

      {/* Selected Project Card */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectCard
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
