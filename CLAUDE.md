# CLAUDE.md

## Project

Frontend Portfolio — a personal portfolio website showcasing projects and contact information.

## Tech Stack

- React
- Vite
- JavaScript
- HTML5
- CSS3
- Tailwind CSS

## Coding Conventions

- Use functional React components.
- Use semantic HTML.
- Follow responsive design principles (mobile-first).
- Write reusable, modular components.
- Keep components small and focused on a single responsibility.
- Use descriptive variable and function names.
- Format code consistently.
- Follow Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`).

## Project Rules (Learned from AI Workflow)

- **Always ask the AI to create an implementation plan before coding.**
  Explore the project structure first, then explain the plan, then implement.

- **Every form must include client-side validation and accessible labels.**
  - All fields must have `<label htmlFor>` paired with `id`.
  - Use `aria-invalid`, `aria-describedby`, and `role="alert"` on error messages.
  - Trim all values before validation.
  - Validate on blur, re-validate on change after a field is touched.

- **Ask the AI to review generated code before considering it complete.**
  The review must cover:
  - Accessibility (WCAG 2.1 AA)
  - Responsiveness (mobile, tablet, desktop)
  - Edge cases (whitespace-only input, rapid submits, network failure)
  - Potential improvements

- **Extract pure logic into utility files.**
  Validation functions, formatters, and helpers should live in `src/utils/`
  so they can be independently unit-tested.

- **Write or plan tests for every component.**
  Use Vitest + React Testing Library.
  At minimum, test: renders correctly, validation errors appear, submit works.

- **Disable submit buttons until the form is valid.**
  Never rely on the browser's native required attribute alone.

- **Use semantic HTML landmarks.**
  `<main>`, `<header>`, `<section aria-label>` on every page.

## AI Instructions

Act as my senior frontend mentor.

Before writing any code:
1. Explore the project structure.
2. Create a clear implementation plan.
3. Wait for (internal) plan approval, then implement.

After generating code:
1. Self-review for correctness and logic.
2. List potential edge cases.
3. Identify accessibility gaps.
4. Suggest improvements.
5. Provide a testing strategy.

Always explain your reasoning.
Recommend accessibility, performance, and UI/UX improvements proactively.