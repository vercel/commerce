import { makeRequest } from "@/lib/rapyd/make-rapyd-request";
import { cache } from "react";
import "server-only";

// Icelandic card payment methods
const ICELANDIC_PAYMENT_METHODS = [
  "is_visa_card",
  "is_mastercard_card",
] as const;

interface CheckoutResponse {
  id: string;
  redirect_url: string;
  status: string;
  payment: {
    id: string;
    amount: number;
    currency: string;
    status: string;
  };
}

interface CreateCheckoutParams {
  amount: number;
  merchantReferenceId: string;
  completeCheckoutUrl: string;
  cancelCheckoutUrl: string;
  description?: string;
}

const DEFAULT_CHECKOUT_CONFIG = {
  country: "IS",
  currency: "ISK",
} as const;

export const preloadCheckout = (params: CreateCheckoutParams) => {
  void createCheckout(params);
};

export const createCheckout = cache(
  async ({
    amount,
    merchantReferenceId,
    completeCheckoutUrl,
    cancelCheckoutUrl,
    description,
  }: CreateCheckoutParams): Promise<CheckoutResponse> => {
    const checkoutBody = {
      amount,
      merchant_reference_id: merchantReferenceId,
      complete_checkout_url: completeCheckoutUrl,
      cancel_checkout_url: cancelCheckoutUrl,
      country: DEFAULT_CHECKOUT_CONFIG.country,
      currency: DEFAULT_CHECKOUT_CONFIG.currency,
      payment_method_types_include: ICELANDIC_PAYMENT_METHODS,
      ...(description && { description }),
    };

    const response = await makeRequest({
      method: "post",
      urlPath: "/v1/checkout",
      body: checkoutBody,
    });

    console.log(response.body.data);

    return response.body.data as unknown as CheckoutResponse;
  }
);

export type { CheckoutResponse, CreateCheckoutParams };
