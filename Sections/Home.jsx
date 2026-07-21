'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Inter } from 'next/font/google'
import { FaArrowRight } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import MagneticButton from '@/Components/MagneticButton'
import FloatingElements from '@/Components/FloatingElements'
import { useApp } from '@/Context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { openBrief } = useApp()
  const headingRef = useRef(null)
  const showcaseRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState(0)

  const products = [
    {
      label: 'Web App',
      emoji: '💻',
      title: 'Nexus Financial OS',
      desc: 'AI-driven banking dashboard built for Series A scale.',
      metrics: [
        { val: '3 wks', lbl: 'Built In' },
        { val: '99.9%', lbl: 'Uptime' },
        { val: '4.9★', lbl: 'Rating' },
      ],
      tech: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind'],
      accent: '#FFC800',
    },
    {
      label: 'Mobile App',
      emoji: '📱',
      title: 'Vera Health iOS',
      desc: 'Patient-first telehealth app with instant video sync.',
      metrics: [
        { val: '2 wks', lbl: 'Sprint' },
        { val: '62%', lbl: '↑ Retention' },
        { val: 'iOS+And', lbl: 'Cross' },
      ],
      tech: ['React Native', 'Swift', 'Supabase', 'Figma'],
      accent: '#22C55E',
    },
    {
      label: 'AI Platform',
      emoji: '🤖',
      title: 'Luminary AI Engine',
      desc: 'Custom LLM workflow processing 5M+ daily requests.',
      metrics: [
        { val: '<50ms', lbl: 'Latency' },
        { val: '10x', lbl: 'Efficiency' },
        { val: '$40M', lbl: 'Series A' },
      ],
      tech: ['Python', 'PyTorch', 'OpenAI', 'Vector DB'],
      accent: '#8B5CF6',
    },
  ]

  const current = products[activeTab]

  // Auto-rotate tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // 3D tilt on desktop
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.matchMedia('(pointer: coarse)').matches) return
      if (!showcaseRef.current) return
      const rect = showcaseRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePos({ x: x * 8, y: y * -8 })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Heading letter animation
  useEffect(() => {
    if (!headingRef.current) return
    const lines = headingRef.current.querySelectorAll('.hero-line')
    lines.forEach((line, i) => {
      const split = new SplitType(line, { types: 'chars' })
      gsap.fromTo(
        split.chars,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.025,
          duration: 0.7,
          delay: 2.5 + i * 0.12,
          ease: 'power3.out',
        }
      )
    })
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: (i) => ({
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.7, delay: 2.8 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <div className="w-full bg-[#FAFAF7] relative overflow-hidden">
      <FloatingElements color="#FFC800" opacity={0.06} count={5} />

      {/* Ambient gradient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#FFC800]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FFC800]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-5 sm:px-8 md:px-16 lg:px-24 pt-8 sm:pt-12 lg:pt-16 pb-4 sm:pb-8 lg:pb-16 min-h-[calc(100vh-80px)]">

        {/* ── LEFT: Text Content ── */}
        <div className="flex-1 max-w-2xl flex flex-col gap-5 sm:gap-7">
          {/* Status badge */}
          <motion.div
            className="flex bg-white border border-neutral-200/80 py-2 px-4 rounded-full shadow-[0_2px_20px_rgba(0,0,0,0.04)] items-center max-w-max"
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.3, type: 'spring' }}
          >
            <motion.div
              className="w-2 h-2 bg-[#FFC800] rounded-full mr-3"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className={`${inter.className} text-[#040300] font-bold text-xs sm:text-sm`}>
              High-velocity digital product studio
            </p>
          </motion.div>

          {/* Hero Heading */}
          <div
            ref={headingRef}
            className="flex flex-col text-[40px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold leading-[1.02] tracking-[-0.03em] text-[#040300] font-clash relative"
            style={{ perspective: '1000px' }}
          >
            <div className="absolute -left-4 sm:-left-6 top-3 sm:top-5 w-2.5 h-2.5 bg-[#FFC800] rounded-full hidden sm:block" />
            <span className="hero-line">We Don&apos;t</span>
            <span className="hero-line">Just <span className="relative inline-block">Design<span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-[4px] sm:h-[6px] bg-[#FFC800] rounded-full" /></span></span>
            <span className="hero-line">We Create</span>
            <span className="hero-line bg-gradient-to-r from-[#040300] via-[#555] to-[#040300] bg-clip-text text-transparent bg-[length:200%_100%]">
              Experiences.
            </span>
          </div>

          {/* Sub-text */}
          <motion.p
            className={`${inter.className} text-base sm:text-lg leading-relaxed text-neutral-600 max-w-[440px]`}
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Helping ambitious startups ship production-grade digital products in <strong className="text-[#040300]">weeks, not months</strong>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-1"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <MagneticButton>
              <motion.button
                onClick={() => openBrief()}
                className="bg-[#040300] text-white px-7 py-3.5 rounded-full text-sm sm:text-base font-bold flex items-center justify-center gap-3 group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Start Your Project
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </MagneticButton>

            <MagneticButton>
              <a href="#work">
                <motion.button
                  className="bg-white border-2 border-neutral-200 text-[#040300] px-7 py-3.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 hover:border-[#FFC800] hover:shadow-[0_4px_20px_rgba(255,200,0,0.15)] cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  View Our Work
                </motion.button>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Micro Trust Badges (Desktop) */}
          <motion.div
            className="hidden sm:flex items-center gap-6 mt-2"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: '⚡', text: '2-4 Week Sprints' },
              { icon: '🔒', text: '100% IP Ownership' },
              { icon: '🚀', text: '15+ MVPs Shipped' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2">
                <span className="text-sm">{badge.icon}</span>
                <span className={`${inter.className} text-xs font-semibold text-neutral-500`}>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Interactive Product Showcase ── */}
        <motion.div
          ref={showcaseRef}
          className="flex-1 w-full max-w-[520px] relative"
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative"
            style={{
              rotateX: mousePos.y,
              rotateY: mousePos.x,
              transformPerspective: 1200,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            {/* Main Card */}
            <div className="rounded-[28px] bg-white border border-neutral-200/60 shadow-[0_24px_80px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.03)] p-5 sm:p-7 flex flex-col gap-5 relative overflow-hidden">
              {/* Top ambient orb */}
              <div
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-[80px] pointer-events-none transition-colors duration-700"
                style={{ backgroundColor: `${current.accent}25` }}
              />

              {/* Tab Switcher */}
              <div className="flex gap-1.5 p-1.5 bg-[#F5F5F3] rounded-2xl relative z-10">
                {products.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all duration-400 relative ${
                      activeTab === i ? 'text-white' : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    {activeTab === i && (
                      <motion.div
                        layoutId="activeTabBg"
                        className="absolute inset-0 bg-[#040300] rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{p.emoji} {p.label}</span>
                  </button>
                ))}
              </div>

              {/* Progress bar for auto-rotation */}
              <div className="h-[2px] bg-neutral-100 rounded-full overflow-hidden -mt-2">
                <motion.div
                  key={activeTab}
                  className="h-full rounded-full"
                  style={{ backgroundColor: current.accent }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              </div>

              {/* Dynamic Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="relative z-10"
                >
                  {/* Status Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                      <span className={`${inter.className} text-[10px] font-bold text-neutral-500 uppercase tracking-[1.5px]`}>Live Preview</span>
                    </div>
                    <span
                      className={`${inter.className} text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full`}
                      style={{ color: current.accent, backgroundColor: `${current.accent}15` }}
                    >
                      Weplic Studio
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-clash text-[26px] sm:text-[32px] font-bold text-[#040300] leading-tight mb-1.5">
                    {current.title}
                  </h3>
                  <p className={`${inter.className} text-sm text-neutral-500 leading-relaxed mb-5`}>
                    {current.desc}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2.5 mb-5">
                    {current.metrics.map((m, i) => (
                      <motion.div
                        key={m.lbl}
                        className="bg-[#FAFAF7] rounded-2xl p-3 sm:p-3.5 border border-neutral-100 text-center hover:border-neutral-300 transition-colors"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08, type: 'spring' }}
                      >
                        <p className="font-clash text-lg sm:text-xl font-bold text-[#040300]">{m.val}</p>
                        <p className={`${inter.className} text-[10px] font-semibold text-neutral-400 mt-0.5 uppercase tracking-wider`}>{m.lbl}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {current.tech.map((t, i) => (
                      <motion.span
                        key={t}
                        className={`${inter.className} text-[11px] font-bold px-3 py-1.5 rounded-full bg-[#040300] text-white`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + i * 0.06, type: 'spring', stiffness: 250 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating Badges */}
            <motion.div
              className="absolute -top-3 -right-2 sm:-right-4 bg-[#FFC800] rounded-2xl px-3.5 py-2 shadow-lg shadow-[#FFC800]/25 border-2 border-white z-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className={`${inter.className} text-xs font-extrabold text-black`}>⚡ 2-4 Wk Sprint</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-3 -left-2 sm:-left-4 bg-white rounded-2xl px-3.5 py-2 shadow-lg border border-neutral-200 z-20"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              <span className={`${inter.className} text-xs font-bold text-[#040300]`}>✓ Production Ready</span>
            </motion.div>
          </motion.div>

          {/* Interaction Hint */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            <span className="w-1.5 h-1.5 bg-[#FFC800] rounded-full animate-pulse" />
            <p className={`${inter.className} text-[11px] font-semibold text-neutral-400`}>
              Interactive — tap tabs to preview
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator (Desktop only) */}
      <motion.div
        className="hidden lg:flex items-center gap-3 absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <div className="w-[22px] h-[34px] border-2 border-neutral-300 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1.5 h-2.5 bg-[#FFC800] rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <p className={`${inter.className} text-neutral-400 text-xs font-semibold`}>Scroll to explore</p>
      </motion.div>
    </div>
  )
}
