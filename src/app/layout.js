import './globals.css';
import { GameWagonProvider } from '@/context/GameWagonContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CityModal from '@/components/CityModal';
import SearchModal from '@/components/SearchModal';
import CartDrawer from '@/components/CartDrawer';
import RentModal from '@/components/RentModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata = {
  title: 'Game Wagon | India\'s Console Rental Wagon',
  description: 'Rent PS5, PS4 and Nintendo Switch delivered to your doorstep in Kochi, Trivandrum & Bangalore with zero security deposit.',
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GameWagonProvider>
          <Navbar />
          {children}
          <Footer />
          <CityModal />
          <SearchModal />
          <CartDrawer />
          <RentModal />
          <FloatingWhatsApp />
        </GameWagonProvider>
      </body>
    </html>
  );
}
