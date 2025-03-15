import { getCollections, getProducts } from "lib/store/products";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const collections = await getCollections();

  const productUrls = products.map((product) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/product/${product.handle}`,
    lastModified: product.updatedAt,
  }));

  const collectionUrls = collections.map((collection) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/search/${collection.handle}`,
    lastModified: collection.updatedAt,
  }));

  const urls = [...productUrls, ...collectionUrls];

  return urls;
}
