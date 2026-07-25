/**
 * Validators — Chain of Responsibility Pattern
 *
 * Each validator is a function that checks one concern and either
 * returns an error string or null. Validators are chained together
 * so the first failure stops the chain and reports the error.
 *
 * Usage:
 *   const validate = createValidationChain(
 *     required('name'),
 *     required('email'),
 *     isEmail('email'),
 *     minLength('message', 10),
 *   )
 *
 *   const error = validate({ name: '', email: 'bad', message: 'hi' })
 *   // => 'Name is required.'
 */

/**
 * Creates a validator that checks a field is non-empty.
 * @param {string} fieldName — The form data key to check
 * @returns {Function} validator
 */
export function required(fieldName) {
  return (formData) => {
    const value = formData[fieldName]
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      const label = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      return `${label} is required.`
    }
    return null
  }
}

/**
 * Creates a validator that checks a field contains a valid email.
 * @param {string} fieldName — The form data key to check
 * @returns {Function} validator
 */
export function isEmail(fieldName) {
  return (formData) => {
    const value = formData[fieldName]
    if (!value) return null // Let required() handle empty check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address.'
    }
    return null
  }
}

/**
 * Creates a validator that checks a field meets a minimum length.
 * @param {string} fieldName — The form data key to check
 * @param {number} min — Minimum character count
 * @returns {Function} validator
 */
export function minLength(fieldName, min) {
  return (formData) => {
    const value = formData[fieldName]
    if (!value) return null // Let required() handle empty check
    if (value.trim().length < min) {
      const label = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      return `${label} must be at least ${min} characters.`
    }
    return null
  }
}

/**
 * Chains multiple validators together. Runs them in order and
 * returns the first error encountered, or null if all pass.
 *
 * This is the "chain" — each handler either produces an error
 * (stopping the chain) or passes responsibility to the next handler.
 *
 * @param {...Function} validators — Validator functions to chain
 * @returns {Function} validate(formData) => errorString | null
 */
export function createValidationChain(...validators) {
  return (formData) => {
    for (const validator of validators) {
      const error = validator(formData)
      if (error) return error
    }
    return null
  }
}
