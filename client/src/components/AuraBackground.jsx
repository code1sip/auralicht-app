import React from 'react';

export default function AuraBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div className="aura-blob aura-blob-1"></div>
      <div className="aura-blob aura-blob-2"></div>
    </div>
  );
}
