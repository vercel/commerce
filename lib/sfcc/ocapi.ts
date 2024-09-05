import { TAGS } from 'lib/constants';
import { ensureStartsWith } from 'lib/utils';
import { ExtractVariables, salesforceFetch } from './utils';

const ocapiDomain = process.env.SFCC_SANDBOX_DOMAIN
  ? ensureStartsWith(process.env.SFCC_SANDBOX_DOMAIN, 'https://')
  : '';

export async function getProductRecommendations<T>(productId: string): Promise<T> {
  const productRecommendationsEndpoint = `/products/${productId}/recommendations`;

  const res = await ocFetch<T>({
    method: 'GET',
    endpoint: productRecommendationsEndpoint,
    tags: [TAGS.products]
  });

  return res.body as T;
}

async function ocFetch<T>(options: {
  method: 'POST' | 'GET';
  endpoint: string;
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  const apiEndpoint = `${ocapiDomain}${process.env.SFCC_OPENCOMMERCE_SHOP_API_ENDPOINT}${options.endpoint}?client_id=${process.env.SFCC_CLIENT_ID}`;
  return salesforceFetch<T>({
    ...options,
    apiEndpoint
  });
}
