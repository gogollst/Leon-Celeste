import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Eye, Heart } from 'lucide-react';
import { ProductDetail } from './ProductDetail';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export const SignaturePieces = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { toggleWishlist, isWishlisted } = useCart();

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    toast(isWishlisted(product.id) ? 'Von der Wunschliste entfernt' : 'Zur Wunschliste hinzugefügt');
  };

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
          {PRODUCTS.map((piece, index) => (
            <Card
              key={piece.id}
              data-testid={`signature-piece-${piece.id}`}
              className="group relative bg-card/30 backdrop-blur-sm border-primary/10 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-gold-glow animate-fade-in-up flex flex-col cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(piece.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedProduct(piece)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                {/* Featured Badge */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-gradient-gold-shimmer text-primary-foreground text-xs font-light tracking-widest uppercase shadow-gold-glow">
                  Haute Joaillerie
                </div>

                {/* Hover Actions */}
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-500 ${
                    hoveredId === piece.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    data-testid={`signature-view-btn-${piece.id}`}
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
                    data-testid={`signature-wishlist-btn-${piece.id}`}
                    className={`h-12 w-12 rounded-full bg-card/90 backdrop-blur-sm transition-all duration-300 ${
                      isWishlisted(piece.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-primary hover:text-primary-foreground'
                    }`}
                    onClick={(e) => handleWishlist(e, piece)}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted(piece.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-xs text-primary font-light tracking-widest uppercase">{piece.subtitle}</p>
                  <h3 className="font-serif text-xl font-semibold text-foreground mt-2">{piece.name}</h3>
                  <p className="text-sm text-foreground/60 mt-2 leading-relaxed font-light line-clamp-2">{piece.description}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-primary/20 mt-auto">
                  <span className="font-serif text-2xl font-semibold text-primary">{piece.price}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:bg-primary/10 font-light tracking-wide transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(piece);
                    }}
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
            onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-accent text-primary-foreground font-light px-12 py-7 text-base tracking-wide transition-all duration-500 hover:scale-105 shadow-gold-glow"
          >
            Alle Signature Stücke
          </Button>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
