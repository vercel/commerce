import {
  Checkout,
  Customer,
  Product as SalesforceProduct,
  Search,
} from "commerce-sdk";
import { ShopperBaskets } from "commerce-sdk/dist/checkout/checkout";
import { defaultSort, storeCatalog, TAGS } from "lib/constants";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getProductRecommendations as getOCProductRecommendations } from "./ocapi";
import {
  Cart,
  CartItem,
  Collection,
  Image,
  Product,
  ProductRecommendations,
} from "./types";

const config = {
  headers: {},
  parameters: {
    clientId: process.env.SFCC_CLIENT_ID,
    organizationId: process.env.SFCC_ORGANIZATIONID,
    shortCode: process.env.SFCC_SHORTCODE,
    siteId: process.env.SFCC_SITEID,
  },
};

type SortedProductResult = {
  productResult: SalesforceProduct.ShopperProducts.Product;
  index: number;
};

export const getCollections = cache(
  async () => {
    return await getSFCCCollections();
  },
  ["get-collections"],
  {
    tags: [TAGS.collections],
  }
);

export function getCollection(handle: string) {
  return getCollections().then((collections) =>
    collections.find((c) => c.handle === handle)
  );
}

export const getProduct = cache(
  async (id: string) => getSFCCProduct(id),
  ["get-product"],
  {
    tags: [TAGS.products],
  }
);

export const getCollectionProducts = cache(
  async ({
    collection,
    reverse,
    sortKey,
  }: {
    collection: string;
    reverse?: boolean;
    sortKey?: string;
  }) => {
    return await searchProducts({ categoryId: collection, sortKey });
  },
  ["get-collection-products"],
  { tags: [TAGS.products, TAGS.collections] }
);

export const getProducts = cache(
  async ({
    query,
    sortKey,
  }: {
    query?: string;
    sortKey?: string;
    reverse?: boolean;
  }) => {
    return await searchProducts({ query, sortKey });
  },
  ["get-products"],
  {
    tags: [TAGS.products],
  }
);

export async function createCart() {
  let guestToken = (await cookies()).get("guest_token")?.value;

  // if there is not a guest token, get one and store it in a cookie
  if (!guestToken) {
    const tokenResponse = await getGuestUserAuthToken();
    guestToken = tokenResponse.access_token;
    (await cookies()).set("guest_token", guestToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 30,
      path: "/",
    });
  }

  // get the guest config
  const config = await getGuestUserConfig(guestToken);

  // initialize the basket config
  const basketClient = new Checkout.ShopperBaskets(config);

  // create an empty ShopperBaskets.Basket
  const createdBasket = await basketClient.createBasket({
    body: {},
  });

  const cartItems = await getCartItems(createdBasket);

  return reshapeBasket(createdBasket, cartItems);
}

export async function getCart(): Promise<Cart | undefined> {
  const cartId = (await cookies()).get("cartId")?.value!;
  // get the guest token to get the correct guest cart
  const guestToken = (await cookies()).get("guest_token")?.value;

  const config = await getGuestUserConfig(guestToken);

  if (!cartId) return;

  try {
    const basketClient = new Checkout.ShopperBaskets(config);

    const basket = await basketClient.getBasket({
      parameters: {
        basketId: cartId,
        organizationId: process.env.SFCC_ORGANIZATIONID,
        siteId: process.env.SFCC_SITEID,
      },
    });

    if (!basket?.basketId) return;

    const cartItems = await getCartItems(basket);
    return reshapeBasket(basket, cartItems);
  } catch (e: any) {
    console.log(await e.response.text());
    return;
  }
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
) {
  const cartId = (await cookies()).get("cartId")?.value!;
  // get the guest token to get the correct guest cart
  const guestToken = (await cookies()).get("guest_token")?.value;
  const config = await getGuestUserConfig(guestToken);

  try {
    const basketClient = new Checkout.ShopperBaskets(config);

    const basket = await basketClient.addItemToBasket({
      parameters: {
        basketId: cartId,
        organizationId: process.env.SFCC_ORGANIZATIONID,
        siteId: process.env.SFCC_SITEID,
      },
      body: lines.map((line) => {
        return {
          productId: line.merchandiseId,
          quantity: line.quantity,
        };
      }),
    });

    if (!basket?.basketId) return;

    const cartItems = await getCartItems(basket);
    return reshapeBasket(basket, cartItems);
  } catch (e: any) {
    console.log(await e.response.text());
    return;
  }
}

export async function removeFromCart(lineIds: string[]) {
  const cartId = (await cookies()).get("cartId")?.value!;
  // Next Commerce only sends one lineId at a time
  if (lineIds.length !== 1)
    throw new Error("Invalid number of line items provided");

  // get the guest token to get the correct guest cart
  const guestToken = (await cookies()).get("guest_token")?.value;
  const config = await getGuestUserConfig(guestToken);

  const basketClient = new Checkout.ShopperBaskets(config);

  const basket = await basketClient.removeItemFromBasket({
    parameters: {
      basketId: cartId,
      itemId: lineIds[0]!,
    },
  });

  const cartItems = await getCartItems(basket);
  return reshapeBasket(basket, cartItems);
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
) {
  const cartId = (await cookies()).get("cartId")?.value!;
  // get the guest token to get the correct guest cart
  const guestToken = (await cookies()).get("guest_token")?.value;
  const config = await getGuestUserConfig(guestToken);

  const basketClient = new Checkout.ShopperBaskets(config);

  // ProductItem quantity can not be updated through the API
  // Quantity updates need to remove all items from the cart and add them back with updated quantities
  // See: https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-baskets?meta=updateBasket

  // create removePromises for each line
  const removePromises = lines.map((line) =>
    basketClient.removeItemFromBasket({
      parameters: {
        basketId: cartId,
        itemId: line.id,
      },
    })
  );

  // wait for all removals to resolve
  await Promise.all(removePromises);

  // create addPromises for each line
  const addPromises = lines.map((line) =>
    basketClient.addItemToBasket({
      parameters: {
        basketId: cartId,
      },
      body: [
        {
          productId: line.merchandiseId,
          quantity: line.quantity,
        },
      ],
    })
  );

  // wait for all additions to resolve
  await Promise.all(addPromises);

  // all updates are done, get the updated basket
  const updatedBasket = await basketClient.getBasket({
    parameters: {
      basketId: cartId,
    },
  });

  const cartItems = await getCartItems(updatedBasket);
  return reshapeBasket(updatedBasket, cartItems);
}

export async function getProductRecommendations(productId: string) {
  const ocProductRecommendations =
    await getOCProductRecommendations<ProductRecommendations>(productId);

  if (!ocProductRecommendations?.recommendations?.length) return [];

  const clientConfig = await getGuestUserConfig();
  const productsClient = new SalesforceProduct.ShopperProducts(clientConfig);

  const recommendedProducts: SortedProductResult[] = [];

  await Promise.all(
    ocProductRecommendations.recommendations.map(
      async (recommendation, index) => {
        const productResult = await productsClient.getProduct({
          parameters: {
            organizationId: clientConfig.parameters.organizationId,
            siteId: clientConfig.parameters.siteId,
            id: recommendation.recommended_item_id,
          },
        });
        recommendedProducts.push({ productResult, index });
      }
    )
  );

  const sortedResults = recommendedProducts
    .sort((a: any, b: any) => a.index - b.index)
    .map((item) => item.productResult);

  return reshapeProducts(sortedResults);
}

export async function revalidate(req: NextRequest) {
  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];
  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];
  const topic = (await headers()).get("x-sfcc-topic") || "unknown";
  const secret = req.nextUrl.searchParams.get("secret");
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SFCC_REVALIDATION_SECRET) {
    console.error("Invalid revalidation secret.");
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

async function getGuestUserAuthToken() {
  const base64data = Buffer.from(
    `${process.env.SFCC_CLIENT_ID}:${process.env.SFCC_SECRET}`
  ).toString("base64");
  const headers = { Authorization: `Basic ${base64data}` };
  const client = new Customer.ShopperLogin(config);

  return await client.getAccessToken({
    headers,
    body: {
      grant_type: "client_credentials",
      channel_id: process.env.SFCC_SITEID,
    },
  });
}

async function getGuestUserConfig(token?: string) {
  const guestToken = token || (await getGuestUserAuthToken()).access_token;

  if (!guestToken) {
    throw new Error("Failed to retrieve access token");
  }

  return {
    ...config,
    headers: {
      authorization: `Bearer ${guestToken}`,
    },
  };
}

async function getSFCCCollections() {
  const config = await getGuestUserConfig();
  const productsClient = new SalesforceProduct.ShopperProducts(config);

  const result = await productsClient.getCategories({
    parameters: {
      ids: storeCatalog.ids,
    },
  });

  return reshapeCategories(result.data || []);
}

async function getSFCCProduct(id: string) {
  const config = await getGuestUserConfig();
  const productsClient = new SalesforceProduct.ShopperProducts(config);

  const product = await productsClient.getProduct({
    parameters: {
      organizationId: config.parameters.organizationId,
      siteId: config.parameters.siteId,
      id,
    },
  });

  return reshapeProduct(product);
}

async function searchProducts(options: {
  query?: string;
  categoryId?: string;
  sortKey?: string;
}) {
  const { query, categoryId, sortKey = defaultSort.sortKey } = options;
  const config = await getGuestUserConfig();

  const searchClient = new Search.ShopperSearch(config);
  const searchResults = await searchClient.productSearch({
    parameters: {
      q: query || "",
      refine: categoryId ? [`cgid=${categoryId}`] : [],
      sort: sortKey,
      limit: 100,
    },
  });

  const results: SortedProductResult[] = [];

  const productsClient = new SalesforceProduct.ShopperProducts(config);
  await Promise.all(
    searchResults.hits.map(
      async (product: { productId: string }, index: number) => {
        const productResult = await productsClient.getProduct({
          parameters: {
            organizationId: config.parameters.organizationId,
            siteId: config.parameters.siteId,
            id: product.productId,
          },
        });
        results.push({ productResult, index });
      }
    )
  );

  const sortedResults = results
    .sort((a: any, b: any) => a.index - b.index)
    .map((item) => item.productResult);

  return reshapeProducts(sortedResults);
}

async function getCartItems(createdBasket: ShopperBaskets.Basket) {
  const cartItems: CartItem[] = [];

  if (createdBasket.productItems) {
    const productsInCart: Product[] = [];

    // Fetch all matching products for items in the cart
    await Promise.all(
      createdBasket.productItems
        .filter((l: ShopperBaskets.ProductItem) => l.productId)
        .map(async (l: ShopperBaskets.ProductItem) => {
          const product = await getProduct(l.productId!);
          productsInCart.push(product);
        })
    );

    // Reshape the sfcc items and push them onto the cartItems
    createdBasket.productItems.map(
      (productItem: ShopperBaskets.ProductItem) => {
        cartItems.push(
          reshapeProductItem(
            productItem,
            createdBasket.currency || "USD",
            productsInCart.find((p) => p.id === productItem.productId)!
          )
        );
      }
    );
  }

  return cartItems;
}

function reshapeCategory(
  category: SalesforceProduct.ShopperProducts.Category
): Collection | undefined {
  if (!category) {
    return undefined;
  }

  return {
    handle: category.id,
    title: category.name || "",
    description: category.description || "",
    seo: {
      title: category.pageTitle || "",
      description: category.description || "",
    },
    updatedAt: "",
    path: `/search/${category.id}`,
  };
}

function reshapeCategories(
  categories: SalesforceProduct.ShopperProducts.Category[]
) {
  const reshapedCategories = [];
  for (const category of categories) {
    if (category) {
      const reshapedCategory = reshapeCategory(category);
      if (reshapedCategory) {
        reshapedCategories.push(reshapedCategory);
      }
    }
  }
  return reshapedCategories;
}

function reshapeProduct(product: SalesforceProduct.ShopperProducts.Product) {
  if (!product.name) {
    throw new Error("Product name is not set");
  }

  const images = reshapeImages(product.imageGroups);

  if (!images[0]) {
    throw new Error("Product image is not set");
  }

  const flattenedPrices =
    product.variants
      ?.filter((variant) => variant.price !== undefined)
      .reduce((acc: number[], variant) => [...acc, variant.price!], [])
      .sort((a, b) => a - b) || [];

  return {
    id: product.id,
    handle: product.id,
    title: product.name,
    description: product.shortDescription || "",
    descriptionHtml: product.longDescription || "",
    tags: product["c_product-tags"] || [],
    featuredImage: images[0],
    // TODO: check dates for whether it is available
    availableForSale: true,
    priceRange: {
      maxVariantPrice: {
        // TODO: verify whether there is another property for this
        amount: flattenedPrices[flattenedPrices.length - 1]?.toString() || "0",
        currencyCode: product.currency || "USD",
      },
      minVariantPrice: {
        amount: flattenedPrices[0]?.toString() || "0",
        currencyCode: product.currency || "USD",
      },
    },
    images: images,
    options:
      product.variationAttributes?.map((attribute) => {
        return {
          id: attribute.id,
          name: attribute.name!,
          // TODO: might be a better way to do this, we are providing the name as the value
          values:
            attribute.values
              ?.filter((v) => v.value !== undefined)
              ?.map((v) => v.name!) || [],
        };
      }) || [],
    seo: {
      title: product.pageTitle || "",
      description: product.pageDescription || "",
    },
    variants: reshapeVariants(product.variants || [], product),
    updatedAt: product["c_updated-date"],
  };
}

function reshapeProducts(
  products: SalesforceProduct.ShopperProducts.Product[]
) {
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
}

function reshapeImages(
  imageGroups: SalesforceProduct.ShopperProducts.ImageGroup[] | undefined
): Image[] {
  if (!imageGroups) return [];

  const largeGroup = imageGroups.filter((g) => g.viewType === "large");

  const images = [...largeGroup].map((group) => group.images).flat();

  return images.map((image) => {
    return {
      altText: image.alt!,
      url: image.disBaseLink || image.link,
      width: image.width || 800,
      height: image.height || 800,
    };
  });
}

function reshapeVariants(
  variants: SalesforceProduct.ShopperProducts.Variant[],
  product: SalesforceProduct.ShopperProducts.Product
) {
  return variants.map((variant) => reshapeVariant(variant, product));
}

function reshapeVariant(
  variant: SalesforceProduct.ShopperProducts.Variant,
  product: SalesforceProduct.ShopperProducts.Product
) {
  return {
    id: variant.productId,
    title: product.name || "",
    availableForSale: variant.orderable || false,
    selectedOptions:
      Object.entries(variant.variationValues || {}).map(([key, value]) => ({
        // TODO: we use the name here instead of the key because the frontend only uses names
        name:
          product.variationAttributes?.find((attr) => attr.id === key)?.name ||
          key,
        // TODO: might be a cleaner way to do this, we need to look up the name on the list of values from the variationAttributes
        value:
          product.variationAttributes
            ?.find((attr) => attr.id === key)
            ?.values?.find((v) => v.value === value)?.name || "",
      })) || [],
    price: {
      amount: variant.price?.toString() || "0",
      currencyCode: product.currency || "USD",
    },
  };
}

function reshapeProductItem(
  item: Checkout.ShopperBaskets.ProductItem,
  currency: string,
  matchingProduct: Product
): CartItem {
  return {
    id: item.itemId || "",
    quantity: item.quantity || 0,
    cost: {
      totalAmount: {
        amount: item.price?.toString() || "0",
        currencyCode: currency,
      },
    },
    merchandise: {
      id: item.productId || "",
      title: item.productName || "",
      selectedOptions:
        item.optionItems?.map((o) => {
          return {
            name: o.optionId!,
            value: o.optionValueId!,
          };
        }) || [],
      product: matchingProduct,
    },
  };
}

function reshapeBasket(
  basket: ShopperBaskets.Basket,
  cartItems: CartItem[]
): Cart {
  return {
    id: basket.basketId!,
    checkoutUrl: "/checkout",
    cost: {
      subtotalAmount: {
        amount: basket.productSubTotal?.toString() || "0",
        currencyCode: basket.currency || "USD",
      },
      totalAmount: {
        amount: `${(basket.productSubTotal ?? 0) + (basket.merchandizeTotalTax ?? 0)}`,
        currencyCode: basket.currency || "USD",
      },
      totalTaxAmount: {
        amount: basket.merchandizeTotalTax?.toString() || "0",
        currencyCode: basket.currency || "USD",
      },
    },
    totalQuantity:
      cartItems?.reduce((acc, item) => acc + (item?.quantity ?? 0), 0) ?? 0,
    lines: cartItems,
  };
}
