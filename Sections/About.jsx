'use client'
import React, { useRef } from 'react'
import { Inter } from 'next/font/google'
import { FaDiamond, FaRegCircle, FaRegSquareFull } from "react-icons/fa6"
import { BsDiamondHalf, BsDiamond, BsTriangle } from "react-icons/bs"
import { motion, useInView } from 'framer-motion'
import TextReveal from '@/Components/TextReveal'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  const features = [
    { Icon: FaDiamond, title: "Senior Founder Squad", description: "Direct access to senior product designers & engineers with 8+ years experience. Zero bureaucracy." },
    { Icon: FaRegCircle, title: "2–4 Week MVP Sprints", description: "We build and launch production-grade web and mobile apps at startup speed without sacrificing craft." },
    { Icon: BsDiamondHalf, title: "AI-Native Stack", description: "Modern Next.js, LLM integrations, and cloud infrastructure engineered for high-growth tech startups." },
    { Icon: BsDiamond, title: "Design + Code Ownership", description: "Full IP ownership of production Figma design systems and clean, scalable TypeScript codebases." },
    { Icon: BsTriangle, title: "Founder Partnership", description: "We think like founders. Every UI decision is directly aligned with retention, growth, and Series A metrics." },
    { Icon: FaRegSquareFull, title: "Transparent Velocity", description: "Real-time Slack channels, shared Figma canvases, and weekly production demos. No surprises." },
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <div
      ref={sectionRef}
      className="bg-[#111111] w-full px-5 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24 flex flex-col gap-10 justify-center relative overflow-hidden text-white"
    >
      {/* Animated gradient orbs */}
      <div className="gradient-orb w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#FFC800]/10 -top-20 -right-20 pointer-events-none" />
      <div className="gradient-orb w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#FFC800]/5 bottom-10 left-20 pointer-events-none" style={{ animationDelay: '4s' }} />

      <div className="flex flex-col gap-4 relative z-10">
        <motion.p
          className={`${inter.className} text-xs sm:text-sm font-semibold leading-4 tracking-[2.4px] text-[#FFC800] uppercase`}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          WHY WEPLIC
        </motion.p>

        <TextReveal
          as="h2"
          className="text-white font-clash text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-2xl"
          type="words"
          stagger={0.06}
        >
          Built for founders who move fast.
        </TextReveal>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 relative z-10">
        {features.map(({ Icon, title, description }, index) => (
          <motion.div
            key={index}
            className="bg-[#1A1A1A] rounded-2xl p-6 sm:p-8 flex flex-col gap-4 group cursor-pointer transition-all duration-500 hover:bg-[#222222] hover:shadow-[0_8px_30px_rgba(255,200,0,0.1)] border border-neutral-800 hover:border-[#FFC800]/30"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover={{ y: -5 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ type: 'spring', delay: 0.3 + index * 0.1, stiffness: 200 }}
            >
              <Icon className="text-[#FFC800] text-2xl transition-transform duration-500 group-hover:scale-110" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className={`${inter.className} text-sm sm:text-base leading-relaxed text-neutral-300 font-normal`}>
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
