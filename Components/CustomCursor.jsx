'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 350 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Detect touch/coarse pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0

    if (isTouch) {
      setTimeout(() => {
        setIsTouchDevice(true)
      }, 0)
    }
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 11)
      cursorY.set(e.clientY - 11)
      setIsVisible((prev) => (prev ? prev : true))

      // Detect hovering over interactive elements
      const target = e.target
      const isInteractive = target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
      setIsHovering(!!isInteractive)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isTouchDevice])

  // Render nothing on touch/mobile devices
  if (isTouchDevice) return null

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? 'custom-cursor--active' : ''}`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    />
  )
}
