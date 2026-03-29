import React from 'react';
import { Sparkles, Crown, Heart } from 'lucide-react';

export const BrandStory = () => {
  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-luxury"></div>
      <div className="absolute inset-0 grain-texture"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-lg overflow-hidden shadow-elegant">
              <img
                src="https://images.unsplash.com/photo-1511306162219-1c5a469ab86c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW5zaGlwfGVufDB8fHxibGFja3wxNzc0NzY4NTgwfDA&ixlib=rb-4.1.0&q=85"
                alt="Handwerkskunst Lion Céleste"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
            </div>
            {/* Floating Logo */}
            <div className="absolute -bottom-8 -right-8 bg-card/90 backdrop-blur-sm p-6 rounded-lg shadow-gold border border-primary/20">
              <img
                src="https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/w7fhwgh8_TDNTO.jpg"
                alt="Lion Céleste Logo"
                className="h-20 w-20"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="text-primary text-sm font-medium tracking-widest uppercase">Unsere Geschichte</span>
              <div className="h-0.5 w-20 bg-primary mt-2"></div>
            </div>

            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Der himmlische Löwe
            </h2>

            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p>
                <span className="text-primary font-serif text-2xl">L</span>ion Céleste vereint die majestätische Kraft des Löwen mit der himmlischen Reinheit eines Engels. Geboren aus der Vision von <span className="text-primary font-medium">Leon Gogoll</span>, erschaffen wir Schmuckstücke, die nicht nur getragen, sondern gefühlt werden.
              </p>
              <p>
                Jedes unserer Stücke ist ein Meisterwerk höchster Handwerkskunst. Mit Leidenschaft und Hingabe verwandeln wir edle Materialien in unvergessliche Signature-Stücke, die Geschichten erzählen und Generationen überdauern.
              </p>
              <p>
                Unsere Philosophie ist einfach: <span className="text-primary font-medium italic">Perfektion in jedem Detail</span>. Von der ersten Skizze bis zum finalen Schliff – wir akzeptieren nur das Außergewöhnliche.
              </p>
            </div>

            {/* Icon Features */}
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 transition-all duration-500">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Crown className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Königliche Qualität</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 transition-all duration-500">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Zeitlose Eleganz</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 transition-all duration-500">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Mit Leidenschaft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};