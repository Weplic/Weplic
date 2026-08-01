'use client'
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { eventBus, useEventBus } from '@/lib/EventBus'
import {
  OPEN_BRIEF,
  CLOSE_BRIEF,
  OPEN_BOOKING,
  CLOSE_BOOKING,
  OPEN_CASE_STUDY,
  CLOSE_CASE_STUDY,
  NAVIGATE_SECTION,
} from '@/lib/events'
import { scrollToSection } from '@/lib/navigation'

/**
 * AppContext — Mediator Pattern
 *
 * This context acts as a central mediator that:
 * 1. Subscribes to EventBus events (Observer pattern integration)
 * 2. Coordinates state transitions between overlays
 * 3. Ensures only one overlay is open at a time
 * 4. Centralizes scroll lock management
 * 5. Coordinates secure section navigation
 * 6. Exposes read-only state via useApp()
 *
 * Components that trigger actions use useActions() which emits
 * events through the EventBus. Components that read state use useApp().
 * The Mediator connects the two sides.
 */
const AppContext = createContext(undefined)

// ── Scroll Lock Management (centralized) ──
function lockScroll() {
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.body.style.overflow = 'unset'
}

export function AppProvider({ children }) {
  const [isBriefOpen, setIsBriefOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState('')
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)

  // ── Mediator: Close all overlays ──
  const closeAllOverlays = useCallback(() => {
    setIsBriefOpen(false)
    setPreselectedService('')
    setIsBookingOpen(false)
    setActiveCaseStudy(null)
    unlockScroll()
  }, [])

  // ── Mediator: Event Handlers ──
  // Each handler coordinates state: close others before opening

  const handleOpenBrief = useCallback((payload) => {
    closeAllOverlays()
    setPreselectedService(payload?.service || '')
    setIsBriefOpen(true)
    lockScroll()
  }, [closeAllOverlays])

  const handleCloseBrief = useCallback(() => {
    setIsBriefOpen(false)
    setPreselectedService('')
    unlockScroll()
  }, [])

  const handleOpenBooking = useCallback(() => {
    closeAllOverlays()
    setIsBookingOpen(true)
    lockScroll()
  }, [closeAllOverlays])

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false)
    unlockScroll()
  }, [])

  const handleOpenCaseStudy = useCallback((payload) => {
    closeAllOverlays()
    setActiveCaseStudy(payload?.caseStudy || null)
    lockScroll()
  }, [closeAllOverlays])

  const handleCloseCaseStudy = useCallback(() => {
    setActiveCaseStudy(null)
    unlockScroll()
  }, [])

  // ── Mediator: Secure Navigation Handler ──
  const handleNavigateSection = useCallback((payload) => {
    const sectionId = payload?.sectionId
    if (sectionId) {
      // Close any open overlays before navigating
      closeAllOverlays()
      scrollToSection(sectionId)
    }
  }, [closeAllOverlays])

  // ── Subscribe to EventBus events ──
  useEventBus(OPEN_BRIEF, handleOpenBrief)
  useEventBus(CLOSE_BRIEF, handleCloseBrief)
  useEventBus(OPEN_BOOKING, handleOpenBooking)
  useEventBus(CLOSE_BOOKING, handleCloseBooking)
  useEventBus(OPEN_CASE_STUDY, handleOpenCaseStudy)
  useEventBus(CLOSE_CASE_STUDY, handleCloseCaseStudy)
  useEventBus(NAVIGATE_SECTION, handleNavigateSection)

  // ── Cleanup scroll lock on unmount ──
  useEffect(() => {
    return () => unlockScroll()
  }, [])

  return (
    <AppContext.Provider
      value={{
        // Read-only state
        isBriefOpen,
        preselectedService,
        isBookingOpen,
        activeCaseStudy,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

/**
 * useApp — Read-only access to overlay state.
 * Use this in components that need to know IF something is open,
 * but don't trigger actions themselves.
 */
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  const actions = useActions()
  return { ...context, ...actions }
}

/**
 * useActions — Action emitters via EventBus.
 *
 * Use this in components that trigger overlay open/close.
 * These functions emit events through the EventBus, which the
 * Mediator (AppProvider) listens to and coordinates.
 *
 * This decouples trigger components from state management —
 * they don't need to import the context at all, just useActions().
 */
export function useActions() {
  const openBrief = useCallback((service = '') => {
    eventBus.emit(OPEN_BRIEF, { service })
  }, [])

  const closeBrief = useCallback(() => {
    eventBus.emit(CLOSE_BRIEF)
  }, [])

  const openBooking = useCallback(() => {
    eventBus.emit(OPEN_BOOKING)
  }, [])

  const closeBooking = useCallback(() => {
    eventBus.emit(CLOSE_BOOKING)
  }, [])

  const openCaseStudy = useCallback((caseStudy) => {
    eventBus.emit(OPEN_CASE_STUDY, { caseStudy })
  }, [])

  const closeCaseStudy = useCallback(() => {
    eventBus.emit(CLOSE_CASE_STUDY)
  }, [])

  const navigateToSection = useCallback((sectionId) => {
    eventBus.emit(NAVIGATE_SECTION, { sectionId })
  }, [])

  return {
    openBrief,
    closeBrief,
    openBooking,
    closeBooking,
    openCaseStudy,
    closeCaseStudy,
    navigateToSection,
  }
}
