import { ProductSKUs } from "components/product/sku-generator";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const hide = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: hide,
      follow: hide,
      googleBot: {
        index: hide,
        follow: hide
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ViewSKUs({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);  
  
  if (!product) return  
  
  return (
    <>
      <ProductSKUs productTitle={product.title} noTitle={true} />
    </>
  )
};