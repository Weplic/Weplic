'use client'
import { BsArrowRightShort, BsCheck2 } from "react-icons/bs"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useApp } from '@/Context/AppContext'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function WorkCard({ work }) {
  const { openCaseStudy } = useApp()
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      className="grid overflow-hidden rounded-[20px] sm:rounded-[28px] border border-neutral-200 bg-white lg:grid-cols-[1fr_1.2fr] group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left: Visual accent panel (no image) */}
      <div
        className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-0 overflow-hidden flex items-center justify-center p-6 sm:p-10"
        style={{ background: `linear-gradient(135deg, ${work.accent}20, ${work.accent}08)` }}
      >
        {/* Decorative ambient orb */}
        <div
          className="absolute w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: work.accent, top: '20%', left: '10%' }}
        />

        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center">
          {/* Category badge */}
          <motion.span
            className={`${inter.className} text-xs font-bold uppercase tracking-[3px] px-4 py-1.5 rounded-full border shadow-xs`}
            style={{ borderColor: work.accent, color: work.accent, backgroundColor: '#FFFFFF' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {work.category}
          </motion.span>

          {/* Large project title */}
          <motion.h3
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#040300] leading-tight font-clash"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {work.title}
          </motion.h3>

          {/* Tech stack pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {work.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                className={`${inter.className} text-xs font-semibold px-3 py-1 rounded-full bg-[#040300] text-white shadow-xs`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 200 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 bg-white">
        <motion.p
          className={`${inter.className} mb-6 sm:mb-8 leading-relaxed text-[#2D2D2D] font-normal text-base sm:text-lg`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {work.description}
        </motion.p>

        {/* Stats */}
        <div className="space-y-3">
          {work.stats.map((item, index) => (
            <motion.div
              key={item}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', delay: 0.4 + index * 0.1, stiffness: 200 }}
              >
                <BsCheck2 className="text-amber-600 text-sm font-bold" />
              </motion.div>
              <span className={`${inter.className} text-sm sm:text-base font-semibold text-[#111111]`}>{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Deliverables */}
        <motion.div
          className="flex flex-wrap gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {work.deliverables.map((tag) => (
            <span
              key={tag}
              className={`${inter.className} text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-300`}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={() => openCaseStudy(work)}
          className="group/btn mt-8 flex w-fit items-center gap-2 font-bold text-[#040300] relative cursor-hover text-base"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ x: 5 }}
        >
          View Case Study
          <BsArrowRightShort
            size={24}
            className="transition-transform duration-300 group-hover/btn:translate-x-2 text-[#040300]"
          />
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFC800] transition-all duration-300 group-hover/btn:w-full" />
        </motion.button>
      </div>
    </motion.div>
  )
}