'use client';

import { Cart } from 'lib/woocomerce/models/cart';
import React, { createContext, useContext, useEffect, useState } from 'react';

type UpdateType = 'plus' | 'minus' | 'delete';

type UpdatePayload = { key: string | number; quantity: number;};
type AddPayload = { id: string | number; quantity: number; variation: { attribute: string; value: string }[] };
type RemovePayload = { key: string | number };

type CartContextType = {
  cart: Cart | undefined;
  setNewCart: (cart: Cart) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  value,
  children,
}: {
  value: Cart;
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart | undefined>(value);
  const setNewCart = (cart: Cart) => {
    setCart(cart);
  }

  useEffect(() => {
    setCart(value);
  }, [value]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setNewCart,
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
