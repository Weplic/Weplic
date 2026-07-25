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

    const clearTextMagnification = () => {
      if (currentTextNode) {
        currentTextNode.classList.remove('glass-text-magnified')
        if (currentTextNode.classList.contains('glass-word-wrapper') && currentTextNode.parentNode) {
          const parent = currentTextNode.parentNode
          const textContent = currentTextNode.textContent
          parent.replaceChild(document.createTextNode(textContent), currentTextNode)
          parent.normalize()
        }
        currentTextNode = null
      }
    }

    const getWordUnderCursor = (e) => {
      if (!e) return null
      
      let range = null
      if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(e.clientX, e.clientY)
      } else if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(e.clientX, e.clientY)
        if (pos && pos.offsetNode) {
          range = document.createRange()
          range.setStart(pos.offsetNode, pos.offset)
          range.setEnd(pos.offsetNode, pos.offset)
        }
      }

      if (range && range.startContainer) {
        const node = range.startContainer
        if (node.nodeType === Node.TEXT_NODE) {
          const parent = node.parentElement
          if (parent) {
            if (
              parent.tagName === 'A' ||
              parent.tagName === 'BUTTON' ||
              parent.classList.contains('word') ||
              parent.classList.contains('char') ||
              parent.classList.contains('glass-word-wrapper') ||
              (parent.textContent && parent.textContent.trim().split(/\s+/).length <= 1)
            ) {
              return parent
            }

            const text = node.nodeValue
            const offset = range.startOffset
            let start = offset
            while (start > 0 && !/\s/.test(text[start - 1])) start--
            let end = offset
            while (end < text.length && !/\s/.test(text[end])) end++

            const word = text.slice(start, end).trim()
            if (word && word.length > 0) {
              try {
                const wordRange = document.createRange()
                wordRange.setStart(node, start)
                wordRange.setEnd(node, end)
                const span = document.createElement('span')
                span.className = 'glass-word-wrapper'
                wordRange.surroundContents(span)
                return span
              } catch (err) {
                return parent
              }
            }
          }
        }
      }

      const target = e.target
      if (!target) return null
      return (
        target.closest('a, button, span, li, label, strong, b, em') ||
        (['A', 'BUTTON', 'SPAN', 'LI', 'LABEL', 'STRONG', 'B', 'EM'].includes(target.tagName) ? target : null)
      )
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setIsVisible((prev) => (prev ? prev : true))

      const wordNode = getWordUnderCursor(e)
      if (wordNode) {
        if (currentTextNode && currentTextNode !== wordNode) {
          clearTextMagnification()
        }
        currentTextNode = wordNode
        currentTextNode.classList.add('glass-text-magnified')
        setIsHovering(true)
        setIsTextHover(true)
      } else {
        if (currentTextNode) {
          clearTextMagnification()
          setIsHovering(false)
          setIsTextHover(false)
        }
      }
    }

    const handleMouseLeave = () => {
      clearTextMagnification()
      setIsVisible(false)
    }
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      clearTextMagnification()
      window.removeEventListener('mousemove', moveCursor)
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
