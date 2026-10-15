'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useGameWagon } from '@/context/GameWagonContext';
import { Sparkles, Gamepad, ArrowUpDown } from 'lucide-react';

export default function ConsolesPage() {
  const { catalog, selectedCity, setRentModalItem } = useGameWagon();
  const [selectedCategoryId, setSelectedCategoryId] = useState(1); // PS5 Console default
  const [sortOrder, setSortOrder] = useState('low-to-high');

  // Categories from catalog
  const categories = catalog.consoleCategories || [
    { categoryId: 1, categoryName: 'PS5 Console', categoryImg: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/c2e4d578-5ab9-47a5-891b-5a5c2ec9f103-PS5 Console.png' },
    { categoryId: 4, categoryName: 'Nintendo Switch', categoryImg: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/1486ed1c-2147-4f19-9142-887f15a5d5f0-Nintendo Switch (2).png' },
    { categoryId: 7, categoryName: 'PS4 Console', categoryImg: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/44a0eaa8-2412-49c2-882c-aeccfb926485-PS4 Console.png' },
    { categoryId: 6, categoryName: 'PS5 Controllers' },
    { categoryId: 12, categoryName: 'PS4 Controllers' },
    { categoryId: 13, categoryName: 'Nintendo Switch Controllers' },
    { categoryId: 14, categoryName: 'VR Devices' },
  ];

  // Get packages for current city and filter by category
  const cityPackages = catalog.packagesByCity[selectedCity.cityId] || catalog.packagesByCity[1] || [];

  const filteredItems = useMemo(() => {
    let items = cityPackages.filter((p) => p.categoryId === selectedCategoryId);

    // If city packages for this category are empty, provide fallback packages
    if (items.length === 0) {
      if (selectedCategoryId === 1) {
        items = [
          {
            packageId: 101,
            name: 'PlayStation 5 Standard (PS5)',
            categoryId: 1,
            flatPrice: 999,
            tag: 'POPULAR',
            image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/c2e4d578-5ab9-47a5-891b-5a5c2ec9f103-PS5%20Console.png',
            description: '1 DualSense Controller + 825GB SSD + High Speed HDMI + Power cords'
          },
          {
            packageId: 102,
            name: 'PS5 Duo Controller Bundle + God of War',
            categoryId: 1,
            flatPrice: 1235,
            tag: 'BESTSELLER',
            image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/c2e4d578-5ab9-47a5-891b-5a5c2ec9f103-PS5%20Console.png',
            description: '2 DualSense Controllers + God of War Ragnarök pre-installed'
          }
        ];
      } else if (selectedCategoryId === 4) {
        items = [
          {
            packageId: 103,
            name: 'Nintendo Switch Party Rig (4 Joy-Cons)',
            categoryId: 4,
            flatPrice: 471,
            tag: 'PARTY PICK',
            image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/1486ed1c-2147-4f19-9142-887f15a5d5f0-Nintendo%20Switch%20(2).png',
            description: 'Switch Console, TV Dock, 4 Joy-Cons + Mario Kart 8 Deluxe'
          }
        ];
      } else if (selectedCategoryId === 7) {
        items = [
          {
            packageId: 104,
            name: 'PlayStation 4 Slim 1TB Edition',
            categoryId: 7,
            flatPrice: 471,
            tag: 'BUDGET KING',
            image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/44a0eaa8-2412-49c2-882c-aeccfb926485-PS4%20Console.png',
            description: 'PS4 Slim 1TB + 2 DualShock 4 Wireless Controllers'
          }
        ];
      } else {
        items = [
          {
            packageId: 105,
            name: `${categories.find(c => c.categoryId === selectedCategoryId)?.categoryName || 'Accessory'} Pack`,
            categoryId: selectedCategoryId,
            flatPrice: 199,
            tag: 'ADDON',
            image: 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/c2e4d578-5ab9-47a5-891b-5a5c2ec9f103-PS5%20Console.png',
            description: 'Sanitised and fully tested original controller'
          }
        ];
      }
    }

    // Sort items
    return [...items].sort((a, b) => {
      const pA = Number(a.flatPrice || a.price || 0);
      const pB = Number(b.flatPrice || b.price || 0);
      return sortOrder === 'low-to-high' ? pA - pB : pB - pA;
    });
  }, [cityPackages, selectedCategoryId, sortOrder, categories]);

  return (
    <div style={{ maxWidth: '1260px', margin: '1rem auto 4rem auto', padding: '0 1rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
          fontWeight: 800,
          color: '#0284c7',
          lineHeight: 1.15
        }}>
          Rent Your <span style={{ color: '#7928ca' }}>Console</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.4rem' }}>
          Pick a console, choose your dates, and start playing in {selectedCity.cityName}. No deposit, no hidden charges.
        </p>
      </div>

      {/* Horizontal Category Selector Pills */}
      <div style={{
        display: 'flex',
        gap: '0.85rem',
        overflowX: 'auto',
        paddingBottom: '1rem',
        marginBottom: '2rem',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.categoryId;
          return (
            <button
              key={cat.categoryId}
              onClick={() => setSelectedCategoryId(cat.categoryId)}
              className="glass-panel"
              style={{
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 1.25rem',
                minWidth: '135px',
                borderRadius: '1.25rem',
                background: isSelected ? 'rgba(217, 38, 169, 0.08)' : 'rgba(255, 255, 255, 0.8)',
                border: isSelected ? '2px solid #d926a9' : '1px solid rgba(15, 23, 42, 0.08)',
                boxShadow: isSelected ? '0 10px 25px -5px rgba(217, 38, 169, 0.25)' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                position: 'relative',
                marginBottom: '0.5rem'
              }}>
                <Image
                  src={cat.categoryImg || 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/c2e4d578-5ab9-47a5-891b-5a5c2ec9f103-PS5%20Console.png'}
                  alt={cat.categoryName}
                  fill
                  sizes="60px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span style={{
                fontSize: '0.825rem',
                fontWeight: 700,
                color: isSelected ? '#d926a9' : '#334155',
                textAlign: 'center'
              }}>
                {cat.categoryName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sort Control */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '0.65rem',
        marginBottom: '1.75rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.45rem 1rem',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(15, 23, 42, 0.1)',
          fontSize: '0.875rem'
        }}>
          <ArrowUpDown size={15} color="#64748b" />
          <span style={{ color: '#64748b' }}>Sort:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#0f172a',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Packages Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.75rem'
      }}>
        {filteredItems.map((pkg) => {
          const price = Number(pkg.flatPrice || pkg.price || 499);
          return (
            <div
              key={pkg.packageId}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '2rem 1.75rem',
                borderRadius: '2rem',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(15, 23, 42, 0.08)'
              }}
            >
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#0284c7',
                  background: 'rgba(2, 132, 199, 0.1)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  letterSpacing: '0.05em'
                }}>
                  {pkg.tag || 'POPULAR'}
                </span>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.35rem',
                  color: '#d926a9'
                }}>
                  ₹{price}<span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>/day</span>
                </div>
              </div>

              {/* Package Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                margin: '0.5rem 0 1.25rem 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image
                  src={pkg.image || 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/c2e4d578-5ab9-47a5-891b-5a5c2ec9f103-PS5%20Console.png'}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              {/* Package Name */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '0.65rem'
              }}>
                {pkg.name}
              </h3>

              {/* Description / Inclusions */}
              <p style={{
                color: '#64748b',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                marginBottom: '1.5rem',
                flex: 1
              }}>
                {pkg.description || 'Complete setup ready to plug and play with all cables and accessories included.'}
              </p>

              {/* Rent Action */}
              <button
                onClick={() => setRentModalItem({
                  ...pkg,
                  price,
                  kind: 'package'
                })}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  borderRadius: '1.25rem'
                }}
              >
                Rent Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
