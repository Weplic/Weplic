'use client'
import { useEffect, useRef, useCallback, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

/**
 * SSR-safe client mount detection using useSyncExternalStore.
 * Returns false on server, true on client — zero extra renders,
 * no useEffect + setState cascade.
 */
const emptySubscribe = () => () => {}
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false)
}

/**
 * Touch device detection — evaluated once at module load on client.
 * Uses a function to defer evaluation (safe during SSR bundling).
 */
function getShouldHideCursor() {
  if (typeof window === 'undefined') return true
  const isTouch =
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches
  return isTouch || !isDesktop
}

export default function CustomCursor() {
  const isClient = useIsClient()
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const posRef = useRef({ x: -100, y: -100 })
  const visibleRef = useRef(false)
  const hoveringRef = useRef(false)
  const rafRef = useRef(null)
  const isTouchRef = useRef(false)

  const SIZE = 72 // X-ray lens size

  const render = useCallback(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const { x, y } = posRef.current
    const scale = hoveringRef.current ? 1.35 : 1
    const opacity = visibleRef.current ? '1' : '0'

    // 2D translate (no translate3d GPU layer promotion)
    cursor.style.transform = `translate(${x - SIZE / 2}px, ${y - SIZE / 2}px) scale(${scale})`
    cursor.style.opacity = opacity

    // Center dot
    dot.style.transform = `translate(${x - 3}px, ${y - 3}px) scale(${hoveringRef.current ? 0 : 1})`
    dot.style.opacity = opacity
  }, [])

  useEffect(() => {
    if (!isClient) return

    isTouchRef.current = getShouldHideCursor()
    if (isTouchRef.current) return

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
  }, [isClient, render])

  // Don't render on server, touch devices, or non-desktop screens
  if (!isClient || getShouldHideCursor()) return null

  return createPortal(
    <>
      {/* Main X-ray Lens Circle */}
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
