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
  Collection,
  SelectedOption
} from "./types";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { DUMMY_IMAGE, DUMMY_LOCALE, DUMMY_ZERO_EUR0, DUMMY_DELIMITER } from "./dummy-data";
import { isString, isNumber, hasLocalizedStringValue } from "./type-guards";

export function reshapeMoney(typedMoney: CommercetoolsTypedMoney): Money {
  const { fractionDigits, currencyCode, type } = typedMoney;
  const typedAmount = type === "centPrecision" ? typedMoney.centAmount : typedMoney.preciseAmount;

  const amount = (typedAmount / Math.pow(10, fractionDigits)).toString();
  return { amount, currencyCode };
}

export function reshapeImage(image: CommercetoolsImage): Image {
  // Extracts the filename from the image URL (Extracts the segment between the last '/' and the following '.')
  const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
  return {
    url: image.url,
    width: image.dimensions.w,
    height: image.dimensions.h,
    altText: image.label || filename || ""
  };
}

export function reshapeProductProjection(
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

  const tags =
    metaKeywords?.[DUMMY_LOCALE]?.split(DUMMY_DELIMITER).map((word) => word.trim()) || [];

  if (
    !reshapedMasterVariant ||
    !handle ||
    !title ||
    (filterHiddenProducts && tags.includes(HIDDEN_PRODUCT_TAG))
  )
    return undefined;

  let priceRange = {
    minVariantPrice: reshapedMasterVariant.price,
    maxVariantPrice: reshapedMasterVariant.price
  };

  for (const variant of reshapedVariants) {
    const { amount } = variant.price;

    if (amount < priceRange.minVariantPrice.amount) priceRange.minVariantPrice = variant.price;

    if (amount > priceRange.maxVariantPrice.amount) priceRange.maxVariantPrice = variant.price;
  }

  // Reduce all images of all variants in one array and remove duplicates.
  const images: Image[] = [];
  for (const variant of [masterVariant, ...variants]) {
    if (!variant.images) continue;

    for (const image of variant.images) {
      if (!images.some((img) => img.url == image.url)) images.push(reshapeImage(image));
    }
  }

  // Set featured Image to first image or placeholder image.
  const featuredImage = images[0] || DUMMY_IMAGE;

  const options = reshapeAttributesToOptions(
    masterVariant.attributes,
    variants.map((variant) => variant.attributes)
  );

  const allReshapedVariants = [reshapedMasterVariant, ...reshapedVariants];

  const product = {
    id,
    handle,
    availableForSale: allReshapedVariants.some((variant) => variant.availableForSale),
    title,
    description: description?.[DUMMY_LOCALE] || "",
    descriptionHtml: description?.[DUMMY_LOCALE] || "", // needs to be replaced
    options,
    priceRange,
    variants: allReshapedVariants,
    featuredImage,
    images,
    seo: {
      title: metaTitle?.[DUMMY_LOCALE] || undefined,
      description: metaDescription?.[DUMMY_LOCALE] || undefined
    },
    tags,
    updatedAt: lastModifiedAt
  };
  console.log(JSON.stringify(product));
  return product;
}

export function reshapeProductProjections(
  productProjections: CommercetoolsProductProjection[]
): Product[] {
  return productProjections
    .map((item) => reshapeProductProjection(item))
    .filter((item) => item !== undefined) as Product[];
}

export function reshapeLineItem(lineItem: CommercetoolsLineItem): CartItem {
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

export function reshapeCart(cart: CommercetoolsCart): Cart {
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

export function reshapeProductVariant(
  variant: CommercetoolsProductVariant
): ProductVariant | undefined {
  const id = variant.sku;
  const price = variant.price?.value;

  if (!id || !price) return undefined;

  const selectedOptions = reshapeAttributesToSelectedOptions(variant.attributes || []);

  return {
    id,
    availableForSale: variant.availability?.isOnStock || false,
    selectedOptions,
    price: reshapeMoney(price)
  };
}

export function reshapeProductVariants(variants: CommercetoolsProductVariant[]): ProductVariant[] {
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
export function reshapeAttributesToOptions(
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

  return options;
}

/**
 * Reshapes a list of attributes into selected options, extracting the name and value.
 *
 * @param {CommercetoolsAttribute[]} attributes - The list of attributes to reshape.
 * @returns {SelectedOption[]} The array of selected options with their names and values.
 */
export function reshapeAttributesToSelectedOptions(
  attributes: CommercetoolsAttribute[]
): SelectedOption[] {
  const selectedOptions = [];
  for (const { name, value } of attributes) {
    if (isString(value)) selectedOptions.push({ name, value });
    else if (isNumber(value)) selectedOptions.push({ name, value: value.toString() });
    else if (hasLocalizedStringValue(value, DUMMY_LOCALE))
      selectedOptions.push({ name, value: value[DUMMY_LOCALE] });
  }
  return selectedOptions;
}

export function reshapeCategory(category: CommercetoolsCategory): Collection | undefined {
  const { name, slug, description, metaTitle, metaDescription, lastModifiedAt } = category;
  const handle = slug[DUMMY_LOCALE];
  const title = name[DUMMY_LOCALE];

  if (!handle || !title) return undefined;

  return {
    title,
    handle,
    description: description?.[DUMMY_LOCALE] || "",
    seo: {
      title: metaTitle?.[DUMMY_LOCALE] || undefined,
      description: metaDescription?.[DUMMY_LOCALE] || undefined
    },
    updatedAt: lastModifiedAt,
    path: `/search/${handle}`
  };
}

export function reshapeCategories(categories: CommercetoolsCategory[]): Collection[] {
  return categories
    .map((item) => reshapeCategory(item))
    .filter((item) => item !== undefined) as Collection[];
}
