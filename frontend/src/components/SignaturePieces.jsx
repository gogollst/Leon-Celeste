import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Eye } from 'lucide-react';

export const SignaturePieces = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const signaturePieces = [
    {
      id: 1,
      name: 'Céleste Éternité',
      subtitle: 'Saphir Ring',
      price: '12.500 €',
      image: 'https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHxibGFja3wxNzc0NzY4NTc0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Ein königsblauer Saphir, umgeben von funkelnden Diamanten in 18K Gold.',
      badge: 'Signature',
    },
    {
      id: 2,
      name: 'Lion Majestueux',
      subtitle: 'Gold Collier',
      price: '18.900 €',
      image: 'https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHxibGFja3wxNzc0NzY4NTc0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Majestätisches Collier mit Löwen-Gravur und himmlischen Diamanten.',
      badge: 'Signature',
    },
    {
      id: 3,
      name: 'Ange de Lumière',
      subtitle: 'Diamant Ohrringe',
      price: '9.800 €',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
      description: 'Schwebende Diamanten wie himmlische Engelsflügel.',
      badge: 'Neu',
    },
    {
      id: 4,
      name: 'Couronne Céleste',
      subtitle: 'Platinum Armband',
      price: '15.200 €',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      description: 'Platin-Armband mit himmlischer Verzierung und Saphiren.',
      badge: 'Limited',
    },
  ];

  return (
    <section id="signature" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-sapphire-deep"></div>
      <div className="absolute inset-0 grain-texture"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Signature Collection</span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mt-4 mb-6">
            Unvergessliche Meisterwerke
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Jedes Signature-Stück ist ein Unikat, geschaffen mit höchster Präzision und Leidenschaft. Diese außergewöhnlichen Kreationen definieren Luxus neu.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {signaturePieces.map((piece, index) => (
            <Card
              key={piece.id}
              className="group relative bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-500 animate-fade-in-up flex flex-col"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredId(piece.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Badge */}
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {piece.badge}
                </Badge>

                {/* Hover Actions */}
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-500 ${
                    hoveredId === piece.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-12 w-12 rounded-full bg-card/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-12 w-12 rounded-full bg-card/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-xs text-primary font-medium tracking-wider uppercase">{piece.subtitle}</p>
                  <h3 className="font-serif text-xl font-semibold text-foreground mt-1">{piece.name}</h3>
                  <p className="text-sm text-foreground/70 mt-2 line-clamp-2">{piece.description}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-primary/20 mt-auto">
                  <span className="font-serif text-2xl font-bold text-primary">{piece.price}</span>
                  <Button
                    size="sm"
                    className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/30 transition-all duration-300"
                  >
                    Entdecken
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-accent text-primary-foreground font-medium px-10 py-6 text-lg rounded-lg shadow-gold transition-all duration-500 hover:scale-105"
          >
            Alle Signature Stücke ansehen
          </Button>
        </div>
      </div>
    </section>
  );
};