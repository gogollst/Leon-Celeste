import React from 'react';
import { Button } from './ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-modern">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-accent rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-soft rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-accent border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Moderne Luxus-Schmuckkunst</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight tracking-tight">
            Lion Céleste
          </h1>

          {/* Subheading with gradient */}
          <p className="text-2xl sm:text-3xl lg:text-4xl font-display text-gradient-gold font-semibold">
            Innovation. Freiheit. Luxus.
          </p>

          {/* Description */}
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Zeitgenössische Schmuckkreationen, die Ihre Persönlichkeit zum Strahlen bringen. Jedes Stück ein Statement.
          </p>

          {/* Creator Credit */}
          <div className="flex items-center justify-center gap-2 text-primary font-medium">
            <div className="w-12 h-0.5 bg-gradient-gold rounded-full"></div>
            <p className="text-base lg:text-lg">Von Leon Gogoll</p>
            <div className="w-12 h-0.5 bg-gradient-gold rounded-full"></div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              size="lg"
              className="bg-gradient-gold hover:shadow-gold text-white font-semibold px-8 py-6 text-base rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('signature')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Kollektion entdecken
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary font-semibold px-8 py-6 text-base rounded-full transition-all duration-300"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Meine Geschichte
            </Button>
          </div>

          {/* Logo Display */}
          <div className="pt-12">
            <img
              src="https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/j6me6snb_logo-lion-celetse.jpg"
              alt="Lion Céleste Logo"
              className="h-32 w-32 mx-auto animate-scale-in gold-glow rounded-2xl"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-primary" />
        </div>
      </div>
    </section>
  );
};