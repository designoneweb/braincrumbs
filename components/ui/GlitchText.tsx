'use client'

import { motion } from 'framer-motion'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function GlitchText({ text, className = '', as: Tag = 'span' }: GlitchTextProps) {
  return (
    <motion.span
      className={`glitch-text ${className}`}
      data-text={text}
      whileHover={{ scale: 1.02 }}
    >
      <Tag>{text}</Tag>
    </motion.span>
  )
}
