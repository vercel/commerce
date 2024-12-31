'use client';

import { Cart } from 'lib/woocomerce/models/cart';
import React, { createContext, useContext, useEffect, useState } from 'react';

type CartContextType = {
  cart: Cart | undefined;
  setNewCart: (cart: Cart) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const setNewCart = (cart: Cart) => {
    setCart(cart);
  };

  const fetchCart = async () => {
    try {
      const cart = await (await fetch('/api/cart')).json();
      setNewCart(cart);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setNewCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
