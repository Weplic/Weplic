'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [mounted, setMounted] = useState(false)
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const posRef = useRef({ x: -100, y: -100 })
  const visibleRef = useRef(false)
  const hoveringRef = useRef(false)
  const rafRef = useRef(null)

  const SIZE = 72 // X-ray lens size (matches Image 2 spec)

  const render = useCallback(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const { x, y } = posRef.current
    const scale = hoveringRef.current ? 1.35 : 1
    const opacity = visibleRef.current ? '1' : '0'

    // 2D position translate (no 3D translate3d layer promotion)
    cursor.style.transform = `translate(${x - SIZE / 2}px, ${y - SIZE / 2}px) scale(${scale})`
    cursor.style.opacity = opacity

    // Center dot
    dot.style.transform = `translate(${x - 3}px, ${y - 3}px) scale(${hoveringRef.current ? 0 : 1})`
    dot.style.opacity = opacity
  }, [])

  useEffect(() => {
    setMounted(true)

    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0

    if (isTouch) {
      setIsTouchDevice(true)
    }
  }, [])

  useEffect(() => {
    if (isTouchDevice || !mounted) return

    const onMouseMove = (e) => {
      posRef.current.x = e.clientX
      posRef.current.y = e.clientY
      visibleRef.current = true

      const target = e.target
      hoveringRef.current = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      )

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(render)
    }

    const onMouseLeave = () => {
      visibleRef.current = false
      requestAnimationFrame(render)
    }

    const onMouseEnter = () => {
      visibleRef.current = true
      requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isTouchDevice, mounted, render])

  if (isTouchDevice || !mounted) return null

  return createPortal(
    <>
      {/* Main X-ray Lens Circle matching Image 2 */}
      <div
        ref={cursorRef}
        className="custom-cursor-lens"
        style={{
          opacity: 0,
          transform: 'translate(-100px, -100px)',
        }}
      />
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="custom-cursor-center-dot"
        style={{
          opacity: 0,
          transform: 'translate(-100px, -100px)',
        }}
      />
    </>,
    document.body
  )
}
