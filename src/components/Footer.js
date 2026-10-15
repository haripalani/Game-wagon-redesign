'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGameWagon } from '@/context/GameWagonContext';
import { MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { catalog, selectedCity, selectCity } = useGameWagon();

  return (
    <footer style={{
      maxWidth: '1260px',
      margin: '4rem auto 2rem auto',
      padding: '0 1rem'
    }}>
      <div
        className="glass-panel"
        style={{
          padding: '3rem 2.5rem 2rem 2.5rem',
          borderRadius: '2rem',
          background: 'rgba(255, 255, 255, 0.85)',
          border: '1px solid rgba(15, 23, 42, 0.08)'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                position: 'relative',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(217, 38, 169, 0.3)',
                background: '#0f172a'
              }}>
                <Image
                  src="/images/gw-logo-1.png"
                  alt="Game Wagon Logo"
                  width={42}
                  height={42}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.35rem',
                letterSpacing: '0.04em',
                background: 'linear-gradient(135deg, #0f172a 0%, #7928ca 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                GAMEWAGON
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              India&apos;s console rental wagon. PS5, PS4 and Nintendo Switch delivered to your door with the titles you actually want.
            </p>
            <div>
              <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                We deliver in:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                {catalog.cities.map((c) => (
                  <button
                    key={c.cityId}
                    onClick={() => selectCity(c)}
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: selectedCity.cityId === c.cityId ? '#0284c7' : '#475569',
                      background: selectedCity.cityId === c.cityId ? 'rgba(2, 132, 199, 0.1)' : 'rgba(241, 245, 249, 0.8)',
                      border: selectedCity.cityId === c.cityId ? '1px solid rgba(2, 132, 199, 0.3)' : '1px solid rgba(15, 23, 42, 0.05)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      cursor: 'pointer'
                    }}
                  >
                    • {c.cityName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1rem'
            }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Rent Consoles', href: '/consoles' },
                { name: 'Game Titles', href: '/games' },
                { name: 'Contact Crew', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    style={{
                      color: '#64748b',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1rem'
            }}>
              Policy
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Refund and Cancellations Policy', href: '/refund-policy' },
                { name: 'Terms of Service', href: '/terms-of-service' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    style={{
                      color: '#64748b',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1rem'
            }}>
              Follow Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  color: '#475569',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(241, 245, 249, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0284c7">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span>Facebook</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  color: '#475569',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(241, 245, 249, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#d926a9">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span>Instagram</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  color: '#475569',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(241, 245, 249, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0284c7">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(15, 23, 42, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#94a3b8'
        }}>
          <div>
            Copyright © 2026 GAMEWAGON. Next.js High Performance Edition.
          </div>
          <div>
            Zero deposit console wagon in Kochi, Trivandrum & Bangalore.
          </div>
        </div>
      </div>
    </footer>
  );
}
