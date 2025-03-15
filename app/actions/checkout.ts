"use server";

import {
  createCheckout,
  type CreateCheckoutParams,
} from "@/lib/rapyd/checkout";
import { z } from "zod";

const checkoutSchema = z.object({
  amount: z.number().positive(),
  merchantReferenceId: z.string(),
  completeCheckoutUrl: z.string().url(),
  cancelCheckoutUrl: z.string().url(),
  description: z.string().optional(),
});

export const createCheckoutAction = async (data: CreateCheckoutParams) => {
  try {
    // Validate input
    const validatedData = checkoutSchema.parse(data);

    // Create checkout
    const checkout = await createCheckout(validatedData);

    return {
      success: true,
      data: checkout,
    };
  } catch (error) {
    console.error("Checkout creation failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
