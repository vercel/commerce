import { ReadonlyURLSearchParams } from 'next/navigation';
import { Cart } from './shopify/types';
import { ShopifyAnalyticsProduct } from '@shopify/hydrogen-react';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = ['SHOPIFY_STORE_DOMAIN', 'SHOPIFY_STOREFRONT_ACCESS_TOKEN'];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        '\n'
      )}\n`
    );
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes('[') ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes(']')
  ) {
    throw new Error(
      'Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.'
    );
  }
};

/**
 * This function takes a cart and a quantity and returns an array of ShopifyAnalyticsProduct objects.
 * */
export const productToAnalytics = (
  cartItems: Cart['lines'],
  quantity: number,
  variantId: string
) => {
  const line = cartItems.find((line) => line.merchandise.id === variantId);
  if (!line) return;

  const { merchandise } = line;

  if (!merchandise) return;

  return [
    {
      productGid: merchandise?.product.id,
      variantGid: variantId,
      name: merchandise?.product.title,
      variantName: merchandise?.title,
      price: merchandise?.price.amount,
      quantity
    } as ShopifyAnalyticsProduct
  ];
};
