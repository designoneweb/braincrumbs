'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function FloatingParticle({ position, index }: { position: [number, number, number], index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + index * 0.5) * 0.3
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2 + index
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.15, 0.02, 0.02]} />
      <meshBasicMaterial color="#00FF41" transparent opacity={0.6} />
    </mesh>
  )
}

function WireframeBrain() {
  const brainRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  // Create brain-like geometry using icosahedron with distortion
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 3)
    const positions = geo.attributes.position.array as Float32Array

    // Add brain-like bumps
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Create asymmetric brain shape
      const distortion = Math.sin(x * 3) * 0.2 + Math.cos(y * 2) * 0.15 + Math.sin(z * 4) * 0.1
      const length = Math.sqrt(x * x + y * y + z * z)
      const normalizedLength = length + distortion

      positions[i] = (x / length) * normalizedLength * (1 + Math.sin(y * 5) * 0.1)
      positions[i + 1] = (y / length) * normalizedLength * 1.1
      positions[i + 2] = (z / length) * normalizedLength * (1 + Math.cos(x * 5) * 0.1)
    }

    geo.attributes.position.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state) => {
    if (brainRef.current) {
      // Smooth mouse following
      brainRef.current.rotation.y += (pointer.x * 0.5 - brainRef.current.rotation.y) * 0.05
      brainRef.current.rotation.x += (-pointer.y * 0.3 - brainRef.current.rotation.x) * 0.05

      // Subtle breathing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      brainRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={brainRef}>
      {/* Wireframe brain */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#00FF41"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Inner glow */}
      <mesh geometry={geometry} scale={0.95}>
        <meshBasicMaterial
          color="#00FF41"
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Neural sparks */}
      <Sparkles
        count={100}
        scale={5}
        size={2}
        speed={0.4}
        color="#00FF41"
        opacity={0.8}
      />

      {/* Holographic outer shell */}
      <mesh geometry={geometry} scale={1.05}>
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  )
}

function NeuralPulse() {
  const pulseRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (pulseRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5
      pulseRef.current.scale.setScalar(2 + pulse * 0.5)
      ;(pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.1 * (1 - pulse)
    }
  })

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#00FF41" transparent opacity={0.1} />
    </mesh>
  )
}

function Scene() {
  // Generate positions for floating particles in a sphere around the brain
  const particlePositions = useMemo(() => {
    const positions: [number, number, number][] = []
    for (let i = 0; i < 20; i++) {
      const phi = Math.acos(-1 + (2 * i) / 20)
      const theta = Math.sqrt(20 * Math.PI) * phi
      const radius = 3.5 + Math.random() * 0.5

      positions.push([
        Math.cos(theta) * Math.sin(phi) * radius,
        Math.cos(phi) * radius * 0.8,
        Math.sin(theta) * Math.sin(phi) * radius,
      ])
    }
    return positions
  }, [])

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00FF41" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ffff" />

      {/* Main brain */}
      <WireframeBrain />

      {/* Neural pulse effect */}
      <NeuralPulse />

      {/* Floating particles (code-like bars) */}
      {particlePositions.map((pos, index) => (
        <FloatingParticle key={index} position={pos} index={index} />
      ))}
    </>
  )
}

export function Brain3D() {
  return (
    <div className="canvas-container w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
