import React from 'react';

export const metadata = {
  title: 'Terms of Service | Game Wagon',
  description: 'Terms and conditions for renting consoles and gaming gear with Game Wagon.',
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '840px', margin: '3rem auto 6rem auto', padding: '0 1.5rem' }}>
      <div className="glass-panel" style={{ padding: '3rem 2.5rem', borderRadius: '2rem', background: 'rgba(255, 255, 255, 0.92)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
          Terms of Service
        </h1>
        <div style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p>
            Welcome to Game Wagon. By accessing or using our website, services, and renting hardware (PlayStation 5, PlayStation 4, Nintendo Switch, controllers, and game discs/keys), you agree to be bound by the following terms and conditions.
          </p>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>
            1. Equipment Rental & Care
          </h2>
          <p>
            All gaming equipment provided is thoroughly sanitized, inspected, and tested prior to delivery. The customer is responsible for maintaining the condition of the equipment during the agreed rental period and ensuring appropriate electrical safeguards.
          </p>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>
            2. Zero Security Deposit Policy
          </h2>
          <p>
            Game Wagon operates on a transparent ₹0 security deposit model for verified users. Customers must provide valid identification upon delivery. Any intentional damage or loss will be subject to repair or replacement costs.
          </p>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>
            3. Delivery & Pickup
          </h2>
          <p>
            Doorstep delivery and pickup are provided within our active service hubs (Kochi, Trivandrum, Bangalore). The customer or an authorized representative must be present at the agreed delivery slot.
          </p>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>
            4. Extensions & Swaps
          </h2>
          <p>
            Rentals may be extended anytime subject to hardware availability. Long-rental discounts automatically apply as rental duration expands.
          </p>
        </div>
      </div>
    </div>
  );
}
