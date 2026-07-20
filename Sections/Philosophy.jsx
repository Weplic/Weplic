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
      title: 'Human First',
      description: 'Every pixel serves a purpose. We design for people, not trends.',
    },
    {
      title: 'Quality Obsessed',
      description: "We refuse to ship work we wouldn't be proud to put our name on.",
    },
    {
      title: 'Result Driven',
      description: 'Beautiful design that converts. Every project is a business partnership.',
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
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.05,
        duration: 0.3,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      }
    )

    return () => {
      split.revert()
    }
  }, [])

  return (
    <div ref={sectionRef} className="bg-[#111111] w-full h-screen p-6 flex flex-col gap-6 justify-around relative overflow-hidden">
      {/* Ambient gradient orbs */}
      <div className="gradient-orb w-[300px] h-[300px] bg-[#FFC800]/5 top-10 -left-20" />
      <div className="gradient-orb w-[200px] h-[200px] bg-[#FFC800]/5 bottom-20 right-10" style={{ animationDelay: '3s' }} />

      <motion.div
        className="flex flex-col gap-4 w-70 mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className={`${inter.className} text-xs font-semibold text-[#FFC800]`}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          OUR PHILOSOPHY
        </motion.h2>
        <p className={`${inter.className} text-sm font-regular leading-relaxed text-[#6A6A6A]`}>
          We believe the best digital products are crafted with intent, obsession, and a deep understanding of human behavior.
        </p>
      </motion.div>

      <div>
        <p
          ref={quoteRef}
          className={`${inter.className} text-[51px] font-bold text-[#ffff] leading-14 tracking-[-1.27px] w-full max-w-[1081px]`}
        >
          &quot;Design is not decoration. It&apos;s the decisive difference between a product people merely use — and one they <span className="text-shimmer">love.</span>&quot;
        </p>
      </div>

      <div className="flex w-full gap-10 justify-between mt-10">
        {philosophy.map((item, index) => (
          <motion.div
            key={index}
            className="flex gap-4 flex-col w-full max-w-1/5"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
          >
            <motion.hr
              className="border-2 border-[#FFC800] w-1/6"
              initial={{ width: 0 }}
              animate={isInView ? { width: '16.666%' } : {}}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
            />
            <h3 className="text-[20px] font-semibold text-[#ffff] leading-7">{item.title}</h3>
            <p className={`${inter.className} text-sm font-regular leading-7 text-[#6A6A6A]`}>{item.description}</p>
          </motion.div>
        ))}
      </div>
      <div></div>
    </div>
  )
}
