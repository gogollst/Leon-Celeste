import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, ChevronLeft, ChevronRight, Heart, ShoppingBag, Share2, Sparkles, ZoomIn } from 'lucide-react';
import { toast } from 'sonner';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductDetail = ({ product, open, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const { addToCart, setCartOpen, toggleWishlist, isWishlisted } = useCart();

  if (!product) return null;

  // Fetch gallery from centralized products data
  const fullProduct = PRODUCTS.find((p) => p.id === product.id) || product;
  const gallery = fullProduct.gallery || [{ type: 'image', url: product.image }];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    setZoomed(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    setZoomed(false);
  };

  const handleAddToCart = () => {
    addToCart(fullProduct);
    toast.success(`${fullProduct.name} zum Warenkorb hinzugefügt`);
    onClose();
    setTimeout(() => setCartOpen(true), 300);
  };

  const handleWishlist = () => {
    toggleWishlist(fullProduct.id);
    toast(isWishlisted(fullProduct.id) ? 'Von der Wunschliste entfernt' : 'Zur Wunschliste hinzugefügt');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    toast.success('Link kopiert');
  };

  const currentMedia = gallery[currentImageIndex];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) { onClose(); setCurrentImageIndex(0); setZoomed(false); } }}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-card border-primary/20 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => { onClose(); setCurrentImageIndex(0); setZoomed(false); }}
          data-testid="product-detail-close-btn"
          className="absolute top-6 right-6 z-50 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-all duration-300"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>

        <div className="grid lg:grid-cols-2 h-full">
          {/* Left Side - Gallery */}
          <div className="relative bg-gradient-deep flex items-center justify-center p-8 lg:p-12">
            {/* Main Image/Video */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {currentMedia.type === 'video' ? (
                <video
                  src={currentMedia.url}
                  className="max-w-full max-h-full object-contain"
                  controls
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <div
                  className={`relative cursor-zoom-in transition-transform duration-500 ${zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'}`}
                  onClick={() => setZoomed((z) => !z)}
                >
                  <img
                    src={currentMedia.url}
                    alt={fullProduct.name}
                    className="max-w-full max-h-full object-contain select-none"
                    draggable={false}
                  />
                  {!zoomed && (
                    <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center pointer-events-none">
                      <ZoomIn className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Arrows */}
              {gallery.length > 1 && !zoomed && (
                <>
                  <button
                    onClick={prevImage}
                    data-testid="gallery-prev-btn"
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-card/90 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    data-testid="gallery-next-btn"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-card/90 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {gallery.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {gallery.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => { setCurrentImageIndex(index); setZoomed(false); }}
                    data-testid={`gallery-thumb-${index}`}
                    className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${
                      index === currentImageIndex
                        ? 'border-primary shadow-gold-glow'
                        : 'border-primary/20 hover:border-primary/50'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <>
                        <video src={media.url} className="w-full h-full object-cover" muted />
                        <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                          <div className="w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M3 2v12l10-6z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <img src={media.url} alt={`Ansicht ${index + 1}`} className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Details */}
          <div className="relative overflow-y-auto p-8 lg:p-12">
            <DialogTitle className="sr-only">{fullProduct.name}</DialogTitle>

            <div className="space-y-8">
              {/* Header */}
              <div>
                {fullProduct.featured && (
                  <Badge className="bg-gradient-gold-shimmer text-primary-foreground mb-4">
                    Haute Joaillerie
                  </Badge>
                )}
                <p className="text-xs text-primary font-light tracking-widest uppercase mb-3">
                  {fullProduct.subtitle}
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  {fullProduct.name}
                </h2>
                <p className="font-serif text-4xl font-semibold text-primary">{fullProduct.price}</p>
              </div>

              {/* Description */}
              <div className="border-t border-b border-primary/20 py-6">
                <p className="text-foreground/80 leading-relaxed font-light text-base">
                  {fullProduct.description}
                </p>
              </div>

              {/* Technical Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Technische Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-foreground/60 font-light mb-1">Material</p>
                    <p className="text-foreground font-normal">{fullProduct.material}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 font-light mb-1">Verarbeitung</p>
                    <p className="text-foreground font-normal">Handgefertigt</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 font-light mb-1">Herkunft</p>
                    <p className="text-foreground font-normal">Deutschland</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 font-light mb-1">Garantie</p>
                    <p className="text-foreground font-normal">Lifetime</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {[
                  'Jedes Stück wird individuell von Leon Gogoll gefertigt',
                  'Zertifizierte Edelsteine mit Echtheitszertifikat',
                  'Kostenlose Gravur und luxuriöse Geschenkverpackung',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground/80 font-light">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  size="lg"
                  data-testid="product-detail-add-to-cart-btn"
                  className="w-full bg-primary hover:bg-accent text-primary-foreground font-light tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-gold-glow"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  In den Warenkorb
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    data-testid="product-detail-wishlist-btn"
                    className={`border-primary/30 font-light transition-all duration-300 ${
                      isWishlisted(fullProduct.id) ? 'bg-primary/20 text-primary border-primary/50' : 'hover:bg-primary/10'
                    }`}
                    onClick={handleWishlist}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isWishlisted(fullProduct.id) ? 'fill-current' : ''}`} />
                    {isWishlisted(fullProduct.id) ? 'Gemerkt' : 'Merken'}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    data-testid="product-detail-share-btn"
                    className="border-primary/30 hover:bg-primary/10 font-light"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Teilen
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-accent rounded-lg p-6 border border-primary/20">
                <p className="text-sm text-foreground/80 font-light mb-3">
                  Fragen zu diesem Meisterwerk?
                </p>
                <Button
                  variant="ghost"
                  className="text-primary hover:bg-primary/10 font-light p-0 h-auto"
                >
                  Persönliche Beratung vereinbaren →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
