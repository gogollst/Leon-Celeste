import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, setCartOpen, wishlist } = useCart();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { name: 'Start', href: '#home' },
    { name: 'Kollektionen', href: '#collections' },
    { name: 'Signature', href: '#signature' },
    { name: 'Über uns', href: '#about' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-luxury shadow-premium border-b border-primary/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <img
              src="https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/j6me6snb_logo-lion-celetse.jpg"
              alt="Lion Céleste"
              className="h-12 w-12 lg:h-14 lg:w-14 transition-all duration-500 group-hover:scale-105 gold-glow"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl lg:text-2xl font-semibold text-foreground tracking-wide">
                Lion Céleste
              </span>
              <span className="text-xs text-primary font-light tracking-widest">BY LEON GOGOLL</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-light text-foreground/80 hover:text-primary transition-all duration-300 relative group tracking-wide"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              data-testid="nav-search-btn"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist Icon */}
            <Button
              variant="ghost"
              size="icon"
              data-testid="nav-wishlist-btn"
              className="text-foreground hover:text-primary transition-colors hidden lg:flex relative"
            >
              <Heart className={`h-5 w-5 ${wishlist.length > 0 ? 'fill-primary text-primary' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </Button>

            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="icon"
              data-testid="nav-cart-btn"
              onClick={() => setCartOpen(true)}
              className="text-foreground hover:text-primary transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card/98 backdrop-blur-lg border-primary/20">
                <div className="flex flex-col space-y-8 mt-12">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-lg font-light text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
