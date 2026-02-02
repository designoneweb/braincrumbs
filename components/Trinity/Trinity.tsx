'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface PillarProps {
  title: string
  subtitle: string
  copy: string
  icon: React.ReactNode
  gradient: string
  index: number
}

function Pillar({ title, subtitle, copy, icon, gradient, index }: PillarProps) {
  return (
    <motion.div
      className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <motion.div
            className={`aspect-square rounded-2xl overflow-hidden relative ${gradient}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {icon}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <motion.span
              className="font-mono text-terminal-green text-sm tracking-widest uppercase"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {subtitle}
            </motion.span>

            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="text-lg text-white/70 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {copy}
            </motion.p>

            <motion.div
              className="w-24 h-1 bg-terminal-green"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ originX: 0 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Animated icon components (desktop — use whileInView)
function DarkroomIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 text-terminal-green">
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
          <motion.path
            key={i}
            d="M100,50 L130,100 L100,100 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            transform={`rotate(${rotation} 100 100)`}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
        <motion.circle
          cx="100" cy="100" r="60"
          fill="none" stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.circle
          cx="100" cy="100" r="30"
          fill="currentColor" fillOpacity="0.2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </motion.g>
    </svg>
  )
}

function CodebaseIcon() {
  return (
    <div className="font-mono text-terminal-green text-sm leading-loose opacity-80">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        <span className="text-holo-magenta">const</span> architect = {'{'}
      </motion.div>
      <motion.div className="ml-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        python: <span className="text-holo-cyan">true</span>,
      </motion.div>
      <motion.div className="ml-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        rust: <span className="text-holo-cyan">true</span>,
      </motion.div>
      <motion.div className="ml-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
        react: <span className="text-holo-cyan">true</span>,
      </motion.div>
      <motion.div className="ml-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
        solidity: <span className="text-holo-cyan">true</span>,
      </motion.div>
      <motion.div className="ml-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
        technicalDebt: <span className="text-holo-yellow">0</span>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
        {'}'};
      </motion.div>
    </div>
  )
}

function LatentSpaceIcon() {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48">
      <defs>
        <linearGradient id="holoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff00ff" />
          <stop offset="50%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#ffff00" />
        </linearGradient>
      </defs>
      <motion.g>
        {[
          [50, 50], [150, 50], [100, 100], [50, 150], [150, 150],
          [25, 100], [175, 100], [100, 25], [100, 175]
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i} cx={cx} cy={cy} r="8" fill="url(#holoGrad)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
        {[
          [50, 50, 100, 100], [150, 50, 100, 100],
          [100, 100, 50, 150], [100, 100, 150, 150],
          [50, 50, 25, 100], [150, 50, 175, 100],
          [100, 25, 50, 50], [100, 25, 150, 50]
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#holoGrad)" strokeWidth="1" strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
          />
        ))}
      </motion.g>
    </svg>
  )
}

// Static icon components (mobile — no IntersectionObserver dependency)
function DarkroomIconStatic() {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 text-terminal-green">
      <g>
        {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
          <path
            key={i}
            d="M100,50 L130,100 L100,100 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            transform={`rotate(${rotation} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="30" fill="currentColor" fillOpacity="0.2" />
      </g>
    </svg>
  )
}

function CodebaseIconStatic() {
  return (
    <div className="font-mono text-terminal-green text-sm leading-loose opacity-80">
      <div><span className="text-holo-magenta">const</span> architect = {'{'}</div>
      <div className="ml-4">python: <span className="text-holo-cyan">true</span>,</div>
      <div className="ml-4">rust: <span className="text-holo-cyan">true</span>,</div>
      <div className="ml-4">react: <span className="text-holo-cyan">true</span>,</div>
      <div className="ml-4">solidity: <span className="text-holo-cyan">true</span>,</div>
      <div className="ml-4">technicalDebt: <span className="text-holo-yellow">0</span></div>
      <div>{'}'};
      </div>
    </div>
  )
}

function LatentSpaceIconStatic() {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48">
      <defs>
        <linearGradient id="holoGradStatic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff00ff" />
          <stop offset="50%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#ffff00" />
        </linearGradient>
      </defs>
      <g>
        {[
          [50, 50], [150, 50], [100, 100], [50, 150], [150, 150],
          [25, 100], [175, 100], [100, 25], [100, 175]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="8" fill="url(#holoGradStatic)" />
        ))}
        {[
          [50, 50, 100, 100], [150, 50, 100, 100],
          [100, 100, 50, 150], [100, 100, 150, 150],
          [50, 50, 25, 100], [150, 50, 175, 100],
          [100, 25, 50, 50], [100, 25, 150, 50]
        ].map(([x1, y1, x2, y2], i) => (
          <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#holoGradStatic)" strokeWidth="1" strokeOpacity="0.5" />
        ))}
      </g>
    </svg>
  )
}

const pillarData = [
  {
    title: 'The Darkroom',
    subtitle: '// Design',
    copy: 'Composition is mathematical. From developing 35mm film in chemical baths to vectorizing brand identities. I see the grid before I draw the line.',
    gradient: 'bg-gradient-to-br from-void-lighter to-void border border-white/10',
  },
  {
    title: 'The Codebase',
    subtitle: '// Development',
    copy: 'Python, Rust, React, Solidity. Languages are just tools. I speak the logic of the machine. Clean architecture, zero technical debt.',
    gradient: 'bg-gradient-to-br from-void-lighter to-void border border-terminal-green/20',
  },
  {
    title: 'The Latent Space',
    subtitle: '// AI Orchestration',
    copy: "I don't fear the singularity; I hold the leash. I build the agents that replace your team. Prompt Engineering? No. I am a Prompt Mage.",
    gradient: 'bg-gradient-to-br from-void-lighter to-void border border-holo-magenta/20',
  },
]

const desktopIcons = [<DarkroomIcon />, <CodebaseIcon />, <LatentSpaceIcon />]
const mobileIcons = [<DarkroomIconStatic />, <CodebaseIconStatic />, <LatentSpaceIconStatic />]

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}

function MobilePillar({ title, subtitle, copy, icon, gradient, index }: PillarProps) {
  return (
    <div className="px-6 py-12">
      <div className="max-w-md mx-auto space-y-6">
        <div
          className={`aspect-square rounded-2xl overflow-hidden relative ${gradient}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {icon}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
        </div>

        <span className="block font-mono text-terminal-green text-sm tracking-widest uppercase">
          {subtitle}
        </span>

        <h2 className="font-display text-3xl font-bold text-white">
          {title}
        </h2>

        <p className="text-base text-white/70 leading-relaxed">
          {copy}
        </p>

        <div
          className="w-24 h-1 bg-terminal-green"
        />
      </div>
    </div>
  )
}

function ProgressBar({ scrollYProgress, start, end }: { scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']; start: number; end: number }) {
  const scaleX = useTransform(scrollYProgress, [start, end], [0, 1])
  return (
    <motion.div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-terminal-green"
        style={{ scaleX, originX: 0 }}
      />
    </motion.div>
  )
}

export function Trinity() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-200vw'])

  if (isMobile) {
    return (
      <section className="bg-void py-16">
        <div className="text-center mb-8">
          <span className="font-mono text-terminal-green text-sm tracking-widest">
            {'>'} The Trinity of Mastery
          </span>
        </div>

        <div className="space-y-8">
          {pillarData.map((pillar, index) => (
            <MobilePillar key={pillar.title} {...pillar} icon={mobileIcons[index]} index={index} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-void">
        <motion.div
          className="absolute top-20 left-0 right-0 text-center z-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-terminal-green text-sm tracking-widest">
            {'>'} The Trinity of Mastery
          </span>
        </motion.div>

        <motion.div
          className="flex h-full"
          style={{ x }}
        >
          {pillarData.map((pillar, index) => (
            <Pillar key={pillar.title} {...pillar} icon={desktopIcons[index]} index={index} />
          ))}
        </motion.div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {pillarData.map((_, index) => (
            <ProgressBar
              key={index}
              scrollYProgress={scrollYProgress}
              start={index / pillarData.length}
              end={(index + 1) / pillarData.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
