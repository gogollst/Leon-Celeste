import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { PRODUCTS } from '../data/products';
import { CheckCircle, Mail, Phone, User, MessageSquare, Gem } from 'lucide-react';

const RING_SIZES = ['44', '46', '48', '50', '52', '54', '56', '58', '60', '62', '64', '66', '68'];
const BRACELET_SIZES = ['15 cm', '16 cm', '17 cm', '18 cm', '19 cm', '20 cm', '21 cm', '22 cm'];

export const ConsultationSection = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    product: '',
    size: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedProduct = PRODUCTS.find((p) => p.id === Number(form.product));
  const needsSize = selectedProduct
    ? selectedProduct.category === 'rings' || selectedProduct.category === 'bracelets'
    : false;
  const sizeOptions = selectedProduct?.category === 'bracelets' ? BRACELET_SIZES : RING_SIZES;
  const sizeLabel = selectedProduct?.category === 'bracelets' ? 'Armbandlänge' : 'Ringgröße';

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'product') setForm((prev) => ({ ...prev, [field]: value, size: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setForm({ firstName: '', lastName: '', email: '', phone: '', product: '', size: '', message: '' });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-deep"></div>
      <div className="absolute inset-0 grain-texture"></div>
      {/* Decorative gold line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-xs font-light tracking-[0.3em] uppercase">
            Exklusiver Service
          </span>
          <h2 className="font-serif text-5xl lg:text-6xl font-semibold text-foreground mt-5 mb-6">
            Persönliche Beratung
          </h2>
          <p className="text-foreground/70 font-light leading-relaxed text-lg">
            Jedes Meisterwerk beginnt mit einem Gespräch. Leon Gogoll berät Sie persönlich und
            erschafft Ihr individuelles Schmuckstück – maßgeschneidert für Sie.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {submitted ? (
            /* Success State */
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-12 text-center space-y-6 animate-fade-in">
              <div className="h-20 w-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-3xl font-semibold text-foreground mb-3">
                  Anfrage erhalten
                </h3>
                <p className="text-foreground/70 font-light leading-relaxed">
                  Vielen Dank, <span className="text-primary">{form.firstName}</span>. Leon Gogoll
                  wird sich innerhalb von 24 Stunden persönlich bei Ihnen melden.
                </p>
              </div>
              <div className="bg-gradient-accent border border-primary/20 rounded-xl p-5 text-left space-y-2">
                <p className="text-xs text-primary font-light tracking-widest uppercase mb-3">
                  Ihre Anfrage
                </p>
                {selectedProduct && (
                  <p className="text-sm text-foreground/80 font-light">
                    <span className="text-foreground/50">Schmuckstück:</span>{' '}
                    {selectedProduct.name}
                  </p>
                )}
                {form.size && (
                  <p className="text-sm text-foreground/80 font-light">
                    <span className="text-foreground/50">{sizeLabel}:</span> {form.size}
                  </p>
                )}
                <p className="text-sm text-foreground/80 font-light">
                  <span className="text-foreground/50">E-Mail:</span> {form.email}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={resetForm}
                className="border-primary/30 hover:bg-primary/10 font-light"
              >
                Neue Anfrage stellen
              </Button>
            </div>
          ) : (
            /* Form */
            <form
              onSubmit={handleSubmit}
              data-testid="consultation-form"
              className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 lg:p-12 space-y-7"
            >
              {/* Name Row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground/70 font-light text-sm flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-primary" />
                    Vorname *
                  </Label>
                  <Input
                    id="firstName"
                    data-testid="input-first-name"
                    required
                    value={form.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="Leon"
                    className="bg-background/40 border-primary/20 focus:border-primary text-foreground placeholder:text-foreground/30 font-light h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground/70 font-light text-sm flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-primary" />
                    Nachname *
                  </Label>
                  <Input
                    id="lastName"
                    data-testid="input-last-name"
                    required
                    value={form.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Gogoll"
                    className="bg-background/40 border-primary/20 focus:border-primary text-foreground placeholder:text-foreground/30 font-light h-12"
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/70 font-light text-sm flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    E-Mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    data-testid="input-email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="name@email.de"
                    className="bg-background/40 border-primary/20 focus:border-primary text-foreground placeholder:text-foreground/30 font-light h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground/70 font-light text-sm flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    Telefon
                    <span className="text-foreground/40 text-xs">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    data-testid="input-phone"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+49 89 ..."
                    className="bg-background/40 border-primary/20 focus:border-primary text-foreground placeholder:text-foreground/30 font-light h-12"
                  />
                </div>
              </div>

              {/* Product Selection */}
              <div className="space-y-2">
                <Label className="text-foreground/70 font-light text-sm flex items-center gap-2">
                  <Gem className="h-3.5 w-3.5 text-primary" />
                  Schmuckstück
                </Label>
                <Select
                  value={form.product}
                  onValueChange={(v) => handleChange('product', v)}
                >
                  <SelectTrigger
                    data-testid="select-product"
                    className="bg-background/40 border-primary/20 focus:border-primary text-foreground font-light h-12"
                  >
                    <SelectValue placeholder="Welches Stück interessiert Sie?" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-primary/20">
                    {PRODUCTS.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)} className="font-light">
                        {p.name} — {p.price}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom" className="font-light text-primary">
                      Individueller Wunsch
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Size Selection (conditional) */}
              {needsSize && (
                <div className="space-y-2 animate-fade-in">
                  <Label className="text-foreground/70 font-light text-sm flex items-center gap-2">
                    <Gem className="h-3.5 w-3.5 text-primary" />
                    {sizeLabel}
                  </Label>
                  <Select
                    value={form.size}
                    onValueChange={(v) => handleChange('size', v)}
                  >
                    <SelectTrigger
                      data-testid="select-size"
                      className="bg-background/40 border-primary/20 focus:border-primary text-foreground font-light h-12"
                    >
                      <SelectValue placeholder={`${sizeLabel} wählen`} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-primary/20">
                      {sizeOptions.map((size) => (
                        <SelectItem key={size} value={size} className="font-light">
                          {size}
                          {selectedProduct?.category === 'rings' && ' mm'}
                        </SelectItem>
                      ))}
                      <SelectItem value="unknown" className="font-light text-foreground/60">
                        Weiß nicht (wird beraten)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {selectedProduct?.category === 'rings' && (
                    <p className="text-xs text-foreground/40 font-light mt-1">
                      Innendurchmesser in mm · Nicht sicher? Leon berät Sie beim Termin.
                    </p>
                  )}
                </div>
              )}

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground/70 font-light text-sm flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-primary" />
                  Ihre Wünsche
                  <span className="text-foreground/40 text-xs">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  data-testid="input-message"
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Beschreiben Sie Ihren Wunsch, besondere Anlässe oder Personalisierungen..."
                  rows={4}
                  className="bg-background/40 border-primary/20 focus:border-primary text-foreground placeholder:text-foreground/30 font-light resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2 space-y-4">
                <Button
                  type="submit"
                  size="lg"
                  data-testid="consultation-submit-btn"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-accent text-primary-foreground font-light tracking-wide text-base h-14 transition-all duration-300 hover:scale-[1.01] shadow-gold-glow disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Wird gesendet...
                    </span>
                  ) : (
                    'Beratungstermin anfragen'
                  )}
                </Button>
                <p className="text-center text-xs text-foreground/40 font-light">
                  Ihre Daten werden vertraulich behandelt · Antwort innerhalb von 24 Stunden
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
