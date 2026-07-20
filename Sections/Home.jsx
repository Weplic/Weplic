'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Inter } from 'next/font/google'
import { FaArrowRight } from 'react-icons/fa'
import { LuMouse } from "react-icons/lu"
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import MagneticButton from '@/Components/MagneticButton'
import FloatingElements from '@/Components/FloatingElements'
import { useApp } from '@/Context/AppContext'

gsap.registerPlugin(ScrollTrigger)

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { openBrief } = useApp()
  const [isMounted, setIsMounted] = useState(false)
  const headingRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!headingRef.current) return

    const headings = headingRef.current.querySelectorAll('h2')
    headings.forEach((heading, index) => {
      const split = new SplitType(heading, { types: 'chars' })
      gsap.fromTo(
        split.chars,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.03,
          duration: 0.8,
          delay: 2.6 + index * 0.15,
          ease: 'power3.out',
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.5,
      },
    },
  }

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      ref={sectionRef}
      className="w-full min-h-[calc(100vh-80px)] bg-[#FAFAF7] flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-12 relative overflow-hidden gap-12 lg:gap-6 text-[#040300]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <FloatingElements color="#FFC800" opacity={0.08} count={6} />

      <div className="flex-1 max-w-2xl flex flex-col gap-8 relative z-10">
        {/* Badge */}
        <motion.div
          className="flex bg-white border border-[#E7E7E7] p-2 px-4 rounded-full shadow-sm justify-center items-center max-w-max"
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 2.4, type: 'spring', stiffness: 100 }}
        >
          <motion.div
            className="w-2 h-2 bg-[#FFC800] rounded-full mr-4"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-[#6A6A6A] font-medium leading-5">Award-winning digital design studio</p>
        </motion.div>

        {/* Heading with SplitType */}
        <div
          ref={headingRef}
          className="flex flex-col gap-2 text-7xl font-bold leading-[55.89px] tracking-[-1.44px] text-[#040300] relative"
          style={{ perspective: '1000px' }}
        >
          {/* Yellow Dot on the Left */}
          <div className="absolute -left-6 top-[24px] w-2.5 h-2.5 bg-[#FFC800] rounded-full" />

          <h2>We Don&apos;t</h2>
          <h2>Just <span className="underline decoration-[#FFC800] decoration-[6px] underline-offset-[12px]">Design</span></h2>
          <h2>We Create</h2>
          <h2>Experiences.</h2>
        </div>

        {/* Description */}
        <motion.div className="max-w-87.5" variants={fadeUpVariant}>
          <p className={`${inter.className} font-normal text-[16px] leading-relaxed text-[#6A6A6A]`}>
            Helping ambitious brands transform ideas into unforgettable digital products through design, development, and branding.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div className="flex gap-4 mt-4" variants={fadeUpVariant}>
          <MagneticButton>
            <motion.button
              onClick={() => openBrief()}
              className="bg-[#040300] text-white px-6 py-3 rounded-full font-inter text-sm font-semibold leading-5 group transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
              <FaArrowRight className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </MagneticButton>

          <MagneticButton>
            <a href="#work">
              <motion.button
                className="bg-white border-[#E7E7E7] border-2 text-[#040300] px-6 py-3 rounded-full font-inter text-sm font-semibold leading-5 transition-all duration-300 hover:border-[#FFC800] hover:shadow-[0_4px_20px_rgba(255,200,0,0.15)] cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.button>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex gap-3 mt-8 items-center text-[#040300] font-inter text-sm font-medium leading-5"
          variants={fadeUpVariant}
        >
          <div className="w-[20px] h-[32px] border-2 border-[#E7E7E7] rounded-full flex justify-center p-1">
            <motion.div
              className="w-1.5 h-2 bg-[#FFC800] rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className={`${inter.className} text-[#6A6A6A] text-sm leading-4 font-normal`}>
            Scroll to explore
          </p>
        </motion.div>
      </div>

      {/* Spline 3D */}
      <motion.div
        className="flex-1 min-w-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full h-[550px] flex items-center justify-center">
          {isMounted && (
            <Spline
              scene="https://prod.spline.design/n8f5hm4KY4u2N5WR/scene.splinecode"
            />
          )}
        </div>

        <motion.div
          className="flex bg-white p-2 px-4 rounded-full shadow-md justify-center items-center max-w-max mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.2 }}
        >
          <motion.div
            className="w-2 h-2 bg-[#FFC800] rounded-full mr-4"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <p className={`${inter.className} text-[#6A6A6A] text-sm leading-4 font-medium`}>
            Interactive - move your cursor
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
