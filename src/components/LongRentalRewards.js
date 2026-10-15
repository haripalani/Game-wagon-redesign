'use client';

import React from 'react';
import { useGameWagon } from '@/context/GameWagonContext';
import { Sparkles, Zap, Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LongRentalRewards() {
  const { rentalDays, setRentalDays, setIsCartOpen } = useGameWagon();

  return (
    <section style={{
      maxWidth: '1260px',
      margin: '4rem auto',
      padding: '0 1rem',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#0284c7'
          }}>
            LONG-RENTAL REWARDS
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#0f172a',
            marginTop: '0.25rem'
          }}>
            Rent longer. <span className="gradient-text-purple">Save bigger.</span>
          </h2>
        </div>
        <p style={{
          color: '#64748b',
          fontSize: '1rem',
          maxWidth: '420px',
          lineHeight: 1.5
        }}>
          The more days you play, the less you pay. Discounts apply automatically at checkout.
        </p>
      </div>

      {/* Tier Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Week Grind Card */}
        <div
          className="glass-panel glass-panel-hover"
          onClick={() => setRentalDays(7)}
          style={{
            padding: '2rem',
            borderRadius: '1.75rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(243, 232, 255, 0.5) 100%)',
            border: rentalDays >= 7 && rentalDays < 30 ? '2px solid #8b5cf6' : '1px solid rgba(15, 23, 42, 0.08)',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(139, 92, 246, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8b5cf6'
              }}>
                <Zap size={20} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
                7 days
              </span>
            </div>
            <span style={{
              background: '#d926a9',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              boxShadow: '0 4px 12px rgba(217, 38, 169, 0.35)'
            }}>
              40% off
            </span>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0284c7', marginBottom: '0.5rem' }}>
            Week Grind
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Go a full 7+ days and save 40% off your rental. Perfect for completing campaigns and competitive seasons.
          </p>
        </div>

        {/* Month Marathon Card */}
        <div
          className="glass-panel glass-panel-hover"
          onClick={() => setRentalDays(30)}
          style={{
            padding: '2rem',
            borderRadius: '1.75rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(253, 242, 248, 0.6) 100%)',
            border: rentalDays >= 30 ? '2px solid #d926a9' : '1px solid rgba(15, 23, 42, 0.08)',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(217, 38, 169, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d926a9'
              }}>
                <Flame size={20} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
                30 days
              </span>
            </div>
            <span style={{
              background: '#d926a9',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              boxShadow: '0 4px 12px rgba(217, 38, 169, 0.35)'
            }}>
              63% off
            </span>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#d926a9', marginBottom: '0.5rem' }}>
            Month Marathon
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Rent 30 days or more and unlock our deepest saving of 63%. Own the rig for a full month at a fraction of retail.
          </p>
        </div>
      </div>
    </section>
  );
}
