import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://braincrumbs.app'),
  title: 'Brain Crumbs | Brian Crumby - Full-Stack Architect & AI Orchestrator',
  description: 'I don\'t just code. I manifest reality. Full-Stack Engineering. High-Fidelity Design. AI Orchestration. Your project is currently limited by human inefficiency. I am the patch.',
  keywords: ['Full-Stack Developer', 'AI Engineer', 'React', 'Next.js', 'Python', 'Machine Learning', 'Freelancer', 'Web Development'],
  authors: [{ name: 'Brian Crumby' }],
  openGraph: {
    title: 'Brain Crumbs | Brian Crumby',
    description: 'Full-Stack Engineering. High-Fidelity Design. AI Orchestration.',
    url: 'https://braincrumbs.app',
    siteName: 'Brain Crumbs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brain Crumbs | Brian Crumby',
    description: 'I don\'t just code. I manifest reality.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-void min-h-screen">
        {/* Film Grain Overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* CRT Scanlines */}
        <div className="scanlines" aria-hidden="true" />

        {/* Main Content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
