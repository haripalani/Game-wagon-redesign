'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useGameWagon } from '@/context/GameWagonContext';
import { MapPin, Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    selectedCity,
    setIsCityModalOpen,
    setIsSearchOpen,
    cartTotals,
    setIsCartOpen
  } = useGameWagon();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    if (pathname !== '/') {
      setScrolled(true);
      return;
    }
    const checkScroll = () => {
      setScrolled(window.scrollY > 480);
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rent Consoles', href: '/consoles' },
    { name: 'Game Titles', href: '/games' },
    { name: 'Contact', href: '/contact' },
    { name: 'About us', href: '/about' },
  ];

  if (pathname === '/' && !scrolled) {
    return null;
  }

  return (
    <header style={{
      position: 'sticky',
      top: '1rem',
      zIndex: 1000,
      width: '100%',
      padding: '0 1rem',
      maxWidth: '1260px',
      margin: '0 auto 1.5rem auto',
      animation: pathname === '/' ? 'fadeInDown 0.35s ease' : 'none'
    }}>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.25rem',
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          borderRadius: '9999px',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        }}
      >
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            position: 'relative',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(217, 38, 169, 0.3)',
            background: '#0f172a'
          }}>
            <Image
              src="/images/gw-logo-1.png"
              alt="Game Wagon Logo"
              width={40}
              height={40}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '0.04em',
            background: 'linear-gradient(135deg, #0f172a 0%, #7928ca 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'none',
          }} className="brand-title">
            GAMEWAGON
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  fontSize: '0.925rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0284c7' : '#334155',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                  padding: '0.25rem 0'
                }}
              >
                {link.name}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '2.5px',
                    background: '#0284c7',
                    borderRadius: '999px'
                  }} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* City Selector Pill */}
          <button
            onClick={() => setIsCityModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(241, 245, 249, 0.85)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#1e293b',
              transition: 'all 0.2s ease'
            }}
            title="Change City"
          >
            <MapPin size={15} color="#0284c7" />
            <span>{selectedCity.cityName}</span>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(241, 245, 249, 0.85)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#475569',
              transition: 'all 0.2s ease'
            }}
            title="Search Games & Consoles"
          >
            <Search size={15} />
            <span className="search-text">Search</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              background: cartTotals.totalItems > 0 ? 'rgba(217, 38, 169, 0.1)' : 'rgba(241, 245, 249, 0.85)',
              border: cartTotals.totalItems > 0 ? '1px solid rgba(217, 38, 169, 0.3)' : '1px solid rgba(15, 23, 42, 0.08)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: cartTotals.totalItems > 0 ? '#d926a9' : '#1e293b',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            title="View Cart"
          >
            <ShoppingBag size={16} />
            <span className="cart-text">Cart</span>
            {cartTotals.totalItems > 0 && (
              <span style={{
                background: '#d926a9',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.1rem 0.45rem',
                borderRadius: '999px',
                minWidth: '18px',
                textAlign: 'center'
              }}>
                {cartTotals.totalItems}
              </span>
            )}
          </button>

          {/* Quick Login / Support Link */}
          <Link
            href="/contact"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(241, 245, 249, 0.85)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#334155',
            }}
            className="login-btn"
          >
            <User size={15} />
            <span>Login</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              padding: '0.45rem',
              borderRadius: '999px',
              background: 'rgba(241, 245, 249, 0.85)',
              color: '#1e293b'
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: '0.5rem',
          padding: '1.25rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: pathname === link.href ? 700 : 500,
                color: pathname === link.href ? '#0284c7' : '#1e293b',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.75rem',
                background: pathname === link.href ? 'rgba(2, 132, 199, 0.08)' : 'transparent'
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .search-text, .cart-text, .login-btn {
            display: none !important;
          }
        }
        @media (min-width: 640px) {
          .brand-title {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
