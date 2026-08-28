import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { toast } from 'sonner';

export const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Danke! Du erhältst bald News von mir.');
  };

  return (
    <footer className="relative bg-gradient-soft border-t border-border">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-gold mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-display text-3xl font-bold text-foreground mb-4">Stay Connected</h3>
          <p className="text-muted-foreground mb-6">
            Erhalte exklusive Updates zu neuen Kollektionen und limitierten Editionen.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Deine E-Mail"
              required
              className="flex-1 h-12 bg-white border-border focus:border-primary rounded-full px-6"
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 px-8 bg-gradient-gold hover:shadow-gold text-white font-semibold rounded-full transition-all duration-300"
            >
              Anmelden
            </Button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-border">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/assets/logo-lion-celeste.jpg"
                alt="Lion Céleste"
                className="h-12 w-12"
              />
              <span className="font-display text-2xl font-bold text-foreground">
                Lion Céleste
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Moderne Luxus-Schmuckkunst von Leon Gogoll. Innovation, Freiheit und zeitlose Eleganz in jedem Stück.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#collections" className="text-muted-foreground hover:text-primary transition-colors">Kollektionen</a></li>
              <li><a href="#signature" className="text-muted-foreground hover:text-primary transition-colors">Signature Stücke</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">Über mich</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Kontakt</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>München, Deutschland</li>
              <li>kontakt@lionceleste.de</li>
              <li>+49 89 1234 5678</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Lion Céleste by Leon Gogoll. Alle Rechte vorbehalten.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-gradient-gold hover:text-white flex items-center justify-center text-primary transition-all duration-300">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-gradient-gold hover:text-white flex items-center justify-center text-primary transition-all duration-300">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-gradient-gold hover:text-white flex items-center justify-center text-primary transition-all duration-300">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};