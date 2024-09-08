export type FourthwallMoney = {
  value: number;
  currency: string;
}

export type FourthwallProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;

  images: FourthwallProductImage[];
  variants: FourthwallProductVariant[];
};

export type FourthwallProductImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type FourthwallProductVariant = {
  id: string;
  name: string;
  sku: string;
  unitPrice: FourthwallMoney;

  images: FourthwallProductImage[];

  // other attr
  attributes: {
    description: string;
    color: {
      name: string;
      swatch: string;
    },
    size: {
      name: string;
    };
  }
};


export type FourthwallCart = {
  id: string | undefined;
  items: FourthwallCartItem[];
};

export type FourthwallCartItem = {
  variant: FourthwallProductVariant;
  quantity: number;
};

export type FourthwallCheckout = {
  id: string
};
