'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import catalogData from '@/data/catalog.json';

const GameWagonContext = createContext(null);

export function GameWagonProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState(catalogData.cities[0] || { cityId: 1, cityName: 'Kochi' });
  const [cart, setCart] = useState([]);
  const [rentalDays, setRentalDays] = useState(3);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [rentModalItem, setRentModalItem] = useState(null);

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedCityId = localStorage.getItem('gw_city_id');
      if (savedCityId) {
        const found = catalogData.cities.find(c => c.cityId === Number(savedCityId));
        if (found) setSelectedCity(found);
      }
      const savedCart = localStorage.getItem('gw_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      // LocalStorage unavailable
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gw_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const selectCity = (city) => {
    setSelectedCity(city);
    try {
      localStorage.setItem('gw_city_id', String(city.cityId));
    } catch (e) {}
    setIsCityModalOpen(false);
  };

  // Discount percentage based on rental duration
  const discountPercent = useMemo(() => {
    if (rentalDays >= 30) return 0.63; // 63% off Month Marathon
    if (rentalDays >= 7) return 0.40;  // 40% off Week Grind
    return 0;
  }, [rentalDays]);

  const discountTierName = useMemo(() => {
    if (rentalDays >= 30) return 'Month Marathon (63% OFF)';
    if (rentalDays >= 7) return 'Week Grind (40% OFF)';
    return null;
  }, [rentalDays]);

  // Cart operations
  const addToCart = (item, days = rentalDays) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.kind === (item.kind || 'product'));
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.kind === (item.kind || 'product')
            ? { ...i, quantity: i.quantity + 1, days }
            : i
        );
      }
      return [
        ...prev,
        {
          id: item.id || item.packageId || item.productInventoryId,
          name: item.name || item.product?.productName,
          category: item.category || item.product?.category?.categoryName || 'Console',
          image: item.image || item.product?.productImg,
          pricePerDay: Number(item.price || item.flatPrice || item.pricePerUnit || 499),
          quantity: 1,
          days,
          kind: item.kind || (item.packageId ? 'package' : 'product'),
          tag: item.tag || ''
        }
      ];
    });
    setIsCartOpen(true);
    setRentModalItem(null);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart financial totals
  const cartTotals = useMemo(() => {
    const rawTotal = cart.reduce((acc, item) => {
      return acc + item.pricePerDay * item.quantity * rentalDays;
    }, 0);

    const discountAmount = Math.round(rawTotal * discountPercent);
    const finalTotal = rawTotal - discountAmount;
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return {
      rawTotal,
      discountAmount,
      finalTotal,
      totalItems,
      discountPercent: Math.round(discountPercent * 100)
    };
  }, [cart, rentalDays, discountPercent]);

  // City-specific phone number for WhatsApp
  const currentWhatsAppNumber = useMemo(() => {
    if (selectedCity.cityId === 2) return '919740125004'; // Bangalore
    return '917356356516'; // Kochi & Trivandrum default
  }, [selectedCity]);

  const getWhatsAppBookingLink = () => {
    const itemsList = cart.map(i => `• ${i.name} (x${i.quantity}) - ₹${i.pricePerDay}/day`).join('%0A');
    const msg = `Hi Game Wagon! I would like to book a console rental in ${selectedCity.cityName}:%0A%0A${itemsList}%0A%0A*Duration:* ${rentalDays} Days%0A*Discount:* ${cartTotals.discountPercent}%%25%0A*Estimated Total:* ₹${cartTotals.finalTotal}%0A%0APlease confirm slot availability for delivery!`;
    return `https://wa.me/${currentWhatsAppNumber}?text=${msg}`;
  };

  return (
    <GameWagonContext.Provider
      value={{
        catalog: catalogData,
        selectedCity,
        selectCity,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        rentalDays,
        setRentalDays,
        discountPercent,
        discountTierName,
        cartTotals,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCityModalOpen,
        setIsCityModalOpen,
        rentModalItem,
        setRentModalItem,
        currentWhatsAppNumber,
        getWhatsAppBookingLink
      }}
    >
      {children}
    </GameWagonContext.Provider>
  );
}

export function useGameWagon() {
  const ctx = useContext(GameWagonContext);
  if (!ctx) throw new Error('useGameWagon must be used within GameWagonProvider');
  return ctx;
}
