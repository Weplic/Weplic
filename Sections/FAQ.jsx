'use client'
import { useState, useRef } from 'react'
import { IoArrowForward } from "react-icons/io5"
import { IoIosArrowDown } from "react-icons/io"
import { Inter } from 'next/font/google'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import TextReveal from '@/Components/TextReveal'

const inter = Inter({ subsets: ['latin'] })

const faqs = [
  {
    question: "How long does a typical startup MVP take?",
    answer: "Most early-stage MVPs are completed in 2–4 weeks depending on feature complexity. We establish a lean roadmap during discovery and deliver production-ready code with continuous updates.",
  },
  {
    question: "What is your pricing model?",
    answer: "We work on a flat, transparent milestone or sprint basis. After an initial 15-minute intro call, we provide a fixed proposal with zero hidden costs.",
  },
  {
    question: "Do you work with early-stage & pre-seed startups?",
    answer: "Yes! We specialize in founder-led, early-stage startups. Whether you are validating a concept, pitching investors, or building your v1 MVP, we tailor velocity to your goals.",
  },
  {
    question: "What makes Weplic different from traditional agencies?",
    answer: "Founder-to-founder execution, senior-only talent, 2-4 week sprint velocity, and 100% full design system & code IP ownership.",
  },
  {
    question: "Do we get full ownership of code & design files?",
    answer: "100% yes. Upon launch, you receive complete ownership of all Figma design tokens, React/Next.js code repositories, and documentation.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(-1)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section className="bg-[#F8F8F5] py-16 sm:py-28 text-[#040300]" ref={sectionRef}>
      <div className="px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col gap-12 sm:gap-16">
        {/* Left Content */}
        <div>
          <motion.p
            className={`${inter.className} mb-3 text-xs font-bold uppercase tracking-[0.3em] text-amber-600`}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            FAQ
          </motion.p>

          <TextReveal
            as="h2"
            className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#040300] font-clash"
            type="words"
            stagger={0.06}
          >
            Common questions.
          </TextReveal>

          <motion.p
            className={`${inter.className} mt-4 text-base sm:text-lg leading-relaxed text-neutral-700`}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Can&apos;t find your answer? Drop us a line anytime.
          </motion.p>

          <motion.a
            href="mailto:hello.weplic@gmail.com"
            className="mt-6 inline-flex items-center gap-2 border-b-2 border-[#040300] pb-1 text-base font-bold text-[#040300] group"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ x: 5 }}
          >
            hello.weplic@gmail.com
            <IoArrowForward className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* FAQ List */}
        <div className="border-t border-neutral-300">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-b border-neutral-300 cursor-pointer group"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
              whileHover={{ backgroundColor: 'rgba(255, 200, 0, 0.04)' }}
            >
              <div className="flex items-center justify-between py-6 sm:py-8 gap-4">
                <h3 className="text-lg sm:text-xl font-semibold text-[#040300] font-clash transition-colors duration-300 group-hover:text-amber-600">
                  {faq.question}
                </h3>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-shrink-0"
                >
                  <IoIosArrowDown className="text-xl text-[#040300]" />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className={`${inter.className} pb-6 sm:pb-8 text-sm sm:text-base leading-relaxed text-neutral-700 font-normal max-w-3xl`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}