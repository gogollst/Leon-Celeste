import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'Über uns', href: '#about' },
      { name: 'Unsere Geschichte', href: '#about' },
      { name: 'Handwerkskunst', href: '#about' },
      { name: 'Journal', href: '#journal' },
    ],
    shop: [
      { name: 'Alle Kollektionen', href: '#collections' },
      { name: 'Signature Stücke', href: '#signature' },
      { name: 'Ringe', href: '#collections' },
      { name: 'Ketten', href: '#collections' },
      { name: 'Ohrringe', href: '#collections' },
    ],
    service: [
      { name: 'Kontakt', href: '#contact' },
      { name: 'Versand & Lieferung', href: '#' },
      { name: 'Rückgabe & Umtausch', href: '#' },
      { name: 'Garantie', href: '#' },
      { name: 'FAQ', href: '#' },
    ],
    legal: [
      { name: 'Impressum', href: '#' },
      { name: 'Datenschutz', href: '#' },
      { name: 'AGB', href: '#' },
      { name: 'Widerrufsrecht', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-sapphire-deep border-t border-primary/20">
      <div className="absolute inset-0 grain-texture"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="https://customer-assets.emergentagent.com/job_1d70ba6d-581f-4f6a-9014-a5b70126b281/artifacts/w7fhwgh8_TDNTO.jpg"
                alt="Lion Céleste Logo"
                className="h-12 w-12"
              />
              <span className="font-serif text-2xl font-semibold text-foreground">
                Lion Céleste
              </span>
            </div>
            <p className="text-foreground/70 leading-relaxed mb-6">
              Himmlischer Luxus. Unvergessliche Stücke. Höchste Handwerkskunst von Leon Gogoll.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span>Maximilianstraße 1<br />80539 München, Deutschland</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+49 89 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>kontakt@lionceleste.de</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Unternehmen</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Service</h3>
            <ul className="space-y-2">
              {footerLinks.service.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/60 text-sm">
            © {new Date().getFullYear()} Lion Céleste by Leon Gogoll. Alle Rechte vorbehalten.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center text-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center text-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center text-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};