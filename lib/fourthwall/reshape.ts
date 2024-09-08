import { Cart, CartItem, Image, Money, Product, ProductVariant } from "lib/shopify/types";
import { FourthwallCart, FourthwallCartItem, FourthwallMoney, FourthwallProduct, FourthwallProductImage, FourthwallProductVariant } from "./types";

/**
 * Utils
 */
const DEFAULT_IMAGE: Image = {
  url: '',
  altText: '',
  width: 0,
  height: 0
}


const reshapeMoney = (money: FourthwallMoney): Money => {
  return {
    amount: money.value.toString(),
    currencyCode: money.currency
  };
}

/**
 * Products
 */
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

export const reshapeProduct = (product: FourthwallProduct): Product | undefined => {
  if (!product) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  const minPrice = Math.min(...variants.map((v) => v.unitPrice.value));
  const maxPrice = Math.max(...variants.map((v) => v.unitPrice.value));

  const currencyCode = variants[0]?.unitPrice.currency || 'USD';

  const sizes = new Set(variants.map((v) => v.attributes.size.name));
  const colors = new Set(variants.map((v) => v.attributes.color.name));

  return {
    ...rest,
    handle: product.slug,
    title: product.name,
    descriptionHtml: product.description,
    description: product.description,
    images: reshapeImages(images, product.name),
    variants: reshapeVariants(variants),
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
    featuredImage: reshapeImages(images, product.name)[0] || DEFAULT_IMAGE,
    options: [{
      id: 'color',
      name: 'Color',
      values: [...colors]
    }, {
      id: 'size',
      name: 'Size',
      values: [...sizes]
    }],    
    // TODO: stubbed out
    availableForSale: true,
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
    images: reshapeImages(v.images, v.name),
    selectedOptions: [{
      name: 'Size',
      value: v.attributes.size.name
    }, {
      name: 'Color',
      value: v.attributes.color.name
    }],
    price: reshapeMoney(v.unitPrice),
  }))
}

/**
 * Cart
 */
const reshapeCartItem = (item: FourthwallCartItem): CartItem => {
  return {
    id: item.variant.id,
    quantity: item.quantity,
    cost: {
      totalAmount: reshapeMoney(item.variant.unitPrice)
    },
    merchandise: {
      id: item.variant.id,
      title: item.variant.name,
      // TODO: Stubbed out
      selectedOptions: [],
      product: {
        // TODO: need this product info in model
        id: 'TT', 
        handle: 'TT',
        title: 'TT',
        featuredImage: {
          url: item.variant.images[0]?.url || 'TT',
          altText: 'TT',
          width: item.variant.images[0]?.width || 100,
          height: item.variant.images[0]?.height || 100
        }
      }
    }
  };
}

export const reshapeCart = (cart: FourthwallCart): Cart => {
  const totalValue = cart.items.map((item) => item.quantity * item.variant.unitPrice.value).reduce((a, b) => a + b, 0);
  const currencyCode = cart.items[0]?.variant.unitPrice.currency || 'USD';

  return {
    ...cart,
    cost: {
      totalAmount: {
        amount: totalValue.toString(),
        currencyCode,
      },
      subtotalAmount: {
        amount: totalValue.toString(),
        currencyCode,
      },
    },
    lines: cart.items.map(reshapeCartItem),
    // TODO: Stubbed out
    checkoutUrl: 'TT', 
    totalQuantity: cart.items.map((item) => item.quantity).reduce((a, b) => a + b, 0)
  };
};
