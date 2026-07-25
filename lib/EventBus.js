/**
 * EventBus — Observer Pattern
 *
 * A lightweight publish/subscribe event system that decouples
 * event producers (buttons, UI triggers) from event consumers
 * (modals, drawers, state managers).
 *
 * Usage:
 *   import { eventBus, useEventBus } from '@/lib/EventBus'
 *
 *   // Emit from anywhere:
 *   eventBus.emit(OPEN_BRIEF, { service: 'Web Design' })
 *
 *   // Subscribe in a React component:
 *   useEventBus(OPEN_BRIEF, (payload) => { ... })
 */
import { useEffect } from 'react'

class EventBus {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this._listeners = new Map()
  }

  /**
   * Subscribe to an event.
   * @param {string} event — Event name constant
   * @param {Function} callback — Handler receiving the event payload
   * @returns {Function} unsubscribe — Call to remove this listener
   */
  subscribe(event, callback) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set())
    }
    this._listeners.get(event).add(callback)

    // Return an unsubscribe function for easy cleanup
    return () => {
      const listeners = this._listeners.get(event)
      if (listeners) {
        listeners.delete(callback)
        if (listeners.size === 0) {
          this._listeners.delete(event)
        }
      }
    }
  }

  /**
   * Emit an event to all subscribers.
   * @param {string} event — Event name constant
   * @param {*} [payload] — Data to pass to subscribers
   */
  emit(event, payload) {
    const listeners = this._listeners.get(event)
    if (listeners) {
      listeners.forEach((callback) => callback(payload))
    }
  }
}

/** Singleton event bus instance (module-scoped) */
export const eventBus = new EventBus()

/**
 * React hook — subscribes to an EventBus event for the
 * lifetime of the component. Automatically unsubscribes on unmount.
 *
 * @param {string} event — Event name constant
 * @param {Function} callback — Handler receiving the event payload
 */
export function useEventBus(event, callback) {
  useEffect(() => {
    const unsubscribe = eventBus.subscribe(event, callback)
    return unsubscribe
  }, [event, callback])
}
