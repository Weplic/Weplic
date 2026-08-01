'use client'
import { useEffect } from 'react'
import { eventBus } from '@/lib/EventBus'
import { NAVIGATE_SECTION } from '@/lib/events'
import { sanitizeHash, stripHash } from '@/lib/navigation'

/**
 * SecurityGuard — Observer Pattern (Sensor Component)
 *
 * A thin "sensor" component that watches browser-level security
 * concerns and emits events through the EventBus. It does NOT
 * perform DOM manipulation or state changes itself — it delegates
 * to the Mediator (AppContext) via EventBus events.
 *
 * Responsibilities:
 * 1. Anti-clickjacking frame buster (browser-level, not state)
 * 2. Hash sanitization on initial page load → emits NAVIGATE_SECTION
 * 3. Hash sanitization on hashchange events → emits NAVIGATE_SECTION
 * 4. Strips malicious/unrecognized hashes from URL
 */
export default function SecurityGuard() {
  useEffect(() => {
    // 1. Anti-Clickjacking Frame Buster
    try {
      if (window.top !== window.self) {
        window.top.location = window.self.location
      }
    } catch (e) {
      console.warn('[SecurityGuard] Frame embedding prevented.')
    }

    // 2. Hash sanitization on initial page load
    const handleInitialHash = () => {
      const rawHash = window.location.hash
      if (rawHash) {
        const cleanId = sanitizeHash(rawHash)
        if (cleanId) {
          // Emit through EventBus → Mediator handles the scroll
          setTimeout(() => {
            eventBus.emit(NAVIGATE_SECTION, { sectionId: cleanId })
          }, 300)
        } else {
          // Malicious or unrecognized hash — strip it
          stripHash()
        }
      }
    }

    handleInitialHash()

    // 3. Listen for dynamic hash changes
    const handleHashChange = () => {
      const rawHash = window.location.hash
      if (rawHash) {
        const cleanId = sanitizeHash(rawHash)
        if (cleanId) {
          eventBus.emit(NAVIGATE_SECTION, { sectionId: cleanId })
        } else {
          stripHash()
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return null
}
