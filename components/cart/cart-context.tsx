"use client";

import { Product, ProductVariant } from "lib/store/types";
import { createContext, useContext, useState } from "react";

type CartItem = {
  merchandise: ProductVariant & {
    product: Product;
  };
  quantity: number;
};

type CartState = {
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    lines: [],
    totalQuantity: 0,
    cost: {
      subtotalAmount: {
        amount: "0",
        currencyCode: "USD",
      },
      totalAmount: {
        amount: "0",
        currencyCode: "USD",
      },
      totalTaxAmount: {
        amount: "0",
        currencyCode: "USD",
      },
    },
  });

  const addCartItem = (variant: ProductVariant, product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.lines.find(
        (item) => item.merchandise.id === variant.id
      );

      let newLines;
      if (existingItem) {
        newLines = prevCart.lines.map((item) =>
          item.merchandise.id === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newLines = [
          ...prevCart.lines,
          {
            merchandise: {
              ...variant,
              product,
            },
            quantity: 1,
          },
        ];
      }

      const totalQuantity = newLines.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      const subtotalAmount = newLines
        .reduce(
          (sum, item) =>
            sum + parseFloat(item.merchandise.price.amount) * item.quantity,
          0
        )
        .toFixed(2);

      // For this example, we'll assume tax rate is 10%
      const taxAmount = (parseFloat(subtotalAmount) * 0.1).toFixed(2);
      const totalAmount = (
        parseFloat(subtotalAmount) + parseFloat(taxAmount)
      ).toFixed(2);

      return {
        lines: newLines,
        totalQuantity,
        cost: {
          subtotalAmount: {
            amount: subtotalAmount,
            currencyCode: "USD",
          },
          totalAmount: {
            amount: totalAmount,
            currencyCode: "USD",
          },
          totalTaxAmount: {
            amount: taxAmount,
            currencyCode: "USD",
          },
        },
      };
    });
  };

  const removeCartItem = (variantId: string) => {
    setCart((prevCart) => {
      const newLines = prevCart.lines.filter(
        (item) => item.merchandise.id !== variantId
      );

      const totalQuantity = newLines.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      const subtotalAmount = newLines
        .reduce(
          (sum, item) =>
            sum + parseFloat(item.merchandise.price.amount) * item.quantity,
          0
        )
        .toFixed(2);

      const taxAmount = (parseFloat(subtotalAmount) * 0.1).toFixed(2);
      const totalAmount = (
        parseFloat(subtotalAmount) + parseFloat(taxAmount)
      ).toFixed(2);

      return {
        lines: newLines,
        totalQuantity,
        cost: {
          subtotalAmount: {
            amount: subtotalAmount,
            currencyCode: "USD",
          },
          totalAmount: {
            amount: totalAmount,
            currencyCode: "USD",
          },
          totalTaxAmount: {
            amount: taxAmount,
            currencyCode: "USD",
          },
        },
      };
    });
  };

  const updateCartItem = (variantId: string, quantity: number) => {
    setCart((prevCart) => {
      const newLines = prevCart.lines.map((item) =>
        item.merchandise.id === variantId ? { ...item, quantity } : item
      );

      const totalQuantity = newLines.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      const subtotalAmount = newLines
        .reduce(
          (sum, item) =>
            sum + parseFloat(item.merchandise.price.amount) * item.quantity,
          0
        )
        .toFixed(2);

      const taxAmount = (parseFloat(subtotalAmount) * 0.1).toFixed(2);
      const totalAmount = (
        parseFloat(subtotalAmount) + parseFloat(taxAmount)
      ).toFixed(2);

      return {
        lines: newLines,
        totalQuantity,
        cost: {
          subtotalAmount: {
            amount: subtotalAmount,
            currencyCode: "USD",
          },
          totalAmount: {
            amount: totalAmount,
            currencyCode: "USD",
          },
          totalTaxAmount: {
            amount: taxAmount,
            currencyCode: "USD",
          },
        },
      };
    });
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
