# WORKFLOW.md — AI Workflow Comparison

## Overview

This document compares two approaches to AI-assisted frontend development,
both applied to the same task: building a responsive Contact Form for a portfolio website.

---

## The Task

> **Build a responsive Contact Form component for a portfolio website.**

Fields: Full Name, Email, Subject, Message.

---

## Approach 1 — Vague AI Prompt (`feature/vague-ai`)

### The Prompt

> "Create a responsive contact form for my portfolio website."

### What Happened

The AI produced a working contact form immediately, without any upfront planning.
It made its own assumptions about:

- Which fields to include
- What validation rules to apply
- How to handle accessibility
- What the design should look like

### What Was Good

- Fast — code appeared in one shot
- Visually polished (dark theme, animations)
- Covered the basic requirements

### What Was Missing or Inconsistent

| Area | Issue |
|------|-------|
| Validation | Message minimum was 10 chars — the requirement was never stated, so the AI guessed |
| Accessibility | `aria-live` on errors was missing initially |
| Code quality | Validation logic was inline inside the component — hard to unit-test |
| Edge cases | Whitespace-only inputs were not explicitly handled |
| Testing | No tests were produced or planned |
| Explainability | No reasoning was given for design decisions |

### Prompt Used

```
Create a responsive contact form for my portfolio website.
```

---

## Approach 2 — Specification-Driven AI Prompt (`feature/spec-driven-ai`)

### The Prompt

A detailed specification covering:

- Fields (explicitly named)
- Validation rules (per field, with exact minimums)
- UX behaviour (inline errors, disabled submit, loading state, success message, form reset)
- Accessibility requirements (labels, aria attributes, keyboard nav, focus styles)
- Responsive design (mobile-first, max-width ~600px, Tailwind only)
- Code quality (reusable, clean state, readable)
- Verification workflow (self-review, edge cases, a11y audit, improvements, tests)

### What Happened

The AI followed a structured workflow:

1. **Explored** the project structure before writing any code
2. **Explained** the implementation plan (state design, validation strategy, a11y checklist)
3. **Implemented** the component after the plan was complete
4. **Self-reviewed** the code after generation
5. **Listed edge cases** (whitespace, paste, rapid submit, network failure)
6. **Ran an a11y audit** against WCAG 2.1 AA criteria
7. **Suggested improvements** (maxLength, debounce, toast on failure)
8. **Provided test recipes** (Vitest + RTL unit + integration tests)

### What Was Better

| Area | Improvement |
|------|-------------|
| Validation | Exact rules specified and implemented correctly (20 char message min) |
| Architecture | Validation extracted to `src/utils/validate.js` — pure, testable functions |
| Accessibility | Full WCAG 2.1 AA audit included in the output |
| Edge cases | Explicitly listed and handled (whitespace trim, rapid submit, etc.) |
| Testing | Complete test suite recipes provided with Vitest + RTL |
| Transparency | AI explained every design decision |

### Prompt Used

See full prompt in the commit history of `feature/spec-driven-ai`.
It included: fields, validation rules, UX behaviour, accessibility requirements,
responsive design constraints, code quality rules, and a verification workflow.

---

## Side-by-Side Comparison

| Dimension | Vague Prompt | Spec-Driven Prompt |
|-----------|-------------|---------------------|
| **Speed** | ⚡ Fast | 🐢 Slower (planning phase) |
| **Planning** | ❌ None | ✅ Explicit plan before code |
| **Validation accuracy** | ⚠️ Guessed rules | ✅ Exact rules implemented |
| **Code architecture** | ⚠️ Logic inline | ✅ Logic in `utils/validate.js` |
| **Accessibility** | ⚠️ Partial | ✅ Full WCAG 2.1 AA audit |
| **Edge cases** | ❌ Not addressed | ✅ Explicitly listed & handled |
| **Testing** | ❌ None | ✅ Full test strategy provided |
| **Explainability** | ❌ No reasoning | ✅ Every decision explained |
| **Reusability** | ⚠️ Component-specific | ✅ `onSubmit` prop, pure utils |
| **Design quality** | ✅ Polished | ✅ Polished (improved further) |

---

## Lessons Learned

### 1. Vague prompts produce fast but brittle code
The AI fills specification gaps with assumptions. Those assumptions may not match
your real requirements, and you won't know until something breaks.

### 2. A plan step pays for itself
Asking the AI to plan before coding takes a few extra exchanges, but produces
better-architected code that requires fewer fixes later.

### 3. Specify validation rules explicitly
"validate the form" is ambiguous. "Email must match RFC format; message must be
at least 20 trimmed characters" leaves no room for guessing.

### 4. Ask for verification as part of the prompt
If you don't ask for an edge-case review, you won't get one. Including
"after implementation, review your code and list edge cases" is free quality assurance.

### 5. Pure utility functions are a sign of good AI output
If validation logic lives inside the component, it's tightly coupled and hard to test.
A good AI response extracts it into a separate, importable module.

---

## Recommended AI Workflow (Going Forward)

```
1. Explore the project structure
2. Create an implementation plan
3. Review the plan internally
4. Implement the code
5. Self-review: edge cases, a11y, improvements
6. Provide a testing strategy
```

This workflow should be included in every AI prompt for non-trivial components.


