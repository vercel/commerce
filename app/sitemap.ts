import { getProductSeoUrls } from 'lib/shopware';
import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default async function sitemap(): Promise<Promise<Promise<MetadataRoute.Sitemap>>> {
  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  // @ToDo: Get categories and get cms pages
  const productsPromise = getProductSeoUrls().then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.path}`,
      lastModified: product.updatedAt
    }))
  );

  const fetchedRoutes = (await Promise.all([productsPromise])).flat();

  return [...routesMap, ...fetchedRoutes];
}
