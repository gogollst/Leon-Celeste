import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
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
          backgroundImage: 'url(https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/v26xr551_leon-hero-section.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sapphire-deep/30 via-background/50 to-background"></div>
      </div>

      {/* Grain Texture */}
      <div className="absolute inset-0 grain-texture z-10"></div>

      {/* Subtle Gold Glow */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in-up">
          {/* Main Heading - Minimal, da Bild schon Text hat */}
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-semibold text-foreground leading-[0.9] tracking-tight">
            Lion Céleste
          </h1>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <span className="text-primary text-sm tracking-[0.3em] font-light uppercase">Haute Joaillerie</span>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>

          {/* Subheading */}
          <p className="text-2xl sm:text-3xl lg:text-4xl text-foreground/90 font-serif font-light italic leading-relaxed">
            Wo Generationen sich verbinden
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-accent text-primary-foreground font-light px-10 py-7 text-base tracking-wide transition-all duration-500 hover:scale-105 shadow-gold-glow"
              onClick={() => document.getElementById('signature')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Signature Kollektion
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary font-light px-10 py-7 text-base tracking-wide transition-all duration-500"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Die Geschichte
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-primary" />
        </div>
      </div>
    </section>
  );
};