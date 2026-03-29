import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHxibGFja3wxNzc0NzY4NTc0fDA&ixlib=rb-4.1.0&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-deep/90 via-background/70 to-background"></div>
      </div>

      {/* Grain Texture */}
      <div className="absolute inset-0 grain-texture z-10"></div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          {/* Premium Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/w7fhwgh8_TDNTO.jpg"
              alt="Lion Céleste Premium Logo"
              className="h-32 w-32 lg:h-40 lg:w-40 animate-scale-in gold-glow"
            />
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight">
            Lion Céleste
          </h1>

          {/* Subheading with gradient */}
          <p className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gradient-gold font-medium">
            Himmlischer Luxus. Unvergessliche Stücke.
          </p>

          {/* Description */}
          <p className="text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Höchste Handwerkskunst trifft auf zeitlose Eleganz. Jedes Stück erzählt eine Geschichte von Leidenschaft und Perfektion.
          </p>

          {/* Creator Credit */}
          <p className="text-base lg:text-lg text-primary font-medium tracking-wide">
            Von Leon Gogoll
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-accent text-primary-foreground font-medium px-8 py-6 text-lg rounded-lg shadow-gold transition-all duration-500 hover:scale-105 gold-glow-hover"
              onClick={() => document.getElementById('signature')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Entdecke die Signature Kollektion
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary font-medium px-8 py-6 text-lg rounded-lg transition-all duration-500"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Unsere Geschichte
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-primary" />
        </div>
      </div>
    </section>
  );
};