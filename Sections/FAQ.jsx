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
    question: "How long does a typical project take?",
    answer: "Most projects are completed within 6–12 weeks depending on complexity. We establish clear timelines during the discovery phase and keep you informed every step of the way.",
  },
  {
    question: "What is your pricing model?",
    answer: "We work on a project basis with transparent pricing. After an initial discovery call, we provide a detailed proposal with fixed costs — no hidden fees, no surprises.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer: "Absolutely. We've helped dozens of startups go from idea to launch. Whether you're pre-seed or Series B, we tailor our approach to your stage and budget.",
  },
  {
    question: "What makes WEPLIC different from other agencies?",
    answer: "Senior-only team, design + development under one roof, and a relentless focus on business outcomes — not just pretty pixels. We're partners, not vendors.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes. We offer retainer packages for ongoing design and development support, ensuring your product continues to evolve and improve post-launch.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(-1)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section className="bg-[#F8F8F5] py-28" ref={sectionRef}>
      <div className="mx-auto gap-20 px-6 flex flex-col">
        {/* Left Content */}
        <div>
          <motion.p
            className={`${inter.className} mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FFC400]`}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            FAQ
          </motion.p>

          <TextReveal
            as="h2"
            className="text-[58px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#181818]"
            type="words"
            stagger={0.06}
          >
            Common questions.
          </TextReveal>

          <motion.p
            className={`${inter.className} mt-6 text-[15px] leading-7 text-[#777]`}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Can&apos;t find your answer? Drop us a line anytime.
          </motion.p>

          <motion.a
            href="mailto:hello@weplic.com"
            className="mt-8 inline-flex items-center gap-2 border-b border-black pb-1 text-[15px] font-medium text-black group"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ x: 5 }}
          >
            hello@weplic.com
            <IoArrowForward className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* FAQ List */}
        <div className="border-t border-[#E6E6E6]">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-b border-[#E6E6E6] cursor-pointer group"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
              whileHover={{ backgroundColor: 'rgba(255, 200, 0, 0.02)' }}
            >
              <div className="flex items-center justify-between py-8">
                <h3 className="text-[18px] font-medium text-[#181818] transition-colors duration-300 group-hover:text-[#FFC800]">
                  {faq.question}
                </h3>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <IoIosArrowDown className="text-lg text-[#666]" />
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
                    <p className={`${inter.className} pb-8 text-[15px] leading-7 text-[#777] max-w-3xl`}>
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