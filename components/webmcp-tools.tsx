"use client";

import {
  addProductToCart,
  getCartSummary,
  getProductOptions,
  searchProducts,
} from "lib/webmcp/actions";
import { useWebMCP } from "use-webmcp-tool";

// WebMCP lets this page hand an AI agent a set of typed tools instead of making
// it read the DOM. Each useWebMCP call registers one tool while this component
// is mounted, and unregisters it on unmount. Browsers without WebMCP get a no-op.
//
// To add your own tool, copy any block below: give it a name, a description the
// agent will read, a JSON Schema for its arguments, and an execute function.

const READ_ONLY = { readOnlyHint: true, untrustedContentHint: true };
const WRITES = { readOnlyHint: false, untrustedContentHint: false };

// Our actions report a problem as { error: "..." }. Without this the hook would
// serialize that object as a *successful* result and the agent could not tell a
// failed lookup from a good one, so turn it into a real MCP error instead.
function reportErrors(result: unknown) {
  if (result && typeof result === "object" && "error" in result) {
    return {
      content: [{ type: "text", text: String(result.error) }],
      isError: true,
    };
  }
  return result;
}

const searchProductsSchema = {
  type: "object",
  properties: {
    query: {
      type: "string",
      description: "Words to search for in the catalog.",
    },
    limit: {
      type: "integer",
      description: "How many products to return. Defaults to 5, maximum 10.",
    },
  },
  required: ["query"],
  additionalProperties: false,
};

const getProductOptionsSchema = {
  type: "object",
  properties: {
    handle: {
      type: "string",
      description: "A product handle returned by shop.search_products.",
    },
  },
  required: ["handle"],
  additionalProperties: false,
};

const addToCartSchema = {
  type: "object",
  properties: {
    handle: {
      type: "string",
      description: "A product handle returned by shop.search_products.",
    },
    selectedOptions: {
      type: "array",
      description:
        "One entry per product option, using names and values from shop.get_product_options.",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          value: { type: "string" },
        },
        required: ["name", "value"],
        additionalProperties: false,
      },
    },
    quantity: {
      type: "integer",
      description: "How many units to add. Defaults to 1.",
    },
  },
  required: ["handle", "selectedOptions"],
  additionalProperties: false,
};

export function WebMCPTools() {
  useWebMCP({
    name: "shop.search_products",
    description:
      "Search this store's catalog. Pass a returned handle to shop.get_product_options.",
    inputSchema: searchProductsSchema,
    annotations: READ_ONLY,
    execute: searchProducts,
    formatOutput: reportErrors,
  });

  useWebMCP({
    name: "shop.get_product_options",
    description:
      "List the option names and values for one product, such as size or color.",
    inputSchema: getProductOptionsSchema,
    annotations: READ_ONLY,
    execute: getProductOptions,
    formatOutput: reportErrors,
  });

  useWebMCP({
    name: "shop.get_cart",
    description: "Read what is currently in the shopper's cart.",
    annotations: READ_ONLY,
    execute: getCartSummary,
    formatOutput: reportErrors,
  });

  useWebMCP({
    name: "shop.add_to_cart",
    description:
      "Add one product variant to the cart. Choose every option first with shop.get_product_options.",
    inputSchema: addToCartSchema,
    annotations: WRITES,
    execute: addProductToCart,
    formatOutput: reportErrors,
  });

  return null;
}
