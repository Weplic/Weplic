/**
 * useFormSubmission — Strategy Pattern (Consumer)
 *
 * A custom hook that handles the common form submission lifecycle:
 * validate → format payload → fetch → handle success/error → loading state.
 *
 * The "strategy" parameter determines HOW to validate, format, and
 * where to send. The hook handles the common orchestration.
 *
 * Usage:
 *   import { ProjectBriefStrategy } from '@/lib/formStrategies'
 *
 *   const { submit, loading, error, success, reset } = useFormSubmission(ProjectBriefStrategy)
 *
 *   const handleSubmit = (e) => {
 *     e.preventDefault()
 *     submit({ name, email, message })
 *   }
 */
import { useState, useCallback } from 'react'
import { createValidationChain } from '@/lib/validators'

/**
 * @param {Object} strategy — A form strategy object
 * @param {string} strategy.endpoint — API endpoint to POST to
 * @param {Function} strategy.formatPayload — Formats raw form data into API payload
 * @param {Function[]} strategy.validators — Array of validator functions
 * @returns {{ submit: Function, loading: boolean, error: string, success: boolean, reset: Function }}
 */
export default function useFormSubmission(strategy) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const validate = createValidationChain(...strategy.validators)

  const submit = useCallback(async (formData) => {
    // Run validation chain
    const validationError = validate(formData)
    if (validationError) {
      setError(validationError)
      return false
    }

    setError('')
    setLoading(true)

    try {
      const payload = strategy.formatPayload(formData)
      const response = await fetch(strategy.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSuccess(true)
        return true
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again.')
        return false
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      return false
    } finally {
      setLoading(false)
    }
  }, [strategy, validate])

  const reset = useCallback(() => {
    setLoading(false)
    setError('')
    setSuccess(false)
  }, [])

  return { submit, loading, error, success, reset }
}
