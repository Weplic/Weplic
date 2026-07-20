'use client'
import React, { useRef } from "react"
import { Inter } from 'next/font/google'
import { motion, useInView } from 'framer-motion'
import { useApp } from '@/Context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export default function FooterAbout() {
  const { openBrief, openBooking } = useApp()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const handleServiceClick = (e, service) => {
    e.preventDefault()
    // Scroll to services section first
    const servicesEl = document.getElementById('services')
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' })
    }
    // Then pre-open brief with that service
    setTimeout(() => {
      openBrief(service)
    }, 800)
  }

  const handleCompanyClick = (e, item) => {
    if (item === 'Careers') {
      e.preventDefault()
      alert('We are not hiring senior developers at the moment, but feel free to check back soon or send us a brief!')
      return
    }
    if (item === 'Contact') {
      e.preventDefault()
      openBrief()
      return
    }
    
    // Mapping items to IDs
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
    if (item === 'hello.weplic@gmail.com') {
      return // standard mailto
    }
    if (item === 'Book a Call') {
      e.preventDefault()
      openBooking()
    }
  }

  const About = [
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
        { label: "Careers", onClick: (e) => handleCompanyClick(e, "Careers") },
        { label: "Contact", onClick: (e) => handleCompanyClick(e, "Contact") }
      ],
    },
    {
      title: "Contact",
      list: [
        { label: "hello.weplic@gmail.com", href: "mailto:hello.weplic@gmail.com", onClick: (e) => handleContactClick(e, "hello.weplic@gmail.com") },
        { label: "Book a Call", href: "#", onClick: (e) => handleContactClick(e, "Book a Call") },
        { label: "Twitter", href: "https://twitter.com", target: "_blank" },
        { label: "LinkedIn", href: "https://linkedin.com", target: "_blank" },
        { label: "Dribbble", href: "https://dribbble.com", target: "_blank" }
      ],
    },
  ]

  return (
    <div className="flex justify-between items-start gap-4" ref={ref}>
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-[#FFFFFF] uppercase font-bold text-3xl leading-9">WEPLIC</h2>
        <p className={`${inter.className} text-[#6A6A6A] text-sm leading-5 font-regular max-w-80`}>
          Where Brands Become Experiences. A premium creative studio building digital products that move people.
        </p>
        <div className="flex gap-4">
          {['Twitter', 'LinkedIn', 'Dribbble', 'Behance'].map((social, i) => (
            <motion.a
              key={social}
              href={`https://${social.toLowerCase()}.com`}
              target="_blank"
              className="text-[#6A6A6A] transition-all duration-300 hover:text-[#FFC800] hover:scale-110"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {social}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {About.map((item, index) => (
        <motion.div
          key={index}
          className={`${inter.className} flex flex-col gap-4 m-4`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
        >
          <h2 className="text-[#FFFFFF] opacity-30 uppercase font-medium text-sm leading-4 tracking-[2px]">
            {item.title}
          </h2>
          <ul className="flex flex-col gap-2">
            {item.list.map((subItem, subIndex) => (
              <motion.li
                key={subIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 + subIndex * 0.05 }}
              >
                <a
                  href={subItem.href || "#"}
                  target={subItem.target}
                  onClick={subItem.onClick}
                  className="text-[#6A6A6A] font-regular text-sm leading-5 relative group transition-colors duration-300 hover:text-white"
                >
                  {subItem.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#FFC800] transition-all duration-300 group-hover:w-full" />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}

