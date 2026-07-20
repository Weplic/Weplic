'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TextReveal from '@/Components/TextReveal'
import Marquee from '@/Components/Marquee'

const skills = [
  "Figma", "Framer", "React", "Next.js", "Flutter", "Swift",
  "Node.js", "Three.js", "Webflow", "GSAP", "TypeScript", "Tailwind CSS",
]

const secondarySkills = [
  "Firebase", "Supabase", "PostgreSQL", "Docker", "AWS", "Vercel",
  "GraphQL", "REST API", "Prisma", "MongoDB", "Redis", "CI/CD",
]

export default function TechStack() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-[#F4F4F2]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.span
          className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Technology
        </motion.span>

        <TextReveal
          as="h2"
          className="mt-4 text-5xl font-bold tracking-tight"
          type="words"
          stagger={0.06}
        >
          Our stack.
        </TextReveal>

        <motion.p
          className="mt-6 text-lg font-regular text-[#6A6A6A] text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          We work with best-in-class tools across design and engineering to
          deliver products that are fast, beautiful, and maintainable.
        </motion.p>

        {/* Primary skills grid */}
        <div className="mt-16 flex flex-wrap gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              className="rounded-2xl border border-amber-50 font-clash-semibold bg-[#FFFFFF] px-8 py-5 text-lg leading-6 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#FFC800]/10 hover:border-[#FFC800]/30 hover:scale-105"
              initial={{
                opacity: 0,
                y: 30,
                rotate: (index % 2 === 0 ? 3 : -3),
              }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                rotate: 0,
              } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.06,
                type: 'spring',
                stiffness: 120,
              }}
              whileHover={{
                y: -3,
                boxShadow: '0 8px 25px rgba(255, 200, 0, 0.15)',
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>

        {/* Infinite marquee row */}
        <div className="mt-12">
          <Marquee speed={40} className="py-4">
            {secondarySkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#e8e8e5] px-6 py-3 text-sm font-medium text-[#666] whitespace-nowrap"
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
