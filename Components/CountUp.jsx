'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function CountUp({ target, duration = 2, suffix = '', className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    // Parse numeric value from target
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(numericTarget)) return

    const startTime = performance.now()
    const durationMs = duration * 1000

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / durationMs, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numericTarget)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  // Reconstruct the formatted value
  const formattedValue = (() => {
    const raw = target
    // Detect if it ends with special chars
    const trailingChars = raw.replace(/[0-9.]/g, '')
    return count + trailingChars
  })()

  return (
    <span ref={ref} className={className}>
      {isInView ? formattedValue : '0' + target.replace(/[0-9.]/g, '')}
    </span>
  )
}
