import { getCollections, getPages, getProducts } from 'lib/shopify';
import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default async function sitemap(): Promise<Promise<Promise<MetadataRoute.Sitemap>>> {
  const routesMap = ['', '/search'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  const collections = await getCollections();
  const collectionsMap = collections.map((collection) => ({
    url: `${baseUrl}${collection.path}`,
    lastModified: collection.updatedAt
  }));

  const products = await getProducts({});
  const productsMap = products.map((product) => ({
    url: `${baseUrl}/product/${product.handle}`,
    lastModified: product.updatedAt
  }));

  const pages = await getPages();
  const pagesMap = pages.map((page) => ({
    url: `${baseUrl}/${page.handle}`,
    lastModified: page.updatedAt
  }));

  return [...routesMap, ...collectionsMap, ...productsMap, ...pagesMap];
}
