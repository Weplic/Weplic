'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiGrid, FiBriefcase, FiLayers, FiInfo, FiSend } from 'react-icons/fi'
import { useApp } from '@/Context/AppContext'

export default function BottomNavDock() {
  const { openBrief } = useApp()
  const [activeSection, setActiveSection] = useState('home')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const navItems = [
    { id: 'home', label: 'Home', href: '#', icon: FiHome },
    { id: 'services', label: 'Services', href: '#services', icon: FiGrid },
    { id: 'work', label: 'Work', href: '#work', icon: FiBriefcase },
    { id: 'process', label: 'Process', href: '#process', icon: FiLayers },
    { id: 'about', label: 'About', href: '#about', icon: FiInfo },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Auto hide on rapid down scroll, reveal on scroll up or stop
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)

      // Section scrollSpy detection
      const sections = ['services', 'work', 'process', 'about']
      let current = 'home'

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
            current = sectionId
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleItemClick = (e, item) => {
    e.preventDefault()
    if (item.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(item.id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[95] flex lg:hidden items-center gap-1.5 p-2 bg-[#040300]/90 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_16px_50px_rgba(0,0,0,0.4)]"
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        >
          {/* Section Items */}
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={(e) => handleItemClick(e, item)}
                className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-black bg-[#FFC800]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
                aria-label={item.label}
              >
                <Icon className="text-lg" />
                {isActive && (
                  <motion.div
                    layoutId="dockActiveBlob"
                    className="absolute inset-0 rounded-full bg-[#FFC800] -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}

          {/* Vertical Divider */}
          <div className="w-[1px] h-6 bg-white/20 mx-1" />

          {/* Quick Project CTA */}
          <motion.button
            onClick={() => openBrief()}
            className="flex items-center gap-2 bg-[#FFC800] text-black font-bold text-xs px-4 py-2.5 rounded-full shadow-lg cursor-pointer"
            whileTap={{ scale: 0.92 }}
          >
            <span>Start</span>
            <FiSend className="text-xs" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
