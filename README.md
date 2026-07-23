# Frontend Portfolio Foundation (Next.js 15)

Production-ready scaffold for a professional frontend portfolio using:

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS

## Folder Architecture

```txt
src/
  app/
    about/
    case-studies/
    contact/
    health/
    projects/
    error.tsx
    layout.tsx
    loading.tsx
    not-found.tsx
    page.tsx
  components/
    layout/
    ui/
  constants/
  hooks/
  lib/
  styles/
  types/
```

## Routes

- `/`
- `/about`
- `/projects`
- `/case-studies`
- `/contact`
- `/health`

All primary routes are scaffolded with responsive placeholders. The `/health` route performs a server-side API check.

## Run Locally

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
```