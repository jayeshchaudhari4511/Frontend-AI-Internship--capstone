import Tabs from './Tabs';

export default function TabsPage() {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tabs Accessibility Playground</h1>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Test Instructions</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Click on any tab to select it</li>
            <li>Press <kbd>Arrow Left</kbd> to move to previous tab</li>
            <li>Press <kbd>Arrow Right</kbd> to move to next tab</li>
            <li>Press <kbd>Home</kbd> to go to first tab</li>
            <li>Press <kbd>End</kbd> to go to last tab</li>
            <li>Press <kbd>Tab</kbd> to move focus to tab list</li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Component Demo</h2>
          <Tabs />
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">ARIA Attributes</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><code>role=&ldquo;tablist&rdquo;</code> - Container for tab buttons</li>
            <li><code>role=&ldquo;tab&rdquo;</code> - Each tab button</li>
            <li><code>role=&ldquo;tabpanel&rdquo;</code> - Content panel for each tab</li>
            <li><code>aria-selected</code> - Indicates which tab is active</li>
            <li><code>aria-controls</code> - Links tab to its panel</li>
            <li><code>aria-labelledby</code> - Links panel to its tab</li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Keyboard Support</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><kbd>Arrow Left</kbd> moves to previous tab (wraps to last)</li>
            <li><kbd>Arrow Right</kbd> moves to next tab (wraps to first)</li>
            <li><kbd>Home</kbd> moves to first tab</li>
            <li><kbd>End</kbd> moves to last tab</li>
            <li><kbd>Tab</kbd> moves focus into tab list</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
