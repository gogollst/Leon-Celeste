import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { ShoppingBag, Trash2, X, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

/* ── Sub-components ─────────────────────────────────────────────────────── */

const CartItem = ({ item, onRemove }) => (
  <div
    data-testid={`cart-item-${item.id}`}
    className="flex gap-4 p-4 bg-background/40 rounded-lg border border-primary/10"
  >
    <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-primary font-light tracking-widest uppercase mb-1">
        {item.subtitle}
      </p>
      <h4 className="font-serif text-base font-semibold text-foreground truncate">{item.name}</h4>
      <p className="text-xs text-foreground/60 font-light mt-1">{item.material}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="font-serif text-lg font-semibold text-primary">{item.price}</span>
        <button
          onClick={onRemove}
          data-testid={`remove-cart-item-${item.id}`}
          className="h-8 w-8 rounded-full flex items-center justify-center text-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

const OrderConfirmation = ({ onClose }) => (
  <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
      <CheckCircle className="h-10 w-10 text-primary" />
    </div>
    <div>
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
        Bestellung eingegangen
      </h3>
      <p className="text-foreground/70 font-light leading-relaxed text-sm">
        Vielen Dank für Ihr Vertrauen. Leon Gogoll wird sich persönlich bei Ihnen melden,
        um alle Details Ihres Meisterwerks zu besprechen.
      </p>
    </div>
    <div className="bg-gradient-accent rounded-lg p-5 border border-primary/20 w-full">
      <p className="text-xs text-primary font-light tracking-widest uppercase mb-2">
        Nächster Schritt
      </p>
      <p className="text-sm text-foreground/80 font-light">
        Persönliche Beratung innerhalb von 24 Stunden
      </p>
    </div>
    <Button
      onClick={onClose}
      className="w-full bg-primary hover:bg-accent text-primary-foreground font-light tracking-wide"
    >
      Weiter einkaufen
    </Button>
  </div>
);

const EmptyCart = ({ onClose }) => (
  <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-5">
    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
      <ShoppingBag className="h-10 w-10 text-primary/50" />
    </div>
    <div>
      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
        Ihr Warenkorb ist leer
      </h3>
      <p className="text-foreground/60 font-light text-sm">
        Entdecken Sie unsere exklusiven Meisterwerke
      </p>
    </div>
    <Button
      onClick={onClose}
      variant="outline"
      className="border-primary/30 hover:bg-primary/10 font-light"
    >
      Kollektion entdecken
    </Button>
  </div>
);

const CartSummary = ({ cartTotal, onCheckout }) => (
  <div className="px-6 py-6 border-t border-primary/20 space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-foreground/70 font-light">Gesamt</span>
      <span className="font-serif text-2xl font-semibold text-primary">{cartTotal} €</span>
    </div>
    <p className="text-xs text-foreground/50 font-light">
      Inkl. MwSt. · Zzgl. individuelle Anfertigung
    </p>
    <Button
      size="lg"
      data-testid="checkout-btn"
      className="w-full bg-primary hover:bg-accent text-primary-foreground font-light tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-gold-glow"
      onClick={onCheckout}
    >
      Jetzt anfragen
    </Button>
    <p className="text-center text-xs text-foreground/40 font-light">
      Sichere & persönliche Bestellung
    </p>
  </div>
);

/* ── Main Cart component ─────────────────────────────────────────────────── */

export const Cart = () => {
  const { cartItems, cartTotal, cartOpen, setCartOpen, removeFromCart, clearCart } = useCart();
  const [checkoutDone, setCheckoutDone] = useState(false);

  const handleCheckout = () => {
    setCheckoutDone(true);
    clearCart();
  };

  const handleClose = () => {
    setCartOpen(false);
    setCheckoutDone(false);
  };

  const renderContent = () => {
    if (checkoutDone) return <OrderConfirmation onClose={handleClose} />;
    if (cartItems.length === 0) return <EmptyCart onClose={handleClose} />;
    return (
      <>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => {
                removeFromCart(item.id);
                toast('Aus dem Warenkorb entfernt');
              }}
            />
          ))}
        </div>
        <CartSummary cartTotal={cartTotal} onCheckout={handleCheckout} />
      </>
    );
  };

  return (
    <Sheet open={cartOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] bg-card border-primary/20 p-0 flex flex-col"
      >
        <SheetHeader className="px-6 py-6 border-b border-primary/20">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-2xl font-semibold text-foreground flex items-center gap-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
              Warenkorb
            </SheetTitle>
            <button
              onClick={handleClose}
              data-testid="cart-close-btn"
              className="h-9 w-9 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-all duration-300"
            >
              <X className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </SheetHeader>
        {renderContent()}
      </SheetContent>
    </Sheet>
  );
};
