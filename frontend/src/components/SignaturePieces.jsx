import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Eye, Heart } from 'lucide-react';
import { ProductDetail } from './ProductDetail';

export const SignaturePieces = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const signaturePieces = [
    {
      id: 1,
      name: 'Les Ailes d\'Ange',
      subtitle: 'Signature Angel Ring',
      price: '22.500 €',
      image: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/l2elv9we_PXL_20260329_064714711_exported_1774766860186.jpg',
      description: 'Das exklusive Meisterstück – handgefertigte Engelsflügel aus Sterling Silber mit 18K Gold-Akzent. Ein Symbol für Schutz und himmlische Eleganz.',
      material: 'Sterling Silber & 18K Gold',
      featured: true,
    },
    {
      id: 2,
      name: 'Céleste Éternité',
      subtitle: 'Royal Sapphire Ring',
      price: '12.500 €',
      image: 'https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?w=800',
      description: 'Ein majestätischer königsblauer Saphir, umgeben von lupenreinen Diamanten in 18K Gold gefasst.',
      material: '18K Gold & Saphir',
    },
    {
      id: 3,
      name: 'Lion Majestueux',
      subtitle: 'Diamond Necklace',
      price: '18.900 €',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      description: 'Elegantes Collier mit handverlesenen Diamanten und der ikonischen Löwen-Signatur.',
      material: '18K Weißgold & Diamanten',
    },
    {
      id: 4,
      name: 'Ange de Lumière',
      subtitle: 'Diamond Earrings',
      price: '9.800 €',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
      description: 'Zeitlose Brillant-Ohrringe, die wie himmlische Engelsflügel funkeln.',
      material: 'Platin & Diamanten',
    },
    {
      id: 5,
      name: 'Couronne Céleste',
      subtitle: 'Platinum Bracelet',
      price: '15.200 €',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
      description: 'Ein Statement-Armband aus reinstem Platin mit himmlischer Verzierung.',
      material: 'Platin 950',
    },
  ];

  return (
    <section id="signature" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-deep"></div>
      <div className="absolute inset-0 grain-texture"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
          <span className="text-primary text-xs font-light tracking-[0.3em] uppercase">Signature Collection</span>
          <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground mt-6 mb-8">
            Meisterwerke der Haute Joaillerie
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed font-light">
            Handverlesene Stücke, die Luxus und Handwerkskunst auf höchstem Niveau vereinen.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {signaturePieces.map((piece, index) => (
            <Card
              key={piece.id}
              className={`group relative bg-card/30 backdrop-blur-sm border-primary/10 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-gold-glow animate-fade-in-up flex flex-col ${
                piece.featured ? 'lg:col-span-2 lg:row-span-1' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredId(piece.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div 
                className={`relative overflow-hidden cursor-pointer ${piece.featured ? 'aspect-[16/10]' : 'aspect-square'}`}
                onClick={() => setSelectedProduct(piece)}
              >
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                {/* Featured Badge */}
                {piece.featured && (
                  <div className="absolute top-6 left-6 px-4 py-2 bg-gradient-gold-shimmer text-primary-foreground text-xs font-light tracking-widest uppercase shadow-gold-glow">
                    Top-Modell
                  </div>
                )}
                
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(piece);
                    }}
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-12 w-12 rounded-full bg-card/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-xs text-primary font-light tracking-widest uppercase">{piece.subtitle}</p>
                  <h3 className={`font-serif font-semibold text-foreground mt-2 ${piece.featured ? 'text-3xl' : 'text-2xl'}`}>{piece.name}</h3>
                  <p className="text-sm text-foreground/60 mt-3 leading-relaxed font-light">{piece.description}</p>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-primary/20 mt-auto">
                  <span className={`font-serif font-semibold text-primary ${piece.featured ? 'text-3xl' : 'text-2xl'}`}>{piece.price}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:bg-primary/10 font-light tracking-wide transition-all duration-300"
                  >
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-primary hover:bg-accent text-primary-foreground font-light px-12 py-7 text-base tracking-wide transition-all duration-500 hover:scale-105 shadow-gold-glow"
          >
            Alle Signature Stücke
          </Button>
        </div>
      </div>
    </section>
  );
};