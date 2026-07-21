'use client'
import React, { useRef } from 'react'
import { Inter } from 'next/font/google'
import { FiZap, FiCode, FiUsers, FiShield, FiTrendingUp, FiClock } from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import TextReveal from '@/Components/TextReveal'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  const features = [
    {
      Icon: FiZap,
      title: "Startup-Speed Execution",
      description: "From zero to deployed MVP in 2–4 weeks. We move at the pace founders actually need — not agency timelines.",
      stat: "2–4 wks",
      statLabel: "avg. launch",
    },
    {
      Icon: FiUsers,
      title: "Founder-to-Founder",
      description: "No project managers or account reps in between. You work directly with senior builders who understand startup stakes.",
      stat: "0",
      statLabel: "middlemen",
    },
    {
      Icon: FiCode,
      title: "Production-Grade Code",
      description: "Clean TypeScript, scalable architecture, CI/CD pipelines — not throwaway prototypes. Your codebase is investor-ready from day one.",
      stat: "100%",
      statLabel: "production ready",
    },
    {
      Icon: FiShield,
      title: "Full IP Ownership",
      description: "Every line of code, every Figma file, every design token — it's yours. Complete handover, zero lock-in.",
      stat: "100%",
      statLabel: "yours",
    },
    {
      Icon: FiTrendingUp,
      title: "Built to Raise",
      description: "We design products that impress investors. Polished demos, conversion-optimized flows, and metrics dashboards that tell your growth story.",
      stat: "15+",
      statLabel: "MVPs funded",
    },
    {
      Icon: FiClock,
      title: "Radical Transparency",
      description: "Shared Slack channel, live Figma access, daily async updates, and weekly demo recordings. You always know exactly where things stand.",
      stat: "24/7",
      statLabel: "visibility",
    },
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <div
      ref={sectionRef}
      className="bg-[#0A0A0A] w-full px-5 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24 flex flex-col gap-12 relative overflow-hidden text-white"
    >
      {/* Ambient background effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#FFC800]/8 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FFC800]/5 to-transparent rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col gap-4 relative z-10 max-w-3xl">
        <motion.p
          className={`${inter.className} text-xs font-bold tracking-[3px] text-[#FFC800] uppercase`}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Why Weplic
        </motion.p>

        <TextReveal
          as="h2"
          className="text-white font-clash text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          type="words"
          stagger={0.05}
        >
          We exist because founders deserve better.
        </TextReveal>

        <motion.p
          className={`${inter.className} text-base sm:text-lg leading-relaxed text-neutral-400 max-w-xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Most agencies are too slow, too expensive, and too disconnected from what early-stage startups actually need. We&apos;re the opposite.
        </motion.p>
      </div>

      {/* Feature Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 relative z-10">
        {features.map(({ Icon, title, description, stat, statLabel }, index) => (
          <motion.div
            key={index}
            className="relative bg-[#111111] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-5 group cursor-default border border-neutral-800/60 hover:border-[#FFC800]/30 transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFC800]/0 to-[#FFC800]/0 group-hover:from-[#FFC800]/[0.03] group-hover:to-transparent transition-all duration-700 pointer-events-none rounded-3xl" />

            {/* Icon + Stat Row */}
            <div className="flex items-start justify-between relative z-10">
              <motion.div
                className="w-11 h-11 rounded-xl bg-[#FFC800]/10 border border-[#FFC800]/20 flex items-center justify-center group-hover:bg-[#FFC800]/20 transition-colors duration-500"
                initial={{ scale: 0, rotate: -90 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: 'spring', delay: 0.25 + index * 0.08, stiffness: 200 }}
              >
                <Icon className="text-[#FFC800] text-lg" />
              </motion.div>

              {/* Micro stat */}
              <div className="text-right">
                <p className="font-clash text-xl font-bold text-[#FFC800] leading-none">{stat}</p>
                <p className={`${inter.className} text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mt-0.5`}>{statLabel}</p>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-white font-clash mb-2">{title}</h3>
              <p className={`${inter.className} text-sm leading-relaxed text-neutral-400 font-normal`}>
                {description}
              </p>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FFC800] to-[#FFC800]/0 group-hover:w-full transition-all duration-700" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
