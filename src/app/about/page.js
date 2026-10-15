'use client';

import React from 'react';
import Link from 'next/link';
import { useGameWagon } from '@/context/GameWagonContext';
import { Gamepad2, ShieldCheck, Truck, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { catalog } = useGameWagon();

  const stats = [
    { value: `${catalog.cities.length}`, label: 'Cities covered' },
    { value: '200+', label: 'Game titles' },
    { value: '50k+', label: 'Happy sessions' },
    { value: '₹ 0/-', label: 'No Deposits' },
  ];

  const values = [
    {
      icon: <Gamepad2 size={28} color="#0284c7" />,
      title: 'Built for gamers',
      desc: "We started Game Wagon because every gamer deserves a next-gen setup without dropping a month's salary on hardware."
    },
    {
      icon: <ShieldCheck size={28} color="#16a34a" />,
      title: 'Sanitised & safe',
      desc: 'Every console and controller is deep-cleaned, tested and packed securely before it rolls out to you.'
    },
    {
      icon: <Truck size={28} color="#d926a9" />,
      title: 'Free delivery & pickup',
      desc: "We handle the logistics. Pick your slot and we bring the rig to your door — and collect it when you're done."
    },
    {
      icon: <HeartHandshake size={28} color="#8b5cf6" />,
      title: 'Passionate support',
      desc: "Got a question at 9 PM? We're gamers too. Reach out for quick help, extensions or recommendations."
    }
  ];

  return (
    <div style={{ maxWidth: '1260px', margin: '2rem auto 5rem auto', padding: '0 1rem' }}>
      {/* Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
        marginBottom: '4rem'
      }}>
        <div>
          <div
            className="glass-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.825rem',
              fontWeight: 700,
              color: '#0284c7',
              background: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <Sparkles size={15} color="#0284c7" />
            <span>ABOUT GAME WAGON</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.75rem, 5.5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#0f172a',
            marginBottom: '1.25rem'
          }}>
            India&apos;s gaming <span className="gradient-text-purple">wagon</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: '#475569',
            marginBottom: '2rem'
          }}>
            Game Wagon is India&apos;s go-to console rental service. We bring PlayStation 5, PlayStation 4 and Nintendo Switch setups to your doorstep, loaded with the hottest titles, so you can play without the price tag of ownership.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/consoles" className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              <span>Start Renting</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-secondary" style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
              <span>Talk to Us</span>
            </Link>
          </div>
        </div>

        {/* Right Graphic Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '3rem 2rem',
            borderRadius: '2.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(238, 242, 255, 0.7) 100%)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.07)'
          }}
        >
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(217, 38, 169, 0.15) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284c7',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 25px rgba(2, 132, 199, 0.2)'
          }}>
            <Gamepad2 size={60} />
          </div>
          <p style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#1e293b',
            lineHeight: 1.5,
            maxWidth: '380px'
          }}>
            From casual weekends to competitive tournaments, we roll with you.
          </p>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '5rem'
      }}>
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '2rem 1.5rem',
              borderRadius: '1.75rem',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '2.5rem',
              color: '#0284c7',
              marginBottom: '0.25rem'
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 600 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Why We Roll (Values) */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#0284c7'
          }}>
            Why we <span style={{ color: '#7928ca' }}>roll</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.35rem' }}>
            Built by passionate gamers, dedicated to frictionless, affordable next-gen gaming.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.75rem'
        }}>
          {values.map((v, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '2.25rem 1.75rem',
                borderRadius: '1.75rem',
                background: 'rgba(255, 255, 255, 0.88)',
                border: '1px solid rgba(15, 23, 42, 0.08)'
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
                marginBottom: '1.25rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
              }}>
                {v.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '0.5rem'
              }}>
                {v.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
