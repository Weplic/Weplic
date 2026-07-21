'use client'
import FooterAbout from '@/Components/FooterAbout'
import FooterContact from '@/Components/FooterContact'
import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowUp } from 'react-icons/fi'

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ]

  return (
    <motion.footer
      ref={sectionRef}
      className="bg-[#040300] flex flex-col py-12 sm:py-20 px-5 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 border-t border-neutral-900 text-white relative z-10"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <FooterContact />
      
      <div ref={line1Ref} className="h-[1px] bg-neutral-800" style={{ width: 0 }} />
      
      <FooterAbout />
      
      <div ref={line2Ref} className="h-[1px] bg-neutral-800" style={{ width: 0 }} />
      
      {/* Bottom Bar */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs sm:text-sm text-neutral-400"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>© {new Date().getFullYear()} Weplic Studio. Built for ambitious startups.</p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {legalLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-[#FFC800] transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 px-3 rounded-full bg-white/10 text-white hover:bg-[#FFC800] hover:text-black transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <FiArrowUp className="text-xs" />
          </button>
        </div>
      </motion.div>
    </motion.footer>
  )
}
