import React, { useState, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Share2,
  Sparkles,
  ZoomIn,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductDetail = ({ product, open, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [is360Mode, setIs360Mode] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const imgRef = useRef(null);
  const { addToCart, setCartOpen, toggleWishlist, isWishlisted } = useCart();

  const handleClose = useCallback(() => {
    onClose();
    setCurrentImageIndex(0);
    setZoomed(false);
    setIs360Mode(false);
    setTilt({ x: 0, y: 0 });
    setDragStart(null);
  }, [onClose]);

  if (!product) return null;

  const fullProduct = PRODUCTS.find((p) => p.id === product.id) || product;
  const gallery = fullProduct.gallery || [{ type: 'image', url: product.image }];
  const currentMedia = gallery[currentImageIndex];
  const isCurrentImage = currentMedia.type === 'image';

  /* --- Gallery Navigation --- */
  const nextImage = () => { setCurrentImageIndex((p) => (p + 1) % gallery.length); setZoomed(false); };
  const prevImage = () => { setCurrentImageIndex((p) => (p - 1 + gallery.length) % gallery.length); setZoomed(false); };

  /* --- 3D Tilt (mouse move) --- */
  const handleMouseMove = (e) => {
    if (!is360Mode || !isCurrentImage || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -18, y: x * 18 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  /* --- Drag to Rotate (cycles through gallery images) --- */
  const handleDragStart = (e) => {
    if (!is360Mode) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    setDragStart({ x: clientX, index: currentImageIndex });
  };

  const handleDragMove = (e) => {
    if (!is360Mode || dragStart === null) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const delta = clientX - dragStart.x;
    const steps = Math.round(delta / 60);
    const newIndex = ((dragStart.index - steps) % gallery.length + gallery.length) % gallery.length;
    if (newIndex !== currentImageIndex) setCurrentImageIndex(newIndex);
  };

  const handleDragEnd = () => setDragStart(null);

  /* --- Actions --- */
  const handleAddToCart = () => {
    addToCart(fullProduct);
    toast.success(`${fullProduct.name} zum Warenkorb hinzugefügt`);
    handleClose();
    setTimeout(() => setCartOpen(true), 300);
  };

  const handleWishlist = () => {
    const wasWishlisted = isWishlisted(fullProduct.id);
    toggleWishlist(fullProduct.id);
    toast(wasWishlisted ? 'Von der Wunschliste entfernt' : 'Zur Wunschliste hinzugefügt');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    toast.success('Link kopiert');
  };

  const handleBeratung = () => {
    handleClose();
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-card border-primary/20 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          data-testid="product-detail-close-btn"
          className="absolute top-6 right-6 z-50 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-all duration-300"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>

        <div className="grid lg:grid-cols-2 h-full">
          {/* ── Left Side – Gallery ── */}
          <div className="relative bg-gradient-deep flex flex-col items-center justify-center p-6 lg:p-10 select-none">

            {/* 360° toggle */}
            <div className="absolute top-6 left-6 z-20 flex gap-2">
              <button
                data-testid="toggle-360-btn"
                onClick={() => { setIs360Mode((v) => !v); setTilt({ x: 0, y: 0 }); setZoomed(false); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-light tracking-widest uppercase border transition-all duration-300 ${
                  is360Mode
                    ? 'bg-primary text-primary-foreground border-primary shadow-gold-glow'
                    : 'bg-card/80 text-foreground/60 border-primary/20 hover:border-primary/50 hover:text-foreground'
                }`}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                360°
              </button>
            </div>

            {/* Main viewer */}
            <div
              ref={imgRef}
              className={`relative w-full flex-1 flex items-center justify-center overflow-hidden ${
                is360Mode && isCurrentImage ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
              onMouseMove={(e) => { handleMouseMove(e); handleDragMove(e); }}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
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
                  className={`relative transition-transform duration-200 ${!is360Mode ? 'cursor-zoom-in' : ''}`}
                  style={
                    is360Mode
                      ? {
                          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                          transition: dragStart ? 'none' : 'transform 0.15s ease-out',
                        }
                      : zoomed
                      ? { transform: 'scale(1.55)', cursor: 'zoom-out', transition: 'transform 0.4s ease' }
                      : { transform: 'scale(1)', transition: 'transform 0.4s ease' }
                  }
                  onClick={() => { if (!is360Mode) setZoomed((z) => !z); }}
                >
                  <img
                    src={currentMedia.url}
                    alt={fullProduct.name}
                    className="max-w-full max-h-[65vh] object-contain"
                    draggable={false}
                  />

                  {/* Zoom hint */}
                  {!is360Mode && !zoomed && (
                    <div className="absolute bottom-2 right-2 h-7 w-7 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center pointer-events-none">
                      <ZoomIn className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                </div>
              )}

              {/* 360° drag hint */}
              {is360Mode && isCurrentImage && !dragStart && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full text-xs text-foreground/60 font-light tracking-wide pointer-events-none">
                  ← Ziehen zum Drehen →
                </div>
              )}

              {/* Navigation Arrows (hidden in 360 mode) */}
              {gallery.length > 1 && !is360Mode && !zoomed && (
                <>
                  <button
                    onClick={prevImage}
                    data-testid="gallery-prev-btn"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    data-testid="gallery-next-btn"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2 mt-4 flex-shrink-0">
                {gallery.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => { setCurrentImageIndex(index); setZoomed(false); }}
                    data-testid={`gallery-thumb-${index}`}
                    className={`h-14 w-14 rounded-lg overflow-hidden border-2 transition-all duration-300 relative flex-shrink-0 ${
                      index === currentImageIndex
                        ? 'border-primary shadow-gold-glow'
                        : 'border-primary/20 hover:border-primary/50'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <>
                        <video src={media.url} className="w-full h-full object-cover" muted />
                        <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                          <div className="w-5 h-5 rounded-full bg-primary/80 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 16 16">
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

          {/* ── Right Side – Details ── */}
          <div className="relative overflow-y-auto p-8 lg:p-10">
            <DialogTitle className="sr-only">{fullProduct.name}</DialogTitle>

            <div className="space-y-7">
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
                <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-5">
                  {fullProduct.name}
                </h2>
                <p className="font-serif text-4xl font-semibold text-primary">{fullProduct.price}</p>
              </div>

              {/* Description */}
              <div className="border-t border-b border-primary/20 py-5">
                <p className="text-foreground/80 leading-relaxed font-light text-base">
                  {fullProduct.description}
                </p>
              </div>

              {/* Technical Details */}
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                  Technische Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    ['Material', fullProduct.material],
                    ['Verarbeitung', 'Handgefertigt'],
                    ['Herkunft', 'Deutschland'],
                    ['Garantie', 'Lifetime'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-foreground/50 font-light mb-1">{label}</p>
                      <p className="text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2.5">
                {[
                  'Jedes Stück wird individuell von Leon Gogoll gefertigt',
                  'Zertifizierte Edelsteine mit Echtheitszertifikat',
                  'Kostenlose Gravur und luxuriöse Geschenkverpackung',
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground/80 font-light">{f}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
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
                      isWishlisted(fullProduct.id)
                        ? 'bg-primary/20 text-primary border-primary/50'
                        : 'hover:bg-primary/10'
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

              {/* Consultation CTA */}
              <div className="bg-gradient-accent rounded-xl p-6 border border-primary/20">
                <p className="text-sm text-foreground/80 font-light mb-3">
                  Fragen zu diesem Meisterwerk?
                </p>
                <Button
                  variant="ghost"
                  data-testid="product-detail-beratung-btn"
                  className="text-primary hover:bg-primary/10 font-light p-0 h-auto hover:underline"
                  onClick={handleBeratung}
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
