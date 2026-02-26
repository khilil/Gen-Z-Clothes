import { createContext, useContext, useEffect, useState } from "react";
import * as cartService from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* 🔄 INITIAL FETCH FROM BACKEND */
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await cartService.getCart();
        const formattedItems = res.data.items.map(item => {
          const product = item.product;
          // Find the active variant to get size/color names
          const variant = product.variants?.find(v =>
            v._id?.toString() === item.variantId?.toString() ||
            v.id === item.variantId?.toString() ||
            v.sku === item.variantId?.toString()
          );

          return {
            cartItemId: item._id, // Use for removal
            id: product._id,
            title: product.title,
            price: product.price,
            image: variant?.images?.[0]?.url || product.images?.[0]?.url,
            qty: item.quantity,
            variantId: item.variantId,
            size: variant?.size?.name || "N/A",
            color: variant?.color?.name || "N/A"
          };
        });
        setCart(formattedItems);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  /* ➕ ADD TO CART */
  const addToCart = async (product, options = {}) => {
    try {
      const res = await cartService.addToCart(product._id || product.id, options.variantId, 1);

      // Full refresh of cart state from backend response for absolute accuracy
      const formattedItems = res.data.items.map(item => {
        const prodId = item.product._id ? item.product._id.toString() : item.product.toString();
        const searchId = (product._id || product.id).toString();

        const prod = prodId === searchId ? product : (item.product);
        // Find variant by ID or SKU (res.data.items[].variantId might be the ID resolved by backend)
        const variant = prod.variants?.find(v =>
          v._id === item.variantId ||
          v.sku === item.variantId
        );

        return {
          cartItemId: item._id,
          id: prod._id,
          title: prod.title,
          price: prod.price,
          image: variant?.images?.[0]?.url || prod.images?.[0]?.url,
          qty: item.quantity,
          variantId: item.variantId, // The backend likely stored the _id here
          size: variant?.size?.name || options.size || "N/A",
          color: variant?.color?.name || options.color || "N/A"
        };
      });
      setCart(formattedItems);
    } catch (error) {
      console.error("Add to cart failed:", error);
      throw error;
    }
  };

  /* ➕➖ UPDATE QTY */
  const updateQty = async (productId, variantId, newQty) => {
    if (newQty < 1) return;
    try {
      await cartService.updateCartItem(productId, variantId, newQty);
      setCart(prev => prev.map(item =>
        item.variantId === variantId ? { ...item, qty: newQty } : item
      ));
    } catch (error) {
      console.error("Update qty failed:", error);
      throw error;
    }
  };

  /* ❌ REMOVE ITEM */
  const removeItem = async (cartItemId) => {
    try {
      await cartService.removeFromCart(cartItemId);
      setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    } catch (error) {
      console.error("Remove item failed:", error);
    }
  };

  /* 🧹 CLEAR CART */
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
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
