'use client';

import React from 'react';
import { CalendarCheck, Truck, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <CalendarCheck size={28} color="#0284c7" />,
      title: 'Pick your dates',
      desc: 'Choose delivery and pickup dates at checkout. Extend anytime.'
    },
    {
      icon: <Truck size={28} color="#d926a9" />,
      title: 'Free doorstep delivery',
      desc: 'Setup-ready consoles delivered fast, with same-day slots available.'
    },
    {
      icon: <ShieldCheck size={28} color="#16a34a" />,
      title: 'No security deposit',
      desc: 'Transparent pricing with zero hidden charges, ever.'
    }
  ];

  return (
    <section style={{
      maxWidth: '1260px',
      margin: '4rem auto',
      padding: '0 1rem'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover"
            style={{
              padding: '2rem 1.75rem',
              borderRadius: '1.75rem',
              background: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '1.25rem',
              background: 'rgba(241, 245, 249, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
            }}>
              {step.icon}
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '0.4rem'
              }}>
                {step.title}
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '0.95rem',
                lineHeight: 1.5
              }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
