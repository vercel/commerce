"use server";

import { TAGS } from "lib/constants";
import {
  addToCart as addCartLines,
  createCart,
  getCart,
  getProduct,
  getProducts,
} from "lib/shopify";
import type { Money, Product } from "lib/shopify/types";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

// Every action below follows the same four steps: validate the input, call an
// existing lib/shopify function, shape a small result, return it.

const DEFAULT_SEARCH_RESULTS = 5;
const MAX_SEARCH_RESULTS = 10;
const MAX_QUANTITY = 99;

function toolError(message: string) {
  return { error: message };
}

function formatMoney(money: Money) {
  return `${money.amount} ${money.currencyCode}`;
}

function sameText(left: string, right: string) {
  return left.toLowerCase() === right.toLowerCase();
}

// Tool input comes from an agent rather than from our own UI, so the JSON Schema
// on the client is only a hint. Everything is re-checked here.
function readText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > maxLength) return undefined;
  return trimmed;
}

function readCount(value: unknown, fallback: number, max: number) {
  if (value === undefined) return fallback;
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    return undefined;
  }
  return Math.min(value, max);
}

export async function searchProducts(input: unknown) {
  const { query, limit } = (input ?? {}) as {
    query?: unknown;
    limit?: unknown;
  };

  const searchTerm = readText(query, 120);
  if (!searchTerm) return toolError("Provide a non-empty search query.");

  const count = readCount(limit, DEFAULT_SEARCH_RESULTS, MAX_SEARCH_RESULTS);
  if (count === undefined) {
    return toolError("limit must be a positive whole number.");
  }

  try {
    const products = await getProducts({ query: searchTerm });

    return {
      totalMatches: products.length,
      products: products.slice(0, count).map((product) => ({
        handle: product.handle,
        title: product.title,
        price: formatMoney(product.priceRange.minVariantPrice),
        available: product.availableForSale,
      })),
    };
  } catch (error) {
    console.error("WebMCP search_products failed", error);
    return toolError("Product search is unavailable right now.");
  }
}

export async function getProductOptions(input: unknown) {
  const { handle } = (input ?? {}) as { handle?: unknown };

  const productHandle = readText(handle, 255);
  if (!productHandle) {
    return toolError("Provide a product handle from shop.search_products.");
  }

  try {
    const product = await getProduct(productHandle);
    if (!product) return toolError("No product exists for that handle.");

    return {
      handle: product.handle,
      title: product.title,
      options: product.options.map((option) => ({
        name: option.name,
        values: option.values,
      })),
    };
  } catch (error) {
    console.error("WebMCP get_product_options failed", error);
    return toolError("Product options are unavailable right now.");
  }
}

export async function getCartSummary() {
  try {
    const cart = await getCart();

    // Cart ids and checkout urls stay server-side; an agent never needs them.
    if (!cart || cart.lines.length === 0) {
      return { empty: true, lines: [], totalQuantity: 0 };
    }

    return {
      empty: false,
      totalQuantity: cart.totalQuantity,
      total: formatMoney(cart.cost.totalAmount),
      lines: cart.lines.map((line) => ({
        productTitle: line.merchandise.product.title,
        variantTitle: line.merchandise.title,
        quantity: line.quantity,
        lineTotal: formatMoney(line.cost.totalAmount),
      })),
    };
  } catch (error) {
    console.error("WebMCP get_cart failed", error);
    return toolError("The cart is unavailable right now.");
  }
}

function readSelectedOptions(value: unknown) {
  if (!Array.isArray(value) || value.length === 0) return undefined;

  const choices: { name: string; value: string }[] = [];
  for (const entry of value) {
    const { name, value: optionValue } = (entry ?? {}) as {
      name?: unknown;
      value?: unknown;
    };
    const choiceName = readText(name, 255);
    const choiceValue = readText(optionValue, 255);
    if (!choiceName || !choiceValue) return undefined;
    choices.push({ name: choiceName, value: choiceValue });
  }

  return choices;
}

// The variant is re-derived from the product rather than taken from the caller,
// so an agent can never add something the storefront would not offer.
function findVariant(
  product: Product,
  choices: { name: string; value: string }[],
) {
  if (choices.length !== product.options.length) return undefined;

  return product.variants.find(
    (variant) =>
      variant.selectedOptions.length === choices.length &&
      variant.selectedOptions.every((option) =>
        choices.some(
          (choice) =>
            sameText(choice.name, option.name) &&
            sameText(choice.value, option.value),
        ),
      ),
  );
}

export async function addProductToCart(input: unknown) {
  const { handle, selectedOptions, quantity } = (input ?? {}) as {
    handle?: unknown;
    selectedOptions?: unknown;
    quantity?: unknown;
  };

  const productHandle = readText(handle, 255);
  if (!productHandle) {
    return toolError("Provide a product handle from shop.search_products.");
  }

  const choices = readSelectedOptions(selectedOptions);
  if (!choices) {
    return toolError(
      "Provide one name and value per product option, from shop.get_product_options.",
    );
  }

  const count = readCount(quantity, 1, MAX_QUANTITY);
  if (count === undefined) {
    return toolError("quantity must be a positive whole number.");
  }

  try {
    const product = await getProduct(productHandle);
    if (!product) return toolError("No product exists for that handle.");

    const variant = findVariant(product, choices);
    if (!variant) {
      return toolError(
        "No variant matches those options. Call shop.get_product_options first.",
      );
    }
    if (!variant.availableForSale) {
      return toolError("That variant is sold out.");
    }

    // addToCart expects an existing cart cookie, which the cart modal normally
    // creates on mount. An agent can act before that, so make sure one exists.
    const cookieStore = await cookies();
    if (!cookieStore.get("cartId")) {
      const cart = await createCart();
      cookieStore.set("cartId", cart.id!);
    }

    await addCartLines([{ merchandiseId: variant.id, quantity: count }]);
    updateTag(TAGS.cart);

    return {
      added: true,
      title: product.title,
      variantTitle: variant.title,
      quantity: count,
    };
  } catch (error) {
    console.error("WebMCP add_to_cart failed", error);
    // Deliberately does not promise the cart was untouched — a request can fail
    // after Shopify applied it, and a blind retry would add the item twice.
    return toolError(
      "Adding to the cart failed. Check shop.get_cart before retrying.",
    );
  }
}
