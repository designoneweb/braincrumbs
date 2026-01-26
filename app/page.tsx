import { Hero } from '@/components/Hero/Hero'
import { Trinity } from '@/components/Trinity/Trinity'
import { GalaxyView } from '@/components/Portfolio/GalaxyView'
import { StatsTicker } from '@/components/Stats/StatsTicker'
import { Footer } from '@/components/Footer/Footer'

export default function Home() {
  return (
    <>
      {/* Hero Section - 3D Brain with Terminal */}
      <Hero />

      {/* The Trinity - Horizontal Scroll Parallax */}
      <Trinity />

      {/* Portfolio Galaxy View */}
      <GalaxyView />

      {/* Stats & Testimonials */}
      <StatsTicker />

      {/* Footer with Konami Code */}
      <Footer />
    </>
  )
}
