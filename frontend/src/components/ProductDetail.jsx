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
      2: [ // Collier Infini cœur
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/my3vvlui_PXL_20260329_092814300.MP.jpg'
        },
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/7fiemkw2_grok-image-09e98175-2ac8-4850-a8ad-026731ab11ab.png'
        },
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/kqhc9oe1_grok-image-306cdc1d-2f2d-4b2b-ac60-a73276083d82.png'
        },
        {
          type: 'video',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/947jy70c_grok-video-306cdc1d-2f2d-4b2b-ac60-a73276083d82.mp4'
        },
      ],
      3: [ // Anneau du démon - Der Dämonenring
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/ol249chw_PXL_20260329_092616320.MP.jpg'
        },
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/e244gkbl_grok-image-8bc13942-8091-4f3b-8e60-f91487044709.png'
        },
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/3nbfg9k7_grok-image-57b232c3-2d6c-47e6-97d1-2d07dcbd708d.png'
        },
        {
          type: 'video',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/lm14ctz1_grok-video-9cab6c3b-8c16-4e1e-a05a-61b7435cf4e7.mp4'
        },
      ],
      4: [ // Bracelet de l'infini - Das Unendlichkeitsarmband
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/w673ehs9_PXL_20260329_092604344.MP.jpg'
        },
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/9o5upor7_grok-image-01615741-8ceb-4ca5-ba0a-c9856da8359c.png'
        },
        {
          type: 'image',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/4mkim7vc_grok-image-d7dee61e-bf9d-407b-a421-3fa3ba77bf12.png'
        },
        {
          type: 'video',
          url: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/tlyjwren_grok-video-47115dfc-0120-4d5c-b33c-9853915ae336.mp4'
        },
      ],
      5: [ // Céleste Éternité
        { type: 'image', url: 'https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800' },
      ],
      5: [ // Lion Majestueux
        { type: 'image', url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?w=800' },
      ],
      6: [ // Ange de Lumière
        { type: 'image', url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1630019329803-9da9c8c8d3e5?w=800' },
      ],
      7: [ // Couronne Céleste
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
            {/* Main Image/Video */}
            <div className="relative w-full h-full flex items-center justify-center">
              {gallery[currentImageIndex].type === 'video' ? (
                <video
                  src={gallery[currentImageIndex].url}
                  className="max-w-full max-h-full object-contain"
                  controls
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <img
                  src={gallery[currentImageIndex].url}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              )}
              
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
                {gallery.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
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
                              <path d="M3 2v12l10-6z"/>
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <img src={media.url} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    )}
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
