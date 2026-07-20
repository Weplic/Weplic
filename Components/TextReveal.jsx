'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function TextReveal({
  children,
  as: Tag = 'p',
  className = '',
  type = 'words',    // 'words' | 'chars' | 'lines'
  stagger = 0.03,
  duration = 0.8,
  y = 40,
  once = true,
  start = 'top 85%',
  scrub = false,
}) {
  const textRef = useRef(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    const split = new SplitType(el, { types: type })
    const targets = split[type]

    gsap.set(targets, { y, opacity: 0 })

    const triggerConfig = {
      trigger: el,
      start,
    }

    if (scrub) {
      triggerConfig.scrub = 1
      triggerConfig.end = 'bottom 20%'
    } else {
      triggerConfig.toggleActions = once
        ? 'play none none none'
        : 'play none none reverse'
    }

    gsap.to(targets, {
      y: 0,
      opacity: 1,
      stagger,
      duration,
      ease: 'power3.out',
      scrollTrigger: triggerConfig,
    })

    return () => {
      split.revert()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [type, stagger, duration, y, once, start, scrub])

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  )
}
