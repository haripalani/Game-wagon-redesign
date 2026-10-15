'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGameWagon } from '@/context/GameWagonContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MachinePicker() {
  const { setRentModalItem, selectedCity } = useGameWagon();

  const machines = [
    {
      id: 'ps5-console',
      name: 'PS5 Console',
      tag: 'MOST WANTED',
      price: 999,
      image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/c2e4d578-5ab9-47a5-891b-5a5c2ec9f103-PS5%20Console.png',
      bullets: [
        '4K @ 120fps gameplay',
        'DualSense haptic feedback',
        'Multiple controllers included',
        'Ultra-high speed 825GB SSD'
      ]
    },
    {
      id: 'nintendo-switch',
      name: 'Nintendo Switch',
      tag: 'PARTY PICK',
      price: 471,
      image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/1486ed1c-2147-4f19-9142-887f15a5d5f0-Nintendo%20Switch%20(2).png',
      bullets: [
        'Handheld + TV dock mode',
        '4 Joy-Cons for group fun',
        'Mario Kart & Smash ready',
        'Travel-ready protective case'
      ]
    },
    {
      id: 'ps4-console',
      name: 'PS4 Console',
      tag: 'BUDGET KING',
      price: 471,
      image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/44a0eaa8-2412-49c2-882c-aeccfb926485-PS4%20Console.png',
      bullets: [
        'Vast legendary Game Library',
        'DualShock 4 Controller',
        'HDR & Streaming Entertainment',
        'PlayStation VR Compatible'
      ]
    }
  ];

  return (
    <section style={{
      maxWidth: '1260px',
      margin: '4rem auto',
      padding: '0 1rem'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2.5rem'
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#0284c7'
          }}>
            Pick Your <span style={{ color: '#7928ca' }}>Machine</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.25rem' }}>
            High performance next-gen consoles, pre-loaded and disinfected for your setup in {selectedCity.cityName}.
          </p>
        </div>
        <Link
          href="/consoles"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#0284c7',
            fontWeight: 700,
            fontSize: '0.95rem'
          }}
        >
          <span>View all packages</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Grid of Machines */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.75rem'
      }}>
        {machines.map((m) => (
          <div
            key={m.id}
            className="glass-panel glass-panel-hover"
            style={{
              padding: '2rem 1.75rem',
              borderRadius: '2rem',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.88)',
              border: '1px solid rgba(15, 23, 42, 0.08)'
            }}
          >
            {/* Top Badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#475569',
                background: 'rgba(241, 245, 249, 0.9)',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                letterSpacing: '0.06em'
              }}>
                {m.tag}
              </span>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#d926a9'
              }}>
                ₹{m.price}<span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>/day</span>
              </div>
            </div>

            {/* Machine Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '220px',
              margin: '0.5rem 0 1.5rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Image
                src={m.image}
                alt={m.name}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                style={{ objectFit: 'contain' }}
              />
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '1rem'
            }}>
              {m.name}
            </h3>

            {/* Bullet Points */}
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              marginBottom: '2rem',
              flex: 1
            }}>
              {m.bullets.map((b, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontSize: '0.9rem',
                    color: '#334155'
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#0284c7',
                    flexShrink: 0
                  }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Rent Button */}
            <button
              onClick={() => setRentModalItem(m)}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                borderRadius: '1.25rem'
              }}
            >
              Rent Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
