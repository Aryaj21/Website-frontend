'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function FloatingCore(): JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.35
    meshRef.current.rotation.x += delta * 0.15
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.7, 1]} />
      <meshStandardMaterial
        color="#4F46E5"
        metalness={0.9}
        roughness={0.2}
        emissive="#3B82F6"
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

export default function Scene3D(): JSX.Element {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <Environment preset="city" />
      <FloatingCore />
    </Canvas>
  )
}
