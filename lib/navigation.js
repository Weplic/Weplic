/**
 * Navigation Utilities — Safe Hash Navigation
 *
 * Pure utility functions for sanitizing URL hashes and performing
 * safe DOM scrolling. These are low-level primitives used by the
 * Mediator (AppContext) to execute navigation after receiving
 * NAVIGATE_SECTION events through the EventBus.
 *
 * Architecture:
 *   Component → useSecureNavigation hook → EventBus.emit(NAVIGATE_SECTION)
 *   → AppContext Mediator subscribes → calls scrollToSection() from here
 */

/**
 * Whitelist of allowed section IDs.
 * Any hash not in this set is rejected and stripped from the URL.
 */
export const ALLOWED_SECTIONS = new Set([
  'home',
  'services',
  'work',
  'process',
  'about',
  'faq',
  'contact',
  'stats',
  'philosophy',
])

/**
 * Sanitizes a raw URL hash into a safe, whitelisted section ID.
 * Prevents Hash-based DOM XSS and selector injection attacks.
 *
 * @param {string} rawHash — Raw location.hash or link target (e.g. "#services" or "services")
 * @returns {string|null} Clean section ID if valid & allowed, otherwise null
 */
export function sanitizeHash(rawHash) {
  if (!rawHash || typeof rawHash !== 'string') return null

  // Strip leading '#' symbols and trim whitespace
  const clean = rawHash.replace(/^#+/, '').trim().toLowerCase()

  // Allow only safe lowercase letters, numbers, and hyphens
  const sanitized = clean.replace(/[^a-z0-9-]/g, '')

  if (ALLOWED_SECTIONS.has(sanitized)) {
    return sanitized
  }

  return null
}

/**
 * Safely scrolls to a whitelisted section ID in the DOM.
 * Uses getElementById (never querySelector with raw strings) to avoid
 * CSS selector injection. Updates browser history state cleanly.
 *
 * @param {string} sectionId — Already-sanitized section ID
 * @returns {boolean} True if element was found and scrolled to
 */
export function scrollToSection(sectionId) {
  if (typeof window === 'undefined') return false

  // 'home' is a special case — scroll to top
  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (window.history?.replaceState) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    return true
  }

  try {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      if (window.history?.replaceState) {
        window.history.replaceState(null, '', `#${sectionId}`)
      }
      return true
    }
  } catch (err) {
    console.warn('[Navigation] Safe scroll blocked invalid DOM operation:', err)
  }

  return false
}

/**
 * Strips the URL hash from the browser address bar without triggering
 * a navigation event. Used to remove malicious or unrecognized hashes.
 */
export function stripHash() {
  if (typeof window === 'undefined') return
  if (window.history?.replaceState) {
    window.history.replaceState(null, '', window.location.pathname)
  }
}
