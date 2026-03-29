import React from 'react';
import { Sparkles, Zap, Heart } from 'lucide-react';

export const BrandStory = () => {
  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-soft opacity-50"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-in order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <img
                src="https://images.unsplash.com/photo-1511306162219-1c5a469ab86c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW5zaGlwfGVufDB8fHxibGFja3wxNzc0NzY4NTgwfDA&ixlib=rb-4.1.0&q=85"
                alt="Handwerkskunst"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-gold border border-primary/10">
              <img
                src="https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/j6me6snb_logo-lion-celetse.jpg"
                alt="Lion Céleste"
                className="h-20 w-20"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8 animate-fade-in-up order-1 lg:order-2">
            <div className="inline-block">
              <span className="text-primary text-sm font-bold tracking-wider uppercase">Meine Vision</span>
              <div className="h-1 w-16 bg-gradient-gold mt-2 rounded-full"></div>
            </div>

            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight tracking-tight">
              Moderne Kunst trifft Handwerk
            </h2>

            <div className="space-y-6 text-muted-foreground text-base lg:text-lg leading-relaxed">
              <p>
                <span className="text-primary font-bold text-2xl">H</span>allo! Ich bin <span className="text-primary font-semibold">Leon Gogoll</span>, und ich kreiere Schmuck für die moderne Frau. Meine Designs sind frisch, mutig und zeitgenössisch – genau wie du.
              </p>
              <p>
                Jedes Stück ist ein Ausdruck von <span className="text-primary font-semibold">Innovation und Freiheit</span>. Ich glaube an Luxus, der nicht altbacken ist, sondern voller Leben steckt.
              </p>
              <p>
                Meine Mission? Schmuck zu schaffen, der <span className="text-primary font-semibold italic">deine Geschichte erzählt</span> – authentisch, individuell, unvergesslich.
              </p>
            </div>

            {/* Icon Features */}
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col items-start space-y-3 p-6 rounded-2xl bg-gradient-accent border border-primary/10 hover:shadow-md transition-all duration-500">
                <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-foreground">Innovativ</span>
              </div>
              <div className="flex flex-col items-start space-y-3 p-6 rounded-2xl bg-gradient-accent border border-primary/10 hover:shadow-md transition-all duration-500">
                <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-foreground">Modern</span>
              </div>
              <div className="flex flex-col items-start space-y-3 p-6 rounded-2xl bg-gradient-accent border border-primary/10 hover:shadow-md transition-all duration-500">
                <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-foreground">Authentisch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};