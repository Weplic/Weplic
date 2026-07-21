'use client'
import React from 'react'
import { Inter } from 'next/font/google'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import { useApp } from '@/Context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export default function FooterContact() {
  const { openBrief, openBooking } = useApp()

  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-[#141414] to-[#1A1A1A] p-6 sm:p-10 border border-white/10 overflow-hidden shadow-2xl">
      {/* Background glowing ambient element */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#FFC800]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <span className={`${inter.className} text-xs font-bold uppercase tracking-[2px] text-[#FFC800]`}>
            ⚡ Fast 2-4 Week MVP Sprint
          </span>
          <h2 className="font-clash font-bold text-2xl sm:text-4xl text-white leading-tight">
            Ready to launch your next big idea?
          </h2>
          <p className={`${inter.className} text-neutral-300 text-sm sm:text-base leading-relaxed`}>
            We turn your product vision into production-ready code. Book a call or submit a brief to get started today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
          <motion.button
            onClick={() => openBrief()}
            className="bg-[#FFC800] text-black font-bold px-7 py-3.5 text-sm sm:text-base rounded-full transition-all duration-300 hover:bg-[#e6b400] hover:shadow-[0_4px_25px_rgba(255,200,0,0.4)] cursor-pointer flex items-center justify-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start a Project</span>
            <FaArrowRight className="text-xs" />
          </motion.button>

          <motion.button
            onClick={() => openBooking()}
            className="bg-white/5 border border-white/20 text-white font-bold px-7 py-3.5 text-sm sm:text-base rounded-full transition-all duration-300 hover:border-[#FFC800] hover:text-[#FFC800] hover:bg-white/10 cursor-pointer text-center"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            Book 15-Min Call
          </motion.button>
        </div>
      </div>
    </div>
  )
}
