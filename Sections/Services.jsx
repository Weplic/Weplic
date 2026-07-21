'use client'
import { useState } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa6"
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from '@/Components/TextReveal'

const services = [
  {
    number: "01",
    title: "Website Design & Development",
    description:
      "From concept to code — immersive websites that combine stunning visual design with rock-solid engineering. Fast, accessible, and built to convert.",
    tags: ["Next.js", "Webflow", "Framer"],
  },
  {
    number: "02",
    title: "Mobile App Design & Development",
    description:
      "Native and cross-platform apps with intuitive UX. We craft mobile experiences that users love to open, again and again.",
    tags: ["React Native", "Flutter", "Swift"],
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Research-driven design that puts users first. From wireframes to pixel-perfect interfaces, every interaction is intentional.",
    tags: ["Figma", "Prototyping", "User Research"],
  },
  {
    number: "04",
    title: "Brand Identity",
    description:
      "Memorable brand systems that tell your story. Logo, typography, color — every element working in harmony.",
    tags: ["Logo Design", "Guidelines", "Strategy"],
  },
  {
    number: "05",
    title: "Product Design",
    description:
      "End-to-end product thinking. We design scalable products that solve real problems and delight at every touchpoint.",
    tags: ["Design Thinking", "MVP", "Iteration"],
  },
  {
    number: "06",
    title: "Design Systems",
    description:
      "Component libraries and design tokens that scale with your team. Consistency, speed, and quality — automated.",
    tags: ["Tokens", "Components", "Documentation"],
  },
]

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section className="bg-[#F4F4F2] py-16 sm:py-28 text-[#181818]" ref={sectionRef}>
      <div className="px-5 sm:px-8 md:px-16 lg:px-24">
        {/* Heading */}
        <TextReveal
          as="h2"
          className="max-w-2xl text-[36px] sm:text-[48px] md:text-[60px] font-semibold leading-[1.05] tracking-tight text-[#181818] font-clash"
          type="words"
          stagger={0.05}
          duration={0.7}
        >
          Services built for bold brands.
        </TextReveal>

        {/* Services */}
        <div className="mt-12 sm:mt-20 border-t border-[#D0D0CE]">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className="border-b border-[#D0D0CE] cursor-pointer group"
              onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(255, 200, 0, 0.05)' }}
            >
              <div className="flex items-start justify-between gap-6 sm:gap-10 py-6 sm:py-8">
                <div className="flex gap-4 sm:gap-6 items-start">
                  <span className="mt-1.5 w-6 sm:w-8 text-xs sm:text-sm font-bold text-amber-600">
                    {service.number}
                  </span>

                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#181818] font-clash transition-colors duration-300 group-hover:text-amber-600">
                      {service.title}
                    </h3>

                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-neutral-700 font-normal">
                            {service.description}
                          </p>

                          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
                            {service.tags?.map((tag, tagIndex) => (
                              <motion.span
                                key={tag}
                                className="rounded-full bg-[#181818] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: tagIndex * 0.1,
                                  type: 'spring',
                                }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.div
                  className="mt-1 text-base sm:text-lg text-[#181818] flex-shrink-0"
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeIndex === index ? (
                    <FaMinus className="text-amber-600" />
                  ) : (
                    <FaPlus />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}