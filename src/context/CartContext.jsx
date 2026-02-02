import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("modernmen_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  /* 🔁 SYNC WITH LOCALSTORAGE */
  useEffect(() => {
    localStorage.setItem("modernmen_cart", JSON.stringify(cart));
  }, [cart]);

  /* ➕ ADD TO CART */
  const addToCart = (product, options = {}) => {
    setCart(prev => {
      const existing = prev.find(
        item =>
          item.id === product.id &&
          item.size === options.size
      );

      if (existing) {
        return prev.map(item =>
          item === existing
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
          size: options.size || "M",
          qty: 1
        }
      ];
    });
  };

  /* ➕➖ UPDATE QTY */
  const updateQty = (id, delta) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter(item => item.qty > 0)
    );
  };

  /* ❌ REMOVE ITEM */
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  /* 🧹 CLEAR CART (OPTIONAL) */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("modernmen_cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
