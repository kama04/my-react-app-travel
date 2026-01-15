import React, { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

const LS_KEY = "travel_dz_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) setItems(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (tour) => {
    setItems((prev) => {
      const exists = prev.find((x) => x.id === tour.id);
      if (exists) {
        return prev.map((x) => (x.id === tour.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { ...tour, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

  const inc = (id) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));

  const dec = (id) =>
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))
        .filter((x) => x.qty > 0)
    );

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, x) => sum + x.price * x.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, inc, dec, clear, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
