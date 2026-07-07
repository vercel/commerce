"use client";

import LoadingDots from "components/loading-dots";
import { useState, useTransition } from "react";
import { getCheckoutUrl } from "./actions";

/**
 * Checkout handoff, step 2 of 2: fetches the secure `checkoutUrl` from the
 * Cart API via a server action, then performs a clean client-side redirect
 * to Shopify's hosted checkout.
 */
export function CheckoutButton({ disabled }: { disabled?: boolean }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const proceedToCheckout = () => {
    setMessage(null);
    startTransition(async () => {
      const checkoutUrl = await getCheckoutUrl();

      if (!checkoutUrl) {
        setMessage("Unable to reach checkout. Please try again.");
        return;
      }

      window.location.href = checkoutUrl;
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={proceedToCheckout}
        disabled={disabled || pending}
        className="font-display block w-full bg-field p-4 text-center text-sm font-semibold tracking-[0.2em] text-night uppercase transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? (
          <LoadingDots className="bg-night" />
        ) : (
          "Proceed to Checkout"
        )}
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {pending ? "Preparing secure checkout" : ""}
      </p>
      {message ? (
        <p aria-live="polite" className="mt-2 text-center text-xs text-clay">
          {message}
        </p>
      ) : null}
    </>
  );
}
