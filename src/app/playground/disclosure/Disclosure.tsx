'use client';

import { useState } from 'react';
import './disclosure.css';

interface DisclosureProps {
  title?: string;
  content?: string;
}

function Disclosure({
  title = 'More Information',
  content = 'This is the hidden content that appears when you click the button or press Enter/Space.',
}: DisclosureProps) {
  const [expanded, setExpanded] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };

  return (
    <div className="disclosure">
      <button
        onClick={() => setExpanded(!expanded)}
        onKeyDown={handleKeyDown}
        aria-expanded={expanded}
        aria-controls="disclosure-content"
        className="disclosure-button"
      >
        {title}
        <span className="disclosure-icon" aria-hidden="true">
          {expanded ? '▼' : '▶'}
        </span>
      </button>

      <div
        id="disclosure-content"
        hidden={!expanded}
        className="disclosure-content"
      >
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Disclosure;
