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
      description:
        "A complete digital banking experience — from identity to interface. We redesigned Nexus's entire product suite for web and mobile, building a design system from the ground up.",
      image: "/image/works.png",
      reverse: false,
      stats: [
        "340% increase in user retention",
        "4.9★ App Store rating",
        "Launched in 12 markets",
      ],
    },
    {
      id: 2,
      title: "Luminary AI",
      description:
        "Brand identity, design system, and marketing site for a Series A AI infrastructure company.",
      image: "/image/works.png",
      reverse: true,
      stats: [
        "$40M Series A closed post-launch",
        "Featured on Product Hunt",
        "500k site visits in first month",
      ],
    },
    {
      id: 3,
      title: "Vera Health",
      description:
        "Patient-facing app redesign for a leading telehealth platform. Simplifying complex healthcare workflows into elegant, stress-free interactions.",
      image: "/image/works.png",
      reverse: false,
      stats: [
        "62% reduction in appointment drop-off",
        "NPS score improved to 78",
        "Best Health App 2024 finalist",
      ],
    },
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#FAFAF7] py-24" ref={sectionRef}>
      <div className="px-6">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <motion.p
              className={`${inter.className} mb-4 text-xs font-semibold uppercase tracking-[3px] text-amber-500`}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Featured Work
            </motion.p>

            <TextReveal
              as="h2"
              className="max-w-xl text-[60px] font-bold leading-tight"
              type="words"
              stagger={0.06}
              duration={0.7}
            >
              Work that speaks for itself.
            </TextReveal>
          </div>

          <a href="#contact">
            <motion.button
              className="group flex items-center gap-2 font-medium cursor-hover"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ x: 5 }}
            >
              All Case Studies
              <BsArrowRightShort
                size={22}
                className="rotate-[315deg] transition group-hover:translate-x-1"
              />
            </motion.button>
          </a>
        </div>

        <div className="space-y-8">
          {worksData.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{
                opacity: 0,
                x: work.reverse ? 80 : -80,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
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