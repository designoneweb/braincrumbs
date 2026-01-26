'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
]

function KonamiOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // Auto-close after animation
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  // Trigger resume download
  useEffect(() => {
    // Create a fake download trigger (in production, this would link to actual resume)
    const link = document.createElement('a')
    link.href = '/resume/brian-crumby-resume.pdf'
    link.download = 'Brian_Crumby_Resume.pdf'
    // Note: In production, you'd have an actual PDF file
    // link.click()
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Glitch overlay */}
      <motion.div
        className="absolute inset-0 bg-void"
        animate={{
          backgroundColor: ['#000000', '#ff00ff', '#00ffff', '#00FF41', '#000000'],
        }}
        transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
      />

      {/* Glitch content */}
      <div className="absolute inset-0 flex items-center justify-center konami-active">
        <motion.div
          className="text-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="font-mono text-6xl md:text-8xl font-bold text-terminal-green mb-4"
            animate={{
              textShadow: [
                '0 0 20px #00FF41',
                '5px 5px 0 #ff00ff, -5px -5px 0 #00ffff',
                '0 0 40px #00FF41',
                '-3px 3px 0 #ff00ff, 3px -3px 0 #00ffff',
                '0 0 20px #00FF41',
              ],
            }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            ACHIEVEMENT UNLOCKED
          </motion.div>
          <motion.div
            className="font-mono text-xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            You found the secret. Resume downloading...
          </motion.div>

          {/* Fake progress bar */}
          <motion.div
            className="mt-8 w-64 h-2 bg-void-lighter rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-terminal-green"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Footer() {
  const [konamiProgress, setKonamiProgress] = useState<string[]>([])
  const [showKonami, setShowKonami] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const newProgress = [...konamiProgress, e.code]

    // Check if still on track
    const isValid = KONAMI_CODE.slice(0, newProgress.length).every(
      (key, i) => key === newProgress[i]
    )

    if (!isValid) {
      setKonamiProgress([])
      return
    }

    setKonamiProgress(newProgress)

    // Check if complete
    if (newProgress.length === KONAMI_CODE.length) {
      setShowKonami(true)
      setKonamiProgress([])
    }
  }, [konamiProgress])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-20 border-t border-white/5">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-void-lighter/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Brain<span className="text-terminal-green">Crumbs</span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Your project is currently limited by human inefficiency. I am the patch.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-mono text-sm text-terminal-green tracking-wider mb-4">
                // Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.freelancer.com/u/BrianCrumby"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-terminal-green transition-colors text-sm"
                  >
                    Freelancer.com Profile
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/briancrumby"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-terminal-green transition-colors text-sm"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/briancrumby"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-terminal-green transition-colors text-sm"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono text-sm text-terminal-green tracking-wider mb-4">
                // Contact
              </h4>
              <a
                href="mailto:brian@braincrumbs.app"
                className="text-white/50 hover:text-terminal-green transition-colors text-sm"
              >
                brian@braincrumbs.app
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-terminal-green/30 to-transparent mb-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-white/30">
              Built by Brian Crumby. Powered by Neural Networks & Caffeine.
            </p>

            <p className="font-mono text-xs text-white/30">
              © {currentYear} BrainCrumbs. All rights reserved.
            </p>
          </div>

          {/* Easter Egg Hint */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showHint ? 1 : 0 }}
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
          >
            <button
              onClick={() => setShowHint(!showHint)}
              className="font-mono text-xs text-white/10 hover:text-white/30 transition-colors"
            >
              ↑ ↑ ↓ ↓ ← → ← → B A
            </button>
          </motion.div>

          {/* Konami Progress Indicator (subtle) */}
          {konamiProgress.length > 0 && (
            <motion.div
              className="fixed bottom-4 right-4 flex gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {KONAMI_CODE.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < konamiProgress.length ? 'bg-terminal-green' : 'bg-white/10'
                  }`}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Konami Overlay */}
      <AnimatePresence>
        {showKonami && (
          <KonamiOverlay onClose={() => setShowKonami(false)} />
        )}
      </AnimatePresence>
    </footer>
  )
}
