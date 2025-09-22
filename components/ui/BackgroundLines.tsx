import React from 'react';

export default function BackgroundLines() {
  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 w-full"
      style={{
        height: 220,
        zIndex: 0,
        pointerEvents: 'none',
        background: `repeating-linear-gradient(
          to right,
          transparent,
          transparent 80px,
          rgba(0,0,0,0.035) 80px,
          rgba(0,0,0,0.035) 82px
        )`,
      }}
    />
  );
} 