import { Image, Money, Product, ProductVariant } from "lib/shopify/types";
import { FourthwallMoney, FourthwallProduct, FourthwallProductImage, FourthwallProductVariant } from "./types";

const DEFAULT_IMAGE: Image = {
  url: '',
  altText: '',
  width: 0,
  height: 0
}

export const reshapeProducts = (products: FourthwallProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

const reshapeProduct = (product: FourthwallProduct): Product | undefined => {
  if (!product) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  const minPrice = Math.min(...variants.map((v) => v.unitPrice.value));
  const maxPrice = Math.max(...variants.map((v) => v.unitPrice.value));

  const currencyCode = variants[0]?.unitPrice.currencyCode || 'USD';

  return {
    ...rest,
    handle: product.slug,
    title: product.name,
    descriptionHtml: product.description,
    description: product.description,
    images: reshapeImages(images, product.name),
    variants: reshapeVariants(variants),
    // stubbed out
    availableForSale: true,
    priceRange: {
      minVariantPrice: {
        amount: minPrice.toString(),
        currencyCode,
      },
      maxVariantPrice: {
        amount: maxPrice.toString(),
        currencyCode,
      }
    },
    options: [],
    featuredImage: reshapeImages(images, product.name)[0] || DEFAULT_IMAGE,
    seo: {
      title: product.name,
      description: product.description,
    },
    tags: [],
    updatedAt: new Date().toISOString(),
  };
};

const reshapeImages = (images: FourthwallProductImage[], productTitle: string): Image[] => {
  return images.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: `${productTitle} - ${filename}`
    };
  });
};

const reshapeVariants = (variants: FourthwallProductVariant[]): ProductVariant[] => {
  return variants.map((v) => ({
    id: v.id,
    title: v.name,
    availableForSale: true,
    selectedOptions: [],
    price: reshapeMoney(v.unitPrice),
  }))
}

const reshapeMoney = (money: FourthwallMoney): Money => {
  return {
    amount: money.value.toString(),
    currencyCode: money.currencyCode
  };
}
