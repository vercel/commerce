import { getCollections, getProducts } from "lib/sfcc";
import { getPages } from "lib/sfcc/content";
import { baseUrl } from "lib/utils";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string;
};

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt,
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt,
    }))
  );

  const pages = getPages().map((page) => ({
    url: `${baseUrl}/${page.handle}`,
    lastModified: page.updatedAt,
  }));

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = [
      ...(await Promise.all([collectionsPromise, productsPromise])).flat(),
      ...pages,
    ];
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
