"use client";

import { useState } from "react";

export default function ExpressCheckoutButton({ cartId }: { cartId: string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const secretKey = process.env.SHOPIFY_PRIVATE_ADMIN_KEY;

    try {
      const response = await fetch("https://api.shopify.com/v1/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({ cartId }),
      });

      if (response.ok) {
        alert("Checkout initiated!");
      }
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-black text-white p-4 rounded-md font-bold"
    >
      {loading ? "Processing..." : "Express Checkout"}
    </button>
  );
}
