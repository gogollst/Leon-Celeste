import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { BrandStory } from './components/BrandStory';
import { SignaturePieces } from './components/SignaturePieces';
import { CollectionShop } from './components/CollectionShop';
import { WhyLionCeleste } from './components/WhyLionCeleste';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Toaster } from './components/ui/sonner';
import './index.css';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background scroll-smooth">
        <Navigation />
        <main>
          <HeroSection />
          <BrandStory />
          <SignaturePieces />
          <CollectionShop />
          <WhyLionCeleste />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
        <Cart />
        <Toaster position="top-center" theme="dark" />
      </div>
    </CartProvider>
  );
}

export default App;