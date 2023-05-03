import { isMedusaError } from 'lib/type-guards';
import {
  Cart,
  MedusaCart,
  MedusaProduct,
  MedusaProductCollection,
  MedusaProductOption,
  MedusaProductVariant,
  Product,
  ProductCollection,
  ProductOption,
  ProductVariant,
  SelectedOption
} from './types';

// const endpoint = `${process.env.MEDUSA_BACKEND_API!}`;
const endpoint = `http://localhost:9000/store`;

export default async function medusaRequest(
  method: string,
  path = '',
  payload?: Record<string, unknown> | undefined
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const result = await fetch(`${endpoint}/${path}`, options);

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isMedusaError(e)) {
      throw {
        status: e.status || 500,
        message: e.message
      };
    }

    throw {
      error: e
    };
  }
}

const reshapeCart = (cart: MedusaCart): Cart => {
  const lines = cart.items;
  const totalQuantity = cart.items.length || 0;

  return {
    ...cart,
    totalQuantity,
    lines
  };
};

const reshapeProduct = (product: MedusaProduct): Product => {
  const priceRange = {
    maxVariantPrice: {
      amount: product.variants?.[0]?.prices?.[0]?.amount.toString() ?? '',
      currencyCode: product.variants?.[0]?.prices?.[0]?.currency_code ?? ''
    }
  };
  const updatedAt = product.updated_at;
  const tags = product.tags?.map((tag) => tag.value) || [];
  const descriptionHtml = product.description ?? '';
  const featuredImage = {
    url: product.images?.[0]?.url ?? '',
    altText: product.images?.[0]?.id ?? ''
  };
  const availableForSale = true;
  const variants = product.variants.map((variant) =>
    reshapeProductVariant(variant, product.options)
  );

  let options;
  product.options && (options = product.options.map((option) => reshapeProductOption(option)));

  return {
    ...product,
    featuredImage,
    priceRange,
    updatedAt,
    tags,
    descriptionHtml,
    availableForSale,
    options,
    variants
  };
};

const reshapeProductOption = (productOption: MedusaProductOption): ProductOption => {
  const availableForSale = true;
  const name = productOption.title;
  let values = productOption.values?.map((option) => option.value) || [];
  values = [...new Set(values)];

  return {
    ...productOption,
    availableForSale,
    name,
    values
  };
};

const mapOptionIds = (productOptions: MedusaProductOption[]) => {
  const map: Record<string, string> = {};
  productOptions.forEach((option) => {
    map[option.id] = option.title;
  });
  return map;
};

const reshapeProductVariant = (
  productVariant: MedusaProductVariant,
  productOptions?: MedusaProductOption[]
): ProductVariant => {
  let selectedOptions: SelectedOption[] = [];
  if (productOptions && productVariant.options) {
    const optionIdMap = mapOptionIds(productOptions);
    selectedOptions = productVariant.options.map((option) => ({
      name: optionIdMap[option.option_id] ?? '',
      value: option.value
    }));
  }
  const availableForSale = !!productVariant.inventory_quantity;

  const price = {
    amount: productVariant.prices?.[0]?.amount.toString() ?? '',
    currencyCode: productVariant.prices?.[0]?.currency_code ?? ''
  };
  return {
    ...productVariant,
    availableForSale,
    selectedOptions,
    price
  };
};

const reshapeCollection = (collection: MedusaProductCollection): ProductCollection => {
  const description = collection.metadata?.description?.toString() ?? '';
  const seo = {
    title: collection?.metadata?.seo_title?.toString() ?? '',
    description: collection?.metadata?.seo_description?.toString() ?? ''
  };
  const path = `/${collection.handle}`;
  const updatedAt = collection.updated_at;

  return {
    ...collection,
    description,
    seo,
    path,
    updatedAt
  };
};

export async function createCart(): Promise<Cart> {
  const res = await medusaRequest('POST', '/carts', {});
  console.log('Cart created!');
  console.log(res);
  return reshapeCart(res.body.cart);
}

export async function addToCart(
  cartId: string,
  lineItems: { variantId: string; quantity: number }[]
): Promise<Cart> {
  console.log(lineItems);
  // TODO: transform lines into Medusa line items
  const res = await medusaRequest('POST', `/carts/${cartId}/line-items`, {
    lineItems
  });

  return res.body.data.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  // TODO: We only allow you to pass a single line item to delete
  const res = await medusaRequest('DELETE', `/carts/${cartId}/line-items/${lineIds[0]}`);

  return res.body.data.cart;
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  console.log(lines);
  // TODO: transform lines into Medusa line items
  const res = await medusaRequest('POST', `/carts/${cartId}`, {});
  return res.body.data.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const res = await medusaRequest('GET', `/carts/${cartId}`);

  if (!res.body.cart) {
    return null;
  }

  return res.body.cart;
}

export async function getCollection(handle: string): Promise<ProductCollection | undefined> {
  const res = await medusaRequest('GET', `/collections?handle[]=${handle}&limit=1`);
  return res.body.collections[0];
}

export async function getCollectionProducts(handle: string): Promise<Product[]> {
  const collection = await getCollection(handle);

  if (!collection) {
    return [];
  }

  const res = await medusaRequest('GET', `/products?collection_id[]=${collection.id}`);

  if (!res.body?.products) {
    return [];
  }

  const products: Product[] = res.body.products.map((product: MedusaProduct) =>
    reshapeProduct(product)
  );

  return products;
}

export async function getCollections(): Promise<ProductCollection[]> {
  const res = await medusaRequest('GET', '/collections');

  const collections: ProductCollection[] = res.body.collections.map(
    (collection: MedusaProductCollection) => reshapeCollection(collection)
  );

  return collections;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await medusaRequest('GET', `/products?handle=${handle}&limit=1`);
  const product = res.body.products[0];
  return reshapeProduct(product);
}

export async function getProducts({
  query
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await medusaRequest('get', `/products?q=${query}&limit=20`);
  const products: Product[] = res.body.products.map((product: MedusaProduct) =>
    reshapeProduct(product)
  );
  return products;
}
