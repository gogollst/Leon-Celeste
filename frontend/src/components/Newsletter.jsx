import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

export const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Vielen Dank! Sie sind jetzt angemeldet.');
      setEmail('');
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-sapphire-deep"></div>
      <div className="absolute inset-0 bg-gradient-radial"></div>
      <div className="absolute inset-0 grain-texture"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6 animate-glow">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Bleiben Sie himmlisch informiert
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Erhalten Sie exklusive Einblicke in neue Kollektionen, limitierte Editionen und besondere Angebote.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 bg-card/50 backdrop-blur-sm border-primary/30 focus:border-primary text-foreground placeholder:text-foreground/50"
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 px-8 bg-primary hover:bg-accent text-primary-foreground font-medium transition-all duration-300 hover:shadow-gold"
            >
              Anmelden
            </Button>
          </form>

          <p className="text-sm text-foreground/60 mt-4">
            Wir respektieren Ihre Privatsphäre. Sie können sich jederzeit abmelden.
          </p>
        </div>
      </div>
    </section>
  );
};