'use client'
import React, { useRef } from 'react'
import { IoArrowForward } from "react-icons/io5"
import { Inter } from 'next/font/google'
import { motion, useInView } from 'framer-motion'
import MagneticButton from '@/Components/MagneticButton'
import FloatingElements from '@/Components/FloatingElements'
import TextReveal from '@/Components/TextReveal'
import { useApp } from '@/Context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export default function Contact() {
  const { openBrief, openBooking } = useApp()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <div ref={sectionRef} className="w-full py-20 sm:py-32 px-5 sm:px-8 md:px-16 lg:px-24 bg-[#0A0A0A] text-white flex justify-center items-center relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="gradient-orb w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#FFC800]/10 -top-40 -left-40 pointer-events-none" />
      <div className="gradient-orb w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#FFC800]/5 -bottom-40 -right-40 pointer-events-none" style={{ animationDelay: '3s' }} />

      <FloatingElements color="#FFC800" opacity={0.06} count={8} />

      <div className="max-w-4xl w-full text-center flex flex-col items-center relative z-10">
        <motion.p
          className={`${inter.className} text-[#FFC800] text-xs sm:text-sm leading-4 font-semibold uppercase tracking-[2px] mb-3`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Ready to begin?
        </motion.p>

        <TextReveal
          as="h2"
          className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 font-clash"
          type="words"
          stagger={0.05}
          duration={0.8}
          y={60}
        >
          Let&apos;s Build Something Extraordinary.
        </TextReveal>

        <motion.p
          className={`${inter.className} text-base sm:text-lg font-normal text-neutral-300 mb-8 max-w-xl leading-relaxed`}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Whether you have a polished brief or just a spark of an idea — let&apos;s talk. Book a free 15-minute intro call with our team.
        </motion.p>

        <motion.div
          className={`${inter.className} flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MagneticButton>
            <motion.div
              onClick={() => openBooking()}
              className="bg-[#FFC800] text-black flex gap-3 items-center font-bold px-7 py-4 rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_4px_30px_rgba(255,200,0,0.5)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button>Book a 15-Min Intro Call</button>
              <IoArrowForward className="inline-block" />
            </motion.div>
          </MagneticButton>

          <MagneticButton>
            <motion.div
              onClick={() => openBrief()}
              className="bg-[#141414] border border-neutral-700 text-white flex gap-3 items-center font-bold px-7 py-4 rounded-full cursor-pointer transition-all duration-300 hover:border-[#FFC800] hover:text-[#FFC800]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button>Send a Brief</button>
              <IoArrowForward className="inline-block rotate-[-45deg]" />
            </motion.div>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  )
}
