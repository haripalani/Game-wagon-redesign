'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useGameWagon } from '@/context/GameWagonContext';
import { X, Check, Sparkles, Shield, Truck, Calendar } from 'lucide-react';

export default function RentModal() {
  const { rentModalItem, setRentModalItem, addToCart, selectedCity } = useGameWagon();
  const [days, setDays] = useState(3);

  if (!rentModalItem) return null;

  const pricePerDay = Number(
    rentModalItem.price ||
    rentModalItem.flatPrice ||
    rentModalItem.pricePerUnit ||
    499
  );

  const discountPercent = days >= 30 ? 0.63 : days >= 7 ? 0.40 : 0;
  const rawTotal = pricePerDay * days;
  const discountAmount = Math.round(rawTotal * discountPercent);
  const finalTotal = rawTotal - discountAmount;
  const effectivePerDay = Math.round(finalTotal / days);

  const handleConfirm = () => {
    addToCart(rentModalItem, days);
  };

  return (
    <div className="modal-overlay" onClick={() => setRentModalItem(null)}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '1.75rem',
          padding: '2rem',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setRentModalItem(null)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            padding: '0.4rem',
            borderRadius: '50%',
            background: 'rgba(241, 245, 249, 0.9)',
            color: '#64748b'
          }}
        >
          <X size={18} />
        </button>

        {/* Product Preview */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            position: 'relative',
            borderRadius: '1rem',
            background: '#fff',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <Image
              src={rentModalItem.image || rentModalItem.product?.productImg || '/images/homepage-kratos.png'}
              alt={rentModalItem.name || 'Console'}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#d926a9',
              letterSpacing: '0.05em'
            }}>
              {rentModalItem.tag || 'Instant Delivery'}
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0f172a' }}>
              {rentModalItem.name || rentModalItem.product?.productName}
            </h3>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Base rate: ₹{pricePerDay}/day in {selectedCity.cityName}
            </span>
          </div>
        </div>

        {/* Duration Selection */}
        <div style={{
          padding: '1.25rem',
          borderRadius: '1.25rem',
          background: 'rgba(248, 250, 252, 0.9)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1e293b' }}>
              Select Rental Days:
            </span>
            <span style={{
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#0284c7',
              background: '#fff',
              padding: '0.2rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid #cbd5e1'
            }}>
              {days} Days
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#0284c7', cursor: 'pointer' }}
          />

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem' }}>
            {[
              { label: '3 Days', val: 3 },
              { label: '7 Days (40% OFF)', val: 7, discount: '40%' },
              { label: '30 Days (63% OFF)', val: 30, discount: '63%' }
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => setDays(p.val)}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.25rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  background: days === p.val ? '#0284c7' : '#ffffff',
                  color: days === p.val ? '#ffffff' : '#334155',
                  border: '1px solid rgba(15, 23, 42, 0.1)',
                  transition: 'all 0.2s ease'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {discountPercent > 0 && (
            <div style={{
              marginTop: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#15803d',
              fontSize: '0.82rem',
              fontWeight: 600
            }}>
              <Sparkles size={15} />
              <span>
                Long-Rental applied: Save ₹{discountAmount} ({Math.round(discountPercent * 100)}% OFF)!
              </span>
            </div>
          )}
        </div>

        {/* Pricing Breakdown */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          padding: '0 0.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
            <span>Original Price ({days} × ₹{pricePerDay})</span>
            <span>₹{rawTotal}</span>
          </div>
          {discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803d', fontWeight: 600 }}>
              <span>Duration Discount</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
            <span>Effective Daily Rate</span>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>₹{effectivePerDay}/day</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1.15rem',
            fontWeight: 800,
            color: '#0f172a',
            paddingTop: '0.5rem',
            borderTop: '1px dashed #e2e8f0',
            marginTop: '0.25rem'
          }}>
            <span>Total Payable</span>
            <span style={{ color: '#d926a9' }}>₹{finalTotal}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleConfirm}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '0.85rem',
            fontSize: '1rem',
            borderRadius: '1rem'
          }}
        >
          Add to Cart & Select Slots
        </button>
      </div>
    </div>
  );
}
