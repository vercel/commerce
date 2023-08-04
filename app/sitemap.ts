import { getProductSeoUrls } from 'lib/shopware';
import { MetadataRoute } from 'next';

type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (await Promise.all([productsPromise])).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
