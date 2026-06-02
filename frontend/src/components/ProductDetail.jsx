import React, { useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Heart, ShoppingBag, Share2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductGallery } from './ProductGallery';

const PRODUCT_FEATURES = [
  'Jedes Stück wird individuell von Leon Gogoll gefertigt',
  'Zertifizierte Edelsteine mit Echtheitszertifikat',
  'Kostenlose Gravur und luxuriöse Geschenkverpackung',
];

const PRODUCT_SPECS_KEYS = [
  ['Verarbeitung', 'Handgefertigt'],
  ['Herkunft', 'Deutschland'],
  ['Garantie', 'Lifetime'],
];

export const ProductDetail = ({ product, open, onClose }) => {
  const { addToCart, setCartOpen, toggleWishlist, isWishlisted } = useCart();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!product) return null;

  const fullProduct = PRODUCTS.find((p) => p.id === product.id) || product;
  const gallery = fullProduct.gallery || [{ type: 'image', url: product.image }];
  const wishlisted = isWishlisted(fullProduct.id);

  const handleAddToCart = () => {
    addToCart(fullProduct);
    toast.success(`${fullProduct.name} zum Warenkorb hinzugefügt`);
    handleClose();
    setTimeout(() => setCartOpen(true), 300);
  };

  const handleWishlist = () => {
    toggleWishlist(fullProduct.id);
    toast(wishlisted ? 'Von der Wunschliste entfernt' : 'Zur Wunschliste hinzugefügt');
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

  const specs = [['Material', fullProduct.material], ...PRODUCT_SPECS_KEYS];

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}
    >
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
          {/* Gallery – extracted to ProductGallery component */}
          <ProductGallery
            key={fullProduct.id}
            gallery={gallery}
            productName={fullProduct.name}
          />

          {/* Product Info */}
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
                  {specs.map(([label, value]) => (
                    <div key={label}>
                      <p className="text-foreground/50 font-light mb-1">{label}</p>
                      <p className="text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2.5">
                {PRODUCT_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground/80 font-light">{feature}</p>
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
                      wishlisted ? 'bg-primary/20 text-primary border-primary/50' : 'hover:bg-primary/10'
                    }`}
                    onClick={handleWishlist}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${wishlisted ? 'fill-current' : ''}`} />
                    {wishlisted ? 'Gemerkt' : 'Merken'}
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
