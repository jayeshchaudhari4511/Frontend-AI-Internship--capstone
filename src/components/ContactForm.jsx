import { useState, useCallback } from 'react';
import { validateField, validateAll, hasNoErrors } from '../utils/validate';

const INITIAL_FORM    = { name: '', email: '', subject: '', message: '' };
const INITIAL_ERRORS  = { name: '', email: '', subject: '', message: '' };
const INITIAL_TOUCHED = { name: false, email: false, subject: false, message: false };

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens (dark theme)
// ─────────────────────────────────────────────────────────────────────────────
const token = {
  label:       '#94a3b8',
  placeholder: '#475569',
  inputText:   '#e2e8f0',
  inputBg:     'rgba(255,255,255,0.05)',
  border:      'rgba(255,255,255,0.10)',
  borderFocus: '#6366f1',
  borderError: '#f87171',
  borderOk:    '#34d399',
  ringFocus:   'rgba(99,102,241,0.30)',
  ringError:   'rgba(248,113,113,0.25)',
  ringOk:      'rgba(52,211,153,0.20)',
  errorText:   '#fca5a5',
  successText: '#6ee7b7',
  muted:       '#475569',
};

// ─────────────────────────────────────────────────────────────────────────────
// FieldError
// ─────────────────────────────────────────────────────────────────────────────
function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      style={{ color: token.errorText }}
      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium"
    >
      <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      </svg>
      {message}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared input / textarea styling
// ─────────────────────────────────────────────────────────────────────────────
function getFieldStyle(hasError, isTouched) {
  if (hasError && isTouched) {
    return {
      background:  token.inputBg,
      border:      `1.5px solid ${token.borderError}`,
      boxShadow:   `0 0 0 3px ${token.ringError}`,
      color:       token.inputText,
      outline:     'none',
    };
  }
  if (isTouched && !hasError) {
    return {
      background:  token.inputBg,
      border:      `1.5px solid ${token.borderOk}`,
      boxShadow:   `0 0 0 3px ${token.ringOk}`,
      color:       token.inputText,
      outline:     'none',
    };
  }
  return {
    background: token.inputBg,
    border:     `1.5px solid ${token.border}`,
    color:      token.inputText,
    outline:    'none',
  };
}

const sharedInputClass =
  'w-full rounded-xl px-4 py-3 text-sm transition-all duration-150 placeholder:text-slate-600 disabled:opacity-50';

// Focus style applied via onFocus/onBlur events (CSS-in-JS friendly)
function useFocusRing() {
  const [focused, setFocused] = useState(false);
  return {
    focused,
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
    focusStyle: focused
      ? { boxShadow: `0 0 0 3px ${token.ringFocus}`, borderColor: token.borderFocus }
      : {},
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Field wrapper (label + input/textarea + error)
// ─────────────────────────────────────────────────────────────────────────────
function Field({ label, id, error, isTouched, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: token.label }}
      >
        {label}{' '}
        <span aria-hidden="true" style={{ color: '#f87171' }}>*</span>
      </label>
      {children}
      <FieldError id={`error-${id}`} message={isTouched ? error : ''} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Success screen
// ─────────────────────────────────────────────────────────────────────────────
function SuccessMessage({ onReset }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-5 py-12 text-center"
    >
      {/* Animated check circle */}
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background:  'rgba(52,211,153,0.12)',
          border:      '1px solid rgba(52,211,153,0.30)',
          boxShadow:   '0 0 32px rgba(52,211,153,0.15)',
        }}
      >
        <svg
          aria-hidden="true"
          className="h-9 w-9"
          style={{ color: '#34d399' }}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>

      <div>
        <h2
          className="text-2xl font-bold mb-1"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(135deg, #f1f5f9, #6ee7b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Message Sent! 🎉
        </h2>
        <p className="text-sm" style={{ color: token.label }}>
          I'll get back to you within 24 hours.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background:   'rgba(99,102,241,0.12)',
          border:       '1px solid rgba(99,102,241,0.30)',
          color:        '#a5b4fc',
        }}
      >
        Send another message
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ContactForm
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors,   setErrors]   = useState(INITIAL_ERRORS);
  const [touched,  setTouched]  = useState(INITIAL_TOUCHED);
  const [status,   setStatus]   = useState('idle');

  const liveErrors  = validateAll(formData);
  const isFormValid = hasNoErrors(liveErrors) &&
    Object.values(formData).every((v) => v.trim() !== '');
  const isSubmitting = status === 'submitting';

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }, [touched]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    const allErrors  = validateAll(formData);
    setTouched(allTouched);
    setErrors(allErrors);
    if (!hasNoErrors(allErrors)) return;
    setStatus('submitting');
    try {
      await (onSubmit ? onSubmit({ ...formData }) : new Promise((r) => setTimeout(r, 1500)));
      setStatus('success');
      setFormData(INITIAL_FORM);
      setErrors(INITIAL_ERRORS);
      setTouched(INITIAL_TOUCHED);
    } catch {
      setStatus('idle');
    }
  };

  if (status === 'success') return <SuccessMessage onReset={() => setStatus('idle')} />;

  // ── Fields config ──────────────────────────────────────────────────────────
  const fields = [
    { id: 'contact-name',    name: 'name',    label: 'Full Name',      type: 'text',  autoComplete: 'name',    placeholder: 'Jane Doe' },
    { id: 'contact-email',   name: 'email',   label: 'Email Address',  type: 'email', autoComplete: 'email',   placeholder: 'jane@example.com' },
    { id: 'contact-subject', name: 'subject', label: 'Subject',        type: 'text',  autoComplete: 'off',     placeholder: 'Project / Collaboration / Hello' },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-5">

      {/* ── Text inputs ─────────────────────────────────────────────────── */}
      {fields.map(({ id, name, label, type, autoComplete, placeholder }) => (
        <StyledInput
          key={id}
          id={id}
          name={name}
          label={label}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={formData[name]}
          error={errors[name]}
          isTouched={touched[name]}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ))}

      {/* ── Message textarea ─────────────────────────────────────────────── */}
      <Field
        label="Message"
        id="contact-message"
        error={errors.message}
        isTouched={touched.message}
      >
        <TextareaWithFocus
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about your project, idea, or just say hi…"
          value={formData.message}
          error={errors.message}
          isTouched={touched.message}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* Character counter */}
        <p
          className="mt-1 text-right text-xs tabular-nums"
          style={{ color: formData.message.trim().length >= 20 ? token.successText : token.muted }}
          aria-live="polite"
          aria-label={`${formData.message.trim().length} of minimum 20 characters`}
        >
          {formData.message.trim().length} / 20 min
        </p>
      </Field>

      {/* ── Submit button ─────────────────────────────────────────────────── */}
      <button
        id="contact-submit"
        type="submit"
        disabled={!isFormValid || isSubmitting}
        aria-busy={isSubmitting}
        aria-disabled={!isFormValid || isSubmitting}
        className="relative mt-2 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200"
        style={
          isFormValid && !isSubmitting
            ? {
                background:  'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow:   '0 4px 24px rgba(99,102,241,0.45)',
                cursor:      'pointer',
              }
            : {
                background:  'rgba(99,102,241,0.25)',
                color:       'rgba(255,255,255,0.45)',
                cursor:      'not-allowed',
              }
        }
        onMouseEnter={(e) => {
          if (isFormValid && !isSubmitting) {
            e.currentTarget.style.boxShadow = '0 6px 32px rgba(99,102,241,0.65)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isFormValid && !isSubmitting
            ? '0 4px 24px rgba(99,102,241,0.45)'
            : 'none';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {isSubmitting ? (
          <>
            <svg aria-hidden="true" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send Message
            <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </>
        )}
      </button>

      <p className="text-center text-xs" style={{ color: token.muted }}>
        Fields marked <span aria-label="required" style={{ color: '#f87171' }}>*</span> are required.
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styled input sub-component (uses focus ring hook)
// ─────────────────────────────────────────────────────────────────────────────
function StyledInput({ id, name, label, type, autoComplete, placeholder, value, error, isTouched, isSubmitting, onChange, onBlur }) {
  const { focused, onFocus, onBlur: focusBlur, focusStyle } = useFocusRing();

  const baseStyle = getFieldStyle(error, isTouched);
  const style = focused && !error && !isTouched
    ? { ...baseStyle, ...focusStyle }
    : focused
    ? { ...baseStyle, boxShadow: baseStyle.boxShadow || `0 0 0 3px ${token.ringFocus}` }
    : baseStyle;

  return (
    <Field label={label} id={id} error={error} isTouched={isTouched}>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={(e) => { focusBlur(); onBlur(e); }}
        onFocus={onFocus}
        aria-required="true"
        aria-invalid={isTouched && !!error}
        aria-describedby={error && isTouched ? `error-${id}` : undefined}
        disabled={isSubmitting}
        className={sharedInputClass}
        style={style}
      />
    </Field>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styled textarea sub-component
// ─────────────────────────────────────────────────────────────────────────────
function TextareaWithFocus({ id, name, rows, placeholder, value, error, isTouched, isSubmitting, onChange, onBlur }) {
  const { focused, onFocus, onBlur: focusBlur, focusStyle } = useFocusRing();

  const baseStyle = getFieldStyle(error, isTouched);
  const style = focused && !isTouched
    ? { ...baseStyle, ...focusStyle }
    : focused
    ? { ...baseStyle, boxShadow: baseStyle.boxShadow || `0 0 0 3px ${token.ringFocus}` }
    : baseStyle;

  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      required
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={(e) => { focusBlur(); onBlur(e); }}
      onFocus={onFocus}
      aria-required="true"
      aria-invalid={isTouched && !!error}
      aria-describedby={error && isTouched ? `error-${id}` : undefined}
      disabled={isSubmitting}
      className={`${sharedInputClass} resize-y`}
      style={style}
    />
  );
}

export default ContactForm;
