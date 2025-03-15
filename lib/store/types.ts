export type Money = {
  amount: string;
  currencyCode: string;
};

export type ImageSource =
  | {
      url: string;
      type: "remote";
    }
  | {
      path: string;
      type: "static";
    };

export type Image = {
  source: ImageSource;
  altText: string;
  width?: number;
  height?: number;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: ProductVariant[];
  featuredImage: Image;
  images: Image[];
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type CartItem = {
  merchandise: ProductVariant & {
    product: Product;
  };
  quantity: number;
};
