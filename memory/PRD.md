# Lion Céleste – PRD (Product Requirements Document)

## Original Problem Statement
Create a fully responsive, high-end luxury jewelry prototype website for "Lion Céleste" by Leon Gogoll. Positioning: "Haute Joaillerie" (Cartier/Van Cleef & Arpels tier). Design: dark luxury aesthetic with Royal Sapphire Blue and warm Gold. Features: 3D/minimal logo, sticky navigation, hero section, brand story, signature pieces, and a fully integrated e-commerce shop teaser.

## User
Leon Gogoll – independent jewelry designer, German language preference. All UI must be in German.

## Design System
- **Theme**: Dark Luxury – Royal Sapphire Blue (#0d1528 background) & Gold (#f0a830 primary)
- **Fonts**: Cormorant Garamond (headings), Inter (body)
- **Aesthetic**: Haute Joaillerie, cinematic, elegant, minimalist, expensive

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: None (pure frontend prototype)
- **State**: React Context (CartContext) + localStorage

## File Structure
```
/app/frontend/src/
├── App.js
├── index.css                    – Design tokens & utilities
├── data/
│   └── products.js             – SINGLE SOURCE OF TRUTH for all product data
├── context/
│   └── CartContext.jsx         – Cart & Wishlist state (localStorage-backed)
├── components/
│   ├── Navigation.jsx          – Sticky nav with cart & wishlist badges
│   ├── HeroSection.jsx         – Full-screen hero with user images
│   ├── BrandStory.jsx          – Brand history section
│   ├── SignaturePieces.jsx     – 4-piece signature grid with modal
│   ├── CollectionShop.jsx      – Filterable shop with cart/wishlist
│   ├── ProductDetail.jsx       – Dialog modal: gallery, zoom, cart, wishlist
│   ├── Cart.jsx                – Cart drawer (Sheet) with checkout mock
│   ├── WhyLionCeleste.jsx
│   ├── Testimonials.jsx
│   ├── Newsletter.jsx
│   └── Footer.jsx
└── components/ui/              – Shadcn components
```

## The 4 Masterpieces (ONLY products in the app)
1. **Les Ailes d'Ange** – Signature Angel Ring – 22.500 € – category: rings
2. **Collier Infini cœur** – Infinite Heart Necklace – 16.900 € – category: necklaces
3. **Anneau du démon** – The Demon Ring – 19.500 € – category: rings
4. **Bracelet de l'infini** – The Infinity Bracelet – 14.800 € – category: bracelets

Each has: 3 images + 1 video in gallery.

---

## What's Been Implemented

### Phase 1 – Foundation (Previous Sessions)
- [x] Dark luxury design system (CSS custom properties, HSL tokens)
- [x] Navigation with sticky scroll behavior
- [x] Hero Section with user-provided images
- [x] Brand Story section
- [x] Signature Pieces grid (4 Masterpieces)
- [x] ProductDetail Dialog modal (image & video gallery)
- [x] Collection Shop (filterable by category)
- [x] WhyLionCeleste, Testimonials, Newsletter, Footer sections

### Phase 2 – Commerce & UX (Feb 2026)
- [x] **Product data centralized** → `/src/data/products.js` (single source of truth)
- [x] **Cart functionality** → CartContext, localStorage persistence, cart drawer (Sheet)
- [x] **Wishlist** → Heart button toggle, localStorage, count badge in nav
- [x] **Cart drawer** → Shows items, totals, remove, checkout confirmation flow
- [x] **Navigation badges** → Cart count + Wishlist count displayed in nav
- [x] **CollectionShop clickable cards** → Open ProductDetail modal on click
- [x] **Zoom feature** → Click image in ProductDetail to zoom (CSS scale)
- [x] **Cart integration** → "In den Warenkorb" from both CollectionShop and ProductDetail

### Phase 4 – Code Quality (Feb 2026)
- [x] **use-toast.js** – `useEffect` deps korrigiert (`[state]` → `[]` verhindert doppelte Listener-Registrierung)
- [x] **CartContext.jsx** – `useMemo`/`useCallback` für alle Funktionen + Context-Value, verhindert unnötige Re-Renders
- [x] **Navigation.jsx + HeroSection.jsx** – `handleScroll` via `useCallback` + korrekte `useEffect` Dependencies
- [x] **ProductDetail.jsx → ProductDetail + ProductGallery** – Aufgeteilt: ~354 → ~120 Zeilen. Cyclomatic Complexity drastisch reduziert
- [x] **Cart.jsx** – Sub-Komponenten `CartItem`, `EmptyCart`, `OrderConfirmation`, `CartSummary`; nested Ternary durch `renderContent()` ersetzt
- [x] **ConsultationSection.jsx** – `handleChange` auf einzelnen `setState`-Call reduziert
- [x] **Array-Index-Keys** – Alle `key={index}` durch stabile eindeutige Keys ersetzt (WhyLionCeleste, Testimonials, CollectionShop, ProductDetail)
- [x] **server.py** – Return-Typ-Annotationen für alle API-Endpunkte ergänzt
- [x] **ConsultationSection** → Full booking form (id="contact", nav Kontakt link works)
  - Fields: Vorname, Nachname, E-Mail, Telefon, Schmuckstück, Ringgröße/Armbandlänge (conditional), Nachricht
  - Loading state, success screen with customer name + product summary, reset flow
- [x] **360° Viewer** in ProductDetail → CSS 3D perspective tilt (mouse) + drag-to-rotate (cycles gallery images)
  - Toggle button activates/deactivates mode, nav arrows hidden in 360° mode
  - "Persönliche Beratung vereinbaren" button scrolls to #contact

---

## Prioritized Backlog

### P0 – Critical (blocking launch)
- None currently blocking

### P1 – High Priority
- [ ] Real backend integration (email delivery on form submit – e.g. SendGrid or Resend)
- [ ] Checkout form with address + real order flow

### P2 – Medium Priority
- [ ] "Neue Kollektion" page or Instagram feed integration
- [ ] Product size guide / visual ring sizer
- [ ] Product size selector for rings/bracelets

### P3 – Future / Backlog
- [ ] Authentifizierung (Leon's admin panel to update products)
- [ ] Backend with real product DB (MongoDB)
- [ ] Multi-language support (DE/FR/EN)
- [ ] SEO optimization, OG tags
- [ ] Analytics integration

---

## Known Issues / Notes
- WebSocket HMR warnings in dev console (benign, dev only)
- Wishlist heart in CollectionShop is hover-only (mobile users use ProductDetail modal)
- All commerce is MOCKED – no real orders processed
- DialogContent missing aria-describedby (minor accessibility, non-functional)
