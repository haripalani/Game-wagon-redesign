'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGameWagon } from '@/context/GameWagonContext';
import catalogData from '@/data/catalog.json';
import { 
  MapPin, 
  Search, 
  ShoppingBag, 
  ChevronDown, 
  Sparkles, 
  Gamepad2, 
  Zap, 
  ShieldCheck, 
  Menu, 
  X, 
  CheckCircle2,
  Tv,
  ArrowRight
} from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const { 
    selectedCity, 
    selectCity, 
    setIsCityModalOpen, 
    cartTotals, 
    setIsCartOpen,
    openRentModal,
    addToCart,
    setRentalDays
  } = useGameWagon();

  // Category chips above the main headline (matching House / Apartment / Residencial in reference)
  const categoryChips = [
    { id: 'ps5', label: 'PS5 4K Console', selectValue: 'ps5-standard' },
    { id: 'switch', label: 'Nintendo Switch', selectValue: 'switch-oled' },
    { id: 'ps4', label: 'PS4 Pro Edition', selectValue: 'ps4-slim' },
    { id: 'vr', label: 'VR Battle Rig', selectValue: 'vr-devices' }
  ];

  const [activeCategory, setActiveCategory] = useState('ps5');
  const [selectedConsole, setSelectedConsole] = useState('ps5-standard');
  const [selectedDuration, setSelectedDuration] = useState('3');
  const [selectedLocation, setSelectedLocation] = useState(String(selectedCity?.cityId || '1'));
  const [selectedControllers, setSelectedControllers] = useState('2-controllers');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Sync selected location when global context city changes
  React.useEffect(() => {
    if (selectedCity?.cityId) {
      setSelectedLocation(String(selectedCity.cityId));
    }
  }, [selectedCity]);

  // Handle category chip click
  const handleChipClick = (chip) => {
    setActiveCategory(chip.id);
    setSelectedConsole(chip.selectValue);
  };

  // Find matching catalog package or item based on form
  const matchedItem = useMemo(() => {
    const cityPackages = catalogData.packagesByCity?.[selectedLocation] || catalogData.packagesByCity?.['1'] || [];
    
    if (selectedConsole.startsWith('ps5')) {
      if (selectedControllers === '4-controllers') {
        return cityPackages.find(p => p.name.includes('4 Controllers') || p.name.includes('4 controller')) || cityPackages[0];
      }
      if (selectedControllers === '1-controller') {
        return cityPackages.find(p => p.name.includes('1 Controller') || p.name.includes('1 controller')) || cityPackages[0];
      }
      return cityPackages.find(p => p.name.includes('2 Controllers') || p.name.includes('2 controllers')) || cityPackages[0];
    }

    if (selectedConsole.startsWith('switch')) {
      const switchCat = catalogData.consoleCategories.find(c => c.categoryId === 4);
      return {
        id: 'nintendo-switch-oled',
        name: 'Nintendo Switch OLED Console + 4 Joy-Cons',
        category: 'Nintendo Switch',
        price: 649,
        image: switchCat?.categoryImg || 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/1486ed1c-2147-4f19-9142-887f15a5d5f0-Nintendo Switch (2).png',
        tag: 'PARTY HIT',
        kind: 'product'
      };
    }

    if (selectedConsole.startsWith('ps4')) {
      const ps4Cat = catalogData.consoleCategories.find(c => c.categoryId === 7);
      return {
        id: 'ps4-pro-console',
        name: 'PlayStation 4 Slim / Pro + 2 DualShock 4',
        category: 'PS4 Console',
        price: 499,
        image: ps4Cat?.categoryImg || 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/44a0eaa8-2412-49c2-882c-aeccfb926485-PS4 Console.png',
        tag: 'BUDGET CHAMP',
        kind: 'product'
      };
    }

    if (selectedConsole.startsWith('vr')) {
      const vrCat = catalogData.consoleCategories.find(c => c.categoryId === 14);
      return {
        id: 'ps-vr2-rig',
        name: 'PlayStation VR2 Horizon Call of the Mountain Bundle',
        category: 'VR Devices',
        price: 899,
        image: vrCat?.categoryImg || 'https://prod-gw-assets.s3.ap-south-1.amazonaws.com/product/70282638-7a1d-4bfe-9443-b40dabc92c0c-Vr device.png',
        tag: 'NEXT GEN VR',
        kind: 'product'
      };
    }

    return cityPackages[0];
  }, [selectedConsole, selectedControllers, selectedLocation]);

  // Handle Search / Instant Rent Button click
  const handleSearchAction = (e) => {
    e.preventDefault();
    const days = parseInt(selectedDuration, 10) || 3;
    setRentalDays(days);

    // Sync city context if location dropdown changed
    const targetCity = catalogData.cities.find(c => c.cityId === Number(selectedLocation));
    if (targetCity && targetCity.cityId !== selectedCity.cityId) {
      selectCity(targetCity);
    }

    if (matchedItem) {
      openRentModal(matchedItem);
      setFeedbackToast({
        title: 'Rig Selected!',
        detail: `${matchedItem.name} • ${days} Days Plan`
      });
      setTimeout(() => setFeedbackToast(null), 4000);
    } else {
      router.push('/consoles');
    }
  };

  return (
    <section className="cyber-hero-wrapper">
      {/* Toast Notification */}
      {feedbackToast && (
        <div 
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 9999,
            background: '#0f172a',
            color: '#ffffff',
            padding: '0.85rem 1.4rem',
            borderRadius: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px #9fe82e',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            animation: 'fadeInDown 0.3s ease'
          }}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#9fe82e',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800
          }}>
            ✓
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>{feedbackToast.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{feedbackToast.detail}</div>
          </div>
        </div>
      )}

      {/* Main Framed Canvas Box (Matching Reference GoTrip Card Layout) */}
      <div className="cyber-hero-canvas">
        {/* Subtle Cyber Grid Background Texture */}
        <div className="cyber-hero-grid-bg" />

        {/* ================================================================= */}
        {/* 1. EMBEDDED TOP NAVIGATION BAR                                    */}
        {/* ================================================================= */}
        <header className="cyber-hero-nav">
          {/* Brand Logo (Left) */}
          <Link href="/" className="cyber-brand-logo">
            <span className="dot" />
            <span style={{ color: '#ffffff', fontWeight: 800 }}>Game</span>
            <span style={{ color: '#9fe82e', fontWeight: 800 }}>Wagon</span>
          </Link>

          {/* Desktop Center Pill Nav Capsule */}
          <nav className="cyber-nav-pill-group">
            <Link href="/" className="cyber-nav-pill-item active">
              Home
            </Link>
            <Link href="/consoles" className="cyber-nav-pill-item">
              Rent Consoles
            </Link>
            <Link href="/games" className="cyber-nav-pill-item">
              Game Titles
            </Link>
            <Link href="/about" className="cyber-nav-pill-item">
              About Us
            </Link>
            <Link href="/contact" className="cyber-nav-pill-item">
              Contact Us
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="cyber-nav-actions">
            {/* City / Hub Selector Pill */}
            <button
              onClick={() => setIsCityModalOpen(true)}
              className="cyber-action-pill"
              title="Change Delivery Hub"
            >
              <MapPin size={14} color="#9fe82e" />
              <span>{selectedCity.cityName} Hub</span>
              <ChevronDown size={14} opacity={0.7} />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="cyber-action-pill"
              title="View Cart"
            >
              <ShoppingBag size={14} color="#9fe82e" />
              <span>Cart ({cartTotals.totalItems})</span>
            </button>

            {/* Quick Log In link */}
            <button
              onClick={() => openRentModal(matchedItem || { name: 'Quick Rental Pass' })}
              style={{
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.925rem',
                padding: '0.45rem 0.65rem',
                cursor: 'pointer',
                display: 'none'
              }}
              className="desktop-only-login"
            >
              Log In
            </button>

            {/* Neon Lime Sign Up / Rent Pill Button */}
            <Link href="/consoles" className="cyber-signup-pill">
              <span>Rent Now</span>
              <ArrowRight size={15} />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                color: '#ffffff',
                padding: '0.4rem',
                borderRadius: '0.5rem',
                background: 'rgba(255,255,255,0.18)'
              }}
              className="mobile-nav-toggle"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu if toggled */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'relative',
              zIndex: 30,
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '1.25rem',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#9fe82e', fontWeight: 700, padding: '0.4rem 0' }}
            >
              Home
            </Link>
            <Link 
              href="/consoles" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontWeight: 500, padding: '0.4rem 0' }}
            >
              Rent Consoles
            </Link>
            <Link 
              href="/games" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontWeight: 500, padding: '0.4rem 0' }}
            >
              Game Titles
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontWeight: 500, padding: '0.4rem 0' }}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontWeight: 500, padding: '0.4rem 0' }}
            >
              Contact Us
            </Link>
          </div>
        )}

        {/* ================================================================= */}
        {/* 2. CENTER HERO AREA (Left: Headline & Pills, Right: Cyber Tower)   */}
        {/* ================================================================= */}
        <div className="cyber-hero-body">
          {/* Left Column: Headlines, Pills, Subtext */}
          <div className="cyber-hero-content">
            {/* Category Pills (matching House, Apartment, Residencial in reference) */}
            <div className="cyber-category-chips">
              {categoryChips.map((chip) => {
                const isActive = activeCategory === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => handleChipClick(chip)}
                    className={`cyber-category-pill ${isActive ? 'active' : ''}`}
                    type="button"
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Main Headline (Directly referencing user layout text structure) */}
            <h1 className="cyber-hero-title">
              Console Rentals You Want,<br />
              At The Prices You Deserve.
            </h1>

            {/* Sub-headline text */}
            <p className="cyber-hero-subtitle">
              Why thousands of gamers across Kochi, Trivandrum & Bangalore choose Game Wagon for their weekend battle stations. High-end hardware delivered in under 1 hour.
            </p>

            {/* Perks badges */}
            <div className="cyber-hero-perks">
              <span className="cyber-hero-perk-item">
                <Zap size={13} color="#9fe82e" />
                <span>60-Min Hub Delivery</span>
              </span>
              <span className="cyber-hero-perk-item">
                <ShieldCheck size={13} color="#9fe82e" />
                <span>Zero Security Deposit</span>
              </span>
              <span className="cyber-hero-perk-item">
                <Gamepad2 size={13} color="#9fe82e" />
                <span>200+ Handpicked Games</span>
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Cyberpunk Tower */}
          <div className="cyber-tower-visual">
            <div className="cyber-tower-img-wrapper">
              <span className="cyber-tower-badge">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f0ff', display: 'inline-block' }} />
                NEXT-GEN HARDWARE RIG
              </span>
              <Image
                src="/images/cyberpunk-hero.jpg"
                alt="Game Wagon Cyberpunk Architectural Rig"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. GROUNDED BOTTOM FILTER & SEARCH CARD ("Find The Best Place")   */}
        {/* ================================================================= */}
        <div className="cyber-search-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <h2 className="cyber-search-heading" style={{ margin: 0 }}>
              Find The Best Setup
            </h2>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: '#059669',
              background: '#ecfdf5',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px'
            }}>
              <CheckCircle2 size={14} color="#059669" />
              <span>Available in {selectedCity.cityName} • Fast Dispatch</span>
            </div>
          </div>

          {/* 4 Input Dropdowns + 1 Neon Lime Search Button */}
          <form onSubmit={handleSearchAction} className="cyber-search-grid">
            {/* Field 1: Looking For */}
            <div className="cyber-field-group">
              <label className="cyber-field-label">Looking For</label>
              <div className="cyber-select-box">
                <select
                  value={selectedConsole}
                  onChange={(e) => {
                    setSelectedConsole(e.target.value);
                    if (e.target.value.startsWith('ps5')) setActiveCategory('ps5');
                    else if (e.target.value.startsWith('switch')) setActiveCategory('switch');
                    else if (e.target.value.startsWith('ps4')) setActiveCategory('ps4');
                    else if (e.target.value.startsWith('vr')) setActiveCategory('vr');
                  }}
                  aria-label="Select Console"
                >
                  <option value="ps5-standard">PS5 4K Standard Edition</option>
                  <option value="ps5-duo">PS5 Duo (2 Controllers)</option>
                  <option value="switch-oled">Nintendo Switch OLED</option>
                  <option value="ps4-slim">PlayStation 4 Slim / Pro</option>
                  <option value="vr-devices">PS VR2 Virtual Reality Set</option>
                </select>
                <ChevronDown size={16} className="cyber-select-icon" />
              </div>
            </div>

            {/* Field 2: Rental Duration / Price */}
            <div className="cyber-field-group">
              <label className="cyber-field-label">Price / Duration</label>
              <div className="cyber-select-box">
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  aria-label="Select Rental Duration"
                >
                  <option value="3">Weekend (3 Days - Best Value)</option>
                  <option value="7">Week Grind (7 Days - 40% OFF)</option>
                  <option value="30">Month Marathon (30 Days - 63% OFF)</option>
                  <option value="1">Single Day (24 Hours)</option>
                </select>
                <ChevronDown size={16} className="cyber-select-icon" />
              </div>
            </div>

            {/* Field 3: Locations */}
            <div className="cyber-field-group">
              <label className="cyber-field-label">Locations</label>
              <div className="cyber-select-box">
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    const newCityId = e.target.value;
                    setSelectedLocation(newCityId);
                    const cityObj = catalogData.cities.find(c => c.cityId === Number(newCityId));
                    if (cityObj) selectCity(cityObj);
                  }}
                  aria-label="Select City Location"
                >
                  {catalogData.cities.map((city) => (
                    <option key={city.cityId} value={String(city.cityId)}>
                      {city.cityName} Hub (60 Min)
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="cyber-select-icon" />
              </div>
            </div>

            {/* Field 4: Number Of Controllers / Gear */}
            <div className="cyber-field-group">
              <label className="cyber-field-label">Number Of Controllers</label>
              <div className="cyber-select-box">
                <select
                  value={selectedControllers}
                  onChange={(e) => setSelectedControllers(e.target.value)}
                  aria-label="Select Controllers"
                >
                  <option value="2-controllers">2 Controllers + 2 Games</option>
                  <option value="4-controllers">4 Controllers (Party Pack)</option>
                  <option value="1-controller">1 Controller + 1 Game (Solo)</option>
                  <option value="vr-kit">VR Rig + Motion Controllers</option>
                </select>
                <ChevronDown size={16} className="cyber-select-icon" />
              </div>
            </div>

            {/* Action Search Button (Vibrant Neon Lime, matching reference) */}
            <div>
              <button 
                type="submit" 
                className="cyber-search-btn"
                title="Search and book setup"
              >
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Sub Filter Tags Row (matching Filter, City, House, Apartment in reference) */}
          <div className="cyber-filter-row">
            <span className="cyber-filter-label">Filter:</span>
            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              className="cyber-filter-tag active"
            >
              City Hub
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedConsole('ps5-standard');
                setActiveCategory('ps5');
              }}
              className={`cyber-filter-tag ${selectedConsole.startsWith('ps5') ? 'active' : ''}`}
            >
              PS5 4K
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedConsole('switch-oled');
                setActiveCategory('switch');
              }}
              className={`cyber-filter-tag ${selectedConsole === 'switch-oled' ? 'active' : ''}`}
            >
              Nintendo Switch
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedConsole('ps4-slim');
                setActiveCategory('ps4');
              }}
              className={`cyber-filter-tag ${selectedConsole === 'ps4-slim' ? 'active' : ''}`}
            >
              PS4 Slim
            </button>
            <button
              type="button"
              onClick={() => setSelectedControllers('4-controllers')}
              className={`cyber-filter-tag ${selectedControllers === '4-controllers' ? 'active' : ''}`}
            >
              Party Pack (4 Players)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedConsole('vr-devices');
                setActiveCategory('vr');
              }}
              className={`cyber-filter-tag ${selectedConsole === 'vr-devices' ? 'active' : ''}`}
            >
              VR Rig
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
