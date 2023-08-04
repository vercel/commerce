import { getProductSeoUrls, getMenu } from 'lib/shopware';
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

  const mainNavigationPromise = getMenu({ type: 'main-navigation' }).then((mainNavigation) =>
    mainNavigation.map((mainNavigationItem) => ({
      url: `${baseUrl}${mainNavigationItem.path}`,
      lastModified: new Date().toISOString()
    }))
  );

  const footerNaivgationPromise = getMenu({ type: 'footer-navigation', depth: 2 }).then(
    (footerNavigation) =>
      footerNavigation.map((footerNavigationItem) => ({
        url: `${baseUrl}${footerNavigationItem.path}`,
        lastModified: new Date().toISOString()
      }))
  );
  // @ToDo: currently this points to variants, would be better to point to parent products
  const productsPromise = getProductSeoUrls().then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.path}`,
      lastModified: product.updatedAt
    }))
  );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([productsPromise, mainNavigationPromise, footerNaivgationPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
