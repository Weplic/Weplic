'use client'
import React, { useRef } from 'react'
import { Inter } from 'next/font/google'
import { motion, useInView } from 'framer-motion'
import CountUp from '@/Components/CountUp'

const inter = Inter({ subsets: ['latin'] })

export default function Stats() {
  const stats = [
    { label: 'MVPs Built & Shipped', value: '15+', subtext: 'Production ready' },
    { label: 'Avg. Launch Velocity', value: '3 Wks', subtext: 'Idea to deployment' },
    { label: 'On-Time Delivery Rate', value: '99%', subtext: 'Zero missed deadlines' },
    { label: 'Code & IP Ownership', value: '100%', subtext: 'Full client handover' },
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <div ref={sectionRef} className="relative bg-[#0A0A0A] py-16 sm:py-20 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-y border-neutral-900 text-white">
      {/* Background ambient marquee text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-10">
        <motion.div
          className="whitespace-nowrap text-[140px] sm:text-[200px] font-bold font-clash text-white select-none"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          WEPLIC · BUILD · SHIP · SCALE · WEPLIC · BUILD · SHIP · SCALE ·&nbsp;
        </motion.div>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#141414] border border-neutral-800/80 hover:border-[#FFC800]/50 transition-all duration-500 shadow-xl group"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="w-3 h-3 rounded-full bg-[#FFC800] shadow-[0_0_12px_#FFC800]" />
              <span className={`${inter.className} text-[10px] uppercase font-bold tracking-widest text-neutral-400`}>
                Metric 0{index + 1}
              </span>
            </div>

            <div>
              <h3 className="text-5xl sm:text-6xl font-clash font-bold leading-none text-[#FFC800] drop-shadow-[0_0_20px_rgba(255,200,0,0.3)]">
                <CountUp target={stat.value} duration={2.5} />
              </h3>
              <p className={`${inter.className} text-base font-bold text-white mt-3`}>
                {stat.label}
              </p>
              <p className={`${inter.className} text-xs text-neutral-400 mt-1 font-normal`}>
                {stat.subtext}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
