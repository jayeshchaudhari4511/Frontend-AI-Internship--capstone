'use client';

import { useState } from 'react';
import './tabs.css';

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'tab-1', label: 'Overview', panel: 'panel-1' },
    { id: 'tab-2', label: 'Details', panel: 'panel-2' },
    { id: 'tab-3', label: 'Settings', panel: 'panel-3' },
  ];

  const panels = [
    { id: 'panel-1', content: 'This is the overview content.' },
    { id: 'panel-2', content: 'This is the details content.' },
    { id: 'panel-3', content: 'This is the settings content.' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = index === 0 ? tabs.length - 1 : index - 1;
        break;
      case 'ArrowRight':
        e.preventDefault();
        newIndex = index === tabs.length - 1 ? 0 : index + 1;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    setActiveTab(newIndex);
    // Focus the new tab
    setTimeout(() => {
      const tabElement = document.getElementById(tabs[newIndex].id);
      if (tabElement) {
        tabElement.focus();
      }
    }, 0);
  };

  return (
    <div>
      {/* Tab List */}
      <div role="tablist" className="tabs-list">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={tab.id}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={tab.panel}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`tab ${activeTab === index ? 'tab--active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="tab-panels">
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            id={panel.id}
            role="tabpanel"
            aria-labelledby={tabs[index].id}
            hidden={activeTab !== index}
            className="tab-panel"
          >
            <p>{panel.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
