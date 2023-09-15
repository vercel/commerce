import { ReadonlyURLSearchParams } from 'next/navigation';
import { getCollectionProducts, getProducts } from './shopify';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export async function getLiveProducts(query: Parameters<typeof getProducts>[0]) {
  const products = await getProducts(query);
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product'));
  return liveProducts;
}

export async function getLiveCollectionProducts(query: Parameters<typeof getCollectionProducts>[0]) {
  const products = await getCollectionProducts(query);
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product'));
  return liveProducts;
}