'use client'
import { Inter } from "next/font/google"
import { BsArrowRightShort } from "react-icons/bs"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import WorkCard from "@/Components/WorkCard.jsx"
import TextReveal from '@/Components/TextReveal'

const inter = Inter({
  subsets: ["latin"],
})

export default function Works() {
  const worksData = [
    {
      id: 1,
      title: "Nexus Finance",
      category: "Fintech",
      description:
        "A complete digital banking experience — from identity to interface. We redesigned Nexus's entire product suite for web and mobile, building a design system from the ground up.",
      stats: [
        "340% increase in user retention",
        "4.9★ App Store rating",
        "Launched in 12 markets",
      ],
      deliverables: ["Design System", "Web App", "Mobile App", "Brand Identity"],
      techStack: ["React", "Node.js", "Figma", "Flutter"],
      accent: "#FFC800",
    },
    {
      id: 2,
      title: "Luminary AI",
      category: "AI Platform",
      description:
        "Brand identity, design system, and marketing site for a Series A AI infrastructure company.",
      stats: [
        "$40M Series A closed post-launch",
        "Featured on Product Hunt",
        "500k site visits in first month",
      ],
      deliverables: ["Brand Strategy", "Marketing Site", "Design System"],
      techStack: ["Next.js", "Three.js", "GSAP", "Figma"],
      accent: "#8B5CF6",
    },
    {
      id: 3,
      title: "Vera Health",
      category: "HealthTech",
      description:
        "Patient-facing app redesign for a leading telehealth platform. Simplifying complex healthcare workflows into elegant, stress-free interactions.",
      stats: [
        "62% reduction in appointment drop-off",
        "NPS score improved to 78",
        "Best Health App 2024 finalist",
      ],
      deliverables: ["UX Research", "App Redesign", "Design System"],
      techStack: ["React Native", "Swift", "Figma"],
      accent: "#22C55E",
    },
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#FAFAF7] py-16 sm:py-24 text-[#040300]" ref={sectionRef}>
      <div className="px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="mb-10 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <motion.p
              className={`${inter.className} mb-3 text-xs font-bold uppercase tracking-[3px] text-amber-600`}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Featured Work
            </motion.p>

            <TextReveal
              as="h2"
              className="max-w-xl text-[36px] sm:text-[48px] md:text-[60px] font-bold leading-tight text-[#040300] font-clash"
              type="words"
              stagger={0.06}
              duration={0.7}
            >
              Work that speaks for itself.
            </TextReveal>
          </div>

          <a href="#contact">
            <motion.button
              className="group flex items-center gap-2 font-bold text-[#040300] cursor-hover text-base"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ x: 5 }}
            >
              All Case Studies
              <BsArrowRightShort
                size={24}
                className="rotate-[315deg] transition group-hover:translate-x-1 text-[#040300]"
              />
            </motion.button>
          </a>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {worksData.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.97,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <WorkCard work={work} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}