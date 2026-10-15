'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGameWagon } from '@/context/GameWagonContext';
import { X, Trash2, Plus, Minus, ShieldCheck, Truck, Sparkles, MessageSquare } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    rentalDays,
    setRentalDays,
    cartTotals,
    discountPercent,
    discountTierName,
    selectedCity,
    getWhatsAppBookingLink
  } = useGameWagon();

  if (!isCartOpen) return null;

  return (
    <div className="modal-overlay" style={{ justifyContent: 'flex-end', padding: 0 }} onClick={() => setIsCartOpen(false)}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100vh',
          background: 'rgba(255, 255, 255, 0.97)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.15)',
          borderRadius: '1.5rem 0 0 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.7)'
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0f172a' }}>
              Your Rental Cart
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600 }}>
              Delivering to {selectedCity.cityName}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              background: 'rgba(241, 245, 249, 0.9)',
              color: '#64748b'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748b' }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(241, 245, 249, 0.9)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                🎮
              </div>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1e293b' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.875rem', marginTop: '0.35rem' }}>
                Add consoles or game titles to begin your rental.
              </p>
              <Link
                href="/consoles"
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ marginTop: '1.5rem', display: 'inline-flex' }}
              >
                Browse Consoles
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Duration Selector */}
              <div style={{
                padding: '1rem',
                borderRadius: '1.25rem',
                background: 'linear-gradient(135deg, rgba(238, 242, 255, 0.8) 0%, rgba(253, 242, 248, 0.8) 100%)',
                border: '1px solid rgba(217, 38, 169, 0.15)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>
                    Rental Duration
                  </span>
                  <span style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: '#d926a9',
                    background: '#fff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }}>
                    {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#d926a9',
                    cursor: 'pointer'
                  }}
                />

                {/* Quick Presets */}
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem' }}>
                  {[
                    { label: '3 Days', days: 3 },
                    { label: '7 Days (-40%)', days: 7, hot: true },
                    { label: '30 Days (-63%)', days: 30, hot: true }
                  ].map((p) => (
                    <button
                      key={p.days}
                      onClick={() => setRentalDays(p.days)}
                      style={{
                        flex: 1,
                        padding: '0.4rem 0.2rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        borderRadius: '0.6rem',
                        background: rentalDays === p.days ? '#d926a9' : '#ffffff',
                        color: rentalDays === p.days ? '#ffffff' : '#334155',
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        transition: 'all 0.2s ease',
                        textAlign: 'center'
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {discountTierName && (
                  <div style={{
                    marginTop: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#15803d',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    <Sparkles size={14} />
                    <span>Unlocked {discountTierName}!</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Selected Items ({cart.length})
                </span>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem',
                      borderRadius: '1rem',
                      background: 'rgba(248, 250, 252, 0.9)',
                      border: '1px solid rgba(15, 23, 42, 0.06)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        position: 'relative',
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        background: '#fff',
                        flexShrink: 0
                      }}>
                        <Image
                          src={item.image || '/images/homepage-kratos.png'}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: '#0f172a',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          ₹{item.pricePerDay}/day
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: '#fff',
                        borderRadius: '999px',
                        padding: '0.2rem 0.4rem',
                        border: '1px solid #e2e8f0'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{ color: '#64748b', display: 'flex' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{ color: '#64748b', display: 'flex' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#ef4444', padding: '0.25rem', display: 'flex' }}
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantees */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem',
                borderRadius: '0.85rem',
                background: 'rgba(241, 245, 249, 0.7)',
                fontSize: '0.75rem',
                color: '#475569'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={16} color="#0284c7" />
                  <span>₹0 Deposit Required</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Truck size={16} color="#15803d" />
                  <span>Free Setup & Pickup</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid rgba(15, 23, 42, 0.08)',
            background: 'rgba(255, 255, 255, 0.95)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Rental Subtotal ({rentalDays} days)</span>
                <span>₹{cartTotals.rawTotal}</span>
              </div>
              {cartTotals.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803d', fontWeight: 600 }}>
                  <span>Duration Discount (-{cartTotals.discountPercent}%)</span>
                  <span>-₹{cartTotals.discountAmount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Security Deposit</span>
                <span style={{ color: '#15803d', fontWeight: 600 }}>₹0 (Free)</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#0f172a',
                paddingTop: '0.5rem',
                borderTop: '1px dashed #e2e8f0',
                marginTop: '0.25rem'
              }}>
                <span>Total Amount</span>
                <span style={{ color: '#d926a9' }}>₹{cartTotals.finalTotal}</span>
              </div>
            </div>

            {/* Direct Booking via WhatsApp */}
            <a
              href={getWhatsAppBookingLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                boxShadow: '0 8px 20px -4px rgba(34, 197, 94, 0.4)'
              }}
            >
              <MessageSquare size={18} />
              <span>Book via WhatsApp ({selectedCity.cityName})</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
