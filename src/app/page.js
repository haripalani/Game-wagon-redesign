import React from 'react';
import HeroSection from '@/components/HeroSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import LongRentalRewards from '@/components/LongRentalRewards';
import MachinePicker from '@/components/MachinePicker';
import TrendingTitles from '@/components/TrendingTitles';
import HowItWorks from '@/components/HowItWorks';
import FaqSection from '@/components/FaqSection';

export const metadata = {
  title: 'Game Wagon | Rent PS5, PS4 & Nintendo Switch Consoles with Fast Delivery',
  description: 'Rent PlayStation 5, PS4, and Nintendo Switch consoles with doorstep delivery in Kochi, Trivandrum & Bangalore. No security deposit, 200+ game titles, and up to 63% off on long rentals.',
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MarqueeTicker />
      <LongRentalRewards />
      <MachinePicker />
      <TrendingTitles />
      <HowItWorks />
      <FaqSection />
    </main>
  );
}
