'use client'
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoCloseOutline } from 'react-icons/io5'
import { FiExternalLink, FiTrendingUp } from 'react-icons/fi'
import { useApp } from '@/Context/AppContext'
import Image from 'next/image'

const caseStudyDetails = {
  "Nexus Finance": {
    challenge: "Nexus Finance, a leading fintech startup, struggled with complex user onboarding and low mobile transaction rates. Their design system was fragmented across teams, causing slow product updates and inconsistent user interfaces.",
    solution: "We rebuilt their web and mobile interface from the absolute ground up. Our team designed a modular design system, consolidated complex multi-step identity checks into single-screen interactions, and designed customizable dashboard layouts that put high-priority actions front and center.",
    scope: ["Fintech UI/UX", "Brand Strategy", "Design System", "Mobile Development"],
    results: [
      { label: "User Retention", value: "+340%" },
      { label: "App Store Rating", value: "4.9★" },
      { label: "Global Markets", value: "12" }
    ]
  },
  "Luminary AI": {
    challenge: "As a fast-growing Series A AI provider, Luminary AI needed a brand identity and a high-performance marketing landing site that clearly communicated their complex LLM orchestration layers to senior enterprise CTOs.",
    solution: "We created a sleek, high-end visual design language leveraging advanced 3D interactive Spline components, glassmorphism, and dark-themed visual assets. We optimized site loading speeds to sub-300ms and wired up dynamic product demonstration tools directly within the browser.",
    scope: ["3D Landing Page", "Brand Identity", "Framer Prototyping", "Next.js Engineering"],
    results: [
      { label: "Funding Post-Launch", value: "$40M" },
      { label: "Product Hunt Rank", value: "#1" },
      { label: "First Month Traffic", value: "500k+" }
    ]
  },
  "Vera Health": {
    challenge: "Patient portal drop-offs and appointment booking failures were high due to cluttered forms and a confusing interface. Vera Health needed a stress-free patient experience compliant with accessibility guidelines.",
    solution: "We streamlined scheduling workflows into a single conversational step. We redesigned the EHR charts to let doctors and patients view trends effortlessly, updated colors to research-backed relaxing palettes, and implemented screen-reader accessible HTML structures throughout the app.",
    scope: ["Healthcare UX/UI", "Accessibility Audit", "React Development", "Patient Portals"],
    results: [
      { label: "Booking Drop-off", value: "-62%" },
      { label: "NPS Score", value: "78" },
      { label: "Awards Finalist", value: "2024" }
    ]
  }
}

export default function CaseStudyDrawer() {
  const { activeCaseStudy, closeCaseStudy, openBrief } = useApp()

  // Prevent background scroll when open
  useEffect(() => {
    if (activeCaseStudy) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [activeCaseStudy])

  const study = activeCaseStudy ? caseStudyDetails[activeCaseStudy.title] : null

  return (
    <AnimatePresence>
      {activeCaseStudy && study && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCaseStudy}
          />

          {/* Drawer container */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-[650px] bg-[#0A0A0A] text-white shadow-2xl z-[201] flex flex-col border-l border-white/5 overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 180 }}
          >
            {/* Header image / Banner */}
            <div className="relative h-[220px] w-full flex-shrink-0">
              <Image
                src={activeCaseStudy.image || '/image/works.png'}
                alt={activeCaseStudy.title}
                fill
                className="object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/40" />

              {/* Close Button */}
              <button
                onClick={closeCaseStudy}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all cursor-hover"
              >
                <IoCloseOutline size={26} />
              </button>

              <div className="absolute bottom-6 left-6">
                <span className="text-[#FFC800] text-xs font-semibold uppercase tracking-wider font-inter">CASE STUDY</span>
                <h3 className="text-3xl font-bold font-clash text-white mt-1">{activeCaseStudy.title}</h3>
              </div>
            </div>

            {/* Scrollable details */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
              {/* Highlight Stats Grid */}
              <div className="grid grid-cols-3 gap-4 bg-white/5 border border-white/10 rounded-2xl p-6">
                {study.results.map((r, i) => (
                  <div key={i} className="text-center">
                    <span className="text-2xl font-bold font-clash text-[#FFC800] block">{r.value}</span>
                    <span className="text-[11px] text-neutral-400 font-medium mt-1 block">{r.label}</span>
                  </div>
                ))}
              </div>

              {/* Scope Tags */}
              <div className="space-y-2">
                <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">PROJECT SCOPE</span>
                <div className="flex flex-wrap gap-2">
                  {study.scope.map((s, i) => (
                    <span key={i} className="bg-white/10 border border-white/5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* The Challenge */}
              <div className="space-y-3">
                <h4 className="text-lg font-bold font-clash text-white flex items-center gap-2">
                  <FiTrendingUp className="text-[#FFC800]" /> THE CHALLENGE
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              {/* The Solution */}
              <div className="space-y-3">
                <h4 className="text-lg font-bold font-clash text-white">THE SOLUTION</h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Bottom Panel Actions */}
            <div className="p-6 border-t border-white/5 bg-neutral-950 flex gap-4">
              <button
                onClick={() => {
                  closeCaseStudy()
                  openBrief(activeCaseStudy.title)
                }}
                className="flex-1 bg-[#FFC800] text-black font-semibold py-3.5 rounded-xl hover:bg-[#e6b400] transition-all text-center cursor-hover"
              >
                Request Similar Project
              </button>
              <button
                onClick={closeCaseStudy}
                className="border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-hover"
              >
                Close Drawer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
