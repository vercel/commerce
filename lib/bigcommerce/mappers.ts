import { BigCommerceSortKeys, VercelSortKeys, vercelToBigCommerceSortKeys } from 'lib/constants';
import {
  BigCommerceCart,
  BigCommerceCheckout,
  BigCommerceCollection,
  BigCommercePage,
  BigCommerceProduct,
  BigCommerceProductOption,
  BigCommerceProductVariant,
  CartCustomItem,
  DigitalOrPhysicalItem,
  VercelCart,
  VercelCartItem,
  VercelCollection,
  VercelPage,
  VercelProduct,
  VercelProductOption,
  VercelProductVariant
} from './types';

type ProductsList = { productId: number; productData: BigCommerceProduct }[];

const vercelFromBigCommerceLineItems = (lineItems: BigCommerceCart['lineItems']) => {
  const { physicalItems, digitalItems, customItems } = lineItems;
  const cartItemMapper = ({ entityId, quantity }: DigitalOrPhysicalItem | CartCustomItem) => ({
    merchandiseId: entityId.toString(),
    quantity
  });

  return [physicalItems, digitalItems, customItems].flatMap((list) => list.map(cartItemMapper));
};

const bigcommerceToVercelOptions = (options: BigCommerceProductOption[]): VercelProductOption[] => {
  return options.map((option) => {
    return {
      id: option.entityId.toString(),
      name: option.displayName.toString(),
      values: option.values ? option.values.edges.map(({ node: value }) => value.label) : []
    };
  });
};
const bigcommerceToVercelVariants = (
  variants: BigCommerceProductVariant[],
  productId: number
): VercelProductVariant[] => {
  return variants.map((variant) => {
    return {
      parentId: productId.toString(),
      id: variant.entityId.toString(),
      title: '',
      availableForSale: variant.isPurchasable,
      selectedOptions: variant.options?.edges.map(({ node: option }) => ({
        name: option.displayName ?? '',
        value: option.values.edges.map(({ node }) => node.label)[0] ?? ''
      })) || [
        {
          name: '',
          value: ''
        }
      ],
      price: {
        amount:
          variant.prices?.price.value.toString() ||
          variant.prices?.priceRange.max.value.toString() ||
          '0',
        currencyCode:
          variant.prices?.price.currencyCode || variant.prices?.priceRange.max.currencyCode || ''
      }
    };
  });
};

const bigcommerceToVercelProduct = (product: BigCommerceProduct): VercelProduct => {
  const createVercelProductImage = (img: { url: string; altText: string }) => {
    return {
      url: img.url,
      altText: img.altText,
      width: 2048,
      height: 2048
    };
  };
  const options = product.productOptions.edges.length
    ? bigcommerceToVercelOptions(product.productOptions.edges.map((item) => item.node))
    : [];
  const variants = product.variants.edges.length
    ? bigcommerceToVercelVariants(
        product.variants.edges.map((item) => item.node),
        product.entityId
      )
    : [];

  return {
    id: product.id.toString(),
    handle: product.entityId.toString(),
    availableForSale: product.availabilityV2.status === 'Available' ? true : false,
    title: product.name,
    description: product.plainTextDescription || '',
    descriptionHtml: product.description ?? '',
    options,
    priceRange: {
      maxVariantPrice: {
        amount:
          product.prices.priceRange.max.value.toString() ||
          product.prices.price.value.toString() ||
          '0',
        currencyCode:
          product.prices.priceRange.max.currencyCode || product.prices.price.currencyCode || ''
      },
      minVariantPrice: {
        amount:
          product.prices.priceRange.min.value.toString() ||
          product.prices.price.value.toString() ||
          '0',
        currencyCode:
          product.prices.priceRange.min.currencyCode || product.prices.price.currencyCode || ''
      }
    },
    variants,
    images: product.images
      ? product.images.edges.map(({ node: img }) => createVercelProductImage(img))
      : [],
    featuredImage: createVercelProductImage(product.defaultImage),
    seo: {
      title: product.seo.pageTitle || product.name,
      description: product.seo.metaDescription || ''
    },
    tags: [product.seo.metaKeywords] || [],
    updatedAt: product.createdAt.utc.toString()
  };
};

const bigcommerceToVercelProducts = (products: BigCommerceProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = bigcommerceToVercelProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

const bigcommerceToVercelCartItems = (
  lineItems: BigCommerceCart['lineItems'],
  products: ProductsList
) => {
  const getItemMapper = (products: ProductsList, isCustomItem: boolean = false) => {
    return (item: CartCustomItem | DigitalOrPhysicalItem): VercelCartItem => {
      const vercelProductFallback = {
        id: '',
        handle: '',
        availableForSale: false,
        title: '',
        description: '',
        descriptionHtml: '',
        options: [],
        priceRange: {
          maxVariantPrice: { amount: '', currencyCode: '' },
          minVariantPrice: { amount: '', currencyCode: '' }
        },
        variants: [],
        featuredImage: {
          url: '',
          altText: '',
          width: 0,
          height: 0
        },
        images: [
          {
            url: '',
            altText: '',
            width: 0,
            height: 0
          }
        ],
        seo: { title: '', description: '' },
        tags: [],
        updatedAt: ''
      };
      let product;
      let selectedOptions;

      if (isCustomItem) {
        product = vercelProductFallback;
        selectedOptions = [{ name: '', value: '' }];
      } else {
        const productData = products.filter(
          ({ productId }) => productId === (item as DigitalOrPhysicalItem).productEntityId
        )[0]?.productData;

        product = productData ? bigcommerceToVercelProduct(productData) : vercelProductFallback;
        selectedOptions = (item as DigitalOrPhysicalItem).selectedOptions.map((option) => ({
          name: option.name,
          value: option.value || option.text || option.number?.toString() || option.fileName || ''
        }));
      }

      return {
        id: item.entityId.toString(),
        quantity: item.quantity,
        cost: {
          totalAmount: {
            amount:
              item.extendedListPrice.value.toString() || item.listPrice.value.toString() || '0',
            currencyCode: item.extendedListPrice.currencyCode || item.listPrice.currencyCode || ''
          }
        },
        merchandise: {
          id: item.entityId.toString(),
          title: `${item.name}`,
          selectedOptions,
          product
        }
      };
    };
  };

  const { physicalItems, digitalItems, customItems } = lineItems;
  const areCustomItemsInCart = customItems.length > 0;
  const line1 = physicalItems.map((item) => getItemMapper(products)(item));
  const line2 = digitalItems.map((item) => getItemMapper(products)(item));
  const line3 = areCustomItemsInCart
    ? customItems.map((item) => getItemMapper(products, areCustomItemsInCart)(item))
    : [];

  return [...line1, ...line2, ...line3];
};

const bigcommerceToVercelCart = (
  cart: BigCommerceCart,
  products: ProductsList,
  checkout: BigCommerceCheckout
): VercelCart => {
  return {
    id: cart.entityId,
    checkoutUrl: '', // NOTE: where to get checkoutUrl??
    cost: {
      // NOTE: these props lay down in checkout not cart
      subtotalAmount: {
        amount: checkout.subtotal.value.toString(),
        currencyCode: checkout.subtotal.currencyCode
      },
      totalAmount: {
        amount: checkout.grandTotal.value.toString(),
        currencyCode: checkout.grandTotal.currencyCode
      },
      totalTaxAmount: {
        amount: checkout.taxTotal.value.toString(),
        currencyCode: checkout.taxTotal.currencyCode
      }
    },
    lines: bigcommerceToVercelCartItems(cart.lineItems, products),
    totalQuantity: cart.lineItems.totalQuantity
  };
};

const bigCommerceToVercelCollection = (collection: BigCommerceCollection): VercelCollection => {
  if (!collection) {
    return {
      handle: '',
      title: '',
      description: '',
      seo: {
        title: '',
        description: ''
      },
      updatedAt: '',
      path: ''
    };
  }

  return {
    handle: collection.entityId.toString() || collection.name,
    title: collection.name,
    description: collection.description,
    seo: {
      title: collection.seo.pageTitle,
      description: collection.seo.metaDescription
    },
    updatedAt: new Date().toISOString(),
    path: `/search${collection.path}`
  };
};

export {
  bigcommerceToVercelCart,
  bigcommerceToVercelProduct,
  bigcommerceToVercelProducts,
  bigCommerceToVercelCollection,
  vercelFromBigCommerceLineItems
};

export const vercelToBigCommerceSorting = (
  isReversed: boolean,
  sortKey?: string
): keyof typeof BigCommerceSortKeys | null => {
  const VercelSorting: Record<string, string> = {
    RELEVANCE: 'RELEVANCE',
    BEST_SELLING: 'BEST_SELLING',
    CREATED_AT: 'CREATED_AT',
    PRICE: 'PRICE'
  };

  if (!sortKey || VercelSorting[sortKey] === undefined) {
    return null;
  }

  if (sortKey === VercelSortKeys.PRICE) {
    return isReversed
      ? vercelToBigCommerceSortKeys.PRICE_ON_REVERSE
      : vercelToBigCommerceSortKeys.PRICE;
  }

  return vercelToBigCommerceSortKeys[sortKey as keyof typeof VercelSortKeys];
};

export const bigCommerceToVercelPageContent = (page: BigCommercePage): VercelPage => {
  return {
    id: page.entityId.toString(),
    title: page.name,
    handle: page.path,
    body: page.htmlBody ?? '',
    bodySummary: page.plainTextSummary ?? '',
    seo: {
      title: page.seo.pageTitle,
      description: page.seo.metaDescription
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};
