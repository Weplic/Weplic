/**
 * useSectionView — Template Method Pattern
 *
 * Encapsulates the repeated boilerplate that every section
 * component uses: creating a ref and observing its viewport
 * intersection. This is the "skeleton" — subclasses (each section)
 * customize only the margin/once parameters.
 *
 * Before (repeated in every section):
 *   const sectionRef = useRef(null)
 *   const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
 *
 * After:
 *   const { sectionRef, isInView } = useSectionView()
 */
import { useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * @param {Object} [options]
 * @param {string} [options.margin='-100px'] — IntersectionObserver rootMargin
 * @param {boolean} [options.once=true] — Only trigger once
 * @returns {{ sectionRef: React.RefObject, isInView: boolean }}
 */
export default function useSectionView({ margin = '-100px', once = true } = {}) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once, margin })

  return { sectionRef, isInView }
}
