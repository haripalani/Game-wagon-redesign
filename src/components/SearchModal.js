'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGameWagon } from '@/context/GameWagonContext';
import { Search, X, Gamepad2, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const router = useRouter();
  const { catalog, isSearchOpen, setIsSearchOpen, openRentModal, addToCart } = useGameWagon();
  const [query, setQuery] = useState('');

  // Handle Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Search results
  const filteredResults = useMemo(() => {
    if (!query || query.trim().length < 2) return { games: [], packages: [] };
    const q = query.toLowerCase().trim();

    const games = (catalog.games || []).filter((g) => {
      const name = g.product?.productName?.toLowerCase() || '';
      const genre = g.product?.genre?.toLowerCase() || '';
      return name.includes(q) || genre.includes(q);
    }).slice(0, 8);

    // search packages from current city
    const packages = Object.values(catalog.packagesByCity || {})
      .flat()
      .filter((p, idx, arr) => arr.findIndex(item => item?.packageId === p?.packageId) === idx)
      .filter((p) => {
        const name = p?.name?.toLowerCase() || '';
        const desc = p?.description?.toLowerCase() || '';
        return name.includes(q) || desc.includes(q);
      }).slice(0, 4);

    return { games, packages };
  }, [query, catalog]);

  if (!isSearchOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          background: 'rgba(255, 255, 255, 0.96)',
          borderRadius: '1.75rem',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)'
        }}>
          <Search size={22} color="#0284c7" />
          <input
            type="text"
            placeholder="Search games, consoles, PS5, Mario Kart, GTA..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '1.15rem',
              fontWeight: 500,
              color: '#0f172a',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: '#94a3b8', padding: '0.2rem' }}
            >
              <X size={18} />
            </button>
          )}
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#64748b',
            background: 'rgba(241, 245, 249, 0.9)',
            padding: '0.2rem 0.5rem',
            borderRadius: '6px',
            border: '1px solid rgba(15, 23, 42, 0.08)'
          }}>
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div style={{
          overflowY: 'auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {query.trim().length < 2 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748b' }}>
              <Gamepad2 size={40} color="#cbd5e1" style={{ marginBottom: '0.75rem' }} />
              <p style={{ fontWeight: 600, fontSize: '1rem', color: '#334155' }}>
                Quick search over 200+ titles & next-gen rigs
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Try searching for &quot;FC 25&quot;, &quot;PS5&quot;, &quot;God of War&quot;, or &quot;Nintendo&quot;
              </p>
            </div>
          ) : filteredResults.games.length === 0 && filteredResults.packages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
              <p style={{ fontSize: '1.05rem', fontWeight: 600 }}>No results found for &quot;{query}&quot;</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.4rem' }}>
                Check spelling or explore our catalog categories.
              </p>
            </div>
          ) : (
            <>
              {/* Packages / Consoles Section */}
              {filteredResults.packages.length > 0 && (
                <div>
                  <h4 style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#0284c7',
                    marginBottom: '0.75rem'
                  }}>
                    Console Packages
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredResults.packages.map((pkg) => (
                      <div
                        key={pkg.packageId}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          borderRadius: '1rem',
                          background: 'rgba(248, 250, 252, 0.8)',
                          border: '1px solid rgba(15, 23, 42, 0.06)',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setIsSearchOpen(false);
                          router.push('/consoles');
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <div style={{
                            width: '44px',
                            height: '44px',
                            position: 'relative',
                            borderRadius: '0.5rem',
                            overflow: 'hidden',
                            background: '#fff'
                          }}>
                            <Image
                              src={pkg.image || '/images/homepage-kratos.png'}
                              alt={pkg.name}
                              fill
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a' }}>
                              {pkg.name}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                              ₹{pkg.flatPrice}/day • Setup included
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsSearchOpen(false);
                            addToCart({
                              id: pkg.packageId,
                              name: pkg.name,
                              price: pkg.flatPrice,
                              image: pkg.image,
                              kind: 'package'
                            });
                          }}
                          className="btn-primary"
                          style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                        >
                          Rent Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Games Section */}
              {filteredResults.games.length > 0 && (
                <div>
                  <h4 style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#d926a9',
                    marginBottom: '0.75rem'
                  }}>
                    Game Titles ({filteredResults.games.length})
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.65rem' }}>
                    {filteredResults.games.map((g) => (
                      <div
                        key={g.productInventoryId}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.65rem',
                          borderRadius: '0.85rem',
                          background: 'rgba(248, 250, 252, 0.8)',
                          border: '1px solid rgba(15, 23, 42, 0.06)',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setIsSearchOpen(false);
                          addToCart({
                            id: g.productInventoryId,
                            name: g.product?.productName,
                            category: g.product?.category?.categoryName,
                            price: g.pricePerUnit,
                            image: g.product?.productImg,
                            kind: 'game'
                          });
                        }}
                      >
                        <div style={{
                          width: '42px',
                          height: '52px',
                          position: 'relative',
                          borderRadius: '0.35rem',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}>
                          <Image
                            src={g.product?.productImg || '/images/homepage-kratos.png'}
                            alt={g.product?.productName || 'Game'}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontWeight: 600,
                            fontSize: '0.88rem',
                            color: '#0f172a',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {g.product?.productName}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            ₹{g.pricePerUnit}/day • {g.product?.category?.categoryName || 'PS5 Game'}
                          </div>
                        </div>
                        <span style={{
                          color: '#d926a9',
                          fontSize: '0.78rem',
                          fontWeight: 600
                        }}>
                          + Add
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
