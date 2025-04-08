'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Cart } from 'lib/woocomerce/models/cart';
import React, { createContext, useContext, useEffect, useState } from 'react';

type CartContextType = {
  cart?: Cart;
  setNewCart: (cart: Cart) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>();

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const cart = await res.json();
      setCart(cart);
    } catch (err) {
      console.error('Error fetching cart', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <NextUIProvider>
      <CartContext.Provider value={{ cart, setNewCart: setCart }}>{children}</CartContext.Provider>
    </NextUIProvider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
