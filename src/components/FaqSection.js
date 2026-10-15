'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How do I rent a console?',
      answer: 'Simply select your console, choose your rental duration, and complete the booking. We deliver to your doorstep!'
    },
    {
      question: 'What is the minimum rental period?',
      answer: 'You can rent for as little as one day or as long as a month. Flexible options for every gamer.'
    },
    {
      question: 'Is there a security deposit?',
      answer: 'No hidden charges or security deposit. Transparent pricing always.'
    },
    {
      question: 'How are the consoles sanitized?',
      answer: 'Every console is thoroughly cleaned and sanitized after each use for your safety.'
    },
    {
      question: 'What if I face issues during my rental?',
      answer: 'Our support team is available 24/7 to help you with any problems or queries.'
    }
  ];

  return (
    <section style={{
      maxWidth: '1260px',
      margin: '4rem auto 5rem auto',
      padding: '0 1rem'
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
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#0284c7'
        }}>
          Got <span style={{ color: '#7928ca' }}>Questions?</span>
        </h2>
        <span style={{ color: '#64748b', fontSize: '1rem' }}>
          We&apos;ve got answers.
        </span>
      </div>

      {/* Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.85)',
                border: isOpen ? '1px solid rgba(2, 132, 199, 0.3)' : '1px solid rgba(15, 23, 42, 0.08)',
                transition: 'all 0.3s ease'
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <span style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: isOpen ? '#0284c7' : '#0f172a'
                }}>
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  color={isOpen ? '#0284c7' : '#64748b'}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0
                  }}
                />
              </button>

              {isOpen && (
                <div style={{
                  padding: '0 1.5rem 1.25rem 1.5rem',
                  color: '#475569',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  borderTop: '1px solid rgba(15, 23, 42, 0.04)'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
