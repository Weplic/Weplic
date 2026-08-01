/**
 * useSecureNavigation — Template Method Pattern + Observer Pattern
 *
 * Custom hook that provides safe section navigation to any component.
 * Instead of directly manipulating the DOM (which bypasses the Mediator),
 * this hook emits NAVIGATE_SECTION events through the EventBus.
 *
 * The Mediator (AppContext) subscribes to these events and calls
 * scrollToSection() from lib/navigation.js to perform the actual scroll.
 *
 * This follows the same decoupling pattern as useActions():
 *   Component → hook → EventBus.emit() → Mediator handles
 *
 * Usage:
 *   const { navigateToSection } = useSecureNavigation()
 *   navigateToSection('#services')  // or 'services'
 */
import { useCallback } from 'react'
import { eventBus } from '@/lib/EventBus'
import { NAVIGATE_SECTION } from '@/lib/events'
import { sanitizeHash } from '@/lib/navigation'

export default function useSecureNavigation() {
  /**
   * Sanitizes a hash target and emits a NAVIGATE_SECTION event.
   * The Mediator will receive this and coordinate the scroll.
   *
   * @param {string} targetHash — e.g. '#services', 'about', '#contact'
   */
  const navigateToSection = useCallback((targetHash) => {
    // Special case: '#' or empty means scroll to top (home)
    if (!targetHash || targetHash === '#' || targetHash === '') {
      eventBus.emit(NAVIGATE_SECTION, { sectionId: 'home' })
      return
    }

    const cleanId = sanitizeHash(targetHash)
    if (cleanId) {
      eventBus.emit(NAVIGATE_SECTION, { sectionId: cleanId })
    }
    // If hash is invalid/malicious, silently ignore (no DOM manipulation)
  }, [])

  return { navigateToSection }
}
