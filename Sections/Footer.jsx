'use client'
import FooterAbout from '@/Components/FooterAbout'
import FooterContact from '@/Components/FooterContact'
import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    const lines = [line1Ref.current, line2Ref.current].filter(Boolean)
    lines.forEach((line) => {
      gsap.fromTo(
        line,
        { width: '0%' },
        {
          width: '100%',
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: line,
            start: 'top 95%',
          },
        }
      )
    })
  }, [])

  return (
    <motion.div
      ref={sectionRef}
      className="bg-[#0A0A0A] flex flex-col py-20 px-10 gap-10"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <FooterAbout />
      <div ref={line1Ref} className="h-[1px] bg-[#6A6A6A]" style={{ width: 0 }} />
      <FooterContact />
      <div ref={line2Ref} className="h-[1px] bg-[#6A6A6A]" style={{ width: 0 }} />
      <motion.div
        className="flex justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div>
          <p className="text-[#6A6A6A] text-sm leading-5 font-regular">
            © 2024 WePlic. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4 list-none">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
            <motion.li
              key={item}
              className="text-[#6A6A6A] text-sm leading-5 font-regular cursor-pointer transition-colors duration-300 hover:text-white"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
