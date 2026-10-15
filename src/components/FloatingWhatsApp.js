'use client';

import React from 'react';
import { useGameWagon } from '@/context/GameWagonContext';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const { currentWhatsAppNumber, selectedCity } = useGameWagon();
  const defaultMsg = `Hi Game Wagon ${selectedCity.cityName}! I would like to enquire about renting a console setup.`;
  const link = `https://wa.me/${currentWhatsAppNumber}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <aside
      aria-label="Direct WhatsApp Booking"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 990,
      }}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          color: '#ffffff',
          boxShadow: '0 10px 25px -4px rgba(37, 211, 102, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 15px 30px -4px rgba(37, 211, 102, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px -4px rgba(37, 211, 102, 0.5)';
        }}
        aria-label="Chat on WhatsApp"
        title={`Chat with Game Wagon ${selectedCity.cityName} on WhatsApp`}
      >
        <MessageCircle size={28} />
      </a>
    </aside>
  );
}
