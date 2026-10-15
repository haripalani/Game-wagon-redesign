import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Game Wagon',
  description: 'Privacy policy and data protection practices for Game Wagon.',
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '840px', margin: '3rem auto 6rem auto', padding: '0 1.5rem' }}>
      <div className="glass-panel" style={{ padding: '3rem 2.5rem', borderRadius: '2rem', background: 'rgba(255, 255, 255, 0.92)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
          Privacy Policy
        </h1>
        <div style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p>
            At Game Wagon, we value your privacy and are committed to protecting your personal information. This Privacy Policy details how we collect, store, and process customer information across our platforms.
          </p>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>
            Information We Collect
          </h2>
          <p>
            We collect contact information (such as name, phone number, delivery address, and email) solely to process console reservations, verify identity, coordinate logistics, and deliver personalized support.
          </p>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>
            Data Security
          </h2>
          <p>
            Your information is stored securely and never sold or shared with unauthorized third-party advertisers. We employ standard encryption standards across all digital communication.
          </p>
        </div>
      </div>
    </div>
  );
}
