import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Search, ShoppingBag, Heart } from 'lucide-react';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Start', href: '#home' },
    { name: 'Kollektionen', href: '#collections' },
    { name: 'Signature Stücke', href: '#signature' },
    { name: 'Über mich', href: '#about' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-effect shadow-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <img
              src="https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/j6me6snb_logo-lion-celetse.jpg"
              alt="Lion Céleste Logo"
              className="h-12 w-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
            <span className="font-display text-xl lg:text-2xl font-bold text-foreground tracking-tight">
              Lion Céleste
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hidden lg:flex"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-gold text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card/98 backdrop-blur-lg border-border">
                <div className="flex flex-col space-y-6 mt-12">
                  <div className="flex items-center space-x-3 pb-6 border-b border-border">
                    <img
                      src="https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/j6me6snb_logo-lion-celetse.jpg"
                      alt="Lion Céleste"
                      className="h-10 w-10"
                    />
                    <span className="font-display text-lg font-bold text-foreground">Lion Céleste</span>
                  </div>
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-2"
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