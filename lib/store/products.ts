import { Collection, Product } from "./types";

const products: Product[] = [
  {
    id: "1",
    handle: "kinaskak-blokk",
    availableForSale: true,
    title: "Kínaskák stigatafla",
    description: "50 blaða Kínaskák stigatafla sem rifblokk",
    descriptionHtml: "<p>50 blaða Kínaskák stigatafla sem rifblokk</p>",
    options: [
      {
        id: "default",
        name: "Default",
        values: ["Default"],
      },
    ],
    priceRange: {
      maxVariantPrice: {
        amount: "2499",
        currencyCode: "ISK",
      },
      minVariantPrice: {
        amount: "2499",
        currencyCode: "ISK",
      },
    },
    variants: [
      {
        id: "default",
        title: "Kínaskák stigatafla",
        availableForSale: true,
        selectedOptions: [{ name: "Default", value: "Default" }],
        price: {
          amount: "2499",
          currencyCode: "ISK",
        },
      },
    ],
    featuredImage: {
      source: {
        type: "static",
        path: "/images/products/kinaskak.png",
      },
      altText: "Kínaskák stigatafla",
    },
    images: [
      {
        source: {
          type: "static",
          path: "/images/products/kinaskak.png",
        },
        altText: "Kínaskák stigatafla",
      },
      {
        source: {
          type: "static",
          path: "/images/products/kinaskak-back.jpg",
        },
        altText: "Kínaskák stigatafla - Bakhlið",
      },
    ],
    seo: {
      title: "Kínaskák stigatafla",
      description: "50 blaða Kínaskák stigatafla sem rifblokk",
    },
    tags: ["jacket", "leather", "classic"],
    updatedAt: new Date().toISOString(),
  },
];

const collections: Collection[] = [
  {
    handle: "jackets",
    title: "Jackets",
    description: "Our collection of premium jackets",
    seo: {
      title: "Jackets Collection",
      description: "Explore our premium collection of jackets",
    },
    updatedAt: new Date().toISOString(),
  },
];

export const getProduct = ({
  handle,
}: {
  handle: string;
}): Promise<Product | undefined> => {
  return Promise.resolve(products.find((p) => p.handle === handle));
};

export const getProductById = ({
  id,
}: {
  id: string;
}): Promise<Product | undefined> => {
  return Promise.resolve(products.find((p) => p.id === id));
};

export const getProducts = ({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
} = {}): Promise<Product[]> => {
  let filteredProducts = [...products];

  if (query) {
    const searchQuery = query.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
    );
  }

  if (sortKey) {
    filteredProducts.sort((a, b) => {
      switch (sortKey) {
        case "TITLE":
          return reverse
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title);
        case "PRICE":
          return reverse
            ? parseFloat(b.priceRange.minVariantPrice.amount) -
                parseFloat(a.priceRange.minVariantPrice.amount)
            : parseFloat(a.priceRange.minVariantPrice.amount) -
                parseFloat(b.priceRange.minVariantPrice.amount);
        case "CREATED_AT":
          return reverse
            ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        default:
          return 0;
      }
    });
  }

  return Promise.resolve(filteredProducts);
};

export const getProductRecommendations = ({
  productId,
}: {
  productId: string;
}): Promise<Product[]> => {
  // For now, just return other products excluding the current one
  return Promise.resolve(products.filter((p) => p.id !== productId));
};

export const getCollectionProducts = ({
  collection,
  sortKey,
  reverse,
}: {
  collection: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> => {
  // For now, return all products since we don't have collection associations
  return getProducts({ sortKey, reverse });
};

export const getCollections = (): Promise<Collection[]> => {
  return Promise.resolve(collections);
};
