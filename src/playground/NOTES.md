# Accessibility Comparison

## Modal

My implementation

- Supports keyboard navigation.
- Traps focus.
- Returns focus after closing.

shadcn

- Better focus trap implementation.
- Handles nested dialogs.
- Better animation handling.
- Better accessibility edge cases.

Gap

I forgot to restore focus when the modal closed.

--------------------------------

## Tabs

My implementation

- Arrow navigation.

shadcn

- Better roving tabindex.
- Better focus management.
- Cleaner keyboard logic.

Gap

I didn't implement Home and End keys.

--------------------------------

## Disclosure

My implementation

- Expand/collapse.

shadcn

- Better accessibility attributes.

Gap

I forgot aria-controls.
