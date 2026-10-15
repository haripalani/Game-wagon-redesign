'use client';

import React from 'react';

export default function MarqueeTicker() {
  const items = [
    'Fast delivery & pickup',
    'Sanitised consoles',
    '200+ game titles',
    'Flexible rental dates',
    'No security deposit',
    'Same-day slots',
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1260px',
        margin: '2.5rem auto 3.5rem auto',
        padding: '0 1rem',
      }}
    >
      <div
        className="glass-pill"
        style={{
          padding: '0.85rem 1.5rem',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 8px 30px -10px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(15, 23, 42, 0.07)',
          background: 'rgba(255, 255, 255, 0.85)'
        }}
      >
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {[...items, ...items, ...items].map((text, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  color: '#334155',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#d926a9',
                    display: 'inline-block',
                    boxShadow: '0 0 10px rgba(217, 38, 169, 0.6)'
                  }}
                />
                <span>{text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
