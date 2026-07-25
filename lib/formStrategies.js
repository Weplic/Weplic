/**
 * Form Strategies — Strategy Pattern
 *
 * Each strategy object defines how to format, validate, and submit
 * a specific type of form. Components don't know the submission
 * details — they just pass form data to the strategy.
 *
 * Common interface:
 *   {
 *     endpoint: string,
 *     formatPayload(formData): object,
 *     validators: Function[]    // Chain of Responsibility validators
 *   }
 */
import { required, isEmail, minLength } from './validators'

/**
 * Strategy for project brief submissions from ProjectDrawer.
 */
export const ProjectBriefStrategy = {
  endpoint: '/api/send',

  validators: [
    required('name'),
    required('email'),
    isEmail('email'),
    required('message'),
    minLength('message', 10),
  ],

  formatPayload({ name, email, company, selectedServices, selectedBudget, customBudget, message }) {
    const finalService = selectedServices && selectedServices.length > 0
      ? selectedServices.join(', ')
      : 'Not Specified'
    const finalBudget = (customBudget?.trim() || selectedBudget) || 'Not Specified'

    return {
      name,
      email,
      company,
      service: finalService,
      budget: finalBudget,
      message,
    }
  },
}

/**
 * Strategy for booking/meeting submissions from BookingModal.
 */
export const BookingStrategy = {
  endpoint: '/api/send',

  validators: [
    required('name'),
    required('email'),
    isEmail('email'),
    required('description'),
  ],

  formatPayload({ name, email, description, selectedDate, selectedTime }) {
    const dateStr = selectedDate
      ? selectedDate.toLocaleDateString('en-US', {
          weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
        })
      : 'Not specified'

    return {
      name,
      email,
      company: 'Meeting Request',
      service: '30-Min Discovery Meeting',
      budget: 'N/A',
      message: `Scheduled Discovery Call on ${dateStr} at ${selectedTime}.\n\nMeeting Description: ${description}`,
    }
  },
}
