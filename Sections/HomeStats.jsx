'use client'
import React, { useRef, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { motion, useInView } from 'framer-motion'
import CountUp from '@/Components/CountUp'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const inter = Inter({ subsets: ['latin'] })

export default function HomeStats() {
  const stats = [
    { label: 'Projects Delivered', value: '100+' },
    { label: 'Countries Served', value: '20+' },
    { label: 'Client Satisfaction', value: '99%' },
    { label: 'Users Impacted', value: '5M+' },
  ]

  const ref = useRef(null)
  const lineRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!lineRef.current) return

    gsap.fromTo(
      lineRef.current,
      { width: '0%' },
      {
        width: '100%',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 90%',
        },
      }
    )
  }, [])

  return (
    <div className="bg-[#FAFAF7] w-full px-6 md:px-16 lg:px-24 py-8 relative z-10" ref={ref}>
      <div ref={lineRef} className="h-[1px] bg-[#E7E7E7]" style={{ width: 0 }} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 w-full mt-8">
        {stats.map((stat, index) => (
          <motion.div
            className="flex flex-col text-[#040300]"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3 className="text-5xl font-extrabold tracking-tight leading-none text-[#040300]">
              <CountUp target={stat.value} duration={2.5} />
            </h3>
            <p className={`${inter.className} text-sm font-medium text-[#6A6A6A] mt-2`}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
