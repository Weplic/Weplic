'use client'
import React, { useRef } from "react"
import { Inter } from 'next/font/google'
import { motion, useInView } from 'framer-motion'
import { useApp } from '@/Context/AppContext'
import { FiArrowUpRight } from 'react-icons/fi'

const inter = Inter({ subsets: ['latin'] })

export default function FooterAbout() {
  const { openBrief, openBooking } = useApp()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const handleServiceClick = (e, service) => {
    e.preventDefault()
    const servicesEl = document.getElementById('services')
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' })
    }
    setTimeout(() => {
      openBrief(service)
    }, 800)
  }

  const handleCompanyClick = (e, item) => {
    if (item === 'Contact') {
      e.preventDefault()
      openBrief()
      return
    }
    const idMap = {
      'About': 'about',
      'Works': 'work',
      'Process': 'process'
    }
    const targetId = idMap[item]
    if (targetId) {
      e.preventDefault()
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactClick = (e, item) => {
    if (item === 'hello.weplic@gmail.com') return
    if (item === 'Book a Call') {
      e.preventDefault()
      openBooking()
    }
  }

  const columns = [
    {
      title: "Services",
      list: [
        { label: "Web Design", onClick: (e) => handleServiceClick(e, "Website Design & Development") },
        { label: "App Development", onClick: (e) => handleServiceClick(e, "Mobile App Design & Development") },
        { label: "UI/UX Design", onClick: (e) => handleServiceClick(e, "UI/UX Design") },
        { label: "Branding", onClick: (e) => handleServiceClick(e, "Brand Identity") },
        { label: "Design Systems", onClick: (e) => handleServiceClick(e, "Design Systems") }
      ],
    },
    {
      title: "Company",
      list: [
        { label: "About", onClick: (e) => handleCompanyClick(e, "About") },
        { label: "Works", onClick: (e) => handleCompanyClick(e, "Works") },
        { label: "Process", onClick: (e) => handleCompanyClick(e, "Process") },
        { label: "Contact", onClick: (e) => handleCompanyClick(e, "Contact") }
      ],
    },
    {
      title: "Socials",
      list: [
        { label: "Twitter / X", href: "https://x.com/weplic/status/2077289519016186015?s=46", target: "_blank" },
        { label: "LinkedIn", href: "https://www.linkedin.com/posts/weplic-b0a402421_every-brand-has-a-story-but-only-the-right-share-7483055952162852864-ZYX3/?utm_source=social_share_send&utm_medium=ios_app&rcm=ACoAAGsGU7oBqS_pMRZtZppgAdKrV0neMhcPD0E&utm_campaign=copy_link", target: "_blank" },
        { label: "Instagram", href: "https://www.instagram.com/p/DazffpCRtQs/", target: "_blank" },
      ],
    },
    {
      title: "Direct Contact",
      list: [
        { label: "hello.weplic@gmail.com", href: "mailto:hello.weplic@gmail.com", onClick: (e) => handleContactClick(e, "hello.weplic@gmail.com") },
        { label: "Book 15-Min Intro Call", href: "#", onClick: (e) => handleContactClick(e, "Book a Call") },
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 items-start" ref={ref}>
      {/* Brand Column */}
      <motion.div
        className="lg:col-span-2 flex flex-col gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-white font-clash font-extrabold text-4xl tracking-tight">WEPLIC</h2>
          <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulse" />
        </div>

        <p className={`${inter.className} text-neutral-300 text-sm leading-relaxed max-w-sm`}>
          A high-velocity digital product studio engineering fast, beautiful, production-ready web & mobile apps for ambitious startups.
        </p>

        <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 max-w-max">
          <span className="w-2 h-2 rounded-full bg-[#FFC800]" />
          <span className={`${inter.className} text-xs font-semibold text-neutral-300`}>Available for Q3/Q4 Sprints</span>
        </div>
      </motion.div>

      {/* 4 Navigation Columns (Grid layout on mobile: 2 cols!) */}
      <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {columns.map((col, index) => (
          <motion.div
            key={col.title}
            className={`${inter.className} flex flex-col gap-4`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
          >
            <h3 className="text-white uppercase font-bold text-xs tracking-[2px] opacity-70">
              {col.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {col.list.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <a
                    href={item.href || "#"}
                    target={item.target}
                    onClick={item.onClick}
                    className="text-neutral-300 font-medium text-sm leading-6 inline-flex items-center gap-1 relative group transition-colors duration-300 hover:text-[#FFC800]"
                  >
                    <span>{item.label}</span>
                    {item.target === "_blank" && <FiArrowUpRight className="text-xs text-neutral-500 group-hover:text-[#FFC800]" />}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#FFC800] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
