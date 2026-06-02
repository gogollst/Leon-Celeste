import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lionceleste_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lionceleste_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  // localStorage is a stable browser global — no need to include it in deps
  useEffect(() => {
    localStorage.setItem('lionceleste_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('lionceleste_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems
        .reduce((sum, item) => sum + item.priceValue * item.quantity, 0)
        .toLocaleString('de-DE'),
    [cartItems]
  );

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback(
    (productId) => wishlist.includes(productId),
    [wishlist]
  );

  const contextValue = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      cartOpen,
      setCartOpen,
      addToCart,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      isWishlisted,
    }),
    [
      cartItems,
      cartCount,
      cartTotal,
      cartOpen,
      addToCart,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      isWishlisted,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
