import { ReadonlyURLSearchParams } from 'next/navigation';
import { getCollectionProducts, getProducts } from './shopify';

const wardrobeConditions = ['hidden-product', 't-shirt']
const wallConditions = ['hidden-product', 'wall']

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
}

export async function getLiveWardrobeProducts(query: Parameters<typeof getProducts>[0]) {
  const products = await getProducts(query);
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product') && product.tags.includes('tshirt'));
  return liveProducts;
}

export async function getLiveWallProducts(query: Parameters<typeof getProducts>[0]) {
  const products = await getProducts(query);
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product') && product.tags.includes('wall'));
  return liveProducts;
}

export async function getLiveCollectionProducts(query: Parameters<typeof getCollectionProducts>[0]) {
  const products = await getCollectionProducts(query);
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product'));
  return liveProducts;
}

export async function getAllLiveProducts(query?: Parameters<typeof getProducts>[0]) {
  const searchQuery = query || { query: undefined, reverse: undefined, sortKey: undefined}
  const products = await getProducts(searchQuery);
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product'));
  return liveProducts
}
