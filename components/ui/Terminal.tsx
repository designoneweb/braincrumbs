'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TerminalLine {
  text: string
  isCommand?: boolean
  delay?: number
}

interface TerminalProps {
  lines: TerminalLine[]
  className?: string
}

export function Terminal({ lines, className = '' }: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false)
      return
    }

    const currentLine = lines[currentLineIndex]
    const fullText = currentLine.text

    if (currentCharIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          newLines[currentLineIndex] = fullText.substring(0, currentCharIndex + 1)
          return newLines
        })
        setCurrentCharIndex(prev => prev + 1)
      }, 30 + Math.random() * 30) // Variable typing speed for realism

      return () => clearTimeout(timeout)
    } else {
      // Line complete, move to next
      const delay = currentLine.delay || 500
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentLineIndex, currentCharIndex, lines])

  return (
    <motion.div
      className={`terminal-window max-w-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="ml-4 text-xs text-white/40 font-mono">brain_crumbs.sh</span>
      </div>

      {/* Terminal Body */}
      <div className="terminal-body min-h-[120px]">
        {displayedLines.map((line, index) => (
          <div key={index} className="mb-2">
            {lines[index]?.isCommand && (
              <span className="terminal-prompt">{'>'} </span>
            )}
            <span className={lines[index]?.isCommand ? 'text-terminal-green' : 'text-white/80'}>
              {line}
            </span>
            {index === currentLineIndex && isTyping && (
              <span className="terminal-cursor" />
            )}
          </div>
        ))}
        {!isTyping && displayedLines.length === lines.length && (
          <div className="mt-4">
            <span className="terminal-prompt">{'>'} </span>
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
