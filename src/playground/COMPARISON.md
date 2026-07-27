# Accessibility Playground - Component Comparison

This playground demonstrates accessible UI components built from scratch and compares them with production-ready implementations from shadcn/ui (powered by @base-ui/react).

## 1. Modal (Dialog)

### Custom Implementation

**File:** `src/app/playground/modal/Modal.tsx`

**Features Implemented:**
- ✅ Keyboard navigation (Tab cycles through buttons)
- ✅ Focus trap (keeps focus cycling inside modal)
- ✅ ESC key closes modal
- ✅ Overlay click closes modal
- ✅ ARIA attributes (`role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`)

**Code Pattern:**
```typescript
interface ModalProps {
  title?: string;
  description?: string;
}

function Modal({ title = 'Delete File', description = 'Are you sure?' }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle keyboard events and focus trap
  }, [isOpen]);
}
```

### Gaps vs shadcn

| Feature | Custom | shadcn |
|---------|--------|--------|
| Focus restoration | ❌ Buggy timing | ✅ Robust |
| Nested dialogs | ❌ No support | ✅ Supported |
| Animation states | ❌ Basic | ✅ `data-open`/`data-closed` |
| Scroll lock | ❌ Manual | ✅ Automatic |
| Portal rendering | ❌ Inline | ✅ Proper portal |
| Close button handling | ❌ Manual button | ✅ Built-in component |
| Type safety | ⚠️ Props only | ✅ Full component types |

**Gap Details:**
- **Focus Restoration Issue:** The cleanup function runs on unmount, not on modal close. By the time it executes, the trigger ref might be stale.
  ```typescript
  // ❌ Buggy - runs on unmount, not on close
  return () => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  };
  ```
  
- **shadcn Solution:** Uses `DialogPrimitive.Close` component that properly manages focus context.

---

## 2. Tabs

### Custom Implementation

**File:** `src/app/playground/tabs/Tabs.tsx`

**Features Implemented:**
- ✅ Arrow Left/Right navigation between tabs
- ✅ Tab wrapping (Left from first → goes to last)
- ✅ ARIA attributes (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`)
- ✅ Focus management on navigation

**Code Pattern:**
```typescript
interface Tab {
  id: string;
  label: string;
  panel: string;
}

function Tabs({ tabs: customTabs, panels: customPanels }: TabsProps = {}) {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowLeft':
        // Navigate to previous tab
      case 'ArrowRight':
        // Navigate to next tab
    }
  };
}
```

### Gaps vs shadcn

| Feature | Custom | shadcn |
|---------|--------|--------|
| Arrow Left/Right | ✅ Yes | ✅ Yes |
| Home key | ❌ No | ✅ Yes |
| End key | ❌ No | ✅ Yes |
| Roving tabindex | ❌ No | ✅ Yes |
| Focus management | ⚠️ Basic | ✅ Advanced |
| Orientation support | ❌ Horizontal only | ✅ Horizontal + Vertical |
| Keyboard logic | ⚠️ Manual | ✅ Automatic |
| Styling variants | ❌ No | ✅ CVA variants |

**Gap Details:**
- **Missing Home/End Keys:** Users can't jump to first/last tab.
  ```typescript
  // ❌ Missing in custom implementation
  case 'Home':
    e.preventDefault();
    newIndex = 0;
    break;
  case 'End':
    e.preventDefault();
    newIndex = tabs.length - 1;
    break;
  ```

- **Roving Tabindex:** All tabs receive focus. shadcn uses roving tabindex - only the active tab is in the tab order.
  - Custom: `Tab(0) → Tab(1) → Tab(2)` (Tab key cycles through all)
  - shadcn: `Tab(0) [active] → content` (Arrow keys switch tabs, Tab moves to content)

- **shadcn Solution:** Uses `TabsPrimitive.Tab` with built-in keyboard handling and roving tabindex.

---

## 3. Disclosure (Accordion)

### Custom Implementation

**File:** `src/app/playground/disclosure/Disclosure.tsx`

**Features Implemented:**
- ✅ Expand/collapse on click
- ✅ Enter key toggles state
- ✅ Space key toggles state
- ✅ `aria-expanded` attribute
- ✅ Smooth animations

**Code Pattern:**
```typescript
interface DisclosureProps {
  title?: string;
  content?: string;
}

function Disclosure({ title = 'More Information', content = '...' }: DisclosureProps) {
  const [expanded, setExpanded] = useState(false);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };
}
```

### Gaps vs shadcn

| Feature | Custom | shadcn |
|---------|--------|--------|
| aria-expanded | ✅ Yes | ✅ Yes |
| aria-controls | ❌ No | ✅ Yes |
| Button semantics | ✅ `<button>` | ✅ `<button>` |
| Animation support | ✅ Basic CSS | ✅ data-open states |
| Nested support | ❌ No | ✅ Yes |
| Type safety | ⚠️ Props only | ✅ Full types |

**Gap Details:**
- **Missing aria-controls:** The button doesn't explicitly link to the content panel.
  ```typescript
  // ⚠️ Has aria-expanded but missing aria-controls
  <button aria-expanded={expanded}>...</button>
  
  // ✅ Should also have:
  <button aria-expanded={expanded} aria-controls="disclosure-id">...</button>
  <div id="disclosure-id">...</div>
  ```

- **shadcn Solution:** Automatically generates proper IDs and links with aria-controls.

---

## Learning Outcomes

### What I Got Right
1. ✅ Core keyboard navigation logic
2. ✅ ARIA role attributes
3. ✅ State management with React hooks
4. ✅ Focus management concept
5. ✅ TypeScript interfaces for props

### What I Missed
1. ❌ **Modal:** Focus restoration timing, nested dialogs, portal rendering
2. ❌ **Tabs:** Home/End keys, roving tabindex pattern
3. ❌ **Disclosure:** aria-controls linking, animation states

### Production vs Learning

**Custom Components:**
- 📚 Great for learning how accessibility works
- 🎓 Shows keyboard event handling
- 🎓 Demonstrates focus management challenges

**shadcn/base-ui:**
- 🚀 Production-ready
- 🛡️ Tested with screen readers
- 🎨 Composed with sub-components
- 📦 Styling variants with CVA
- ♿ Handles edge cases

---

## Key Accessibility Patterns Learned

### 1. Focus Management is Hard
- Timing matters (cleanup vs close)
- Need to track previously focused element
- Restoration must happen synchronously

### 2. Keyboard Navigation Needs Completeness
- Don't just implement some keys (Arrow Left/Right)
- Include all standard keys (Home, End, Escape)
- Use roving tabindex to reduce tab stops

### 3. ARIA Attributes are Not Optional
- `aria-expanded` tells screen readers state
- `aria-controls` links button to content
- `aria-labelledby` / `aria-describedby` provide context

### 4. Test with Screen Readers
- VoiceOver (macOS)
- NVDA (Windows)
- JAWS (Windows)
- Axe DevTools browser extension

---

## References

- [@base-ui/react Documentation](https://base-ui.com/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN - ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)
- [MDN - ARIA: tab role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role)
