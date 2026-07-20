'use client'
import { motion } from 'framer-motion'

const shapes = [
  { size: 6, x: '10%', y: '20%', delay: 0, duration: 6 },
  { size: 4, x: '80%', y: '15%', delay: 1, duration: 8 },
  { size: 8, x: '70%', y: '60%', delay: 2, duration: 7 },
  { size: 5, x: '20%', y: '70%', delay: 0.5, duration: 9 },
  { size: 3, x: '50%', y: '30%', delay: 1.5, duration: 6.5 },
  { size: 7, x: '90%', y: '80%', delay: 3, duration: 8 },
  { size: 4, x: '35%', y: '85%', delay: 2.5, duration: 7.5 },
  { size: 5, x: '60%', y: '10%', delay: 0.8, duration: 6.8 },
]

export default function FloatingElements({ color = '#FFC800', opacity = 0.15, count = 8 }) {
  const visibleShapes = shapes.slice(0, count)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {visibleShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: color,
            opacity: opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
