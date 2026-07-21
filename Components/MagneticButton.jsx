'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', strength = 0.25 }) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const { clientX, clientY } = e
    const rect = containerRef.current.getBoundingClientRect()
    const middleX = clientX - (rect.left + rect.width / 2)
    const middleY = clientY - (rect.top + rect.height / 2)
    
    // Clamp movement to avoid extreme displacement
    const maxOffset = 15
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, middleX * strength))
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, middleY * strength))
    
    setPosition({ x: clampedX, y: clampedY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
