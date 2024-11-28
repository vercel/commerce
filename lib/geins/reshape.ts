import { GeinsMenuType } from '@geins/types';
import {
  CURRENCY_CODE,
  DEFAULT_SKU_VARIATION,
  IMAGE_URL,
  LONG_DESCRIPTION,
  SHORT_DESCRIPTION
} from './constants';
import {
  CartItemType,
  CartType,
  CategoryItemType,
  CollectionType,
  PageType,
  ProductImageType,
  ProductOptionType,
  ProductRelationType,
  ProductRelationTypeEnum,
  ProductType,
  ProductVariantType
} from './types';

export const translateSortKey = (sortKey: string, reverse: boolean): string => {
  switch (sortKey) {
    case 'BEST_SELLING':
      return 'MOST_SOLD';
    case 'CREATED_AT':
      return 'LATEST';
    case 'PRICE':
      if (reverse) {
        return 'PRICE';
      }
      return 'PRICE_DESC';
    default:
      return 'RELEVANCE';
  }
};

export const reshapeCategories = (geinsCategories: any): CategoryItemType[] => {
  if (!geinsCategories || !geinsCategories?.categories.length) {
    return [];
  }

  return geinsCategories.categories.map((item: any) => ({
    id: item?.categoryId ?? '',
    title: item?.name ?? '',
    name: item?.name ?? '',
    parentId: item?.parentCategoryId || '',
    path: item?.canonicalUrl?.split('/').pop() || '',
    slug: item?.alias ?? ''
  }));
};

export const reshapeListPageMetadata = (geinsCategoryMetadata: any): CollectionType => {
  const rawCategory = geinsCategoryMetadata?.listPageInfo;
  if (!rawCategory) {
    return {} as CollectionType;
  }

  let seoTitle = rawCategory?.meta?.title || rawCategory?.name || '';
  seoTitle = seoTitle.replace(/\[name\]/g, rawCategory?.name || '');

  const seoDescription = rawCategory?.meta?.description || '';
  return {
    id: rawCategory?.id || '',
    title: rawCategory?.name || '',
    handle: rawCategory?.alias || '',
    seo: {
      title: seoTitle,
      description: seoDescription
    },
    description: rawCategory?.primaryDescription || ''
  };
};

export const reshapeProducts = (geinsData: any): ProductType[] => {
  if (!geinsData) {
    throw new Error('Invalid products query response');
  }
  const rawProducts = geinsData;
  if (!rawProducts) {
    return [];
  }
  return rawProducts.map((product: any) => reshapeProduct(product));
};

export const reshapeProduct = (geinsProductData: any): ProductType => {
  const rawProduct = geinsProductData;

  const tags: string[] = [];
  const relations: ProductRelationType[] = [];
  if (rawProduct.primaryCategory) {
    tags.push(rawProduct.primaryCategory.name);
    relations.push({
      type: ProductRelationTypeEnum.CATEGORY,
      name: rawProduct.primaryCategory.name,
      alias: rawProduct.primaryCategory.alias
    });
  }

  if (rawProduct.brand) {
    tags.push(rawProduct.brand.name);
    relations.push({
      type: ProductRelationTypeEnum.BRAND,
      name: rawProduct.brand.name,
      alias: rawProduct.brand.alias
    });
  }
  if (rawProduct.categories) {
    rawProduct.categories.forEach((category: any) => {
      tags.push(category.name);
    });
  }
  // remove duplicates
  const uniqueTags = [...new Set(tags)];
  tags.push(...uniqueTags);

  // add descriptions from environment variables
  const shortDescription = rawProduct.texts?.[SHORT_DESCRIPTION] || '';
  const longDescription = rawProduct.texts?.[LONG_DESCRIPTION] || '';

  // add images
  const images = rawProduct.productImages?.map(
    (image: any): ProductImageType => ({
      caption: rawProduct.name,
      altText: rawProduct.name,
      src: `${IMAGE_URL}/product/1200f1500/${image.fileName}`,
      url: `${IMAGE_URL}/product/1200f1500/${image.fileName}`,
      height: 1600,
      width: 2000
    })
  );

  // add variations and options
  let variations: ProductVariantType[] = [];
  let options: ProductOptionType[] = [];

  if (rawProduct.variantGroup) {
    variations = [...reshapeProductVariations(rawProduct)];
    options = [...reshapeProductOptions(variations)];
  }

  return {
    id: rawProduct.productId,
    seo: {
      title: rawProduct.meta?.title,
      description: rawProduct.meta?.description
    },
    metaTitle: rawProduct.meta?.title || rawProduct.name,
    metaDescription: rawProduct.meta?.description || shortDescription,
    name: rawProduct.name,
    title: rawProduct.name,
    slug: rawProduct.alias,
    handle: rawProduct.alias,
    description: shortDescription,
    descriptionHtml: rawProduct.texts?.text1 || '',
    priceRange: {
      minVariantPrice: {
        amount: rawProduct.unitPrice?.sellingPriceIncVat,
        currencyCode: CURRENCY_CODE
      },
      maxVariantPrice: {
        amount: rawProduct.unitPrice?.sellingPriceIncVat,
        currencyCode: CURRENCY_CODE
      }
    },
    price: rawProduct.unitPrice.sellingPriceIncVat,
    currency: CURRENCY_CODE,
    stockTracking: !!rawProduct.totalStock,
    stockPurchasable: rawProduct.totalStock?.inStock || false,
    stockLevel: rawProduct.totalStock?.totalStock || 0,
    availableForSale: true,
    tags: tags || [],
    options: [...options] || [],
    variants: variations || [],
    featuredImage: images[0],
    images: images,
    relations: relations
  };
};

const reshapeProductOptions = (variants: any[]): ProductOptionType[] => {
  const optionsMap: Record<string, { id: string; name: string; values: Set<string> }> = {};

  variants.forEach((variant) => {
    if (variant.selectedOptions && Array.isArray(variant.selectedOptions)) {
      variant.selectedOptions.forEach((option: { name: string; value: string }) => {
        // Ensure `optionsMap[option.name]` is initialized
        if (!optionsMap[option.name]) {
          optionsMap[option.name] = {
            id: option.name.toLowerCase(),
            name: option.name,
            values: new Set()
          };
        }
        // Now it is safe to access `optionsMap[option.name].values`
        optionsMap[option.name]?.values.add(option.value);
      });
    }
  });

  // Convert the map to an array and transform the Set of values to an array
  return Object.values(optionsMap).map((option) => ({
    id: option.id,
    name: option.name,
    values: Array.from(option.values)
  }));
};

const reshapeSkusToVariants = (skus: any[]): ProductVariantType[] => {
  return skus.map((sku) => ({
    id: sku.skuId.toString(),
    title: sku.name,
    availableForSale: sku.stock?.totalStock > 0 || false,
    selectedOptions: [{ name: DEFAULT_SKU_VARIATION, value: sku.name }],
    price: {
      amount: '0',
      currencyCode: CURRENCY_CODE
    }
  }));
};

const reshapeProductVariations = (geinsProductData: any): ProductVariantType[] => {
  // filter out the default product from dimensions
  const dimensions = geinsProductData.variantDimensions.filter(
    (dimension: any) => dimension.dimension !== 'DefaultProduct'
  );
  if (dimensions.length === 0) {
    return reshapeSkusToVariants(geinsProductData.skus);
  }

  const buildVariantsArray = (
    variants: any[],
    selectedOptions: any[] = [],
    parent: any = undefined
  ): any[] => {
    const result: any[] = []; // Collect the final results here

    if (!Array.isArray(variants)) {
      return result; // Safeguard against invalid input
    }

    for (const variant of variants) {
      // Look ahead to check if the current variant is DefaultSku with a single value
      const hasNextLevel = Array.isArray(variant.variants) && variant.variants.length > 0;

      // Create the current option
      const newSelectedOptions = [...selectedOptions];
      const currentOption = {
        name: variant.dimension,
        value: variant.value
      };
      newSelectedOptions.push(currentOption);

      if (hasNextLevel) {
        const nestedResults = buildVariantsArray(variant.variants, newSelectedOptions, variant);
        result.push(...nestedResults);
      } else {
        const hasOnlyOneOption =
          (parent && parent.variants.length === 1 && variant.dimension === 'DefaultSku') || false;
        if (hasOnlyOneOption) {
          newSelectedOptions.pop();
        }

        result.push({
          id: variant.skuId.toString(),
          title: newSelectedOptions.map((opt) => opt.value).join(','),
          availableForSale: variant.stock?.totalStock > 0 || false, // Handle stock availability
          selectedOptions: newSelectedOptions,
          price: {
            amount: '',
            currencyCode: CURRENCY_CODE // Replace with actual currency code
          }
        });
      }
    }

    return result;
  };
  const reshapedVariants = buildVariantsArray(geinsProductData.variantGroup.variants);

  return reshapedVariants;
};

export const reshapeCart = (geinsData: any): CartType => {
  if (!geinsData) {
    return {} as CartType;
  }

  const items: CartItemType[] = [];
  let totalQuantity = 0;
  geinsData.items?.forEach((item: any) => {
    totalQuantity += item.quantity;
    const sku = item.product.skus[0];
    items.push({
      id: item.id,
      quantity: item.quantity,
      cost: {
        totalAmount: {
          amount: item.totalPrice.sellingPriceIncVat + '',
          currencyCode: CURRENCY_CODE
        }
      },
      merchandise: {
        id: item.skuId,
        title: sku.name,
        selectedOptions: [{ name: 'Size', value: sku.name }],
        product: {
          id: item.product.productId,
          handle: item.product.alias,
          title: item.product.name,
          featuredImage: {
            caption: item.product.name,
            altText: item.product.name,
            url: `${IMAGE_URL}/product/100f125/${item.product.productImages[0].fileName}`,
            src: `${IMAGE_URL}/product/100f125/${item.product.productImages[0].fileName}`,
            height: 1600,
            width: 2000
          }
        }
      }
    });
  });

  const vatSum =
    geinsData.summary.total.sellingPriceIncVat - geinsData.summary.total.sellingPriceExVat;
  const data = {
    id: geinsData.id || 'no-cart-id',
    lines: items || [],
    totalQuantity: totalQuantity,
    cost: {
      subtotalAmount: {
        amount: geinsData.summary.total.sellingPriceExVat + '',
        currencyCode: CURRENCY_CODE
      },
      totalTaxAmount: {
        amount: vatSum + '',
        currencyCode: CURRENCY_CODE
      },
      totalAmount: {
        amount: geinsData.summary.total.sellingPriceIncVat + '',
        currencyCode: CURRENCY_CODE
      }
    },

    checkoutUrl: '/checkout'
  };
  return data;
};

export const reshapeCheckout = (geinsData: any): PageType => {
  const checkoutPage: PageType = {
    id: 'checkout',
    title: 'Checkout example',
    handle: 'checkout',
    body: '',
    bodySummary: '',
    seo: {
      title: 'Checkout',
      description: 'Checkout page'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (!geinsData || !geinsData.createOrUpdateCheckout) {
    checkoutPage.body = 'No payment options available';
    return checkoutPage;
  }
  if (
    !geinsData.createOrUpdateCheckout.paymentOptions ||
    geinsData.createOrUpdateCheckout.paymentOptions.length === 0
  ) {
    checkoutPage.body = 'No payment options available';
    return checkoutPage;
  }
  checkoutPage.body = geinsData.createOrUpdateCheckout.paymentOptions[0].paymentData;
  return checkoutPage;
};

export const reshapeMenu = (geinsMenu: GeinsMenuType, locationId: string) => {
  if (!geinsMenu.menuItems) {
    return [];
  }
  return geinsMenu.menuItems.map((item) => {
    let itemPath = item?.canonicalUrl?.split('/').pop() || '';
    if (item?.type === 'category') {
      itemPath = '/search/' + itemPath;
    } else if (item?.type === 'custom') {
      itemPath = item?.canonicalUrl || '';
    }
    return {
      id: locationId + ':' + item?.id || '',
      title: item?.title || '',
      path: itemPath || ''
    };
  });
};

export const reshapePage = (geinsPage: any, alias: string): PageType => {
  if (!geinsPage) {
    undefined;
  }

  const title = geinsPage.meta.title || '';
  const today = new Date().toISOString();

  const body = geinsPage.containers.map((container: any) => {
    const content = container.content.map((item: any) => {
      if (item.config.type === 'TextPageWidget') {
        return `
                  <h3>${item.data.title}</h3>
                  <p>
                  ${item.data.text}
                  </p>
                  `;
      }
      if (item.config.type === 'HTMLPageWidget') {
        return `${item.data.html}`;
      }
      if (item.config.type === 'ImagePageWidget') {
        return `<img src="${IMAGE_URL}/pagewidget/600w/${item.data.image.filename}" alt="${item.data.image.altText}" />`;
      }
      return '';
    });
    return content.join(' ');
  });

  return {
    id: geinsPage.id || '',
    title: geinsPage.title || title,
    handle: alias || '',
    body: body || '',
    bodySummary: geinsPage?.bodySummary || '',
    seo: geinsPage?.seo || '',
    createdAt: geinsPage?.createdAt || today,
    updatedAt: geinsPage?.updatedAt || today
  };
};
