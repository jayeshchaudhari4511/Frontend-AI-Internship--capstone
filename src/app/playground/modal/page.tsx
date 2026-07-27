import Modal from './Modal';

export default function ModalPage() {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Modal Accessibility Playground</h1>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Test Instructions</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Click "Open Modal" to open the modal</li>
            <li>Press <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> to cycle through buttons</li>
            <li>Press <kbd>ESC</kbd> to close the modal</li>
            <li>Click outside the modal to close it</li>
            <li>After closing, focus returns to the "Open Modal" button</li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Component Demo</h2>
          <Modal />
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">ARIA Features</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><code>role="dialog"</code> - Identifies the element as a dialog</li>
            <li><code>aria-modal="true"</code> - Indicates this is a modal dialog</li>
            <li><code>aria-labelledby="dialog-title"</code> - Links to the dialog title</li>
            <li><code>aria-describedby="dialog-description"</code> - Links to the description</li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Keyboard Features</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><kbd>Tab</kbd> cycles forward through focusable elements</li>
            <li><kbd>Shift+Tab</kbd> cycles backward through focusable elements</li>
            <li><kbd>ESC</kbd> closes the modal</li>
            <li>Focus traps within modal when open</li>
            <li>Focus returns to trigger button when closed</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
