'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGameWagon } from '@/context/GameWagonContext';
import { MessageCircle, Mail, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { selectedCity } = useGameWagon();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '1260px', margin: '2rem auto 5rem auto', padding: '0 1rem' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          color: '#0f172a',
          lineHeight: 1.15
        }}>
          Talk to the <span className="gradient-text-purple">crew</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.15rem', marginTop: '0.65rem', lineHeight: 1.6 }}>
          Need help, want to rent, or have a question? Our team of gamers is here to help you out.
        </p>
      </div>

      {/* 3 Contact Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.75rem',
        marginBottom: '4rem'
      }}>
        {/* Card 1: WhatsApp */}
        <div
          className="glass-panel glass-panel-hover"
          style={{
            padding: '2.25rem 2rem',
            borderRadius: '1.75rem',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(15, 23, 42, 0.08)'
          }}
        >
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#0284c7',
            marginBottom: '0.85rem'
          }}>
            WHATSAPP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.85rem' }}>
            <a
              href="https://wa.me/917356356516"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#0f172a',
                transition: 'color 0.2s'
              }}
            >
              Kochi — 917356356516
            </a>
            <a
              href="https://wa.me/919740125004"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#0f172a',
                transition: 'color 0.2s'
              }}
            >
              Bangalore — 919740125004
            </a>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Fastest — bookings & extensions
          </p>
        </div>

        {/* Card 2: Email */}
        <div
          className="glass-panel glass-panel-hover"
          style={{
            padding: '2.25rem 2rem',
            borderRadius: '1.75rem',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(15, 23, 42, 0.08)'
          }}
        >
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#0284c7',
            marginBottom: '0.85rem'
          }}>
            EMAIL
          </div>
          <a
            href="mailto:support@gamewagon.in"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#0f172a',
              display: 'block',
              marginBottom: '0.85rem'
            }}
          >
            support@gamewagon.in
          </a>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Invoices, events and partnerships
          </p>
        </div>

        {/* Card 3: Hours */}
        <div
          className="glass-panel glass-panel-hover"
          style={{
            padding: '2.25rem 2rem',
            borderRadius: '1.75rem',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(15, 23, 42, 0.08)'
          }}
        >
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#0284c7',
            marginBottom: '0.85rem'
          }}>
            HOURS
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#0f172a',
            marginBottom: '0.85rem'
          }}>
            10 AM – 11 PM IST
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            All 7 days, response usually under a few minutes
          </p>
        </div>
      </div>

      {/* Interactive Form for Inquiries */}
      <div
        className="glass-panel"
        style={{
          maxWidth: '720px',
          margin: '0 auto 4rem auto',
          padding: '2.5rem',
          borderRadius: '2rem',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '1px solid rgba(15, 23, 42, 0.08)'
        }}
      >
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.65rem',
          fontWeight: 700,
          color: '#0f172a',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          Send a Message
        </h3>
        <p style={{ color: '#64748b', textAlign: 'center', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Planning a party, tournament, or have custom rental dates? Drop us a line.
        </p>

        {submitted ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            background: 'rgba(34, 197, 94, 0.08)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}>
            <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontWeight: 700, fontSize: '1.35rem', color: '#16a34a', marginBottom: '0.5rem' }}>
              Message Received!
            </h4>
            <p style={{ color: '#334155' }}>
              Our {selectedCity.cityName} team will respond back via WhatsApp/Email shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Menon"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.85rem',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  WhatsApp / Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.85rem',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.85rem',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Your Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us what console, games, or setup you need..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.85rem',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: '0.85rem',
                fontSize: '1rem',
                borderRadius: '0.85rem',
                marginTop: '0.5rem'
              }}
            >
              <Send size={18} />
              <span>Send Message to {selectedCity.cityName} Team</span>
            </button>
          </form>
        )}
      </div>

      {/* Bottom CTA Banner */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '1.25rem'
        }}>
          Ready to level up <span style={{ color: '#7928ca' }}>your night</span>?
        </h2>
        <Link href="/consoles" className="btn-primary" style={{ padding: '0.85rem 2.25rem', fontSize: '1.05rem' }}>
          Rent Now
        </Link>
      </div>
    </div>
  );
}
