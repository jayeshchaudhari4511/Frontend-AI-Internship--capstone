# Accessibility Playground Components

This folder contains learning implementations of accessible UI components.

## Components

### 1. Modal (`/playground/modal`)
- **Purpose:** Learn focus trapping and keyboard navigation in dialogs
- **Keyboard Support:**
  - `Tab` / `Shift+Tab` - Cycle through buttons
  - `ESC` - Close modal
  - Click outside - Close modal
- **ARIA:** `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`

### 2. Tabs (`/playground/tabs`)
- **Purpose:** Learn roving tabindex and arrow key navigation
- **Keyboard Support:**
  - `Arrow Left` / `Arrow Right` - Switch tabs (wraps)
  - `Home` / `End` - Jump to first/last tab
- **ARIA:** `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`

### 3. Disclosure (`/playground/disclosure`)
- **Purpose:** Learn expand/collapse with keyboard support
- **Keyboard Support:**
  - `Enter` / `Space` - Toggle disclosure
- **ARIA:** `aria-expanded`, `aria-controls`

## Notes on Implementation

These are **learning implementations**, not production-ready. For production, use shadcn/ui components (powered by @base-ui/react).

See `COMPARISON.md` for detailed gaps and learnings vs shadcn implementations.
