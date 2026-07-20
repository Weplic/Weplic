'use client'
import Image from "next/image"
import { BsArrowRightShort, BsCheck2 } from "react-icons/bs"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useApp } from '@/Context/AppContext'

export default function WorkCard({ work }) {
  const { openCaseStudy } = useApp()
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      className={`grid overflow-hidden rounded-[28px] border border-neutral-200 bg-white lg:grid-cols-2 ${
        work.reverse ? "lg:[&>*:first-child]:order-2" : ""
      } group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-full overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={work.image}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            className="object-cover transition-transform duration-700"
          />
        </motion.div>
      </div>

      <div className="flex flex-col justify-center p-10">
        <motion.h3
          className="mb-5 text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {work.title}
        </motion.h3>

        <motion.p
          className="mb-8 leading-7 text-neutral-500"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {work.description}
        </motion.p>

        <div className="space-y-3">
          {work.stats.map((item, index) => (
            <motion.div
              key={item}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', delay: 0.4 + index * 0.1, stiffness: 200 }}
              >
                <BsCheck2 className="text-amber-500" />
              </motion.div>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={() => openCaseStudy(work)}
          className="group/btn mt-8 flex w-fit items-center gap-2 font-medium relative cursor-hover"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ x: 5 }}
        >
          View Case Study
          <BsArrowRightShort
            size={22}
            className="transition-transform duration-300 group-hover/btn:translate-x-2"
          />
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFC800] transition-all duration-300 group-hover/btn:w-full" />
        </motion.button>
      </div>
    </motion.div>
  )
}