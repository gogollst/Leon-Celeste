import React from 'react';
import { Shield, Award, Leaf, Sparkles, Clock, Heart } from 'lucide-react';

export const WhyLionCeleste = () => {
  const values = [
    {
      icon: Award,
      title: 'Höchste Handwerkskunst',
      description: 'Jedes Stück wird von Meisterhand gefertigt mit jahrzehntelanger Erfahrung und Präzision.',
    },
    {
      icon: Leaf,
      title: 'Nachhaltige Edelsteine',
      description: 'Wir verwenden ausschließlich ethisch gewonnene Edelsteine und konfliktfreie Diamanten.',
    },
    {
      icon: Sparkles,
      title: 'Persönliche Signatur',
      description: 'Jedes Stück trägt die persönliche Signatur von Leon Gogoll und ist ein Unikat.',
    },
    {
      icon: Shield,
      title: 'Lifetime Garantie',
      description: 'Lebenslange Garantie auf Verarbeitung und Materialien. Ihr Vertrauen ist unser Versprechen.',
    },
    {
      icon: Clock,
      title: 'Zeitlose Designs',
      description: 'Unsere Kreationen überdauern Trends und werden zu wertvollen Erbstücken.',
    },
    {
      icon: Heart,
      title: 'Mit Leidenschaft',
      description: 'Jedes Detail wird mit Liebe zum Handwerk und Hingabe zur Perfektion gestaltet.',
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1640303850203-7bf7c76b4557?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZWxlZ2FudHxlbnwwfHx8YmxhY2t8MTc3NDc2ODU4N3ww&ixlib=rb-4.1.0&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 bg-sapphire-deep/80"></div>
      <div className="absolute inset-0 grain-texture"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Warum Lion Céleste</span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mt-4 mb-6">
            Unser Versprechen an Sie
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Exzellenz ist kein Zufall, sondern das Ergebnis von Leidenschaft, Präzision und dem unermüdlichen Streben nach Perfektion.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-gold animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                    <IconComponent className="h-8 w-8" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{value.description}</p>

                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary transition-all duration-500 group-hover:w-full"></div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-primary">100%</p>
            <p className="text-sm text-foreground/70 mt-1">Handgefertigt</p>
          </div>
          <div className="h-12 w-px bg-primary/30"></div>
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-primary">25+</p>
            <p className="text-sm text-foreground/70 mt-1">Jahre Erfahrung</p>
          </div>
          <div className="h-12 w-px bg-primary/30"></div>
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-primary">5000+</p>
            <p className="text-sm text-foreground/70 mt-1">Zufriedene Kunden</p>
          </div>
          <div className="h-12 w-px bg-primary/30"></div>
          <div className="text-center">
            <p className="font-serif text-4xl font-bold text-primary">Lifetime</p>
            <p className="text-sm text-foreground/70 mt-1">Garantie</p>
          </div>
        </div>
      </div>
    </section>
  );
};