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
      title: 'Built for Speed',
      description: 'We turn ambitious startup ideas into launch-ready products in 2–4 week sprints.',
    },
    {
      title: 'Craft Obsessed',
      description: 'Pixel-perfect UI, buttery smooth animations, and high performance from day one.',
    },
    {
      title: 'Growth Focused',
      description: 'Design engineered to convert visitors into loyal users and impress investors.',
    },
  ]

  const quoteRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!quoteRef.current) return

    const split = new SplitType(quoteRef.current, { types: 'words' })

    gsap.fromTo(
      split.words,
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.05,
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
    <div ref={sectionRef} className="bg-[#111111] w-full py-16 sm:py-24 px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col gap-10 justify-between relative overflow-hidden text-white">
      {/* Ambient gradient orbs */}
      <div className="gradient-orb w-[300px] h-[300px] bg-[#FFC800]/5 top-10 -left-20 pointer-events-none" />
      <div className="gradient-orb w-[200px] h-[200px] bg-[#FFC800]/5 bottom-20 right-10 pointer-events-none" style={{ animationDelay: '3s' }} />

      <motion.div
        className="flex flex-col gap-3 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className={`${inter.className} text-xs font-semibold text-[#FFC800] uppercase tracking-[2px]`}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          OUR PHILOSOPHY
        </motion.h2>
        <p className={`${inter.className} text-sm sm:text-base leading-relaxed text-neutral-300`}>
          We believe the best startup products are crafted with intention, extreme velocity, and deep user empathy.
        </p>
      </motion.div>

      <div className="my-6">
        <p
          ref={quoteRef}
          className={`${inter.className} text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-5xl`}
        >
          &quot;Great design isn&apos;t just about looking good. It&apos;s the decisive difference between a product people ignore — and one they <span className="text-shimmer">love.</span>&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {philosophy.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
          >
            <motion.div
              className="h-1 bg-[#FFC800] rounded-full w-12"
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
            />
            <h3 className="text-xl font-semibold text-white mt-1">{item.title}</h3>
            <p className={`${inter.className} text-sm sm:text-base leading-relaxed text-neutral-300`}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
