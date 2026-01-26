'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface GlowButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
}

export function GlowButton({ children, href, onClick, className = '', external = false }: GlowButtonProps) {
  const buttonClasses = `holo-button neural-glow ${className}`

  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  }

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
          {...motionProps}
        >
          {children}
        </motion.a>
      )
    }
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a className={buttonClasses} {...motionProps}>
          {children}
        </motion.a>
      </Link>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={buttonClasses}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
