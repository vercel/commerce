import { CommerceAPIFetchOptions } from 'lib/commerce/api';
import { getConfig } from '..';

export default async function fetchAPI<Q, V = any>(
  query: string,
  { variables, preview }: CommerceAPIFetchOptions<V> = {}
): Promise<Q> {
  const config = getConfig();
  const res = await fetch(config.commerceUrl + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}
