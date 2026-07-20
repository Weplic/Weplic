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
    <div ref={sectionRef} className="w-full h-screen bg-[#011111] flex justify-center items-center p-4 relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="gradient-orb w-[500px] h-[500px] bg-[#FFC800]/8 -top-40 -left-40" />
      <div className="gradient-orb w-[400px] h-[400px] bg-[#FFC800]/5 -bottom-40 -right-40" style={{ animationDelay: '3s' }} />
      <div className="gradient-orb w-[300px] h-[300px] bg-[#FFC800]/3 top-1/2 left-1/4" style={{ animationDelay: '5s' }} />

      <FloatingElements color="#FFC800" opacity={0.06} count={8} />

      <div className="max-w-270 w-full text-center flex flex-col items-center relative z-10">
        <motion.p
          className={`${inter.className} text-[#ffc800] text-sm leading-4 font-semibold`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Ready to begin?
        </motion.p>

        <TextReveal
          as="h2"
          className="text-white text-[85px] leading-20 font-bold mb-4"
          type="words"
          stagger={0.05}
          duration={0.8}
          y={60}
        >
          Let&apos;s Build Something Extraordinary.
        </TextReveal>

        {/* The "Extraordinary" shimmer applied via CSS inline override */}
        <motion.div
          className="absolute"
          style={{ display: 'none' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        />

        <motion.p
          className={`${inter.className} text-sm font-regular text-[#6A6A6A] mb-6 max-w-140`}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Whether you have a polished brief or just a spark of an idea — let&apos;s talk. Book a free 30-minute discovery call with our team.
        </motion.p>

        <motion.div
          className={`${inter.className} flex justify-center items-center gap-4`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MagneticButton>
            <motion.div
              onClick={() => openBooking()}
              className="bg-[#FFC800] flex gap-3 items-center font-semibold p-5 rounded-full mr-4 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_30px_rgba(255,200,0,0.5)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button>Book a Discovery Call</button>
              <IoArrowForward className="inline-block transition-transform duration-300 group-hover:translate-x-1" />
            </motion.div>
          </MagneticButton>

          <MagneticButton>
            <motion.div
              onClick={() => openBrief()}
              className="bg-black border flex gap-3 items-center border-gray-300 text-white font-semibold p-5 rounded-full cursor-pointer transition-all duration-300 hover:border-[#FFC800] hover:shadow-[0_4px_30px_rgba(255,200,0,0.15)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button>Send a Brief</button>
              <IoArrowForward className="inline-block rotate-300" />
            </motion.div>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  )
}

