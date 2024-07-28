'use client';

import type { Cart, CartItem, Product, ProductVariant } from 'lib/shopify/types';
import React, { createContext, use, useContext, useMemo, useOptimistic } from 'react';

type UpdateType = 'plus' | 'minus' | 'delete';

type CartAction =
  | { type: 'UPDATE_ITEM'; payload: { itemId: string; updateType: UpdateType } }
  | { type: 'ADD_ITEM'; payload: { variant: ProductVariant; product: Product } };

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (itemId: string, updateType: UpdateType) => void;
  addCartItem: (variant: ProductVariant, product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(item: CartItem, updateType: UpdateType): CartItem | null {
  if (updateType === 'delete') return null;

  const newQuantity = updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(newQuantity, singleItemAmount.toString());

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount
      }
    }
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const totalAmount = calculateItemCost(quantity, variant.price.amount);

  return {
    id: existingItem?.id || `${variant.id}_${Date.now()}`,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode
      }
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage
      }
    }
  };
}

function updateCartTotals(lines: CartItem[]): Pick<Cart, 'totalQuantity' | 'cost'> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce((sum, item) => sum + Number(item.cost.totalAmount.amount), 0);
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? 'USD';

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: '0', currencyCode }
    }
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart | undefined {
  if (!state) return state;

  switch (action.type) {
    case 'UPDATE_ITEM': {
      const { itemId, updateType } = action.payload;
      const updatedLines = state.lines
        .map((item) => (item.id === itemId ? updateCartItem(item, updateType) : item))
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return {
          ...state,
          lines: [],
          totalQuantity: 0,
          cost: { ...state.cost, totalAmount: { ...state.cost.totalAmount, amount: '0' } }
        };
      }

      return { ...state, ...updateCartTotals(updatedLines), lines: updatedLines };
    }
    case 'ADD_ITEM': {
      const { variant, product } = action.payload;
      const existingItem = state.lines.find((item) => item.merchandise.id === variant.id);
      const updatedItem = createOrUpdateCartItem(existingItem, variant, product);

      const updatedLines = existingItem
        ? state.lines.map((item) => (item.merchandise.id === variant.id ? updatedItem : item))
        : [...state.lines, updatedItem];

      return { ...state, ...updateCartTotals(updatedLines), lines: updatedLines };
    }
    default:
      return state;
  }
}

export function CartProvider({
  children,
  cartPromise
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  const initialCart = use(cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(initialCart, cartReducer);

  const updateCartItem = (itemId: string, updateType: UpdateType) => {
    updateOptimisticCart({ type: 'UPDATE_ITEM', payload: { itemId, updateType } });
  };

  const addCartItem = (variant: ProductVariant, product: Product) => {
    updateOptimisticCart({ type: 'ADD_ITEM', payload: { variant, product } });
  };

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem
    }),
    [optimisticCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
