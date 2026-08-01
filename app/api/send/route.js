import { Resend } from 'resend'
import {
  createServerGuardChain,
  rateLimit,
  validateOrigin,
  sanitizeField,
} from '@/lib/serverGuards'

/**
 * API Route: POST /api/send — Chain of Responsibility Pattern (Server-Side)
 *
 * Mirrors the client-side architecture:
 *   Client:  createValidationChain(required, isEmail, ...) → first error stops
 *   Server:  createServerGuardChain(rateLimit, validateOrigin) → first block stops
 *
 * The guard chain runs before any business logic. If a guard returns
 * a Response, the chain short-circuits and returns it immediately.
 */

// Initialize Resend SDK if API key is present
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

// ── Server Guard Chain (Chain of Responsibility) ──
const guardChain = createServerGuardChain(
  rateLimit(5, 10 * 60 * 1000),   // Max 5 briefs / 10 min per IP
  validateOrigin(),                 // CSRF / Origin check
)

export async function POST(req) {
  // 1. Run guard chain — first failure short-circuits
  const blocked = await guardChain(req)
  if (blocked) return blocked

  try {
    // 2. Parse JSON payload
    let rawBody
    try {
      rawBody = await req.json()
    } catch {
      return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 })
    }

    const { name, email, company, service, budget, message } = rawBody

    // 3. Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // 4. Validate email format
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
    if (!emailRegex.test(email.trim()) || email.length > 120) {
      return Response.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // 5. Enforce max length limits (prevents payload-stuffing / ReDoS)
    if (name.length > 100 || (company && company.length > 150) || message.length > 3000) {
      return Response.json(
        { error: 'Input exceeded maximum character limits.' },
        { status: 400 }
      )
    }

    // 6. Sanitize all fields for safe HTML output (Anti-XSS)
    const cleanName = sanitizeField(name)
    const cleanEmail = sanitizeField(email.trim().toLowerCase())
    const cleanCompany = company ? sanitizeField(company) : 'Not Specified'
    const cleanService = service ? sanitizeField(service) : 'Not Specified'
    const cleanBudget = budget ? sanitizeField(budget) : 'Not Specified'
    const cleanMessage = sanitizeField(message)

    // 7. Build email HTML content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; padding: 24px; border-radius: 12px;">
        <h2 style="color: #040300; border-bottom: 2px solid #FFC800; padding-bottom: 8px;">⚡ New Project Brief Received</h2>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
        <p><strong>Company:</strong> ${cleanCompany}</p>
        <p><strong>Service Requested:</strong> ${cleanService}</p>
        <p><strong>Budget Range:</strong> ${cleanBudget}</p>
        <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 16px 0;" />
        <p><strong>Project Details / Brief:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f4f5; padding: 15px; border-radius: 8px; border: 1px solid #e4e4e7; font-size: 14px; line-height: 1.6;">${cleanMessage}</p>
      </div>
    `

    // 8. Send or simulate
    if (!resend) {
      console.log('--- SIMULATED SECURE SUBMISSION ---')
      console.log('Brief passed server guard chain:')
      console.log({ cleanName, cleanEmail, cleanCompany, cleanService, cleanBudget, cleanMessage })
      console.log('------------------------------------')

      return Response.json({
        success: true,
        message: 'Simulated submission successful (development mode without Resend API key).'
      })
    }

    const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'hello.weplic@gmail.com'

    const data = await resend.emails.send({
      from: 'Weplic Studio Briefs <onboarding@resend.dev>',
      to: [recipient],
      subject: `New Project Brief - ${cleanName} (${cleanCompany})`,
      html: emailContent,
      replyTo: cleanEmail
    })

    return Response.json({ success: true, data })
  } catch (error) {
    console.error('Secure route handler caught error:', error)
    // Mask internal error details from response (security best practice)
    return Response.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
