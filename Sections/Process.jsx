'use client'
import React, { useRef, useEffect } from "react"
import { Inter } from "next/font/google"
import { BsArrowRightShort } from "react-icons/bs"
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '@/Components/TextReveal'
import MagneticButton from '@/Components/MagneticButton'
import { useApp } from '@/Context/AppContext'

gsap.registerPlugin(ScrollTrigger)

const inter = Inter({
  subsets: ["latin"],
})

export default function Process() {
  const { openBrief } = useApp()
  const processData = [
    { id: "01", title: "Discovery", description: "Deep dives into your business, audience, and goals. Stakeholder interviews, competitive analysis, and market research." },
    { id: "02", title: "Strategy", description: "Insights become a clear roadmap. Information architecture, user flows, and content strategy defined." },
    { id: "03", title: "Wireframing", description: "Low-fidelity layouts that validate concepts quickly before investing in pixels." },
    { id: "04", title: "UI Design", description: "Pixel-perfect interfaces crafted with intention. Every component, every spacing decision considered." },
    { id: "05", title: "Prototype", description: "Interactive prototypes that feel like the real product—for stakeholder alignment and user testing." },
    { id: "06", title: "Development", description: "Clean, scalable code that brings the design to life with performance and accessibility at the core." },
    { id: "07", title: "Testing", description: "Rigorous QA across devices, browsers, and user groups. We don't ship until it's right." },
    { id: "08", title: "Launch", description: "A coordinated launch strategy with post-launch monitoring, analytics, and rapid iteration." },
  ]

  const timelineRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!timelineRef.current) return

    const lines = timelineRef.current.querySelectorAll('.timeline-line')
    lines.forEach((line) => {
      gsap.fromTo(
        line,
        { height: 0 },
        {
          height: '100%',
          duration: 0.6,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: line.parentElement,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 1,
          },
        }
      )
    })
  }, [])

  return (
    <div className="flex flex-col gap-8 p-5 bg-[#FAFAF7]" ref={sectionRef}>
      <div className="flex flex-col gap-6 p-5">
        <motion.p
          className={`${inter.className} text-sm font-semibold leading-4 tracking-[2.4px] text-[#FFC800]`}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          HOW WE WORK
        </motion.p>

        <TextReveal
          as="h2"
          className="font-clash font-bold text-[40px] leading-12 tracking-[-0.99px] w-75"
          type="words"
          stagger={0.06}
        >
          Our Proven Process
        </TextReveal>

        <motion.p
          className={`${inter.className} text-sm font-regular leading-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Transparent and collaborative — you&apos;re informed at every stage. No surprises, no delays.
        </motion.p>

        <MagneticButton>
          <motion.button
            onClick={() => openBrief()}
            className="flex bg-[#FFC800] text-[#000000] font-bold py-3 max-w-max px-6 rounded-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,200,0,0.4)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p>Start a Project</p>
            <BsArrowRightShort size={22} className="ml-2" />
          </motion.button>
        </MagneticButton>
      </div>


      <div className="py-20 bg-[#FAFAF7]" ref={timelineRef}>
        <div className="max-w-6xl px-6">
          {processData.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-xs font-semibold transition-all duration-500"
                  whileInView={{
                    backgroundColor: '#FFC800',
                    borderColor: '#FFC800',
                    color: '#000',
                  }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {step.id}
                </motion.div>

                {index !== processData.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-neutral-200 relative overflow-hidden">
                    <div className="timeline-line absolute top-0 left-0 w-full bg-[#FFC800]" style={{ height: 0 }} />
                  </div>
                )}
              </div>

              <div className="pb-12">
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-neutral-500 leading-7">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
