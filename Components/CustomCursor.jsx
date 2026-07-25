'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isTextHover, setIsTextHover] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 400 }
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

    let currentTextNode = null

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setIsVisible((prev) => (prev ? prev : true))
    }

    const clearTextMagnification = () => {
      if (currentTextNode) {
        currentTextNode.classList.remove('glass-text-magnified')
        currentTextNode = null
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return

      const textTarget = (
        target.closest('a, button, p, h1, h2, h3, h4, h5, h6, span, li, label, strong, b, em') ||
        (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI', 'LABEL', 'STRONG', 'B', 'EM', 'A', 'BUTTON'].includes(target.tagName) ? target : null)
      )

      if (textTarget && textTarget.textContent && textTarget.textContent.trim().length > 0) {
        if (currentTextNode && currentTextNode !== textTarget) {
          currentTextNode.classList.remove('glass-text-magnified')
        }
        currentTextNode = textTarget
        currentTextNode.classList.add('glass-text-magnified')
        setIsHovering(true)
        setIsTextHover(true)
      } else if (target.classList && target.classList.contains('cursor-hover')) {
        clearTextMagnification()
        setIsHovering(true)
        setIsTextHover(false)
      } else {
        clearTextMagnification()
        setIsHovering(false)
        setIsTextHover(false)
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target
      if (!target) return

      const textTarget = (
        target.closest('a, button, p, h1, h2, h3, h4, h5, h6, span, li, label, strong, b, em') ||
        (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI', 'LABEL', 'STRONG', 'B', 'EM', 'A', 'BUTTON'].includes(target.tagName) ? target : null)
      )

      if (textTarget && textTarget === currentTextNode) {
        clearTextMagnification()
        setIsHovering(false)
        setIsTextHover(false)
      }
    }

    const handleMouseLeave = () => {
      clearTextMagnification()
      setIsVisible(false)
    }
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      clearTextMagnification()
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isTouchDevice])

  // Render nothing on touch/mobile devices
  if (isTouchDevice) return null

  return (
    <>
      <motion.div
        className={`custom-cursor-dot ${isHovering ? 'glass-lens' : ''} ${isTextHover ? 'text-lens' : ''}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? (isTextHover ? 3.0 : 2.2) : 1,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      >
        <span className="glass-reflection" />
      </motion.div>
      <motion.div
        className="custom-cursor-ring"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? (isTextHover ? 1.8 : 1.5) : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />
    </>
  )
}
