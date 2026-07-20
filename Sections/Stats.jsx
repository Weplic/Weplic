'use client'
import React, { useRef } from 'react'
import { Inter } from 'next/font/google'
import { motion, useInView } from 'framer-motion'
import CountUp from '@/Components/CountUp'

const inter = Inter({ subsets: ['latin'] })

export default function Stats() {
  const stats = [
    { label: 'Projects Delivered', value: '100+' },
    { label: 'Countries Served', value: '20+' },
    { label: 'Client Satisfaction', value: '95%' },
    { label: 'Users Impacted', value: '5M+' },
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* Background marquee text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          className="whitespace-nowrap text-[200px] font-bold text-[#000000]/5 select-none"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          WEPLIC · DESIGN · BUILD · LAUNCH · WEPLIC · DESIGN · BUILD · LAUNCH ·&nbsp;
        </motion.div>
      </div>

      <div className="flex bg-[#FFC800] gap-8 py-12 px-6 justify-around items-center relative z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col justify-center p-4 text-[#040300]"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3 className="text-[72px] font-clash font-bold leading-20 text-[#1A1A1A]">
              <CountUp target={stat.value} duration={2.5} />
            </h3>
            <p className={`${inter.className} text-sm leading-5 font-regular text-[#6A6A6A]`}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
