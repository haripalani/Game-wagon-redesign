import React from 'react';

export const metadata = {
  title: 'Refund & Cancellation Policy | Game Wagon',
  description: 'Refund and cancellation guidelines for Game Wagon rentals.',
};

export default function RefundPage() {
  return (
    <div style={{ maxWidth: '840px', margin: '3rem auto 6rem auto', padding: '0 1.5rem' }}>
      <div className="glass-panel" style={{ padding: '3rem 2.5rem', borderRadius: '2rem', background: 'rgba(255, 255, 255, 0.92)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
          Refund & Cancellation Policy
        </h1>
        <div style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p>
            We strive to provide maximum flexibility for our community. Below are our refund and cancellation policies:
          </p>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>
            Cancellations Prior to Dispatch
          </h2>
          <p>
            You may cancel or reschedule your reservation free of charge up to 4 hours before the scheduled delivery time slot.
          </p>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>
            Technical Support & Equipment Swaps
          </h2>
          <p>
            In the rare event of a hardware glitch, faulty disc, or controller issue, our technicians provide same-day on-site troubleshooting or a replacement console rig within hours. If an issue cannot be resolved, a prorated refund is immediately issued.
          </p>
        </div>
      </div>
    </div>
  );
}
