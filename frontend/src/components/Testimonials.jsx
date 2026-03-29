import React from 'react';
import { Card } from './ui/card';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sophie M.',
      location: 'München',
      text: 'Das Céleste Éternité ist nicht nur ein Ring – es ist ein Kunstwerk. Die Qualität und Verarbeitung sind unglaublich. Ich habe noch nie so viele Komplimente bekommen.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
      id: 2,
      name: 'Michael K.',
      location: 'Hamburg',
      text: 'Für den Verlobungsring meiner Frau wollte ich nur das Beste. Lion Céleste hat alle Erwartungen übertroffen. Die persönliche Beratung und das Ergebnis sind phänomenal.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    {
      id: 3,
      name: 'Isabella R.',
      location: 'Berlin',
      text: 'Zeitlose Eleganz und außergewöhnliches Design. Das Ange de Lumière Collier ist mein wertvollstes Schmuckstück. Man spürt die Leidenschaft in jedem Detail.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-luxury"></div>
      <div className="absolute inset-0 grain-texture"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Kundenstimmen</span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mt-4 mb-6">
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Vertrauen und Zufriedenheit unserer Kunden sind unser größter Erfolg.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="relative p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-gold animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="h-12 w-12 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-primary/20">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-primary/80">{testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-primary">
            <Star className="h-6 w-6 fill-primary" />
            <Star className="h-6 w-6 fill-primary" />
            <Star className="h-6 w-6 fill-primary" />
            <Star className="h-6 w-6 fill-primary" />
            <Star className="h-6 w-6 fill-primary" />
          </div>
          <p className="text-foreground/70 mt-2">4.9 von 5 Sternen • Über 500 Bewertungen</p>
        </div>
      </div>
    </section>
  );
};