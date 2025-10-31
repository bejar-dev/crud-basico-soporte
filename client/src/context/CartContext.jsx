import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    if (!cartItems.find(i => i.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(i => i.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
