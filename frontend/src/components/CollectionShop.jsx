import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, ShoppingBag, Star } from 'lucide-react';

export const CollectionShop = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Les Ailes d\'Ange',
      category: 'rings',
      price: '22.500 €',
      image: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/l2elv9we_PXL_20260329_064714711_exported_1774766860186.jpg',
      rating: 5,
      material: 'Sterling Silber & 18K Gold',
      description: 'Signature Angel Ring',
    },
    {
      id: 2,
      name: 'Collier Infini cœur',
      category: 'necklaces',
      price: '16.900 €',
      image: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/my3vvlui_PXL_20260329_092814300.MP.jpg',
      rating: 5,
      material: '18K Gold & Saphire',
      description: 'Infinite Heart Necklace',
    },
    {
      id: 3,
      name: 'Anneau du démon',
      category: 'rings',
      price: '19.500 €',
      image: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/ol249chw_PXL_20260329_092616320.MP.jpg',
      rating: 5,
      material: 'Geschwärztes Sterling Silber',
      description: 'The Demon Ring',
    },
    {
      id: 4,
      name: 'Bracelet de l\'infini',
      category: 'bracelets',
      price: '14.800 €',
      image: 'https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/w673ehs9_PXL_20260329_092604344.MP.jpg',
      rating: 5,
      material: 'Vergoldetes Sterling Silber',
      description: 'The Infinity Bracelet',
    },
  ];

  const categories = [
    { value: 'all', label: 'Alle' },
    { value: 'rings', label: 'Ringe' },
    { value: 'necklaces', label: 'Ketten' },
    { value: 'bracelets', label: 'Armbänder' },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

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
          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
            <TabsList className="bg-card/50 backdrop-blur-sm border border-primary/20">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Sort */}
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group relative bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-gold animate-fade-in-up flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 flex flex-col flex-grow">
                <div className="flex-grow">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{product.name}</h3>
                  <p className="text-sm text-primary/80 mt-1">{product.material}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-primary/20 mt-auto">
                  <span className="font-serif text-2xl font-bold text-primary">{product.price}</span>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-accent text-primary-foreground transition-all duration-300"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    In den Korb
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary font-medium px-10 py-6 text-lg rounded-lg transition-all duration-500"
          >
            Mehr laden
          </Button>
        </div>
      </div>
    </section>
  );
};