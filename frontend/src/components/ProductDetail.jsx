import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, ChevronLeft, ChevronRight, Heart, ShoppingBag, Share2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const ProductDetail = ({ product, open, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  // Gallery images - für jedes Produkt verschiedene Ansichten
  const getGalleryImages = (productId) => {
    const galleries = {
      1: [ // Les Ailes d'Ange - mit neuen Bildern und Video
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/l2elv9we_PXL_20260329_064714711_exported_1774766860186.jpg'
        },
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/mmp0sj52_grok-image-11112b3d-7f26-4eba-887c-22c8593c677e.png'
        },
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/d722ecdp_grok-image-f13ba83c-8f0a-45fc-bae0-dd0119dcb21c.png'
        },
        {
          type: 'video',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/o15ag1dm_grok-video-587b68e7-e62f-4025-8e0a-fda8dd230bc7.mp4'
        },
      ],
      2: [ // Céleste Éternité
        { type: 'image', url: 'https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800' },
      ],
      3: [ // Lion Majestueux
        { type: 'image', url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?w=800' },
      ],
      4: [ // Ange de Lumière
        { type: 'image', url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1630019329803-9da9c8c8d3e5?w=800' },
      ],
      5: [ // Couronne Céleste
        { type: 'image', url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800' },
      ],
    };
    return galleries[productId] || [{ type: 'image', url: product.image }];
  };

  const gallery = getGalleryImages(product.id);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleAddToCart = () => {
    toast.success('Zum Warenkorb hinzugefügt');
  };

  const handleAddToWishlist = () => {
    toast.success('Zur Wunschliste hinzugefügt');
  };

  const handleShare = () => {
    toast.success('Link kopiert');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-card border-primary/20 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-all duration-300"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>

        <div className="grid lg:grid-cols-2 h-full">
          {/* Left Side - Gallery */}
          <div className="relative bg-gradient-deep flex items-center justify-center p-8 lg:p-12">
            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={gallery[currentImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Navigation Arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-card/90 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
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
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'border-primary shadow-gold-glow'
                        : 'border-primary/20 hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Details */}
          <div className="relative overflow-y-auto p-8 lg:p-12">
            <DialogTitle className="sr-only">{product.name}</DialogTitle>
            
            <div className="space-y-8">
              {/* Header */}
              <div>
                {product.featured && (
                  <Badge className="bg-gradient-gold-shimmer text-primary-foreground mb-4">
                    Top-Modell
                  </Badge>
                )}
                <p className="text-xs text-primary font-light tracking-widest uppercase mb-3">
                  {product.subtitle}
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  {product.name}
                </h2>
                <p className="font-serif text-4xl font-semibold text-primary">
                  {product.price}
                </p>
              </div>

              {/* Description */}
              <div className="border-t border-b border-primary/20 py-6">
                <p className="text-foreground/80 leading-relaxed font-light text-base">
                  {product.description}
                </p>
              </div>

              {/* Detailed Specifications */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Technische Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-foreground/60 font-light mb-1">Material</p>
                    <p className="text-foreground font-normal">{product.material || '18K Gold'}</p>
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
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm text-foreground/80 font-light">
                    Jedes Stück wird individuell von Leon Gogoll gefertigt
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm text-foreground/80 font-light">
                    Zertifizierte Edelsteine mit Echtheitszertifikat
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm text-foreground/80 font-light">
                    Kostenlose Gravur und luxuriöse Geschenkverpackung
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  size="lg"
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
                    className="border-primary/30 hover:bg-primary/10 font-light"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Merken
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
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
