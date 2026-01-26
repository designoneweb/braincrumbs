'use client'

import { Suspense, useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Terminal } from '../ui/Terminal'
import { GlowButton } from '../ui/GlowButton'

// Dynamic import for 3D component to avoid SSR issues
const Brain3D = dynamic(() => import('./Brain3D').then(mod => ({ default: mod.Brain3D })), {
  ssr: false,
  loading: () => null,
})

const terminalLines = [
  { text: 'BrianCrumby.init({ mode: "GOD_MODE" });', isCommand: true, delay: 800 },
  { text: '> Initializing neural pathways...', delay: 600 },
  { text: '> Loading full-stack expertise...', delay: 600 },
  { text: '> AI orchestration protocols active...', delay: 600 },
  { text: '✓ 100% Success Rate achieved', delay: 1000 },
]

export function Hero() {
  const controls = useAnimationControls()

  useEffect(() => {
    // Start animations after component mounts
    const startAnimations = async () => {
      await controls.start('visible')
    }
    startAnimations()
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Brain Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Brain3D />
        </Suspense>
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 pt-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Headline */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            variants={itemVariants}
          >
            <span className="glitch-text block" data-text="I Don't Just Code.">
              I Don't Just Code.
            </span>
            <span className="holo-text block mt-2">
              I Manifest Reality.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="font-display text-xl md:text-2xl text-white/60 mb-12 tracking-wide"
            variants={itemVariants}
          >
            Full-Stack Engineering. High-Fidelity Design. AI Orchestration.
          </motion.p>

          {/* Terminal */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
          >
            <Terminal lines={terminalLines} className="mx-auto" />
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <GlowButton
              href="https://www.freelancer.com/u/BrianCrumby"
              external
              className="text-lg"
            >
              [ ACCESS THE ARCHITECT ]
            </GlowButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            variants={itemVariants}
          >
            <motion.div
              className="w-6 h-10 border-2 border-terminal-green/50 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-3 bg-terminal-green rounded-full mt-2"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
