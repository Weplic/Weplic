/**
 * Server Guards — Chain of Responsibility Pattern (Server-Side)
 *
 * Mirrors the client-side `createValidationChain()` from validators.js,
 * but for server-side API route protection. Each guard checks one
 * security concern and either returns an error Response or null (pass).
 *
 * Usage:
 *   const guardChain = createServerGuardChain(
 *     rateLimit(5, 10 * 60 * 1000),
 *     validateOrigin(),
 *   )
 *
 *   const blocked = await guardChain(req)
 *   if (blocked) return blocked  // Returns a Response object
 */

// ── In-Memory Rate Limit Store ──
const rateLimitStore = new Map()

/**
 * Creates a rate-limit guard.
 * Returns a Response if the IP has exceeded the limit, or null if allowed.
 *
 * @param {number} limit — Max requests allowed in the window
 * @param {number} windowMs — Time window in milliseconds
 * @returns {Function} guard(req) => Response | null
 */
export function rateLimit(limit = 5, windowMs = 10 * 60 * 1000) {
  return async (req) => {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1'

    const now = Date.now()
    const record = rateLimitStore.get(ip) || { count: 0, resetTime: now + windowMs }

    if (now > record.resetTime) {
      record.count = 1
      record.resetTime = now + windowMs
    } else {
      record.count += 1
    }

    rateLimitStore.set(ip, record)

    // Periodic memory cleanup (prevent unbounded growth)
    if (rateLimitStore.size > 5000) {
      for (const [key, val] of rateLimitStore.entries()) {
        if (now > val.resetTime) rateLimitStore.delete(key)
      }
    }

    if (record.count > limit) {
      return Response.json(
        { error: 'Too many requests. Please wait before submitting again.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(windowMs / 1000)),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }

    return null // Pass — allowed
  }
}

/**
 * Creates an origin/CSRF validation guard.
 * Checks that the request Origin or Referer header matches the host.
 *
 * @returns {Function} guard(req) => Response | null
 */
export function validateOrigin() {
  return async (req) => {
    const origin = req.headers.get('origin') || req.headers.get('referer')
    const host = req.headers.get('host')

    if (origin && host) {
      const isSameHost =
        origin.includes(host) ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')

      if (!isSameHost) {
        return Response.json(
          { error: 'Forbidden: Request origin unauthorized.' },
          { status: 403 }
        )
      }
    }

    return null // Pass
  }
}

/**
 * Sanitizes a single string field for safe HTML output.
 * Escapes HTML entities to prevent XSS in email templates.
 *
 * @param {string} input — Raw user input
 * @returns {string} Sanitized string
 */
export function sanitizeField(input) {
  if (typeof input !== 'string') return ''

  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Control chars
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

/**
 * Chains multiple server guards together.
 * Runs them in order; the first guard that returns a Response
 * stops the chain (just like createValidationChain stops on first error).
 *
 * @param {...Function} guards — Async guard functions: (req) => Response | null
 * @returns {Function} guardChain(req) => Response | null
 */
export function createServerGuardChain(...guards) {
  return async (req) => {
    for (const guard of guards) {
      const blocked = await guard(req)
      if (blocked) return blocked // Chain stops — return the error Response
    }
    return null // All guards passed
  }
}
