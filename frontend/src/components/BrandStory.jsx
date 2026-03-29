import React from 'react';
import { Gem, Award, Shield } from 'lucide-react';

export const BrandStory = () => {
  return (
    <section id="about" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-sapphire-gold"></div>
      <div className="absolute inset-0 grain-texture"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-in">
            <div className="relative overflow-hidden shadow-premium">
              <img
                src="https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/22ojlxkv_grok-image-dcd140ce-1db2-431d-8de8-ef2b1bc8d013.png"
                alt="Leon Gogoll - Designer & Gründer"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-card/95 backdrop-blur-sm p-8 shadow-gold-glow border border-primary/20">
              <img
                src="https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/j6me6snb_logo-lion-celetse.jpg"
                alt="Lion Céleste"
                className="h-24 w-24"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-10 animate-fade-in-up">
            <div>
              <span className="text-primary text-xs font-light tracking-[0.3em] uppercase">Die Vision</span>
              <div className="h-px w-16 bg-primary mt-3"></div>
            </div>

            <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight">
              Der himmlische Löwe
            </h2>

            <div className="space-y-6 text-foreground/70 text-lg leading-relaxed font-light">
              <p>
                <span className="text-primary font-serif text-3xl mr-2">L</span>ion Céleste vereint die majestätische Kraft des Löwen mit der himmlischen Reinheit eines Engels. Jedes Stück ist eine Hommage an zeitlose Eleganz und höchste Handwerkskunst.
              </p>
              <p>
                <span className="text-foreground font-normal">Leon Gogoll</span>, der kreative Kopf hinter Lion Céleste, erschafft Schmuck für Menschen, die das Außergewöhnliche suchen. Seine Designs sind mehr als Accessoires – sie sind unvergessliche Statements.
              </p>
              <p className="text-foreground/90 italic">
                „Jedes meiner Stücke trägt eine Seele. Es soll nicht nur getragen, sondern gefühlt werden.“
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary/20">
              <div className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Gem className="h-7 w-7 text-primary" />
                </div>
                <p className="text-sm text-foreground/80 font-light">Höchste<br />Qualität</p>
              </div>
              <div className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <p className="text-sm text-foreground/80 font-light">Zeitlose<br />Eleganz</p>
              </div>
              <div className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <p className="text-sm text-foreground/80 font-light">Lifetime<br />Garantie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};