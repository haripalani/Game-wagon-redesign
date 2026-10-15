'use client';

import React from 'react';
import Image from 'next/image';
import { useGameWagon } from '@/context/GameWagonContext';
import { X, Check, MapPin } from 'lucide-react';

export default function CityModal() {
  const { catalog, selectedCity, selectCity, isCityModalOpen, setIsCityModalOpen } = useGameWagon();

  if (!isCityModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsCityModalOpen(false)}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem',
          borderRadius: '1.75rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsCityModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            padding: '0.4rem',
            borderRadius: '50%',
            background: 'rgba(241, 245, 249, 0.9)',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(2, 132, 199, 0.1)',
            color: '#0284c7',
            marginBottom: '0.75rem'
          }}>
            <MapPin size={24} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>
            Choose Your City
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Select your city to view available console setups, instant 1-hour delivery, and local game inventory.
          </p>
        </div>

        {/* City Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {catalog.cities.map((city) => {
            const isSelected = selectedCity.cityId === city.cityId;
            return (
              <button
                key={city.cityId}
                onClick={() => selectCity(city)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '1.25rem',
                  background: isSelected ? 'rgba(2, 132, 199, 0.08)' : 'rgba(248, 250, 252, 0.9)',
                  border: isSelected ? '2px solid #0284c7' : '1px solid rgba(15, 23, 42, 0.08)',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {city.iconPath ? (
                      <Image
                        src={city.iconPath}
                        alt={city.cityName}
                        width={28}
                        height={28}
                        style={{ objectFit: 'contain' }}
                      />
                    ) : (
                      <MapPin size={20} color="#0284c7" />
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1e293b' }}>
                      {city.cityName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {city.state} • Doorstep Delivery Available
                    </div>
                  </div>
                </div>

                {isSelected ? (
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    <Check size={14} />
                  </div>
                ) : (
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #cbd5e1'
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
