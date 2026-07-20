'use client'
import React, { useRef } from 'react'
import { Inter } from 'next/font/google'
import { FaStar } from 'react-icons/fa'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import TextReveal from '@/Components/TextReveal'

const inter = Inter({ subsets: ['latin'] })

export default function Review() {
  const testimonials = [
    {
      quote: "WEPLIC transformed our product in ways we couldn't have imagined. Their attention to detail and strategic design thinking elevated our entire brand. Conversion rate increased 40% within the first month.",
      name: "Sarah Chen",
      role: "CTO · Nexus Finance",
      avatar: "/Image/Photo.png",
      elevated: false,
    },
    {
      quote: "We interviewed a dozen agencies before choosing WEPLIC. Three months later, our Series A was oversubscribed. Investors consistently cited our product's design as a competitive differentiator.",
      name: "Marcus Williams",
      role: "Co-founder & CEO · Luminary AI",
      avatar: "/Image/Photo.png",
      elevated: true,
    },
    {
      quote: "Working with WEPLIC felt like having a world-class design team embedded in our company. They understood healthcare UX deeply and delivered a patient experience our whole team is genuinely proud of.",
      name: "Priya Patel",
      role: "Head of Product · Vera Health",
      avatar: "/Image/Photo.png",
      elevated: false,
    },
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <div className="flex flex-col gap-8 py-12 px-6 bg-[#FAFAF7]" ref={sectionRef}>
      <div className="flex flex-col gap-6 px-5 py-6">
        <motion.p
          className={`${inter.className} text-sm font-semibold leading-4 tracking-[2.4px] text-[#FFC800]`}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          CLIENT LOVE
        </motion.p>

        <TextReveal
          as="h2"
          className="font-clash font-bold text-[56.45px] leading-18 tracking-[-1.41px] w-85"
          type="words"
          stagger={0.06}
        >
          Words from our clients
        </TextReveal>
      </div>

      <div className="w-full py-20 px-6 grid grid-cols-3 gap-8 items-center relative">
        {/* Decorative quote mark */}
        <motion.div
          className="absolute -top-4 left-12 text-[200px] font-serif text-[#FFC800]/5 leading-none pointer-events-none select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          &ldquo;
        </motion.div>

        {testimonials.map(({ quote, name, role, avatar, elevated }, index) => (
          <motion.div
            key={index}
            className={`bg-white rounded-2xl p-8 flex flex-col gap-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-[#FFC800]/5 ${
              elevated ? '' : ''
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? {
              opacity: 1,
              y: elevated ? 28 : 0,
            } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2 + index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: elevated ? 20 : -8 }}
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{
                    type: 'spring',
                    delay: 0.5 + index * 0.15 + i * 0.05,
                    stiffness: 200,
                  }}
                >
                  <FaStar className="text-[#FFC800] text-sm" />
                </motion.div>
              ))}
            </div>

            <p className={`${inter.className} text-[15px] leading-relaxed text-[#1A1A1A]`}>
              &quot;{quote}&quot;
            </p>

            <motion.div
              className="flex items-center gap-3 mt-auto"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
            >
              <Image
                src={avatar}
                alt={name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h4 className={`${inter.className} text-sm font-semibold text-[#1A1A1A]`}>{name}</h4>
                <p className={`${inter.className} text-xs text-[#6A6A6A]`}>{role}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
