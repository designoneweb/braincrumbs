'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface StatProps {
  label: string
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

function AnimatedStat({ label, value, suffix = '', prefix = '', duration = 2 }: StatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      })
      return controls.stop
    }
  }, [isInView, value, count, duration])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="stats-ticker">
        <span className="stats-value">
          {prefix}{displayValue.toLocaleString()}{suffix}
        </span>
      </div>
      <div className="font-mono text-sm text-white/50 mt-2 tracking-wider">
        {label}
      </div>
    </motion.div>
  )
}

interface Testimonial {
  quote: string
  author: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Brian didn't just build the app, he saved our IPO.",
    author: 'CEO',
    role: 'FinTechCo',
  },
  {
    quote: "The only developer who's ever delivered ahead of schedule.",
    author: 'CTO',
    role: 'StartupXYZ',
  },
  {
    quote: "His code is so clean it made our senior devs cry.",
    author: 'Lead Engineer',
    role: 'TechGiant',
  },
  {
    quote: "Turned our 6-month roadmap into a 6-week delivery.",
    author: 'Product Manager',
    role: 'ScaleUp Inc',
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      className="code-comment p-6 border border-terminal-green/10 rounded-lg bg-void-lighter/50"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="text-white/40 mb-2">{'// '}<span className="text-terminal-green">{testimonial.role}</span></div>
      <div className="text-white/80 italic mb-3">"{testimonial.quote}"</div>
      <div className="text-terminal-green/60">— {testimonial.author}</div>
    </motion.div>
  )
}

export function StatsTicker() {
  const stats = [
    { label: 'Jobs Completed', value: 147, suffix: '+' },
    { label: 'Five-Star Reviews', value: 143, suffix: '' },
    { label: 'Success Rate', value: 100, suffix: '%' },
    { label: 'Client Retention', value: 94, suffix: '%' },
  ]

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void-lighter/20 to-void" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            className="font-mono text-terminal-green text-sm tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {'>'} The Freelancer.com Funnel
          </motion.span>
          <motion.h2
            className="font-display text-4xl md:text-5xl font-bold text-white mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Proof in the <span className="text-terminal-green">Numbers</span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} duration={2 + i * 0.2} />
          ))}
        </div>

        {/* Earnings Redacted */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-block border border-terminal-green/30 rounded-lg p-6 bg-void-soft">
            <div className="font-mono text-sm text-white/40 mb-2">Total Earnings</div>
            <div className="font-mono text-3xl text-terminal-green tracking-wider">
              $<span className="blur-sm select-none">███,███</span>
            </div>
            <div className="font-mono text-xs text-white/30 mt-2">[REDACTED FOR YOUR SAFETY]</div>
          </div>
        </motion.div>

        {/* Testimonials as Code Comments */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="font-mono text-sm text-white/40 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {'/**'}
            <br />
            {' * Client Testimonials'}
            <br />
            {' * @verified true'}
            <br />
            {' */'}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
