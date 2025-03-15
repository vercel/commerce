"use client";

import { createCheckoutAction } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface CheckoutButtonProps {
  amount: number;
  description?: string;
}

export const CheckoutButton = ({
  amount,
  description,
}: CheckoutButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCheckout = () => {
    startTransition(async () => {
      const merchantReferenceId = crypto.randomUUID();

      const result = await createCheckoutAction({
        amount,
        merchantReferenceId,
        completeCheckoutUrl: `${window.location.origin}/checkout/complete`,
        cancelCheckoutUrl: `${window.location.origin}/checkout/cancel`,
        description,
      });

      if (!result.success) {
        toast.error("Failed to create checkout session");
        return;
      }

      // Redirect to Rapyd checkout page
      router.push(result.data.redirect_url);
    });
  };

  return (
    <Button onClick={handleCheckout} disabled={isPending}>
      {isPending ? "Creating checkout..." : "Proceed to Checkout"}
    </Button>
  );
};
