'use client';

import { useState } from 'react';
import './disclosure.css';

function Disclosure() {
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
        More Information
        <span className="disclosure-icon" aria-hidden="true">
          {expanded ? '▼' : '▶'}
        </span>
      </button>

      <div
        id="disclosure-content"
        hidden={!expanded}
        className="disclosure-content"
      >
        <p>
          This is the hidden content that appears when you click the button or
          press Enter/Space.
        </p>
      </div>
    </div>
  );
}

export default Disclosure;
