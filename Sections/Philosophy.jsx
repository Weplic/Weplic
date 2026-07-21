'use client'
import React, { useRef, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const inter = Inter({ subsets: ['latin'] })

export default function Philosophy() {
  const philosophy = [
    {
      num: '01',
      title: 'Ship in Weeks, Not Months',
      description: 'Your runway is burning. We compress the typical 3-6 month agency cycle into focused 2-4 week sprints that get you to market before your competitors even finish their decks.',
    },
    {
      num: '02',
      title: 'Craft That Converts',
      description: 'Beautiful UI isn\'t vanity — it\'s your unfair advantage. Pixel-perfect design, 60fps animations, and conversion-optimized flows that make investors say "wow" and users say "finally."',
    },
    {
      num: '03',
      title: 'Scale-Ready from Day One',
      description: 'We don\'t build throwaway prototypes. Every line of code is TypeScript, every component is reusable, every architecture decision is made for your next 10x of growth.',
    },
  ]

  const quoteRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!quoteRef.current) return

    const split = new SplitType(quoteRef.current, { types: 'words' })

    gsap.fromTo(
      split.words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.04,
        duration: 0.3,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 75%',
          end: 'bottom 35%',
          scrub: 1,
        },
      }
    )

    return () => {
      split.revert()
    }
  }, [])

  return (
    <div ref={sectionRef} className="bg-[#0A0A0A] w-full py-16 sm:py-28 px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col gap-12 sm:gap-16 relative overflow-hidden text-white">
      {/* Ambient effects */}
      <div className="absolute top-20 -left-32 w-[400px] h-[400px] bg-gradient-to-r from-[#FFC800]/6 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[300px] h-[300px] bg-gradient-to-l from-[#FFC800]/4 to-transparent rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="flex flex-col gap-3 max-w-xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className={`${inter.className} text-xs font-bold text-[#FFC800] uppercase tracking-[3px]`}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our Philosophy
        </motion.span>
        <p className={`${inter.className} text-sm sm:text-base leading-relaxed text-neutral-400`}>
          We believe the best startup products are built with extreme urgency, obsessive craft, and zero bullshit.
        </p>
      </motion.div>

      {/* Scroll-Reveal Quote */}
      <div className="relative z-10 py-4 sm:py-8">
        <p
          ref={quoteRef}
          className="font-clash text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight max-w-5xl"
        >
          &quot;Your MVP isn&apos;t just a product — it&apos;s your pitch deck in motion, your first impression to investors, and the thing that turns early users into <span className="text-[#FFC800]">evangelists.</span>&quot;
        </p>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {philosophy.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col gap-4 group"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
          >
            {/* Number + Accent Line */}
            <div className="flex items-center gap-4">
              <span className={`${inter.className} text-sm font-bold text-[#FFC800]`}>{item.num}</span>
              <motion.div
                className="h-[2px] bg-gradient-to-r from-[#FFC800] to-[#FFC800]/0 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: 48 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-clash group-hover:text-[#FFC800] transition-colors duration-300">
              {item.title}
            </h3>

            <p className={`${inter.className} text-sm sm:text-base leading-relaxed text-neutral-400 font-normal`}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
