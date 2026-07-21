'use client'
import React, { useRef } from 'react'
import { Inter } from 'next/font/google'
import { motion, useInView } from 'framer-motion'
import CountUp from '@/Components/CountUp'

const inter = Inter({ subsets: ['latin'] })

export default function HomeStats() {
  const stats = [
    { label: 'MVPs Built & Shipped', value: '15+', badge: '100% Shipped' },
    { label: 'Avg. Launch Velocity', value: '3 Wks', badge: 'Extreme Speed' },
    { label: 'On-Time Delivery Rate', value: '99%', badge: 'Guaranteed' },
    { label: 'Code & IP Ownership', value: '100%', badge: 'Full Transfer' },
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div className="bg-[#FAFAF7] w-full px-5 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16 relative z-10 text-[#040300]" ref={ref}>
      <div className="w-full h-[1px] bg-neutral-200 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-sm flex flex-col justify-between overflow-hidden group hover:border-[#FFC800] hover:shadow-[0_12px_40px_rgba(255,200,0,0.15)] transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6 }}
          >
            {/* Glowing gradient accent blob */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#FFC800]/15 rounded-full blur-2xl group-hover:bg-[#FFC800]/30 transition-all duration-500 pointer-events-none" />

            {/* Badge pill */}
            <div className="flex items-center justify-between mb-4">
              <span className={`${inter.className} text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAFAF7] border border-neutral-200 text-[#040300]`}>
                {stat.badge}
              </span>
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FFC800]"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
            </div>

            {/* Big Stat Value */}
            <h3 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#040300] leading-none mb-2">
              <CountUp target={stat.value} duration={2.5} />
            </h3>

            {/* Label */}
            <p className={`${inter.className} text-sm sm:text-base font-semibold text-neutral-700`}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
