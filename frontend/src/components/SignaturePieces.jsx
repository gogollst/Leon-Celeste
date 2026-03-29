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
      description: 'Ein königsblauer Saphir, umgeben von funkelnden Diamanten.',
      badge: 'Signature',
    },
    {
      id: 2,
      name: 'Lion Majestueux',
      subtitle: 'Gold Collier',
      price: '18.900 €',
      image: 'https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5fGVufDB8fHxibGFja3wxNzc0NzY4NTc0fDA&ixlib=rb-4.1.0&q=85',
      description: 'Statement-Collier mit moderner Löwen-Gravur.',
      badge: 'Signature',
    },
    {
      id: 3,
      name: 'Ange de Lumière',
      subtitle: 'Diamant Ohrringe',
      price: '9.800 €',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
      description: 'Zeitlose Eleganz für jeden Anlass.',
      badge: 'Neu',
    },
    {
      id: 4,
      name: 'Couronne Céleste',
      subtitle: 'Platinum Armband',
      price: '15.200 €',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      description: 'Minimalistische Perfektion in Platin.',
      badge: 'Limited',
    },
  ];

  return (
    <section id="signature" className="relative py-20 lg:py-32 overflow-hidden bg-gradient-modern">
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-primary text-sm font-bold tracking-wider uppercase">Signature Collection</span>
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mt-4 mb-6 tracking-tight">
            Meine Meisterwerke
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Handverlesene Statement-Stücke, die deine Persönlichkeit unterstreichen.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {signaturePieces.map((piece, index) => (
            <Card
              key={piece.id}
              className="group relative bg-white border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-elegant transition-all duration-500 animate-fade-in-up flex flex-col rounded-3xl"
              style={{ animationDelay: `${index * 100}ms` }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                {/* Badge */}
                <Badge className="absolute top-4 left-4 bg-gradient-gold text-white border-0 rounded-full px-3 py-1">
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
                    className="h-12 w-12 rounded-full bg-white hover:bg-primary hover:text-white transition-all duration-300 shadow-md"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-white hover:bg-primary hover:text-white transition-all duration-300 shadow-md"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-xs text-primary font-bold tracking-wider uppercase">{piece.subtitle}</p>
                  <h3 className="font-display text-xl font-bold text-foreground mt-1">{piece.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{piece.description}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <span className="font-display text-2xl font-bold text-foreground">{piece.price}</span>
                  <Button
                    size="sm"
                    className="bg-primary/10 text-primary hover:bg-gradient-gold hover:text-white border-0 transition-all duration-300 rounded-full"
                  >
                    Details
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
            className="bg-gradient-gold hover:shadow-gold text-white font-semibold px-10 py-6 text-base rounded-full transition-all duration-300 hover:scale-105"
          >
            Alle Stücke entdecken
          </Button>
        </div>
      </div>
    </section>
  );
};