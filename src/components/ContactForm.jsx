import { useState } from 'react';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const FIELD_CONFIG = [
  {
    id: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Jane Doe',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    validate: (v) => (v.trim().length < 2 ? 'Name must be at least 2 characters.' : ''),
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'jane@example.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    validate: (v) => {
      if (!v.trim()) return 'Email is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email.';
      return '';
    },
  },
  {
    id: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'Collaboration / Inquiry / Feedback',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    validate: (v) => (v.trim().length < 3 ? 'Subject must be at least 3 characters.' : ''),
  },
];

function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const validateField = (id, value) => {
    const field = FIELD_CONFIG.find((f) => f.id === id);
    if (field) return field.validate(value);
    if (id === 'message') {
      return value.trim().length < 10 ? 'Message must be at least 10 characters.' : '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (touched[id]) {
      setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }));
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
    setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const allTouched = { name: true, email: true, subject: true, message: true };
    const allErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      subject: validateField('subject', form.subject),
      message: validateField('message', form.message),
    };

    setTouched(allTouched);
    setErrors(allErrors);

    if (Object.values(allErrors).some(Boolean)) return;

    setStatus('loading');
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1800));
    setStatus('success');
    setForm(INITIAL_FORM);
    setTouched({});
    setErrors({});
  };

  const handleReset = () => {
    setStatus('idle');
  };

  const inputBase =
    'w-full bg-transparent text-slate-200 placeholder-slate-500 outline-none text-sm leading-relaxed py-3 pr-4 transition-all duration-200';

  const wrapperBase = (id) =>
    `flex items-center gap-3 border rounded-xl px-4 transition-all duration-200 ${
      errors[id] && touched[id]
        ? 'border-red-400/60 bg-red-500/5'
        : touched[id] && !errors[id]
        ? 'border-emerald-400/60 bg-emerald-500/5'
        : 'border-purple-500/20 bg-white/[0.03] hover:border-purple-500/40 focus-within:border-purple-400/70 focus-within:bg-white/[0.05]'
    }`;

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-slate-100 mb-2">Message Sent! 🎉</h3>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">
            Thanks for reaching out. I'll get back to you within 24 hours.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="mt-2 px-6 py-2.5 rounded-xl text-sm font-medium text-purple-300 border border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-5">
      {/* Text fields */}
      {FIELD_CONFIG.map(({ id, label, type, placeholder, icon }) => (
        <div key={id} className="flex flex-col gap-1.5">
          <label htmlFor={id} className="text-xs font-medium text-slate-400 uppercase tracking-wider pl-1">
            {label}
          </label>
          <div className={wrapperBase(id)}>
            <span className="text-purple-400/70 flex-shrink-0">{icon}</span>
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              value={form[id]}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete={id === 'email' ? 'email' : id === 'name' ? 'name' : 'off'}
              aria-invalid={!!errors[id]}
              aria-describedby={errors[id] ? `${id}-error` : undefined}
              className={inputBase}
            />
            {touched[id] && !errors[id] && (
              <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            )}
          </div>
          {errors[id] && touched[id] && (
            <p id={`${id}-error`} role="alert" className="text-xs text-red-400 pl-1 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              {errors[id]}
            </p>
          )}
        </div>
      ))}

      {/* Message textarea */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium text-slate-400 uppercase tracking-wider pl-1">
          Message
        </label>
        <div className={`${wrapperBase('message')} items-start pt-1`}>
          <span className="text-purple-400/70 mt-3 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </span>
          <textarea
            id="message"
            placeholder="Tell me about your project, idea, or just say hi..."
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${inputBase} resize-none`}
          />
        </div>
        {errors.message && touched.message && (
          <p id="message-error" role="alert" className="text-xs text-red-400 pl-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
            {errors.message}
          </p>
        )}
        <p className="text-xs text-slate-600 pl-1 text-right">{form.message.length} / 1000</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        id="contact-submit-btn"
        className="relative mt-2 flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
          boxShadow: '0 4px 24px rgba(124, 58, 237, 0.35)',
        }}
      >
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #4338ca 100%)' }}
        />
        <span className="relative flex items-center gap-2">
          {status === 'loading' ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send Message
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </>
          )}
        </span>
      </button>
    </form>
  );
}

export default ContactForm;
