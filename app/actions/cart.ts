"use server";

import { CartState } from "@/components/cart/cart-context";
import { getProductById } from "@/lib/store/products";

type StorageCartItem = {
  variantId: string;
  productId: string;
  quantity: number;
};

export const calculateCartTotals = async (
  items: StorageCartItem[]
): Promise<CartState> => {
  const cartLines = [];
  let totalQuantity = 0;

  // Fetch products and build cart lines
  for (const item of items) {
    const product = await getProductById({ id: item.productId });
    if (product) {
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (variant) {
        cartLines.push({
          merchandise: {
            ...variant,
            product,
          },
          quantity: item.quantity,
        });
        totalQuantity += item.quantity;
      }
    }
  }

  // Calculate totals
  const subtotalAmount = cartLines
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
    lines: cartLines,
    totalQuantity,
    cost: {
      subtotalAmount: {
        amount: subtotalAmount,
        currencyCode: "ISK",
      },
      totalAmount: {
        amount: totalAmount,
        currencyCode: "ISK",
      },
      totalTaxAmount: {
        amount: taxAmount,
        currencyCode: "ISK",
      },
    },
  };
};
