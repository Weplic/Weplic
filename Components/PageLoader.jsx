'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const letters = 'WEPLIC'.split('')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0A0A]"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex gap-2">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-6xl font-bold text-white font-clash"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="absolute bottom-12 left-1/2 h-[2px] bg-[#FFC800]"
            initial={{ width: 0, x: '-50%' }}
            animate={{ width: 120, x: '-50%' }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
