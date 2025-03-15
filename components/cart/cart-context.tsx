"use client";

import { calculateCartTotals } from "@/app/actions/cart";
import { Product, ProductVariant } from "lib/store/types";
import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  merchandise: ProductVariant & {
    product: Product;
  };
  quantity: number;
};

export type CartState = {
  lines: CartItem[];
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
};

type CartContextType = {
  cart: CartState;
  addCartItem: (variant: ProductVariant, product: Product) => void;
  removeCartItem: (variantId: string) => void;
  updateCartItem: (variantId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "cartItems";

// Only store minimal cart data in sessionStorage
type StorageCartItem = {
  variantId: string;
  productId: string;
  quantity: number;
};

const defaultCartState: CartState = {
  lines: [],
  totalQuantity: 0,
  cost: {
    subtotalAmount: {
      amount: "0",
      currencyCode: "ISK",
    },
    totalAmount: {
      amount: "0",
      currencyCode: "ISK",
    },
    totalTaxAmount: {
      amount: "0",
      currencyCode: "ISK",
    },
  },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>(defaultCartState);

  // Load cart from sessionStorage and calculate totals
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = sessionStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const storageItems: StorageCartItem[] = JSON.parse(savedCart);
        const calculatedCart = await calculateCartTotals(storageItems);
        setCart(calculatedCart);
      }
    };

    loadCart();
  }, []);

  const addCartItem = async (variant: ProductVariant, product: Product) => {
    const savedCart = sessionStorage.getItem(CART_STORAGE_KEY);
    const storageItems: StorageCartItem[] = savedCart
      ? JSON.parse(savedCart)
      : [];

    const existingItem = storageItems.find(
      (item) => item.variantId === variant.id
    );

    let newStorageItems: StorageCartItem[];
    if (existingItem) {
      newStorageItems = storageItems.map((item) =>
        item.variantId === variant.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newStorageItems = [
        ...storageItems,
        {
          variantId: variant.id,
          productId: product.id,
          quantity: 1,
        },
      ];
    }

    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newStorageItems));
    const calculatedCart = await calculateCartTotals(newStorageItems);
    setCart(calculatedCart);
  };

  const removeCartItem = async (variantId: string) => {
    const savedCart = sessionStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return;

    const storageItems: StorageCartItem[] = JSON.parse(savedCart);
    const newStorageItems = storageItems.filter(
      (item) => item.variantId !== variantId
    );

    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newStorageItems));
    const calculatedCart = await calculateCartTotals(newStorageItems);
    setCart(calculatedCart);
  };

  const updateCartItem = async (variantId: string, quantity: number) => {
    const savedCart = sessionStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return;

    const storageItems: StorageCartItem[] = JSON.parse(savedCart);
    const newStorageItems =
      quantity > 0
        ? storageItems.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        : storageItems.filter((item) => item.variantId !== variantId);

    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newStorageItems));
    const calculatedCart = await calculateCartTotals(newStorageItems);
    setCart(calculatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addCartItem, removeCartItem, updateCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
