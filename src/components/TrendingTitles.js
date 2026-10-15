'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGameWagon } from '@/context/GameWagonContext';
import { ArrowRight, Flame } from 'lucide-react';

export default function TrendingTitles() {
  const { catalog, addToCart } = useGameWagon();

  // Curate 4 top trending games from catalog
  const trending = [
    {
      id: 201,
      name: 'Grand Theft Auto V',
      category: 'PS5 Games',
      genre: 'Action-Adventure',
      price: 236,
      image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/single-product/d6c70033-5157-4136-ab65-d2a18d73c090-GTA%20V%20PS5.jpg'
    },
    {
      id: 202,
      name: 'FC 25 | Standard Edition',
      category: 'PS5 Games',
      genre: 'Sports',
      price: 236,
      image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/single-product/235d8aee-3d0a-4e6f-abf0-c94273bfbb7e-FC%2025.jpg'
    },
    {
      id: 203,
      name: 'God of War Ragnarök (PS5)',
      category: 'PS5 Games',
      genre: 'Action-Adventure',
      price: 236,
      image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/single-product/gow.jpg'
    },
    {
      id: 204,
      name: 'FC 26',
      category: 'PS5 Games',
      genre: 'Sports',
      price: 236,
      image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/single-product/ecc0d3dc-b4a7-4af9-b91e-7e25e665d8f7-WhatsApp%20Image%202026-06-03%20at%204.30.37%20PM.jpeg'
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
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#d926a9', fontWeight: 700, fontSize: '0.85rem' }}>
            <Flame size={18} />
            <span>COMMUNITY PICKS</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#0284c7'
          }}>
            Trending <span style={{ color: '#7928ca' }}>Titles</span>
          </h2>
        </div>
        <Link
          href="/games"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#0284c7',
            fontWeight: 700,
            fontSize: '0.95rem'
          }}
        >
          <span>View all games</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Grid of Games */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1.5rem'
      }}>
        {trending.map((game) => (
          <div
            key={game.id}
            className="glass-panel glass-panel-hover"
            style={{
              padding: '1.25rem',
              borderRadius: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(15, 23, 42, 0.08)'
            }}
          >
            {/* Box Art Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '320px',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              marginBottom: '1rem',
              boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
              background: '#0f172a'
            }}>
              <Image
                src={game.image}
                alt={game.name}
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                style={{ objectFit: 'cover' }}
              />
              {/* Category / Genre badge */}
              <span style={{
                position: 'absolute',
                top: '0.75rem',
                left: '0.75rem',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#0284c7',
                fontSize: '0.7rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                backdropFilter: 'blur(8px)',
                letterSpacing: '0.04em'
              }}>
                {game.genre}
              </span>
            </div>

            {/* Title & Details */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#0f172a',
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {game.name}
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '0.75rem' }}>
                {game.category}
              </p>
            </div>

            {/* Price & Action */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(15, 23, 42, 0.06)'
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: '#d926a9'
                }}>
                  ₹{game.price}<span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>/day</span>
                </div>
              </div>

              <button
                onClick={() => addToCart(game)}
                className="btn-primary"
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.875rem',
                  borderRadius: '999px'
                }}
              >
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
