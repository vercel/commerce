import {
  TypedMoney as CommercetoolsTypedMoney,
  Image as CommercetoolsImage,
  ProductProjection as CommercetoolsProductProjection,
  Cart as CommercetoolsCart,
  LineItem as CommercetoolsLineItem,
  ProductVariant as CommercetoolsProductVariant,
  Attribute as CommercetoolsAttribute,
  Category as CommercetoolsCategory
} from "@commercetools/platform-sdk";
import {
  Image,
  Money,
  Product,
  ProductOption,
  ProductVariant,
  Cart,
  CartItem,
  Collection
} from "./types";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import {
  DUMMY_CURRENCY_CODE,
  DUMMY_IMAGE,
  DUMMY_LOCALE,
  DUMMY_COUNTRY,
  DUMMY_ZERO_EUR0,
  DUMMY_LIMIT,
  DUMMY_DELIMITER
} from "./dummy-data";
import apiRoot from "lib/client-builder";
import { isString, isNumber, hasLocalizedStringValue } from "./type-guards";

function reshapeMoney(typedMoney: CommercetoolsTypedMoney): Money {
  const { fractionDigits, currencyCode, type } = typedMoney;
  const typedAmount = type === "centPrecision" ? typedMoney.centAmount : typedMoney.preciseAmount;

  const amount = (typedAmount / Math.pow(10, fractionDigits)).toString();
  return { amount, currencyCode };
}

function reshapeImage(image: CommercetoolsImage): Image {
  const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
  return {
    url: image.url,
    width: image.dimensions.w,
    height: image.dimensions.h,
    altText: image.label || filename || ""
  };
}

function reshapeProductProjection(
  productProjection: CommercetoolsProductProjection,
  filterHiddenProducts: boolean = true
): Product | undefined {
  const {
    id,
    description,
    masterVariant,
    variants,
    slug,
    name,
    metaTitle,
    metaDescription,
    metaKeywords,
    lastModifiedAt
  } = productProjection;

  const handle = slug[DUMMY_LOCALE];
  const title = name[DUMMY_LOCALE];
  const reshapedVariants = reshapeProductVariants(variants);
  const reshapedMasterVariant = reshapeProductVariant(masterVariant);

  if (!reshapedMasterVariant || !handle || !title) return undefined;

  let priceRange = {
    minVariantPrice: reshapedMasterVariant.price,
    maxVariantPrice: reshapedMasterVariant.price
  };

  // Calculate pricerange only if the product has variants
  if (reshapedVariants.length) {
    for (const variant of reshapedVariants) {
      const { amount } = variant.price;

      if (amount < priceRange.minVariantPrice.amount) priceRange.minVariantPrice = variant.price;

      if (amount > priceRange.maxVariantPrice.amount) priceRange.maxVariantPrice = variant.price;
    }
  }

  // Reduce all images of all variants in one array.
  const images = [masterVariant, ...variants]
    .flatMap((variant) => variant.images)
    .filter((image) => image !== undefined) as CommercetoolsImage[];

  // Set featured Image to first image of master variant or placeholder image.
  const firstImage = images[0];
  const featuredImage = firstImage ? reshapeImage(firstImage) : DUMMY_IMAGE;

  const options = reshapeAttributesToOptions(
    masterVariant.attributes,
    variants.map((variant) => variant.attributes)
  );

  const product = {
    id,
    handle,
    availableForSale: reshapedMasterVariant?.availableForSale || false,
    title,
    description: description?.[DUMMY_LOCALE] || "",
    descriptionHtml: description?.[DUMMY_LOCALE] || "", // needs to be replaced
    options,
    priceRange,
    variants: [reshapedMasterVariant, ...reshapedVariants],
    featuredImage,
    images: images.map((image) => reshapeImage(image)),
    seo: {
      title: metaTitle?.[DUMMY_LOCALE],
      description: metaDescription?.[DUMMY_LOCALE]
    },
    tags: metaKeywords?.[DUMMY_LOCALE]?.split(DUMMY_DELIMITER).map((word) => word.trim()) || [],
    updatedAt: lastModifiedAt
  };

  if (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG)) {
    return undefined;
  }

  return product;
}

function reshapeProductProjections(
  productProjections: CommercetoolsProductProjection[]
): Product[] {
  return productProjections
    .map((item) => reshapeProductProjection(item))
    .filter((item) => item !== undefined) as Product[];
}

function reshapeLineItem(lineItem: CommercetoolsLineItem): CartItem {
  const firstVariantImage = lineItem.variant.images?.[0];
  const featuredImage = firstVariantImage ? reshapeImage(firstVariantImage) : DUMMY_IMAGE; // needs to be replaced by placeholder image

  const selectedOptions = reshapeAttributesToSelectedOptions(lineItem.variant.attributes || []);

  return {
    id: lineItem.id,
    quantity: lineItem.quantity,
    cost: { totalAmount: reshapeMoney(lineItem.totalPrice) },
    merchandise: {
      id: lineItem.variant.sku as string,
      title: lineItem.name[DUMMY_LOCALE] || "",
      selectedOptions,
      product: {
        handle: lineItem.productSlug?.[DUMMY_LOCALE] || "",
        title: lineItem.name[DUMMY_LOCALE] || "",
        featuredImage
      }
    }
  };
}

function reshapeCart(cart: CommercetoolsCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: "", // needs to be replaced
    cost: {
      totalAmount: reshapeMoney(cart.taxedPrice?.totalGross || cart.totalPrice),
      totalTaxAmount: reshapeMoney(cart.taxedPrice?.totalTax || DUMMY_ZERO_EUR0)
    },
    lines: cart.lineItems.map((lineItem) => reshapeLineItem(lineItem)),
    totalQuantity: cart.totalLineItemQuantity || 0
  };
}

function reshapeProductVariant(variant: CommercetoolsProductVariant): ProductVariant | undefined {
  const sku = variant.sku;
  const price = variant.price?.value;

  if (!sku || !price) return undefined;

  const selectedOptions = reshapeAttributesToSelectedOptions(variant.attributes || []);

  return {
    id: variant.sku,
    availableForSale: variant.availability?.isOnStock || false,
    selectedOptions,
    price: reshapeMoney(price)
  };
}

function reshapeProductVariants(variants: CommercetoolsProductVariant[]): ProductVariant[] {
  return variants
    .map((variant) => reshapeProductVariant(variant))
    .filter((variant) => variant !== undefined) as ProductVariant[];
}

/**
 * Reshapes attributes of all variants of a product into product options.
 * All key value pairs of the existing attributes are combined and then all values with a common key are combined.
 *
 * @param {CommercetoolsAttribute[] | undefined} masterVariantAttributes - Master variant attributes.
 * @param {CommercetoolsAttribute[] | undefined} variantAttributes - Variant attributes.
 * @returns {ProductOption[]} - Array of product options.
 */
function reshapeAttributesToOptions(
  masterVariantAttributes: CommercetoolsAttribute[] | undefined,
  variantAttributes: (CommercetoolsAttribute[] | undefined)[]
): ProductOption[] {
  const attributes = [masterVariantAttributes, ...variantAttributes].flat();

  // Remove all attributes that are undefined and group the values with the same name
  const options: ProductOption[] = [];
  for (const attribute of attributes) {
    if (!attribute) continue;
    const { name, value } = attribute;
    let valueAsString: string;

    // Check whether the value is a string, a number or a localized string and convert it to a string, if it is not, stop the iteration.
    if (isString(value)) valueAsString = value;
    else if (isNumber(value)) valueAsString = value.toString();
    else if (hasLocalizedStringValue(value, DUMMY_LOCALE)) valueAsString = value[DUMMY_LOCALE];
    else continue;

    // Add the current attribute to options if it does not yet exist. If it does exist, add the value of the attribute to the associated option if the value does not yet exist.
    const index = options.findIndex((option) => option.name === name);
    if (index === -1) {
      options.push({ name, id: name, values: [valueAsString] });
    } else {
      const existingOption = options[index] as ProductOption;
      if (!existingOption.values.includes(valueAsString)) existingOption.values.push(valueAsString);
    }
  }
  console.log("OPTIONS", options);
  return options;
}

function reshapeAttributesToSelectedOptions(
  attributes: CommercetoolsAttribute[]
): { name: string; value: string }[] {
  let selectedOptions = [];
  for (const { name, value } of attributes) {
    if (isString(value)) selectedOptions.push({ name, value });
    else if (isNumber(value)) selectedOptions.push({ name, value: value.toString() });
    else if (hasLocalizedStringValue(value, DUMMY_LOCALE))
      selectedOptions.push({ name, value: value[DUMMY_LOCALE] });
  }
  return selectedOptions;
}

function reshapeCategory(category: CommercetoolsCategory): Collection | undefined {
  const { name, slug, description, metaTitle, metaDescription, lastModifiedAt } = category;
  const title = name[DUMMY_LOCALE];
  const handle = slug[DUMMY_LOCALE];

  if (!handle || !title) return undefined;

  return {
    title,
    handle,
    description: description?.[DUMMY_LOCALE] || "",
    seo: {
      title: metaTitle?.[DUMMY_LOCALE],
      description: metaDescription?.[DUMMY_LOCALE]
    },
    updatedAt: lastModifiedAt,
    path: `/search/${handle}`
  };
}

function reshapeCategories(categories: CommercetoolsCategory[]): Collection[] {
  return categories
    .map((item) => reshapeCategory(item))
    .filter((item) => item !== undefined) as Collection[];
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  try {
    const response = await apiRoot
      .categories()
      .get({
        queryArgs: {
          where: `slug(${DUMMY_LOCALE}="${handle}")`
        }
      })
      .execute();

    const matchedCategory = response.body.results[0];

    if (!matchedCategory) return undefined;

    return reshapeCategory(matchedCategory);
  } catch (err) {
    return undefined;
  }
}

export async function getCollections(): Promise<Collection[]> {
  const response = await apiRoot.categories().get().execute();
  return reshapeCategories(response.body.results);
}

/**
 * Requests a productprojection based on its handle (slug) from commercetools and reshapes it.
 *
 * @param {string} handle - The handle (slug) of the product.
 * @returns {Promise<Product | undefined>} A promise resolving to the retrieved product or undefined if not found.
 */
export async function getProduct(handle: string): Promise<Product | undefined> {
  try {
    const response = await apiRoot
      .productProjections()
      .get({
        queryArgs: {
          where: `slug(${DUMMY_LOCALE}="${handle}")`,
          priceCurrency: DUMMY_CURRENCY_CODE,
          priceCountry: DUMMY_COUNTRY
        }
      })
      .execute();

    const matchedProductProjection = response.body.results[0];

    if (!matchedProductProjection) return undefined;

    return reshapeProductProjection(matchedProductProjection);
  } catch (err) {
    return undefined;
  }
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  return [];
}

/**
 * Requests a list of product projections based on optional query, sort key and reverse flag from commercetools and reshapes it.
 *
 * @param {Object} options - The options object containing query, reverse, and sortKey.
 * @param {string} [options.query] - The optional query string for commercetools fulltext search.
 * @param {boolean} [options.reverse] - Flag to indicate whether to reverse the products list.
 * @param {string} [options.sortKey] - The key to sort the products ().
 * @returns {Promise<Product[]>} A promise resolving to an array of products.
 */
export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  try {
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: DUMMY_LIMIT,
          [`text.${DUMMY_LOCALE}`]: query,
          priceCurrency: DUMMY_CURRENCY_CODE,
          priceCountry: DUMMY_COUNTRY,
          sort: sortKey
        }
      })
      .execute();

    const products = reshapeProductProjections(response.body.results);

    return reverse ? products.reverse() : products;
  } catch (err) {
    return [];
  }
}

/**
 * Requests a list of product projections filtered by a collection (category) based on optional sort key and reverse flag from commercetools and reshapes it.
 *
 * @param {Object} options - The options object containing query, reverse, and sortKey.
 * @param {collection} [options.collection] - Handle (slug) of collection
 * @param {boolean} [options.reverse] - Flag to indicate whether to reverse the products list.
 * @param {string} [options.sortKey] - The key to sort the products ().
 * @returns {Promise<Product[]>} A promise resolving to an array of products.
 */
export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  try {
    // Get category by slug
    const categoriesResponse = await apiRoot
      .categories()
      .get({ queryArgs: { where: `slug(${DUMMY_LOCALE}="${collection}")` } })
      .execute();

    const categoryId = categoriesResponse.body.results[0]?.id;

    if (!categoryId) return [];

    // Get filtered product projections
    const productProjectionsResponse = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: DUMMY_LIMIT,
          filter: `categories.id:"${categoryId}"`,
          priceCurrency: DUMMY_CURRENCY_CODE,
          priceCountry: DUMMY_COUNTRY,
          sort: sortKey
        }
      })
      .execute();

    const products = reshapeProductProjections(productProjectionsResponse.body.results);

    return reverse ? products.reverse() : products;
  } catch (err) {
    return [];
  }
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  try {
    const response = await apiRoot.carts().withId({ ID: cartId }).get().execute();
    return reshapeCart(response.body);
  } catch (err) {
    return undefined;
  }
}

export async function createCart(): Promise<Cart> {
  const response = await apiRoot
    .carts()
    .post({ body: { currency: DUMMY_CURRENCY_CODE, country: DUMMY_COUNTRY } })
    .execute();

  return reshapeCart(response.body);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const activeCartResponse = await apiRoot.carts().withId({ ID: cartId }).get().execute();
  const version = activeCartResponse.body.version;

  const response = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: lines.map((line) => ({
          action: "changeLineItemQuantity",
          lineItemId: line.id,
          quantity: line.quantity
        }))
      }
    })
    .execute();

  return reshapeCart(response.body);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const activeCartResponse = await apiRoot.carts().withId({ ID: cartId }).get().execute();
  const version = activeCartResponse.body.version;

  const response = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: lines.map((line) => ({
          action: "addLineItem",
          sku: line.merchandiseId,
          quantity: line.quantity
        }))
      }
    })
    .execute();

  return reshapeCart(response.body);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const activeCartResponse = await apiRoot.carts().withId({ ID: cartId }).get().execute();
  const version = activeCartResponse.body.version;

  const response = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: lineIds.map((lineId) => ({
          action: "removeLineItem",
          lineItemId: lineId
        }))
      }
    })
    .execute();

  return reshapeCart(response.body);
}
