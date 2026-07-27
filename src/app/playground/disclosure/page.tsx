import Disclosure from './Disclosure';

export default function DisclosurePage() {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Disclosure (Accordion) Accessibility Playground
      </h1>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Test Instructions</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Click the button to expand/collapse content</li>
            <li>Press <kbd>Enter</kbd> to toggle disclosure</li>
            <li>Press <kbd>Space</kbd> to toggle disclosure</li>
            <li>Press <kbd>Tab</kbd> to focus the button</li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Component Demo</h2>
          <Disclosure />
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">ARIA Attributes</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><code>button</code> - Semantic button role</li>
            <li><code>aria-expanded</code> - Indicates if content is expanded (true/false)</li>
            <li><code>aria-controls</code> - Links button to content panel</li>
            <li><code>aria-hidden</code> - Hides decorative icon from screen readers</li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Keyboard Support</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><kbd>Enter</kbd> toggles disclosure expanded/collapsed</li>
            <li><kbd>Space</kbd> toggles disclosure expanded/collapsed</li>
            <li><kbd>Tab</kbd> moves focus to button</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
