'use client'
import React, { useRef } from 'react'
import { Inter } from 'next/font/google'
import { FaDiamond, FaRegCircle, FaRegSquareFull } from "react-icons/fa6"
import { BsDiamondHalf, BsDiamond, BsTriangle } from "react-icons/bs"
import { motion, useInView } from 'framer-motion'
import TextReveal from '@/Components/TextReveal'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  const features = [
    { Icon: FaDiamond, title: "Senior-Only Team", description: "No juniors. Every project is handled by senior designers and engineers with 8+ years of experience." },
    { Icon: BsDiamondHalf, title: "Design + Dev Under One Roof", description: "Seamless handoff because we do both. Your design is built exactly as intended — no interpretation errors." },
    { Icon: FaRegCircle, title: "Fast Without Compromise", description: "We move with startup speed without sacrificing craft. Most projects launch within 6–12 weeks." },
    { Icon: BsDiamond, title: "Strategic Thinking", description: "We think like founders. Every design decision is rooted in business goals, not aesthetic preference alone." },
    { Icon: BsTriangle, title: "Transparent Collaboration", description: "You're involved every step. Weekly check-ins, shared Figma files, and open communication always." },
    { Icon: FaRegSquareFull, title: "Built to Scale", description: "Design systems, codebases, and strategies engineered to grow with your company for years." },
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <div
      ref={sectionRef}
      className="bg-[#111111] w-full p-6 flex flex-col gap-10 justify-center relative overflow-hidden"
    >
      {/* Animated gradient */}
      <div className="gradient-orb w-[400px] h-[400px] bg-[#FFC800]/5 -top-20 -right-20" />
      <div className="gradient-orb w-[300px] h-[300px] bg-[#FFC800]/3 bottom-10 left-20" style={{ animationDelay: '4s' }} />

      <div className="flex flex-col gap-8 p-6 mt-10 relative z-10">
        <motion.p
          className={`${inter.className} text-sm font-semibold leading-4 tracking-[2.4px] text-[#FFC800]`}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          WHY WEPLIC
        </motion.p>

        <TextReveal
          as="h2"
          className="text-white font-clash text-6xl font-bold tracking-[1.6px] w-130"
          type="words"
          stagger={0.06}
        >
          The studio that refuses to settle.
        </TextReveal>
      </div>

      <div className="w-full p-6 grid grid-cols-3 gap-6 mt-4 relative z-10">
        {features.map(({ Icon, title, description }, index) => (
          <motion.div
            key={index}
            className="bg-[#1A1A1A] rounded-xl p-6 flex flex-col gap-4 group cursor-pointer transition-all duration-500 hover:bg-[#222222] hover:shadow-[0_8px_30px_rgba(255,200,0,0.08)] border border-transparent hover:border-[#FFC800]/10"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover={{
              y: -5,
              rotateX: 2,
              rotateY: -2,
            }}
            style={{ transformPerspective: 1000 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ type: 'spring', delay: 0.3 + index * 0.1, stiffness: 200 }}
            >
              <Icon className="text-[#FFC800] text-xl transition-transform duration-500 group-hover:scale-110" />
            </motion.div>
            <h3 className="text-[20px] leading-7 font-semibold text-white">{title}</h3>
            <p className={`${inter.className} text-lg font-regular leading-6 text-[#6A6A6A]`}>
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
