'use client'

import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { useRef, useMemo, JSX } from 'react'
import * as THREE from 'three'

/* ===================== 3D BACKGROUND ===================== */

function ParticleOrbit(): {
  const points = useRef<THREE.Points>(null!)
  const count = 1600

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 4 + 1
      const theta = Math.random() * Math.PI * 2
      arr[i * 3] = Math.cos(theta) * r
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2
      arr[i * 3 + 2] = Math.sin(theta) * r
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    points.current.rotation.y = t * 0.08
    points.current.rotation.x = t * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#5EEAD4"
        opacity={0.7}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

function Hero3D(): {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 6, 6]} intensity={0.8} />
      <Environment preset="city" />
      <ParticleOrbit />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

/* ===================== MAIN ===================== */

export default function Home(): {
  return (
    <main className="bg-[#0E1117] text-[#E5E7EB] overflow-hidden relative">
      <Navbar />
      <Hero />
      <CustomerLogos />
      <Problems />
      <Solutions />
      <ProductShowcase />
      <StatsSection />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}

/* ===================== NAV ===================== */

function Navbar(): {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="text-lg font-semibold">Suronex</span>
        <div className="flex gap-4">
          <button className="px-5 py-2 rounded-xl bg-teal-300 text-black font-medium transition transform hover:scale-105 hover:shadow-lg">
            Request Demo
          </button>
          <a href="#products" className="text-gray-300 hover:underline">
            Products
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ===================== HERO ===================== */

function Hero(): {
  return (
    <section className="relative min-h-screen flex items-center">
      <Hero3D />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E1117]/30 via-[#0E1117]/40 to-[#0E1117]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Multi‑Cloud Security & Compliance
          <span className="text-teal-300"> without Blind Spots</span>
        </motion.h1>

        <p className="mt-6 text-lg text-gray-300">
          Simplify cloud risk, automate compliance evidence, and protect
          your infrastructure in real‑time.
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <button className="px-8 py-3 bg-teal-300 text-black rounded-xl font-semibold transition transform hover:scale-105 hover:shadow-lg">
            Book Demo
          </button>
          <button className="px-8 py-3 border border-white/30 rounded-xl text-gray-200 transition transform hover:scale-105 hover:shadow-lg">
            See Platform
          </button>
        </div>
      </div>
    </section>
  )
}

/* ===================== CUSTOMER LOGOS ===================== */

function CustomerLogos(): {
  const logos = [
    "file.svg",
    "globe.svg",
    "next.svg",
    "vercel.svg",
    "window.svg",
  ]
  return (
    <section className="py-12 bg-black/20">
      <div className="max-w-6xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-6 items-center px-6">
        {logos.map((src) => (
          <img
            key={src}
            src={src}
            alt="Customer logo"
            className="mx-auto h-10 object-contain transition transform hover:scale-110 hover:opacity-80"
          />
        ))}
      </div>
    </section>
  )
}

/* ===================== PROBLEMS ===================== */

function Problems(): {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-semibold mb-8">
        Challenges Modern Teams Face
      </h2>

      <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-300">
        {[
          "Fragmented cloud visibility with blind spots.",
          "Manual compliance checks drain time and resources.",
          "Slow audit readiness and regulatory reporting.",
          "Reactive risk posture rather than proactive defense.",
        ].map((p) => (
          <p key={p} className="transition transform hover:text-teal-300 hover:scale-105">
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}

/* ===================== SOLUTIONS ===================== */

function Solutions(): {
  return (
    <section id="products" className="py-24 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-semibold text-center mb-12">
        How Suronex Solves These Challenges
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          "Unified dashboard provides complete visibility across AWS, Azure, GCP & SaaS.",
          "Continuous compliance scoring and automated remediation guidance.",
          "Prebuilt templates for ISO 27001, SOC 2, PCI‑DSS, HIPAA & more.",
          "Real-time monitoring with prioritized security alerts.",
          "AI-driven insights that scale with your cloud footprint.",
          "One-click audit-ready reports and compliance evidence.",
        ].map((item) => (
          <div key={item} className="p-6 bg-black/30 rounded-xl transition transform hover:-translate-y-2 hover:shadow-2xl">
            <p className="text-lg">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===================== PRODUCT SHOWCASE ===================== */

function ProductShowcase(): {
  return (
    <section className="py-24 bg-white/5">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-semibold mb-4">
            Track Compliance & Security in Real-Time
          </h3>
          <p className="text-gray-300 mb-6">
            See your frameworks, controls, and compliance status at a glance.
          </p>
          <img
            src="/images/dashboard2.svg"
            alt="Dashboard"
            className="rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
          />
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-4">
            Visual Insights & Reports
          </h3>
          <p className="text-gray-300 mb-6">
            Rich visual graphs help you understand trends and gaps instantly.
          </p>
          <img
            src="/images/graph-placeholder.png"
            alt="Graph"
            className="rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

/* ===================== STATS / ROI ===================== */

function StatsSection(): {
  return (
    <section className="py-20 text-center bg-black/20">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { number: "500%", label: "ROI in 3 months" },
          { number: "129%", label: "Team productivity ↑" },
          { number: "35+", label: "Compliance frameworks" }
        ].map(({ number, label }) => (
          <div key={label} className="transition transform hover:scale-105">
            <p className="text-4xl font-bold text-teal-300">{number}</p>
            <p className="text-gray-300 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===================== HOW IT WORKS ===================== */

function HowItWorks(): {
  return (
    <section className="py-40 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-semibold text-center mb-20">
        How Suronex Works
      </h2>

      <div className="grid md:grid-cols-4 gap-10">
        {[
          'Connect Cloud Accounts',
          'Continuously Monitor',
          'Prioritize Real Risk',
          'Automate Remediation',
        ].map((step) => (
          <div
            key={step}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 transition transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <h3 className="text-xl font-medium">{step}</h3>
            <p className="mt-3 text-gray-400 text-sm">
              Designed for modern enterprise environments.
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===================== FEATURES ===================== */

function Features(): {
  return (
    <section className="py-40 bg-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold mb-16">
          Built for Security Teams
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            'Unified Cloud Visibility',
            'Automated Policy Enforcement',
            'Continuous Compliance',
          ].map((feature) => (
            <div
              key={feature}
              className="p-10 rounded-3xl bg-black/40 border border-white/10 transition transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-medium">{feature}</h3>
              <p className="mt-4 text-gray-400 text-sm">
                Designed for scale and clarity.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== CALL TO ACTION ===================== */

function CTA(): {
  return (
    <section className="py-20 bg-teal-300 text-black text-center rounded-xl mx-6 my-20 transition transform hover:scale-105 hover:shadow-2xl">
      <h2 className="text-3xl font-semibold mb-4">
        Ready to secure your cloud with confidence?
      </h2>
      <button className="px-8 py-3 text-lg font-medium bg-black/80 text-teal-300 rounded-xl transition transform hover:scale-105 hover:shadow-lg">
        Book a Demo
      </button>
    </section>
  )
}

/* ===================== FOOTER ===================== */

function Footer(): {
  return (
    <footer className="py-10 text-center text-gray-500 text-sm border-t border-white/10">
      © {new Date().getFullYear()} Suronex. All rights reserved.
    </footer>
  )
}
