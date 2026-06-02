import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { ProductDetail } from './ProductDetail';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export const CollectionShop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, setCartOpen, toggleWishlist, isWishlisted } = useCart();

  const categories = [
    { value: 'all', label: 'Alle' },
    { value: 'rings', label: 'Ringe' },
    { value: 'necklaces', label: 'Ketten' },
    { value: 'bracelets', label: 'Armbänder' },
  ];

  const filteredProducts =
    activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} zum Warenkorb hinzugefügt`);
    setCartOpen(true);
  };

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    toast(isWishlisted(product.id) ? 'Von der Wunschliste entfernt' : 'Zur Wunschliste hinzugefügt');
  };

  return (
    <section id="collections" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-luxury"></div>
      <div className="absolute inset-0 grain-texture"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Die Kollektion</span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mt-4 mb-6">
            Zeitlose Eleganz
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Entdecken Sie unsere exklusive Auswahl an handgefertigten Schmuckstücken, die Ihre Persönlichkeit unterstreichen.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
            <TabsList className="bg-card/50 backdrop-blur-sm border border-primary/20">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  data-testid={`filter-${cat.value}`}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/70">Sortieren:</span>
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px] bg-card/50 backdrop-blur-sm border-primary/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Empfohlen</SelectItem>
                <SelectItem value="price-low">Preis aufsteigend</SelectItem>
                <SelectItem value="price-high">Preis absteigend</SelectItem>
                <SelectItem value="newest">Neueste</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              data-testid={`collection-product-${product.id}`}
              className="group relative bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-gold animate-fade-in-up flex flex-col cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>

                {/* Wishlist Quick Action */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    data-testid={`collection-wishlist-btn-${product.id}`}
                    className={`h-10 w-10 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                      isWishlisted(product.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card/90 hover:bg-primary hover:text-primary-foreground'
                    }`}
                    onClick={(e) => handleWishlist(e, product)}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 flex flex-col flex-grow">
                <div className="flex-grow">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={`${product.id}-star-${i}`} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{product.name}</h3>
                  <p className="text-sm text-primary/80 mt-1">{product.material}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-primary/20 mt-auto">
                  <span className="font-serif text-2xl font-bold text-primary">{product.price}</span>
                  <Button
                    size="sm"
                    data-testid={`collection-add-to-cart-${product.id}`}
                    className="bg-primary hover:bg-accent text-primary-foreground transition-all duration-300"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    In den Korb
                  </Button>
                </div>
              </div>
            </Card>
          ))}
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
