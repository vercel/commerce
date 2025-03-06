import { Collection } from './types';
import { ExtractVariables, salesforceFetch } from './utils';

export async function scapiFetch<T>(options: {
  method: 'POST' | 'GET';
  apiEndpoint: string;
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  const scapiDomain = `https://${process.env.SFCC_SHORTCODE}.api.commercecloud.salesforce.com`;
  const apiEndpoint = `${scapiDomain}${options.apiEndpoint}?siteId=${process.env.SFCC_SITEID}`;
  return salesforceFetch<T>({
    ...options,
    apiEndpoint
  });
}

export async function fetchAccessToken() {
  const response = await scapiFetch<{ access_token: string }>({
    method: 'POST',
    apiEndpoint: `/shopper/auth/v1/organizations/${process.env.SFCC_ORGANIZATIONID}/oauth2/token?grant_type=client_credentials&channel_id=${process.env.SFCC_SITEID}`,
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SFCC_CLIENT_ID}:${process.env.SFCC_SECRET}`
      ).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded'
    }
  });

  if (response.status !== 200 || !response.body.access_token) {
    throw new Error('Failed to fetch access token');
  }

  return response.body.access_token;
}

export async function fetchCollection(handle: string): Promise<Collection | undefined> {
  const accessToken = await fetchAccessToken();

  const response = await scapiFetch<Collection>({
    method: 'GET',
    apiEndpoint: `/product/shopper-products/v1/organizations/${process.env.SFCC_ORGANIZATIONID}/products/${handle}`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch collection');
  }

  return response.body;
}
