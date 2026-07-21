'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import TextReveal from '@/Components/TextReveal'
import Marquee from '@/Components/Marquee'

const primarySkills = [
  "Figma", "Framer", "React", "Next.js", "Flutter", "Swift",
  "Node.js", "Three.js", "Webflow", "GSAP", "TypeScript", "Tailwind CSS",
]

const extraSkills = [
  "Python", "OpenAI / LLMs", "PyTorch", "Supabase", "PostgreSQL",
  "Docker", "AWS", "Vercel", "GraphQL", "Prisma", "Redis", "Firebase",
]

const secondarySkills = [
  "Firebase", "Supabase", "PostgreSQL", "Docker", "AWS", "Vercel",
  "GraphQL", "REST API", "Prisma", "MongoDB", "Redis", "CI/CD",
  "OpenAI", "LangChain", "Vector DBs", "Stripe", "PostHog", "Mixpanel",
]

export default function TechStack() {
  const [showMore, setShowMore] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="py-16 sm:py-24 bg-[#F4F4F2] text-[#040300]" ref={sectionRef}>
      <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        <motion.span
          className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Technology
        </motion.span>

        <TextReveal
          as="h2"
          className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-[#040300] font-clash"
          type="words"
          stagger={0.06}
        >
          Our tech stack.
        </TextReveal>

        <motion.p
          className="mt-4 text-base sm:text-lg font-normal text-neutral-700 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          We build with modern, high-performance tools across design and engineering to deliver products that are fast, accessible, and maintainable.
        </motion.p>

        {/* Primary skills grid */}
        <div className="mt-10 sm:mt-14 flex flex-wrap gap-3 sm:gap-4">
          {primarySkills.map((skill, index) => (
            <motion.div
              key={skill}
              className="rounded-2xl border border-neutral-300 font-clash-semibold bg-white text-[#040300] font-bold px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg leading-6 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#FFC800]/20 hover:border-[#FFC800]"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
              } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.04,
                type: 'spring',
                stiffness: 120,
              }}
              whileHover={{
                y: -4,
                boxShadow: '0 8px 25px rgba(255, 200, 0, 0.2)',
              }}
            >
              {skill}
            </motion.div>
          ))}

          {/* Interactive + More Pill */}
          <motion.div
            onClick={() => setShowMore(!showMore)}
            className="rounded-2xl border-2 border-[#FFC800] bg-[#FFC800] text-[#040300] font-bold px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg leading-6 shadow-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(255,200,0,0.4)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, type: 'spring' }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {showMore ? 'Show Less −' : '+ More Technologies'}
          </motion.div>
        </div>

        {/* Expandable Extra Skills */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              className="mt-6 flex flex-wrap gap-3 p-6 bg-white rounded-3xl border border-amber-300 shadow-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              {extraSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="rounded-xl bg-[#FAFAF7] border border-neutral-300 px-5 py-2.5 text-sm sm:text-base font-bold text-[#040300] shadow-xs"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.04 }}
                >
                  ⚡ {skill}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Infinite marquee row */}
        <div className="mt-12">
          <Marquee speed={40} className="py-4">
            {secondarySkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#E5E5E0] border border-neutral-300 px-6 py-3 text-sm font-semibold text-[#181818] whitespace-nowrap shadow-xs"
              >
                {skill}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
