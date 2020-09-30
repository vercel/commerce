import { useState, useCallback } from "react";
import useSWR, { mutate } from "swr";

async function getText(res) {
  try {
    return (await res.text()) || res.statusText;
  } catch (error) {
    return res.statusText;
  }
}

async function getError(res) {
  if (res.headers.get("Content-Type")?.includes("application/json")) {
    const data = await res.json();
    return data.errors[0];
  }
  return { message: await getText(res) };
}

async function fetcher(url) {
  const res = await fetch(url);

  if (res.status === 200) {
    return res.json();
  }
  throw await getError(res);
}

export function useCart() {
  return useSWR("/api/cart", fetcher);
}

export function useAddToCart() {
  const [{ addingToCart, error }, setStatus] = useState({
    addingToCart: false,
  });
  const addToCart = useCallback(async ({ product }) => {
    setStatus({ addingToCart: true });

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    });

    // Product added as expected
    if (res.status === 200) {
      setStatus({ addingToCart: false });
      return mutate("/api/cart");
    }

    const error = await getError(res);

    console.error("Adding product to cart failed with:", res.status, error);
    setStatus({ addingToCart: false, error });
  }, []);

  return { addToCart, addingToCart, error };
}

export function useUpdateCart() {
  const [{ updatingCart, error }, setStatus] = useState({
    updatingCart: false,
  });
  const updateCart = useCallback(async ({ product, item }) => {
    setStatus({ updatingCart: true });

    const res = await fetch(
      `/api/cart?itemId=${item.id}`,
      product.quantity < 1
        ? { method: "DELETE" }
        : {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product }),
          }
    );

    // Product updated as expected
    if (res.status === 200) {
      setStatus({ updatingCart: false });
      return mutate("/api/cart");
    }

    const error = await getError(res);

    console.error("Update to cart failed with:", res.status, error);
    setStatus({ updatingCart: false, error });
  }, []);

  return { updateCart, updatingCart, error };
}

export function useRemoveFromCart() {
  const { updateCart, updatingCart, error } = useUpdateCart();
  const removeFromCart = async ({ item }) => {
    updateCart({ item, product: { quantity: 0 } });
  };

  return { removeFromCart, removingFromCart: updatingCart, error };
}
