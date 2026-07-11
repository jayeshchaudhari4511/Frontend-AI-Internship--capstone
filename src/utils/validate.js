/**
 * validate.js
 *
 * Pure validation functions — no React dependencies, easy to unit-test.
 * All values are trimmed before checking.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a single form field.
 *
 * @param {string} field  - Field name: 'name' | 'email' | 'subject' | 'message'
 * @param {string} value  - Raw input value
 * @returns {string}      - Error message string, or '' if valid
 */
export function validateField(field, value) {
  const trimmed = value.trim();

  switch (field) {
    case 'name':
      if (!trimmed) return 'Full name is required.';
      if (trimmed.length < 2) return 'Name must be at least 2 characters.';
      return '';

    case 'email':
      if (!trimmed) return 'Email address is required.';
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address.';
      return '';

    case 'subject':
      if (!trimmed) return 'Subject is required.';
      if (trimmed.length < 3) return 'Subject must be at least 3 characters.';
      return '';

    case 'message':
      if (!trimmed) return 'Message is required.';
      if (trimmed.length < 20) return `Message must be at least 20 characters (${trimmed.length}/20).`;
      return '';

    default:
      return '';
  }
}

/**
 * Validates all form fields at once.
 *
 * @param {{ name: string, email: string, subject: string, message: string }} formData
 * @returns {{ name: string, email: string, subject: string, message: string }}
 */
export function validateAll(formData) {
  return {
    name:    validateField('name',    formData.name),
    email:   validateField('email',   formData.email),
    subject: validateField('subject', formData.subject),
    message: validateField('message', formData.message),
  };
}

/**
 * Returns true if there are no errors.
 *
 * @param {{ name: string, email: string, subject: string, message: string }} errors
 * @returns {boolean}
 */
export function hasNoErrors(errors) {
  return Object.values(errors).every((msg) => msg === '');
}
