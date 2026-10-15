'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useGameWagon } from '@/context/GameWagonContext';
import { Search, Flame, Gamepad2, Plus } from 'lucide-react';

export default function GamesPage() {
  const { catalog, addToCart, selectedCity } = useGameWagon();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const genres = [
    'All',
    'Action-Adventure',
    'Co-op Adventure',
    'Fighting',
    'Horror',
    'Racing',
    'RPG',
    'Shooter',
    'Sports'
  ];

  // Filter games
  const filteredGames = useMemo(() => {
    let list = catalog.games || [];

    if (selectedGenre !== 'All') {
      list = list.filter((g) => {
        const genre = g.product?.genre || '';
        const name = g.product?.productName || '';
        // If genre isn't explicitly set in API, match by keywords
        if (genre.toLowerCase() === selectedGenre.toLowerCase()) return true;
        if (selectedGenre === 'Racing' && (name.includes('Dirt') || name.includes('NFS') || name.includes('Speed') || name.includes('Screamer') || name.includes('F1'))) return true;
        if (selectedGenre === 'Sports' && (name.includes('FC') || name.includes('WWE') || name.includes('Cricket') || name.includes('NBA') || name.includes('FIFA'))) return true;
        if (selectedGenre === 'Horror' && (name.includes('Resident') || name.includes('Silent') || name.includes('Dead'))) return true;
        if (selectedGenre === 'Action-Adventure' && (name.includes('GTA') || name.includes('God of War') || name.includes('007') || name.includes('Spider') || name.includes('Uncharted'))) return true;
        if (selectedGenre === 'Shooter' && (name.includes('Battlefield') || name.includes('Call of Duty') || name.includes('Duty') || name.includes('Warfare'))) return true;
        return false;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((g) => {
        const name = g.product?.productName?.toLowerCase() || '';
        const desc = g.product?.productDescription?.toLowerCase() || '';
        return name.includes(q) || desc.includes(q);
      });
    }

    return list;
  }, [catalog.games, selectedGenre, searchQuery]);

  return (
    <div style={{ maxWidth: '1260px', margin: '1rem auto 5rem auto', padding: '0 1rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
          fontWeight: 800,
          color: '#0284c7',
          lineHeight: 1.15
        }}>
          Stack up <span style={{ color: '#7928ca' }}>game titles</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.4rem', maxWidth: '640px' }}>
          Add discs and digital keys to any console rental in {selectedCity.cityName}. Swap a title mid-rental for free, once.
        </p>
      </div>

      {/* Controls: Search + Genre pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1.25rem',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          maxWidth: '480px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
        }}>
          <Search size={18} color="#0284c7" />
          <input
            type="text"
            placeholder="Search game titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '0.95rem',
              color: '#0f172a',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Genre Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '0.65rem',
          flexWrap: 'wrap'
        }}>
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  background: isSelected ? '#d926a9' : 'rgba(255, 255, 255, 0.85)',
                  color: isSelected ? '#ffffff' : '#475569',
                  border: isSelected ? '1px solid #d926a9' : '1px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: isSelected ? '0 6px 16px rgba(217, 38, 169, 0.3)' : '0 2px 6px rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      {/* Games Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1.75rem'
      }}>
        {filteredGames.map((item) => {
          const game = item.product || {};
          const price = item.pricePerUnit || 236;
          const image = game.productImg || '/images/homepage-kratos.png';

          return (
            <div
              key={item.productInventoryId}
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
              {/* Box Art */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '320px',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                marginBottom: '1rem',
                background: '#0f172a',
                boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)'
              }}>
                <Image
                  src={image}
                  alt={game.productName || 'Game Title'}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  style={{ objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.92)',
                  color: '#0284c7',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.04em'
                }}>
                  {game.genre || selectedGenre !== 'All' ? selectedGenre : 'ACTION'}
                </span>
              </div>

              {/* Title & Category */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: '#0f172a',
                  lineHeight: 1.3,
                  marginBottom: '0.25rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {game.productName}
                </h3>
                <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  {game.category?.categoryName || 'PS5 Game'}
                </p>
              </div>

              {/* Price & Add to Cart */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(15, 23, 42, 0.06)'
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: '#d926a9'
                }}>
                  ₹{price}<span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>/day</span>
                </div>

                <button
                  onClick={() => addToCart({
                    id: item.productInventoryId,
                    name: game.productName,
                    price,
                    image,
                    kind: 'game'
                  })}
                  className="btn-primary"
                  style={{
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.875rem',
                    borderRadius: '999px'
                  }}
                >
                  <Plus size={16} />
                  <span>Rent</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
